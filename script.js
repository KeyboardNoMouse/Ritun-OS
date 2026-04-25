/* --- DATA --- */
const PROJECTS = [
    {
        title: "NVMe-Drive-Analyzer",
        subtitle: "Predictive Maintenance System",
        date: "Mar 2026",
        status: "PUBLIC",
        statusClass: "",
        desc: "An AI-powered telemetry analysis engine and full-stack web dashboard for predicting NVMe drive failures using Random Forest and SMOTE.",
        tags: ["Python", "Machine Learning", "Data Science", "Telemetry"],
    },
    {
        title: "Sky",
        subtitle: "AI Discord Chatbot",
        date: "2026",
        status: "DEPLOYED",
        statusClass: "s-deployed",
        desc: "Custom Discord bot engineered to automate responses and interact with server users in real-time. Integrated Google Gemini API for advanced natural language processing and intelligent conversational capabilities.",
        tags: ["Python", "Google Gemini API", "Discord.py", "NLP"],
    },
];

const EXPERIENCES = [
    {
        role: "Student Council Member (Media Team)",
        org: "ALPHA Innovation and Tinkerers' Lab, NIE Mysuru",
        period: "Feb 2026 – Present",
        skills: "Learning text and keyframe animations using After Effects and Premiere Pro. Representing the lab at external company project expos and industry showcases.",
    },
    {
        role: "Internship Trainee",
        org: "Comedkares",
        period: "Oct 2024 – Jan 2025",
        skills: "Worked with industry-standard tools including OnShape for 3D modelling and Figma for UI/UX prototyping.",
    },
    {
        role: "Student Volunteer",
        org: "Youth For Seva",
        period: "Nov 2025 – Present",
        skills: "Actively participating in community impact events such as city cleaning drives and teaching school students in underserved areas.",
    },
];

const CERTS = [
    { issuer: "META · COURSERA", name: "Front-End Development" },
    { issuer: "UNIVERSITY OF MICHIGAN · COURSERA", name: "Python Data Structures" },
    { issuer: "DEEPLEARNING.AI · COURSERA", name: "AI For Everyone" },
    { issuer: "IBM · COURSERA", name: "Prompt Engineering Basics" },
];

const BOOT_LOG = [
    "KERNEL 6.4.2-ritun loaded",
    "CPU: 8-core · RAM: 16GB OK",
    "FILESYSTEM: /identity mounted",
    "NETWORK: secure channel established",
    "AI_ENGINE: models initialized",
    "PASSPORT UI: rendering...",
];

/* --- STAR PARTICLES ON BOOT --- */
const starsContainer = document.getElementById("boot-stars");
const STAR_COUNT = 80;

for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement("div");
    star.className = "star";
    const size = Math.random() * 2.5 + 0.5;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = (Math.random() * 3 + 2).toFixed(1);
    const del = (Math.random() * 4).toFixed(2);
    const isBlue = Math.random() > 0.5;
    star.style.cssText = `
        width:${size}px; height:${size}px;
        left:${x}%; top:${y}%;
        background:${isBlue ? "#38bdf8" : "#a78bfa"};
        --d:${dur}s; --del:${del}s;
        box-shadow: 0 0 ${size * 2}px ${isBlue ? "#38bdf8" : "#a78bfa"};
    `;
    starsContainer.appendChild(star);
}

/* --- CUSTOM CURSOR --- */
const cursorDot = document.getElementById("cursor-dot");
const cursorRing = document.getElementById("cursor-ring");
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
});

function animateRing() {
    const ease = 0.12;
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;
    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";
    requestAnimationFrame(animateRing);
}
animateRing();

document.addEventListener("mouseover", (e) => {
    if (e.target.closest("button, a, .skill-card, .cert-card, .project-card, .exp-card, .tech-list span")) {
        document.body.classList.add("cursor-hover");
    }
});
document.addEventListener("mouseout", (e) => {
    if (e.target.closest("button, a, .skill-card, .cert-card, .project-card, .exp-card, .tech-list span")) {
        document.body.classList.remove("cursor-hover");
    }
});

/* --- BOOT SEQUENCE --- */
const bootScreen = document.getElementById("boot-screen");
const bootIdle = document.getElementById("boot-idle");
const bootLoadingEl = document.getElementById("boot-loading");
const bootTextEl = document.getElementById("boot-text");
const bootProgressBar = document.getElementById("boot-progress");
const bootProgressText = document.getElementById("boot-progress-text");
const bootLogEl = document.getElementById("boot-log");
const mainApp = document.getElementById("main-app");

bootIdle.addEventListener("click", () => {
    bootIdle.classList.add("hidden");
    bootLoadingEl.classList.remove("hidden");

    let progress = 0;
    let logIdx = 0;

    const addLogLine = (text, cls = "active") => {
        const prev = bootLogEl.querySelector(".active");
        if (prev) prev.className = "boot-log-line done";
        if (bootLogEl.children.length >= 5) {
            bootLogEl.removeChild(bootLogEl.firstChild);
        }
        const line = document.createElement("div");
        line.className = `boot-log-line ${cls}`;
        line.textContent = text;
        bootLogEl.appendChild(line);
    };

    const interval = setInterval(() => {
        progress += Math.random() * 11 + 3.5;
        if (progress > 100) progress = 100;

        bootProgressBar.style.width = progress + "%";
        bootProgressText.textContent = Math.round(progress) + "%";

        const expectedLog = Math.floor((progress / 100) * BOOT_LOG.length);
        while (logIdx < expectedLog && logIdx < BOOT_LOG.length) {
            addLogLine(BOOT_LOG[logIdx]);
            logIdx++;
        }

        const statusPct = Math.round(progress);
        if (statusPct < 30) bootTextEl.textContent = "LOADING KERNEL...";
        else if (statusPct < 55) bootTextEl.textContent = "MOUNTING MODULES...";
        else if (statusPct < 80) bootTextEl.textContent = "COMPILING UI...";
        else if (statusPct < 100) bootTextEl.textContent = "FINALIZING...";
        else bootTextEl.textContent = "INIT COMPLETE.";

        if (progress >= 100) {
            clearInterval(interval);
            const last = bootLogEl.querySelector(".active");
            if (last) last.className = "boot-log-line done";
            setTimeout(() => {
                bootScreen.style.opacity = "0";
                bootScreen.style.transition = "opacity 0.6s ease";
                setTimeout(() => {
                    bootScreen.classList.add("hidden");
                    mainApp.classList.remove("hidden");
                }, 600);
            }, 350);
        }
    }, 75);
});

/* --- POPULATE DATA --- */

// Projects
document.getElementById("projects-list").innerHTML = PROJECTS.map((p, i) => `
    <div class="project-card" data-num="0${i + 1}">
        <div class="project-header">
            <div>
                <div class="project-title">${p.title} <span style="color:#334155;font-weight:400;font-size:0.9rem">— ${p.subtitle}</span></div>
                <div class="project-date">${p.date}</div>
            </div>
            <div class="project-status ${p.statusClass}">${p.status}</div>
        </div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join("")}</div>
    </div>
`).join("");

// Experiences — separate section
const expListEl = document.getElementById("exp-list");
if (expListEl) {
    expListEl.innerHTML = EXPERIENCES.map(e => `
        <div class="exp-card">
            <div class="exp-header">
                <div>
                    <div class="exp-role">${e.role}</div>
                    <div class="exp-org">${e.org}</div>
                </div>
                <div class="exp-period">${e.period}</div>
            </div>
            <div class="exp-skills">${e.skills}</div>
        </div>
    `).join("");
}

// Certs
document.getElementById("certs-grid").innerHTML = CERTS.map((c, i) => `
    <div class="cert-card">
        <div class="cert-issuer">${c.issuer}</div>
        <div class="cert-name">${c.name}</div>
        <div style="position:absolute;bottom:1rem;right:1.2rem;font-family:var(--font-mono);font-size:2.2rem;font-weight:800;color:rgba(56,189,248,0.035);line-height:1;pointer-events:none">0${i+1}</div>
    </div>
`).join("");

/* --- NAVIGATION --- */
const navLinks = document.querySelectorAll(".nav-link");
const views = document.querySelectorAll(".view");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        const tab = link.dataset.tab;
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        views.forEach(v => {
            v.classList.remove("active");
            void v.offsetWidth;
        });
        const target = document.getElementById(`${tab}-view`);
        if (target) target.classList.add("active");
    });
});
