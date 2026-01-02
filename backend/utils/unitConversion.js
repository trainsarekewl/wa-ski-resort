export function cToF(c) {
    return c == null ? null : Math.round((c * 9) / 5 + 32);
}

export function cmToIn(cm) {
    return cm == null ? null : +(cm / 2.54).toFixed(1);
}

export function toImperial(data) {
    return {
        ...data,
        snowMetrics: {
            ...data.snowMetrics,
            "12hr": Math.round(cmToIn(data.snowMetrics["12hr"])),
            "24hr": Math.round(cmToIn(data.snowMetrics["24hr"])),
            "48hr": Math.round(cmToIn(data.snowMetrics["48hr"])),
            baseDepth: Math.round(cmToIn(data.snowMetrics.baseDepth)),
            season: Math.round(cmToIn(data.snowMetrics.season)),
        },
        todaysWeather: {
            ...data.todaysWeather,
            currentTemp: cToF(data.todaysWeather.currentTemp),
            high: cToF(data.todaysWeather.high),
            low: cToF(data.todaysWeather.low),
            daytimeSnow: cmToIn(data.todaysWeather.daytimeSnow),
            overnightSnow: cmToIn(data.todaysWeather.overnightSnow)
        }
    }
}