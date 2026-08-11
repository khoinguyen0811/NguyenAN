/* ==========================================================================
   NGUYEN AN INTERLINING - Main JavaScript v2.0.0
   GSAP + ScrollTrigger + Multi-Page State + Bilingual Switcher
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins safely
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    initGSAPAnimations();
  } else {
    console.warn('GSAP or ScrollTrigger not loaded. Fallback to default CSS displays.');
  }

  initScrollProgress();
  initActiveNavLink();
  initSlidingNavIndicator();
  initMarketMapTab();
  initProductTabs();
  initAccordion();
  initRFQForm();
  initLanguageToggle();
  initPDFModal();
  initMobileMenu();
});

/* -------------------------------------------------------------------------- */
/* 0. Active Navigation Link Highlighting                                    */
/* -------------------------------------------------------------------------- */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-item-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('nav-link-active');
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 0b. Sliding Navigation Indicator Bar                                      */
/* -------------------------------------------------------------------------- */
function initSlidingNavIndicator() {
  const nav = document.getElementById('desktop-nav-menu');
  if (!nav) return;

  const links = nav.querySelectorAll('.nav-item-link');
  let indicator = document.getElementById('nav-indicator');

  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'nav-indicator';
    nav.appendChild(indicator);
  }

  function moveIndicatorTo(element) {
    if (!element || element.offsetWidth === 0) {
      indicator.style.opacity = '0';
      return;
    }
    const targetElem = element.querySelector('span') || element;
    const navRect = nav.getBoundingClientRect();
    const targetRect = targetElem.getBoundingClientRect();

    indicator.style.left = (targetRect.left - navRect.left) + 'px';
    indicator.style.width = targetRect.width + 'px';
    indicator.style.opacity = '1';
  }

  // Set initial position after fonts and layouts render
  const updateInitialPos = () => {
    const currentActive = nav.querySelector('.nav-link-active');
    if (currentActive) {
      moveIndicatorTo(currentActive);
    } else if (links.length) {
      moveIndicatorTo(links[0]);
    }
  };

  setTimeout(updateInitialPos, 50);
  setTimeout(updateInitialPos, 300);

  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      moveIndicatorTo(link);
    });
  });

  const navGroups = nav.querySelectorAll('.group');
  navGroups.forEach(group => {
    group.addEventListener('mouseenter', () => {
      const groupLink = group.querySelector('.nav-item-link');
      if (groupLink) moveIndicatorTo(groupLink);
    });
  });

  nav.addEventListener('mouseleave', () => {
    const currentActive = nav.querySelector('.nav-link-active');
    if (currentActive) {
      moveIndicatorTo(currentActive);
    } else {
      indicator.style.opacity = '0';
    }
  });

  window.addEventListener('resize', () => {
    const currentActive = nav.querySelector('.nav-link-active');
    if (currentActive) moveIndicatorTo(currentActive);
  });
}



/* -------------------------------------------------------------------------- */
/* 1. GSAP & ScrollTrigger Animations                                         */
/* -------------------------------------------------------------------------- */
function initGSAPAnimations() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sticky Navbar shrink on scroll
  const nav = document.getElementById('main-nav');
  if (nav) {
    ScrollTrigger.create({
      start: 'top -50',
      onUpdate: (self) => {
        if (self.direction === 1) {
          nav.classList.add('shadow-lg', 'py-3');
          nav.classList.remove('py-5');
        } else if (self.scroll() < 50) {
          nav.classList.remove('shadow-lg', 'py-3');
          nav.classList.add('py-5');
        }
      }
    });
  }

  if (reduceMotion) {
    gsap.set('.hero-animate, .gsap-reveal, .gsap-stagger-grid > *', { opacity: 1, y: 0 });
    document.querySelectorAll('.counter-val').forEach(counter => {
      const targetVal = parseFloat(counter.getAttribute('data-target'));
      const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      counter.innerText = targetVal.toFixed(decimals) + suffix;
    });
    return;
  }

  // --- A. MASTER PAGE HERO ENTRANCE TIMELINE ---
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.85 } });

  // Sub-page Hero Banner Elements (Breadcrumb, Blue Ribbon, Description)
  const heroNav = document.querySelector('main section:first-of-type nav');
  const heroBanner = document.querySelector('main section:first-of-type .font-sans');
  const heroH1 = document.querySelector('main section:first-of-type h1');
  const heroDesc = document.querySelector('main section:first-of-type p');
  
  if (heroNav && heroBanner && heroH1 && heroDesc) {
    heroTl.from(heroNav, { y: -20, opacity: 0, duration: 0.6 })
          .from(heroBanner, { x: -40, opacity: 0, duration: 0.8 }, '-=0.3')
          .from(heroH1, { scale: 0.95, opacity: 0, duration: 0.6 }, '-=0.5')
          .from(heroDesc, { y: 25, opacity: 0, duration: 0.6 }, '-=0.4');
  }

  // Index Page Hero Specific Stagger
  if (document.querySelectorAll('.hero-animate').length) {
    gsap.from('.hero-animate', {
      y: 35,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.1
    });
  }

  // Hero Image 3D Parallax Tilt
  const heroCard = document.querySelector('.hero-card-tilt');
  if (heroCard) {
    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 12;
      const yPos = (clientY / window.innerHeight - 0.5) * 12;
      gsap.to(heroCard, {
        rotationY: xPos,
        rotationX: -yPos,
        ease: 'power1.out',
        duration: 0.5
      });
    });
  }

  // --- B. SCROLL-TRIGGERED REVEALS FOR ALL SECTIONS & CARDS ---
  
  // 1. Reveal Section Headings, Titles & Subtitles
  document.querySelectorAll('section').forEach((sec) => {
    const headings = sec.querySelectorAll('h2, .space-y-1, .space-y-2, .gsap-reveal');
    headings.forEach((heading) => {
      if (!heading.classList.contains('gsap-ignore') && !heading.closest('.hero-animate')) {
        gsap.fromTo(heading,
          { opacity: 0, y: 35 },
          {
            scrollTrigger: {
              trigger: heading,
              start: 'top 90%',
              toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out'
          }
        );
      }
    });
  });

  // 2. Staggered Entrance Animations for ALL Grid Cards (News, Products, Services, Certifications)
  const cardGrids = document.querySelectorAll('.grid, .gsap-stagger-grid');
  cardGrids.forEach((grid) => {
    if (grid.children.length > 0 && !grid.classList.contains('gsap-ignore')) {
      const cards = Array.from(grid.children);
      gsap.fromTo(cards,
        { opacity: 0, y: 45, scale: 0.96 },
        {
          scrollTrigger: {
            trigger: grid,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform'
        }
      );
    }
  });

  // Refresh ScrollTrigger after initial render
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 400);

  // --- C. DYNAMIC NUMBER COUNTER ANIMATION ---
  const counterElements = document.querySelectorAll('.counter-val');
  counterElements.forEach((counter) => {
    const targetVal = parseFloat(counter.getAttribute('data-target'));
    const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
    const suffix = counter.getAttribute('data-suffix') || '';

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 90%',
      onEnter: () => {
        let obj = { val: 0 };
        gsap.to(obj, {
          val: targetVal,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            counter.innerText = obj.val.toFixed(decimals) + suffix;
          }
        });
      },
      once: true
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 2. Scroll Progress Bar                                                     */
/* -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

/* -------------------------------------------------------------------------- */
/* 3. Regional Market Interactive Selector                                    */
/* -------------------------------------------------------------------------- */
const marketData = {
  south: {
    region: 'MIỀN NAM',
    share: '60%',
    description: 'Trụ sở văn phòng đại diện & mạng lưới cung ứng chính tại TP. Hồ Chí Minh, Bình Dương, Đồng Nai, Long An. Phục vụ hàng trăm thương hiệu thời trang xuất khẩu.',
    cities: ['TP. Hồ Chí Minh (Văn Phòng)', 'Bình Dương', 'Đồng Nai', 'Long An'],
    shareVal: 60
  },
  central: {
    region: 'MIỀN TRUNG',
    share: '30%',
    description: 'Khu vực trung tâm với hệ thống phân phối phủ sóng các cụm may công nghiệp Đà Nẵng, Phú Yên, Quảng Nam, Thừa Thiên Huế.',
    cities: ['Đà Nẵng', 'Phú Yên', 'Quảng Nam', 'Thừa Thiên Huế'],
    shareVal: 30
  },
  north: {
    region: 'MIỀN BẮC',
    share: '10%',
    description: 'Nơi đặt Nhà máy Sản xuất chính (Nam Sách, Hải Dương) cùng mạng lưới kết nối đối tác khu vực Hà Nội, Hải Phòng, Nam Định, Hưng Yên.',
    cities: ['Hải Dương (Nhà Máy)', 'Hà Nội', 'Hải Phòng', 'Nam Định'],
    shareVal: 10
  }
};

function initMarketMapTab() {
  const buttons = document.querySelectorAll('.market-tab-btn');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-region');
      const data = marketData[target];
      if (!data) return;

      buttons.forEach(b => {
        b.classList.remove('bg-primary-blue', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-100');
      });
      btn.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-100');
      btn.classList.add('bg-primary-blue', 'text-white', 'shadow-md');

      const regionTitle = document.getElementById('market-region-name');
      const regionShare = document.getElementById('market-region-share');
      const regionDesc = document.getElementById('market-region-desc');
      const citiesContainer = document.getElementById('market-cities-list');
      const progressBar = document.getElementById('market-progress-fill');

      if (regionTitle) regionTitle.textContent = data.region;
      if (regionShare) regionShare.textContent = data.share;
      if (regionDesc) regionDesc.textContent = data.description;
      if (progressBar) progressBar.style.width = data.share;

      if (citiesContainer) {
        citiesContainer.innerHTML = data.cities.map(c => `
          <div class="flex items-center space-x-2 bg-blue-50/80 px-3 py-2 rounded-lg text-primary-dark font-medium text-sm border border-blue-100">
            <svg class="w-4 h-4 text-primary-blue shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <span>${c}</span>
          </div>
        `).join('');
      }

      document.querySelectorAll('.map-pin').forEach(pin => {
        pin.classList.remove('scale-125', 'ring-4', 'ring-blue-400');
        if (pin.getAttribute('data-pin') === target) {
          pin.classList.add('scale-125', 'ring-4', 'ring-blue-400');
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 4. Product Specification Data (Woven, Non-Woven, Fusible in English)      */
/* -------------------------------------------------------------------------- */
const productSpecsData = {
  woven: {
    title: 'Woven Interlining',
    tag: 'Woven Product Series',
    image: 'assets/img/about-interlining.png',
    desc: 'High-precision woven fusible interlinings engineered for structural stability, crisp collar shaping, and long-lasting garment shape retention across premium cotton, wool, and blended fabrics.',
    features: [
      'Strong peel strength with uniform double-dot adhesive coating',
      'Excellent dimensional stability after dry cleaning and washing',
      'Preserves natural fabric handle feeling without stiffness',
      'Wide range of GSM weights tailored for collars, cuffs, and waistbands'
    ],
    applications: ['Men & Women Shirts', 'Suit Collars & Cuffs', 'Trouser Waistbands', 'Jackets & Blazers'],
    loading20: '90,000 meters (Width 112cm / 150cm)',
    loading40: '240,000 meters (Width 112cm / 150cm)',
    leadTime: '4 days to 10 days'
  },
  nonwoven: {
    title: 'Non-Woven Interlining',
    tag: 'Non-Woven Product Series',
    image: 'assets/img/product-spec.png',
    desc: 'Lightweight, versatile non-woven fusible interlinings designed for soft reinforcement, smooth surface finish, and cost-effective garment construction.',
    features: [
      'Soft and smooth hand feel with low-temperature fusing',
      'High thermal resistance and wash durability',
      'Prevents strike-through on delicate and thin fabrics',
      'Optimal cost efficiency for mass apparel production'
    ],
    applications: ['Front Plackets & Pocket Flaps', 'Blouses & Casual Tops', 'Light Outerwear', 'Embroidery Backing'],
    loading20: '85,000 meters (Width 150cm / 35gsm - 50gsm)',
    loading40: '230,000 meters (Width 150cm / 35gsm - 50gsm)',
    leadTime: '4 days to 2 weeks'
  },
  fusible: {
    title: 'Fusible Interlining (Warp Knitted)',
    tag: 'Core Flagship Series',
    image: 'assets/img/product-warp-knitted.png',
    desc: 'Flagship double-dot coating fusible interlining combining elasticity and bond strength. Engineered specifically for high-end tailoring, tailored suits, coats, and uniforms.',
    features: [
      'Advanced double-dot coating technology for superior peel strength',
      'Soft handle feeling maintaining fabric elasticity',
      'Low-temperature pressing to protect original fabric aesthetics',
      'High resistance to dry cleaning, steam pressing, and home washing'
    ],
    applications: ['Tailored Men & Women Suits', 'Overcoats & Jackets', 'Denim & Jeans', 'Corporate & Security Uniforms'],
    loading20: '81,000 meters (Width 150cm / 50gsm)',
    loading40: '222,800 meters (Width 150cm / 50gsm)',
    leadTime: '4 days to 2 weeks'
  },
  circular: {
    title: 'Circular Interlining',
    tag: 'Flexible Stretch Series',
    image: 'assets/img/capabilities.png',
    desc: 'Circular knitted interlining providing 4-way elastic stretch flexibility for activewear, knitwear, polo shirts, and motion-heavy garments.',
    features: [
      'High elastic recovery following natural body movements',
      'Smooth micro-dot adhesive preventing surface distortion',
      'Durable bond strength preventing delamination',
      'Compatible with jersey, rib, and spandex blends'
    ],
    applications: ['Polo Shirts & T-Shirts', 'Sportswear & Activewear', 'Stretch Denim', 'Elastic Cuffs & Collars'],
    loading20: '75,000 meters (Width 150cm / 45gsm)',
    loading40: '200,000 meters (Width 150cm / 45gsm)',
    leadTime: '5 days to 2 weeks'
  },
  pocketing: {
    title: 'Interlining & Pocketing Fabrics',
    tag: 'Complementary Trims',
    image: 'assets/img/management-process.png',
    desc: 'Premium pocketing fabrics and matching interlining trims engineered for durability, anti-pilling performance, and high moisture absorption.',
    features: [
      'Anti-pilling, friction-resistant pocket fabric',
      'High breathability and skin-friendly texture',
      'Full color palette (White, Black, Navy, Beige, Grey)',
      'OEKO-TEX Standard 100 certified safe for skin contact'
    ],
    applications: ['Trouser Pockets', 'Jeans Pocketing', 'Jacket Lining Trims', 'Garment Interior Reinforcement'],
    loading20: '95,000 meters (Width 150cm)',
    loading40: '250,000 meters (Width 150cm)',
    leadTime: '4 days to 10 days'
  }
};

function initProductTabs() {
  const tabs = document.querySelectorAll('.prod-tab-btn');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-prod');
      const data = productSpecsData[key];
      if (!data) return;

      tabs.forEach(t => {
        t.classList.remove('bg-primary-blue', 'text-white', 'shadow-lg');
        t.classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-200');
      });
      tab.classList.remove('bg-white', 'text-slate-700', 'border', 'border-slate-200');
      tab.classList.add('bg-primary-blue', 'text-white', 'shadow-lg');

      const titleEl = document.getElementById('prod-detail-title');
      const tagEl = document.getElementById('prod-detail-tag');
      const descEl = document.getElementById('prod-detail-desc');
      const imgEl = document.getElementById('prod-detail-img');
      const featsEl = document.getElementById('prod-detail-features');
      const appsEl = document.getElementById('prod-detail-apps');
      const load20El = document.getElementById('prod-load-20');
      const load40El = document.getElementById('prod-load-40');
      const leadEl = document.getElementById('prod-lead-time');

      if (titleEl) titleEl.textContent = data.title;
      if (tagEl) tagEl.textContent = data.tag;
      if (descEl) descEl.textContent = data.desc;
      if (imgEl) imgEl.src = data.image;

      if (featsEl) {
        featsEl.innerHTML = data.features.map(f => `
          <li class="flex items-start space-x-3 text-slate-700 text-sm md:text-base">
            <svg class="w-5 h-5 text-primary-blue shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            <span>${f}</span>
          </li>
        `).join('');
      }

      if (appsEl) {
        appsEl.innerHTML = data.applications.map(a => `
          <span class="bg-blue-50 text-primary-dark font-medium px-3 py-1.5 rounded-lg text-xs md:text-sm border border-blue-100">
            ${a}
          </span>
        `).join('');
      }

      if (load20El) load20El.textContent = data.loading20;
      if (load40El) load40El.textContent = data.loading40;
      if (leadEl) leadEl.textContent = data.leadTime;
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 5. Accordion for Sustainability & Process FAQ                               */
/* -------------------------------------------------------------------------- */
function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 6. RFQ & Sample Request Interactive Form                                    */
/* -------------------------------------------------------------------------- */
function initRFQForm() {
  const form = document.getElementById('rfq-form');
  const resultAlert = document.getElementById('rfq-alert');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending Request...`;

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
      form.reset();

      if (resultAlert) {
        resultAlert.classList.remove('hidden');
        resultAlert.innerHTML = `
          <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm flex items-start space-x-3">
            <svg class="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
              <p class="font-bold text-base">Request Submitted Successfully!</p>
              <p>Our technical team at Nguyen An Interlining will contact you within 30 minutes via Phone/WhatsApp/Email to confirm interlining specifications and arrange free fabric sample delivery.</p>
            </div>
          </div>
        `;
        setTimeout(() => {
          resultAlert.classList.add('hidden');
        }, 8000);
      }
    }, 1200);
  });
}

/* -------------------------------------------------------------------------- */
/* 7. PDF Modal Viewer & Download                                             */
/* -------------------------------------------------------------------------- */
function initPDFModal() {
  const modal = document.getElementById('pdf-modal');
  const openBtns = document.querySelectorAll('.open-pdf-modal');
  const closeBtn = document.getElementById('close-pdf-modal');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 8. Mobile Navigation Drawer                                                 */
/* -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('close-mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !drawer) return;

  function openDrawer() {
    drawer.style.transform = 'translateX(0%)';
    drawer.style.opacity = '1';
    drawer.style.visibility = 'visible';
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');

    if (overlay) {
      overlay.style.display = 'block';
      overlay.style.opacity = '1';
      overlay.classList.remove('hidden');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.style.transform = 'translateX(100%)';
    drawer.classList.add('translate-x-full');
    drawer.classList.remove('translate-x-0');

    if (overlay) {
      overlay.style.opacity = '0';
      overlay.classList.add('hidden');
      setTimeout(() => {
        if (overlay.classList.contains('hidden')) {
          overlay.style.display = 'none';
        }
      }, 300);
    }
    document.body.style.overflow = '';
  }

  // Handle both click and touch events seamlessly
  let lastToggleTime = 0;
  const handleToggle = (e) => {
    const now = Date.now();
    if (now - lastToggleTime < 300) return;
    lastToggleTime = now;
    e.preventDefault();
    e.stopPropagation();

    const isClosed = !drawer.style.transform || 
                     drawer.style.transform === 'translateX(100%)' || 
                     drawer.classList.contains('translate-x-full');

    if (isClosed) {
      openDrawer();
    } else {
      closeDrawer();
    }
  };

  menuBtn.addEventListener('click', handleToggle);
  menuBtn.addEventListener('touchstart', handleToggle, { passive: false });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
    });
    closeBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      closeDrawer();
    }, { passive: false });
  }

  if (overlay) {
    overlay.addEventListener('click', closeDrawer);
    overlay.addEventListener('touchstart', closeDrawer, { passive: true });
  }

  links.forEach(l => {
    l.addEventListener('click', closeDrawer);
  });

  // Mobile Products Submenu Accordion Toggle
  const prodToggle = document.getElementById('mobile-products-toggle');
  const prodSubmenu = document.getElementById('mobile-products-submenu');
  const prodArrow = document.getElementById('mobile-products-arrow');

  if (prodToggle && prodSubmenu) {
    let lastSubmenuToggle = 0;
    const handleSubmenuToggle = (e) => {
      const now = Date.now();
      if (now - lastSubmenuToggle < 250) return;
      lastSubmenuToggle = now;
      e.preventDefault();
      e.stopPropagation();

      const isHidden = prodSubmenu.classList.contains('hidden');
      if (isHidden) {
        prodSubmenu.classList.remove('hidden');
        if (prodArrow) prodArrow.classList.add('rotate-180');
      } else {
        prodSubmenu.classList.add('hidden');
        if (prodArrow) prodArrow.classList.remove('rotate-180');
      }
    };

    prodToggle.addEventListener('click', handleSubmenuToggle);
    prodToggle.addEventListener('touchstart', handleSubmenuToggle, { passive: false });
  }
}

/* -------------------------------------------------------------------------- */
/* 9. Bilingual Language Toggle (VI / EN)                                      */
/* -------------------------------------------------------------------------- */
let currentLang = 'vi';

const langDict = {
  vi: {
    nav_about: 'Giới Thiệu',
    nav_products: 'Sản Phẩm',
    nav_logistics: 'Logistics',
    nav_sustainability: 'Phát Triển Bền Vững',
    nav_contact: 'Liên Hệ',
    hero_badge: 'NHÀ SẢN XUẤT KEỎ DỰNG HÀNG ĐẦU VIỆT NAM',
    hero_title: 'NGUYEN AN INTERLINING',
    hero_subtitle: 'Reliable Interlining Solutions for the Global Apparel Industry. Hơn 20 năm chuyên sâu cung cấp các giải pháp dựng vải Woven, Non Woven & Fusible Interlining đạt chuẩn quốc tế.',
    cta_catalog: 'Khám Phá Sản Phẩm',
    cta_rfq: 'Báo Giá & Nhận Mẫu',
    cta_pdf: 'Xem Company Profile PDF'
  },
  en: {
    nav_about: 'About Us',
    nav_products: 'Products',
    nav_logistics: 'Logistics Services',
    nav_sustainability: 'Sustainability',
    nav_contact: 'Contact Us',
    hero_badge: 'LEADING INTERLINING MANUFACTURER IN VIETNAM',
    hero_title: 'NGUYEN AN INTERLINING',
    hero_subtitle: 'Reliable Interlining Solutions for the Global Apparel Industry. Over 20 years of specialization in woven, non-woven, and fusible interlining solutions.',
    cta_catalog: 'Explore Products',
    cta_rfq: 'Get Quote & Samples',
    cta_pdf: 'View PDF Profile'
  }
};

function initLanguageToggle() {
  const langBtns = document.querySelectorAll('.lang-toggle-btn');
  if (!langBtns.length) return;

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang === currentLang) return;
      currentLang = lang;

      langBtns.forEach(b => {
        b.classList.remove('bg-primary-blue', 'text-white');
        b.classList.add('text-slate-600', 'hover:bg-slate-100');
      });
      btn.classList.remove('text-slate-600', 'hover:bg-slate-100');
      btn.classList.add('bg-primary-blue', 'text-white');

      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (langDict[lang] && langDict[lang][key]) {
          el.textContent = langDict[lang][key];
        }
      });
    });
  });
}
