/* ================================================================
   ISAAC ANDRÉ — PORTFOLIO SCRIPTS
   main.js
================================================================ */

/* ── 1. CUSTOM CURSOR ─────────────────────────────────────────── */
const cursor = document.getElementById('cursor');

// VEILIGHEIDSCHECK: Voorkomt dat alles crasht als de cursor niet op de pagina staat
if (cursor) {
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top  = e.clientY + 'px';
    });

    const zoomableImages = '.case-image-grid img, .case-section-body img, .creations-masonry-layout img, .case-images-2 img, .creation-item img';
    const hoverTargets = `a, button, .project-card, .skill-cat, .style-chip, .pet-item, ${zoomableImages}`;

    document.querySelectorAll(hoverTargets).forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
}

/* ── 2. NAV — scroll border ───────────────────────────────────── */
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
}

/* ── 3. SCROLL REVEAL ─────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── 4. HERO — ANIMATIE FIX ───────────────────────────────────── */
window.addEventListener('load', () => {
    // DIT WAS DE FOUT! Hij zoekt nu netjes naar ALLE headers op jouw pagina's
    const heroElements = document.querySelectorAll('#hero .reveal, .case-hero .reveal, .brand-header.reveal, .creations-header.reveal, .minimal-header.reveal');

    heroElements.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 200 + i * 160);
    });
});

/* ── 5. PROJECT CARD VIDEO HOVER ──────────────────────────────── */
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

    const portfolioProjects = [
        { url: "brand-identity.html", title: "ISAAC Branding" },
        { url: "digital-creations.html", title: "Digital Creations" },
        { url: "pokr-app.html", title: "Pokr App" },
        { url: "kikk-festival.html", title: "KIKK Festival" },
        { url: "fontfolio.html", title: "Fontfolio" },
        { url: "cristaline.html", title: "Cristaline Rebrand" },
        { url: "takeaway.html", title: "Takeaway (DishDash)" },
        { url: "bakkerij.html", title: "Bakkerij Website" }
    ];

    const caseNav = document.getElementById('dynamic-case-nav');

    if (caseNav) {
        const currentUrl = window.location.href.toLowerCase();

        let currentIndex = portfolioProjects.findIndex(proj => {
            let searchString = proj.url.toLowerCase().split('/').pop();
            if (searchString === 'index.html') {
                const parts = proj.url.toLowerCase().split('/');
                searchString = parts[parts.length - 2];
            }
            return currentUrl.includes(searchString);
        });

        if (currentIndex !== -1) {
            const prevLink = caseNav.querySelector('.prev');
            const nextLink = caseNav.querySelector('.next');

            if (currentIndex > 0) {
                let prevProject = portfolioProjects[currentIndex - 1];
                prevLink.href = prevProject.url;
                prevLink.querySelector('.case-nav-title').textContent = prevProject.title;
                prevLink.style.visibility = 'visible';
                prevLink.style.display = 'flex';
                prevLink.style.opacity = '1';
                prevLink.style.pointerEvents = 'auto';
            } else {
                prevLink.href = "#";
                prevLink.querySelector('.case-nav-title').textContent = "Geen project";
                prevLink.style.visibility = 'visible';
                prevLink.style.display = 'flex';
                prevLink.style.opacity = '0.2';
                prevLink.style.pointerEvents = 'none';
            }

            if (currentIndex < portfolioProjects.length - 1) {
                let nextProject = portfolioProjects[currentIndex + 1];
                nextLink.href = nextProject.url;
                nextLink.querySelector('.case-nav-title').textContent = nextProject.title;
                nextLink.style.visibility = 'visible';
                nextLink.style.display = 'flex';
                nextLink.style.opacity = '1';
                nextLink.style.pointerEvents = 'auto';
            } else {
                nextLink.href = "#";
                nextLink.querySelector('.case-nav-title').textContent = "Geen project";
                nextLink.style.visibility = 'visible';
                nextLink.style.display = 'flex';
                nextLink.style.opacity = '0.2';
                nextLink.style.pointerEvents = 'none';
            }
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

        const images = document.querySelectorAll('.case-image-grid img, .case-section-body img, .creations-masonry-layout img, .case-images-2 img, .creation-item img');

        images.forEach(img => {
            img.addEventListener('click', function() {
                modal.classList.add('show');
                modalImg.src = this.src;
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('show');
            });
        }

        modal.addEventListener('click', (e) => {
            // Dit zorgt dat de foto ook sluit als je ernaast op de zwarte rand klikt
            modal.classList.remove('show');
        });
    }
});