import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());

app.get("/api/resorts", async (req, res) => {
    const { region } = req.query;
    const url = `https://ski-resort-forecast.p.rapidapi.com/resorts?region=${encodeURIComponent(region || "USA - Washington")}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "x-rapidapi-key": process.env.RAPIDAPI_KEY,
                "x-rapidapi-host": "ski-resort-forecast.p.rapidapi.com"
            }
        });

        const text = await response.text();
        try {
            const data = JSON.parse(text);
            res.json(data);
        } catch {
            res.status(500).json({ error: "Invalid JSON", raw: text });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Request failed" });
    }
});

app.listen(3001, () => console.log("Backend running on port 3001"));
