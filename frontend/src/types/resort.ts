export type Resort = {
    resort: string;
    snowMetrics: {
        "12hr": number;
        "24hr": number;
        "48hr": number;
        baseDepth: number;
        season: number;
    };
    todaysWeather: {
        currentTemp: number;
        condition: string;
        high: number;
        low: number;
        daytimeSnow: number | null;
        overnightSnow: number | null;
    };
    futureWeather: Array<{
        day: string;
        condition: string;
        high: number;
        low: number;
        snow: number | null;
    }>;
    status?: {
        runs?: { open: number; total: number };
        lifts?: { open: number; total: number };
    };
}