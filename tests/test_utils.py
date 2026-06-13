"""Tests for the utils module."""

import json
import pytest
from pathlib import Path
from tempfile import TemporaryDirectory
from krishnabhunia.utils import (
    load_manifest,
    save_manifest,
    validate_download_paths,
    get_file_size,
    format_file_size,
    validate_json_structure,
)


class TestManifestOperations:
    """Test manifest loading and saving."""

    def test_load_manifest_success(self):
        """Test successfully loading a manifest."""
        with TemporaryDirectory() as tmpdir:
            manifest_path = Path(tmpdir) / "manifest.json"
            test_data = {"downloads": [{"name": "Resume", "file_path": "resume.pdf"}]}

            with open(manifest_path, "w") as f:
                json.dump(test_data, f)

            result = load_manifest(manifest_path)
            assert result == test_data

    def test_load_manifest_not_found(self):
        """Test loading non-existent manifest."""
        with pytest.raises(FileNotFoundError):
            load_manifest("nonexistent.json")

    def test_load_manifest_invalid_json(self):
        """Test loading invalid JSON file."""
        with TemporaryDirectory() as tmpdir:
            manifest_path = Path(tmpdir) / "manifest.json"
            with open(manifest_path, "w") as f:
                f.write("{ invalid json }")

            with pytest.raises(json.JSONDecodeError):
                load_manifest(manifest_path)

    def test_save_manifest(self):
        """Test saving a manifest."""
        with TemporaryDirectory() as tmpdir:
            manifest_path = Path(tmpdir) / "manifest.json"
            test_data = {"downloads": []}

            save_manifest(manifest_path, test_data)

            with open(manifest_path, "r") as f:
                loaded = json.load(f)

            assert loaded == test_data


class TestValidateDownloadPaths:
    """Test download path validation."""

    def test_validate_download_paths_all_exist(self):
        """Test validation when all paths exist."""
        with TemporaryDirectory() as tmpdir:
            base_dir = Path(tmpdir)
            (base_dir / "file1.pdf").touch()
            (base_dir / "file2.txt").touch()

            manifest = {
                "downloads": [
                    {"name": "File 1", "file_path": "file1.pdf"},
                    {"name": "File 2", "file_path": "file2.txt"},
                ]
            }

            missing = validate_download_paths(base_dir, manifest)
            assert missing == []

    def test_validate_download_paths_missing_files(self):
        """Test validation with missing files."""
        with TemporaryDirectory() as tmpdir:
            manifest = {
                "downloads": [
                    {"name": "File 1", "file_path": "missing.pdf"},
                ]
            }

            missing = validate_download_paths(tmpdir, manifest)
            assert "missing.pdf" in missing

    def test_validate_download_paths_invalid_manifest(self):
        """Test validation with invalid manifest structure."""
        manifest = {"downloads": "not a list"}

        with pytest.raises(ValueError, match="must be a list"):
            validate_download_paths("/tmp", manifest)


class TestFileSizeOperations:
    """Test file size utilities."""

    def test_get_file_size(self):
        """Test getting file size."""
        with TemporaryDirectory() as tmpdir:
            file_path = Path(tmpdir) / "test.txt"
            test_content = "Hello World"
            file_path.write_text(test_content)

            size = get_file_size(file_path)
            assert size == len(test_content.encode())

    def test_get_file_size_not_found(self):
        """Test getting size of non-existent file."""
        with pytest.raises(FileNotFoundError):
            get_file_size("nonexistent.txt")

    def test_format_file_size_bytes(self):
        """Test formatting bytes."""
        assert format_file_size(512) == "512.0 B"

    def test_format_file_size_kilobytes(self):
        """Test formatting kilobytes."""
        assert format_file_size(1536) == "1.5 KB"

    def test_format_file_size_megabytes(self):
        """Test formatting megabytes."""
        assert format_file_size(1536000) == "1.5 MB"

    def test_format_file_size_gigabytes(self):
        """Test formatting gigabytes."""
        assert format_file_size(1536000000) == "1.4 GB"


class TestJsonValidation:
    """Test JSON structure validation."""

    def test_validate_json_structure_valid(self):
        """Test validation with valid structure."""
        data = {"downloads": [], "metadata": {}}
        is_valid, msg = validate_json_structure(data, ["downloads", "metadata"])

        assert is_valid is True
        assert msg is None

    def test_validate_json_structure_missing_keys(self):
        """Test validation with missing keys."""
        data = {"downloads": []}
        is_valid, msg = validate_json_structure(data, ["downloads", "metadata"])

        assert is_valid is False
        assert "metadata" in msg

    def test_validate_json_structure_empty_data(self):
        """Test validation with empty data."""
        data = {}
        is_valid, msg = validate_json_structure(data, ["key1", "key2"])

        assert is_valid is False
        assert "key1" in msg
        assert "key2" in msg
