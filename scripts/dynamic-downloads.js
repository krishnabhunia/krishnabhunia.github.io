// Dynamically load files from the download folder
(function () {
    const DOWNLOAD_FOLDER = 'download';
    const linksSection = document.querySelector('.links-section');
    if (!linksSection) return;

    // Fetch the download folder to get file list
    // For a static site, we'll use a simple manifest JSON file approach
    // If no manifest exists, we'll populate hardcoded links and load dynamic PDFs
    
    async function loadDownloads() {
        try {
            // Try to fetch a manifest.json that lists all downloads
            const response = await fetch(`${DOWNLOAD_FOLDER}/manifest.json`);
            if (response.ok) {
                const manifest = await response.json();
                populateFromManifest(manifest.files);
            } else {
                // Fallback: load known files
                loadFallbackDownloads();
            }
        } catch (error) {
            console.warn('Could not load dynamic downloads:', error);
            loadFallbackDownloads();
        }
    }

    function populateFromManifest(files) {
        // Clear existing download items (keep non-download links)
        const existingCards = linksSection.querySelectorAll('.link-card');
        
        // Remove old download cards (assume last card is resume if it has PDF)
        existingCards.forEach(card => {
            const anchor = card.querySelector('a');
            if (anchor && (anchor.href.includes('.pdf') || anchor.href.includes('download='))) {
                card.remove();
            }
        });

        // Add new download cards from manifest
        files.forEach(file => {
            const card = createLinkCard(file.name, file.path, file.label, file.icon);
            linksSection.appendChild(card);
        });
    }

    function loadFallbackDownloads() {
        // For now, keep the existing hardcoded links
        // (They will be visible and functional)
        console.log('Using fallback hardcoded downloads');
    }

    function createLinkCard(filename, filepath, label, icon = '📄') {
        const card = document.createElement('div');
        card.className = 'link-card';

        const link = document.createElement('a');
        link.href = filepath;
        link.textContent = `${icon} ${label}`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        card.appendChild(link);
        return card;
    }

    // Load downloads when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadDownloads);
    } else {
        loadDownloads();
    }
})();
