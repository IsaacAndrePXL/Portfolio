# Portfolio — Isaac André

## Mappenstructuur
```
Portfolio/
├── index.html          ← hoofdpagina
├── projects.html       ← projectenpagina (was Projecten.html)
├── links.html          ← linkspagina
├── assets/
│   ├── css/
│   │   ├── style.css       ← globale stijlen
│   │   ├── projects.css    ← stijlen voor projects.html
│   │   └── links.css       ← stijlen voor links.html
│   ├── js/
│   │   ├── main.js         ← globale scripts
│   │   ├── projects.js     ← scripts voor projects.html (was design.js)
│   │   └── links.js        ← scripts voor links.html
│   └── images/
│       ├── icons/          ← favicon, apple-touch-icon
│       ├── LogoHero.png
│       ├── LogoIsaac.png
│       └── IsaacPFP.png
└── projects/
    ├── bakkerij/       ← bestanden van het bakkerij-project
    └── dishdash/       ← bestanden van het dishdash-project
```

## Wat er veranderd is
- `Index.html` → `index.html` (lowercase)
- `Projecten.html` → `projects.html` (lowercase + Engels)
- Alle CSS staat nu in `assets/css/`
- Alle JS staat nu in `assets/js/`
- Alle afbeeldingen staan in `assets/images/`
- `pictures/` map → hernoemd naar `assets/images/`
- `design.js` → hernoemd naar `assets/js/projects.js`

## Stap voor stap in git
```bash
git add .
git commit -m "refactor: nieuwe mappenstructuur"
git push
```
