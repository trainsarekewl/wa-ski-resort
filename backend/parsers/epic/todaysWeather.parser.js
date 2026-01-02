import {readNumberWithoutUnits} from "../../utils/number.js";

export function parseTodayWeather($) {
    return {
        currentTemp: readNumberWithoutUnits($, ".forecast__today__weather__container"),
        condition: $(".forecast__today__weather__description").first().text().replace(/\s+/g," ").trim() || null,
        high: readNumberWithoutUnits($, ".forecast__today__temps__hi__temp"),
        low: readNumberWithoutUnits($, ".forecast__today__temps__low__temp"),
        daytimeSnow: readNumberWithoutUnits($, ".forecast__today__daytime__snow"),
        overnightSnow: readNumberWithoutUnits($, ".forecast__today__overnight__snow"),
    }
}