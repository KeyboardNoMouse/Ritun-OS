# 🚀 PASSPORT — Personal Portfolio

A futuristic, terminal-inspired personal portfolio website built to showcase my identity, projects, experience, and network.

> “Building the web, one line at a time.”

---

## 🧠 Overview

**PASSPORT** is a modern, interactive portfolio designed with a **boot-sequence UI** and a **system-interface aesthetic**.  
It reflects my journey as a **Full Stack Developer & AI/ML Engineer in training**.

The site is structured like a digital identity system with sections such as:
- Identity
- Projects
- Certifications
- Network

---

## ✨ Features

- ⚡ **Boot Animation System**  
  Interactive startup sequence before entering the main app

- 🧭 **Tab-based Navigation (SPA Style)**  
  Smooth switching between sections without page reload

- 🧑‍💻 **Dynamic Content Rendering**  
  Projects, experience, and certifications are injected via JavaScript

- 🎨 **Modern UI/UX**
  - Dark futuristic theme
  - Subtle animations & hover effects
  - Glassmorphism + gradient background

- 📱 **Fully Responsive Design**

---

## 🛠️ Tech Stack

### Frontend
- HTML5  
- CSS3 (Custom properties + animations)  
- Vanilla JavaScript  

### Fonts & Assets
- Google Fonts: `Syne`, `Space Mono`

### Concepts Used
- DOM Manipulation  
- Event-driven UI  
- Component-style rendering (via JS arrays)  
- CSS animations & transitions  

---

## ⚙️ How It Works

### 🔹 Boot Sequence
- Triggered on click
- Simulates system loading with:
  - Progress bar
  - Dynamic messages
- Transitions into main UI

### 🔹 Dynamic Sections
Data is stored in arrays inside `script.js`:
- `PROJECTS`
- `EXPERIENCES`
- `CERTS`


🚀 Getting Started
1. Clone the repository
git clone https://github.com/your-username/passport-portfolio.git
2. Open in browser
cd passport-portfolio
open index.html

No build tools required — pure frontend.

🎯 Customization Guide
Update Personal Info

Edit inside index.html:

Name
Description
Links
Add Projects

Modify in script.js:

const PROJECTS = [
  {
    title: "",
    subtitle: "",
    date: "",
    status: "",
    desc: "",
    tags: []
  }
];
Change Theme

Modify CSS variables in styles.css:

:root {
  --bg-color: #040407;
  --accent-color: #3b82f6;
}
🧩 Future Improvements
🔗 Add project links & live demos
🧠 Integrate real AI assistant
📊 Add analytics dashboard
🌙 Theme switcher
📝 Blog/Logs section
🤝 Connect With Me
LinkedIn: https://www.linkedin.com/in/ritun-jain-23b683309/
GitHub: https://github.com/KeyboardNoMouse
Email: ritunjain246@gmail.com
📄 License

This project is open-source and free to use for personal portfolio inspiration.
