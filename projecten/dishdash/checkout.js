let kortingscodes = [
    { code: "VEGGIE10", korting: 10 },
    { code: "WELCOME5", korting: 5 }
];

let gebruikteKorting = 0;

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});

// Kortingscode toepassen
const applyBtn = document.getElementById("applyCoupon");
if (applyBtn) {
    applyBtn.addEventListener("click", () => {
        const input = document.getElementById("couponInput").value.trim();
        const message = document.getElementById("couponMessage");

        // Zoeken met een loop ipv .find
        let gevondenCode = null;
        for (const codeObj of kortingscodes) {
            if (codeObj.code === input) {
                gevondenCode = codeObj;
                break;
            }
        }

        if (!gevondenCode) {
            message.textContent = "Ongeldige kortingscode";
            message.style.color = "red";
            return;
        }

        gebruikteKorting = gevondenCode.korting;
        message.textContent = `Kortingscode toegepast: €${gebruikteKorting} korting`;
        message.style.color = "green";

        renderCart();
    });
}

function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
        cart = [];
    }

    const cartContainer = document.getElementById("cartItems");
    cartContainer.innerHTML = ""; // Leegmaken

    let subtotaal = 0;

    // Loop door winkelmand items (PDF: Itereren over arrays)
    for (const item of cart) {

        // Regelprijs berekenen
        const regelPrijs = item.totalPricePerUnit * item.quantity;
        subtotaal = subtotaal + regelPrijs;

        // Opties weergeven als lijstje
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

        // We gebruiken data-cart-id om straks te weten op welk item we klikken
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                ${optiesHtml}
                <span style="font-weight:bold; color:#c34322;">€${item.totalPricePerUnit.toFixed(2)} p/st</span>
                
                <div class="cart-actions">
                    <button class="qty-btn" data-cart-id="${item.cartId}" data-action="minus">−</button>
                    <span class="qty">${item.quantity}</span>
                    <button class="qty-btn" data-cart-id="${item.cartId}" data-action="plus">+</button>
                    <button class="remove-btn" data-cart-id="${item.cartId}">✕</button>
                </div>
            </div>
        `;

        cartContainer.appendChild(itemDiv);
    }

    // Totalen berekenen
    let eindTotaal = subtotaal - gebruikteKorting;
    if (eindTotaal < 0) eindTotaal = 0;

    document.getElementById("totaalPrijs").textContent = `€${subtotaal.toFixed(2)}`;
    document.getElementById("korting").textContent = `€${gebruikteKorting.toFixed(2)}`;
    document.getElementById("eindTotaal").textContent = `€${eindTotaal.toFixed(2)}`;
}

// Global Click Event voor de knoppen (Event Delegation)
document.addEventListener("click", function (e) {
    // Check of we op een plus/min of verwijder knop hebben geklikt
    const isQtyBtn = e.target.classList.contains("qty-btn");
    const isRemoveBtn = e.target.classList.contains("remove-btn");

    if (isQtyBtn || isRemoveBtn) {
        const cartId = e.target.getAttribute("data-cart-id");
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Zoek de index van het item met een loop (geen .findIndex)
        let itemIndex = -1;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].cartId === cartId) {
                itemIndex = i;
                break;
            }
        }

        // Als item gevonden is
        if (itemIndex !== -1) {
            const item = cart[itemIndex];

            if (isRemoveBtn) {
                // Verwijderen met splice (PDF p. 66)
                cart.splice(itemIndex, 1);
            }
            else if (isQtyBtn) {
                const action = e.target.getAttribute("data-action");

                if (action === "plus") {
                    if (item.quantity < item.maxPerOrder) {
                        item.quantity++;
                    } else {
                        alert("Max aantal bereikt.");
                    }
                }
                else if (action === "minus") {
                    item.quantity--;
                    if (item.quantity <= 0) {
                        // Verwijder als aantal 0 is
                        cart.splice(itemIndex, 1);
                    }
                }
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }
    }
});

// Leeg mandje knop
const clearBtn = document.getElementById("clearCart");
if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        if (confirm("Weet je zeker dat je het mandje wilt leegmaken?")) {
            localStorage.removeItem("cart");
            gebruikteKorting = 0;

            // Reset bericht
            const msg = document.getElementById("couponMessage");
            if(msg) msg.textContent = "";

            renderCart();
        }
    });
}

// Bestellen knop
const orderBtn = document.getElementById("placeOrder");
if (orderBtn) {
    orderBtn.addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        // Checken of array leeg is via .length (PDF)
        if (cart && cart.length > 0) {
            alert("Bedankt voor je bestelling!");
            localStorage.removeItem("cart");
            gebruikteKorting = 0;
            renderCart();
        } else {
            alert("Je winkelmandje is nog leeg.");
        }
    });
}