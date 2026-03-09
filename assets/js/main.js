/* ─────────────────────────────────────────────────────────────────
   HENRY CHU PORTFOLIO — main.js
   ───────────────────────────────────────────────────────────────── */

// ─── NAV: add scrolled class ──────────────────────────────────────
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ─── NAV: mobile toggle ───────────────────────────────────────────
const toggle = document.querySelector('.nav-toggle');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('menu-open');
  toggle.setAttribute('aria-expanded', open);
  // animate spans into X
  const spans = toggle.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'translateY(6px) rotate(45deg)';
    spans[1].style.transform = 'translateY(-6px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  }
});

// close menu on link click
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', false);
    toggle.querySelectorAll('span').forEach(s => s.style.transform = '');
  })
);

// ─── HERO: parallax + load ────────────────────────────────────────
const hero = document.querySelector('.hero');
const heroBg = hero.querySelector('.hero-bg');

window.addEventListener('load', () => hero.classList.add('loaded'));

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) {
    heroBg.style.transform = `scale(1) translateY(${y * 0.25}px)`;
  }
}, { passive: true });

// ─── LIGHTBOX ────────────────────────────────────────────────────
const lb = document.createElement('div');
lb.className = 'lightbox';
lb.innerHTML = '<img src="" alt=""/><button class="lightbox-close" aria-label="Close">✕</button>';
document.body.appendChild(lb);

const lbImg = lb.querySelector('img');

document.querySelectorAll('figure').forEach(fig => {
  const src = fig.querySelector('img');
  if (!src) return;
  fig.addEventListener('click', () => {
    lbImg.src = src.src;
    lbImg.alt = src.alt;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

const closeLb = () => {
  lb.classList.remove('active');
  document.body.style.overflow = '';
  lbImg.src = '';
};

lb.querySelector('.lightbox-close').addEventListener('click', closeLb);
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

// ─── INTERSECTION OBSERVER: fade-in on scroll ─────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-header, .project-concept, .gallery, .project-collab').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});
