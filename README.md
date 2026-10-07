# WA Ski Resort Conditions

A small web app that shows current snow and weather conditions for Washington ski resorts in one place. The backend scrapes each resort's website, and the frontend displays the results as resort cards.

Currently supported resorts:
- Stevens Pass
- Whistler

## Features

- Snow metrics: 12/24/48 hr snowfall, base depth, and season total
- Today's weather: current temp, condition, high/low, and expected snow
- Multi-day forecast
- Run and lift status (when available)
- Results are cached for one hour on the backend

## Tech Stack

- **Backend:** Node.js, Express, Playwright, Cheerio, Axios
- **Frontend:** React 19, TypeScript, Vite

## Adding a Resort

1. Create a scraper in `backend/scrapers/` that returns data matching the `Resort` type in `frontend/src/types/resort.ts`.
2. Register it in the `scrapers` list in `backend/index.js`.
