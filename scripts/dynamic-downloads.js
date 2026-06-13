// Dynamically load files from the download folder and external sources
(function () {
    const DOWNLOAD_FOLDER = 'download';
    const linksSection = document.querySelector('.links-section');
    if (!linksSection) return;

    // Fetch the download folder to get file list
    // Supports both local files and remote GitHub URLs
    
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
            const card = createLinkCard(file.name, file.path, file.label, file.icon, file.source);
            linksSection.appendChild(card);
        });
    }

    function loadFallbackDownloads() {
        // For now, keep the existing hardcoded links
        // (They will be visible and functional)
        console.log('Using fallback hardcoded downloads');
    }

    function createLinkCard(filename, filepath, label, icon = '📄', source = 'local') {
        const card = document.createElement('div');
        card.className = 'link-card';

        const link = document.createElement('a');
        
        // Handle different file sources
        if (source === 'github') {
            // GitHub raw content URL - opens in new tab and can be downloaded
            link.href = filepath;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        } else {
            // Local file path
            link.href = filepath;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
        
        link.textContent = `${icon} ${label}`;

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
