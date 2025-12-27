/**
 * Portfolio JavaScript
 * Optimized for performance and readability
 */

'use strict';

// Configuration
const CONFIG = {
    scrollThreshold: 50,
    throttleDelay: 16, // ~60fps
    debounceDelay: 150,
    typewriterSpeed: 100,
    typewriterDelay: 2000
};

// DOM Elements Cache
const DOM = {
    navbar: document.getElementById('navbar'),
    menuToggle: document.querySelector('.menu-toggle'),
    navLinks: document.querySelector('.nav-links'),
    sections: document.querySelectorAll('section[id]'),
    scrollIndicator: document.querySelector('.scroll-indicator'),
    subtitle: document.querySelector('.subtitle')
};

/**
 * Utility: Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 */
const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * Utility: Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 */
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

/**
 * Navbar Scroll Effect
 * Toggles 'scrolled' class based on scroll position
 */
const handleNavbarScroll = () => {
    if (!DOM.navbar) return;
    const isScrolled = window.scrollY > CONFIG.scrollThreshold;
    DOM.navbar.classList.toggle('scrolled', isScrolled);
};

/**
 * Active Navigation Link
 * Highlights the current section in the navbar
 */
const updateActiveNavLink = () => {
    if (!DOM.sections.length) return;

    const scrollY = window.scrollY;
    const navHeight = DOM.navbar ? DOM.navbar.offsetHeight : 0;
    const viewportMiddle = scrollY + (window.innerHeight / 3);

    let currentSectionId = '';

    DOM.sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (viewportMiddle >= sectionTop && viewportMiddle < sectionBottom) {
            currentSectionId = section.getAttribute('id');
        }
    });

    if (currentSectionId) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
        });
    }
};

/**
 * Mobile Menu Toggle
 */


/**
 * Smooth Scroll
 */
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = DOM.navbar ? DOM.navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

/**
 * Theme Toggle Functionality
 */
const initThemeToggle = () => {
    // Wait a bit to ensure DOM is fully loaded
    setTimeout(() => {
        const toggleBtn = document.querySelector('#theme-toggle');
        const themeStylesheet = document.querySelector('#theme-stylesheet');
        const workshopLinks = document.querySelectorAll('a[href*="workshop"]');
        const resumeLinks = document.querySelectorAll('a[href*="resume.html"], a[href*="darkresume"], a[href*="lightresume"]');

        if (!toggleBtn || !themeStylesheet) {
            return;
        }

        // Check for saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';

        // Apply theme
        const applyTheme = (theme) => {
            if (theme === 'light') {
                themeStylesheet.href = 'lightcss.css';
                document.body.setAttribute('data-theme', 'light');
                toggleBtn.classList.add('light-mode');

                // Update workshop links
                workshopLinks.forEach(link => {
                    link.href = 'lightworkshops.html';
                });

                // Update resume links
                resumeLinks.forEach(link => {
                    if (!link.hasAttribute('download')) {
                        link.href = 'lightresume.html';
                    }
                });
            } else {
                themeStylesheet.href = 'darkcss.css';
                document.body.removeAttribute('data-theme');
                toggleBtn.classList.remove('light-mode');

                // Update workshop links
                workshopLinks.forEach(link => {
                    link.href = 'darkworkshop.html';
                });

                // Update resume links
                resumeLinks.forEach(link => {
                    if (!link.hasAttribute('download')) {
                        link.href = 'darkresume.html';
                    }
                });
            }
        };

        // Apply saved theme
        applyTheme(savedTheme);

        // Click handler
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const currentTheme = document.body.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }, 100);
};



/**
 * Custom Cursor Logic
 */
const initCustomCursor = () => {
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (!cursorDot || !cursorOutline) return;

    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Smooth trailing effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .filter-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
};

/**
 * Back to Top Button
 */
const initBackToTop = () => {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
            backToTopBtn.classList.remove('launching');
        }
    }, 200));

    backToTopBtn.addEventListener('click', () => {
        if (backToTopBtn.classList.contains('launching')) return;

        // 1. Ignition: Shake and slow lift
        backToTopBtn.classList.add('launching');

        const startY = window.scrollY;
        const activationDuration = 1000; // 1s ignition
        const startTime = performance.now();

        // Phase 1: Rumble (Ignition)
        const ignitionLoop = (currentTime) => {
            const elapsed = currentTime - startTime;

            if (elapsed > activationDuration) {
                // Phase 2: Liftoff (Rapid Acceleration)
                requestAnimationFrame(liftoffLoop);
                return;
            }

            // Ease in cubic for rumble: start slow, rumble harder
            const t = elapsed / activationDuration;
            const rumbleAmt = 50 * (t * t); // Small rumble distance

            window.scrollTo(0, startY - rumbleAmt);
            requestAnimationFrame(ignitionLoop);
        };

        // Phase 2: Liftoff variables
        let liftoffVelocity = 0;
        const gravity = 2; // Acceleration factor

        const liftoffLoop = () => {
            const currentScroll = window.scrollY;

            if (currentScroll <= 0) {
                // Reached Space (Top)
                backToTopBtn.classList.remove('launching');
                window.scrollTo(0, 0);
                return;
            }

            // Accelerate upwards
            liftoffVelocity += gravity;
            // Exponential speed increase for "Warp" feel
            liftoffVelocity *= 1.15;

            const nextScroll = currentScroll - liftoffVelocity;
            window.scrollTo(0, nextScroll);
            requestAnimationFrame(liftoffLoop);
        };

        requestAnimationFrame(ignitionLoop);
    });
};



/**
 * Scroll Progress Bar
 */
const initScrollProgress = () => {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    }, 16));
};

/**
 * 3D Tilt Effect - DISABLED
 * Removed to create a flatter, cleaner UI
 */
// const initTiltEffect = () => {
//     const cards = document.querySelectorAll('.project-card, .glass-card, .workshop-card');

//     cards.forEach(card => {
//         card.addEventListener('mousemove', (e) => {
//             const rect = card.getBoundingClientRect();
//             const x = e.clientX - rect.left;
//             const y = e.clientY - rect.top;

//             const centerX = rect.width / 2;
//             const centerY = rect.height / 2;

//             const rotateX = ((y - centerY) / centerY) * -5;
//             const rotateY = ((x - centerX) / centerX) * 5;

//             // Using requestAnimationFrame for smoother performance
//             requestAnimationFrame(() => {
//                 card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
//             });
//         });

//         card.addEventListener('mouseleave', () => {
//             requestAnimationFrame(() => {
//                 card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
//             });
//         });
//     });
// };

// ============================================
// INTERACTIVE PARTICLE SYSTEM (CANVAS)
// ============================================
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null };
        this.config = {
            particleCount: window.innerWidth < 768 ? 35 : 70,
            connectionDistance: 160,
            mouseDistance: 220,
            baseSpeed: 0.4,
            pulseSpeed: 0.02
        };

        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.addEventListeners();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.config.baseSpeed,
                vy: (Math.random() - 0.5) * this.config.baseSpeed,
                size: Math.random() * 2 + 1,
                baseSize: Math.random() * 2 + 1,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }

    addEventListeners() {
        window.addEventListener('resize', debounce(() => {
            this.resize();
            this.createParticles();
        }, 200));

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Get particle color from CSS variable
        const style = getComputedStyle(document.body);
        const particleColor = style.getPropertyValue('--color-particle-rgb').trim() || '255, 255, 255';

        // Update and draw particles
        this.particles.forEach(p => {
            // Pulse effect
            p.pulse += this.config.pulseSpeed;
            p.size = p.baseSize + Math.sin(p.pulse) * 0.5;

            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            // Mouse interaction
            if (this.mouse.x != null) {
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (this.config.mouseDistance - distance) / this.config.mouseDistance;

                    // Gentle attraction
                    const directionX = forceDirectionX * force * this.config.baseSpeed * 2;
                    const directionY = forceDirectionY * force * this.config.baseSpeed * 2;

                    p.x += directionX;
                    p.y += directionY;
                }
            }

            // Draw particle
            this.ctx.fillStyle = `rgba(${particleColor}, ${0.3 + Math.sin(p.pulse) * 0.2})`;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, Math.max(0, p.size), 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw connections
        this.connectParticles(particleColor);

        requestAnimationFrame(() => this.animate());
    }

    connectParticles(color) {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.connectionDistance) {
                    const opacity = 1 - (distance / this.config.connectionDistance);
                    this.ctx.strokeStyle = `rgba(${color}, ${opacity * 0.2})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

/**
 * Intersection Observer for Animations
 */
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(
        '.project-card, .education-item, .skill-category, .glass-card, .timeline-item'
    );

    elementsToAnimate.forEach(el => observer.observe(el));
};

/**
 * Typewriter Effect for Subtitle
 */
const initTypewriter = () => {
    if (!DOM.subtitle) return;

    const text = DOM.subtitle.textContent;
    DOM.subtitle.textContent = '';

    let i = 0;
    const type = () => {
        if (i < text.length) {
            DOM.subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, CONFIG.typewriterSpeed);
        }
    };

    setTimeout(type, CONFIG.typewriterDelay);
};

/**
 * Initialize Application
 */
const init = () => {

    new ParticleSystem();
    initThemeToggle();
    initCustomCursor();
    initBackToTop();

    initScrollProgress();
    // initTiltEffect(); // Disabled for flatter UI
    // Mobile menu initialization removed
    // initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initTypewriter();
    lucide.createIcons();

    // Scroll Event Listeners (Throttled)
    window.addEventListener('scroll', throttle(() => {
        handleNavbarScroll();
        updateActiveNavLink();
    }, CONFIG.throttleDelay));

    // Initial check
    handleNavbarScroll();
    updateActiveNavLink();
};

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}