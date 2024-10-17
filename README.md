# ResearchSurv XML Viewer

![Version](https://img.shields.io/badge/version-1.2-blue)

## Overview

The **ResearchSurv XML Viewer** is a Chrome extension designed to simplify the process of viewing ResearchSurv survey XML files in their raw format. This extension enhances the user experience by providing a colorful, easy-to-read theme that highlights XML structure, making it easier for users to analyze survey data.

## Features

- View XML files from ResearchSurv and Decipher in a formatted and colorful way.
- Easy navigation through different survey files.
- User-friendly interface with a clear call-to-action button to activate the viewer.
- Automatic syntax highlighting for XML attributes, tags, and values.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/ResearchSurv-XML-Viewer.git

2. Open Chrome and navigate to `chrome://extensions/`.

3. Enable "Developer mode" by toggling the switch in the upper right corner.

4. Click "Load unpacked" and select the directory where you cloned this repository.

5. The extension will now be available in your Chrome extensions list!

## Usage

1. Navigate to a supported ResearchSurv or Decipher URL that ends with `.xml`.

2. Click the extension icon to activate the viewer.

3. The raw XML content will be displayed in a well-formatted style.

## Supported URLs

The extension works with the following URL patterns:

- `https://researchsurv.com/apps/lumos/*:raw`
- `https://researchsurv.com/admin/vc/show?file=selfserve/*/survey.xml&when=*`
- `https://prodegemr.decipherinc.com/apps/lumos/*:raw`
- `https://prodegemr.decipherinc.com/admin/vc/show?file=selfserve/*/survey.xml&when=*`

## Development

- **Languages Used**: JavaScript, HTML, CSS
- **Manifest Version**: 3

### Directory Structure

```
ResearchSurv-XML-Viewer/
│
├── manifest.json         # Extension metadata
├── popup.html            # Popup interface
├── popup.js              # Logic for the popup
├── content.js            # Content script for XML highlighting
└── background.js         # Background script for tab handling
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any bugs or have feature requests.

## License

This project is open-source and available for personal use and modification. No formal license has been applied, so feel free to use or modify the code as per your needs.

## Acknowledgments

- Thanks to the developers of Chrome extensions for providing the platform to build this tool.
- Special thanks to ResearchSurv for offering a platform that helps streamline survey data analysis.
