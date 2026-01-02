import {chromium} from "playwright";

export async function fetchHTML(url) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
        userAgent: "Mozilla/5.0"
    });

    page.setDefaultNavigationTimeout(60000);
    page.setDefaultTimeout(60000);

    await page.goto(url, { waitUntil: "domcontentloaded" });

    await page.waitForSelector("body", { timeout: 60000 });

    const html = await page.content();
    await browser.close();

    return html;
}