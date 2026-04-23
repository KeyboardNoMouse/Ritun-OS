/* --- DATA --- */

const PROJECTS = [
    {
        title: "NVMe-Health-Core",
        subtitle: "Predictive Maintenance System",
        date: "Mar 2026",
        status: "PUBLIC",
        desc: "An AI-powered telemetry analysis engine and full-stack web dashboard for predicting NVMe drive failures using Random Forest and SMOTE.",
        tags: ["Python", "Machine Learning", "Data Science", "Telemetry"],
    },
    {
        title: "Sky",
        subtitle: "AI Discord Chatbot",
        date: "2026",
        status: "DEPLOYED",
        desc: "Custom Discord bot engineered to automate responses and interact with server users in real-time. Integrated Google Gemini API for advanced natural language processing and intelligent conversational capabilities.",
        tags: ["Python", "Google Gemini API", "Discord.py", "NLP"],
    },
];

const EXPERIENCES = [
    {
        role: "Student Council Member (Media Team)",
        org: "ALPHA Innovation and Tinkerers' Lab, NIE Mysuru",
        period: "Apr 2026 – Present",
    },
    {
        role: "Technical Intern",
        org: "Comedkares",
        period: "Mar 2026 – Present",
    },
    {
        role: "Student Volunteer",
        org: "Youth For Seva",
        period: "2024 – Present",
    },
];

const CERTS = [
    { issuer: "META · COURSERA", name: "Front-End Development" },
    { issuer: "UNIVERSITY OF MICHIGAN · COURSERA", name: "Python Data Structures" },
    { issuer: "DEEPLEARNING.AI · COURSERA", name: "AI For Everyone" },
    { issuer: "IBM · COURSERA", name: "Prompt Engineering Basics" },
];

const BOOT_MESSAGES = [
    "BOOTING KERNEL...",
    "LOADING MODULES...",
    "MOUNTING FILESYSTEM...",
    "INIT COMPLETE...",
    "WELCOME.",
];

/* --- BOOT SEQUENCE --- */
const bootScreen = document.getElementById("boot-screen");
const bootIdle = document.getElementById("boot-idle");
const bootLoadingEl = document.getElementById("boot-loading");
const bootText = document.getElementById("boot-text");
const bootProgressBar = document.getElementById("boot-progress");
const bootProgressText = document.getElementById("boot-progress-text");
const mainApp = document.getElementById("main-app");

bootIdle.addEventListener("click", () => {
    bootIdle.classList.add("hidden");
    bootLoadingEl.classList.remove("hidden");

    let progress = 0;
    let msgIdx = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 12 + 4;
        if (progress > 100) progress = 100;

        bootProgressBar.style.width = progress + "%";
        bootProgressText.textContent = Math.round(progress) + "%";

        const newMsgIdx = Math.floor((progress / 100) * BOOT_MESSAGES.length);
        if (newMsgIdx !== msgIdx && newMsgIdx < BOOT_MESSAGES.length) {
            msgIdx = newMsgIdx;
            bootText.textContent = BOOT_MESSAGES[msgIdx];
        }

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                bootScreen.style.opacity = "0";
                bootScreen.style.transition = "opacity 0.5s ease";
                setTimeout(() => {
                    bootScreen.classList.add("hidden");
                    mainApp.classList.remove("hidden");
                }, 500);
            }, 300);
        }
    }, 80);
});

/* --- POPULATE DATA (Optimized with innerHTML mapping to prevent reflows) --- */

// Projects
document.getElementById("projects-list").innerHTML = PROJECTS.map((p) => `
    <div class="project-card clickable">
        <div class="project-header">
            <div>
                <div class="project-title">${p.title} <span style="color:#6b7280; font-weight:400; font-size:0.9rem">— ${p.subtitle}</span></div>
                <div class="project-date">${p.date}</div>
            </div>
            <div class="project-status">${p.status}</div>
        </div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-tags">${p.tags.map((t) => `<span class="project-tag">${t}</span>`).join("")}</div>
    </div>
`).join("");

// Experiences
document.getElementById("exp-list").innerHTML = EXPERIENCES.map((e) => `
    <div class="exp-card clickable">
        <div>
            <div class="exp-role">${e.role}</div>
            <div class="exp-org">${e.org}</div>
        </div>
        <div class="exp-period">${e.period}</div>
    </div>
`).join("");

// Certs
document.getElementById("certs-grid").innerHTML = CERTS.map((c) => `
    <div class="cert-card clickable">
        <div class="cert-issuer">${c.issuer}</div>
        <div class="cert-name">${c.name}</div>
    </div>
`).join("");


/* --- NAVIGATION --- */
const navLinks = document.querySelectorAll(".nav-link");
const views = document.querySelectorAll(".view");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        const tab = link.dataset.tab;

        // Update active nav state
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");

        // Update active view and re-trigger animation
        views.forEach((v) => v.classList.remove("active"));
        const activeView = document.getElementById(`${tab}-view`);
        activeView.classList.add("active");
    });
});