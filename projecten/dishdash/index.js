// --- GLOBALE VARIABELEN ---
let menu = [];
let huidigFilter = 'alles';
let huidigeSortering = 'Standaard';
let heroItem = null;
let currentItem = null;

// WACHT TOT PAGINA GELADEN IS
document.addEventListener('DOMContentLoaded', () => {
    // 1. Maak de modal HTML aan via Javascript
    maakModalAan();

    // 2. Laad het menu
    laadMenu().catch(error => console.error("Fout bij laden:", error));
});

// --- STAP 1: MODAL HTML MAKEN ---

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

    const sluitKnop = document.getElementById('sluitModalBtn');
    if (sluitKnop) sluitKnop.addEventListener('click', sluitModal);

    window.addEventListener('click', (event) => {
        if (event.target === modalDiv) sluitModal();
    });

    const bevestigKnop = document.getElementById('bevestigBtn');
    if (bevestigKnop) bevestigKnop.addEventListener('click', bevestigToevoegen);
}

// --- STAP 2: BASIS LOGICA (Menu Laden & Renderen) ---

async function laadMenu() {
    try {
        const response = await fetch('menu.json');
        menu = await response.json();
        renderMenu();
        renderHero();
    } catch (error) {
        console.error('Fout bij laden menu:', error);
    }
}

const filterButtons = document.querySelectorAll('.filter-button');
for (const btn of filterButtons) {
    btn.addEventListener('click', function() {
        for (const b of filterButtons) {
            b.classList.remove('active');
        }
        this.classList.add('active');

        const tekst = this.textContent.trim();
        if (tekst === 'Alles') huidigFilter = 'alles';
        else if (tekst.includes('Vegetarisch')) huidigFilter = 'veggie';
        else huidigFilter = 'vlees';

        renderMenu();
    });
}

const sortSelect = document.getElementById('sort-select');
if (sortSelect) {
    sortSelect.addEventListener('change', () => {
        huidigeSortering = sortSelect.value;
        renderMenu();
    });
}

function renderMenu() {
    const grids = document.querySelectorAll('.menu-grid');
    for (const grid of grids) {
        grid.innerHTML = '';
    }

    // 1. Filteren
    /** @type {MenuItem[]} */
    let gefilterdMenu = [];
    for (const item of menu) {
        if (huidigFilter === 'alles') {
            gefilterdMenu.push(item);
        } else if (huidigFilter === 'veggie' && item.veggie === true) {
            gefilterdMenu.push(item);
        } else if (huidigFilter === 'vlees' && item.veggie === false) {
            gefilterdMenu.push(item);
        }
    }

    // 2. Sorteren
    if (huidigeSortering === 'Prijs oplopend') {
        gefilterdMenu.sort((a, b) => a.price - b.price);
    } else if (huidigeSortering === 'Prijs aflopend') {
        gefilterdMenu.sort((a, b) => b.price - a.price);
    }

    const totalItems = document.getElementById('total-items');
    if (totalItems) totalItems.textContent = `${gefilterdMenu.length} gerechten`;

    // 3. Renderen
    for (const item of gefilterdMenu) {
        const categoryId = item.category.toLowerCase();
        const grid = document.getElementById(categoryId);

        if (grid) {
            const card = document.createElement('div');
            card.className = 'dish-card';

            let veggieHtml = '';
            if (item.veggie) {
                veggieHtml = `<span class="veggie-label"><svg class="filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                     width="16" height="16"
                     fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg> Veggie</span>`;
            }

            let tagsHtml = '';
            if (item.tags) {
                for (const tag of item.tags) {
                    tagsHtml += `<span class="dish-tag">${tag}</span>`;
                }
            }

            card.innerHTML = `
                <div class="dish-image">
                    <img src="${item.image}" alt="${item.name}">
                    ${veggieHtml}
                </div>
                <div class="dish-content">
                    <div class="dish-header">
                        <h3>${item.name}</h3>
                        <span class="dish-price">€${item.price.toFixed(2)}</span>
                    </div>
                    <p class="dish-ingredients">${item.ingredients.join(', ')}</p>
                    <div class="dish-tags">${tagsHtml}</div>
                    <br>
                    <button class="btn-add">+ Toevoegen</button>
                </div>
            `;

            grid.appendChild(card);

            const knop = card.querySelector('.btn-add');
            if (knop) {
                knop.addEventListener('click', () => {
                    openModal(item);
                });
            }
        }
    }
}

function renderHero() {
    if (!heroItem && menu.length > 0) {
        const randomIndex = Math.floor(Math.random() * menu.length);
        heroItem = menu[randomIndex];
    }

    if (heroItem) {
        const img = document.getElementById('hero-image');
        if(img) img.src = heroItem.image;

        const name = document.getElementById('hero-name');
        if(name) name.textContent = heroItem.name;

        const ingr = document.getElementById('hero-ingredients');
        if(ingr) ingr.textContent = heroItem.ingredients.join(', ');

        const price = document.getElementById('hero-price');
        if(price) price.textContent = `€${heroItem.price.toFixed(2)}`;

        // Tags voor hero
        const tagsContainer = document.getElementById('hero-tags');
        if (tagsContainer) {
            tagsContainer.innerHTML = '';
            if (heroItem.veggie) {
                tagsContainer.innerHTML += `<span class="veggie-tag">🌱 Vegetarisch</span>`;
            }
            for (const tag of heroItem.tags) {
                tagsContainer.innerHTML += `<span class="tag">${tag}</span>`;
            }
        }

        const heroBtn = document.getElementById('hero-add');
        if (heroBtn) {
            heroBtn.onclick = () => openModal(heroItem);
        }
    }
}

// --- STAP 3: MODAL LOGICA ---

/**
 * @param {MenuItem} item
 */
function openModal(item) {
    if (!item) return;
    currentItem = item;

    const modal = document.getElementById('optieModal');
    const titel = document.getElementById('modalTitel');
    const optiesContainer = document.getElementById('modalOpties');

    if (titel) titel.textContent = item.name;
    if (optiesContainer) optiesContainer.innerHTML = '';

    updateModalPrijs();

    if (item.options && item.options.length > 0) {
        for (let i = 0; i < item.options.length; i++) {
            const optie = item.options[i];

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
        for (const box of checkboxes) {
            box.addEventListener('change', updateModalPrijs);
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

function updateModalPrijs() {
    if (!currentItem) return;
    let totaal = currentItem.price;

    const checkboxes = document.querySelectorAll('.optie-checkbox');
    for (const box of checkboxes) {
        // @ts-ignore
        if (box.checked) {
            const index = box.getAttribute('data-index');
            // @ts-ignore
            const optie = currentItem.options[index];
            totaal = totaal + optie.price;
        }
    }

    const prijsVeld = document.getElementById('modalTotaalPrijs');
    if (prijsVeld) prijsVeld.textContent = `€${totaal.toFixed(2)}`;
}

function bevestigToevoegen() {
    if (!currentItem) return;
    /** @type {MenuOptie[]} */
    let geselecteerdeOpties = [];
    let extraKosten = 0;

    const checkboxes = document.querySelectorAll('.optie-checkbox');
    for (const box of checkboxes) {
        // @ts-ignore
        if (box.checked) {
            const index = box.getAttribute('data-index');
            // @ts-ignore
            const optie = currentItem.options[index];

            geselecteerdeOpties.push(optie);
            extraKosten += optie.price;
        }
    }

    addToCart(currentItem, geselecteerdeOpties, extraKosten);
    sluitModal();
}

// --- STAP 4: WINKELWAGEN LOGICA ---

/**
 * @param {MenuItem} item
 * @param {MenuOptie[]} opties
 * @param {number} extraPrijs
 */
function addToCart(item, opties, extraPrijs) {
    /** @type {CartItem[]} */
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    let optieNamen = [];
    for (const opt of opties) {
        optieNamen.push(opt.label);
    }
    optieNamen.sort();

    const uniekCartId = item.id + '-' + optieNamen.join('-');

    /** @type {CartItem|undefined} */
    let bestaandItem = undefined;

    for (const cartItem of cart) {
        if (cartItem.cartId === uniekCartId) {
            bestaandItem = cartItem;
            break;
        }
    }

    if (bestaandItem) {
        const max = item.maxPerOrder || 99;
        if (bestaandItem.quantity >= max) {
            alert('Je hebt het maximum aantal voor dit gerecht bereikt.');
            return;
        }
        bestaandItem.quantity++;
    } else {
        const nieuwItem = {
            cartId: uniekCartId,
            id: item.id,
            name: item.name,
            basePrice: item.price,
            totalPricePerUnit: item.price + extraPrijs,
            quantity: 1,
            image: item.image,
            maxPerOrder: item.maxPerOrder || 99,
            selectedOptions: opties
        };
        cart.push(nieuwItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} toegevoegd aan winkelmand!`);
}