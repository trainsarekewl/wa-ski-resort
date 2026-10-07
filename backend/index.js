import express from "express";
import cors from "cors";

import { scrapeStevens } from "./scrapers/stevens.scraper.js";
import { scrapeWhistler } from "./scrapers/whistler.scraper.js";

const app = express();
app.use(cors());
app.use(express.json());

const ONE_HOUR_MS = 60 * 60 * 1000;

let cache = {
    updatedAt: null,
    resorts: [],
    errors: [],
};

let refreshInFlight = null;

async function refreshCache() {
    if (refreshInFlight) return refreshInFlight;

    refreshInFlight = (async () => {
        const scrapers = [
            { id: "stevens", fn: scrapeStevens },
            { id: "whistler", fn: scrapeWhistler },
        ];

        const results = await Promise.allSettled(
            scrapers.map(async (s) => {
                const data = await s.fn();
                return { id: s.id, data };
            })
        );

        const resorts = [];
        const errors = [];

        for (const r of results) {
            if (r.status === "fulfilled") resorts.push(r.value.data);
            else errors.push(String(r.reason));
        }

        if (resorts.length > 0) {
            cache = {
                updatedAt: new Date().toISOString(),
                resorts,
                errors,
            };
        } else {
            cache = {
                ...cache,
                errors,
            };
        }
    })();

    try {
        await refreshInFlight;
    } finally {
        refreshInFlight = null;
    }
}

await refreshCache();
setInterval(refreshCache, ONE_HOUR_MS);

app.get("/api/resorts", (req, res) => {
    res.json(cache);
});

app.get("/api/resorts/refresh", async (req, res) => {
    await refreshCache();
    res.json({ ok: true, updatedAt: cache.updatedAt, errors: cache.errors });
});

app.post("/api/resorts/refresh", async (req, res) => {
    await refreshCache();
    res.json({ ok: true, updatedAt: cache.updatedAt, errors: cache.errors });
});

app.listen(3001, () => console.log("Backend on http://localhost:3001"));