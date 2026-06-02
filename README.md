# Handoff — Portfolio Thomas Bandieras
Le minimum impactant :
  
Un bouton de téléchargement PDF bien mis en avant
Un aperçu du CV directement dans la page (iframe/embed du PDF)

  Ce qui ferait vraiment gagner des points :
  
Aperçu PDF inline — le recruteur/correcteur voit le CV sans quitter la page, c'est professionnel et fluide
Bouton télécharger — gros, bien visible, avec le nom du fichier stylisé
Compétences avec niveau — barres de progression ou étoiles pour chaque techno (ex : React ████░ Avancé)
Langues avec niveau CECRL — tu as déjà B2/B1 mentionné dans les tags, le mettre en plus visuel
Certifications / formations courtes — si tu as des badges (GitHub Student, etc.)
Soft skills visuels — des icônes ou cards avec tes qualités

  Ce que je te recommande concrètement :
  Une section avec deux colonnes — à gauche l'aperçu du PDF (ou une image du CV), à droite un gros bouton download + quelques stats clés (langues, niveaux, disponibilité). C'est sobre, efficace, et montre que tu maîtrises 
  la mise en page.
## Prompt à coller dans Claude Code

> Recrée ce portfolio personnel à partir des fichiers de référence fournis dans ce dossier (`Portfolio.html`, `styles.css`, `script.js`). Ce sont des **maquettes de référence en HTML/CSS/JS vanilla** : reproduis-les **au pixel près** dans l'environnement de mon projet (voir ci-dessous), en réutilisant les conventions et la stack déjà en place. Si aucun environnement n'existe encore, initialise un projet **Vite + React + TypeScript** et implémente-les là. Respecte scrupuleusement les tokens de design, la typographie et les interactions décrits dans ce README.

> Stack cible : _(à compléter par toi — ex. « Vite + React + TS, CSS Modules » ou « Next.js App Router + Tailwind »)_.

---

## Overview
Portfolio mono-page d'un étudiant en BUT Informatique / apprenti développeur. Une seule page avec navigation par ancres : Hero, À propos, Projets, Stack, Parcours, Contact, Footer. Objectif : présenter le profil, les compétences et 4 projets, avec un formulaire de contact.

## À propos des fichiers de design
Les fichiers de ce bundle sont des **références de design réalisées en HTML/CSS/JS vanilla** — des prototypes qui montrent l'apparence et le comportement voulus, **pas du code de production à copier tel quel**. La tâche est de **recréer ces designs dans l'environnement du codebase cible** (React, Vue, etc.) avec ses patterns établis. Si aucun environnement n'existe, choisis le framework le plus adapté (recommandé : Vite + React + TS) et implémente-les là.

## Fidélité
**Haute fidélité (hifi).** Couleurs, typographie, espacements, bordures et interactions sont finaux. Reproduis l'UI au pixel près avec les libs du codebase.

---

## Direction visuelle
**Swiss brutalist / typographie internationale.** Fond papier crème, encre noire, rouge signal unique, traits épais (2.5px) omniprésents, grilles encadrées, typo display massive et expandée, labels en monospace. Ombres dures décalées (style « hard shadow ») sur les éléments interactifs. Esprit affirmé et graphique, pas de coins arrondis (sauf points/dots).

---

## Design Tokens

### Couleurs
| Token | Hex | Usage |
|---|---|---|
| `--paper` | `#f4f1ea` | Fond principal (crème chaud) |
| `--paper-2` | `#eae5d9` | Fond des sections alternées (Projets, Parcours) |
| `--ink` | `#131310` | Texte, bordures, traits, fond du footer |
| `--ink-soft` | `#4a473f` | Texte secondaire / paragraphes |
| `--muted` | `#8d887c` | Texte tertiaire (handles, méta) |
| `--red` | `#e4002b` | Accent unique (titres em, hover, dots) |
| `--red-deep` | `#b80023` | Variante rouge foncé (réservée) |

### Typographie
- **Display** : `Archivo` (Google Fonts), poids **900**, `font-stretch: 125%` (axe width chargé), `text-transform: uppercase`, `letter-spacing` négatif (-.02 à -.04em). Utilisée pour le nom hero, titres de section, titres de projet, gros chiffres.
- **Body** : `Archivo`, poids 400–800. Paragraphes, leads.
- **Mono** : `Space Mono` (Google Fonts), 400/700. Labels, kickers, chips, dates, méta, boutons, liens nav. `letter-spacing` positif (.08–.18em), uppercase.
- Import : `https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,400..900&family=Space+Mono:wght@400;700&display=swap`

### Échelle typographique (clamp responsive)
| Élément | Taille | Poids/Famille |
|---|---|---|
| Nom hero | `clamp(3.4rem, 14vw, 13.5rem)` | Archivo 900, stretch 125% |
| Titre section (`.section-head`, `.contact-big`) | `clamp(2.7rem, 8vw, 7rem)` / contact `clamp(2.8rem,11vw,9.5rem)` | Archivo 900 |
| Lead à propos | `clamp(1.5rem, 2.8vw, 2.3rem)` | Archivo 800 |
| Titre projet | `clamp(1.9rem, 4vw, 3rem)` | Archivo 900, stretch 110% |
| Gros chiffre stat | `clamp(2.6rem, 5vw, 3.8rem)` | Archivo 900, couleur rouge |
| Rôle timeline | `clamp(1.3rem, 2.6vw, 1.9rem)` | Archivo 900, stretch 110% |
| Body | `17px` (`16px` < 520px) | Archivo, line-height 1.55 |
| Labels/kickers | `.72–.76rem` | Space Mono 700, uppercase |

### Traits & ombres
- Épaisseur de trait standard : `--bw: 2.5px solid var(--ink)`.
- Ombre dure : `box-shadow: 5px 5px 0 var(--ink)` au repos → `8px 8px 0` + `translate(-2px,-2px)` au hover (boutons, formulaire submit).
- **Aucun border-radius** sauf les dots (`border-radius: 50%`, 8–16px).

### Layout
- Largeur max contenu : `--maxw: 1340px`, centré.
- Padding horizontal sections : `--pad-x: clamp(1.25rem, 5vw, 5.5rem)`.
- Padding vertical sections : `clamp(4.5rem, 10vh, 8rem)`.

---

## Screens / Views (sections)

### 1. Nav (fixe)
- Barre fixe en haut, fond `--paper`, `border-bottom: 2.5px solid ink`. Réduit son padding vertical au scroll (`.solid`, déclenché à scrollY > 40).
- Gauche : brand « Thomas B. » (Archivo 900 uppercase) + carré rouge 14px.
- Droite : liens mono uppercase (À propos, Projets, Stack, Parcours) avec soulignement rouge animé au hover/actif ; CTA « Contact » = bouton fond ink, texte paper, devient rouge au hover.
- < 900px : liens masqués, burger visible → ouvre un menu plein écran (`translateY(-100%)` → 0).
- Lien actif synchronisé au scroll (la section dont `offsetTop - 160 <= scrollY`).

### 2. Hero
- Pleine hauteur (`min-height: 100vh`), centré verticalement, `border-bottom` ink.
- Fond : champ de points radial (`radial-gradient(ink 1.1px, transparent) 30px`, opacity .06).
- Astérisque rouge géant `✳` en haut à droite, `animation: spin 20s linear infinite` (masqué < 520px).
- Haut : sticker rouge « Disponible · Alternance 2026 » (dot blanc pulsant) + localisation mono « Nice — Côte d'Azur, FR ».
- Nom sur 2 lignes : ligne 1 « THOMAS » plein ink ; ligne 2 « BANDIERAS » en contour (`-webkit-text-stroke: 2px ink`, `color: transparent`) qui devient rouge au hover.
- Rôle : **typewriter** (voir Interactions) + curseur rouge `▌`.
- 2 CTA : « Voir mes projets ↗ » (fond rouge, ombre dure) + « Me contacter » (fond paper, ombre dure, s'inverse en ink au hover).

### 3. Marquee
- Bande défilante, fond `--ink`, texte `--paper`, `border-bottom` ink.
- Contenu Archivo 900 uppercase, séparé par astérisques rouges. Animation `scroll-x 24s linear infinite`, **dupliquée en JS** pour boucle continue. Pause au hover.
- Items : Full-Stack · Java · Spring · React · Vue · Game Dev · Bases de données · Apprenti @ Thales.

### 4. À propos (`#about`)
- Kicker « 01 / À propos » (numéro en rouge, bordure basse ink).
- Grille 2 colonnes (`.82fr 1.18fr`, 1 col < 900px).
- Colonne gauche : zone photo `image-slot` ratio 4/5, bordure ink 2.5px ; tag rouge « Nice, FR · 2026 » en bas-gauche, débordant (`bottom:-14px; left:-14px`).
- Colonne droite : lead uppercase Archivo 800 (mots clés `<em>` en rouge), paragraphe `--ink-soft`.
- **Stats** : 3 cellules dans un cadre ink (séparateurs verticaux ink). Chiffres rouges animés (compteur). Hover : fond rouge plein, texte paper. Valeurs : 2 Ans d'études · 10 Repos GitHub · 7 Langages.
- **Skills** : lignes encadrées (grille `150px 1fr`), label catégorie mono rouge + tags bordés (hover : fond ink, texte paper). Catégories : Langages, Frameworks, Bases de données, Soft skills.

### 5. Projets (`#projects`)
- Fond `--paper-2`, bordures haut/bas ink.
- Kicker « 02 / Projets ». Titre « CE QUE J'AI **CONSTRUIT.** » + note mono à droite.
- Liste de 4 projets, chacun en grille 2 colonnes (`1fr 1.05fr`), séparés par bordures ink ; **les projets pairs inversent l'ordre** (`order: 2` sur le visuel) — layout en zig-zag.
- Visuel : 2 `image-slot` côte à côte (ratio 3/4) dans un cadre ink avec séparateur central.
- Texte : numéro contour (devient rouge au hover du projet), titre Archivo 900 (mot `<em>` rouge), description, chips techno (mono, bordées, avec icône Simple Icons 13px), lien « Voir sur GitHub ↗ » (bouton bordé → fond rouge au hover).

| # | Titre | Techs | Lien |
|---|---|---|---|
| 01 | Application **Mobile** | Vue, TypeScript, API REST | github.com/Tiretinium/appmobile |
| 02 | Pokémon App — **Full Stack** | Spring Boot, React, MySQL, REST API | github.com/Tiretinium/Pokeapp-Frontend |
| 03 | Escape **Cube 2** | JavaScript, Node.js, HTML/CSS | github.com/Tiretinium/EscapeCube2 |
| 04 | Aéroport **Tycoon** | React, TypeScript, Vite | github.com/Tiretinium/A-roportTycon |

### 6. Stack (`#stack`)
- Kicker « 03 / Technologies ». Titre « MA **STACK.** ».
- Grille auto-fill `minmax(120px,1fr)`, cellules encadrées ink (bordures left/top sur la grille, right/bottom sur les cellules → grille pleine).
- Chaque cellule : icône Simple Icons 32px (couleur `#121212`) + nom mono. Hover : fond rouge, icône en blanc (`filter: brightness(0) invert(1)`), nom paper.
- 16 items : HTML5, CSS3, JavaScript, React, Vue.js, Java (openjdk), Spring Boot, Python, C/C++ (c), Express.js (express), MySQL, MongoDB, Docker, Git, Linux, Maven (apachemaven).

### 7. Parcours (`#timeline`)
- Fond `--paper-2`, bordures haut/bas ink. Kicker « 04 / Parcours ». Titre « MON **CHEMIN.** ».
- Ligne verticale ink à gauche ; chaque item : dot carré bordé rouge (devient plein rouge au hover), date mono rouge, rôle Archivo 900 uppercase, organisation mono `--ink-soft`, liste à puces `—` rouges.
- 5 items : BUT Informatique 2ᵉ (Thales) · Chef de projet jeu vidéo · Cours particuliers · Régisseur lumière bénévolat · Bac Général.

### 8. Contact (`#contact`)
- Kicker « 05 / Contact ». Titre géant « TRAVAILLONS **ENSEMBLE.** ».
- Grille 2 colonnes.
- Gauche : ligne email + bouton « Copier » (→ « Copié ✓ » fond rouge 1.8s, via Clipboard API). Liste de 4 liens sociaux dans un cadre ink (GitHub, LinkedIn, Téléphone, TikTok) — icône carrée bordée, hover : fond ink + carré rouge, flèche ↗ qui se décale.
- Droite : formulaire (Nom, Email, Message) — champs bordés ink, focus → `box-shadow: 4px 4px 0 red`. Bouton « Envoyer le message → » rouge à ombre dure. Au clic : formulaire masqué, message de confirmation rouge affiché (démo front, pas de backend).

### 9. Footer
- Fond `--ink`, texte `--paper`. Grand « Thomas **Bandieras** » (em rouge) + colonne de liens mono (hover rouge). Barre basse mono : « © 2026 Thomas Bandieras » / « Nice — Côte d'Azur, FR ».

---

## Interactions & Behavior
- **Nav solid** : ajout classe `.solid` quand `scrollY > 40` (réduit le padding).
- **Lien actif** : au scroll, surligne le lien dont la section est courante (`offsetTop - 160`).
- **Burger / menu mobile** : toggle classes `.open` ; ferme au clic sur un lien.
- **Typewriter** (hero) : tape/efface en boucle 4 phrases — « Développeur Full-Stack », « Étudiant BUT Informatique », « Apprenti chez Thales », « Un peu Game Designer ». Vitesses : frappe 75ms, effacement 35ms, pause fin de phrase 1700ms, pause avant nouvelle phrase 420ms, démarrage 900ms.
- **Marquee** : le JS duplique `innerHTML` du track pour une boucle sans couture ; `animation-play-state: paused` au hover.
- **Reveal au scroll** : éléments `.reveal` → classe `.in` via IntersectionObserver (threshold .12), `unobserve` après. Transition opacity+translateY .7s ; delay échelonné `(i % 4) * .08s`.
- **Compteurs** : `.num[data-target]` animés (easing cubic out, durée 1100ms) au passage en vue (threshold .5), une seule fois.
- **Copier email** : Clipboard API → feedback bouton 1.8s.
- **Formulaire** : démo — masque le form, montre `.confirm`. Pas de validation ni d'envoi réel (à brancher : EmailJS, Formspree, ou endpoint backend).
- **Hover** : voir chaque section (ombres dures décalées, inversions rouge/ink, contours qui passent au rouge).

## State Management
Site statique. États locaux uniquement : index typewriter (phrase/caractère/sens), états `.solid`/`.active`/`.open`, flag « copié », flag formulaire envoyé. En React : `useState` pour le typewriter (ou `useEffect` + timeouts), `useState` form/copied, `IntersectionObserver` dans `useEffect` pour reveals & compteurs.

## Responsive
- `< 900px` : nav → burger ; grilles about/projets/contact/skills passent à 1 colonne ; projets perdent le zig-zag ; visuels limités à ~460px.
- `< 520px` : body 16px ; stats en 1 colonne (séparateurs en bordure basse) ; astérisque hero masqué.

## Assets
- **Polices** : Google Fonts (Archivo, Space Mono) — voir import.
- **Icônes techno** : Simple Icons CDN, format `https://cdn.simpleicons.org/<slug>/121212` (couleur encre). Slugs utilisés : vuedotjs, typescript, springboot, react, mysql, javascript, nodedotjs, html5, vite, css, openjdk, python, c, express, mongodb, docker, git, linux, apachemaven. → Dans le codebase, préférer un package d'icônes local (`simple-icons`, `react-icons`) plutôt que le CDN.
- **Images projets / photo** : actuellement des `<image-slot>` (composant web vanilla `image-slot.js`, drag-and-drop persisté en localStorage) servant de placeholders. En production : remplacer par de vrais `<img>` / `next/image` avec les screenshots réels (4 projets × 2 captures + 1 portrait).
- **Aucune image bitmap fournie** dans ce bundle.

## Files
- `Portfolio.html` — structure et contenu (markup statique).
- `styles.css` — tous les styles + tokens (`:root`) + responsive.
- `script.js` — nav, typewriter, marquee, reveals, compteurs, copier, form.
- `image-slot.js` — composant placeholder (à retirer en production au profit de vraies images).
