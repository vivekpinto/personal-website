/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Vanilla JS implementation for the portfolio
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // Toggle mobile menu
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      menuToggle.setAttribute('aria-label', isExpanded ? 'Open menu' : 'Close menu');
      mobileMenu.classList.toggle('is-hidden');
    });
  }

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuToggle && mobileMenu) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
        mobileMenu.classList.add('is-hidden');
      }
    });
  });

  // Simple Scroll Spy & Active State
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id') || '';
      }
    });

    navItems.forEach(item => {
      item.classList.remove('is-active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('is-active');
      }
    });
  });

  console.log('Vivek Pinto - Accessibility Portfolio initialized.');
});
