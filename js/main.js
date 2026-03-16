/* ============================================================
   SOLARPUNK ACADEMIC — Main JS
   Language toggle, scroll animations, navigation
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLanguageToggle();
  initScrollReveal();
  initNavbar();
  initMobileMenu();
});

/* --- Language Toggle --- */
function initLanguageToggle() {
  const saved = localStorage.getItem('lang') || 'es';
  setLanguage(saved);

  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
      localStorage.setItem('lang', lang);
    });
  });
}

function setLanguage(lang) {
  document.body.classList.remove('lang-en', 'lang-es');
  document.body.classList.add(`lang-${lang}`);

  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

/* --- Scroll Reveal --- */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* --- Navbar scroll effect --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Active link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  // Close menu when clicking a link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
}
