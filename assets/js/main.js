/* ================================================================
   ISAAC ANDRÉ — PORTFOLIO SCRIPTS
   main.js
================================================================ */

/* ── 1. CUSTOM CURSOR ─────────────────────────────────────────── */
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
});

// Enlarge cursor over interactive elements
const hoverTargets = 'a, button, .project-card, .skill-cat, .style-chip, .pet-item';
document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// Hide cursor when mouse leaves window
document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
document.addEventListener('mouseenter', () => cursor.style.opacity = '1');

/* ── 2. NAV — scroll border ───────────────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── 3. SCROLL REVEAL ─────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // trigger once
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── 4. HERO — staggered entrance on page load ────────────────── */
window.addEventListener('load', () => {
    document.querySelectorAll('#hero .reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 200 + i * 160);
    });
});

/* ── 5. PROJECT CARD VIDEO HOVER (optional) ───────────────────── */
document.querySelectorAll('.project-card').forEach(card => {
    const video = card.querySelector('video.card-video');
    if (!video) return;
    card.addEventListener('mouseenter', () => video.play());
    card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});


/* ================================================================
   6. DYNAMISCHE PROJECT NAVIGATIE
================================================================ */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Zorg dat deze links EXACT kloppen met de bestanden in je map!
    const portfolioProjects = [
        { url: "pokr-app.html", title: "Pokr" },
        { url: "kikk-festival.html", title: "KIKK Festival" },
        { url: "fontfolio.html", title: "Fontfolio" },
        { url: "cristaline.html", title: "Cristaline Rebrand" },
        { url: "takeaway.html", title: "Takeaway (DishDash)" },
        { url: "bakkerij.html", title: "Bakkerij Website" }

    ];

    const caseNav = document.getElementById('dynamic-case-nav');

    if (caseNav) {
        const currentUrl = window.location.href.toLowerCase();

        // Zoek naar het juiste project op basis van de link
        let currentIndex = portfolioProjects.findIndex(proj => {
            let searchString = proj.url.toLowerCase().split('/').pop();
            // Als de naam 'index.html' is, zoek dan naar de mapnaam (zoals 'bakkerij')
            if (searchString === 'index.html') {
                const parts = proj.url.toLowerCase().split('/');
                searchString = parts[parts.length - 2];
            }
            return currentUrl.includes(searchString);
        });

        if (currentIndex !== -1) {
            const prevLink = caseNav.querySelector('.prev');
            const nextLink = caseNav.querySelector('.next');

            // Vorige knop instellen
            if (currentIndex > 0) {
                let prevProject = portfolioProjects[currentIndex - 1];
                prevLink.href = prevProject.url;
                prevLink.querySelector('.case-nav-title').textContent = prevProject.title;
                prevLink.style.visibility = 'visible';
                prevLink.style.display = 'flex';
            } else {
                prevLink.style.visibility = 'hidden';
                prevLink.style.display = 'none'; // Haal hem weg voor een mooiere layout als er geen vorig project is
            }

            // Volgende knop instellen
            if (currentIndex < portfolioProjects.length - 1) {
                let nextProject = portfolioProjects[currentIndex + 1];
                nextLink.href = nextProject.url;
                nextLink.querySelector('.case-nav-title').textContent = nextProject.title;
                nextLink.style.visibility = 'visible';
                nextLink.style.display = 'flex';
            } else {
                nextLink.style.visibility = 'hidden';
                nextLink.style.display = 'none';
            }
        } else {
            console.warn("Projectnavigatie kon niet geladen worden. Check of de bestandsnaam klopt in de array.");
        }
    }
});

/* ================================================================
   7. IMAGE LIGHTBOX (ZOOM FUNCTIE)
================================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.modal-close');

    if (modal && modalImg) {
        // Selecteer alle afbeeldingen binnen je case-secties
        const images = document.querySelectorAll('.case-image-grid img, .case-section-body img');

        // Geef elke afbeelding een klik-event
        images.forEach(img => {
            img.addEventListener('click', function() {
                modal.classList.add('show');
                modalImg.src = this.src; // Kopieer de klikbare afbeelding naar de grote weergave
            });
        });

        // Sluit de modal door op het kruisje te klikken
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('show');
            });
        }

        // Sluit de modal door eender waar op de donkere achtergrond of de foto te klikken
        modal.addEventListener('click', (e) => {
            modal.classList.remove('show');
        });
    }
});