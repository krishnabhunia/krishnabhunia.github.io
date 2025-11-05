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
- Add new pages as `.html` or markdown files at the repo root and link them from `index.html`.
- Fix obvious HTML issues (missing closing tags, broken links) and verify by opening the file locally.

## How to preview locally (explicit)

- No build step. To preview changes open `index.html` directly in a browser. For a local web server use a simple HTTP server, e.g. `python -m http.server 8000` from the repo root, then visit `http://localhost:8000/`.

## Patterns & conventions discovered here

- Single-page static site: edits live at the repository root. There are no subdirectories for pages or assets in the current snapshot.
- Content is plain HTML — avoid introducing client-side frameworks or build tools without first confirming with the repo owner.
- External integration: site links to `https://about.me/kbhunia` and a Google Drive file — preserve exact URLs when editing unless the owner requests changes.

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

---

If any section is unclear or you want the instructions expanded with examples (e.g., a small PR template or a local preview script), say which part and I'll iterate.
