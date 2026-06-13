# Python Development Guide

## Package Structure

The `krishnabhunia` package provides utilities for managing portfolio content and site metadata.

### Modules

#### `krishnabhunia.portfolio`
Portfolio management with dataclasses and utilities:
- **`DownloadItem`**: Represents downloadable files
- **`PortfolioProject`**: Represents portfolio projects with metadata
- **`Portfolio`**: Main class for managing projects and downloads

#### `krishnabhunia.utils`
Utility functions for common operations:
- `load_manifest()` / `save_manifest()`: JSON manifest I/O
- `validate_download_paths()`: Validate file references
- `get_file_size()`: Get file size in bytes
- `format_file_size()`: Human-readable file size formatting
- `validate_json_structure()`: Validate JSON structure

## Setup & Development

### Install Dependencies

```bash
# Install with development dependencies
poetry install

# Or with pip
pip install -e ".[dev]"
```

### Run Tests

```bash
# Run all tests
pytest

# With coverage
pytest --cov=krishnabhunia

# Specific test file
pytest tests/test_portfolio.py

# Verbose output
pytest -v
```

### Code Quality

```bash
# Format code with Black
black krishnabhunia tests

# Lint with Ruff
ruff check krishnabhunia tests

# Type check with mypy
mypy krishnabhunia
```

## Usage Examples

### Create and Manage a Portfolio

```python
from krishnabhunia.portfolio import Portfolio, PortfolioProject
from datetime import datetime

portfolio = Portfolio()

# Add a project
project = PortfolioProject(
    title="Web Application",
    description="A modern web app",
    technologies=["Python", "React", "PostgreSQL"],
    tags=["web", "fullstack"],
    date_completed=datetime(2024, 6, 1),
)
portfolio.add_project(project)

# Filter by tag
web_projects = portfolio.get_projects_by_tag("web")

# Get recent projects
recent = portfolio.get_recent_projects(limit=5)

# Serialize to dict
data = portfolio.to_dict()
```

### Working with Downloads

```python
from krishnabhunia.portfolio import DownloadItem
from krishnabhunia.utils import validate_download_paths, load_manifest

# Add downloadable items
resume = DownloadItem(
    name="Resume",
    file_path="resume.pdf",
    description="PDF Resume",
    file_type="pdf",
)
portfolio.add_download(resume)

# Validate manifest
manifest = load_manifest("download/manifest.json")
missing_files = validate_download_paths("download/", manifest)

if missing_files:
    print(f"Warning: Missing files - {missing_files}")
```

### File Utilities

```python
from krishnabhunia.utils import (
    get_file_size,
    format_file_size,
    validate_json_structure,
)

# Check file size
size = get_file_size("resume.pdf")
print(f"File size: {format_file_size(size)}")  # Output: File size: 1.5 MB

# Validate JSON structure
manifest = load_manifest("manifest.json")
is_valid, error = validate_json_structure(
    manifest,
    required_keys=["downloads", "metadata"],
)

if not is_valid:
    print(f"Invalid manifest: {error}")
```

## Code Style & Standards

- **Python Version**: 3.12+
- **Formatter**: Black (100 char line length)
- **Linter**: Ruff
- **Type Checker**: mypy (optional strict mode)
- **Testing**: pytest

### Pre-commit Hook (Optional)

Create `.git/hooks/pre-commit`:

```bash
#!/bin/bash
set -e

echo "Running Black..."
black krishnabhunia tests

echo "Running Ruff..."
ruff check --fix krishnabhunia tests

echo "Running Tests..."
pytest tests/

echo "✓ Pre-commit checks passed"
```

Make executable:
```bash
chmod +x .git/hooks/pre-commit
```

## Project Layout

```
krishnabhunia/
├── __init__.py           # Package exports
├── portfolio.py          # Portfolio and project models
└── utils.py              # Utility functions

tests/
├── __init__.py
├── test_portfolio.py     # Portfolio tests
└── test_utils.py         # Utils tests

pyproject.toml            # Project config, dependencies, tool settings
pytest.ini                # Pytest configuration
```

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and add tests
3. Run code quality checks: `black`, `ruff`, `mypy`, `pytest`
4. Commit with clear message: `git commit -m "Add feature description"`
5. Push and create a pull request

## Dependencies

**Runtime**: None (uses Python stdlib)

**Development**:
- pytest >= 7.0 (Testing)
- pytest-cov >= 4.0 (Coverage)
- black >= 23.0 (Formatting)
- ruff >= 0.1.0 (Linting)
- mypy >= 1.0 (Type checking)

## License

Part of the krishnabhunia.github.io repository.
