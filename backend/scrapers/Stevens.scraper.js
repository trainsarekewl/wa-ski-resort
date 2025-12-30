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

// parsers
function parseSnowMetrics($) {
    const metrics = {};

    $(".snow_report__metrics__metric").each((i, el) => {
        const measurementEL = $(el).find("snow_report__metrics__measurement");
        // skip non measurement items
        if (!measurementEL.length ) return;

        const label = $(el).find("snow_report__metrics__description").text().replace(/\s+/g, " ").trim().toLowerCase();

        const clean = measurementEL.clone();
        clean.find("span").remove();
        const snowfall = Number(clean.text().trim());

        if (Number.isNaN(snowfall)) return;


        else if (label.includes("12")) metrics["12hr"] = snowfall;
        else if (label.includes("24")) metrics["24hr"] = snowfall;
        else if (label.includes("48")) metrics["48hr"] = snowfall;
        else if (label.includes("7 day")) metrics["7day"] = snowfall;
        else if (label.includes("base")) metrics["baseDepth"] = snowfall;
        else if (label.includes("season")) metrics["season"] = snowfall;
    })

    return metrics;
}

function parseWeather($) {
    return {
        currentTemp: readNumberWithoutUnits($, ".forecast__today__weather__container"),
        condition: $(".forecast__today__weather__description").first().text().replace(/\s+/g," ").trim() || null,
        high: readNumberWithoutUnits($, ".forecast__today__temps__hi__temp"),
        low: readNumberWithoutUnits($, ".forecast__today__temps__low__temp"),
        daytimeSnow: readNumberWithoutUnits($, ".forecast__today__daytime__snow"),
        overnightSnow: readNumberWithoutUnits($, ".forecast__today__overnight__snow"),
    }
}

// main
export async function scrapeStevens() {
    const url = "https://www.stevenspass.com/the-mountain/mountain-conditions/weather-report.aspx";

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

    const $ = cheerio.load(html);

    return {
        resort: "Stevens",
        snowMetrics: parseSnowMetrics($),
        weather: parseWeather($),
    }
}