// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu after clicking a link (mobile)
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Hero banner: crossfade carousel through the stacked .hero-banner-img slides
const heroBannerSlides = document.querySelectorAll('.hero-banner-img');
if (heroBannerSlides.length > 1) {
  let activeSlideIndex = 0;
  setInterval(() => {
    heroBannerSlides[activeSlideIndex].classList.remove('is-active');
    activeSlideIndex = (activeSlideIndex + 1) % heroBannerSlides.length;
    heroBannerSlides[activeSlideIndex].classList.add('is-active');
  }, 5000);
}
