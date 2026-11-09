/* Portfolio interactions — keeps the original Stitch layout unchanged. */
(() => {
  'use strict';

  // Mobile Navigation
  const menuToggle = document.getElementById('menuToggle');
  const portfolioNav = document.getElementById('portfolioNav');

  if (menuToggle && portfolioNav) {
    const closeMenu = () => {
      portfolioNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
      menuToggle.textContent = '☰';
    };

    menuToggle.addEventListener('click', () => {
      const isOpen = portfolioNav.classList.toggle('is-open');

      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
      );

      menuToggle.textContent = isOpen ? '✕' : '☰';
    });

    // Close menu after clicking a navigation link
    portfolioNav.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu using Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (
        !portfolioNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  // Automatic Footer Year
  const year = document.getElementById('currentYear');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) {
        return;
      }

      const name =
        document.getElementById('name')?.value.trim() || '';

      const email =
        document.getElementById('email')?.value.trim() || '';

      const subject =
        document.getElementById('subject')?.value.trim() ||
        'Portfolio Inquiry';

      const message =
        document.getElementById('message')?.value.trim() || '';

      const recipient = 'suresh2510.chavan@gmail.com';

      const body = `Name: ${name}
Email: ${email}

${message}`;

      const mailto =
        `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      if (formStatus) {
        formStatus.textContent =
          'Opening your email application…';
      }

      // Open the visitor's default email application
      window.location.href = mailto;
    });
  }
})();