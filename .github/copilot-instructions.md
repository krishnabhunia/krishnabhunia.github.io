## Purpose

This file gives concise, repository-specific instructions for AI coding agents (Copilot-style) to be immediately productive in this static personal site repository.

Keep the instructions short and actionable. Reference concrete files when describing examples or patterns.

## Quick summary (what this repo is)

- A minimal GitHub Pages site served from the repository root. The site is static HTML (no build system).
- Key files: `index.html` (site entry), `contact.txt` (author contact information), `README.md` (repo description).
- Deployment: this is a username.github.io repository—pushing to the `main` branch updates the live site at `https://krishnabhunia.github.io/`.

## Contract (2–3 bullets)

- Input: edits to files in the repository (HTML, text). Output: small, well-scoped commits that preserve format and links.
- Success: updated `index.html`, `contact.txt`, or added pages that render as static HTML and preserve external links (about.me, Drive links).
- Error modes: avoid changing contact phone numbers or personal data unless requested; avoid large binary additions without asking.

## Immediate tasks you should be prepared to do

- Small content updates to `index.html` (text, links, minor HTML fixes).
- Edit `styles/main.css` for visual changes, layout adjustments, or color theme updates (use CSS custom properties).
- Modify `scripts/` JavaScript files to adjust interactivity (tabs, photo zoom, or dynamic downloads).
- Add new pages as `.html` or markdown files at the repo root and link them from `index.html`.
- Update or add downloadable items: add the file to `download/`, then register it in `download/manifest.json` and update the JavaScript reference if needed.
- Fix obvious HTML/CSS/JS issues (missing closing tags, broken links, console errors) and verify by opening the file locally or reviewing changes.

## JavaScript interactivity guide

The site uses three main JavaScript modules loaded from `scripts/`:

1. **tabs.js** — Manages content tabs. When editing HTML, ensure tab elements have the expected class names and data attributes that the JS relies on.
2. **photo-zoom.js** — Adds click-to-zoom to images. When adding images to HTML, mark them with the appropriate class to enable zoom.
3. **dynamic-downloads.js** — Fetches and renders downloadable items from `download/manifest.json`. When updating the manifest, verify the JSON syntax and file paths.

Always test interactivity after editing HTML or JavaScript to ensure tabs switch, images zoom, and downloads render correctly.

## How to preview locally (explicit)

- No build step. To preview changes open `index.html` directly in a browser. For a local web server use a simple HTTP server, e.g. `python -m http.server 8000` from the repo root, then visit `http://localhost:8000/`.

## Directory structure

- `index.html` — main entry page and site layout
- `styles/main.css` — centralized styling with CSS custom properties (e.g., `--primary-color`, `--text-color`)
- `scripts/` — JavaScript modules for interactivity:
  - `tabs.js` — tab switching functionality
  - `photo-zoom.js` — image zoom on click
  - `dynamic-downloads.js` — dynamically load downloadable files from `download/manifest.json`
- `download/` — static assets and manifest
  - `manifest.json` — configuration file listing downloadable items (e.g., resume PDF)
  - PDF and other downloadable files referenced by JavaScript
- `images/` — static image assets (favicon, photos, backgrounds)

## Patterns & conventions discovered here

- Single-page static site: all content edits live at the repository root or in the directories above.
- JavaScript enhances core HTML content (tabs, photo zoom, dynamic downloads). Avoid breaking these integrations when editing HTML.
- CSS uses custom properties for theming (`--primary-color`, `--text-color`, `--bg-color`). Update `styles/main.css` for visual changes.
- Content is plain HTML — avoid introducing client-side frameworks or build tools without first confirming with the repo owner.
- External integration: site links to `https://about.me/kbhunia` and a Google Drive file — preserve exact URLs when editing unless the owner requests changes.
- Download files are listed in `download/manifest.json` and referenced by `scripts/dynamic-downloads.js`. Keep manifest in sync when adding/removing downloadable items.

## Examples from this repo (explicit)

- To change the headline, edit `index.html` near the `<h2>` block that currently contains the author name and contact numbers.
- To update downloadable contact details, modify the Drive link in `index.html` (search for `drive.google.com/file/d/18ht9IqcIoKw8xUYyx1sGoDfchRp2xVtk`).

## Commits, PRs, and safety

- Small edits may be pushed directly to `main` for content fixes if that's the owner's convention; if you're unsure, open a branch and create a PR.
- Keep commits atomic and focused (one logical change per commit). Use clear commit messages: "Update contact phone number in index.html".
- Do not remove personal contact data unless explicitly instructed by the owner.

## When to ask for clarification

- Before adding new tooling (npm, bundlers, CI), adding large files, or changing the repo structure.
- Before changing personal or sensitive information (names, phone numbers, emails).

## Files to reference when making edits

- `index.html` — primary page and example HTML patterns.
- `contact.txt` — plain text copy of contact information.
- `README.md` — short description (useful for meta context).

## Extra notes (discoverable facts)

- There is currently no CI, tests, or linter configured. Keep changes conservative and easy to preview locally.
- This repo is intended as a personal static site; prioritize content clarity and correctness over adding features.
- JavaScript modules are loaded in `index.html` and should not be modified unless you understand their dependencies and usage in the HTML.
- CSS custom properties (defined in `:root`) are used throughout `main.css` and inline styles. Update the root properties for theme changes.

---

If any section is unclear or you want the instructions expanded with examples (e.g., a small PR template or a local preview script), say which part and I'll iterate.
