const logoStyles = document.createElement('style');
logoStyles.textContent = `
.logo{display:inline-flex;align-items:center;width:210px;max-width:210px;height:auto;overflow:visible;flex:0 0 210px;padding:0;background:none;border:0;box-shadow:none;text-decoration:none;transition:opacity .25s ease,transform .25s ease}
.logo:hover{opacity:.9;transform:translateY(-1px)}
.logo-image{display:block;width:100%;height:auto;max-height:66px;object-fit:contain;object-position:left center;border:0;border-radius:0;background:transparent;box-shadow:none;filter:none;mix-blend-mode:normal;transform:none}
.footer .logo{width:180px;max-width:180px;flex-basis:180px}
.footer .logo-image{max-height:58px}
@media (prefers-reduced-motion:reduce){.logo{transition:none}.logo:hover{transform:none}}
@media (max-width:640px){.logo{width:150px;max-width:150px;flex-basis:150px}.logo-image{max-height:48px}.footer .logo{width:150px;max-width:150px;flex-basis:150px}}
`;
document.head.append(logoStyles);

document.querySelectorAll('.site-header .logo, .footer .logo').forEach((logo) => {
  logo.setAttribute('aria-label', 'Контур — на главную');
  logo.innerHTML = '<img class="logo-image" src="assets/kontur-logo.jpg" alt="Контур">';
});

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
