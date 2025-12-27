/**
 * Portfolio JavaScript - Enhanced Version
 * Optimized for performance, maintainability, and modern practices
 */

'use strict';

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    scroll: {
        threshold: 50,
        throttleDelay: 16, // ~60fps
        debounceDelay: 150
    },
    typewriter: {
        speed: 100,
        delay: 2000
    },
    particles: {
        count: {
            mobile: 35,
            desktop: 70
        },
        connectionDistance: 160,
        mouseDistance: 220,
        baseSpeed: 0.4,
        pulseSpeed: 0.02
    },
    backToTop: {
        visibilityThreshold: 500,
        ignitionDuration: 1000,
        gravity: 2,
        accelerationMultiplier: 1.15
    },
    animation: {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
const Utils = {
    /**
     * Throttle function execution
     */
    throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Debounce function execution
     */
    debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    },

    /**
     * Check if device is mobile
     */
    isMobile() {
        return window.innerWidth < 768;
    },

    /**
     * Safely query selector
     */
    $(selector, context = document) {
        return context.querySelector(selector);
    },

    /**
     * Safely query all selectors
     */
    $$(selector, context = document) {
        return context.querySelectorAll(selector);
    }
};

// ============================================
// DOM CACHE
// ============================================
class DOMCache {
    constructor() {
        this.elements = {
            navbar: Utils.$('#navbar'),
            navLinks: Utils.$('.nav-links'),
            sections: Utils.$$('section[id]'),
            scrollIndicator: Utils.$('.scroll-indicator'),
            subtitle: Utils.$('.subtitle'),
            themeToggle: Utils.$('#theme-toggle'),
            themeStylesheet: Utils.$('#theme-stylesheet'),
            backToTopBtn: Utils.$('#backToTop'),
            progressBar: Utils.$('#scroll-progress'),
            particleCanvas: Utils.$('#particle-canvas'),
            cursorDot: Utils.$('[data-cursor-dot]'),
            cursorOutline: Utils.$('[data-cursor-outline]')
        };
    }

    get(key) {
        return this.elements[key];
    }

    refresh(key) {
        const selectors = {
            navbar: '#navbar',
            navLinks: '.nav-links',
            sections: 'section[id]',
            scrollIndicator: '.scroll-indicator',
            subtitle: '.subtitle',
            themeToggle: '#theme-toggle',
            themeStylesheet: '#theme-stylesheet',
            backToTopBtn: '#backToTop',
            progressBar: '#scroll-progress',
            particleCanvas: '#particle-canvas',
            cursorDot: '[data-cursor-dot]',
            cursorOutline: '[data-cursor-outline]'
        };

        if (key && selectors[key]) {
            this.elements[key] = selectors[key].startsWith('[')
                ? Utils.$(selectors[key])
                : (selectors[key].includes(' ') ? Utils.$$(selectors[key]) : Utils.$(selectors[key]));
        }
    }
}

// ============================================
// NAVBAR MODULE
// ============================================
const NavbarModule = {
    dom: null,

    init(domCache) {
        this.dom = domCache;
        this.setupScrollEffect();
        this.setupActiveLinks();
    },

    setupScrollEffect() {
        const navbar = this.dom.get('navbar');
        if (!navbar) return;

        window.addEventListener('scroll', Utils.throttle(() => {
            const isScrolled = window.scrollY > CONFIG.scroll.threshold;
            navbar.classList.toggle('scrolled', isScrolled);
        }, CONFIG.scroll.throttleDelay));
    },

    setupActiveLinks() {
        const sections = this.dom.get('sections');
        const navbar = this.dom.get('navbar');
        if (!sections.length) return;

        window.addEventListener('scroll', Utils.throttle(() => {
            const scrollY = window.scrollY;
            const navHeight = navbar ? navbar.offsetHeight : 0;
            const viewportMiddle = scrollY + (window.innerHeight / 3);
            let currentSectionId = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - navHeight - 100;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (viewportMiddle >= sectionTop && viewportMiddle < sectionBottom) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            if (currentSectionId) {
                Utils.$$('.nav-links a').forEach(link => {
                    const isActive = link.getAttribute('href') === `#${currentSectionId}`;
                    link.classList.toggle('active', isActive);
                });
            }
        }, CONFIG.scroll.throttleDelay));
    }
};

// ============================================
// SMOOTH SCROLL MODULE
// ============================================
const SmoothScrollModule = {
    dom: null,

    init(domCache) {
        this.dom = domCache;
        this.setupSmoothScroll();
    },

    setupSmoothScroll() {
        Utils.$$('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = Utils.$(href);
                if (target) {
                    const navbar = this.dom.get('navbar');
                    const navHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = target.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

// ============================================
// THEME MODULE
// ============================================
const ThemeModule = {
    dom: null,
    currentTheme: 'dark',

    init(domCache) {
        this.dom = domCache;
        // Small delay to ensure DOM is ready
        setTimeout(() => this.setup(), 100);
    },

    setup() {
        const toggleBtn = this.dom.get('themeToggle');
        const themeStylesheet = this.dom.get('themeStylesheet');

        if (!toggleBtn || !themeStylesheet) return;

        // Load saved theme
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.applyTheme(this.currentTheme);

        // Setup toggle
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleTheme();
        });
    },

    applyTheme(theme) {
        const themeStylesheet = this.dom.get('themeStylesheet');
        const toggleBtn = this.dom.get('themeToggle');

        if (!themeStylesheet || !toggleBtn) return;

        const isLight = theme === 'light';

        // Update stylesheet
        themeStylesheet.href = isLight ? 'lightcss.css' : 'darkcss.css';

        // Update body attribute
        if (isLight) {
            document.body.setAttribute('data-theme', 'light');
            toggleBtn.classList.add('light-mode');
        } else {
            document.body.removeAttribute('data-theme');
            toggleBtn.classList.remove('light-mode');
        }

        // Update links
        this.updateThemeLinks(isLight);
        this.currentTheme = theme;
    },

    updateThemeLinks(isLight) {
        // Workshop links
        Utils.$$('a[href*="workshop"]').forEach(link => {
            link.href = isLight ? 'lightworkshops.html' : 'darkworkshop.html';
        });

        // Resume links (exclude download links)
        Utils.$$('a[href*="resume.html"], a[href*="darkresume"], a[href*="lightresume"]').forEach(link => {
            if (!link.hasAttribute('download')) {
                link.href = isLight ? 'lightresume.html' : 'darkresume.html';
            }
        });
    },

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }
};

// ============================================
// CUSTOM CURSOR MODULE
// ============================================
const CustomCursorModule = {
    dom: null,

    init(domCache) {
        this.dom = domCache;
        this.setup();
    },

    setup() {
        const cursorDot = this.dom.get('cursorDot');
        const cursorOutline = this.dom.get('cursorOutline');

        if (!cursorDot || !cursorOutline) return;

        // Mouse movement
        window.addEventListener('mousemove', (e) => {
            const { clientX: x, clientY: y } = e;

            cursorDot.style.left = `${x}px`;
            cursorDot.style.top = `${y}px`;

            // Smooth trailing effect
            cursorOutline.animate({
                left: `${x}px`,
                top: `${y}px`
            }, { duration: 500, fill: 'forwards' });
        });

        // Hover effects
        this.setupHoverEffects();
    },

    setupHoverEffects() {
        const interactiveElements = Utils.$$('a, button, .project-card, .filter-btn');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });

            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    }
};

// ============================================
// BACK TO TOP MODULE
// ============================================
const BackToTopModule = {
    dom: null,
    isLaunching: false,

    init(domCache) {
        this.dom = domCache;
        this.setup();
    },

    setup() {
        const btn = this.dom.get('backToTopBtn');
        if (!btn) return;

        // Show/hide button
        window.addEventListener('scroll', Utils.throttle(() => {
            const shouldShow = window.scrollY > CONFIG.backToTop.visibilityThreshold;
            btn.classList.toggle('visible', shouldShow);

            if (!shouldShow) {
                btn.classList.remove('launching');
                this.isLaunching = false;
            }
        }, 200));

        // Rocket launch animation
        btn.addEventListener('click', () => this.launch(btn));
    },

    launch(btn) {
        if (this.isLaunching) return;

        this.isLaunching = true;
        btn.classList.add('launching');

        const startY = window.scrollY;
        const startTime = performance.now();

        // Phase 1: Ignition (rumble)
        const ignite = (currentTime) => {
            const elapsed = currentTime - startTime;

            if (elapsed > CONFIG.backToTop.ignitionDuration) {
                requestAnimationFrame(this.liftoff.bind(this, btn));
                return;
            }

            const progress = elapsed / CONFIG.backToTop.ignitionDuration;
            const rumble = 50 * (progress * progress);

            window.scrollTo(0, startY - rumble);
            requestAnimationFrame(ignite);
        };

        requestAnimationFrame(ignite);
    },

    liftoff(btn) {
        let velocity = 0;

        const accelerate = () => {
            const currentScroll = window.scrollY;

            if (currentScroll <= 0) {
                btn.classList.remove('launching');
                this.isLaunching = false;
                window.scrollTo(0, 0);
                return;
            }

            velocity += CONFIG.backToTop.gravity;
            velocity *= CONFIG.backToTop.accelerationMultiplier;

            window.scrollTo(0, currentScroll - velocity);
            requestAnimationFrame(accelerate);
        };

        requestAnimationFrame(accelerate);
    }
};

// ============================================
// SCROLL PROGRESS MODULE
// ============================================
const ScrollProgressModule = {
    dom: null,

    init(domCache) {
        this.dom = domCache;
        this.setup();
    },

    setup() {
        const progressBar = this.dom.get('progressBar');
        if (!progressBar) return;

        window.addEventListener('scroll', Utils.throttle(() => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        }, 16));
    }
};

// ============================================
// PARTICLE SYSTEM
// ============================================
class ParticleSystem {
    constructor(domCache) {
        this.canvas = domCache.get('particleCanvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null };
        this.animationId = null;

        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const count = Utils.isMobile()
            ? CONFIG.particles.count.mobile
            : CONFIG.particles.count.desktop;

        this.particles = Array.from({ length: count }, () => ({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * CONFIG.particles.baseSpeed,
            vy: (Math.random() - 0.5) * CONFIG.particles.baseSpeed,
            size: Math.random() * 2 + 1,
            baseSize: Math.random() * 2 + 1,
            pulse: Math.random() * Math.PI * 2
        }));
    }

    setupEventListeners() {
        window.addEventListener('resize', Utils.debounce(() => {
            this.resize();
            this.createParticles();
        }, 200));

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    getParticleColor() {
        const style = getComputedStyle(document.body);
        return style.getPropertyValue('--color-particle-rgb').trim() || '255, 255, 255';
    }

    updateParticle(p) {
        // Pulse effect
        p.pulse += CONFIG.particles.pulseSpeed;
        p.size = p.baseSize + Math.sin(p.pulse) * 0.5;

        // Movement
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

        // Mouse interaction
        if (this.mouse.x !== null) {
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < CONFIG.particles.mouseDistance) {
                const force = (CONFIG.particles.mouseDistance - distance) / CONFIG.particles.mouseDistance;
                const directionX = (dx / distance) * force * CONFIG.particles.baseSpeed * 2;
                const directionY = (dy / distance) * force * CONFIG.particles.baseSpeed * 2;

                p.x += directionX;
                p.y += directionY;
            }
        }
    }

    drawParticle(p, color) {
        const opacity = 0.3 + Math.sin(p.pulse) * 0.2;
        this.ctx.fillStyle = `rgba(${color}, ${opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, Math.max(0, p.size), 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawConnections(color) {
        const { connectionDistance } = CONFIG.particles;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.2;
                    this.ctx.strokeStyle = `rgba(${color}, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const color = this.getParticleColor();

        // Update and draw particles
        this.particles.forEach(p => {
            this.updateParticle(p);
            this.drawParticle(p, color);
        });

        // Draw connections
        this.drawConnections(color);

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// ============================================
// SCROLL ANIMATIONS MODULE
// ============================================
const ScrollAnimationsModule = {
    init() {
        const observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            CONFIG.animation
        );

        const elements = Utils.$$(
            '.project-card, .education-item, .skill-category, .glass-card, .timeline-item'
        );

        elements.forEach(el => observer.observe(el));
    },

    handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }
};

// ============================================
// TYPEWRITER MODULE
// ============================================
const TypewriterModule = {
    dom: null,

    init(domCache) {
        this.dom = domCache;
        this.setup();
    },

    setup() {
        const subtitle = this.dom.get('subtitle');
        if (!subtitle) return;

        const text = subtitle.textContent;
        subtitle.textContent = '';

        setTimeout(() => {
            this.type(subtitle, text, 0);
        }, CONFIG.typewriter.delay);
    },

    type(element, text, index) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => {
                this.type(element, text, index + 1);
            }, CONFIG.typewriter.speed);
        }
    }
};

// ============================================
// APPLICATION CONTROLLER
// ============================================
class PortfolioApp {
    constructor() {
        this.domCache = new DOMCache();
        this.particleSystem = null;
    }

    init() {
        // Initialize all modules
        this.particleSystem = new ParticleSystem(this.domCache);

        NavbarModule.init(this.domCache);
        SmoothScrollModule.init(this.domCache);
        ThemeModule.init(this.domCache);
        CustomCursorModule.init(this.domCache);
        BackToTopModule.init(this.domCache);
        ScrollProgressModule.init(this.domCache);
        ScrollAnimationsModule.init();
        TypewriterModule.init(this.domCache);

        // Initialize Lucide icons if available
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        console.log('Portfolio initialized successfully');
    }

    destroy() {
        if (this.particleSystem) {
            this.particleSystem.destroy();
        }
    }
}

// ============================================
// APPLICATION BOOTSTRAP
// ============================================
const app = new PortfolioApp();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}