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