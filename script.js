const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-menu');

const closeMenu = () => {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Buka menu');
};

menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
});

document.querySelectorAll('.nav-menu a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (event) => {
  if (menu.classList.contains('open') && !menu.contains(event.target) && !menuButton.contains(event.target)) {
    closeMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((element) => element.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach((element) => observer.observe(element));
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 980) closeMenu();
});
