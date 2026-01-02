import {scrapeWhistler} from "./scrapers/Whistler.scraper.js";

(async () => {
    const data = await scrapeWhistler();
    console.log(JSON.stringify(data, null, 2));
})();