import axios from "axios";
import * as cheerio from "cheerio";
import {chromium} from "playwright";

// helper
function readNumberWithoutUnits($, el) {
    const clean = $(el).clone();
    clean.find("span").remove();
    const n = Number(clean.text().trim());
    return Number.isNaN(n) ? null : n;
}

async function fetchHTML(url) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
        userAgent: "Mozilla/5.0"
    });

    page.setDefaultNavigationTimeout(60000);
    page.setDefaultTimeout(60000);

    await page.goto(url, { waitUntil: "domcontentloaded" });

    await page.waitForSelector("body", { timeout: 60000 });

    const html = await page.content();
    await browser.close();

    return html;
}

// parsers
function parseSnowMetrics($) {
    const metrics = {};

    $(".snow_report__metrics__metric").each((i, el) => {

        const measurementEL = $(el).find(".snow_report__metrics__measurement");

        const label = $(el).find(".snow_report__metrics__description").text()

        const snowfall = readNumberWithoutUnits($, measurementEL)

        if (Number.isNaN(snowfall)) return;


        else if (label.includes("12")) metrics["12hr"] = snowfall;
        else if (label.includes("24")) metrics["24hr"] = snowfall;
        else if (label.includes("48")) metrics["48hr"] = snowfall;
        else if (label.includes("7 day")) metrics["7day"] = snowfall;
        else if (label.includes("Base")) metrics["baseDepth"] = snowfall;
        else if (label.includes("Season")) metrics["season"] = snowfall;
    })

    return metrics;
}

function parseTodayWeather($) {
    return {
        currentTemp: readNumberWithoutUnits($, ".forecast__today__weather__container"),
        condition: $(".forecast__today__weather__description").first().text().replace(/\s+/g," ").trim() || null,
        high: readNumberWithoutUnits($, ".forecast__today__temps__hi__temp"),
        low: readNumberWithoutUnits($, ".forecast__today__temps__low__temp"),
        daytimeSnow: readNumberWithoutUnits($, ".forecast__today__daytime__snow"),
        overnightSnow: readNumberWithoutUnits($, ".forecast__today__overnight__snow"),
    }
}

function parseFutureConditions($) {
    const forecast = [];

    // only want first 4
    $('tr[class*="styles_box__"]').slice(0, 4).each((i, el) => {
        const row = $(el);

        const day = row
            .find('span[class^="styles_h4__"]')
            .first()
            .text()
            .trim();

        const condition =
            row.find('div[title]').first().attr('title')
            || row.find('div[title] span').first().text().trim()
            || null;

        const tempText = row.find('td[class^="styles_base__"] span').text();
        const temps = tempText.match(/\d+/g)?.map(Number) || [];
        const high = temps[0] ?? null;
        const low = temps[1] ?? null;

        const snowText = row.find('td[aria-label="Forecasted Snow"] span').text();
        const snow = parseFloat(snowText.replace(/[^0-9.]/g, "")) || 0;

        forecast.push({
            day,
            condition,
            high,
            low,
            snow
        });
    });

    return forecast;
}

function parseStatus($) {
    const status = {};

    $('.terrain_summary__tab_main').each((i, el) => {
        const block = $(el);

        const type = block.attr('data-terrain-status-id');
        if (!type) return;

        const circle = block.find('.terrain_summary__circle');

        const open = Number(circle.attr('data-open'));
        const total = Number(circle.attr('data-total'));

        status[type] = { open, total };
    });
    return status;
}

// main
export async function scrapeStevens() {
    const resortSnowURL = "https://www.stevenspass.com/the-mountain/mountain-conditions/weather-report.aspx";
    const resortStatusURL = "https://www.stevenspass.com/the-mountain/mountain-conditions/lift-and-terrain-status.aspx"
    const onTheSnowURL = "https://www.onthesnow.com/washington/stevens-pass-resort/weather";

    const [resortSnowHTML, resortStatusHTML, onTheSnowHTML] = await Promise.all([
        fetchHTML(resortSnowURL),
        fetchHTML(resortStatusURL),
        fetchHTML(onTheSnowURL),
    ]);

    const $resortSnow = cheerio.load(resortSnowHTML);
    const $resortStatus = cheerio.load(resortStatusHTML);
    const $ots = cheerio.load(onTheSnowHTML);

    parseStatus($resortStatus);

    return {
        resort: "Stevens",
        snowMetrics: parseSnowMetrics($resortSnow),
        todaysWeather: parseTodayWeather($resortSnow),
        futureWeather: parseFutureConditions($ots),
        status: parseStatus($resortStatus),
    }
}