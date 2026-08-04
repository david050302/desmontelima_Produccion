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
   MENÚ HAMBURGUESA MÓVIL
========================================== */

const headerInner = document.querySelector(".header-inner");
const navMenu = document.querySelector(".nav-menu");
let mobileMenuToggle = document.querySelector(".mobile-menu-toggle");

if (headerInner && navMenu && !mobileMenuToggle) {
    mobileMenuToggle = document.createElement("button");
    mobileMenuToggle.type = "button";
    mobileMenuToggle.className = "mobile-menu-toggle";
    mobileMenuToggle.setAttribute("aria-expanded", "false");
    mobileMenuToggle.setAttribute("aria-label", "Abrir menú");
    mobileMenuToggle.innerHTML = `<span class="bar"></span>`;
    headerInner.insertBefore(mobileMenuToggle, headerInner.querySelector("nav") || headerInner.firstChild);
}

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const expanded = mobileMenuToggle.getAttribute("aria-expanded") === "true";
        mobileMenuToggle.setAttribute("aria-expanded", String(!expanded));
        navMenu.classList.toggle("mobile-open");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("mobile-open")) {
                mobileMenuToggle.setAttribute("aria-expanded", "false");
                navMenu.classList.remove("mobile-open");
            }
        });
    });

    document.addEventListener("click", (event) => {
        if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            mobileMenuToggle.setAttribute("aria-expanded", "false");
            navMenu.classList.remove("mobile-open");
        }
    });
}
