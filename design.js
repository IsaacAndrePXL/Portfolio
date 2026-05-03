/* ================================================================
   VISUAL DESIGN PAGE — design.js
================================================================ */

/* ── 1. CUSTOM CURSOR ─────────────────────────────────────────── */
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
});
document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
document.addEventListener('mouseenter', () => cursor.style.opacity = '1');

document.querySelectorAll('a, button, .gallery-card, .filter-pill').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

/* ── 2. SCROLL REVEAL ─────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in');
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

// Hero reveals on load
window.addEventListener('load', () => {
    document.querySelectorAll('.page-hero .reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('in'), 150 + i * 140);
    });
});

/* ── 3. FILTER PILLS ──────────────────────────────────────────── */
const pills = document.querySelectorAll('.filter-pill');
const cards = document.querySelectorAll('.gallery-card');

pills.forEach(pill => {
    pill.addEventListener('click', () => {
        // Update active state
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.dataset.filter;

        cards.forEach(card => {
            if (filter === 'all' || card.dataset.tool === filter) {
                card.classList.remove('hidden');
                // Re-trigger reveal if needed
                setTimeout(() => card.classList.add('in'), 10);
            } else {
                card.classList.add('hidden');
            }
        });

        // Hide/show tool section headers if all cards in section are hidden
        document.querySelectorAll('.tool-section').forEach(section => {
            const visibleCards = section.querySelectorAll('.gallery-card:not(.hidden)');
            section.style.display = visibleCards.length === 0 ? 'none' : '';
        });
    });
});

/* ── 4. LIGHTBOX ──────────────────────────────────────────────── */
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
const lbCounter = document.getElementById('lb-counter');
const lbClose   = document.getElementById('lb-close');
const lbPrev    = document.getElementById('lb-prev');
const lbNext    = document.getElementById('lb-next');

let currentIndex = 0;
let activeCards  = [];

function getActiveCards() {
    return [...document.querySelectorAll('.gallery-card:not(.hidden)')];
}

function openLightbox(index) {
    activeCards  = getActiveCards();
    currentIndex = index;
    updateLightbox();

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Trigger visible state after next frame (for CSS transition)
    requestAnimationFrame(() => {
        requestAnimationFrame(() => lightbox.classList.add('visible'));
    });
}

function closeLightbox() {
    lightbox.classList.remove('visible');
    setTimeout(() => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        lbImg.src = '';
    }, 300);
}

function updateLightbox() {
    const card = activeCards[currentIndex];
    if (!card) return;

    lbImg.src       = card.dataset.src;
    lbCaption.textContent = card.dataset.title;
    lbCounter.textContent = `${currentIndex + 1} / ${activeCards.length}`;
}

function goPrev() {
    currentIndex = (currentIndex - 1 + activeCards.length) % activeCards.length;
    updateLightbox();
}

function goNext() {
    currentIndex = (currentIndex + 1) % activeCards.length;
    updateLightbox();
}

// Open on card click
cards.forEach(card => {
    card.addEventListener('click', () => {
        activeCards = getActiveCards();
        const idx = activeCards.indexOf(card);
        if (idx !== -1) openLightbox(idx);
    });
});

// Controls
lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', goPrev);
lbNext.addEventListener('click', goNext);

// Click outside image
lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
});

// Keyboard
document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')       closeLightbox();
    if (e.key === 'ArrowLeft')    goPrev();
    if (e.key === 'ArrowRight')   goNext();
});

// Add cursor hover to lightbox controls
[lbClose, lbPrev, lbNext].forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

/* ── 5. MARQUEE PAUSE ON HOVER ────────────────────────────────── */
const track = document.querySelector('.marquee-track');
if (track) {
    document.querySelector('.marquee-strip').addEventListener('mouseenter',
        () => track.style.animationPlayState = 'paused');
    document.querySelector('.marquee-strip').addEventListener('mouseleave',
        () => track.style.animationPlayState = 'running');
}
