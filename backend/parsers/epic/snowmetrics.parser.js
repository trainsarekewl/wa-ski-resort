import {readNumberWithoutUnits} from "../../utils/number.js";

export function parseSnowMetrics($) {
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