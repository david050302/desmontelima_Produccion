"use strict";

/* SCROLL SUAVE */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

/* HEADER CON SOMBRA */
const header = document.querySelector(".header");
function updateHeader() {
    if (!header) return;
    header.classList.toggle("header--scrolled", window.scrollY > 40);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

/* ANIMACIONES AL HACER SCROLL */
const fadeElements = document.querySelectorAll(".fade-in");
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    fadeElements.forEach((element) => observer.observe(element));
} else {
    fadeElements.forEach((element) => element.classList.add("visible"));
}

/* WHATSAPP TRACKING */
document.querySelectorAll('a[href*="wa.me"]').forEach((button) => {
    button.addEventListener("click", () => console.log("Click WhatsApp"));
});

/* HOVER TARJETAS SOLO EN DISPOSITIVOS CON HOVER */
if (window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".material-card").forEach((card) => {
        card.addEventListener("mouseenter", () => { card.style.transform = "translateY(-8px)"; });
        card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
}

window.addEventListener("load", () => document.body.classList.add("loaded"));

/* MENÚ MÓVIL: un solo toggle, un overlay, sin clones ni X extra */
const headerInner = document.querySelector(".header-inner");
const navMenu = document.querySelector(".nav-menu");
let mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
let mobileMenuOverlay = null;

function ensureMobileToggle() {
    if (!headerInner || !navMenu || mobileMenuToggle) return;
    mobileMenuToggle = document.createElement("button");
    mobileMenuToggle.type = "button";
    mobileMenuToggle.className = "mobile-menu-toggle";
    mobileMenuToggle.setAttribute("aria-expanded", "false");
    mobileMenuToggle.setAttribute("aria-label", "Abrir menú");
    mobileMenuToggle.innerHTML = '<span class="bar"></span>';
    headerInner.insertBefore(mobileMenuToggle, headerInner.firstChild);
}

function collapseAllDropdowns() {
    document.querySelectorAll(".nav-dropdown__menu.open").forEach((el) => el.classList.remove("open"));
    document.querySelectorAll('.nav-dropdown__trigger[aria-expanded="true"]').forEach((btn) => btn.setAttribute("aria-expanded", "false"));
}

function openMobileMenu() {
    if (!mobileMenuToggle || !navMenu || window.innerWidth > 768) return;
    mobileMenuToggle.setAttribute("aria-expanded", "true");
    mobileMenuToggle.setAttribute("aria-label", "Cerrar menú");
    navMenu.classList.add("mobile-open");
    document.body.classList.add("no-scroll");

    if (!mobileMenuOverlay) {
        mobileMenuOverlay = document.createElement("div");
        mobileMenuOverlay.className = "mobile-menu-overlay";
        document.body.appendChild(mobileMenuOverlay);
        mobileMenuOverlay.addEventListener("click", closeMobileMenu);
    }
}

function closeMobileMenu() {
    if (!mobileMenuToggle || !navMenu) return;
    mobileMenuToggle.setAttribute("aria-expanded", "false");
    mobileMenuToggle.setAttribute("aria-label", "Abrir menú");
    navMenu.classList.remove("mobile-open");
    document.body.classList.remove("no-scroll");
    collapseAllDropdowns();
    if (mobileMenuOverlay) {
        mobileMenuOverlay.remove();
        mobileMenuOverlay = null;
    }
}

ensureMobileToggle();

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const expanded = mobileMenuToggle.getAttribute("aria-expanded") === "true";
        expanded ? closeMobileMenu() : openMobileMenu();
    });

    navMenu.addEventListener("click", (event) => {
        const trigger = event.target.closest(".nav-dropdown__trigger");
        if (trigger && window.innerWidth <= 768) {
            event.preventDefault();
            const submenu = trigger.nextElementSibling;
            if (!submenu) return;
            const willOpen = !submenu.classList.contains("open");
            collapseAllDropdowns();
            submenu.classList.toggle("open", willOpen);
            trigger.setAttribute("aria-expanded", String(willOpen));
            return;
        }

        const link = event.target.closest("a");
        if (link && navMenu.classList.contains("mobile-open")) closeMobileMenu();
    });
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMobileMenu();
});
