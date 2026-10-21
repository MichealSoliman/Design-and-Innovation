/**
 * ==========================================================================
 * RIWAQ Luxury Woodwork & Bespoke Furniture
 * Main Interactive Controller (Navbar & Hero Section)
 * ==========================================================================
 */

class LuxuryNavbarController {
  constructor() {
    this.navElement = document.getElementById('main-navbar');
    this.navContainer = document.getElementById('navbar-container');
    this.mobileToggle = document.getElementById('mobile-menu-toggle');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.mobileBackdrop = document.getElementById('mobile-backdrop');
    this.mobileClose = document.getElementById('mobile-menu-close');
    this.servicesDropdownBtn = document.getElementById('services-dropdown-btn');
    this.servicesDropdownMenu = document.getElementById('services-dropdown-menu');
    this.isOpen = false;
    this.isDropdownOpen = false;

    this.init();
  }

  init() {
    this.bindScroll();
    this.bindMobileMenu();
    this.bindServicesDropdown();
  }

  bindScroll() {
    let ticking = false;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 30) {
        this.navContainer?.classList.add('bg-[#19241E]/90', 'shadow-2xl', 'border-white/15', 'py-2.5');
        this.navContainer?.classList.remove('bg-[#19241E]/60', 'py-3.5');
      } else {
        this.navContainer?.classList.remove('bg-[#19241E]/90', 'shadow-2xl', 'border-white/15', 'py-2.5');
        this.navContainer?.classList.add('bg-[#19241E]/60', 'py-3.5');
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    }, { passive: true });
    handleScroll();
  }

  bindMobileMenu() {
    if (!this.mobileToggle || !this.mobileMenu) return;

    const toggle = (force) => {
      this.isOpen = typeof force === 'boolean' ? force : !this.isOpen;

      if (this.isOpen) {
        this.mobileMenu.classList.remove('translate-x-full', 'pointer-events-none');
        this.mobileMenu.classList.add('translate-x-0');
        this.mobileBackdrop?.classList.remove('opacity-0', 'pointer-events-none');
        this.mobileBackdrop?.classList.add('opacity-100');
        document.body.style.overflow = 'hidden';
        this.mobileToggle.setAttribute('aria-expanded', 'true');
      } else {
        this.mobileMenu.classList.add('translate-x-full', 'pointer-events-none');
        this.mobileMenu.classList.remove('translate-x-0');
        this.mobileBackdrop?.classList.add('opacity-0', 'pointer-events-none');
        this.mobileBackdrop?.classList.remove('opacity-100');
        document.body.style.overflow = '';
        this.mobileToggle.setAttribute('aria-expanded', 'false');
      }
    };

    this.mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });
    this.mobileClose?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle(false);
    });
    this.mobileBackdrop?.addEventListener('click', () => toggle(false));

    // Close on navigation link click
    this.mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggle(false));
    });

    // Keyboard ESC support
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        toggle(false);
      }
    });
  }

  bindServicesDropdown() {
    if (!this.servicesDropdownBtn || !this.servicesDropdownMenu) return;

    let timeoutId = null;

    const show = () => {
      clearTimeout(timeoutId);
      this.servicesDropdownMenu.classList.remove('opacity-0', 'invisible', 'translate-y-2');
      this.servicesDropdownMenu.classList.add('opacity-100', 'visible', 'translate-y-0');
      this.servicesDropdownBtn.setAttribute('aria-expanded', 'true');
      this.isDropdownOpen = true;
    };

    const hide = () => {
      timeoutId = setTimeout(() => {
        this.servicesDropdownMenu.classList.add('opacity-0', 'invisible', 'translate-y-2');
        this.servicesDropdownMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
        this.servicesDropdownBtn.setAttribute('aria-expanded', 'false');
        this.isDropdownOpen = false;
      }, 150);
    };

    const parent = this.servicesDropdownBtn.parentElement;
    if (parent) {
      parent.addEventListener('mouseenter', show);
      parent.addEventListener('mouseleave', hide);
    }

    this.servicesDropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.isDropdownOpen) hide();
      else show();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isDropdownOpen) {
        hide();
      }
    });
  }
}

class LuxuryHeroSlider {
  constructor(config) {
    this.config = config || window.LUXURY_CONFIG || (typeof LUXURY_CONFIG !== 'undefined' ? LUXURY_CONFIG : null);

    if (!this.config || !this.config.slides || !this.config.slides.length) {
      console.error('[RIWAQ] No slides configured in LUXURY_CONFIG');
      return;
    }

    this.slides = this.config.slides;
    this.duration = this.config.autoplayDuration || 5500;
    this.currentIndex = 0;
    this.timer = null;
    this.isPaused = false;
    this.isManuallyPaused = false;
    this.touchStartX = 0;
    this.touchEndX = 0;

    // Check reduced motion preference
    this.prefersReducedMotion = false;
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // DOM Elements
    this.heroSection = document.getElementById('hero-section');
    this.backgroundContainer = document.getElementById('hero-bg-container');
    this.badgeEl = document.getElementById('hero-badge-text');
    this.titleEl = document.getElementById('hero-title');
    this.descriptionEl = document.getElementById('hero-description');
    this.primaryCta = document.getElementById('hero-primary-cta');
    this.secondaryCta = document.getElementById('hero-secondary-cta');
    this.currentNumEl = document.getElementById('hero-current-num');
    this.totalNumEl = document.getElementById('hero-total-num');
    this.progressBar = document.getElementById('hero-progress-bar');
    this.prevBtn = document.getElementById('hero-prev-btn');
    this.nextBtn = document.getElementById('hero-next-btn');
    this.pauseBtn = document.getElementById('hero-pause-btn');
    this.pauseIcon = document.getElementById('hero-pause-icon');
    this.playIcon = document.getElementById('hero-play-icon');
    this.desktopThumbnailsContainer = document.getElementById('desktop-thumbnails');
    this.mobileThumbnailsContainer = document.getElementById('mobile-thumbnails');

    this.bgSlideElements = [];
    this.desktopThumbElements = [];
    this.mobileThumbElements = [];

    this.init();
  }

  init() {
    this.renderBackgroundSlides();
    this.renderThumbnails();
    this.updateContent(0, false);
    this.bindEvents();
    this.preloadImages();

    if (!this.prefersReducedMotion) {
      this.startAutoplay();
    } else {
      this.setPausedState(true);
    }
  }

  preloadImages() {
    this.slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }

  renderBackgroundSlides() {
    if (!this.backgroundContainer) return;
    this.backgroundContainer.innerHTML = '';

    this.bgSlideElements = this.slides.map((slide, index) => {
      const img = document.createElement('img');
      img.src = slide.image;
      img.alt = slide.alt;
      img.className = `hero-bg-slide ${index === 0 ? 'active' : 'inactive'}`;
      img.setAttribute('role', 'img');
      img.setAttribute('aria-label', slide.alt);
      img.setAttribute('data-slide-index', index);

      img.onerror = () => {
        img.style.backgroundColor = '#2d211a';
      };

      this.backgroundContainer.appendChild(img);
      return img;
    });
  }

  renderThumbnails() {
    // Render Desktop Vertical Thumbnails
    if (this.desktopThumbnailsContainer) {
      this.desktopThumbnailsContainer.innerHTML = '';
      this.desktopThumbElements = this.slides.map((slide, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `thumb-card w-full text-right p-2.5 rounded-2xl border transition-all duration-300 flex items-center gap-3.5 group cursor-pointer ${index === 0
          ? 'active border-[#CFB78C] bg-[#324D3E]/40 shadow-lg'
          : 'border-white/10 bg-[#19241E]/50 hover:bg-[#19241E]/80 hover:border-white/20'
          }`;
        btn.setAttribute('aria-label', `الانتقال إلى شريحة ${slide.categoryShort}`);
        btn.setAttribute('data-index', index);

        btn.innerHTML = `
          <div class="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/15">
            <img src="${slide.thumbImage}" alt="${slide.categoryShort}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
            <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            <span class="absolute bottom-1 right-1 text-[10px] font-cinzel font-bold px-1.5 py-0.5 rounded bg-black/70 text-[#F6F2EB]">0${slide.id}</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-1 mb-0.5">
              <span class="text-xs font-semibold text-[#E3D1B1] truncate">${slide.categoryShort}</span>
              <span class="thumb-active-dot w-2 h-2 rounded-full ${index === 0 ? 'bg-[#CFB78C] ring-4 ring-[#CFB78C]/30' : 'bg-transparent'} transition-all"></span>
            </div>
            <p class="text-[11px] text-[#F6F2EB]/65 truncate group-hover:text-[#F6F2EB]/90 transition-colors">${slide.title}</p>
          </div>
        `;

        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.goToSlide(index);
          this.restartAutoplay();
        });

        this.desktopThumbnailsContainer.appendChild(btn);
        return btn;
      });
    }

    // Render Mobile Horizontal Thumbnails
    if (this.mobileThumbnailsContainer) {
      this.mobileThumbnailsContainer.innerHTML = '';
      this.mobileThumbElements = this.slides.map((slide, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `mobile-thumb-card shrink-0 flex items-center gap-2.5 px-3 py-2 rounded-xl border text-right transition-all duration-300 cursor-pointer ${index === 0
          ? 'active border-[#CFB78C] bg-[#324D3E]/50 ring-2 ring-[#CFB78C]/40'
          : 'border-white/10 bg-[#19241E]/60'
          }`;
        btn.setAttribute('aria-label', `شريحة ${slide.categoryShort}`);
        btn.setAttribute('data-index', index);

        btn.innerHTML = `
          <div class="relative w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-white/10">
            <img src="${slide.thumbImage}" alt="${slide.categoryShort}" class="w-full h-full object-cover">
          </div>
          <div class="flex flex-col">
            <span class="text-[10px] text-[#E3D1B1] font-cinzel">0${slide.id}</span>
            <span class="text-xs font-medium text-[#F6F2EB] whitespace-nowrap">${slide.categoryShort}</span>
          </div>
        `;

        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.goToSlide(index);
          this.restartAutoplay();
        });

        this.mobileThumbnailsContainer.appendChild(btn);
        return btn;
      });
    }
  }

  updateContent(index, triggerAnimation = true) {
    const slide = this.slides[index];
    if (!slide) return;

    // Update Counter
    if (this.currentNumEl) {
      this.currentNumEl.textContent = `0${slide.id}`;
    }
    if (this.totalNumEl) {
      this.totalNumEl.textContent = `0${this.slides.length}`;
    }

    // Text Container Entry Animation
    const contentContainer = document.getElementById('hero-text-content');
    if (triggerAnimation && contentContainer) {
      contentContainer.classList.remove('slide-text-enter');
      void contentContainer.offsetWidth; // Force reflow
      contentContainer.classList.add('slide-text-enter');
    }

    // Set textual values
    if (this.badgeEl) this.badgeEl.textContent = slide.badge || slide.category;
    if (this.titleEl) this.titleEl.textContent = slide.title;
    if (this.descriptionEl) this.descriptionEl.textContent = slide.description;

    if (this.primaryCta) {
      const primaryTextSpan = this.primaryCta.querySelector('span');
      if (primaryTextSpan) {
        primaryTextSpan.textContent = slide.primaryCta.text;
      } else {
        this.primaryCta.textContent = slide.primaryCta.text;
      }
      this.primaryCta.setAttribute('href', slide.primaryCta.href);
    }

    if (this.secondaryCta) {
      const secondaryTextSpan = this.secondaryCta.querySelector('span');
      if (secondaryTextSpan) {
        secondaryTextSpan.textContent = slide.secondaryCta.text;
      } else {
        this.secondaryCta.textContent = slide.secondaryCta.text;
      }
      this.secondaryCta.setAttribute('href', slide.secondaryCta.href);
    }

    // Update Background Image classes
    this.bgSlideElements.forEach((img, i) => {
      if (i === index) {
        img.classList.remove('inactive');
        img.classList.add('active');
      } else {
        img.classList.remove('active');
        img.classList.add('inactive');
      }
    });

    // Update Desktop Thumbnails classes
    this.desktopThumbElements.forEach((btn, i) => {
      const dot = btn.querySelector('.thumb-active-dot');
      if (i === index) {
        btn.classList.add('active', 'border-[#CFB78C]', 'bg-[#324D3E]/40', 'shadow-lg');
        btn.classList.remove('border-white/10', 'bg-[#19241E]/50');
        if (dot) dot.className = 'thumb-active-dot w-2 h-2 rounded-full bg-[#CFB78C] ring-4 ring-[#CFB78C]/30 transition-all';
      } else {
        btn.classList.remove('active', 'border-[#CFB78C]', 'bg-[#324D3E]/40', 'shadow-lg');
        btn.classList.add('border-white/10', 'bg-[#19241E]/50');
        if (dot) dot.className = 'thumb-active-dot w-2 h-2 rounded-full bg-transparent transition-all';
      }
    });

    // Update Mobile Thumbnails classes & scroll active thumbnail into view
    this.mobileThumbElements.forEach((btn, i) => {
      if (i === index) {
        btn.classList.add('active', 'border-[#CFB78C]', 'bg-[#324D3E]/50', 'ring-2', 'ring-[#CFB78C]/40');
        btn.classList.remove('border-white/10', 'bg-[#19241E]/60');
        // Scroll horizontally only inside the thumbnails container, NEVER the window/page
        if (this.mobileThumbnailsContainer) {
          const container = this.mobileThumbnailsContainer;
          const containerRect = container.getBoundingClientRect();
          if (containerRect.bottom > 0 && containerRect.top < window.innerHeight) {
            const btnRect = btn.getBoundingClientRect();
            const offset = (btnRect.left + btnRect.width / 2) - (containerRect.left + containerRect.width / 2);
            container.scrollBy({ left: offset, behavior: 'smooth' });
          }
        }
      } else {
        btn.classList.remove('active', 'border-[#CFB78C]', 'bg-[#324D3E]/50', 'ring-2', 'ring-[#CFB78C]/40');
        btn.classList.add('border-white/10', 'bg-[#19241E]/60');
      }
    });
  }

  goToSlide(index) {
    const total = this.slides.length;
    this.currentIndex = ((index % total) + total) % total;
    this.updateContent(this.currentIndex, true);
  }

  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentIndex - 1);
  }

  startAutoplay() {
    this.clearAutoplay();
    if (this.isManuallyPaused || this.prefersReducedMotion) return;

    this.isPaused = false;
    this.resetProgressBar();
    this.animateProgressBar(this.duration);

    this.timer = setTimeout(() => {
      this.nextSlide();
      this.startAutoplay();
    }, this.duration);
  }

  clearAutoplay() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  restartAutoplay() {
    this.clearAutoplay();
    if (!this.isManuallyPaused && !this.prefersReducedMotion) {
      this.startAutoplay();
    }
  }

  pauseAutoplay() {
    if (this.isPaused) return;
    this.isPaused = true;
    this.clearAutoplay();

    if (this.progressBar) {
      const computedStyle = window.getComputedStyle(this.progressBar);
      const currentWidth = computedStyle.getPropertyValue('width');
      this.progressBar.style.transition = 'none';
      this.progressBar.style.width = currentWidth;
    }
  }

  resumeAutoplay() {
    if (!this.isPaused || this.isManuallyPaused || this.prefersReducedMotion) return;
    this.isPaused = false;
    this.startAutoplay();
  }

  setPausedState(paused) {
    this.isManuallyPaused = paused;
    if (paused) {
      this.pauseAutoplay();
      this.pauseIcon?.classList.add('hidden');
      this.playIcon?.classList.remove('hidden');
      if (this.pauseBtn) this.pauseBtn.setAttribute('aria-label', 'تشغيل العرض التلقائي');
    } else {
      this.pauseIcon?.classList.remove('hidden');
      this.playIcon?.classList.add('hidden');
      if (this.pauseBtn) this.pauseBtn.setAttribute('aria-label', 'إيقاف العرض التلقائي مؤقتاً');
      this.resumeAutoplay();
    }
  }

  togglePlayPause() {
    this.setPausedState(!this.isManuallyPaused);
  }

  resetProgressBar() {
    if (!this.progressBar) return;
    this.progressBar.style.transition = 'none';
    this.progressBar.style.width = '0%';
  }

  animateProgressBar(durationMs) {
    if (!this.progressBar || this.prefersReducedMotion) return;
    requestAnimationFrame(() => {
      this.progressBar.style.transition = `width ${durationMs}ms linear`;
      this.progressBar.style.width = '100%';
    });
  }

  bindEvents() {
    // Next Button Click
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.nextSlide();
        this.restartAutoplay();
      });
    }

    // Prev Button Click
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.prevSlide();
        this.restartAutoplay();
      });
    }

    // Play/Pause Button Click
    if (this.pauseBtn) {
      this.pauseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.togglePlayPause();
      });
    }

    // Pause on Hover over Content or Thumbnails (Not blocking entire screen)
    const pauseTriggers = [this.desktopThumbnailsContainer, this.mobileThumbnailsContainer, document.getElementById('hero-text-content')];
    pauseTriggers.forEach(el => {
      if (el) {
        el.addEventListener('mouseenter', () => {
          if (!this.isManuallyPaused) this.pauseAutoplay();
        });
        el.addEventListener('mouseleave', () => {
          if (!this.isManuallyPaused) this.resumeAutoplay();
        });
      }
    });

    // Touch Gestures for mobile swipe on Hero
    if (this.heroSection) {
      this.heroSection.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      this.heroSection.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleTouchSwipe();
      }, { passive: true });
    }

    // Keyboard Arrow Keys (Left / Right navigation)
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'ArrowLeft') {
        // In RTL, left arrow moves to next slide
        this.nextSlide();
        this.restartAutoplay();
      } else if (e.key === 'ArrowRight') {
        // In RTL, right arrow moves to previous slide
        this.prevSlide();
        this.restartAutoplay();
      } else if (e.key === ' ') {
        if (this.heroSection && this.heroSection.contains(document.activeElement)) {
          e.preventDefault();
          this.togglePlayPause();
        }
      }
    });

    // Handle Reduced Motion changes
    if (typeof window !== 'undefined' && window.matchMedia) {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      motionQuery.addEventListener('change', (e) => {
        this.prefersReducedMotion = e.matches;
        if (e.matches) {
          this.setPausedState(true);
        }
      });
    }

    // Pause autoplay when hero section is not visible on screen to save resources and avoid layout thrashing
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window && this.heroSection) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.resumeAutoplay();
          } else {
            this.pauseAutoplay();
          }
        });
      }, { threshold: 0.05 });
      heroObserver.observe(this.heroSection);
    }
  }

  handleTouchSwipe() {
    const diff = this.touchEndX - this.touchStartX;
    const threshold = 45;
    if (Math.abs(diff) < threshold) return;

    if (diff < 0) {
      this.nextSlide();
    } else {
      this.prevSlide();
    }
    this.restartAutoplay();
  }
}

/**
 * Global Scroll Reveal System
 * Fades in any .reveal-on-scroll elements smoothly as they enter viewport across all pages
 */
function initGlobalScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
  });

  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < (window.innerHeight || document.documentElement.clientHeight)) {
      el.classList.add('is-revealed');
    } else {
      observer.observe(el);
    }
  });
}

/**
 * ==========================================================================
 * RIWAQ About Section Controller
 * Handles Scroll Reveal, Interactive Hotspots and Material Texture Toggle
 * ==========================================================================
 */
class LuxuryAboutController {
  constructor() {
    this.aboutSection = document.getElementById('about');
    this.hotspotBtns = document.querySelectorAll('.hotspot-btn');
    this.materialImg = document.getElementById('about-material-img');
    this.materialBadge = document.getElementById('about-material-badge');
    this.materialDesc = document.getElementById('about-material-desc');
    this.btnGrain = document.getElementById('mat-btn-grain');
    this.btnJoinery = document.getElementById('mat-btn-joinery');
    this.activeHotspotTip = null;

    this.materialsData = {
      grain: {
        img: '../img/Bedrooms/Warm Minimalist Bedroom with Built-In Storage.png',
        badge: 'ANTIBACTERIAL & MOISTURE-RESISTANT CHIPBOARD',
        alt: 'ملمس وتفاصيل خشب شيبورد معالج ضد البكتيريا والرطوبة في المشاريع السكنية والتجارية',
        desc: 'نعتمد حصرياً ألواح خشب شيبورد معالج ضد البكتيريا والرطوبة وفق أرقى المقاييس العالمية، لتوفير حماية صحية دائمة وعزل استثنائي ضد الرطوبة مع ملمس حريري وفخامة معمارية تدوم لعقود.'
      },
      joinery: {
        img: '../img/Wooden-decor/Gemini_Generated_Image_ydrtfpydrtfpydrt.jpg.jpeg',
        badge: 'SAUDI BESPOKE JOINERY',
        alt: 'تفاصيل التعشيقات والوصلات الخشبية المعمارية المنفذة في مصنعنا بالرياض',
        desc: 'تعشيقات خشبية مصنعة آلياً بأحدث ماكينات الـ CNC الإيطالية في مصنعنا بالرياض، بنظام تداخل هندسي مخفي بدون مسامير ظاهرة، تمنح الأثاث متانة فائقة تدوم لأجيال.'
      }
    };

    this.init();
  }

  init() {
    initGlobalScrollReveal();
    this.initHotspots();
    this.initMaterialToggle();
  }

  initScrollReveal() {
    initGlobalScrollReveal();
  }

  initHotspots() {
    if (!this.hotspotBtns.length) return;

    const closeAllHotspots = () => {
      document.querySelectorAll('.hotspot-tooltip').forEach(tip => {
        tip.classList.add('opacity-0', 'invisible', 'translate-y-2');
        tip.classList.remove('opacity-100', 'visible', 'translate-y-0');
      });
      this.hotspotBtns.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
      this.activeHotspotTip = null;
    };

    this.hotspotBtns.forEach(btn => {
      const targetId = btn.getAttribute('data-target');
      const tooltip = document.getElementById(targetId);
      if (!tooltip) return;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        closeAllHotspots();

        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          tooltip.classList.remove('opacity-0', 'invisible', 'translate-y-2');
          tooltip.classList.add('opacity-100', 'visible', 'translate-y-0');
          this.activeHotspotTip = tooltip;
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (this.activeHotspotTip && !this.activeHotspotTip.contains(e.target)) {
        closeAllHotspots();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeHotspotTip) {
        closeAllHotspots();
      }
    });
  }

  initMaterialToggle() {
    if (!this.btnGrain || !this.btnJoinery || !this.materialImg) return;

    const setMaterial = (type) => {
      const data = this.materialsData[type];
      if (!data) return;

      if (type === 'grain') {
        this.btnGrain.className = 'px-2.5 py-1 rounded-lg text-xs font-semibold bg-walnut text-ivory shadow transition-all cursor-pointer';
        this.btnJoinery.className = 'px-2.5 py-1 rounded-lg text-xs font-semibold text-ivory/60 hover:text-ivory transition-all cursor-pointer';
        this.btnGrain.setAttribute('aria-selected', 'true');
        this.btnJoinery.setAttribute('aria-selected', 'false');
      } else {
        this.btnJoinery.className = 'px-2.5 py-1 rounded-lg text-xs font-semibold bg-walnut text-ivory shadow transition-all cursor-pointer';
        this.btnGrain.className = 'px-2.5 py-1 rounded-lg text-xs font-semibold text-ivory/60 hover:text-ivory transition-all cursor-pointer';
        this.btnJoinery.setAttribute('aria-selected', 'true');
        this.btnGrain.setAttribute('aria-selected', 'false');
      }

      this.materialImg.style.opacity = '0.3';
      setTimeout(() => {
        this.materialImg.src = data.img;
        this.materialImg.alt = data.alt;
        if (this.materialBadge) this.materialBadge.textContent = data.badge;
        if (this.materialDesc) this.materialDesc.textContent = data.desc;
        this.materialImg.style.opacity = '1';
      }, 150);
    };

    this.btnGrain.addEventListener('click', (e) => {
      e.preventDefault();
      setMaterial('grain');
    });

    this.btnJoinery.addEventListener('click', (e) => {
      e.preventDefault();
      setMaterial('joinery');
    });
  }
}

/**
 * ==========================================================================
 * RIWAQ Services Controller (The Wood Atelier)
 * Handles Interactive Catalog, Visual Showcase Theater & "خط الحِرفة" Tracker
 * ==========================================================================
 */
class LuxuryServicesController {
  constructor(config) {
    this.config = config || window.LUXURY_CONFIG || (typeof LUXURY_CONFIG !== 'undefined' ? LUXURY_CONFIG : null);
    this.services = this.config?.services || [];
    this.currentIndex = 0;

    // DOM Elements
    this.section = document.getElementById('services');
    this.catalogContainer = document.getElementById('services-catalog-list');
    this.mobileTabsContainer = document.getElementById('mobile-services-tabs');
    this.imagesContainer = document.getElementById('services-images-container');
    this.trackerIndicator = document.getElementById('craft-tracker-indicator');
    this.ghostNum = document.getElementById('service-ghost-num');
    this.badge = document.getElementById('service-badge');
    this.dim = document.getElementById('service-dim');
    this.counter = document.getElementById('service-counter');
    this.categoryLabel = document.getElementById('service-category-label');
    this.title = document.getElementById('service-title');
    this.desc = document.getElementById('service-desc');
    this.spec = document.getElementById('service-spec');
    this.ctaBtn = document.getElementById('service-cta-btn');
    this.contentBox = document.getElementById('service-content-box');
    this.theater = document.getElementById('services-showcase-theater');

    this.catalogElements = [];
    this.mobileTabElements = [];
    this.imageElements = [];

    this.init();
  }

  init() {
    if (!this.services.length) return;
    this.renderImages();
    this.renderCatalog();
    this.renderMobileTabs();
    this.updateContent(0, false);
    this.bindEvents();
    this.preloadImages();
  }

  preloadImages() {
    this.services.forEach(s => {
      const img = new Image();
      img.src = s.image;
    });
  }

  renderImages() {
    if (!this.imagesContainer) return;
    this.imagesContainer.innerHTML = '';
    this.imageElements = this.services.map((service, index) => {
      const img = document.createElement('img');
      img.src = service.image;
      img.alt = service.name;
      img.className = `service-showcase-slide ${index === 0 ? 'active' : 'inactive'}`;
      img.setAttribute('data-service-index', index);
      img.onerror = () => { img.style.backgroundColor = '#19241E'; };
      this.imagesContainer.appendChild(img);
      return img;
    });
  }

  renderCatalog() {
    if (!this.catalogContainer) return;
    this.catalogContainer.innerHTML = '';
    this.catalogElements = this.services.map((service, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `service-catalog-item w-full p-3 rounded-2xl border text-right flex items-center justify-between group cursor-pointer ${index === 0
        ? 'active'
        : 'border-white/5 hover:border-white/20 hover:bg-white/5'
        }`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      btn.setAttribute('data-service-index', index);

      btn.innerHTML = `
        <div class="flex items-center gap-3.5 min-w-0">
          <span class="service-item-num font-cinzel text-sm text-gold/60 transition-all">${service.num}</span>
          <span class="service-item-name text-sm text-ivory/80 group-hover:text-ivory transition-colors truncate">${service.name}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="service-item-bullet w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-gold' : 'bg-transparent'} transition-all"></span>
          <svg class="w-3.5 h-3.5 text-gold/40 group-hover:text-gold transition-colors opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </div>
      `;

      btn.addEventListener('mouseenter', () => {
        this.selectService(index);
      });

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.selectService(index);
      });

      this.catalogContainer.appendChild(btn);
      return btn;
    });
  }

  renderMobileTabs() {
    if (!this.mobileTabsContainer) return;
    this.mobileTabsContainer.innerHTML = '';
    this.mobileTabElements = this.services.map((service, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `mobile-service-pill shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs whitespace-nowrap transition-all duration-200 cursor-pointer ${index === 0
        ? 'active bg-walnut text-ivory border-gold/60 ring-2 ring-gold/30 font-bold'
        : 'bg-white/5 text-ivory/70 border-white/10 hover:text-ivory'
        }`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      btn.setAttribute('data-service-index', index);

      btn.innerHTML = `
        <span class="font-cinzel text-gold text-[11px]">${service.num}</span>
        <span>${service.name}</span>
      `;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.selectService(index);
      });

      this.mobileTabsContainer.appendChild(btn);
      return btn;
    });
  }

  updateContent(index, triggerAnimation = true) {
    const service = this.services[index];
    if (!service) return;

    // Trigger re-entry animation
    if (triggerAnimation && this.contentBox) {
      this.contentBox.classList.remove('service-content-enter');
      void this.contentBox.offsetWidth;
      this.contentBox.classList.add('service-content-enter');
    }

    if (this.ghostNum) this.ghostNum.textContent = service.num;
    if (this.badge) this.badge.textContent = service.badge || service.name;
    if (this.dim) this.dim.textContent = service.dimensions || 'BESPOKE DESIGN';
    if (this.counter) this.counter.textContent = `${service.num} / 08`;
    if (this.categoryLabel) this.categoryLabel.textContent = service.name;
    if (this.title) this.title.textContent = service.title;
    if (this.desc) this.desc.textContent = service.description;
    if (this.spec) this.spec.textContent = service.spec;
    if (this.ctaBtn) {
      this.ctaBtn.setAttribute('href', service.href || '#consultation');
    }

    // Switch active image
    this.imageElements.forEach((img, i) => {
      if (i === index) {
        img.classList.remove('inactive');
        img.classList.add('active');
      } else {
        img.classList.remove('active');
        img.classList.add('inactive');
      }
    });

    // Update Desktop Catalog selection
    this.catalogElements.forEach((btn, i) => {
      if (i === index) {
        btn.classList.add('active');
        btn.classList.remove('border-white/5', 'hover:border-white/20', 'hover:bg-white/5');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.classList.add('border-white/5', 'hover:border-white/20', 'hover:bg-white/5');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // Update Mobile Tabs selection
    this.mobileTabElements.forEach((btn, i) => {
      if (i === index) {
        btn.className = 'mobile-service-pill shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs whitespace-nowrap transition-all duration-200 cursor-pointer active bg-walnut text-ivory border-gold/60 ring-2 ring-gold/30 font-bold';
        btn.setAttribute('aria-selected', 'true');
        if (this.mobileTabsContainer) {
          const container = this.mobileTabsContainer;
          const containerRect = container.getBoundingClientRect();
          if (containerRect.bottom > 0 && containerRect.top < window.innerHeight) {
            const btnRect = btn.getBoundingClientRect();
            const offset = (btnRect.left + btnRect.width / 2) - (containerRect.left + containerRect.width / 2);
            container.scrollBy({ left: offset, behavior: 'smooth' });
          }
        }
      } else {
        btn.className = 'mobile-service-pill shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs whitespace-nowrap transition-all duration-200 cursor-pointer bg-white/5 text-ivory/70 border-white/10 hover:text-ivory';
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // Update "خط الحِرفة" (Craft Tracker Line) indicator position
    if (this.trackerIndicator && this.catalogElements[index]) {
      const activeBtn = this.catalogElements[index];
      const offsetTop = activeBtn.offsetTop;
      const height = activeBtn.offsetHeight;
      this.trackerIndicator.style.transform = `translateY(${offsetTop + (height - 36) / 2}px)`;
    }
  }

  selectService(index) {
    if (index === this.currentIndex) return;
    this.currentIndex = index;
    this.updateContent(this.currentIndex, true);
  }

  bindEvents() {
    // Subtle Mouse Tilt Depth on Showcase Theater (Desktop)
    if (this.theater) {
      this.theater.addEventListener('mousemove', (e) => {
        const rect = this.theater.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const activeImg = this.imageElements[this.currentIndex];
        if (activeImg) {
          activeImg.style.transform = `scale(1.03) translate(${x * -8}px, ${y * -8}px)`;
        }
      });

      this.theater.addEventListener('mouseleave', () => {
        const activeImg = this.imageElements[this.currentIndex];
        if (activeImg) {
          activeImg.style.transform = 'scale(1.0)';
        }
      });
    }

    // Keyboard Arrow navigation inside catalog list
    this.catalogContainer?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = (this.currentIndex + 1) % this.services.length;
        this.selectService(next);
        this.catalogElements[next]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = (this.currentIndex - 1 + this.services.length) % this.services.length;
        this.selectService(prev);
        this.catalogElements[prev]?.focus();
      }
    });

    // Synchronize clicks on any page link matching service anchors
    const serviceIndexMap = {
      '#wardrobes': 0,
      '#bedrooms': 1,
      '#vanity': 2,
      '#partitions': 3,
      '#cladding': 4,
      '#kitchens': 5,
      '#storage': 6,
      '#custom-furniture': 7
    };
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      const hash = link.getAttribute('href');
      if (serviceIndexMap[hash] !== undefined) {
        link.addEventListener('click', () => {
          this.selectService(serviceIndexMap[hash]);
        });
      }
    });
  }
}

/**
 * ==========================================================================
 * RIWAQ Transformation Controller (Before & After Interactive Stage)
 * Supports Mouse Drag, Mobile Touch Drag, Keyboard Arrows & Indicator Toggles
 * ==========================================================================
 */
class LuxuryTransformationController {
  constructor(config) {
    this.config = config?.transformationProject || null;
    this.stage = document.getElementById('ba-stage');
    this.divider = document.getElementById('ba-divider');
    this.beforeLayer = document.getElementById('ba-before-layer');
    this.handle = document.getElementById('ba-handle');
    this.indicatorCards = document.querySelectorAll('.transformation-indicator-card');

    this.isDragging = false;
    this.position = 50; // percentage (0 - 100)

    if (this.stage && this.divider && this.beforeLayer) {
      this.init();
    }
  }

  init() {
    this.updateSliderPosition(50);
    this.bindSliderEvents();
    this.bindIndicatorEvents();
  }

  updateSliderPosition(pct) {
    // Clamp between 2% and 98% so divider remains visible and smooth
    const clamped = Math.max(2, Math.min(98, pct));
    this.position = clamped;

    if (this.divider) {
      this.divider.style.left = `${clamped}%`;
    }

    if (this.beforeLayer) {
      this.beforeLayer.style.clipPath = `polygon(0 0, ${clamped}% 0, ${clamped}% 100%, 0 100%)`;
    }

    if (this.handle) {
      this.handle.setAttribute('aria-valuenow', Math.round(clamped));
    }
  }

  getPercentageFromPointer(clientX) {
    if (!this.stage) return 50;
    const rect = this.stage.getBoundingClientRect();
    if (rect.width === 0) return 50;
    const offset = clientX - rect.left;
    return (offset / rect.width) * 100;
  }

  bindSliderEvents() {
    // Mouse Dragging
    const onMouseDown = (e) => {
      this.isDragging = true;
      document.body.classList.add('select-none');
      const pct = this.getPercentageFromPointer(e.clientX);
      this.updateSliderPosition(pct);
    };

    const onMouseMove = (e) => {
      if (!this.isDragging) return;
      const pct = this.getPercentageFromPointer(e.clientX);
      this.updateSliderPosition(pct);
    };

    const onMouseUp = () => {
      if (this.isDragging) {
        this.isDragging = false;
        document.body.classList.remove('select-none');
      }
    };

    this.stage.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch Dragging (passive touchstart ensures smooth scrolling outside horizontal drag)
    this.stage.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        const pct = this.getPercentageFromPointer(e.touches[0].clientX);
        this.updateSliderPosition(pct);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const pct = this.getPercentageFromPointer(e.touches[0].clientX);
      this.updateSliderPosition(pct);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    window.addEventListener('touchcancel', () => {
      this.isDragging = false;
    });

    // Keyboard Accessibility on the slider handle knob
    if (this.handle) {
      this.handle.addEventListener('keydown', (e) => {
        let step = 3;
        if (e.shiftKey) step = 10;

        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.updateSliderPosition(this.position - step);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.updateSliderPosition(this.position + step);
        } else if (e.key === 'Home') {
          e.preventDefault();
          this.updateSliderPosition(2);
        } else if (e.key === 'End') {
          e.preventDefault();
          this.updateSliderPosition(98);
        }
      });
    }
  }

  bindIndicatorEvents() {
    if (!this.indicatorCards || this.indicatorCards.length === 0) return;

    // Preset positions for visual story points:
    // 0: Space Efficiency (reveal more After layout) -> 30%
    // 1: Materials (balanced 50/50 reveal) -> 50%
    // 2: Integration (reveal more Before room state) -> 70%
    const targetPercentages = [30, 50, 70];

    this.indicatorCards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        this.indicatorCards.forEach(c => {
          c.classList.remove('border-gold', 'bg-gold/10', 'ring-1', 'ring-gold/30');
          c.classList.add('border-white/10');
        });

        card.classList.remove('border-white/10');
        card.classList.add('border-gold', 'bg-gold/10', 'ring-1', 'ring-gold/30');

        this.animateSliderTo(targetPercentages[idx] !== undefined ? targetPercentages[idx] : 50);
      });
    });
  }

  animateSliderTo(targetPct) {
    const startPct = this.position;
    const diff = targetPct - startPct;
    if (Math.abs(diff) < 0.5) return;

    const duration = 400; // ms
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic curve
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = startPct + (diff * ease);
      this.updateSliderPosition(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}

/**
 * ==========================================================================
 * RIWAQ Design DNA Controller ("بصمتنا في التفاصيل")
 * Handles Principles Toggle, Image Crossfade, Keyboard Navigation & Blueprint Indicators
 * ==========================================================================
 */
class LuxuryDesignDnaController {
  constructor(config) {
    this.section = document.getElementById('design-dna');
    if (!this.section) return;

    this.config = config?.designDnaData || null;
    this.buttons = Array.from(this.section.querySelectorAll('.dna-principle-btn'));
    this.panels = Array.from(this.section.querySelectorAll('.dna-content-panel'));
    this.images = Array.from(this.section.querySelectorAll('.dna-image-item'));
    this.captionTag = this.section.querySelector('#dna-caption-tag');
    this.coordinateTag = this.section.querySelector('#dna-coordinate-tag');
    this.visualElementTag = this.section.querySelector('#dna-visual-tag');

    this.currentIndex = 0;
    this.init();
  }

  init() {
    if (!this.buttons.length) return;

    // Attach click and keyboard listeners
    this.buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => this.setActivePrinciple(idx, false));
      btn.addEventListener('keydown', (e) => this.handleKeydown(e, idx));
    });

    // Initialize initial active state
    this.setActivePrinciple(0, false);
  }

  setActivePrinciple(index, focus = true) {
    if (index < 0 || index >= this.buttons.length) return;
    this.currentIndex = index;

    // Update buttons
    this.buttons.forEach((btn, idx) => {
      const isSelected = idx === index;
      btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      btn.setAttribute('tabindex', isSelected ? '0' : '-1');

      const numEl = btn.querySelector('.dna-btn-num');
      const titleEl = btn.querySelector('.dna-btn-title');
      const arrowEl = btn.querySelector('.dna-btn-arrow');
      const cursorLine = btn.querySelector('.dna-cursor-line');

      if (isSelected) {
        btn.classList.add('bg-white', 'border-[#324D3E]', 'shadow-md');
        btn.classList.remove('bg-transparent', 'border-transparent', 'bg-white/[0.04]', 'border-gold/30');
        if (numEl) {
          numEl.classList.add('text-[#324D3E]');
          numEl.classList.remove('text-[#324D3E]/40', 'text-ivory/30', 'text-gold');
        }
        if (titleEl) {
          titleEl.classList.add('text-[#324D3E]');
          titleEl.classList.remove('text-[#1E2B24]', 'text-ivory/70', 'text-gold-light');
        }
        if (arrowEl) {
          arrowEl.classList.add('opacity-100', 'translate-x-0', 'text-[#324D3E]');
          arrowEl.classList.remove('opacity-0', 'translate-x-2');
        }
        if (cursorLine) {
          cursorLine.classList.add('scale-y-100', 'opacity-100');
          cursorLine.classList.remove('scale-y-0', 'opacity-0');
        }
      } else {
        btn.classList.remove('bg-white', 'border-[#324D3E]', 'shadow-md', 'bg-white/[0.04]', 'border-gold/30');
        btn.classList.add('bg-transparent', 'border-transparent');
        if (numEl) {
          numEl.classList.remove('text-[#324D3E]', 'text-gold');
          numEl.classList.add('text-[#324D3E]/40');
        }
        if (titleEl) {
          titleEl.classList.remove('text-[#324D3E]', 'text-gold-light');
          titleEl.classList.add('text-[#1E2B24]');
        }
        if (arrowEl) {
          arrowEl.classList.remove('opacity-100', 'translate-x-0', 'text-[#324D3E]');
          arrowEl.classList.add('opacity-0', 'translate-x-2');
        }
        if (cursorLine) {
          cursorLine.classList.remove('scale-y-100', 'opacity-100');
          cursorLine.classList.add('scale-y-0', 'opacity-0');
        }
      }
    });

    // Update accordion / explanation panels
    this.panels.forEach((panel, idx) => {
      if (idx === index) {
        panel.classList.add('is-open');
        panel.setAttribute('aria-hidden', 'false');
      } else {
        panel.classList.remove('is-open');
        panel.setAttribute('aria-hidden', 'true');
      }
    });

    // Update images with smooth crossfade
    this.images.forEach((img, idx) => {
      if (idx === index) {
        img.classList.add('active');
        img.classList.remove('inactive');
      } else {
        img.classList.remove('active');
        img.classList.add('inactive');
      }
    });

    // Update image captions & metadata
    const principleData = this.config?.principles?.[index];
    if (principleData) {
      if (this.captionTag) this.captionTag.textContent = principleData.focusTag;
      if (this.coordinateTag) this.coordinateTag.textContent = principleData.coordinate;
      if (this.visualElementTag) this.visualElementTag.textContent = principleData.visualElement;
    }

    if (focus && this.buttons[index]) {
      this.buttons[index].focus();
    }
  }

  handleKeydown(e, idx) {
    let nextIdx = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIdx = (idx + 1) % this.buttons.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
      e.preventDefault();
      nextIdx = (idx - 1 + this.buttons.length) % this.buttons.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIdx = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIdx = this.buttons.length - 1;
    }

    if (nextIdx !== null) {
      this.setActivePrinciple(nextIdx, true);
    }
  }
}

/**
 * ==========================================================================
 * RIWAQ Contact Atelier Controller ("كل مشروع يبدأ بحوار")
 * Handles Chips Selection, Live Validation, Loading State & Submission Feedback
 * ==========================================================================
 */
class LuxuryContactFormController {
  constructor() {
    this.section = document.getElementById('contact');
    if (!this.section) return;

    this.form = this.section.querySelector('#contact-atelier-form');
    if (!this.form) return;

    this.chips = Array.from(this.section.querySelectorAll('.service-chip-btn'));
    this.serviceInput = this.section.querySelector('#contact-service-input');
    this.nameInput = this.section.querySelector('#contact-name');
    this.phoneInput = this.section.querySelector('#contact-phone');
    this.detailsInput = this.section.querySelector('#contact-details');
    this.submitBtn = this.section.querySelector('#contact-submit-btn');
    this.submitBtnText = this.section.querySelector('#contact-submit-text');
    this.submitSpinner = this.section.querySelector('#contact-submit-spinner');
    this.submitArrow = this.section.querySelector('#contact-submit-arrow');
    this.alertBox = this.section.querySelector('#contact-alert');
    this.successCard = this.section.querySelector('#contact-success-card');
    this.formFieldsWrapper = this.section.querySelector('#contact-fields-wrapper');
    this.resetBtn = this.section.querySelector('#contact-reset-btn');

    this.selectedService = this.serviceInput ? this.serviceInput.value : '';
    this.isSubmitting = false;

    this.init();
  }

  init() {
    // Chips Selection handling
    this.chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const val = chip.getAttribute('data-service') || chip.textContent.trim();
        this.selectService(val, chip);
      });

      chip.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          const val = chip.getAttribute('data-service') || chip.textContent.trim();
          this.selectService(val, chip);
        }
      });
    });

    // Form submission handling
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Clear alert when user types
    [this.nameInput, this.phoneInput, this.detailsInput].forEach(inp => {
      if (inp) {
        inp.addEventListener('input', () => this.hideAlert());
      }
    });

    // Reset button after success
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this.resetForm());
    }
  }

  selectService(serviceName, activeChip) {
    this.selectedService = serviceName;
    if (this.serviceInput) this.serviceInput.value = serviceName;

    this.chips.forEach(c => {
      c.classList.remove('is-selected');
      c.setAttribute('aria-checked', 'false');
    });

    if (activeChip) {
      activeChip.classList.add('is-selected');
      activeChip.setAttribute('aria-checked', 'true');
    }

    this.hideAlert();
  }

  showAlert(message, isError = true) {
    if (!this.alertBox) return;
    this.alertBox.textContent = message;
    this.alertBox.className = `p-3.5 rounded-xl text-xs font-semibold border ${isError
      ? 'bg-rose-950/40 text-rose-300 border-rose-500/30'
      : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
      } transition-all duration-300`;
    this.alertBox.classList.remove('hidden');
  }

  hideAlert() {
    if (this.alertBox) this.alertBox.classList.add('hidden');
  }

  validate() {
    const name = this.nameInput?.value.trim();
    if (!name || name.length < 2) {
      this.showAlert('يرجى كتابة الاسم الكريم قبل الإرسال.');
      this.nameInput?.focus();
      return false;
    }

    const phone = this.phoneInput?.value.trim();
    if (!phone || phone.length < 7) {
      this.showAlert('يرجى إدخال رقم جوال صحيح للتواصل معك.');
      this.phoneInput?.focus();
      return false;
    }

    const service = this.selectedService || this.serviceInput?.value.trim();
    if (!service) {
      this.showAlert('يرجى تحديد نوع الخدمة أو الأثاث المطلوب.');
      return false;
    }
    this.selectedService = service;

    return true;
  }

  handleSubmit() {
    if (this.isSubmitting) return;
    if (!this.validate()) return;

    this.isSubmitting = true;
    this.hideAlert();

    // Visual Loading State
    if (this.submitBtn) this.submitBtn.disabled = true;
    if (this.submitBtnText) this.submitBtnText.textContent = 'جارٍ إرسال طلبك...';
    if (this.submitSpinner) this.submitSpinner.classList.remove('hidden');
    if (this.submitArrow) this.submitArrow.classList.add('hidden');

    // Simulate reliable atelier commission dispatch
    setTimeout(() => {
      this.isSubmitting = false;
      if (this.submitBtn) this.submitBtn.disabled = false;
      if (this.submitBtnText) this.submitBtnText.textContent = 'إرسال طلب التواصل';
      if (this.submitSpinner) this.submitSpinner.classList.add('hidden');
      if (this.submitArrow) this.submitArrow.classList.remove('hidden');

      // Show Success State
      if (this.formFieldsWrapper && this.successCard) {
        this.formFieldsWrapper.classList.add('hidden');
        this.successCard.classList.remove('hidden');

        // Optional WhatsApp prefill update
        const whatsappBtn = this.successCard.querySelector('#contact-success-wa-btn');
        if (whatsappBtn) {
          const name = encodeURIComponent(this.nameInput?.value.trim() || '');
          const service = encodeURIComponent(this.selectedService || '');
          const details = encodeURIComponent(this.detailsInput?.value.trim() || '');
          const msg = `مرحباً شركة ابتكار وتصميم، أنا ${name}. أود مناقشة مشروع (${service}). التفاصيل: ${details}`;
          whatsappBtn.href = `https://wa.me/966533828115?text=${encodeURIComponent(msg)}`;
        }
      }
    }, 600);
  }

  resetForm() {
    if (this.form) this.form.reset();
    this.selectedService = '';
    if (this.serviceInput) this.serviceInput.value = '';
    this.chips.forEach(c => {
      c.classList.remove('is-selected');
      c.setAttribute('aria-checked', 'false');
    });
    if (this.formFieldsWrapper && this.successCard) {
      this.successCard.classList.add('hidden');
      this.formFieldsWrapper.classList.remove('hidden');
    }
    this.hideAlert();
  }
}

if (typeof window !== 'undefined') {
  window.LuxuryContactFormController = LuxuryContactFormController;
}

/**
 * ==========================================================================
 * RIWAQ Wood Atelier Portfolio & Unified Lightbox Controller
 * Handles Category Navigation, Smooth Chapter Focus, Keyboard & Touch Lightbox
 * ==========================================================================
 */
class LuxuryGalleryController {
  constructor() {
    this.container = document.getElementById('our-work-gallery');
    this.lightbox = document.getElementById('portfolio-lightbox');
    this.filterBtns = Array.from(document.querySelectorAll('.portfolio-filter-btn'));
    this.items = Array.from(document.querySelectorAll('.gallery-item'));
    this.chapters = Array.from(document.querySelectorAll('.gallery-chapter'));

    this.currentIndex = 0;
    this.activeItems = [...this.items];
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    this.bindFilters();
    this.bindFilterArrows();
    this.bindGalleryItems();
    this.bindPerspectives();
    this.bindHotspots();
    this.bindLightbox();
  }

  bindFilterArrows() {
    const track = document.getElementById('filter-scroll-container');
    const rightBtn = document.getElementById('filter-scroll-right');
    const leftBtn = document.getElementById('filter-scroll-left');

    if (!track || !rightBtn || !leftBtn) return;

    // Smooth scroll step (~1.5 button widths)
    const step = 220;

    rightBtn.addEventListener('click', () => {
      track.scrollBy({ left: step, behavior: 'smooth' });
    });

    leftBtn.addEventListener('click', () => {
      track.scrollBy({ left: -step, behavior: 'smooth' });
    });

    // Auto-center clicked button within the track
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const trackRect = track.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        const offset = (btnRect.left + btnRect.width / 2) - (trackRect.left + trackRect.width / 2);
        track.scrollBy({ left: offset, behavior: 'smooth' });
      });
    });

    // Subtle state update for arrows
    const updateArrows = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 4) {
        rightBtn.classList.add('opacity-35', 'pointer-events-none');
        leftBtn.classList.add('opacity-35', 'pointer-events-none');
        return;
      }
      rightBtn.classList.remove('pointer-events-none');
      leftBtn.classList.remove('pointer-events-none');

      const current = Math.abs(track.scrollLeft);
      if (current <= 8) {
        rightBtn.classList.add('opacity-35');
      } else {
        rightBtn.classList.remove('opacity-35');
      }

      if (current >= maxScroll - 8) {
        leftBtn.classList.add('opacity-35');
      } else {
        leftBtn.classList.remove('opacity-35');
      }
    };

    track.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows, { passive: true });
    setTimeout(updateArrows, 200);
  }

  bindFilters() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-filter') || 'all';
        const targetId = btn.getAttribute('data-target');

        this.filterBtns.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');

        if (category === 'all') {
          this.chapters.forEach(ch => ch.classList.remove('hidden'));
          this.activeItems = [...this.items];
          if (targetId) {
            const targetEl = document.querySelector(targetId);
            if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          if (targetId) {
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }
      });
    });
  }

  bindGalleryItems() {
    this.items.forEach((item, idx) => {
      item.addEventListener('click', (e) => {
        // Prevent triggering lightbox if clicked inside a hotspot pin
        if (e.target.closest('.hotspot-pin')) return;
        this.activeItems = Array.from(document.querySelectorAll('.gallery-item'));
        const activeIdx = this.activeItems.indexOf(item);
        this.openLightbox(activeIdx >= 0 ? activeIdx : idx);
      });

      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.target.closest('.hotspot-pin')) return;
          e.preventDefault();
          item.click();
        }
      });
    });
  }

  bindPerspectives() {
    const perspectiveBtns = Array.from(document.querySelectorAll('.perspective-tab-btn'));
    perspectiveBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const parentChapter = btn.closest('.gallery-chapter');
        if (!parentChapter) return;

        // Toggle active button inside chapter
        const siblings = Array.from(parentChapter.querySelectorAll('.perspective-tab-btn'));
        siblings.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const imgSrc = btn.getAttribute('data-perspective-src');
        const title = btn.getAttribute('data-perspective-title');
        const coord = btn.getAttribute('data-perspective-coord');
        const desc = btn.getAttribute('data-perspective-desc');

        const showcaseItem = parentChapter.querySelector('.perspective-showcase-item');
        if (!showcaseItem) return;

        const mainImg = showcaseItem.querySelector('img');
        const titleEl = parentChapter.querySelector('.perspective-showcase-title');
        const coordEl = parentChapter.querySelector('.perspective-showcase-coord');
        const descEl = parentChapter.querySelector('.perspective-showcase-desc');

        if (mainImg && imgSrc) {
          mainImg.style.opacity = '0.3';
          mainImg.style.transform = 'scale(0.98)';
          setTimeout(() => {
            mainImg.src = imgSrc;
            if (title) mainImg.alt = title;
            showcaseItem.setAttribute('data-img-src', imgSrc);
            if (title) showcaseItem.setAttribute('data-title', title);
            mainImg.style.opacity = '1';
            mainImg.style.transform = 'scale(1)';
          }, 180);
        }

        if (titleEl && title) titleEl.textContent = title;
        if (coordEl && coord) coordEl.textContent = coord;
        if (descEl && desc) descEl.textContent = desc;
      });
    });
  }

  bindHotspots() {
    const hotspotPins = Array.from(document.querySelectorAll('.hotspot-pin'));
    hotspotPins.forEach(pin => {
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = pin.classList.contains('is-active');
        hotspotPins.forEach(p => p.classList.remove('is-active'));
        if (!isActive) pin.classList.add('is-active');
      });
    });

    document.addEventListener('click', () => {
      hotspotPins.forEach(p => p.classList.remove('is-active'));
    });
  }

  bindLightbox() {
    if (!this.lightbox) return;

    this.lightboxImg = this.lightbox.querySelector('#lightbox-img');
    this.lightboxTitle = this.lightbox.querySelector('#lightbox-title');
    this.lightboxCategory = this.lightbox.querySelector('#lightbox-category');
    this.lightboxCounter = this.lightbox.querySelector('#lightbox-counter');
    this.closeBtn = this.lightbox.querySelector('#lightbox-close-btn');
    this.prevBtn = this.lightbox.querySelector('#lightbox-prev-btn');
    this.nextBtn = this.lightbox.querySelector('#lightbox-next-btn');
    this.backdrop = this.lightbox.querySelector('#lightbox-backdrop');
    this.zoomBtn = this.lightbox.querySelector('#lightbox-zoom-btn');
    this.filmstrip = this.lightbox.querySelector('#lightbox-filmstrip');
    this.waBtn = this.lightbox.querySelector('#lightbox-wa-btn');

    this.isZoomed = false;

    if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.closeLightbox());
    if (this.backdrop) this.backdrop.addEventListener('click', () => this.closeLightbox());
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

    if (this.zoomBtn && this.lightboxImg) {
      this.zoomBtn.addEventListener('click', () => {
        this.isZoomed = !this.isZoomed;
        this.lightboxImg.classList.toggle('zoomed', this.isZoomed);
        const icon = this.zoomBtn.querySelector('span');
        if (icon) icon.textContent = this.isZoomed ? '1x تصغير' : '2x تكبير عالي الدقة';
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') {
        this.closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        this.next();
      } else if (e.key === 'ArrowRight') {
        this.prev();
      }
    });

    this.lightbox.addEventListener('touchstart', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        this.touchStartX = e.changedTouches[0].screenX;
      }
    }, { passive: true });

    this.lightbox.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      }
    }, { passive: true });
  }

  handleSwipe() {
    const delta = this.touchEndX - this.touchStartX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) {
        this.prev();
      } else {
        this.next();
      }
    }
  }

  openLightbox(index) {
    if (!this.lightbox || !this.activeItems.length) return;
    this.currentIndex = (index + this.activeItems.length) % this.activeItems.length;
    this.isZoomed = false;
    if (this.lightboxImg) this.lightboxImg.classList.remove('zoomed');

    this.buildFilmstrip();
    this.renderCurrent();

    this.lightbox.classList.remove('invisible', 'opacity-0');
    this.lightbox.classList.add('active');
    document.body.classList.add('overflow-hidden');
  }

  closeLightbox() {
    if (!this.lightbox) return;
    this.lightbox.classList.remove('active');
    this.lightbox.classList.add('opacity-0', 'invisible');
    document.body.classList.remove('overflow-hidden');
    if (this.lightboxImg) this.lightboxImg.classList.remove('zoomed');
  }

  prev() {
    if (!this.activeItems.length) return;
    this.currentIndex = (this.currentIndex - 1 + this.activeItems.length) % this.activeItems.length;
    this.renderCurrent();
  }

  next() {
    if (!this.activeItems.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.activeItems.length;
    this.renderCurrent();
  }

  buildFilmstrip() {
    if (!this.filmstrip) return;
    this.filmstrip.innerHTML = '';

    this.activeItems.forEach((item, idx) => {
      const src = item.getAttribute('data-img-src') || item.querySelector('img')?.src || '';
      const thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = `lightbox-thumb shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-white/20 bg-charcoal ${idx === this.currentIndex ? 'is-active' : 'opacity-60 hover:opacity-100'}`;
      thumb.innerHTML = `<img src="${src}" alt="" class="w-full h-full object-cover">`;
      thumb.addEventListener('click', () => {
        this.currentIndex = idx;
        this.renderCurrent();
      });
      this.filmstrip.appendChild(thumb);
    });
  }

  renderCurrent() {
    const currentItem = this.activeItems[this.currentIndex];
    if (!currentItem) return;

    const src = currentItem.getAttribute('data-img-src') || currentItem.querySelector('img')?.src || '';
    const title = currentItem.getAttribute('data-title') || currentItem.querySelector('img')?.alt || 'مشروع خشبي فاخر';
    const cat = currentItem.getAttribute('data-category') || 'شركة ابتكار وتصميم للأعمال الخشبية';

    if (this.lightboxImg) {
      this.lightboxImg.src = src;
      this.lightboxImg.alt = title;
    }

    if (this.lightboxTitle) {
      this.lightboxTitle.textContent = title;
    }

    if (this.lightboxCategory) {
      this.lightboxCategory.textContent = cat;
    }

    if (this.lightboxCounter) {
      const padCurrent = String(this.currentIndex + 1).padStart(2, '0');
      const padTotal = String(this.activeItems.length).padStart(2, '0');
      this.lightboxCounter.textContent = `${padCurrent} / ${padTotal}`;
    }

    if (this.waBtn) {
      const msg = `مرحباً شركة ابتكار وتصميم، أود الاستفسار عن تصميم (${title}) من فئة (${cat}).`;
      this.waBtn.href = `https://wa.me/966533828115?text=${encodeURIComponent(msg)}`;
    }

    if (this.filmstrip) {
      const thumbs = Array.from(this.filmstrip.querySelectorAll('.lightbox-thumb'));
      thumbs.forEach((t, i) => {
        if (i === this.currentIndex) {
          t.classList.add('is-active');
          t.classList.remove('opacity-60');
          const filmstripRect = this.filmstrip.getBoundingClientRect();
          const tRect = t.getBoundingClientRect();
          const offset = (tRect.left + tRect.width / 2) - (filmstripRect.left + filmstripRect.width / 2);
          this.filmstrip.scrollBy({ left: offset, behavior: 'smooth' });
        } else {
          t.classList.remove('is-active');
          t.classList.add('opacity-60');
        }
      });
    }
  }
}

if (typeof window !== 'undefined') {
  window.LuxuryGalleryController = LuxuryGalleryController;
}



/**
 * ==========================================================================
 * RIWAQ Luxury Footer Controller ("The Final Signature")
 * Handles Dynamic Year, Smooth Anchor Navigation, and Soft Parallax
 * ==========================================================================
 */
class LuxuryFooterController {
  constructor(config) {
    this.config = config?.footerData || null;
    this.yearEl = document.getElementById('footer-year');
    this.footerEl = document.getElementById('site-footer');
    this.bgImage = this.footerEl?.querySelector('.footer-bg-parallax');

    this.init();
  }

  init() {
    // Dynamic Copyright Year
    if (this.yearEl) {
      this.yearEl.textContent = new Date().getFullYear();
    }

    // Gentle Parallax effect on desktop when visible
    if (this.bgImage && typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced && window.innerWidth >= 1024) {
        window.addEventListener('scroll', () => {
          if (!this.footerEl) return;
          const rect = this.footerEl.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            const translateY = (progress - 0.5) * 20; // max +/- 10px subtle float
            this.bgImage.style.transform = `scale(1.05) translateY(${translateY}px)`;
          }
        }, { passive: true });
      }
    }
  }
}

// Robust App Initializer (Handles both immediate and deferred DOM ready states)
function initializeRiwaq() {
  try {
    const config = window.LUXURY_CONFIG || (typeof LUXURY_CONFIG !== 'undefined' ? LUXURY_CONFIG : null);

    // Global Scroll Reveal System (Works on all pages)
    initGlobalScrollReveal();

    // Navbar Controller (Global across all pages)
    if (!window.navbarController && document.getElementById('main-navbar')) {
      window.navbarController = new LuxuryNavbarController();
    }

    // Hero Slider (Home page only)
    if (!window.heroSlider && document.getElementById('hero-section') && config) {
      window.heroSlider = new LuxuryHeroSlider(config);
      console.log('[RIWAQ] Slider successfully initialized with', config.slides.length, 'slides.');
    }

    // About Interactive Section (When present on page)
    if (!window.aboutController && document.getElementById('about')) {
      window.aboutController = new LuxuryAboutController();
      console.log('[RIWAQ] About Section controller initialized.');
    }

    // The Design DNA Controller ("بصمتنا في التفاصيل" - About page or standalone)
    if (!window.designDnaController && document.getElementById('design-dna')) {
      window.designDnaController = new LuxuryDesignDnaController(config);
      console.log('[RIWAQ] The Design DNA controller initialized.');
    }

    // Contact Atelier Controller ("كل مشروع يبدأ بحوار" - 100% Image-Free)
    if (!window.contactController && document.getElementById('contact')) {
      window.contactController = new LuxuryContactFormController();
      console.log('[RIWAQ] Contact Atelier controller initialized.');
    }

    // Wood Atelier Portfolio & Lightbox Controller (Portfolio page)
    if (!window.galleryController && (document.getElementById('our-work-gallery') || document.getElementById('portfolio-lightbox'))) {
      window.galleryController = new LuxuryGalleryController();
      console.log('[RIWAQ] Wood Atelier Gallery & Lightbox controller initialized.');
    }


    // Services Catalog Controller (Home page only)
    if (!window.servicesController && document.getElementById('services') && config) {
      window.servicesController = new LuxuryServicesController(config);
      console.log('[RIWAQ] The Wood Atelier Services controller initialized with', config.services?.length, 'services.');
    }

    // Transformation Before & After Slider (When present on page)
    if (!window.transformationController && document.getElementById('ba-stage') && config) {
      window.transformationController = new LuxuryTransformationController(config);
      console.log('[RIWAQ] Transformation Before & After controller initialized.');
    }

    // Footer Controller (Global across all pages)
    if (!window.footerController && document.getElementById('site-footer')) {
      window.footerController = new LuxuryFooterController(config);
      console.log('[RIWAQ] Luxury Footer controller initialized.');
    }

    // The Branch Atlas Controller ("وجهاتنا أقرب إليك" - Global across all pages)
    if (!window.branchAtlasController && document.getElementById('branch-atlas')) {
      window.branchAtlasController = new LuxuryBranchAtlasController();
      console.log('[RIWAQ] The Branch Atlas controller initialized.');
    }

    // Previous Works Filter Controller ("سابقة أعمالنا والمشاريع الكبرى")
    if (!window.previousWorksController && document.getElementById('previous-works')) {
      window.previousWorksController = new LuxuryPreviousWorksController();
      console.log('[RIWAQ] Previous Works controller initialized.');
    }

    // Floating Quick Contact Directory Controller ("دليل أرقام التواصل والواتساب")
    if (!window.floatingContactController && document.getElementById('floating-contact-widget')) {
      window.floatingContactController = new LuxuryFloatingContactController();
      console.log('[RIWAQ] Floating Contact Directory controller initialized.');
    }
  } catch (err) {
    console.error('[RIWAQ] Init Error:', err);
  }
}

/**
 * ==========================================================================
 * RIWAQ THE BRANCH ATLAS CONTROLLER
 * Interactive Architectural Destination Discovery System
 * ==========================================================================
 */
class LuxuryBranchAtlasController {
  constructor() {
    this.section = document.getElementById('branch-atlas');
    if (!this.section) return;

    // Branches dataset with verified phone numbers & addresses
    this.branches = [

       {
        id: 'design',
        index: '01',
        name: 'شركة ابتكار وتصميم',
        region: 'الرياض',
        address: 'حي الورود، طريق الملك عبدالعزيز',
        type: 'مركز الابتكار والتخصيص الهندسي',
        badge: 'INNOVATION & BESPOKE DESIGN • شركة ابتكار وتصميم',
        desc: 'مركز شركة ابتكار وتصميم بالرياض، حي الورود طريق الملك عبدالعزيز، لبلورة الأفكار وتخصيص الخزائن والمطابخ والغرف الفندقية قبل التصنيع.',
        phones: [
          { number: '0533879478', label: 'رقم 01' },
          { number: '0552207629', label: 'رقم 02' }
        ],
        mapsUrl: 'https://maps.app.goo.gl/nsAs7cUGsdVP2UAD7',
        status: 'موقع جغرافي مؤكد ومباشر عبر خرائط Google',
        coordNote: 'RIYADH • AL WURUD • KING ABDULAZIZ RD'
      },
        {
        id: 'ahsa',
        index: '02',
        name: 'ارت لومكسا الاحساء',
        region: 'الأحساء',
        address: 'حي الفتح، المبرز',
        type: 'صالة عرض وتصميم مخصص',
        badge: 'EASTERN PROVINCE DESTINATION • فرع الأحساء',
        desc: 'فرع ارتلومكسا بالأحساء، حي الفتح - المبرز، لخدمة المنطقة الشرقية، لتصميم وتنفيذ الحلول الخشبية والأثاث المخصص بأعلى معايير الإتقان.',
        phones: [
          { number: '0539397326', label: 'الرقم المباشر' }
        ],
        mapsUrl: 'https://maps.app.goo.gl/c6m5434struVcoUj9',
        status: 'موقع جغرافي مؤكد ومباشر عبر خرائط Google',
        coordNote: 'AL AHSA • AL FATH • AL MUBARRAZ'
      },
      {
        id: 'main',
        index: '03',
        name: 'ارتلومكسا – الرياض',
        region: 'الرياض',
        address: 'حي الورود، طريق الملك عبدالعزيز',
        type: 'المقر الرئيسي والأتيليه المعماري',
        badge: 'HQ & FLAGSHIP ATELIER • ارتلومكسا الرياض',
        desc: 'فرع ارتلومكسا بالرياض، حي الورود طريق الملك عبدالعزيز، لاستقبالكم واستعراض التصاميم المعمارية وخيارات الأثاث والتكسيات الخشبية الفاخرة.',
        phones: [
          { number: '0534001939', label: 'الرقم المباشر' }
        ],
        mapsUrl: 'https://maps.app.goo.gl/TfGWHyj4Ks8vEzBg7',
        status: 'موقع جغرافي مؤكد ومباشر عبر خرائط Google',
        coordNote: 'RIYADH • AL WURUD • KING ABDULAZIZ RD'
      },
    
     
    ];

    this.currentIndex = 0;
    this.buttons = this.section.querySelectorAll('.branch-selector-btn');
    this.stageName = this.section.querySelector('#atlas-stage-name');
    this.stageBadge = this.section.querySelector('#atlas-stage-badge');
    this.stageNum = this.section.querySelector('#atlas-stage-num');
    this.stageDesc = this.section.querySelector('#atlas-stage-desc');
    this.stageRegion = this.section.querySelector('#atlas-stage-region');
    this.stageType = this.section.querySelector('#atlas-stage-type');
    this.stageStatus = this.section.querySelector('#atlas-stage-status');
    this.stageMapsLink = this.section.querySelector('#atlas-stage-maps-link');
    this.stageCoord = this.section.querySelector('#atlas-stage-coord');
    this.stagePhonesContainer = this.section.querySelector('#atlas-stage-phones');
    this.contentWrapper = this.section.querySelector('#atlas-content-wrapper');

    this.init();
  }

  init() {
    this.bindEvents();
    this.renderButtons();
    this.renderActiveBranch(0, false);
  }

  bindEvents() {
    this.buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        if (this.currentIndex === idx) return;
        this.selectBranch(idx);
      });

      // Accessible Keyboard Navigation
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const nextIdx = (idx + 1) % this.buttons.length;
          this.buttons[nextIdx].focus();
          this.selectBranch(nextIdx);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
          e.preventDefault();
          const prevIdx = (idx - 1 + this.buttons.length) % this.buttons.length;
          this.buttons[prevIdx].focus();
          this.selectBranch(prevIdx);
        }
      });
    });
  }

  selectBranch(idx) {
    this.currentIndex = idx;
    this.renderButtons();
    this.renderActiveBranch(idx, true);
  }

  renderButtons() {
    this.buttons.forEach((btn, idx) => {
      const isActive = idx === this.currentIndex;
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');

      const num = btn.querySelector('.branch-num');
      const name = btn.querySelector('.branch-name');
      const indicator = btn.querySelector('.branch-indicator');
      const border = btn.querySelector('.branch-active-border');

      if (isActive) {
        btn.classList.add('bg-white', 'border-[#324D3E]', 'shadow-xl', 'ring-2', 'ring-[#324D3E]/20');
        btn.classList.remove('bg-white/60', 'bg-transparent', 'border-[#324D3E]/10', 'border-white/10');
        if (num) { num.classList.add('text-[#324D3E]'); num.classList.remove('text-[#324D3E]/40', 'text-ivory/40'); }
        if (name) { name.classList.add('text-[#324D3E]'); name.classList.remove('text-[#1E2B24]', 'text-ivory/80'); }
        if (indicator) {
          indicator.classList.add('bg-[#324D3E]/10', 'border-[#324D3E]/30', 'text-[#324D3E]');
          indicator.classList.remove('bg-white', 'border-[#324D3E]/10', 'text-[#324D3E]/40', 'bg-white/5', 'text-ivory/40');
        }
        if (border) { border.classList.remove('opacity-0'); border.classList.add('opacity-100'); }
      } else {
        btn.classList.remove('bg-white', 'border-[#324D3E]', 'shadow-xl', 'ring-2', 'ring-[#324D3E]/20');
        btn.classList.add('bg-white/60', 'border-[#324D3E]/10');
        if (num) { num.classList.remove('text-[#324D3E]'); num.classList.add('text-[#324D3E]/40'); }
        if (name) { name.classList.remove('text-[#324D3E]'); name.classList.add('text-[#1E2B24]'); }
        if (indicator) {
          indicator.classList.remove('bg-[#324D3E]/10', 'border-[#324D3E]/30', 'text-[#324D3E]');
          indicator.classList.add('bg-white', 'border-[#324D3E]/10', 'text-[#324D3E]/40');
        }
        if (border) { border.classList.remove('opacity-100'); border.classList.add('opacity-0'); }
      }
    });
  }

  renderActiveBranch(idx, animate = true) {
    const branch = this.branches[idx];
    if (!branch) return;

    const updateContent = () => {
      if (this.stageBadge) this.stageBadge.textContent = branch.badge;
      if (this.stageNum) this.stageNum.textContent = `DESTINATION ${branch.index} / 03`;
      if (this.stageName) this.stageName.textContent = branch.name;
      if (this.stageDesc) this.stageDesc.textContent = branch.desc;
      if (this.stageRegion) this.stageRegion.textContent = branch.region;
      if (this.stageType) this.stageType.textContent = branch.type;
      if (this.stageStatus) this.stageStatus.textContent = branch.status;
      if (this.stageMapsLink) this.stageMapsLink.setAttribute('href', branch.mapsUrl);
      if (this.stageCoord) this.stageCoord.textContent = branch.coordNote;

      if (this.stagePhonesContainer) {
        this.stagePhonesContainer.innerHTML = branch.phones.map(p => {
          const cleanNum = p.number.replace(/\D/g, '');
          const intlNum = cleanNum.startsWith('0') ? '966' + cleanNum.substring(1) : cleanNum;
          return `
            <div class="inline-flex items-center gap-2">
              <a href="tel:+${intlNum}" class="px-3.5 py-2 rounded-xl bg-[#F5F2EB] hover:bg-[#EFE9DF] text-[#324D3E] border border-[#324D3E]/20 hover:border-[#324D3E] flex items-center gap-2 text-xs font-mono font-bold transition-all shadow-sm group" title="اتصال بـ ${branch.name}">
                <svg class="w-3.5 h-3.5 text-[#324D3E] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span>${p.number}</span>
              </a>
              <a href="https://wa.me/${intlNum}" target="_blank" rel="noopener noreferrer" class="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 hover:border-emerald-400 flex items-center gap-1.5 text-xs font-semibold transition-all shadow-sm" aria-label="واتساب ${p.number}">
                <svg class="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.179.182-.077.357.101.174.449.741.964 1.2.662.589 1.22.772 1.393.858.173.087.275.072.376-.043.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.044.073.044.419-.1.824z"/></svg>
                <span class="hidden sm:inline">واتساب</span>
              </a>
            </div>
          `;
        }).join('');
      }
    };

    if (animate && this.contentWrapper) {
      this.contentWrapper.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => {
        updateContent();
        this.contentWrapper.classList.remove('opacity-0', 'translate-y-2');
      }, 150);
    } else {
      updateContent();
    }
  }
}

/**
 * ==========================================================================
 * PREVIOUS WORKS & MAJOR CLIENTS CONTROLLER
 * Interactive Filtering for 13 National Corporate & Ministerial Landmarks
 * ==========================================================================
 */
class LuxuryPreviousWorksController {
  constructor() {
    this.section = document.getElementById('previous-works');
    if (!this.section) return;
    this.filterButtons = this.section.querySelectorAll('.works-filter-btn');
    this.cards = this.section.querySelectorAll('.works-card');
    this.scrollContainer = this.section.querySelector('#works-scroll-container');
    this.btnPrev = this.section.querySelector('#works-scroll-prev');
    this.btnNext = this.section.querySelector('#works-scroll-next');
    this.init();
  }

  init() {
    // Scroll navigation arrows and drag-to-scroll
    if (this.scrollContainer) {
      const container = this.scrollContainer;

      // Resilient RTL scroll step
      const scrollStep = (direction) => {
        // In RTL, left is usually negative in Chromium/Firefox, but test dynamically
        const amount = direction * 330;
        const prevScroll = container.scrollLeft;
        container.scrollBy({ left: amount, behavior: 'smooth' });

        // Fallback for inverted RTL implementations
        setTimeout(() => {
          if (container.scrollLeft === prevScroll) {
            container.scrollBy({ left: -amount, behavior: 'smooth' });
          }
        }, 60);
      };

      if (this.btnPrev) {
        // Prev button (points right -> moves back to start)
        this.btnPrev.addEventListener('click', (e) => {
          e.preventDefault();
          scrollStep(1);
        });
      }

      if (this.btnNext) {
        // Next button (points left -> moves forward to next items)
        this.btnNext.addEventListener('click', (e) => {
          e.preventDefault();
          scrollStep(-1);
        });
      }

      // Mouse Drag-to-Scroll for desktop
      let isDown = false;
      let startX = 0;
      let startScroll = 0;

      container.classList.add('cursor-grab');

      container.addEventListener('mousedown', (e) => {
        // Ignore clicks on buttons or links inside
        if (e.target.closest('button, a')) return;
        isDown = true;
        container.classList.add('cursor-grabbing');
        container.classList.remove('cursor-grab');
        startX = e.pageX - container.offsetLeft;
        startScroll = container.scrollLeft;
      });

      const stopDrag = () => {
        if (!isDown) return;
        isDown = false;
        container.classList.remove('cursor-grabbing');
        container.classList.add('cursor-grab');
      };

      window.addEventListener('mouseup', stopDrag);
      container.addEventListener('mouseleave', stopDrag);

      container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.4;
        container.scrollLeft = startScroll - walk;
      });

      // Horizontal Mouse Wheel Scroll
      container.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.shiftKey) {
          // If user scrolls wheel vertically over cards, translate gently to horizontal scroll
          if (Math.abs(e.deltaY) > 20) {
            container.scrollLeft += e.deltaY * 0.8;
          }
        }
      }, { passive: true });
    }


    // Filter Buttons
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-works-filter');
        this.filterButtons.forEach(b => {
          b.classList.remove('active', 'bg-gold', 'text-[#19241E]', 'font-bold');
          b.classList.add('bg-white', 'text-[#324D3E]/80', 'font-semibold', 'border-[#324D3E]/10');
        });
        btn.classList.add('active', 'bg-gold', 'text-[#19241E]', 'font-bold');
        btn.classList.remove('bg-white', 'text-[#324D3E]/80', 'font-semibold');

        this.cards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
            card.style.opacity = '0';
            card.style.transform = 'scale(0.97)';
            requestAnimationFrame(() => {
              card.style.transition = 'all 0.25s ease';
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            });
          } else {
            card.classList.add('hidden');
          }
        });

        // Reset scroll position on filter
        if (this.scrollContainer) {
          this.scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        }
      });
    });
  }
}

/**
 * ==========================================================================
 * LUXURY FLOATING CONTACT DIRECTORY CONTROLLER
 * Toggles a beautiful popup menu with all company numbers & WhatsApp links
 * ==========================================================================
 */
class LuxuryFloatingContactController {
  constructor() {
    this.widget = document.getElementById('floating-contact-widget');
    if (!this.widget) return;
    this.triggerBtn = this.widget.querySelector('#floating-contact-trigger');
    this.modal = this.widget.querySelector('#floating-contact-modal');
    this.closeBtn = this.widget.querySelector('#floating-contact-close');
    this.backdrop = this.widget.querySelector('#floating-contact-backdrop');
    this.iconOpen = this.widget.querySelector('#floating-contact-icon-open');
    this.iconClose = this.widget.querySelector('#floating-contact-icon-close');
    this.isOpen = false;
    this.init();
  }

  init() {
    if (this.triggerBtn) {
      this.triggerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      });
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.close();
      });
    }

    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => {
        this.close();
      });
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.widget.contains(e.target)) {
        this.close();
      }
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (!this.modal) return;
    this.isOpen = true;
    this.triggerBtn?.setAttribute('aria-expanded', 'true');
    this.modal.classList.remove('hidden', 'pointer-events-none');
    if (this.backdrop) {
      this.backdrop.classList.remove('hidden', 'pointer-events-none');
    }

    requestAnimationFrame(() => {
      this.modal.classList.remove('opacity-0', 'scale-90', 'translate-y-4');
      this.modal.classList.add('opacity-100', 'scale-100', 'translate-y-0');
      if (this.backdrop) {
        this.backdrop.classList.remove('opacity-0');
        this.backdrop.classList.add('opacity-100');
      }
      if (this.iconOpen) this.iconOpen.classList.add('hidden');
      if (this.iconClose) this.iconClose.classList.remove('hidden');
    });
  }

  close() {
    if (!this.modal) return;
    this.isOpen = false;
    this.triggerBtn?.setAttribute('aria-expanded', 'false');
    this.modal.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
    this.modal.classList.add('opacity-0', 'scale-90', 'translate-y-4');
    if (this.backdrop) {
      this.backdrop.classList.remove('opacity-100');
      this.backdrop.classList.add('opacity-0');
    }
    if (this.iconOpen) this.iconOpen.classList.remove('hidden');
    if (this.iconClose) this.iconClose.classList.add('hidden');

    setTimeout(() => {
      if (!this.isOpen) {
        this.modal.classList.add('hidden', 'pointer-events-none');
        if (this.backdrop) {
          this.backdrop.classList.add('hidden', 'pointer-events-none');
        }
      }
    }, 280);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeRiwaq);
} else {
  initializeRiwaq();
}

