"""
Portfolio management module for handling site content and metadata.
"""

from dataclasses import dataclass, field
from typing import List, Optional, Dict, Any
from datetime import datetime


@dataclass
class DownloadItem:
    """Represents a single downloadable item."""

    name: str
    file_path: str
    description: Optional[str] = None
    file_type: Optional[str] = None
    date_added: datetime = field(default_factory=datetime.now)

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary for JSON serialization."""
        return {
            "name": self.name,
            "file_path": self.file_path,
            "description": self.description,
            "file_type": self.file_type,
            "date_added": self.date_added.isoformat(),
        }


@dataclass
class PortfolioProject:
    """Represents a portfolio project."""

    title: str
    description: str
    url: Optional[str] = None
    technologies: List[str] = field(default_factory=list)
    date_completed: Optional[datetime] = None
    tags: List[str] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary for JSON serialization."""
        return {
            "title": self.title,
            "description": self.description,
            "url": self.url,
            "technologies": self.technologies,
            "date_completed": self.date_completed.isoformat() if self.date_completed else None,
            "tags": self.tags,
        }


class Portfolio:
    """Main portfolio management class."""

    def __init__(self):
        """Initialize the portfolio."""
        self.projects: List[PortfolioProject] = []
        self.downloads: List[DownloadItem] = []
        self.metadata: Dict[str, Any] = {
            "name": "Krishna Dipayan Bhunia",
            "email": "krishnabhunia@gmail.com",
            "about_url": "https://about.me/kbhunia",
        }

    def add_project(self, project: PortfolioProject) -> None:
        """Add a project to the portfolio."""
        if not project.title:
            raise ValueError("Project title cannot be empty")
        self.projects.append(project)

    def add_download(self, download: DownloadItem) -> None:
        """Add a downloadable item."""
        if not download.name or not download.file_path:
            raise ValueError("Download name and file_path are required")
        self.downloads.append(download)

    def get_projects_by_tag(self, tag: str) -> List[PortfolioProject]:
        """Filter projects by a specific tag."""
        return [p for p in self.projects if tag in p.tags]

    def get_recent_projects(self, limit: int = 5) -> List[PortfolioProject]:
        """Get the most recent projects."""
        sorted_projects = sorted(
            self.projects,
            key=lambda p: p.date_completed or datetime.min,
            reverse=True,
        )
        return sorted_projects[:limit]

    def to_dict(self) -> Dict[str, Any]:
        """Serialize portfolio to dictionary."""
        return {
            "metadata": self.metadata,
            "projects": [p.to_dict() for p in self.projects],
            "downloads": [d.to_dict() for d in self.downloads],
        }
