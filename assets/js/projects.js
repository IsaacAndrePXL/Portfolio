const filterBtns = document.querySelectorAll('.filter-btn');
const projCards  = document.querySelectorAll('.proj-card');
const projRows   = document.querySelectorAll('.proj-row');
const emptyState = document.getElementById('empty-state');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        let visible = 0;

        projCards.forEach(card => {
            const show = filter === 'all' || (card.dataset.category || '').includes(filter);
            card.classList.toggle('hidden', !show);
            if (show) visible++;
        });

        projRows.forEach(row => {
            const anyVisible = [...row.querySelectorAll('.proj-card')].some(c => !c.classList.contains('hidden'));
            row.classList.toggle('hidden', !anyVisible);
        });

        if (emptyState) emptyState.classList.toggle('visible', visible === 0);
    });
});