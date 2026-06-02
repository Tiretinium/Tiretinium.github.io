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

/* ---------- Formulaire (démo) ---------- */
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) sendBtn.addEventListener('click', () => {
  const form = document.getElementById('contactForm');
  const confirm = document.getElementById('confirm');
  form.style.display = 'none';
  confirm.style.display = 'block';
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
