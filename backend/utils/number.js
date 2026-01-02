export function readNumberWithoutUnits($, el) {
    const clean = $(el).clone();
    clean.find("span").remove();
    const n = Number(clean.text().trim());
    return Number.isNaN(n) ? null : n;
}