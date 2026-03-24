import { useState, useRef, useEffect } from 'react'
import {
    ArrowTopRightIcon,
    RocketIcon,
    PaperPlaneIcon as PaperPlaneIcon,
    LightningBoltIcon,
    SewingPinIcon,
    HeartIcon,
    FileTextIcon,
    CodeIcon,
    KeyboardIcon,
    HomeIcon,
    GitHubLogoIcon,
    LinkedInLogoIcon,
    EnvelopeClosedIcon,
    ExternalLinkIcon
} from '@radix-ui/react-icons'
import SEO from '../components/SEO'
import { Link } from 'react-router-dom'
import './Home.css'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Typewriter from '../components/animations/Typewriter'
import HighlightSwipe from '../components/animations/HighlightSwipe'
import NumberCounter from '../components/animations/NumberCounter'
import { projects } from '../data/projects'

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
            <span key={index} className="char-fade" style={{ transitionDelay: `${index * 0.02}s` }}>
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
                {/* Floating gradient orbs */}
                <div className="floating-orb floating-orb--primary" style={{ width: '500px', height: '500px', top: '10%', right: '-5%' }} aria-hidden="true" />
                <div className="floating-orb floating-orb--secondary" style={{ width: '350px', height: '350px', bottom: '10%', left: '-8%', animationDelay: '3s' }} aria-hidden="true" />
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
                    <p className="subtitle font-mono reveal reveal-delay-3" itemProp="description" style={{ minHeight: '48px' }}>
                        <Typewriter text="Software Tester & Problem Solver. Specialized in Quality Assurance and Automated Testing." delay={25} startDelay={500} />
                    </p>

                    {/* CTA buttons */}
                    <div className="cta-buttons reveal reveal-delay-4">
                        <a href="#contact" className="btn primary">Get in Touch</a>
                        <a href="#projects" className="btn secondary">Explore Work</a>
                        <a
                            href="/resume.pdf"
                            download="Bhaskar_T_Resume.pdf"
                            className="btn outline"
                            aria-label="DownloadIcon Bhaskar T resume PDF"
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
                            <GitHubLogoIcon width={20} height={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/bhaskart2004/"
                            target="_blank"
                            rel="noopener noreferrer me"
                            aria-label="Visit Bhaskar T on LinkedIn"
                            itemProp="sameAs"
                            role="listitem"
                        >
                            <LinkedInLogoIcon width={20} height={20} />
                        </a>
                        <a
                            href="mailto:bhaskart.dev@gmail.com"
                            aria-label="Send Bhaskar T an email"
                            itemProp="email"
                            role="listitem"
                        >
                            <EnvelopeClosedIcon width={20} height={20} />
                        </a>
                    </div>
                </div>
            </section>

            {/* Animated divider */}
            <div className="animated-divider" aria-hidden="true" />

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
                            My focus is on <HighlightSwipe delay={300}>making software solid, reliable, and production-ready.</HighlightSwipe>
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
                            <span className="stat-value"><NumberCounter end={9} suffix="+" duration={2000} delay={200} /></span>
                            <span className="stat-label">Projects Built</span>
                        </div>
                        <div className="stat-card reveal reveal-delay-2">
                            <span className="stat-value"><NumberCounter end={3} suffix="+" duration={2000} delay={400} /></span>
                            <span className="stat-label">Years Coding</span>
                        </div>
                        <div className="stat-card reveal reveal-delay-3">
                            <span className="stat-value"><NumberCounter end={4} duration={2000} delay={600} /></span>
                            <span className="stat-label">Languages</span>
                        </div>
                        {/* <div className="stat-card reveal reveal-delay-4">
                            <span className="stat-value">∞</span>
                            <span className="stat-label">Bugs Squashed</span>
                        </div> */}
                    </div>
                </div>
            </section>

            {/* Animated divider */}
            <div className="animated-divider" aria-hidden="true" />

            {/* ── Projects ────────────────────────────────────────────── */}
            <section className="projects" id="projects" ref={useScrollReveal()}>
                <div className="container">
                    <div className="projects-header reveal">
                        <div>
                            <span className="section-eyebrow">Work</span>
                            <h2>Featured Projects</h2>
                        </div>
                        <span className="projects-count reveal reveal-delay-1">{projects.length.toString().padStart(2, '0')} projects</span>
                    </div>

                    <div className="projects-grid stagger-grid reveal reveal-delay-1">
                        {projects.map((project, index) => (
                            <Link 
                                to={`/project/${project.id}`} 
                                key={project.id}
                                className={`project-card-link ${project.featured ? 'featured-link' : ''}`}
                            >
                                <article 
                                    className={`project-card ${project.featured ? 'featured' : ''} reveal`} 
                                    style={{ transitionDelay: `${index * 0.1}s` }}
                                    onMouseMove={handleCardMouseMove}
                                >
                                    <div className="project-header">
                                        <div className="project-icon">
                                            <project.icon width={20} height={20} />
                                        </div>
                                        <div className="project-meta">
                                            <span className="project-number">#{project.number}</span>
                                            {project.featured && <span className="project-badge">Live</span>}
                                        </div>
                                    </div>
                                    <div className="project-body">
                                        <h3 className="project-title">{project.title}</h3>
                                        <p className="project-description">{project.brief}</p>
                                        <div className="tech-stack">
                                            {project.tech.map(t => (
                                                <span key={t} className="tech-tag">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="project-footer">
                                        <div className="project-link primary">
                                            <span>View Details</span>
                                            <ArrowTopRightIcon width={13} height={13} />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Animated divider */}
            <div className="animated-divider" aria-hidden="true" />

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
                            <EnvelopeClosedIcon width={18} height={18} />
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
                            <GitHubLogoIcon width={18} height={18} />
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
                            <LinkedInLogoIcon width={18} height={18} />
                            <span>linkedin.com/in/bhaskart2004</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home