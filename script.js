const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const modal = document.querySelector('.modal');
const modalImage = modal.querySelector('img');
const modalTitle = modal.querySelector('p');
const closeModal = () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
};

document.querySelectorAll('.project').forEach((project) => {
  project.addEventListener('click', () => {
    modalImage.src = project.dataset.img;
    modalImage.alt = project.dataset.title;
    modalTitle.textContent = project.dataset.title;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});

modal.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

document.querySelector('.contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button');
  const originalText = button.textContent;
  button.textContent = 'Заявка подготовлена';
  setTimeout(() => {
    button.textContent = originalText;
    event.currentTarget.reset();
  }, 1800);
});
