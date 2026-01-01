[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/D1DreKxb)

# DishDash - Project Scripting

## Projectbeschrijving
Dit project is een interactieve bestelwebsite voor "DishDash", een fictieve Italiaanse take-away. De applicatie is gebouwd met **HTML, CSS en JavaScript**.

De website stelt gebruikers in staat om:
- Een dynamisch menu te bekijken dat wordt ingeladen vanuit een JSON-bestand.
- Gerechten te filteren (Veggie/Vlees) en te sorteren op prijs.
- Een "Gerecht van de dag" (Hero sectie) te zien.
- Gerechten aan te passen met extra opties (zoals extra kaas of ingrediënten weglaten) via een pop-up venster.
- Een winkelmandje te beheren en af te rekenen met kortingscodes.

## Hoe te starten

Omdat dit project gebruik maakt van de `fetch`-API om `menu.json` in te laden, werkt het **niet** door simpelweg op het HTML-bestand te dubbelklikken. Je moet het project draaien via een **lokale webserver**.

**Instructies:**

* **In WebStorm / IntelliJ:**
    1.  Open `Homepage.html`.
    2.  Klik in de editor rechtsboven op het icoontje van je favoriete browser (Chrome/Edge/Firefox).
    3.  De website opent direct via de ingebouwde server (`localhost:63342/...`).

* **In Visual Studio Code:**
    1.  Zorg dat de extensie **Live Server** geïnstalleerd is.
    2.  Klik rechts op `Homepage.html` en kies **"Open with Live Server"**.

## Gebruikte Data
Alle productinformatie wordt dynamisch ingeladen uit:
- **`menu.json`**: Dit bestand bevat de array met alle gerechten, inclusief ID, naam, prijs, ingrediënten, afbeeldingen, categorieën en mogelijke opties (extra's).

## Gerealiseerde Functionaliteiten (Wat is gelukt)

De volgende onderdelen zijn succesvol geïmplementeerd:
- **Dynamische weergave:** Het menu wordt volledig opgebouwd via JavaScript op basis van de JSON-data.
- **Hero Sectie:** Er wordt willekeurig een gerecht gekozen en getoond als "Gerecht van de dag".
- **Filtering:** Knoppen om te filteren op "Alles", "Vegetarisch" en "Met vlees/vis".
- **Sortering:** Dropdown menu om te sorteren op prijs (oplopend en aflopend).
- **Modal / Pop-up:**
    - Bij het klikken op "Toevoegen" opent een modal.
    - Hier kunnen extra opties (checkboxes) worden aangevinkt.
    - De totaalprijs in de modal update live mee als je opties aanvinkt.
- **Winkelmandje (Local Storage):**
    - Gerechten worden opgeslagen in `localStorage`.
    - Unieke items: Een "Pizza Margherita" en een "Pizza Margherita + Extra Kaas" worden als twee aparte regels in de winkelmand behandeld.
    - Aantallen kunnen worden aangepast (met een maximum per gerecht).
    - Items kunnen worden verwijderd.
- **Checkout Pagina:**
    - Overzicht van de bestelling inclusief gekozen opties.
    - Subtotaal en Totaal berekening.
- **Kortingscodes:**
    - Werkende codes: `VEGGIE10` (€10 korting) en `WELCOME5` (€5 korting).
    - Validatie: Foutmelding bij onbestaande code.

## Bekende Beperkingen / Wat is niet gelukt

- Er zijn geen bekende bugs; alle vereiste functionaliteiten uit de opgave zijn aanwezig.
- De betaling is een simulatie; er is geen echte betaalprovider gekoppeld.