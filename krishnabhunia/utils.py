"""
Utility functions for the krishnabhunia package.

Provides helpers for file I/O, validation, and manifest management.
"""

import json
from pathlib import Path
from typing import Dict, List, Any, Optional


def load_manifest(manifest_path: str | Path) -> Dict[str, Any]:
    """
    Load a download manifest from a JSON file.

    Args:
        manifest_path: Path to the manifest.json file

    Returns:
        Dictionary containing manifest data

    Raises:
        FileNotFoundError: If manifest file does not exist
        json.JSONDecodeError: If manifest is not valid JSON
    """
    path = Path(manifest_path)

    if not path.exists():
        raise FileNotFoundError(f"Manifest file not found: {path}")

    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_manifest(manifest_path: str | Path, data: Dict[str, Any]) -> None:
    """
    Save manifest data to a JSON file.

    Args:
        manifest_path: Path where manifest should be saved
        data: Dictionary to serialize

    Raises:
        IOError: If file cannot be written
    """
    path = Path(manifest_path)
    path.parent.mkdir(parents=True, exist_ok=True)

    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def validate_download_paths(
    base_dir: str | Path,
    manifest: Dict[str, Any],
) -> List[str]:
    """
    Validate that all download paths in manifest exist relative to base_dir.

    Args:
        base_dir: Base directory to resolve paths against
        manifest: Manifest dictionary with download items

    Returns:
        List of missing file paths (empty if all valid)

    Example:
        >>> missing = validate_download_paths("download/", manifest)
        >>> if missing:
        ...     print(f"Missing files: {missing}")
    """
    base_path = Path(base_dir)
    missing_files: List[str] = []

    downloads = manifest.get("downloads", [])
    if not isinstance(downloads, list):
        raise ValueError("Manifest 'downloads' must be a list")

    for item in downloads:
        file_path = item.get("file_path")
        if not file_path:
            continue

        full_path = base_path / file_path
        if not full_path.exists():
            missing_files.append(str(file_path))

    return missing_files


def get_file_size(file_path: str | Path) -> int:
    """
    Get the size of a file in bytes.

    Args:
        file_path: Path to the file

    Returns:
        File size in bytes

    Raises:
        FileNotFoundError: If file does not exist
    """
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"File not found: {path}")

    return path.stat().st_size


def format_file_size(size_bytes: int) -> str:
    """
    Format file size in bytes to human-readable string.

    Args:
        size_bytes: Size in bytes

    Returns:
        Formatted size string (e.g., "1.5 MB")

    Example:
        >>> format_file_size(1536000)
        '1.5 MB'
    """
    for unit in ["B", "KB", "MB", "GB"]:
        if size_bytes < 1024.0:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024.0

    return f"{size_bytes:.1f} TB"


def validate_json_structure(
    data: Dict[str, Any],
    required_keys: List[str],
) -> tuple[bool, Optional[str]]:
    """
    Validate that a dictionary has required keys.

    Args:
        data: Dictionary to validate
        required_keys: List of required top-level keys

    Returns:
        Tuple of (is_valid, error_message)
        - is_valid: True if validation passed
        - error_message: Description of missing keys, or None if valid

    Example:
        >>> valid, msg = validate_json_structure(manifest, ["downloads"])
        >>> if not valid:
        ...     print(f"Invalid manifest: {msg}")
    """
    missing_keys = [k for k in required_keys if k not in data]

    if missing_keys:
        return False, f"Missing required keys: {', '.join(missing_keys)}"

    return True, None
