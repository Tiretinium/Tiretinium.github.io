/* ============================================================
   PORTFOLIO — interactions
   ============================================================ */

/* ---------- Nav : état solide au scroll + lien actif ---------- */
const nav = document.getElementById('nav');
const navAnchors = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', window.scrollY > 40);

  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 160) current = s.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* ---------- Menu mobile ---------- */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
function toggleMenu() {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
}
burger.addEventListener('click', toggleMenu);
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  mobileMenu.classList.remove('open');
}));

/* ---------- Typewriter ---------- */
const phrases = [
  'Développeur Full-Stack',
  'Étudiant BUT Informatique',
  'Apprenti chez Thales',
  'Un peu Game Designer',
];
let pIdx = 0, cIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  const phrase = phrases[pIdx];
  if (deleting) {
    tw.textContent = phrase.slice(0, cIdx--);
    if (cIdx < 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; return setTimeout(type, 420); }
    setTimeout(type, 35);
  } else {
    tw.textContent = phrase.slice(0, cIdx++);
    if (cIdx > phrase.length) { deleting = true; return setTimeout(type, 1700); }
    setTimeout(type, 75);
  }
}
setTimeout(type, 900);

/* ---------- Marquee : duplique le contenu pour une boucle continue ---------- */
const marquee = document.getElementById('marquee');
if (marquee) marquee.innerHTML += marquee.innerHTML;

/* ---------- Reveal au scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 0.08 + 's';
  io.observe(el);
});

/* ---------- Compteurs ---------- */
const counters = document.querySelectorAll('.num[data-target]');
const cio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.target;
    const dur = 1100;
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    cio.unobserve(el);
  });
}, { threshold: .5 });
counters.forEach(c => cio.observe(c));

/* ---------- Copier l'email ---------- */
const copyBtn = document.getElementById('copyBtn');
if (copyBtn) copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('thomasbanderas06@gmail.com');
  } catch (_) {}
  copyBtn.textContent = 'Copié ✓';
  copyBtn.classList.add('done');
  setTimeout(() => { copyBtn.textContent = 'Copier'; copyBtn.classList.remove('done'); }, 1800);
});

/* ---------- Formulaire contact ---------- */
const contactForm = document.getElementById('contactForm');
if (contactForm) contactForm.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = document.getElementById('sendBtn');
  btn.textContent = 'Envoi en cours…';
  btn.disabled = true;
  try {
    const res = await fetch('https://formspree.io/f/mjgdngll', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(contactForm)
    });
    if (res.ok) {
      contactForm.style.display = 'none';
      document.getElementById('confirm').style.display = 'block';
    } else {
      btn.textContent = 'Erreur — réessaie';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Erreur — réessaie';
    btn.disabled = false;
  }
});

/* ---------- Lightbox ---------- */
const lb      = document.getElementById('lb');
const lbImg   = document.getElementById('lbImg');
const lbClose = document.getElementById('lbClose');
const lbPrev  = document.getElementById('lbPrev');
const lbNext  = document.getElementById('lbNext');
const lbCtr   = document.getElementById('lbCounter');

let lbImages = [];
let lbIdx    = 0;

function lbOpen(imgs, idx) {
  lbImages = imgs;
  lbIdx    = idx;
  lbShow();
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function lbClose_() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

function lbShow() {
  lbImg.src = lbImages[lbIdx];
  lbImg.alt = 'Screenshot ' + (lbIdx + 1);
  lbCtr.textContent = (lbIdx + 1) + ' / ' + lbImages.length;
  lbPrev.style.visibility = lbImages.length > 1 ? 'visible' : 'hidden';
  lbNext.style.visibility = lbImages.length > 1 ? 'visible' : 'hidden';
}

document.querySelectorAll('.proj-visual .shots').forEach(shots => {
  const imgs = Array.from(shots.querySelectorAll('img')).map(i => i.src);
  shots.querySelectorAll('img').forEach((img, i) => {
    img.addEventListener('click', () => lbOpen(imgs, i));
  });
});

lbClose.addEventListener('click', lbClose_);
lbPrev.addEventListener('click', () => { lbIdx = (lbIdx - 1 + lbImages.length) % lbImages.length; lbShow(); });
lbNext.addEventListener('click', () => { lbIdx = (lbIdx + 1) % lbImages.length; lbShow(); });

lb.addEventListener('click', e => { if (e.target === lb) lbClose_(); });

document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape')     lbClose_();
  if (e.key === 'ArrowLeft')  { lbIdx = (lbIdx - 1 + lbImages.length) % lbImages.length; lbShow(); }
  if (e.key === 'ArrowRight') { lbIdx = (lbIdx + 1) % lbImages.length; lbShow(); }
});

/* ---------- Modal projet ---------- */
const PROJECTS = {
  '1': {
    num: '01',
    title: 'Application <em>Mobile</em>',
    desc: 'Application mobile full-stack développée avec Vue 3 et TypeScript. L\'interface s\'articule autour d\'une navigation multi-écrans fluide, une gestion d\'état réactive et une communication complète avec une API REST pour la persistance des données.',
    features: [
      'Navigation multi-écrans avec Vue Router',
      'Typage strict TypeScript end-to-end',
      'Intégration et consommation d\'une API REST',
      'Interface mobile-first et responsive',
    ],
    tech: '<span class="chip"><img src="https://cdn.simpleicons.org/vuedotjs/121212" alt="">Vue 3</span><span class="chip"><img src="https://cdn.simpleicons.org/typescript/121212" alt="">TypeScript</span><span class="chip">API REST</span>',
    github: 'https://github.com/Tiretinium/appmobile',
    shots: ['imageAmettredanslehtml/AppMobile1.png', 'imageAmettredanslehtml/AppMobile2.png'],
  },
  '2': {
    num: '02',
    title: 'Pokémon<em> Battle</em>',
    desc: 'Application web complète autour de l\'univers Pokémon. Le backend expose une API REST construite avec Spring Boot, connectée à une base MySQL. Le frontend React permet de s\'authentifier, explorer les Pokémon et lancer des combats interactifs au tour par tour.',
    features: [
      'API REST Spring Boot avec base de données MySQL',
      'Authentification utilisateur (login / register)',
      'Système de combat au tour par tour',
      'Frontend React avec routing et gestion d\'état',
    ],
    tech: '<span class="chip"><img src="https://cdn.simpleicons.org/springboot/121212" alt="">Spring Boot</span><span class="chip"><img src="https://cdn.simpleicons.org/react/121212" alt="">React</span><span class="chip"><img src="https://cdn.simpleicons.org/mysql/121212" alt="">MySQL</span><span class="chip">REST API</span>',
    github: 'https://github.com/Tiretinium/Pokeapp-Frontend',
    shots: ['imageAmettredanslehtml/PokeBattle1.png', 'imageAmettredanslehtml/PokeBattle2.png'],
  },
  '3': {
    num: '03',
    title: 'Escape <em>Cube 2</em>',
    desc: 'Jeu d\'escape en ligne jouable directement dans le navigateur. L\'architecture client-serveur repose sur Node.js, avec une logique de donjon implémentée côté serveur en JavaScript et une interface HTML/CSS rendue dynamiquement côté client.',
    features: [
      'Architecture client-serveur Node.js',
      'Donjon interactif avec navigation en temps réel',
      'Logique de jeu JavaScript côté serveur',
      'Interface HTML/CSS rendue dynamiquement',
    ],
    tech: '<span class="chip"><img src="https://cdn.simpleicons.org/javascript/121212" alt="">JavaScript</span><span class="chip"><img src="https://cdn.simpleicons.org/nodedotjs/121212" alt="">Node.js</span><span class="chip"><img src="https://cdn.simpleicons.org/html5/121212" alt="">HTML/CSS</span>',
    github: 'https://github.com/Tiretinium/EscapeCube2',
    shots: ['imageAmettredanslehtml/EscapeCube1.png', 'imageAmettredanslehtml/EscapeCube2.png'],
  },
  '4': {
    num: '04',
    title: 'Aéroport <em>Tycoon</em>',
    desc: 'Jeu de gestion d\'aéroport en React et TypeScript, bundlé avec Vite. Le joueur construit des infrastructures, gère les flux de passagers et optimise ses ressources en temps réel dans une simulation entièrement graphique.',
    features: [
      'Simulation de gestion en temps réel',
      'Construction et upgrade d\'infrastructures',
      'Flux de passagers dynamiques',
      'Codebase React + TypeScript entièrement typée',
    ],
    tech: '<span class="chip"><img src="https://cdn.simpleicons.org/react/121212" alt="">React</span><span class="chip"><img src="https://cdn.simpleicons.org/typescript/121212" alt="">TypeScript</span><span class="chip"><img src="https://cdn.simpleicons.org/vite/121212" alt="">Vite</span>',
    github: 'https://github.com/Tiretinium/A-roportTycon',
    shots: ['imageAmettredanslehtml/AeroportTycon1.png', 'imageAmettredanslehtml/AeroportTycon2.png'],
  },
};

const projModal = document.getElementById('projModal');
const pmClose   = document.getElementById('pmClose');
const pmNum     = document.getElementById('pmNum');
const pmTitle   = document.getElementById('pmTitle');
const pmDesc    = document.getElementById('pmDesc');
const pmFeats   = document.getElementById('pmFeatures');
const pmTech    = document.getElementById('pmTech');
const pmGo      = document.getElementById('pmGo');
const pmMain    = document.getElementById('pmMainShot');
const pmThumbs  = document.getElementById('pmThumbs');

function openProjModal(id) {
  const p = PROJECTS[id];
  if (!p) return;
  pmNum.textContent  = p.num;
  pmTitle.innerHTML  = p.title;
  pmDesc.textContent = p.desc;
  pmFeats.innerHTML  = p.features.map(f => `<li>${f}</li>`).join('');
  pmTech.innerHTML   = p.tech;
  pmGo.href          = p.github;
  pmMain.src         = p.shots[0];
  pmMain.alt         = p.title.replace(/<[^>]+>/g, '') + ' screenshot 1';
  pmThumbs.innerHTML = '';
  p.shots.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'pm-thumb' + (i === 0 ? ' active' : '');
    const img = document.createElement('img');
    img.src = src; img.alt = 'Screenshot ' + (i + 1);
    div.appendChild(img);
    div.addEventListener('click', () => {
      pmMain.src = src;
      pmThumbs.querySelectorAll('.pm-thumb').forEach(t => t.classList.remove('active'));
      div.classList.add('active');
    });
    pmThumbs.appendChild(div);
  });
  projModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjModal() {
  projModal.classList.remove('open');
  document.body.style.overflow = '';
}

pmClose.addEventListener('click', closeProjModal);
projModal.addEventListener('click', e => { if (e.target === projModal) closeProjModal(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && projModal.classList.contains('open')) closeProjModal();
});

document.querySelectorAll('.proj[data-proj-id]').forEach(card => {
  const id  = card.dataset.projId;
  const go  = card.querySelector('.proj-go');
  const btn = document.createElement('button');
  btn.className   = 'proj-more';
  btn.textContent = 'En savoir plus →';
  btn.addEventListener('click', e => { e.stopPropagation(); openProjModal(id); });
  go.parentNode.insertBefore(btn, go);
});

/* ---------- CV iframe fallback ---------- */
const cvIframe = document.querySelector('.cv-iframe');
const cvPreview = document.querySelector('.cv-preview');
if (cvIframe && cvPreview) {
  cvIframe.addEventListener('error', () => cvPreview.classList.add('no-pdf'));
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    cvPreview.classList.add('no-pdf');
  }
}

/* ---------- Tilt 3D — project cards ---------- */
document.querySelectorAll('.proj').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform .12s ease';
  });
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const x  = e.clientX - r.left;
    const y  = e.clientY - r.top;
    const cx = r.width  / 2;
    const cy = r.height / 2;
    const rotY =  ((x - cx) / cx) * 9;
    const rotX = -((y - cy) / cy) * 5;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.015)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform .55s cubic-bezier(.2,.8,.2,1)';
    card.style.transform  = '';
  });
});

/* ---------- Terminal interactif ---------- */
(function () {
  const input  = document.getElementById('termInput');
  const output = document.getElementById('termOutput');
  const body   = document.getElementById('termBody');
  const win    = document.querySelector('.term-window');
  if (!input) return;

  const history = [];
  let histIdx = -1;

  /* ---- Commandes ---- */
  const cmds = {
    help() {
      return `
<span class="tc-comment">┌─ Commandes disponibles ─────────────────────────────┐</span>
  <span class="tc-cmd">whoami</span>          — Qui suis-je ?
  <span class="tc-cmd">ls</span>              — Fichiers disponibles
  <span class="tc-cmd">ls projects/</span>    — Mes projets
  <span class="tc-cmd">cat about.txt</span>   — À propos de moi
  <span class="tc-cmd">cat contact.txt</span> — Mes coordonnées
  <span class="tc-cmd">cat skills.txt</span>  — Compétences complètes
  <span class="tc-cmd">github</span>          — Ouvrir mon GitHub ↗
  <span class="tc-cmd">date</span>            — Date & heure
  <span class="tc-cmd">clear</span>           — Vider le terminal
  <span class="tc-cmd">echo &lt;texte&gt;</span>    — Répéter du texte
<span class="tc-comment">└─────────────────────────────────────────────────────┘</span>`;
    },
    whoami() {
      return `
<span class="tc-key">Nom</span>          Thomas Bandieras
<span class="tc-key">Rôle</span>         Développeur Full-Stack
<span class="tc-key">Formation</span>    BUT Informatique · IUT Nice Côte d'Azur
<span class="tc-key">Alternance</span>   Apprenti chez Thales · Nice, FR
<span class="tc-key">GitHub</span>       github.com/Tiretinium
<span class="tc-key">Dispo</span>        <span class="tc-green">● Disponible — Alternance 2026</span>`;
    },
    ls() {
      return `about.txt  contact.txt  skills.txt  <span class="tc-dir">projects/</span>  cv.pdf`;
    },
    'ls projects/'() {
      return `
drwxr-xr-x  <span class="tc-dir">appmobile/</span>        Vue · TypeScript · REST API
drwxr-xr-x  <span class="tc-dir">pokebattle/</span>       Spring Boot · React · MySQL
drwxr-xr-x  <span class="tc-dir">escapecube2/</span>      Node.js · JavaScript · HTML/CSS
drwxr-xr-x  <span class="tc-dir">aeroport-tycoon/</span>  React · TypeScript · Vite`;
    },
    'cat about.txt'() {
      return `
Étudiant en BUT Informatique, apprenti chez Thales.
Du web full-stack à la conception de jeux — j'aime résoudre
des problèmes concrets et livrer du code propre.

<span class="tc-key">Localisation</span>  Nice — Côte d'Azur, FR
<span class="tc-key">Langues</span>       Français (natif) · Anglais B2 · Italien B1`;
    },
    'cat contact.txt'() {
      return `
<span class="tc-key">Email</span>     thomasbanderas06@gmail.com
<span class="tc-key">LinkedIn</span>  linkedin.com/in/thomas-bandieras-672772312
<span class="tc-key">GitHub</span>    github.com/Tiretinium
<span class="tc-key">Tél</span>       07 69 48 35 25`;
    },
    'cat skills.txt'() {
      return `
<span class="tc-key">Langages</span>    JavaScript · Java · Python · C · SQL · Bash
<span class="tc-key">Frontend</span>    React · Vue.js · HTML/CSS
<span class="tc-key">Backend</span>     Spring Boot · Express.js · Node.js
<span class="tc-key">BDD</span>         MySQL · MariaDB · MongoDB · SQLite
<span class="tc-key">DevOps</span>      Docker · Git · Linux · Maven
<span class="tc-key">Langues</span>     Français (natif) · Anglais B2 · Italien B1`;
    },
    github() {
      window.open('https://github.com/Tiretinium', '_blank');
      return `Ouverture de github.com/Tiretinium... <span class="tc-green">✓</span>`;
    },
    date() {
      return new Date().toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'medium' });
    },
    clear: '__CLEAR__',
  };

  function esc(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function print(html, cls = '') {
    const p = document.createElement('p');
    p.className = 'term-line' + (cls ? ' ' + cls : '');
    p.innerHTML = html;
    output.appendChild(p);
    body.scrollTop = body.scrollHeight;
  }

  function run(raw) {
    const trimmed = raw.trim();
    const lower   = trimmed.toLowerCase();

    print(`<span class="term-prompt">thomas@portfolio:~$&nbsp;</span><span class="tc-input">${esc(raw)}</span>`);

    if (!trimmed) return;

    /* echo */
    if (lower.startsWith('echo ')) {
      print(esc(trimmed.slice(5)));
      return;
    }

    /* clear */
    if (lower === 'clear') { output.innerHTML = ''; return; }

    const fn = cmds[lower];
    if (fn && fn !== '__CLEAR__') {
      const res = fn();
      if (res) print(res);
    } else {
      print(`<span class="tc-err">bash: ${esc(trimmed)}: commande introuvable. Tape <strong>help</strong>.</span>`);
    }
  }

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = input.value;
      if (val.trim()) { history.unshift(val); histIdx = -1; }
      run(val);
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < history.length - 1) histIdx++;
      input.value = history[histIdx] ?? '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      histIdx = Math.max(-1, histIdx - 1);
      input.value = histIdx === -1 ? '' : (history[histIdx] ?? '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      /* Autocomplétion basique */
      const partial = input.value.trim().toLowerCase();
      const match   = Object.keys(cmds).find(k => k.startsWith(partial) && k !== partial);
      if (match) input.value = match;
    }
  });

  /* Clic sur la fenêtre → focus input */
  win.addEventListener('click', () => input.focus());
})();
