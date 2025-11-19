// ============================================
// PORTFOLIO JAVASCRIPT - OPTIMIZED
// ============================================

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION & CONSTANTS
    // ============================================
    const CONFIG = {
        navScrollThreshold: 50,
        particleCount: 50,
        debounceDelay: 150,
        throttleDelay: 16, // ~60fps
        observerThreshold: 0.1,
        observerRootMargin: '0px 0px -50px 0px'
    };

    // Cache DOM elements for better performance
    const DOM = {
        navbar: null,
        menuToggle: null,
        navLinks: null,
        particlesContainer: null,
        scrollIndicator: null,
        body: document.body,
        sections: null,
        shapes: null
    };

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    // Debounce function for performance optimization
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Throttle function with requestAnimationFrame fallback
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Cache DOM elements on init
    function cacheDOMElements() {
        DOM.navbar = document.getElementById('navbar');
        DOM.menuToggle = document.querySelector('.menu-toggle');
        DOM.navLinks = document.querySelector('.nav-links');
        DOM.particlesContainer = document.getElementById('particles');
        DOM.scrollIndicator = document.querySelector('.scroll-indicator');
        DOM.sections = document.querySelectorAll('section[id]');
        DOM.shapes = document.querySelectorAll('.shape');
    }

    // ============================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = DOM.navbar?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    closeMobileMenu();
                }
            });
        });
    }

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    function initMobileMenu() {
        if (!DOM.menuToggle || !DOM.navLinks) return;

        // Toggle menu
        DOM.menuToggle.addEventListener('click', toggleMobileMenu);

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!DOM.menuToggle.contains(e.target) && !DOM.navLinks.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMobileMenu();
        });

        // Close menu when clicking nav links
        DOM.navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    function toggleMobileMenu() {
        const isActive = DOM.menuToggle.classList.toggle('active');
        DOM.navLinks.classList.toggle('active');
        DOM.body.style.overflow = isActive ? 'hidden' : '';
        
        // Update ARIA attributes for accessibility
        DOM.menuToggle.setAttribute('aria-expanded', isActive);
        DOM.navLinks.setAttribute('aria-hidden', !isActive);
    }

    function closeMobileMenu() {
        if (DOM.menuToggle && DOM.navLinks) {
            DOM.menuToggle.classList.remove('active');
            DOM.navLinks.classList.remove('active');
            DOM.body.style.overflow = '';
            DOM.menuToggle.setAttribute('aria-expanded', 'false');
            DOM.navLinks.setAttribute('aria-hidden', 'true');
        }
    }

    // ============================================
    // ACTIVE NAVIGATION ON SCROLL
    // ============================================
    let currentActiveSection = null;

    function updateActiveNavLink() {
        if (!DOM.sections || DOM.sections.length === 0) return;

        const scrollY = window.pageYOffset;
        const navHeight = DOM.navbar?.offsetHeight || 0;
        const viewportMiddle = scrollY + (window.innerHeight / 3);

        let activeSection = null;

        // Find the section closest to viewport middle
        DOM.sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (viewportMiddle >= sectionTop && viewportMiddle < sectionBottom) {
                activeSection = section.getAttribute('id');
            }
        });

        // Only update DOM if active section changed
        if (activeSection && activeSection !== currentActiveSection) {
            currentActiveSection = activeSection;
            const navLinks = DOM.navLinks?.querySelectorAll('a') || [];
            
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${activeSection}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    let isNavbarScrolled = false;

    function handleNavbarScroll() {
        if (!DOM.navbar) return;

        const shouldBeScrolled = window.pageYOffset > CONFIG.navScrollThreshold;
        
        // Only update DOM if state changed
        if (shouldBeScrolled !== isNavbarScrolled) {
            isNavbarScrolled = shouldBeScrolled;
            DOM.navbar.classList.toggle('scrolled', shouldBeScrolled);
        }
    }

    // ============================================
    // PARALLAX EFFECT FOR SHAPES
    // ============================================
    function handleParallax() {
        if (!DOM.shapes || DOM.shapes.length === 0) return;

        const scrolled = window.pageYOffset;
        
        // Use transform for better performance
        DOM.shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const translateY = scrolled * speed;
            shape.style.transform = `translate3d(0, ${translateY}px, 0)`;
        });
    }

    // ============================================
    // PARTICLE SYSTEM GENERATION
    // ============================================
    function initParticles() {
        if (!DOM.particlesContainer) return;

        // Use DocumentFragment for better performance
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < CONFIG.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Set all styles at once
            const size = 1 + Math.random() * 2;
            const left = Math.random() * 100;
            const delay = Math.random() * 20;
            const duration = 15 + Math.random() * 10;
            
            particle.style.cssText = `
                left: ${left}%;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
                width: ${size}px;
                height: ${size}px;
            `;
            
            fragment.appendChild(particle);
        }
        
        DOM.particlesContainer.innerHTML = '';
        DOM.particlesContainer.appendChild(fragment);
    }

    // ============================================
    // PROJECT CARD INTERACTIONS
    // ============================================
    function initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Use CSS classes instead of inline styles when possible
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            // Keyboard accessibility
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const link = this.querySelector('.view-project');
                    if (link) link.click();
                }
            });

            // Add focus indicator
            card.setAttribute('tabindex', '0');
        });
    }

    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    function initScrollAnimations() {
        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            // Fallback: add animated class to all elements immediately
            document.querySelectorAll('.project-card, .education-item, .skill-category, .glass-card')
                .forEach(el => el.classList.add('animated'));
            return;
        }

        const observerOptions = {
            threshold: CONFIG.observerThreshold,
            rootMargin: CONFIG.observerRootMargin
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Optionally unobserve after animation to save resources
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll(
            '.project-card, .education-item, .skill-category, .glass-card'
        );

        animatedElements.forEach(el => observer.observe(el));
    }

    // ============================================
    // SCROLL INDICATOR
    // ============================================
    let isScrollIndicatorVisible = true;

    function initScrollIndicator() {
        if (!DOM.scrollIndicator) return;

        DOM.scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Throttled scroll handler for indicator
        const handleIndicatorScroll = throttle(() => {
            const shouldBeVisible = window.pageYOffset <= 200;
            
            if (shouldBeVisible !== isScrollIndicatorVisible) {
                isScrollIndicatorVisible = shouldBeVisible;
                DOM.scrollIndicator.style.opacity = shouldBeVisible ? '1' : '0';
                DOM.scrollIndicator.style.pointerEvents = shouldBeVisible ? 'auto' : 'none';
            }
        }, CONFIG.throttleDelay);

        window.addEventListener('scroll', handleIndicatorScroll, { passive: true });
    }

    // ============================================
    // OPTIMIZED SCROLL LOOP
    // ============================================
    let rafId = null;
    let lastScrollY = window.pageYOffset;

    function animationLoop() {
        const currentScrollY = window.pageYOffset;
        
        // Only run updates if scroll position changed
        if (currentScrollY !== lastScrollY) {
            handleNavbarScroll();
            updateActiveNavLink();
            handleParallax();
            lastScrollY = currentScrollY;
        }
        
        rafId = requestAnimationFrame(animationLoop);
    }

    // ============================================
    // PERFORMANCE MONITORING (Optional)
    // ============================================
    function logPerformanceMetrics() {
        if (window.performance && window.performance.timing) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`✨ Page loaded in ${pageLoadTime}ms`);
        }
    }

    // ============================================
    // CLEANUP ON PAGE UNLOAD
    // ============================================
    function cleanup() {
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
    }

    // ============================================
    // INITIALIZE ALL FUNCTIONS
    // ============================================
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Cache DOM elements first
        cacheDOMElements();

        // Initialize all features
        initSmoothScroll();
        initMobileMenu();
        initParticles();
        initProjectCards();
        initScrollAnimations();
        initScrollIndicator();

        // Start animation loop
        animationLoop();

        // Handle window resize with debouncing
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
            // Re-cache elements that might have changed
            cacheDOMElements();
        }, CONFIG.debounceDelay), { passive: true });

        // Initial calls
        handleNavbarScroll();
        updateActiveNavLink();

        // Cleanup on unload
        window.addEventListener('beforeunload', cleanup);

        // Optional performance logging
        window.addEventListener('load', logPerformanceMetrics);

        console.log('⚡ Portfolio initialized with optimizations!');
    }

    // Start initialization
    init();

})();