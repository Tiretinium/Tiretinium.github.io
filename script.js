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
