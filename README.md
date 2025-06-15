# Token Stack Selector

![Token Stack Selector Demo](https://github.com/Sub-Dev/token-stack-selector/blob/master/screenshots/test-gif.gif)

![Foundry VTT](https://img.shields.io/badge/Foundry%20VTT-Compatible-orange)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

> 🇧🇷 **Portuguese speakers**: Check out [README.pt-BR.md](README.pt-BR.md) for the Portuguese version.

## 📋 Description

**Token Stack Selector** is a modern module for Foundry VTT that solves the problem of stacked (overlapping) tokens. When multiple tokens occupy the same position on the grid, this module adds an elegant and intuitive interface to easily select the desired token.

## ✨ Features

### 🎯 **Modern Interface**

- **Premium Design**: Interface similar to Foundry's native condition panel
- **Unique Icon**: Visual combination of user group + crosshairs for quick identification
- **Smooth Animations**: Elegant transitions and visual feedback
- **Visual Counter**: Badge showing how many tokens are stacked

### 🖱️ **Advanced Features**

- **Hover Preview**: Shows stacked tokens when hovering over them (800ms delay)
- **Smart Selection**: Selected token automatically comes to front
- **Detailed Information**: Shows name, actor type and HP when available
- **Smart Positioning**: Panel automatically adjusts to not go off screen
- **Multiple Ways to Close**: Click outside, ESC or automatic selection

### 🔧 **User Experience**

- **Correct Drag & Drop**: Selected token can be moved immediately
- **Visual Feedback**: Notifications confirming actions
- **Automatic Restoration**: Z-index returns to normal after deselection
- **Custom Scrollbar**: Design consistent with Foundry theme

## 🚀 Installation

### Method 1: Automatic Installation

1. Open Foundry VTT
2. Go to **Setup** → **Add-on Modules**
3. Click **Install Module**
4. Paste this manifest: `https://github.com/Sub-Dev/token-stack-selector/releases/latest/download/module.json`
5. Click **Install**

### Method 2: Manual Installation

1. Download the ZIP file from the [latest release](https://github.com/Sub-Dev/token-stack-selector/releases/latest)
2. Extract to your Foundry VTT `Data/modules/` folder
3. Restart Foundry VTT
4. Enable the module in the desired world

## 🎮 How to Use

1. **Hover Preview**: Simply hover your mouse over stacked tokens to see a preview of all tokens (appears after 800ms)
2. **Stacked Tokens**: When two or more tokens occupy the same position, the button automatically appears in the Token HUD
3. **Open Selector**: Click the button with crosshairs + user group icon
4. **Choose Token**: Click the desired token in the panel that appears
5. **Interact**: The selected token automatically comes to front and can be moved normally

## 🖼️ Screenshots

### 🎬 **Demo in Action**

![Token Stack Selector Demo](https://github.com/Sub-Dev/token-stack-selector/blob/master/screenshots/test-gif.gif)

_Complete workflow: hover preview → HUD button → selection panel → token selection_

---

### 🖱️ **Hover Preview**

![Hover Preview](https://github.com/Sub-Dev/token-stack-selector/blob/master/screenshots/menu-hover.png)

_Modern preview showing stacked tokens when hovering (800ms delay)_

---

### 🎯 **Selection Panel**

![Selection Panel](https://github.com/Sub-Dev/token-stack-selector/blob/master/screenshots/menu-token-select.png)

_Elegant selection interface with token details and smart positioning_

---

### 📚 **Token Menu**

![Token Menu](https://github.com/Sub-Dev/token-stack-selector/blob/master/screenshots/menu.png)

_Complete interface showing all module features in action_

## 🔧 Compatibility

- **Foundry VTT**: v11 - v13
- **Systems**: Compatible with all systems
- **Modules**: No known conflicts

## 📝 Release Notes

### v1.0.0

- ✅ Modern interface with premium design
- ✅ Smart selection of stacked tokens
- ✅ Automatic z-index system
- ✅ Animations and visual feedback
- ✅ Support for multiple interaction methods

## 🏗️ Module Architecture

This module uses a **modular architecture** for better maintainability and scalability:

```
src/
├── components/           # UI components
│   ├── token-hooks-manager.js
│   ├── token-selection-panel.js
│   └── token-stack-button.js
├── utils/               # Utilities and helpers
│   ├── token-detector.js
│   └── token-layer-manager.js
├── styles/              # CSS styles
│   └── token-stack-styles.js
└── token-stack-selector.js  # Main orchestrator
```

### Debug Commands

Open browser console and use:

```javascript
TokenStackSelector.debug(); // Debug information
TokenStackSelector.getStats(); // Module statistics
TokenStackSelector.reload(); // Reload module
TokenStackSelector.shutdown(); // Shutdown module
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### 📸 Contributing Screenshots

Help improve the documentation by adding screenshots:

1. Check [screenshots/README.md](screenshots/README.md) for needed images
2. Take high-quality screenshots showing the module in action
3. Follow the naming conventions specified
4. Submit via Pull Request with descriptive commit messages

## 🐛 Bug Reports

Found a problem? [Open an issue](https://github.com/Sub-Dev/token-stack-selector/issues) with:

- Foundry VTT version
- Module version
- Steps to reproduce the bug
- Screenshots (if applicable)

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- Foundry VTT Brazil Community
- Foundry VTT Developers
- All users who tested and provided feedback

---

**Developed with ❤️ for the Foundry VTT community**
