"use strict";

/* ==========================================
   SCROLL SUAVE
========================================== */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

    anchor.addEventListener("click", function (e) {

        const href = this.getAttribute("href");

        if (href === "#") return;

        const target = document.querySelector(href);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* ==========================================
   HEADER CON SOMBRA
========================================== */

const header = document.querySelector(".header");

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {
        header.classList.add("header--scrolled");
    } else {
        header.classList.remove("header--scrolled");
    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* ==========================================
   ANIMACIONES AL HACER SCROLL
========================================== */

const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px"
    }

);

fadeElements.forEach((element) => {

    observer.observe(element);

});


/* ==========================================
   BOTÓN WHATSAPP (TRACKING FUTURO)
========================================== */

document.querySelectorAll('a[href*="wa.me"]').forEach((button) => {

    button.addEventListener("click", () => {

        console.log("Click WhatsApp");

        /*
        Aquí más adelante podremos conectar:

        gtag('event','click_whatsapp');

        o Meta Pixel

        fbq('trackCustom','ClickWhatsApp');

        */

    });

});


/* ==========================================
   EFECTO HOVER TARJETAS
========================================== */

document.querySelectorAll(".material-card").forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* ==========================================
   CARGA COMPLETA
========================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/* ==========================================
   MENÚ HAMBURGUESA MÓVIL (drawer) + overlay
   - crea toggle si falta
   - bloquea scroll con body.no-scroll
   - crea overlay clicable que cierra
   - convierte dropdown en colapsable
========================================== */

const headerInner = document.querySelector(".header-inner");
const navMenu = document.querySelector(".nav-menu");
let mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
let mobileMenuOverlay = null;

function createMobileToggleIfNeeded() {
    if (!headerInner || !navMenu) return;
    if (!mobileMenuToggle) {
        mobileMenuToggle = document.createElement("button");
        mobileMenuToggle.type = "button";
        mobileMenuToggle.className = "mobile-menu-toggle";
        mobileMenuToggle.setAttribute("aria-expanded", "false");
        mobileMenuToggle.setAttribute("aria-label", "Abrir menú");
        mobileMenuToggle.innerHTML = `<span class="bar"></span>`;
        // insert before first element so it appears on the left
        headerInner.insertBefore(mobileMenuToggle, headerInner.firstChild);
    }
}

function openMobileMenu() {
    if (!mobileMenuToggle || !navMenu) return;
    mobileMenuToggle.setAttribute("aria-expanded", "true");
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
    navMenu.classList.remove("mobile-open");
    document.body.classList.remove("no-scroll");
    if (mobileMenuOverlay) {
        mobileMenuOverlay.remove();
        mobileMenuOverlay = null;
    }
}

createMobileToggleIfNeeded();

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const expanded = mobileMenuToggle.getAttribute("aria-expanded") === "true";
        if (expanded) closeMobileMenu();
        else openMobileMenu();
    });

    // Close the drawer when a link is clicked (good for mobile)
    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("mobile-open")) {
                closeMobileMenu();
            }
        });
    });

    // Click outside should also close the drawer (desktop fallback)
    document.addEventListener("click", (event) => {
        if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            closeMobileMenu();
        }
    });

    // make dropdowns collapsible on mobile
    document.querySelectorAll('.nav-dropdown__trigger').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            // allow default behavior on wide screens; on mobile toggle submenu
            const submenu = btn.nextElementSibling;
            if (!submenu) return;
            e.preventDefault();
            submenu.classList.toggle('open');
            btn.setAttribute('aria-expanded', submenu.classList.contains('open'));
        });
    });

}
