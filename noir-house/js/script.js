// Shared JavaScript for theme, mobile navigation, gallery and booking form.
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeButton = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('noir-theme');
  if (savedTheme === 'light') body.classList.add('light');
  if (themeButton) {
    themeButton.textContent = body.classList.contains('light') ? '☾' : '☀';
    themeButton.addEventListener('click', () => {
      body.classList.toggle('light');
      const theme = body.classList.contains('light') ? 'light' : 'dark';
      localStorage.setItem('noir-theme', theme);
      themeButton.textContent = theme === 'light' ? '☾' : '☀';
    });
  }

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.textContent = isOpen ? '✕' : '☰';
    });
  }

  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lightboxImage = lightbox.querySelector('img');
    document.querySelectorAll('.gallery-grid img').forEach((photo) => {
      photo.addEventListener('click', () => {
        lightboxImage.src = photo.src;
        lightboxImage.alt = photo.alt;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });
    const closeLightbox = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
    };
    lightbox.querySelector('button').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeLightbox();
    });
  }

  const bookingForm = document.querySelector('#booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!bookingForm.reportValidity()) return;
      document.querySelector('#form-message').textContent =
        'Thank you! Your reservation request has been recorded for this demo.';
      bookingForm.reset();
    });
  }
});
