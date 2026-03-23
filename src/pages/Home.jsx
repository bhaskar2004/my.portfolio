import { useState, useRef, useEffect } from 'react'
import { ArrowUpRight, Car, Navigation as NavigationIcon, CloudRain, MapPin, HeartPulse, Newspaper, Code2, Calculator, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import SEO from '../components/SEO'
import './Home.css'
import { useScrollReveal } from '../hooks/useScrollReveal'

const Home = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const heroRef = useRef(null);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        setMousePos({ x: clientX, y: clientY });
    };

    const handleCardMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    };
    const homeFaq = [
        {
            question: 'Who is Bhaskar T?',
            answer:
                'Bhaskar T (also known as bhaskar2004) is a Software Tester and Problem Solver ' +
                'based in India. He is a Computer Science Engineering student at SJC Institute of ' +
                'Technology with expertise in Java, SQL, and Selenium. His portfolio is at bhaskar.xyz.',
        },
        {
            question: 'What does Bhaskar T do?',
            answer:
                'Bhaskar T specialises in software testing, quality assurance, and problem solving. ' +
                'He builds web projects, contributes to open source on GitHub as bhaskar2004, and ' +
                'is passionate about making software reliable and bug-free.',
        },
        {
            question: "Where can I find Bhaskar T's portfolio?",
            answer:
                "Bhaskar T's official portfolio is at https://bhaskar.xyz. " +
                'You can also find him on GitHub at github.com/bhaskar2004 and ' +
                'on LinkedIn at linkedin.com/in/bhaskart2004.',
        },
    ]

    const splitText = (text) => {
        return text.split('').map((char, index) => (
            <span key={index} className="char-fade" style={{ transitionDelay: `${index * 0.03}s` }}>
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    return (
        <div className="page-transition-wrapper">
            <SEO
                isHome
                title="Software Tester & Problem Solver"
                description={
                    'Bhaskar T – Software Tester and Problem Solver based in India. ' +
                    'Official portfolio of Bhaskar at bhaskar.xyz. Explore projects, skills, and the tech journey of Bhaskar T.'
                }
                keywords="Bhaskar T portfolio, bhaskar2004, Bhaskar software tester India, bhaskar.xyz"
                faq={homeFaq}
            />

            {/* ── Hero ────────────────────────────────────────────────── */}
            <section
                className="hero reveal-active"
                id="home"
                onMouseMove={handleMouseMove}
                ref={heroRef}
                itemScope
                itemType="https://schema.org/Person"
            >
                {/* Hidden schema anchors */}
                <meta itemProp="name" content="Bhaskar T" />
                <meta itemProp="alternateName" content="bhaskar2004" />
                <meta itemProp="url" content="https://bhaskar.xyz" />
                <meta itemProp="email" content="bhaskart.dev@gmail.com" />
                <meta itemProp="jobTitle" content="Software Tester" />
                <meta itemProp="image" content="https://bhaskar.xyz/logo.png" />

                <div className="container">
                    {/* Eyebrow label */}
                    <div className="portfolio-label font-mono reveal" aria-label="Portfolio site">
                        Portfolio 2024
                    </div>

                    {/* Name — clean h1 for SEO */}
                    <h1 itemProp="name" className="reveal">
                        {splitText("Bhaskar T")}
                    </h1>

                    {/* Role descriptor */}
                    <p className="subtitle font-mono reveal reveal-delay-3" itemProp="description">
                        Software Tester &amp;&nbsp;Problem Solver. Specialized in Quality Assurance and Automated Testing.
                    </p>

                    {/* CTA buttons */}
                    <div className="cta-buttons reveal reveal-delay-4">
                        <a href="#contact" className="btn primary">Get in Touch</a>
                        <a href="#projects" className="btn secondary">Explore Work</a>
                        <a
                            href="/resume.pdf"
                            download="Bhaskar_T_Resume.pdf"
                            className="btn outline"
                            aria-label="Download Bhaskar T resume PDF"
                        >
                            Résumé
                        </a>
                    </div>

                    {/* Social links */}
                    <div className="social-links reveal reveal-delay-5" role="list" aria-label="Social media links">
                        <a
                            href="https://github.com/bhaskar2004"
                            target="_blank"
                            rel="noopener noreferrer me"
                            aria-label="Visit Bhaskar T on GitHub"
                            itemProp="sameAs"
                            role="listitem"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/bhaskart2004/"
                            target="_blank"
                            rel="noopener noreferrer me"
                            aria-label="Visit Bhaskar T on LinkedIn"
                            itemProp="sameAs"
                            role="listitem"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="mailto:bhaskart.dev@gmail.com"
                            aria-label="Send Bhaskar T an email"
                            itemProp="email"
                            role="listitem"
                        >
                            <Mail size={20} />
                        </a>
                    </div>
                </div>
            </section>


            {/* ── About ───────────────────────────────────────────────── */}
            <section className="about" id="about" ref={useScrollReveal()}>
                <div className="container">
                    {/* Left column: bio */}
                    <div className="reveal">
                        <span className="section-eyebrow">About</span>
                        <h2>About Bhaskar T</h2>
                        <p className="about-content">
                            I'm Bhaskar T (bhaskar2004) — a CS student who loves finding bugs.
                            I test software until something breaks, then figure out exactly why.
                            My focus is on making software solid, reliable, and production-ready.
                            Details matter, and I'm kind of obsessed with getting them right.
                        </p>

                        {/* Education & Skills */}
                        <div className="education-skills-grid">
                            {/* Education */}
                            <div className="education-section">
                                <h3>Education</h3>
                                <div className="degree">
                                    <span className="degree-title">SJC Institute of Technology</span>
                                    <span className="institution">Computer Science Engineering</span>
                                    <span className="grad-year">2022 – 2026</span>
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="skills-section">
                                <h3>Skills</h3>
                                <div className="skills-grid">
                                    {['Java', 'SQL', 'Selenium', 'GitHub', 'IntelliJ', 'VS Code',
                                        'Python', 'Photography', 'Video Editing'].map(s => (
                                            <span key={s} className="skill-tag">{s}</span>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column: stats */}
                    <div className="about-stats">
                        <div className="stat-card reveal reveal-delay-1">
                            <span className="stat-value">8+</span>
                            <span className="stat-label">Projects Built</span>
                        </div>
                        <div className="stat-card reveal reveal-delay-2">
                            <span className="stat-value">3+</span>
                            <span className="stat-label">Years Coding</span>
                        </div>
                        <div className="stat-card reveal reveal-delay-3">
                            <span className="stat-value">4</span>
                            <span className="stat-label">Languages</span>
                        </div>
                        <div className="stat-card reveal reveal-delay-4">
                            <span className="stat-value">∞</span>
                            <span className="stat-label">Bugs Squashed</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Projects ────────────────────────────────────────────── */}
            <section className="projects" id="projects" ref={useScrollReveal()}>
                <div className="container">
                    <div className="projects-header reveal">
                        <div>
                            <span className="section-eyebrow">Work</span>
                            <h2>Featured Projects</h2>
                        </div>
                        <span className="projects-count reveal reveal-delay-1">08 projects</span>
                    </div>

                    <div className="projects-grid reveal reveal-delay-1">

                        {/* #01 */}
                        <article className="project-card reveal" onMouseMove={handleCardMouseMove}>
                            <div className="project-header">
                                <div className="project-icon"><Car size={20} /></div>
                                <div className="project-meta">
                                    <span className="project-number">#01</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3 className="project-title">Vehicle Registration System</h3>
                                <p className="project-description">Comprehensive system for managing vehicle registrations and owner details with intuitive database management.</p>
                                <div className="tech-stack">
                                    <span className="tech-tag">Java</span>
                                    <span className="tech-tag">SQL</span>
                                </div>
                            </div>
                            <div className="project-footer">
                                <a href="https://github.com/bhaskar2004/vehicle-registration-management-system.git" className="project-link primary" target="_blank" rel="noopener noreferrer">
                                    <span>GitHub</span><ArrowUpRight size={13} />
                                </a>
                            </div>
                        </article>

                        {/* #02 */}
                        <article className="project-card reveal reveal-delay-1" onMouseMove={handleCardMouseMove}>
                            <div className="project-header">
                                <div className="project-icon"><NavigationIcon size={20} /></div>
                                <div className="project-meta">
                                    <span className="project-number">#02</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3 className="project-title">Smart Navigation</h3>
                                <p className="project-description">IoT-powered navigation aid system designed to help visually impaired users navigate safely and independently.</p>
                                <div className="tech-stack">
                                    <span className="tech-tag">IoT</span>
                                    <span className="tech-tag">Python</span>
                                </div>
                            </div>
                            <div className="project-footer">
                                <a href="https://github.com/bhaskar2004/Innovative-Smart-Navigation-Systems-for-Empowering-the-Blind.git" className="project-link primary" target="_blank" rel="noopener noreferrer">
                                    <span>GitHub</span><ArrowUpRight size={13} />
                                </a>
                            </div>
                        </article>

                        {/* #03 */}
                        <article className="project-card reveal reveal-delay-2" onMouseMove={handleCardMouseMove}>
                            <div className="project-header">
                                <div className="project-icon"><CloudRain size={20} /></div>
                                <div className="project-meta">
                                    <span className="project-number">#03</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3 className="project-title">Weather Forecast Bot</h3>
                                <p className="project-description">Intelligent chatbot integrating OpenWeatherMap API to provide multi-city weather forecasts with formatted responses.</p>
                                <div className="tech-stack">
                                    <span className="tech-tag">BotPress</span>
                                    <span className="tech-tag">API</span>
                                </div>
                            </div>
                            <div className="project-footer">
                                <a href="https://github.com/bhaskar2004/weather-bot" className="project-link primary" target="_blank" rel="noopener noreferrer">
                                    <span>GitHub</span><ArrowUpRight size={13} />
                                </a>
                            </div>
                        </article>

                        {/* #04 */}
                        <article className="project-card featured reveal reveal-delay-1" onMouseMove={handleCardMouseMove}>
                            <div className="project-header">
                                <div className="project-icon"><MapPin size={20} /></div>
                                <div className="project-meta">
                                    <span className="project-number">#04</span>
                                    <span className="project-badge">Live</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3 className="project-title">Better Trips</h3>
                                <p className="project-description">Responsive web application showcasing nearby attractions via Geoapify with advanced filters and routing capabilities.</p>
                                <div className="tech-stack">
                                    <span className="tech-tag">JavaScript</span>
                                    <span className="tech-tag">Geoapify API</span>
                                </div>
                            </div>
                            <div className="project-footer">
                                <a href="https://github.com/bhaskar2004/better-trips" className="project-link secondary" target="_blank" rel="noopener noreferrer">
                                    <span>Code</span><Github size={13} />
                                </a>
                                <a href="https://better-trips.vercel.app/" className="project-link primary" target="_blank" rel="noopener noreferrer">
                                    <span>Live</span><ArrowUpRight size={13} />
                                </a>
                            </div>
                        </article>

                        {/* #05 */}
                        <article className="project-card featured" onMouseMove={handleCardMouseMove}>
                            <div className="project-header">
                                <div className="project-icon"><HeartPulse size={20} /></div>
                                <div className="project-meta">
                                    <span className="project-number">#05</span>
                                    <span className="project-badge">Live</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3 className="project-title">Blood Donor</h3>
                                <p className="project-description">Web platform that efficiently connects people in need of blood with available donors in their area.</p>
                                <div className="tech-stack">
                                    <span className="tech-tag">Web</span>
                                    <span className="tech-tag">Database</span>
                                </div>
                            </div>
                            <div className="project-footer">
                                <a href="https://github.com/bhaskar2004/blood-donor" className="project-link secondary" target="_blank" rel="noopener noreferrer">
                                    <span>Code</span><Github size={13} />
                                </a>
                                <a href="https://bhaskar2004.github.io/blood-donor/" className="project-link primary" target="_blank" rel="noopener noreferrer">
                                    <span>Live</span><ArrowUpRight size={13} />
                                </a>
                            </div>
                        </article>

                        {/* #06 */}
                        <article className="project-card featured" onMouseMove={handleCardMouseMove}>
                            <div className="project-header">
                                <div className="project-icon"><Newspaper size={20} /></div>
                                <div className="project-meta">
                                    <span className="project-number">#06</span>
                                    <span className="project-badge">Live</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3 className="project-title">Feedx</h3>
                                <p className="project-description">Clean and elegant news aggregator delivering the latest headlines from multiple trusted sources in one place.</p>
                                <div className="tech-stack">
                                    <span className="tech-tag">API Integration</span>
                                    <span className="tech-tag">Frontend</span>
                                </div>
                            </div>
                            <div className="project-footer">
                                <a href="https://github.com/bhaskar2004/feedx" className="project-link secondary" target="_blank" rel="noopener noreferrer">
                                    <span>Code</span><Github size={13} />
                                </a>
                                <a href="https://feedx.bhaskar.xyz/" className="project-link primary" target="_blank" rel="noopener noreferrer">
                                    <span>Live</span><ArrowUpRight size={13} />
                                </a>
                            </div>
                        </article>

                        {/* #07 */}
                        <article className="project-card featured" onMouseMove={handleCardMouseMove}>
                            <div className="project-header">
                                <div className="project-icon"><Code2 size={20} /></div>
                                <div className="project-meta">
                                    <span className="project-number">#07</span>
                                    <span className="project-badge">Live</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3 className="project-title">CodePreview</h3>
                                <p className="project-description">Intuitive web-based application for previewing and testing code snippets in real-time with instant visual feedback.</p>
                                <div className="tech-stack">
                                    <span className="tech-tag">HTML/CSS</span>
                                    <span className="tech-tag">JavaScript</span>
                                </div>
                            </div>
                            <div className="project-footer">
                                <a href="https://github.com/bhaskar2004/code-preview" className="project-link secondary" target="_blank" rel="noopener noreferrer">
                                    <span>Code</span><Github size={13} />
                                </a>
                                <a href="https://preview.bhaskar.xyz/" className="project-link primary" target="_blank" rel="noopener noreferrer">
                                    <span>Live</span><ArrowUpRight size={13} />
                                </a>
                            </div>
                        </article>

                        {/* #08 */}
                        <article className="project-card featured" onMouseMove={handleCardMouseMove}>
                            <div className="project-header">
                                <div className="project-icon"><Calculator size={20} /></div>
                                <div className="project-meta">
                                    <span className="project-number">#08</span>
                                    <span className="project-badge">Live</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3 className="project-title">Advanced Scientific Calculator</h3>
                                <p className="project-description">Modern, feature-rich scientific calculator with elegant UI, supporting advanced mathematical operations and conversions.</p>
                                <div className="tech-stack">
                                    <span className="tech-tag">HTML/CSS</span>
                                    <span className="tech-tag">JavaScript</span>
                                </div>
                            </div>
                            <div className="project-footer">
                                <a href="https://github.com/bhaskar2004/modernCalculator" className="project-link secondary" target="_blank" rel="noopener noreferrer">
                                    <span>Code</span><Github size={13} />
                                </a>
                                <a href="https://bhaskar2004.github.io/modernCalculator/" className="project-link primary" target="_blank" rel="noopener noreferrer">
                                    <span>Live</span><ArrowUpRight size={13} />
                                </a>
                            </div>
                        </article>

                    </div>
                </div>
            </section>

            {/* ── Contact ─────────────────────────────────────────────── */}
            <section className="contact" id="contact" ref={useScrollReveal()}>
                <div className="container">
                    <div className="reveal">
                        <span className="section-eyebrow">Contact</span>
                        <h2>Contact Bhaskar T</h2>
                        <p className="contact-description">
                            I'm open to work and collaborations.<br />Let's build something together.
                        </p>
                    </div>

                    <div className="contact-links" role="list">
                        <a
                            href="mailto:bhaskart.dev@gmail.com"
                            className="contact-item reveal reveal-delay-1"
                            role="listitem"
                            aria-label="Email Bhaskar T"
                        >
                            <Mail size={18} />
                            <span>bhaskart.dev@gmail.com</span>
                        </a>
                        <a
                            href="https://github.com/bhaskar2004"
                            target="_blank"
                            rel="noopener noreferrer me"
                            className="contact-item reveal reveal-delay-2"
                            role="listitem"
                            aria-label="Bhaskar T on GitHub"
                        >
                            <Github size={18} />
                            <span>github.com/bhaskar2004</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/bhaskart2004/"
                            target="_blank"
                            rel="noopener noreferrer me"
                            className="contact-item reveal reveal-delay-3"
                            role="listitem"
                            aria-label="Bhaskar T on LinkedIn"
                        >
                            <Linkedin size={18} />
                            <span>linkedin.com/in/bhaskart2004</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home