/**
 * Bridge Distribution, Inc. — Main JavaScript
 * Handles: SPA navigation, scroll effects, animations,
 * counters, FAQ accordion, product filter, form handling.
 */

/* ===================== PAGE NAVIGATION ===================== */
const PAGES = ['home', 'about', 'products', 'brand', 'careers', 'support'];

function showPage(id) {
  PAGES.forEach(p => {
    const el  = document.getElementById('page-' + p);
    const nav = document.getElementById('nav-' + p);
    if (!el) return;

    if (p === id) {
      el.classList.remove('hidden');
      // Brief delay allows DOM paint before transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => el.classList.add('visible'));
      });
      if (nav) nav.classList.add('active');
    } else {
      el.classList.remove('visible');
      el.classList.add('hidden');
      if (nav) nav.classList.remove('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Trigger reveal + counters for visible page
  setTimeout(() => {
    checkReveal();
    if (id === 'home') initCounters();
  }, 60);
}

/* ===================== NAVBAR SCROLL ===================== */
function handleNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}

/* ===================== SCROLL PROGRESS BAR ===================== */
function updateScrollProgress() {
  const el = document.getElementById('scroll-progress');
  if (!el) return;
  const total    = document.body.scrollHeight - window.innerHeight;
  const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
  el.style.width = progress + '%';
}

/* ===================== REVEAL ON SCROLL ===================== */
function checkReveal() {
  const threshold = window.innerHeight * 0.88;
  document.querySelectorAll('.reveal:not(.active)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < threshold) el.classList.add('active');
  });
}

/* ===================== COUNTER ANIMATION ===================== */
let countersInitialized = false;

function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const steps    = 60;
  const increment = target / steps;
  let current = 0;
  let frame   = 0;

  const timer = setInterval(() => {
    frame++;
    current = Math.min(current + increment, target);
    el.textContent = Math.round(current).toLocaleString();
    if (frame >= steps) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    }
  }, duration / steps);
}

function initCounters() {
  if (countersInitialized) return;

  const statsBand = document.querySelector('.stats-band');
  if (!statsBand) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          countersInitialized = true;
          document.querySelectorAll('.counter').forEach(animateCounter);
          observer.disconnect();
        }
      });
    },
    { threshold: 0.25 }
  );
  observer.observe(statsBand);
}

/* ===================== PRODUCT / BRAND FILTER ===================== */
function filterBrands(cat, btn) {
  // Toggle active class
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.brand-card').forEach(card => {
    const match = cat === 'all' || card.dataset.cat === cat;
    card.style.display = match ? '' : 'none';
    if (match) {
      card.style.animation = 'none';
      card.offsetHeight;   // reflow
      card.style.animation = 'fadeIn 0.35s ease both';
    }
  });
}

/* ===================== FAQ ACCORDION ===================== */
function toggleFaq(btn) {
  const item   = btn.parentElement;
  const isOpen = item.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  // Open clicked if it was closed
  if (!isOpen) item.classList.add('open');
}

/* ===================== MOBILE MENU ===================== */
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const hb   = document.getElementById('hamburger-btn');
  if (!menu || !hb) return;
  menu.classList.toggle('open');
  hb.classList.toggle('open');
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const hb   = document.getElementById('hamburger-btn');
  if (menu) menu.classList.remove('open');
  if (hb)   hb.classList.remove('open');
}

/* ===================== CONTACT FORM ===================== */
function handleContactForm(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  if (!btn) return;

  const original = btn.innerHTML;
  btn.innerHTML  = '✓ Message Sent!';
  btn.style.background = '#1a9e50';
  btn.disabled = true;

  // Reset the form
  const form = document.getElementById('contact-form');
  if (form) {
    setTimeout(() => {
      form.reset();
      btn.innerHTML  = original;
      btn.style.background = '';
      btn.disabled   = false;
    }, 3500);
  }
}

/* ===================== TICKER DUPLICATION ===================== */
function initTicker() {
  const track = document.querySelector('.ticker-track');
  if (!track) return;
  // Clone items for seamless loop
  const original = track.innerHTML;
  track.innerHTML = original + original;
}

/* ===================== INLINE CSS ANIMATION ===================== */
function injectKeyframes() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

/* ===================== INIT ===================== */
document.addEventListener('DOMContentLoaded', () => {
  injectKeyframes();
  initTicker();
  checkReveal();
  initCounters();

  // Scroll listeners
  window.addEventListener('scroll', () => {
    handleNavbarScroll();
    updateScrollProgress();
    checkReveal();
  }, { passive: true });

  // Contact form submit
  const contactForm = document.getElementById('contact-form');
  if (contactForm) contactForm.addEventListener('submit', handleContactForm);

  // Close mobile menu when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMobileMenu();
  });
});
