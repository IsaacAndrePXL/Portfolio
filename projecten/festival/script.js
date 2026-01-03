/* --- SCROLL ANIMATIES --- */
const hiddenElements = document.querySelectorAll('.festival-row');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

hiddenElements.forEach((el) => observer.observe(el));

/* --- DYNAMISCHE BEGROETING (TIJD) --- */
const subtitle = document.querySelector('.subtitle');
const hour = new Date().getHours();
let greeting;

if (hour < 12) {
    greeting = "Goedemorgen! Zin in een festival?";
} else if (hour < 18) {
    greeting = "Goedemiddag! De grootste muziekbelevingen van België";
} else {
    greeting = "Goedenavond! Tijd voor een feestje?";
}

if (subtitle) {
    subtitle.textContent = greeting;
}