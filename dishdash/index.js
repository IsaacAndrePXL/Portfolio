// --- GLOBALE VARIABELEN ---
let menu = [];
let huidigFilter = 'alles';
let huidigeSortering = 'Standaard';
let dagSchotel = null;
let geselecteerdGerecht = null;

// --- PAGINA INITIALISATIE ---
document.addEventListener('DOMContentLoaded', () => {
    maakModalAan();
    laadMenu().catch(fout => console.error("Oepsie, het wilt eventjes niet mee werken.", fout));
});

// --- STAP 1: MODAL HTML OPBOUWEN ---
function maakModalAan() {
    const modalDiv = document.createElement('div');
    modalDiv.id = 'optieModal';
    modalDiv.className = 'dishdash-modal';

    modalDiv.innerHTML = `
        <div class="dishdash-modal-content">
            <span id="sluitModalBtn" class="dishdash-close">&times;</span>
            <h2 id="modalTitel" class="dishdash-modal-title">Gerecht naam</h2>
            <div id="modalOpties"></div>
            <div class="dishdash-modal-footer">
                <span id="modalTotaalPrijs" class="dishdash-total-price">€0.00</span>
                <button id="bevestigBtn" class="dishdash-btn-confirm">Toevoegen</button>
            </div>
        </div>
    `;

    document.body.appendChild(modalDiv);

    // Event listeners voor de modal
    const sluitKnop = document.getElementById('sluitModalBtn');
    if (sluitKnop) sluitKnop.addEventListener('click', sluitModal);

    window.addEventListener('click', (gebeurtenis) => {
        if (gebeurtenis.target === modalDiv) sluitModal();
    });

    const bevestigKnop = document.getElementById('bevestigBtn');
    if (bevestigKnop) bevestigKnop.addEventListener('click', bevestigToevoegen);
}

// --- STAP 2: MENU & DATA LADEN ---
async function laadMenu() {
    try {
        const antwoord = await fetch('menu.json');
        menu = await antwoord.json();
        toonMenu();
        toonDagSchotel();
    } catch (fout) {
        console.error('Fout bij laden menu:', fout);
    }
}

// --- FILTER & SORTEER LOGICA ---
const filterKnoppen = document.querySelectorAll('.filter-button');
for (const knop of filterKnoppen) {
    knop.addEventListener('click', function() {
        for (const b of filterKnoppen) {
            b.classList.remove('active');
        }
        this.classList.add('active');

        const tekst = this.textContent.trim();
        if (tekst === 'Alles') huidigFilter = 'alles';
        else if (tekst.includes('Vegetarisch')) huidigFilter = 'veggie';
        else huidigFilter = 'vlees';

        toonMenu();
    });
}

const sorteerLijst = document.getElementById('sort-select');
if (sorteerLijst) {
    sorteerLijst.addEventListener('change', () => {
        huidigeSortering = sorteerLijst.value;
        toonMenu();
    });
}

function toonMenu() {
    // Wis oude inhoud
    const roosters = document.querySelectorAll('.menu-grid');
    for (const rooster of roosters) {
        rooster.innerHTML = '';
    }

    // Filteren
    let gefilterdMenu = [];
    for (const gerecht of menu) {
        if (huidigFilter === 'alles') {
            gefilterdMenu.push(gerecht);
        } else if (huidigFilter === 'veggie' && gerecht.veggie === true) {
            gefilterdMenu.push(gerecht);
        } else if (huidigFilter === 'vlees' && gerecht.veggie === false) {
            gefilterdMenu.push(gerecht);
        }
    }

    // Sorteren
    if (huidigeSortering === 'Prijs oplopend') {
        gefilterdMenu.sort((a, b) => a.price - b.price);
    } else if (huidigeSortering === 'Prijs aflopend') {
        gefilterdMenu.sort((a, b) => b.price - a.price);
    }

    // Update teller
    const totaalItemsVeld = document.getElementById('total-items');
    if (totaalItemsVeld) totaalItemsVeld.textContent = `${gefilterdMenu.length} gerechten`;

    // Renderen naar HTML
    for (const gerecht of gefilterdMenu) {
        const categorieId = gerecht.category.toLowerCase();
        const rooster = document.getElementById(categorieId);

        if (rooster) {
            const kaart = document.createElement('div');
            kaart.className = 'dish-card';

            let veggieHtml = '';
            if (gerecht.veggie) {
                veggieHtml = `<span class="veggie-label"><svg class="filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                     width="16" height="16"
                     fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg> Veggie</span>`;
            }

            let tagsHtml = '';
            if (gerecht.tags) {
                for (const tag of gerecht.tags) {
                    tagsHtml += `<span class="dish-tag">${tag}</span>`;
                }
            }

            kaart.innerHTML = `
                <div class="dish-image">
                    <img src="${gerecht.image}" alt="${gerecht.name}">
                    ${veggieHtml}
                </div>
                <div class="dish-content">
                    <div class="dish-header">
                        <h3>${gerecht.name}</h3>
                        <span class="dish-price">€${gerecht.price.toFixed(2)}</span>
                    </div>
                    <p class="dish-ingredients">${gerecht.ingredients.join(', ')}</p>
                    <div class="dish-tags">${tagsHtml}</div>
                    <br>
                    <button class="btn-add">+ Toevoegen</button>
                </div>
            `;

            rooster.appendChild(kaart);

            const knop = kaart.querySelector('.btn-add');
            if (knop) {
                knop.addEventListener('click', () => {
                    openOptieModal(gerecht);
                });
            }
        }
    }
}

// --- HERO / DAGSCHOTEL LOGICA ---
function toonDagSchotel() {
    if (!dagSchotel && menu.length > 0) {
        const willekeurigeIndex = Math.floor(Math.random() * menu.length);
        dagSchotel = menu[willekeurigeIndex];
    }

    if (dagSchotel) {
        const img = document.getElementById('hero-image');
        if(img) img.src = dagSchotel.image;

        const naam = document.getElementById('hero-name');
        if(naam) naam.textContent = dagSchotel.name;

        const ingredienten = document.getElementById('hero-ingredients');
        if(ingredienten) ingredienten.textContent = dagSchotel.ingredients.join(', ');

        const prijs = document.getElementById('hero-price');
        if(prijs) prijs.textContent = `€${dagSchotel.price.toFixed(2)}`;

        const tagsContainer = document.getElementById('hero-tags');
        if (tagsContainer) {
            tagsContainer.innerHTML = '';
            if (dagSchotel.veggie) {
                tagsContainer.innerHTML += `<span class="veggie-tag">🌱 Vegetarisch</span>`;
            }
            for (const tag of dagSchotel.tags) {
                tagsContainer.innerHTML += `<span class="tag">${tag}</span>`;
            }
        }

        const heroKnop = document.getElementById('hero-add');
        if (heroKnop) {
            heroKnop.onclick = () => openOptieModal(dagSchotel);
        }
    }
}

// --- STAP 3: MODAL FUNCTIONALITEIT ---
function openOptieModal(gerecht) {
    if (!gerecht) return;
    geselecteerdGerecht = gerecht;

    const modal = document.getElementById('optieModal');
    const titel = document.getElementById('modalTitel');
    const optiesContainer = document.getElementById('modalOpties');

    if (titel) titel.textContent = gerecht.name;
    if (optiesContainer) optiesContainer.innerHTML = '';

    herberekenModalPrijs();

    if (gerecht.options && gerecht.options.length > 0) {
        for (let i = 0; i < gerecht.options.length; i++) {
            const optie = gerecht.options[i];

            const rij = document.createElement('div');
            rij.className = 'dishdash-option-row';

            let prijsTekst = '';
            if (optie.price > 0) {
                prijsTekst = `+€${optie.price.toFixed(2)}`;
            } else if (optie.price < 0) {
                prijsTekst = `-€${Math.abs(optie.price).toFixed(2)}`;
            }

            rij.innerHTML = `
                <label class="dishdash-option-label">
                    <input type="checkbox" class="optie-checkbox" data-index="${i}">
                    ${optie.label}
                </label>
                <span class="dishdash-option-price">${prijsTekst}</span>
            `;

            optiesContainer.appendChild(rij);
        }

        const checkboxes = document.querySelectorAll('.optie-checkbox');
        for (const vakje of checkboxes) {
            vakje.addEventListener('change', herberekenModalPrijs);
        }

    } else {
        if (optiesContainer) optiesContainer.innerHTML = '<p style="color:#777;">Geen extra opties beschikbaar.</p>';
    }

    if (modal) modal.classList.add('zichtbaar');
}

function sluitModal() {
    const modal = document.getElementById('optieModal');
    if (modal) modal.classList.remove('zichtbaar');
}

function herberekenModalPrijs() {
    if (!geselecteerdGerecht) return;
    let totaal = geselecteerdGerecht.price;

    const checkboxes = document.querySelectorAll('.optie-checkbox');
    for (const vakje of checkboxes) {
        if (vakje.checked) {
            const index = vakje.getAttribute('data-index');
            const optie = geselecteerdGerecht.options[index];
            totaal = totaal + optie.price;
        }
    }

    const prijsVeld = document.getElementById('modalTotaalPrijs');
    if (prijsVeld) prijsVeld.textContent = `€${totaal.toFixed(2)}`;
}

function bevestigToevoegen() {
    if (!geselecteerdGerecht) return;
    let gekozenOpties = [];
    let extraKosten = 0;

    const checkboxes = document.querySelectorAll('.optie-checkbox');
    for (const vakje of checkboxes) {
        if (vakje.checked) {
            const index = vakje.getAttribute('data-index');
            const optie = geselecteerdGerecht.options[index];

            gekozenOpties.push(optie);
            extraKosten += optie.price;
        }
    }

    voegToeAanWinkelwagen(geselecteerdGerecht, gekozenOpties, extraKosten);
    sluitModal();
}

// --- STAP 4: WINKELWAGEN ACTIES ---
function voegToeAanWinkelwagen(gerecht, opties, extraPrijs) {
    let winkelwagen = JSON.parse(localStorage.getItem('cart') || '[]');

    let optieNamen = [];
    for (const opt of opties) {
        optieNamen.push(opt.label);
    }
    optieNamen.sort();

    const uniekWinkelwagenId = gerecht.id + '-' + optieNamen.join('-');
    let bestaandItem = undefined;

    for (const item of winkelwagen) {
        if (item.cartId === uniekWinkelwagenId) {
            bestaandItem = item;
            break;
        }
    }

    if (bestaandItem) {
        const max = gerecht.maxPerOrder || 69;
        if (bestaandItem.quantity >= max) {
            alert('Je hebt het maximum aantal voor dit gerecht bereikt.');
            return;
        }
        bestaandItem.quantity++;
    } else {
        const nieuwItem = {
            cartId: uniekWinkelwagenId,
            id: gerecht.id,
            name: gerecht.name,
            basePrice: gerecht.price,
            totalPricePerUnit: gerecht.price + extraPrijs,
            quantity: 1,
            image: gerecht.image,
            maxPerOrder: gerecht.maxPerOrder || 69,
            selectedOptions: opties
        };
        winkelwagen.push(nieuwItem);
    }

    localStorage.setItem('cart', JSON.stringify(winkelwagen));
    alert(`${gerecht.name} toegevoegd aan winkelmand!`);
}

// --- EASTER EGG: HONGER MODUS ---
let ingevoerdeToetsen = '';
const geheimeCode = 'honger';

document.addEventListener('keydown', (e) => {
    // Voeg de laatst ingedrukte toets toe aan de string
    ingevoerdeToetsen += e.key.toLowerCase();

    // Houd de string kort (niet langer dan het geheime woord) om geheugen te besparen
    if (ingevoerdeToetsen.length > geheimeCode.length) {
        ingevoerdeToetsen = ingevoerdeToetsen.slice(-geheimeCode.length);
    }

    // Check of het geheime woord is getypt
    if (ingevoerdeToetsen === geheimeCode) {
        activeerHongerModus();
    }
});

function activeerHongerModus() {
    alert("🍕 WOAAH! JE HEBT HONGER! 🍕\n\nLet's gooo! Tijd voor pizza!");

    // Verander de achtergrond en tekstkleur voor een party-effect
    document.body.style.backgroundColor = '#ffeaa7'; // Gele 'kaas' kleur
    document.body.style.transition = 'background 1s ease';

    // Draai het logo eenmalig rond
    const logo = document.querySelector('.logo-box');
    if (logo) {
        logo.style.transition = 'transform 1s ease';
        logo.style.transform = 'rotate(360deg) scale(1.5)';

        // Reset het logo na 1 seconde
        setTimeout(() => {
            logo.style.transform = '';
        }, 1000);
    }
}