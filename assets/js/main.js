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
/*
    Als je een video-preview wil per project, voeg dit toe aan de card:
        <video class="card-video" muted loop src="preview.mp4"
               style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0"></video>
    Het script hieronder speelt hem automatisch af bij hover.
*/
document.querySelectorAll('.project-card').forEach(card => {
    const video = card.querySelector('video.card-video');
    if (!video) return;
    card.addEventListener('mouseenter', () => video.play());
    card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});
