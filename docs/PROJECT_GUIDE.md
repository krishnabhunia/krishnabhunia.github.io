# Personal portfolio and GitHub Pages site

## What this repository actually contains
A responsive GitHub Pages portfolio using static HTML/CSS/JavaScript, plus Python 3.12 portfolio utilities, tests and a manifest generation workflow.

**Technology:** HTML5, CSS3, vanilla JavaScript, Python >=3.12, Poetry / pytest.

## Confirmed components
| File | Role |
|---|---|
| `index.html` | Single-page portfolio markup |
| `styles/main.css` | Responsive styling |
| `scripts/tabs.js` | Tabbed content navigation |
| `scripts/photo-zoom.js` | Photo dialog |
| `scripts/dynamic-downloads.js` | Manifest-driven download links |
| `download/manifest.json` | Download metadata |
| `krishnabhunia/portfolio.py` | Python site-related utilities |
| `.github/workflows/update-manifest.yml` | Automated manifest update |

## System architecture
~~~mermaid
flowchart LR
 User[User / developer] --> Entry[Browser / Python tooling]
 Entry --> Logic[Application code]
 Logic --> Resource[Static assets / utilities]
~~~

## Execution and data flow
~~~mermaid
sequenceDiagram
 participant U as User
 participant A as Site / utility
 participant R as Files and assets
 U->>A: Open / interact
 A->>R: Read or invoke functionality
 R-->>A: Current result
 A-->>U: Display / report
~~~

## Installation and setup
1. Clone repository and use python -m http.server 8000 at the repository root; visit http://localhost:8000.
2. Edit index.html and styles/main.css to change the layout; manage downloads through download/manifest.json.
3. For Python utilities, install Python 3.12, run python -m pip install -e '.[dev]' and pytest tests/ in an isolated environment.
4. Publish static site with GitHub Pages only after reviewing public-facing links and personal information.

~~~mermaid
flowchart TD
 A[Clone GitHub project] --> B[Prepare platform and dependencies]
 B --> C[Open/run project]
 C --> D{Check project behavior}
 D -->|Pass| E[Inspect features and tests]
 D -->|Fail| F[Review setup and known limitations]
 F --> B
~~~

## Current functionality and usage
Tabs and photo zoom use local JavaScript; the download script reads manifest.json. Python helper modules and tests are separate from client-side page rendering.

## Validation protocol
- A PR workflow validates documentation structure and GitHub-local links.
- GitHub Actions compiles Python helpers and runs the existing pytest suite; the browser interface still requires manual UI checks.
- Check the specific PR **Checks** tab for run results; documentation is not proof of working application features.
- Manual smoke test should follow the sequence above and compare observed behavior with the source.

## Gaps and limitations
- The static website does not require Python on the hosting server.
- Check that public contact information and download assets are appropriate to publish.
- Relative asset links require a local HTTP server for realistic manifest fetch behavior.
- Geographic maps and benchmark graphs are intentionally not invented: this project does not provide verified geospatial or measured performance information.
- Runtime/source fixes should be isolated from this documentation-focused PR.
