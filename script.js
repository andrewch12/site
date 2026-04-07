// Керування мобільним меню (burger)
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Поява секцій під час скролу
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => observer.observe(element));

// Кнопка "вгору"
const toTopButton = document.querySelector('.to-top');
if (toTopButton) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      toTopButton.classList.add('is-visible');
    } else {
      toTopButton.classList.remove('is-visible');
    }
  });

  toTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Базова валідація форми
const form = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');

if (form && formStatus) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.elements.name.value.trim();
    const contact = form.elements.contact.value.trim();
    const message = form.elements.message.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s\-()]{7,}$/;

    if (name.length < 2) {
      formStatus.textContent = 'Будь ласка, введіть ім’я (мінімум 2 символи).';
      formStatus.style.color = '#c62828';
      return;
    }

    if (!emailRegex.test(contact) && !phoneRegex.test(contact)) {
      formStatus.textContent = 'Вкажіть коректний email або номер телефону.';
      formStatus.style.color = '#c62828';
      return;
    }

    if (message.length < 10) {
      formStatus.textContent = 'Опишіть задачу детальніше (мінімум 10 символів).';
      formStatus.style.color = '#c62828';
      return;
    }

    formStatus.textContent = 'Дякуємо! Заявку надіслано. Ми зв’яжемося з вами найближчим часом.';
    formStatus.style.color = '#1c7c39';
    form.reset();
  });
}
