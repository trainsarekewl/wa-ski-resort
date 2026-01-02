export function parseStatus($) {
    const status = {};

    $('.terrain_summary__tab_main').each((i, el) => {
        const block = $(el);

        const type = block.attr('data-terrain-status-id');
        if (!type) return;

        const circle = block.find('.terrain_summary__circle');

        const open = Number(circle.attr('data-open'));
        const total = Number(circle.attr('data-total'));

        status[type] = { open, total };
    });
    return status;
}