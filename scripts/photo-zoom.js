// Click-to-zoom photo modal
(function () {
    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'photo-modal';
        modal.setAttribute('aria-hidden', 'true');

        const img = document.createElement('img');
        img.className = 'photo-modal__image';
        img.alt = '';

        const close = document.createElement('button');
        close.className = 'photo-modal__close';
        close.type = 'button';
        close.innerText = 'Close';
        close.setAttribute('aria-label', 'Close image view');
        // hide close button by default; show only when modal is open
        close.style.display = 'none';

        modal.appendChild(img);
        document.body.appendChild(modal);
        document.body.appendChild(close);

        // Close when clicking backdrop
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModal();
        });

        close.addEventListener('click', closeModal);

        return { modal, img, close };
    }

    let ui = null;

    function openModal(src, alt) {
        if (!ui) ui = createModal();
        ui.img.src = src;
        ui.img.alt = alt || '';
        ui.modal.classList.add('open');
        ui.modal.setAttribute('aria-hidden', 'false');
        ui.close.style.display = 'inline-block';
        // prevent body scroll while modal open
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!ui) return;
        ui.modal.classList.remove('open');
        ui.modal.setAttribute('aria-hidden', 'true');
        // hide the close button when modal is closed
        if (ui.close) ui.close.style.display = 'none';
        // restore scrolling
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    // Close on ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });

    // Delegate clicks on profile photos
    document.addEventListener('click', function (e) {
        const target = e.target;
        if (target && target.classList && target.classList.contains('profile-photo')) {
            // Use the image src (full-size) — if you want a different size, swap here
            openModal(target.src, target.alt || 'Profile photo');
        }
    });

})();
