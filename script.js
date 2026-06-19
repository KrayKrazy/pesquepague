/* ================================================================
   PESQUE & PAGUE FORTALEZA — JavaScript
   Features: Navbar scroll, hero slider, reveal animations,
             mobile menu, smooth interactions
================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL BEHAVIOR ──────────────────────────────── */
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  /* ── MOBILE HAMBURGER MENU ───────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    // Animate hamburger → X
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.cssText = 'transform: rotate(45deg) translate(5px, 5px)';
      spans[1].style.cssText = 'opacity: 0; transform: scaleX(0)';
      spans[2].style.cssText = 'transform: rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => (s.style.cssText = ''));
    }
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => (s.style.cssText = ''));
    });
  });


  /* ── HERO BACKGROUND SLIDER ──────────────────────────────── */
  const slides   = document.querySelectorAll('.hero-slide');
  let   current  = 0;
  let   slideTimer;

  const advanceSlide = () => {
    slides[current].classList.remove('active');
    // Reset and re-trigger zoom animation
    slides[current].style.animation = 'none';
    void slides[current].offsetHeight; // reflow
    slides[current].style.animation = '';

    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
    slides[current].style.animation = 'none';
    void slides[current].offsetHeight;
    slides[current].style.animation = 'heroZoom 8s ease-out forwards';
  };

  if (slides.length > 1) {
    slideTimer = setInterval(advanceSlide, 6000);
  }


  /* ── SCROLL REVEAL (INTERSECTION OBSERVER) ───────────────── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── SMOOTH ACTIVE NAV LINK HIGHLIGHTING ─────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navItems  = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navItems.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => sectionObserver.observe(s));


  /* ── GALLERY LIGHTBOX (Simple) ───────────────────────────── */
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.cssText = `
    display: none; position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,0.92); backdrop-filter: blur(8px);
    align-items: center; justify-content: center; cursor: zoom-out;
  `;
  const lightboxImg = document.createElement('img');
  lightboxImg.style.cssText = `
    max-width: 90vw; max-height: 90vh; border-radius: 16px;
    box-shadow: 0 32px 80px rgba(0,0,0,0.8); object-fit: contain;
    animation: fadeIn 0.25s ease;
  `;
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕';
  closeBtn.style.cssText = `
    position: fixed; top: 24px; right: 32px; background: none; border: none;
    color: white; font-size: 2rem; cursor: pointer; z-index: 10000;
    opacity: 0.7; transition: opacity 0.2s; line-height: 1;
  `;
  closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
  closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.7');

  lightbox.appendChild(lightboxImg);
  lightbox.appendChild(closeBtn);
  document.body.appendChild(lightbox);

  const openLightbox = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) openLightbox(img.src, img.alt);
    });
  });
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  closeBtn.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });


  /* ── COUNTER ANIMATION (hero stats) ─────────────────────── */
  const animateCounters = () => {
    // We use the text content directly since values have + and chars
    // This is handled purely by CSS animation; no JS needed here.
  };


  /* ── PARALLAX on HERO ────────────────────────────────────── */
  const heroBg = document.querySelector('.hero-bg-slider');

  const handleParallax = () => {
    const scrollY = window.scrollY;
    if (heroBg && scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
  };
  window.addEventListener('scroll', handleParallax, { passive: true });


  /* ── SCROLL PROGRESS INDICATOR ───────────────────────────── */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; z-index: 9998;
    height: 3px; background: linear-gradient(90deg, #1aa38c, #f0c637);
    width: 0%; transition: width 0.1s linear; pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const docH   = document.documentElement.scrollHeight - window.innerHeight;
    const scroll = (window.scrollY / docH) * 100;
    progressBar.style.width = `${scroll}%`;
  }, { passive: true });


  /* ── FLOATING WHATSAPP PULSE VISIBILITY ──────────────────── */
  const waFloat = document.getElementById('whatsapp-float');
  let waVisible  = false;

  window.addEventListener('scroll', () => {
    const shouldShow = window.scrollY > 300;
    if (shouldShow !== waVisible) {
      waVisible = shouldShow;
      waFloat.style.transform = shouldShow
        ? 'scale(1)'
        : 'scale(0)';
      waFloat.style.opacity   = shouldShow ? '1' : '0';
    }
  }, { passive: true });

  // Initial state
  waFloat.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease';
  waFloat.style.transform  = 'scale(0)';
  waFloat.style.opacity    = '0';


  /* ── NAV ACTIVE STYLE (CSS) ──────────────────────────────── */
  // Inject active link style
  const navStyle = document.createElement('style');
  navStyle.textContent = `.nav-link.active { color: #fff !important; background: rgba(26,163,140,0.15) !important; }`;
  document.head.appendChild(navStyle);

  console.log('🐟 Pesque & Pague Fortaleza — Landing Page loaded successfully!');
});
