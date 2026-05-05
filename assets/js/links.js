/* ================================================================
   ISAAC ANDRÉ — LINKS PAGE SCRIPTS
   links.js
================================================================ */

/* ── 1. CUSTOM CURSOR ─────────────────────────────────────────── */
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, .avatar-wrap').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
document.addEventListener('mouseenter', () => cursor.style.opacity = '1');

/* ── 2. SCROLL / LOAD REVEAL ──────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

/* ── 3. STAGGER CARDS ON LOAD ─────────────────────────────────── */
window.addEventListener('load', () => {
    // Identity header
    document.querySelector('.identity').style.opacity = '0';
    document.querySelector('.identity').style.transform = 'translateY(20px)';
    document.querySelector('.identity').style.transition = 'opacity .6s ease, transform .6s ease';

    setTimeout(() => {
        document.querySelector('.identity').style.opacity = '1';
        document.querySelector('.identity').style.transform = 'none';
    }, 100);

    // Stagger each link card individually
    document.querySelectorAll('.link-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity .5s ease, transform .5s ease, border-color .3s, background .3s';

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'none';
            // After entrance animation settles, let CSS handle hover transitions
            setTimeout(() => {
                card.style.transition = 'border-color .3s ease, background .3s ease, transform .25s ease';
            }, 500);
        }, 300 + i * 80);
    });
});

/* ── 4. CLICK RIPPLE ON CARDS ─────────────────────────────────── */
document.querySelectorAll('.link-card').forEach(card => {
    card.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect   = this.getBoundingClientRect();

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            width: 4px; height: 4px;
            background: rgba(118,145,200,.4);
            left: ${e.clientX - rect.left}px;
            top: ${e.clientY - rect.top}px;
            transform: translate(-50%,-50%) scale(0);
            animation: rippleOut .5s ease forwards;
            pointer-events: none;
            z-index: 10;
        `;

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
    });
});

// Inject ripple keyframe once
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleOut {
        to { transform: translate(-50%,-50%) scale(80); opacity: 0; }
    }
`;
document.head.appendChild(style);