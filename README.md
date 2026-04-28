# GitHub PoC Explorer 🛡️

[Español](README_ES.md) | **English**

---

**GitHub PoC Explorer** is an advanced, minimalist tool designed for security analysts, researchers, and cybersecurity enthusiasts. It allows for fast and efficient searches of Proof of Concepts (PoCs) hosted on GitHub, utilizing the [PoC-in-GitHub](https://poc-in-github.motikan2010.net/) database.

The application is built with a focus on speed, allowing you to go from a CVE ID to an exploit repository in seconds.

## ✨ Key Features

- **Instant CVE Search**: Find specific exploits simply by entering the CVE ID (e.g., `CVE-2023-48795`).
- **Input Sanitization**: Automatic cleaning of spaces and extra characters to ensure accurate searches.
- **Advanced Filters**:
  - **Sorting**: Toggle between the latest added PoCs or the most popular ones (by star count).
  - **Star Threshold**: Filter results in real-time to find only the highest-impact repositories.
- **Premium Design**: Modern interface based on *Glassmorphism* with full dark mode support.
- **Optimized Workflow**:
  - Fast copying of CVE IDs to the clipboard.
  - Direct links to GitHub repositories.
  - Expandable views with detailed vulnerability descriptions.

## 🚀 Technologies Used

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Styling**: Modern CSS3 (Variables, Flexbox, Grid, Animations)
- **API**: [PoC-in-GitHub API](https://poc-in-github.motikan2010.net/api/v1/)

## 🛠️ Installation and Setup

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd GitHubPoCExplorer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser at `http://localhost:5173`.

## 📡 Proxy Configuration (CORS)

Since the PoC-in-GitHub API does not allow direct browser requests (CORS), this project uses Vite's development server as a proxy. The configuration is in `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'https://poc-in-github.motikan2010.net',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

## ⚠️ Disclaimer / Disclaimer Legal

This tool is for educational and research purposes only. The author is not responsible for any misuse, damage, or illegal activities carried out with this application. Use it responsibly and always within the legal framework and GitHub's policies.

---
Developed with ❤️ for the security community.
