# Krishna Bhunia's Personal Website

A modern, responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript. This GitHub Pages site showcases my professional profile, contact information, social connections, and downloadable resume.

**🌐 Live Site:** [krishnabhunia.github.io](https://krishnabhunia.github.io)

## Overview

This is a lightweight, single-page static website that serves as a personal landing page. It features:

- **Clean, modern design** with responsive layout
- **Tab-based navigation** for different content sections
- **Interactive photo zoom** on profile picture
- **Dynamic download management** via manifest.json
- **Sticky navigation** for easy access while scrolling
- **Accessibility-first** approach with ARIA attributes
- **Zero dependencies** — pure HTML, CSS, and JavaScript

## Features

### 1. **Tabbed Interface**
Three main sections accessible via tabs:
- **Basic Details** — Contact information (phone, email, father's name/phone)
- **Social Connections** — Links to Facebook, Instagram, LinkedIn with inline SVG icons
- **Download** — Links to profile pages and downloadable documents

### 2. **Photo Zoom Modal**
Click on the profile photo to view an enlarged version in a full-screen modal. Supports keyboard navigation (ESC to close).

### 3. **Dynamic Downloads**
Downloads are managed via `download/manifest.json`, allowing easy addition of new files without editing HTML.

### 4. **Responsive Design**
Optimized for all screen sizes:
- Desktop: Full layout with side-by-side header
- Mobile: Stacked layout with adjusted spacing and font sizes

### 5. **Sticky Header & Tabs**
- Header stays visible while scrolling for quick navigation
- Tab buttons become sticky when scrolling past the header
- Implemented with pure CSS for optimal performance

## Technology Stack

- **HTML5** — Semantic markup with accessibility features
- **CSS3** — Modern layouts using flexbox, CSS variables, and gradients
- **JavaScript (ES6)** — Vanilla JS (no frameworks or libraries)
- **Icons** — Inline SVG icons for social media
- **Fonts** — Google Fonts (Inter) with system font fallbacks

## File Structure

```
krishnabhunia.github.io/
├── index.html                          # Main page
├── README.md                           # This file
├── CODE_REVIEW.md                      # Optimization recommendations
├── styles/
│   └── main.css                        # All styling (consolidated)
├── scripts/
│   ├── tabs.js                         # Tab switching & keyboard navigation
│   ├── photo-zoom.js                   # Click-to-zoom photo modal
│   └── dynamic-downloads.js            # Dynamic download manifest loader
├── download/
│   ├── manifest.json                   # Configuration for downloadable files
│   └── Krishna Resume CV One Pager Exp 12+ Yrs.pdf
├── images/
│   ├── IMG_20170330_113503.jpg         # Profile photo
│   ├── IMG_20170330_093055.jpg         # Background image
│   └── icons/
│       ├── phone-color.svg
│       ├── email-color.svg
│       └── person-color.svg
└── contact.txt                         # Plain text contact info backup
```

## Getting Started

### View Live
Simply visit [krishnabhunia.github.io](https://krishnabhunia.github.io) in your browser.

### Local Preview

Since this is a static site with no build process, you can preview it locally:

#### Option 1: Open in Browser
```bash
open index.html
```

#### Option 2: Local Web Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## JavaScript Modules

### `tabs.js`
Manages tab switching with keyboard navigation:
- Click tabs to switch content
- **Arrow Right/Left** — Navigate between tabs
- **Enter** — Activate selected tab

### `photo-zoom.js`
Displays profile photo in a modal:
- Click profile photo to open modal
- Click backdrop or press **ESC** to close
- Prevents body scroll while modal is open

### `dynamic-downloads.js`
Loads downloadable files from `download/manifest.json`:
- Parses manifest configuration
- Dynamically generates download cards
- Includes error handling with fallback to hardcoded links

## CSS Architecture

### CSS Variables
Defined in `:root` for easy theming:
```css
--primary-color: #2563eb;      /* Blue */
--text-color: #000000;         /* Black */
--bg-color: #f8fafc;           /* Light gray */
--card-bg: #ffffff;            /* White */
```

### Layout & Design
- **Flexbox** — Responsive layouts
- **Sticky positioning** — Header and tabs
- **Gradients** — Visual enhancements
- **Transitions** — Smooth interactions
- **Box shadows** — Depth and separation

## Customization

### Change Colors
Edit the CSS variables in `styles/main.css`:
```css
:root {
    --primary-color: #your-color;
    --text-color: #your-color;
    --bg-color: #your-color;
    --card-bg: #your-color;
}
```

### Add/Update Downloadable Files
1. Add file to `download/` folder
2. Update `download/manifest.json`:
```json
{
  "files": [
    {
      "name": "file_1",
      "path": "download/YourFile.pdf",
      "label": "Your File Label",
      "icon": "📄"
    }
  ]
}
```

### Modify Content
Edit `index.html` directly:
- Update contact information in the "Basic Details" tab
- Add/remove social links in "Social Connections" tab
- Update header text and subtitle

## Performance Optimizations

✅ **Zero Dependencies** — No npm packages or frameworks  
✅ **Lightweight** — ~20KB total assets  
✅ **Native CSS** — No vendor prefixes, modern browser features  
✅ **Pure JavaScript** — No transpilation or bundling needed  
✅ **Lazy Loading** — Scripts loaded with `defer` attribute  
✅ **Fixed Assets** — Images and fonts cached by browser  

## Accessibility

- ✅ Semantic HTML (`<header>`, `<section>`, `<footer>`)
- ✅ ARIA labels and roles for screen readers
- ✅ Keyboard navigation (tabs with arrow keys)
- ✅ Color contrast meets WCAG standards
- ✅ Focus indicators for interactive elements
- ✅ Alt text for all images

## Deployment

This repository uses GitHub Pages for automatic deployment:

1. **Automatic:** Any push to `main` branch updates the live site
2. **URL:** `https://krishnabhunia.github.io`
3. **No build step required** — Static files served directly

To deploy your own version:
1. Fork this repository
2. Rename it to `your-username.github.io`
3. Customize the content
4. Push to `main` branch

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome/Edge | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| IE 11 | ⚠️ Partial (no vendor prefixes) |

Modern browsers recommended for best experience.

## Contact

- **Phone:** +91 865 200 7894
- **Email:** [krishna.bhunia+github@gmail.com](mailto:krishna.bhunia+github@gmail.com)
- **About Me:** [about.me/kbhunia](https://about.me/kbhunia)
- **GitHub:** [github.com/krishnabhunia](https://github.com/krishnabhunia)
- **LinkedIn:** [linkedin.com/in/krishnabhunia](https://linkedin.com/in/krishnabhunia)
- **Facebook:** [facebook.com/kdbhunia](https://facebook.com/kdbhunia)
- **Instagram:** [instagram.com/krishnabhunia](https://instagram.com/krishnabhunia)

## License

This project is personal work. You're welcome to use it as inspiration for your own portfolio, but please don't clone it as your own site.

## Contributing

This is a personal portfolio site, but if you find bugs or have suggestions, feel free to:
1. Open an issue
2. Submit a pull request
3. Contact me directly

## Recent Optimizations

**June 2026 Updates:**
- Removed 75 lines of duplicate inline CSS
- Eliminated vendor prefixes for cleaner code
- Replaced complex sticky tabs JavaScript with native CSS
- Consolidated CSS rules to remove redundancy
- **Result:** 26% reduction in total file size (7KB saved)

See [CODE_REVIEW.md](CODE_REVIEW.md) for detailed optimization recommendations.

---

**Last Updated:** June 13, 2026

Made with ❤️ by Krishna Bhunia
