// Wacht tot de pagina geladen is
document.addEventListener('DOMContentLoaded', () => {

    // Toggle Openingsuren Logic
    const btn = document.getElementById("toggleBtn");
    const uren = document.getElementById("uren");

    if(btn && uren) {
        btn.addEventListener("click", () => {
            uren.classList.toggle("hidden");

            if (uren.classList.contains("hidden")) {
                btn.textContent = "Bekijk openingsuren";
                btn.classList.remove('active');
            } else {
                btn.textContent = "Verberg openingsuren";
                btn.classList.add('active');
            }
        });
    }

    // Smooth scroll voor alle links in de navigatie
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Functie aangeroepen door de Hero knop
function scrollToSection(id) {
    const element = document.getElementById(id);
    if(element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
}