// tabs.js - handles tab switching and sticky tab-buttons behaviour

document.addEventListener('DOMContentLoaded', function () {
    // --- Tab switcher ---
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

    // --- Sticky behaviour for tab buttons ---
    (function () {
        const tabButtons = document.querySelector('.tab-buttons');
        const header = document.querySelector('.header');
        const container = document.querySelector('.container');
        if (!tabButtons || !header || !container) return;

        // Create placeholder to avoid layout jump when tabButtons becomes fixed
        const placeholder = document.createElement('div');
        placeholder.style.display = 'none';
        placeholder.style.width = '100%';
        tabButtons.parentNode.insertBefore(placeholder, tabButtons);

        function updateSticky() {
            const headerRect = header.getBoundingClientRect();
            const tabRect = tabButtons.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            // If the top of the tabs reaches the bottom of the header, make them fixed
            if (tabRect.top <= headerRect.bottom) {
                tabButtons.classList.add('is-sticky');
                placeholder.style.display = 'block';
                placeholder.style.height = `${tabRect.height}px`;

                // Position the element fixed and align it with the container
                tabButtons.style.position = 'fixed';
                tabButtons.style.top = `${Math.max(headerRect.bottom, 0)}px`;
                tabButtons.style.left = `${containerRect.left}px`;
                tabButtons.style.width = `${containerRect.width}px`;
                tabButtons.style.zIndex = 60;
            } else {
                tabButtons.classList.remove('is-sticky');
                placeholder.style.display = 'none';
                tabButtons.style.position = '';
                tabButtons.style.top = '';
                tabButtons.style.left = '';
                tabButtons.style.width = '';
                tabButtons.style.zIndex = '';
            }
        }

        // Recompute on scroll and resize
        window.addEventListener('scroll', updateSticky, { passive: true });
        window.addEventListener('resize', function () {
            // Update placeholder height when layout changes
            const tabRect = tabButtons.getBoundingClientRect();
            placeholder.style.height = `${tabRect.height}px`;
            updateSticky();
        });

        // Initial check
        updateSticky();
    })();
});
