// tabs.js - handles tab switching and keyboard navigation

document.addEventListener('DOMContentLoaded', function () {
    const tabs = Array.from(document.querySelectorAll('.tab-button'));
    const panels = Array.from(document.querySelectorAll('.tab-panel'));

    function activate(index) {
        tabs.forEach((t, i) => {
            const selected = i === index;
            t.classList.toggle('active', selected);
            t.setAttribute('aria-selected', selected ? 'true' : 'false');
            panels[i].hidden = !selected;
        });
    }

    tabs.forEach((tab, idx) => {
        tab.addEventListener('click', () => activate(idx));
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const next = (idx + 1) % tabs.length;
                tabs[next].focus();
                activate(next);
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prev = (idx - 1 + tabs.length) % tabs.length;
                tabs[prev].focus();
                activate(prev);
            }
        });
    });
});
