(() => {
  const sections = [...document.querySelectorAll('.chapter')];
  const links = [...document.querySelectorAll('.nav-link')];
  const counter = document.querySelector('.chapter-counter strong');
  const nav = document.querySelector('.chapter-nav');
  const menu = document.querySelector('.menu-toggle');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const chapterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const index = sections.indexOf(entry.target);
      const number = String(index + 1).padStart(2, '0');
      counter.textContent = number;
      links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => chapterObserver.observe(section));

  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  links.forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }));

  document.querySelectorAll('.media-frame img').forEach((image) => {
    const markMissing = () => {
      image.classList.add('is-missing');
      image.closest('.media-frame').classList.add('is-placeholder');
    };
    image.addEventListener('error', markMissing);
    if (image.complete && image.naturalWidth === 0) markMissing();
  });

})();
