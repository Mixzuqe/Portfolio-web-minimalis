// ── Cursor Glow (desktop only)
  const glow = document.getElementById('cursorGlow');
  const isMobile = window.innerWidth <= 768 || window.matchMedia('(hover: none)').matches;
  
  if (!isMobile && window.innerWidth > 900) {
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    });
  }

  // ── Navbar scroll shadow
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  // ── Mobile nav with improved hamburger animation
  const burger = document.getElementById('navBurger');
  const links  = document.getElementById('navLinks');
  
  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    links.classList.toggle('open');
    burger.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (links.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });

  // Close mobile nav on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && links.classList.contains('open')) {
      links.classList.remove('open');
      burger.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // ── Scroll Reveal (IntersectionObserver)
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: stop observing after animation completes
        // revealObs.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.12, 
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObs.observe(el));

  // ── Skill bar animation with better timing
  const skillCards = document.querySelectorAll('.skill-card');
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation for better visual effect
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, index * 100);
      }
    });
  }, { threshold: 0.5 });

  skillCards.forEach(c => skillObs.observe(c));

  // ── Smooth active nav link highlighting on scroll with debounce
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a');
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 150) current = s.id;
      });
      navAs.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + current
          ? 'var(--coral)'
          : '';
      });
    }, 100);
  });

  // ── Touch optimization for iOS
  // Prevent double tap zoom on buttons
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  // ── Prevent layout shift on touch
  document.addEventListener('touchmove', function(e) {
    if (e.target.closest('.nav-links.open') === null && 
        !e.target.closest('a') && 
        !e.target.closest('button')) {
      // Allow default behavior only for specific elements
    }
  }, { passive: true });

  // ── Orientation change handler
  window.addEventListener('orientationchange', () => {
    // Close menu on orientation change
    links.classList.remove('open');
    burger.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // ── Handle viewport changes for responsive adjustments
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Adjust cursor glow visibility based on window size
      if (window.innerWidth > 900 && !isMobile) {
        glow.style.display = 'block';
      } else {
        glow.style.display = 'none';
      }
    }, 250);
  });