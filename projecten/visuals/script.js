document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementen selecteren
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const closeBtn = document.querySelector(".close-modal");

    // Selecteer alle kaarten die klikbaar moeten zijn
    const cards = document.querySelectorAll(".gallery-card");

    // 2. Click event toevoegen aan elke kaart
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Haal de foto en tekst uit de kaart waarop geklikt is
            const imgElement = this.querySelector('img');
            const titleElement = this.querySelector('h3');
            const descElement = this.querySelector('p');

            if (imgElement) {
                // Toon de modal
                modal.classList.add('show');

                // Zet de juiste bron (src) in de grote foto
                modalImg.src = imgElement.src;

                // Combineer titel en beschrijving voor de caption (optioneel)
                if(titleElement) {
                    captionText.innerHTML = titleElement.innerText;
                }
            }
        });
    });

    // 3. Functie om de modal te sluiten
    function closeModal() {
        modal.classList.remove('show');
        // Maak de src leeg na sluiten (voorkomt flikkering bij heropenen)
        setTimeout(() => {
            modalImg.src = "";
        }, 300);
    }

    // Sluit bij klik op kruisje
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Sluit bij klik naast de foto (op de donkere achtergrond)
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Sluit met de ESC toets
    document.addEventListener('keydown', function(e) {
        if(e.key === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });
});