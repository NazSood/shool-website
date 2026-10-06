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

// Hero banner: crossfade carousel through the stacked .hero-banner-img slides.
// Image slides dwell for SLIDE_DURATION_MS; a video slide instead plays
// through to its own natural end (needs 'ended' to fire, so it must NOT loop).
const heroBannerSlides = document.querySelectorAll('.hero-banner-img');
if (heroBannerSlides.length > 1) {
  const SLIDE_DURATION_MS = 5000;
  let activeSlideIndex = 0;
  let advanceTimer = null;
  let advancedForCurrentSlide = false;

  function advance() {
    if (advancedForCurrentSlide) return;
    advancedForCurrentSlide = true;
    clearTimeout(advanceTimer);
    heroBannerSlides[activeSlideIndex].classList.remove('is-active');
    activeSlideIndex = (activeSlideIndex + 1) % heroBannerSlides.length;
    activateSlide(heroBannerSlides[activeSlideIndex]);
  }

  function activateSlide(slide) {
    advancedForCurrentSlide = false;
    slide.classList.add('is-active');
    if (slide.tagName === 'VIDEO') {
      slide.currentTime = 0;
      const playPromise = slide.play();
      if (playPromise) playPromise.catch(() => {});
      // Safety net in case autoplay is blocked and 'ended' never fires.
      advanceTimer = setTimeout(advance, 20000);
    } else {
      advanceTimer = setTimeout(advance, SLIDE_DURATION_MS);
    }
  }

  heroBannerSlides.forEach((slide) => {
    if (slide.tagName === 'VIDEO') slide.addEventListener('ended', advance);
  });

  activateSlide(heroBannerSlides[activeSlideIndex]);
}

// Industry application cards: clicking any card opens a shared modal
// populated from that card's own image/title/data-detail, with a
// fade+scale-in animation (see .industry-modal/-panel in style.css).
const industryModal = document.getElementById('industryModal');
if (industryModal) {
  const modalMedia = document.getElementById('industryModalMedia');
  const modalTitle = document.getElementById('industryModalTitle');
  const modalDesc = document.getElementById('industryModalDesc');

  function openIndustryModal(card) {
    const title = card.querySelector('.app-card-body strong');
    modalMedia.style.backgroundImage = card.style.backgroundImage;
    modalTitle.textContent = title ? title.textContent : '';
    modalDesc.textContent = card.dataset.detail || '';
    industryModal.classList.add('is-open');
    industryModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeIndustryModal() {
    industryModal.classList.remove('is-open');
    industryModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('.app-card').forEach((card) => {
    card.addEventListener('click', () => openIndustryModal(card));
  });

  industryModal.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', closeIndustryModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && industryModal.classList.contains('is-open')) closeIndustryModal();
  });
}
