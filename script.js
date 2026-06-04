document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // THEME SWITCHER
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Set default theme to dark
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
  } else if (!systemPrefersDark) {
    // If system is light, set light; otherwise default is dark (which has no data-theme or data-theme="dark")
    body.setAttribute('data-theme', 'light');
  }
  
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    let newTheme = 'dark';
    
    if (currentTheme !== 'light') {
      newTheme = 'light';
    }
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme toggle icons (handled by CSS transitions/displays, but this ensures a smooth transition redraw)
    triggerThemeIcons(newTheme);
  });
  
  function triggerThemeIcons(theme) {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (theme === 'light') {
      sunIcon.style.transform = 'rotate(360deg) scale(1)';
      moonIcon.style.transform = 'rotate(360deg) scale(0)';
    } else {
      sunIcon.style.transform = 'rotate(0deg) scale(0)';
      moonIcon.style.transform = 'rotate(0deg) scale(1)';
    }
  }
  
  // ==========================================================================
  // MOBILE NAVIGATION MENU
  // ==========================================================================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
    // Prevent body scroll when menu is open
    body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });
  
  // Close menu when clicking a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      body.style.overflow = '';
    });
  });
  
  // ==========================================================================
  // SCROLL EFFECTS & ACTIVE LINKS
  // ==========================================================================
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    // 1. Header scroll effect
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // 2. Scroll progress bar
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrollPercentage + '%';
    
    // 3. Back to top button visibility
    if (scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
    
    // 4. Highlight active section in navigation
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100; // Offset for fixed header
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
      
      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  });
  
  // Back to top click handler
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // ==========================================================================
  // SCROLL REVEAL (INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once revealed to keep layout performant
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // Viewport
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before it enters full viewport
  });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
  
  // ==========================================================================
  // CONTACT FORM VALIDATION & HANDLING
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic client-side validation
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      
      if (!name || !email || !subject || !message) {
        alert('Please fill out all fields.');
        return;
      }
      
      // Simulate form submission
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="btn-spinner"></span> Sending...';









    

     
    });
  }
  
  // Dynamic Year in Footer
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
});
