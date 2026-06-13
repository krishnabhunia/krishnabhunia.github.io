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
        // Attach event handlers to hardcoded resume link if it exists
        const resumeLink = linksSection.querySelector('.resume-link');
        if (resumeLink) {
            const pdfUrl = resumeLink.href;
            const filename = 'Krishna Resume';
            resumeLink.href = '#';
            resumeLink.addEventListener('click', (e) => {
                e.preventDefault();
                openPdfViewer(pdfUrl, filename);
            });
        }

        // Add any additional files from manifest (excluding resume which is already hardcoded)
        files.forEach(file => {
            if (file.name !== 'Resume') {
                const card = createLinkCard(file.name, file.path, file.label, file.icon, file.source);
                linksSection.appendChild(card);
            }
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
        link.href = '#';
        link.textContent = `${icon} ${label}`;
        
        // Handle different file sources
        if (source === 'github') {
            // GitHub PDF - open in modal viewer instead of direct download
            link.addEventListener('click', (e) => {
                e.preventDefault();
                openPdfViewer(filepath, filename);
            });
        } else {
            // Local file path - open in new tab
            link.href = filepath;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.removeEventListener('click', null);
        }

        card.appendChild(link);
        return card;
    }

    function openPdfViewer(pdfUrl, filename) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'pdf-modal';
        modal.id = 'pdf-modal';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'pdf-modal-content';
        
        // Create header with title and close button
        const header = document.createElement('div');
        header.className = 'pdf-modal-header';
        
        const title = document.createElement('h2');
        title.textContent = filename;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'pdf-modal-close';
        closeBtn.textContent = '✕';
        closeBtn.addEventListener('click', () => modal.remove());
        
        header.appendChild(title);
        header.appendChild(closeBtn);
        
        // Create iframe for PDF viewer
        const iframe = document.createElement('iframe');
        iframe.className = 'pdf-iframe';
        iframe.src = pdfUrl;
        iframe.title = filename;
        
        // Assemble modal
        modalContent.appendChild(header);
        modalContent.appendChild(iframe);
        modal.appendChild(modalContent);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Add to page
        document.body.appendChild(modal);
    }

    // Load downloads when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadDownloads);
    } else {
        loadDownloads();
    }
})();
