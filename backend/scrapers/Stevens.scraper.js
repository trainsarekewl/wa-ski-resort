import * as cheerio from "cheerio";

import {fetchHTML} from "../fetch/playwright.fetch.js";
import {parseSnowMetrics} from "../parsers/epic/snowmetrics.parser.js";
import {parseTodayWeather} from "../parsers/epic/todaysWeather.parser.js";
import {parseStatus} from "../parsers/epic/status.parser.js";


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

    return {
        resort: "Stevens",
        snowMetrics: parseSnowMetrics($resortSnow),
        todaysWeather: parseTodayWeather($resortSnow),
        futureWeather: parseFutureConditions($ots),
        status: parseStatus($resortStatus),
    }
}