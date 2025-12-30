import {scrapeStevens} from "./scrapers/Stevens.scraper.js";

(async () => {
    const data = await scrapeStevens();
    console.log(JSON.stringify(data, null, 2));
})();