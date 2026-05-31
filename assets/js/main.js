/* ── CURSOR ───────────────────────────────────────────────────── */
const cursor = document.getElementById('cursor');

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

/* ── NAV ──────────────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
}

/* ── REVEAL ───────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── HERO ANIMATION ───────────────────────────────────────────── */
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('#hero .reveal, .case-hero .reveal, .brand-header.reveal, .creations-header.reveal, .minimal-header.reveal');
    heroElements.forEach((el, i) => setTimeout(() => el.classList.add('visible'), 200 + i * 160));
});

/* ── PROJECT CARD VIDEO HOVER ─────────────────────────────────── */
document.querySelectorAll('.project-card').forEach(card => {
    const video = card.querySelector('video.card-video');
    if (!video) return;
    card.addEventListener('mouseenter', () => video.play());
    card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
});

/* ── PROJECT NAVIGATION ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    const portfolioProjects = [
        { url: 'brand-identity.html',    title: 'ISAAC Branding' },
        { url: 'digital-creations.html', title: 'Digital Creations' },
        { url: 'pokr-app.html',          title: 'Pokr App' },
        { url: 'kikk-festival.html',     title: 'KIKK Festival' },
        { url: 'fontfolio.html',         title: 'Fontfolio' },
        { url: 'cristaline.html',        title: 'Cristaline Rebrand' },
        { url: 'takeaway.html',          title: 'Takeaway (DishDash)' },
        { url: 'bakkerij.html',          title: 'Bakkerij Website' }
    ];

    const caseNav = document.getElementById('dynamic-case-nav');
    if (!caseNav) return;

    const currentUrl = window.location.href.toLowerCase();
    const currentIndex = portfolioProjects.findIndex(proj => {
        const key = proj.url.toLowerCase().replace('.html', '');
        return currentUrl.includes(key);
    });

    if (currentIndex === -1) return;

    const setLink = (el, project) => {
        if (project) {
            el.href = project.url;
            el.querySelector('.case-nav-title').textContent = project.title;
            el.style.opacity = '1';
            el.style.pointerEvents = 'auto';
        } else {
            el.href = '#';
            el.querySelector('.case-nav-title').textContent = 'Geen project';
            el.style.opacity = '0.2';
            el.style.pointerEvents = 'none';
        }
        el.style.visibility = 'visible';
        el.style.display = 'flex';
    };

    setLink(caseNav.querySelector('.prev'), portfolioProjects[currentIndex - 1]);
    setLink(caseNav.querySelector('.next'), portfolioProjects[currentIndex + 1]);
});

/* ── LIGHTBOX ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    const modal    = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.modal-close');

    if (!modal || !modalImg) return;

    document.querySelectorAll('.case-image-grid img, .case-section-body img, .creations-masonry-layout img, .case-images-2 img, .creation-item img')
        .forEach(img => img.addEventListener('click', function() {
            modal.classList.add('show');
            modalImg.src = this.src;
        }));

    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', () => modal.classList.remove('show'));
});