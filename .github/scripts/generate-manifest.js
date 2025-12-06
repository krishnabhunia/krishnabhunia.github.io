const fs = require('fs');
const path = require('path');

const downloadDir = path.join(__dirname, '../../download');
const manifestPath = path.join(downloadDir, 'manifest.json');

// Scan download folder for PDF files
const files = fs.readdirSync(downloadDir).filter(file => {
    return file.endsWith('.pdf') || file.endsWith('.PDF');
});

// Generate manifest entries
const manifest = {
    files: files.map((file, index) => {
        // Extract a clean label from filename (remove extension, replace underscores)
        const baseName = path.parse(file).name;
        const label = baseName
            .replace(/_/g, ' ')
            .replace(/(\d+)$/, '').trim(); // Remove trailing numbers
        
        return {
            name: `file_${index + 1}`,
            path: `download/${file}`,
            label: `${label}`,
            icon: '📄'
        };
    })
};

// Write manifest.json
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`✓ Generated manifest.json with ${manifest.files.length} file(s)`);
