// --- CONFIGURATIE ---
let kortingscodes = [
    { code: "VEGGIE10", korting: 10 },
    { code: "WELCOME5", korting: 5 },
    { code: "GRATIS", korting: 999999 }
];

let gebruikteKorting = 0;

// --- PAGINA INITIALISATIE ---
document.addEventListener("DOMContentLoaded", () => {
    toonWinkelwagen();
});

const kortingKnop = document.getElementById("applyCoupon");
if (kortingKnop) {
    kortingKnop.addEventListener("click", () => {
        const invoerVeld = document.getElementById("couponInput");
        const berichtVeld = document.getElementById("couponMessage");
        const code = invoerVeld.value.trim();

        let gevondenCode = null;
        for (const codeObj of kortingscodes) {
            if (codeObj.code === code) {
                gevondenCode = codeObj;
                break;
            }
        }

        if (!gevondenCode) {
            berichtVeld.textContent = "Ongeldige kortingscode";
            berichtVeld.style.color = "red";
            return;
        }

        if (gevondenCode.code === "GRATIS") {
            alert("Leuk geprobeerd! 😉 Maar zo rijk zijn we helaas niet.\n\nHier is €1 symbolische korting voor de moeite!");
            gebruikteKorting = 1;
            berichtVeld.textContent = "Troostprijs toegepast: €1.00 korting";
        } else {
            gebruikteKorting = gevondenCode.korting;
            berichtVeld.textContent = `Kortingscode toegepast: €${gebruikteKorting} korting`;
        }

        berichtVeld.style.color = "green";

        toonWinkelwagen();
    });
}

// --- WINKELWAGEN WEERGAVE ---
function toonWinkelwagen() {
    let winkelwagen = JSON.parse(localStorage.getItem("cart"));
    if (!winkelwagen) {
        winkelwagen = [];
    }

    const container = document.getElementById("cartItems");
    container.innerHTML = "";

    let subtotaal = 0;

    for (const item of winkelwagen) {
        const regelPrijs = item.totalPricePerUnit * item.quantity;
        subtotaal = subtotaal + regelPrijs;

        // Opties (extra's) weergeven
        let optiesHtml = "";
        if (item.selectedOptions && item.selectedOptions.length > 0) {
            optiesHtml = `<ul style="font-size: 0.85rem; color: #777; list-style: none; padding-left: 0; margin-top:4px;">`;

            for (const opt of item.selectedOptions) {
                let prijsInfo = "";
                if (opt.price > 0) prijsInfo = ` (+€${opt.price.toFixed(2)})`;
                else if (opt.price < 0) prijsInfo = ` (-€${Math.abs(opt.price).toFixed(2)})`;

                optiesHtml += `<li>• ${opt.label}${prijsInfo}</li>`;
            }
            optiesHtml += `</ul>`;
        }

        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";

        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                ${optiesHtml}
                <span style="font-weight:bold; color:#c34322;">€${item.totalPricePerUnit.toFixed(2)} p/st</span>
                
                <div class="cart-actions">
                    <button class="qty-btn" data-cart-id="${item.cartId}" data-actie="min">−</button>
                    <span class="qty">${item.quantity}</span>
                    <button class="qty-btn" data-cart-id="${item.cartId}" data-actie="plus">+</button>
                    <button class="remove-btn" data-cart-id="${item.cartId}">✕</button>
                </div>
            </div>
        `;

        container.appendChild(itemDiv);
    }

    // Eindtotaal berekening
    let eindTotaal = subtotaal - gebruikteKorting;
    if (eindTotaal < 0) eindTotaal = 0;

    document.getElementById("totaalPrijs").textContent = `€${subtotaal.toFixed(2)}`;
    document.getElementById("korting").textContent = `€${gebruikteKorting.toFixed(2)}`;
    document.getElementById("eindTotaal").textContent = `€${eindTotaal.toFixed(2)}`;
}

// --- KNOPPEN EVENTS (AANTAL AANPASSEN / VERWIJDEREN) ---
document.addEventListener("click", function (gebeurtenis) {
    const doel = gebeurtenis.target;
    const isAantalKnop = doel.classList.contains("qty-btn");
    const isVerwijderKnop = doel.classList.contains("remove-btn");

    if (isAantalKnop || isVerwijderKnop) {
        const cartId = doel.getAttribute("data-cart-id");
        let winkelwagen = JSON.parse(localStorage.getItem("cart")) || [];

        let itemIndex = -1;
        for (let i = 0; i < winkelwagen.length; i++) {
            if (winkelwagen[i].cartId === cartId) {
                itemIndex = i;
                break;
            }
        }

        if (itemIndex !== -1) {
            const item = winkelwagen[itemIndex];

            if (isVerwijderKnop) {
                winkelwagen.splice(itemIndex, 1);
            }
            else if (isAantalKnop) {
                const actie = doel.getAttribute("data-actie");

                if (actie === "plus") {
                    if (item.quantity < item.maxPerOrder) {
                        item.quantity++;
                    } else {
                        alert("Max aantal bereikt.");
                    }
                }
                else if (actie === "min") {
                    item.quantity--;
                    if (item.quantity <= 0) {
                        winkelwagen.splice(itemIndex, 1);
                    }
                }
            }

            localStorage.setItem("cart", JSON.stringify(winkelwagen));
            toonWinkelwagen();
        }
    }
});

// --- OVERIGE KNOPPEN (LEEGMAKEN / BESTELLEN) ---
const leegmaakKnop = document.getElementById("clearCart");
if (leegmaakKnop) {
    leegmaakKnop.addEventListener("click", () => {
        if (confirm("Weet je zeker dat je het mandje wilt leegmaken?")) {
            localStorage.removeItem("cart");
            gebruikteKorting = 0;

            const bericht = document.getElementById("couponMessage");
            if(bericht) bericht.textContent = "";

            toonWinkelwagen();
        }
    });
}

const bestelKnop = document.getElementById("placeOrder");
if (bestelKnop) {
    bestelKnop.addEventListener("click", () => {
        const winkelwagen = JSON.parse(localStorage.getItem("cart"));
        if (winkelwagen && winkelwagen.length > 0) {
            alert("Bedankt voor je bestelling!");
            localStorage.removeItem("cart");
            gebruikteKorting = 0;
            toonWinkelwagen();
        } else {
            alert("Je winkelmandje is nog leeg.");
        }
    });
}