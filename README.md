# 👨‍💻 Isaac Andre Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/9f5ac2dd-afae-4cf9-8dcc-d3dd4001b802/deploy-status)](https://app.netlify.com/projects/isaacandredvoportfolio/deploys)

Welkom bij de repository van mijn persoonlijke portfolio website. Deze website dient als centraal punt om mijn vaardigheden, projecten en ervaring als digitale vormgever te presenteren.

**Live Demo:** [https://isaacandredvoportfolio.netlify.app/](https://isaacandredvoportfolio.netlify.app/)

## Over dit project

Dit project is een responsieve portfolio website ontworpen om mijn werk als digitale vormgever te tonen. De site bevat informatie over wie ik ben, een overzicht van mijn technische vaardigheden en links naar mijn recente projecten.

### Belangrijkste secties:
* **Home:** Introductie en korte bio.
* **Over mij:** Achtergrondinformatie, opleiding (Informatiesystemen) en doelen.
* **Projecten:** Showcase van recente websites en grafisch designs.
* **Contact:** Mogelijkheden om contact met mij op te nemen.

## Gebruikte Technologieën

Deze portfolio is gebouwd met een focus op moderne webstandaarden en prestaties.

* **Frontend:** HTML5 & CSS3
* **Taal:** JavaScript
* **Hosting & Deployment:** Netlify
* **Versiebeheer:** Git & GitHub

## Installatie & Lokaal Gebruik

Wil je dit project lokaal op je machine draaien? Volg dan deze stappen:

1.  **Clone de repository:**
    ```bash
    git clone [https://github.com/jouw-gebruikersnaam/jouw-repo-naam.git](https://github.com/jouw-gebruikersnaam/jouw-repo-naam.git)
    cd jouw-repo-naam
    ```

2.  **Installeer de afhankelijkheden:**
    ```bash
    npm install
    # of als je yarn gebruikt:
    yarn install
    ```

3.  **Start de ontwikkelserver:**
    ```bash
    npm start
    # of
    yarn start
    ```

De website zal nu openen in je browser op `http://localhost:3000`.

## 📁 Mappenstructuur

```text
/root
  ├── /mockup             # Imageholders
  ├── /projecten          # De losse sub-sites
  │     ├── /Bakkerij
  │     ├── /dishdash     # Bevat menu.json, checkout logic, etc.
  │     ├── /festival     # Festival pagina
  │     └── /visuals      # Grafisch werk & Wireframes
  ├── index.html          # Homepage
  ├── portfolio.html      # Projecten overzicht
  ├── privacy.html        # Privacy beleid
  ├── style.css           # Global styles
  └── script.js           # Global scripts