"""Tests for the portfolio module."""

import pytest
from datetime import datetime
from krishnabhunia.portfolio import Portfolio, PortfolioProject, DownloadItem


class TestDownloadItem:
    """Test cases for DownloadItem dataclass."""

    def test_download_item_creation(self):
        """Test creating a download item."""
        item = DownloadItem(name="Resume", file_path="resume.pdf")
        assert item.name == "Resume"
        assert item.file_path == "resume.pdf"
        assert item.description is None

    def test_download_item_to_dict(self):
        """Test converting download item to dictionary."""
        item = DownloadItem(
            name="Resume",
            file_path="resume.pdf",
            description="My resume",
            file_type="pdf",
        )
        result = item.to_dict()
        assert result["name"] == "Resume"
        assert result["file_path"] == "resume.pdf"
        assert result["description"] == "My resume"
        assert result["file_type"] == "pdf"


class TestPortfolioProject:
    """Test cases for PortfolioProject dataclass."""

    def test_project_creation(self):
        """Test creating a portfolio project."""
        project = PortfolioProject(
            title="Cool Project",
            description="A cool project",
            technologies=["Python", "React"],
        )
        assert project.title == "Cool Project"
        assert "Python" in project.technologies

    def test_project_to_dict(self):
        """Test converting project to dictionary."""
        project = PortfolioProject(
            title="Cool Project",
            description="A cool project",
            tags=["web", "api"],
        )
        result = project.to_dict()
        assert result["title"] == "Cool Project"
        assert "web" in result["tags"]


class TestPortfolio:
    """Test cases for Portfolio class."""

    def test_portfolio_initialization(self):
        """Test portfolio initialization."""
        portfolio = Portfolio()
        assert portfolio.projects == []
        assert portfolio.downloads == []
        assert portfolio.metadata["name"] == "Krishna Dipayan Bhunia"

    def test_add_project(self):
        """Test adding a project."""
        portfolio = Portfolio()
        project = PortfolioProject(
            title="Test Project",
            description="A test project",
        )
        portfolio.add_project(project)
        assert len(portfolio.projects) == 1
        assert portfolio.projects[0].title == "Test Project"

    def test_add_project_empty_title_raises_error(self):
        """Test that adding a project with empty title raises error."""
        portfolio = Portfolio()
        project = PortfolioProject(title="", description="A test project")
        with pytest.raises(ValueError):
            portfolio.add_project(project)

    def test_add_download(self):
        """Test adding a download item."""
        portfolio = Portfolio()
        download = DownloadItem(name="Resume", file_path="resume.pdf")
        portfolio.add_download(download)
        assert len(portfolio.downloads) == 1

    def test_add_download_missing_name_raises_error(self):
        """Test that adding download without name raises error."""
        portfolio = Portfolio()
        download = DownloadItem(name="", file_path="resume.pdf")
        with pytest.raises(ValueError):
            portfolio.add_download(download)

    def test_get_projects_by_tag(self):
        """Test filtering projects by tag."""
        portfolio = Portfolio()
        project1 = PortfolioProject(
            title="Web Project",
            description="A web project",
            tags=["web", "python"],
        )
        project2 = PortfolioProject(
            title="ML Project",
            description="An ML project",
            tags=["ml", "python"],
        )
        portfolio.add_project(project1)
        portfolio.add_project(project2)

        web_projects = portfolio.get_projects_by_tag("web")
        assert len(web_projects) == 1
        assert web_projects[0].title == "Web Project"

    def test_get_recent_projects(self):
        """Test getting recent projects."""
        portfolio = Portfolio()
        for i in range(5):
            project = PortfolioProject(
                title=f"Project {i}",
                description=f"Project {i}",
                date_completed=datetime(2024, 1, i + 1),
            )
            portfolio.add_project(project)

        recent = portfolio.get_recent_projects(limit=3)
        assert len(recent) == 3

    def test_portfolio_to_dict(self):
        """Test serializing portfolio to dictionary."""
        portfolio = Portfolio()
        project = PortfolioProject(
            title="Test Project",
            description="A test",
        )
        portfolio.add_project(project)

        result = portfolio.to_dict()
        assert "metadata" in result
        assert "projects" in result
        assert "downloads" in result
        assert len(result["projects"]) == 1
