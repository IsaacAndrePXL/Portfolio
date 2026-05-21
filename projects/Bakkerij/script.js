document.addEventListener('DOMContentLoaded', () => {

    // Toggle Openingsuren Logic
    const btn = document.getElementById("toggleBtn");
    const uren = document.getElementById("uren");

    if(btn && uren) {
        btn.addEventListener("click", () => {
            uren.classList.toggle("hidden");

            if (uren.classList.contains("hidden")) {
                btn.textContent = "Bekijk openingsuren";
            } else {
                btn.textContent = "Verberg openingsuren";
            }
        });
    }

    // Smooth scroll voor alle navigatie links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check of het een interne link is (voorkomt dat we de terug-knop blokkeren)
            if(this.getAttribute('href').length > 1) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Functie voor de Hero knop
function scrollToSection(id) {
    const element = document.getElementById(id);
    if(element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

<!DOCTYPE html>
<html lang="nl">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cristaline Rebrand — Isaac André</title>
<link rel="icon" type="image/x-icon" href="assets/images/icons/Icon.svg">
    <link rel="apple-touch-icon" href="assets/images/icons/apple-touch-icon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="assets/css/style.css" />
    <link rel="stylesheet" href="assets/css/case.css" />
</head>
<body>
<div id="cursor"></div>

<nav id="navbar">
    <a href="index.html" class="nav-logo">
        <img src="assets/images/icons/LogoHero.png" alt="Isaac André" class="nav-logo-img" />
    </a>
    <ul class="nav-links">
        <li><a href="index.html#about">Over Mij</a></li>
        <li><a href="projects.html">Projecten</a></li>
        <li><a href="index.html#skills">Skills</a></li>
        <li><a href="index.html#contact">Contact</a></li>
    </ul>
</nav>

<header class="case-hero">
    <div class="case-hero-bg">
        <img src="assets/images/CoverCristaline.png" alt="Cristaline Rebrand" />
    </div>
    <div class="case-hero-overlay"></div>
    <div class="case-hero-content">
        <a href="projects.html" class="case-back reveal">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Terug naar overzicht
        </a>
        <div class="case-meta reveal reveal-delay-1">
            <span class="case-tag">Branding · Illustrator</span>
            <span class="case-dot"></span>
            <span class="case-year">2024 — 2025</span>
        </div>
        <h1 class="case-title reveal reveal-delay-2">CRISTALINE<br>REBRAND</h1>
        <p class="case-subtitle reveal reveal-delay-3">
            Een moderne herziening van een logo dat al sinds 1992 ongewijzigd is.
        </p>
    </div>
</header>