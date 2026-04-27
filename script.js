/* --- DATA --- */
const PROJECTS = [
    {
        title: "NVMe Drive Failure Predictor & Fleet Dashboard",
        subtitle: "Predictive Maintenance System",
        date: "Mar 2026",
        status: "PUBLIC",
        statusClass: "",
        desc: "An AI-powered telemetry analysis engine and full-stack web dashboard for predicting NVMe drive failures using Random Forest and SMOTE.",
        tags: ["Python", "Machine Learning", "Data Science", "Telemetry"],
        github: "https://github.com/KeyboardNoMouse/NVMe-Drive-Failiure-Predictor",
        demo: null,
        images: [
            { src: "images/architecture1.png", caption: "System Architecture" },
            { src: "images/architecture2.png", caption: "Request Lifecycle" },
            { src: "images/screenshot1.png", caption: "Fleet Dashboard" },
            { src: "images/screenshot2.png", caption: "Predictor" },
        ],
    },
    {
        title: "Sky",
        subtitle: "AI Discord Chatbot",
        date: "2026",
        status: "DEPLOYED",
        statusClass: "s-deployed",
        desc: "Custom Discord bot engineered to automate responses and interact with server users in real-time. Integrated Google Gemini API for advanced natural language processing and intelligent conversational capabilities.",
        tags: ["Python", "Google Gemini API", "Discord.py", "NLP"],
        github: "https://github.com/KeyboardNoMouse/Discord-AI-Chatbot",
        demo: null,
        images: [
            { src: "images/image4.png", caption: "Bot Architecture" },
            { src: "images/image2.png", caption: "Conversation Demo" },
            { src: "images/image3.png", caption: "Conversation Demo" },
            { src: "images/image1.png", caption: "Discord Profile" },
        ],
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
        skills: "Working with industry-standard tools including OnShape for 3D modelling and Figma for UI/UX prototyping.",
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

/* --- POPULATE PROJECTS --- */
document.getElementById("projects-list").innerHTML = PROJECTS.map((p, i) => {

    // Build link buttons
    const githubBtn = p.github ? `
        <a href="${p.github}" target="_blank" rel="noreferrer" class="project-link-btn project-link-github">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            Source
        </a>` : "";

    const demoBtn = p.demo ? `
        <a href="${p.demo}" target="_blank" rel="noreferrer" class="project-link-btn project-link-demo">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Live Demo
        </a>` : "";

    // Build image gallery
    const hasImages = p.images && p.images.length > 0;

    return `
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
            <div class="project-footer">
                <div class="project-footer-top">
                    <div class="project-links">
                        ${githubBtn}
                        ${demoBtn}
                    </div>
                    ${`
        <button class="gallery-toggle" data-project="${i}" onclick="toggleGallery(${i})">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            ${hasImages ? `Architecture & Screenshots (${p.images.length})` : "Architecture & Screenshots"}
            <svg class="gallery-toggle-chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </button>`}
                </div>
                <div class="gallery-panel" id="gallery-${i}">
                    ${hasImages
                        ? `<div class="gallery-grid">
                            ${p.images.map((img, j) => `
                                <div class="gallery-item" onclick="openLightbox('${img.src}', '${img.caption || ""}')">
                                    <img src="${img.src}" alt="${img.caption || `Screenshot ${j + 1}`}" loading="lazy" />
                                    ${img.caption ? `<div class="gallery-caption">${img.caption}</div>` : ""}
                                </div>
                            `).join("")}
                           </div>`
                        : `<div class="gallery-empty">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <polyline points="21 15 16 10 5 21"></polyline>
                                </svg>
                                <p>No images yet</p>
                                <span>Add image paths to the PROJECTS array in script.js</span>
                            </div>`
                    }
                </div>
            </div>
        </div>
    `;
}).join("");

/* --- GALLERY TOGGLE --- */
function toggleGallery(idx) {
    const panel = document.getElementById(`gallery-${idx}`);
    const btn = document.querySelector(`[data-project="${idx}"]`);
    const isOpen = panel.classList.contains("open");
    panel.classList.toggle("open", !isOpen);
    btn.classList.toggle("active", !isOpen);
}

/* --- LIGHTBOX --- */
function openLightbox(src, caption) {
    const existing = document.getElementById("lightbox-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "lightbox-overlay";
    overlay.innerHTML = `
        <div class="lightbox-backdrop" onclick="closeLightbox()"></div>
        <div class="lightbox-box">
            <button class="lightbox-close" onclick="closeLightbox()">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <img src="${src}" alt="${caption}" class="lightbox-img" />
            ${caption ? `<div class="lightbox-caption">${caption}</div>` : ""}
        </div>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add("visible"));
    document.addEventListener("keydown", lightboxKeyHandler);
}

function closeLightbox() {
    const overlay = document.getElementById("lightbox-overlay");
    if (!overlay) return;
    overlay.classList.remove("visible");
    setTimeout(() => overlay.remove(), 250);
    document.removeEventListener("keydown", lightboxKeyHandler);
}

function lightboxKeyHandler(e) {
    if (e.key === "Escape") closeLightbox();
}

/* --- POPULATE EXPERIENCES --- */
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

/* --- POPULATE CERTS --- */
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
