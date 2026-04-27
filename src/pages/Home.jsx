import { useEffect, useMemo, memo } from 'react'
import {
    ArrowTopRightIcon,
    ChevronDownIcon,
    GitHubLogoIcon,
    LinkedInLogoIcon,
    EnvelopeClosedIcon,
    ArrowRightIcon
} from '@radix-ui/react-icons'
import SEO from '../components/SEO'
import { Link } from 'react-router-dom'
import './Home.css'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTheme } from '../context/ThemeContext'
import HighlightSwipe from '../components/animations/HighlightSwipe'
import { projects } from '../data/projects'
import ContactForm from '../components/contact/ContactForm'
import {
    HeroIllustration,
    AboutIllustration,
    ProjectsIllustration,
    ContactIllustration,
    FooterIllustration
} from '../components/illustrations/illustrations'
import '../components/illustrations/illustrations.css'

/* ── Helper: split text into individually animated chars ────── */
const AnimatedName = ({ text, theme }) => {
    return (
        <h1 className="hero-name" key={theme}>
            <span className="wipe-text">
                {text}
            </span>
        </h1>
    )
}

/* ── Project Card ──────────────────────────────────────────── */
const ProjectCard = memo(({ project, index, onMouseMove, onMouseLeave }) => (
    <Link
        to={`/project/${project.id}`}
        className={`project-card-link ${project.featured ? 'featured-link' : ''}`}
    >
        <article
            className={`project-card ${project.featured ? 'featured' : ''} reveal`}
            style={{ transitionDelay: `${index * 0.1}s` }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            <div className="project-card__spotlight" aria-hidden="true" />

            <div className="project-header">
                <div className="project-icon">
                    <project.icon width={18} height={18} />
                </div>
                <div className="project-meta">
                    <span className="project-number">#{project.number}</span>
                    {project.featured && (
                        <span className="project-badge">
                            <span className="badge-dot" aria-hidden="true" />
                            Live
                        </span>
                    )}
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
                <div className="project-link">
                    <span>View Details</span>
                    <ArrowTopRightIcon width={13} height={13} />
                </div>
            </div>
        </article>
    </Link>
))

/* ── Section Divider ───────────────────────────────────────── */
const SectionDivider = () => (
    <div className="section-divider" aria-hidden="true">
        <span className="section-divider__line" />
    </div>
)

/* ── Home Page ─────────────────────────────────────────────── */
const Home = () => {
    const { theme } = useTheme()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const heroRef = useScrollReveal()
    const aboutRef = useScrollReveal()
    const projectsRef = useScrollReveal()
    const contactRef = useScrollReveal()

    const handleCardMouseMove = (e) => {
        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        card.style.setProperty('--mouse-x', `${x * 100}%`)
        card.style.setProperty('--mouse-y', `${y * 100}%`)
        card.style.setProperty('--rotate-x', `${(0.5 - y) * 12}deg`)
        card.style.setProperty('--rotate-y', `${(x - 0.5) * 12}deg`)
    }

    const handleCardMouseLeave = (e) => {
        const card = e.currentTarget
        card.style.setProperty('--rotate-x', '0deg')
        card.style.setProperty('--rotate-y', '0deg')
    }

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

    return (
        <div className="page-transition-wrapper">
            <SEO
                isHome
                title="Software Tester Portfolio"
                description="Explore the professional portfolio of Bhaskar T, a specialized Software Tester & QA Engineer. View projects, certifications, and technical expertise."
                keywords="Software Tester Portfolio, QA Engineer India, Bhaskar T, Test Automation, bhaskar2004"
                faq={homeFaq}
            />

            {/* ── Hero ──────────────────────────────────────────── */}
            <section
                className="hero reveal-active"
                id="home"
                ref={heroRef}
                itemScope
                itemType="https://schema.org/Person"
            >
                {/* Warm gradient blobs */}
                <div className="hero-blob hero-blob--a" aria-hidden="true" />
                <div className="hero-blob hero-blob--b" aria-hidden="true" />

                {/* Schema meta */}
                <meta itemProp="name" content="Bhaskar T" />
                <meta itemProp="alternateName" content="bhaskar2004" />
                <meta itemProp="url" content="https://bhaskar.xyz" />
                <meta itemProp="email" content="bhaskart.dev@gmail.com" />
                <meta itemProp="jobTitle" content="Software Tester" />
                <meta itemProp="image" content="https://bhaskar.xyz/logo.png" />

                <div className="container hero-layout" key={theme}>
                    <div className="hero-content">
                        {/* Eyebrow */}
                        <div className="hero-eyebrow reveal" aria-label="Portfolio site">
                            <span className="hero-eyebrow__wave" aria-hidden="true">👋</span>
                            Hey, I'm
                        </div>

                        {/* Name — per-char animation */}
                        <AnimatedName text="Bhaskar T" theme={theme} />

                        {/* Subtitle */}
                        <p className="hero-subtitle reveal reveal-delay-3" itemProp="description">
                            Software Tester & Problem Solver. I find bugs before your users do, and make software rock-solid.
                        </p>

                        {/* CTA buttons */}
                        <div className="cta-buttons reveal reveal-delay-4">
                            <a href="#contact" className="btn btn--primary">
                                <span>Get in Touch</span>
                            </a>
                            <a href="#projects" className="btn btn--secondary">
                                <span>Explore Work</span>
                            </a>
                            <a
                                href="/resume.pdf"
                                download="Bhaskar_T_Resume.pdf"
                                className="btn btn--ghost"
                                aria-label="Download Bhaskar T resume PDF"
                            >
                                Résumé
                            </a>
                        </div>

                        {/* Social links */}
                        <div className="social-links reveal reveal-delay-5" role="list" aria-label="Social media links">
                            <a href="https://github.com/bhaskar2004" target="_blank" rel="noopener noreferrer me" aria-label="Visit Bhaskar T on GitHub" itemProp="sameAs" role="listitem" className="social-link">
                                <GitHubLogoIcon width={18} height={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/bhaskart2004/" target="_blank" rel="noopener noreferrer me" aria-label="Visit Bhaskar T on LinkedIn" itemProp="sameAs" role="listitem" className="social-link">
                                <LinkedInLogoIcon width={18} height={18} />
                            </a>
                            <a href="mailto:bhaskart.dev@gmail.com" aria-label="Send Bhaskar T an email" itemProp="email" role="listitem" className="social-link">
                                <EnvelopeClosedIcon width={18} height={18} />
                            </a>
                        </div>
                    </div>

                    {/* Illustration — visible on md+ */}
                    <div className="hero-illustration reveal reveal-delay-2">
                        <HeroIllustration />
                    </div>
                </div>

                {/* Scroll indicator — CSS hides on mobile */}
                <a href="#about" className="scroll-indicator" aria-label="Scroll to about section">
                    <span className="scroll-indicator__label">Scroll</span>
                    <ChevronDownIcon className="scroll-indicator__arrow" width={16} height={16} />
                </a>
            </section>

            <SectionDivider />

            {/* ── About ─────────────────────────────────────────── */}
            <section className="about" id="about" ref={aboutRef}>
                <div className="container">
                    {/* Header */}
                    <div className="about-header reveal">
                        <span className="section-eyebrow">
                            <span className="eyebrow-num">01</span> About
                        </span>
                        <h2>A bit about me</h2>
                        <p className="section-subtitle">
                            CS student by day, bug hunter by night. Quality is my obsession.
                        </p>
                    </div>

                    {/* Bento Grid */}
                    <div className="about-grid bento-grid">
                        {/* Card 1: Bio */}
                        <div className="about-card bento-card--bio reveal reveal-delay-2">
                            <div className="card-label">
                                <span className="card-label__dot" />
                                Who I Am
                            </div>
                            <p className="about-body">
                                I'm Bhaskar T (bhaskar2004) — a CS student who loves finding bugs.
                                I test software until something breaks, then figure out exactly why.
                                My focus is on <HighlightSwipe delay={300} textColor="var(--color-bg)">making software solid, reliable, and production-ready.</HighlightSwipe>{" "}
                                Details matter, and I'm kind of obsessed with getting them right.
                            </p>
                        </div>

                        {/* Card 2: Illustration */}
                        <div className="about-card bento-card--illustration reveal reveal-delay-3">
                            <AboutIllustration />
                        </div>

                        {/* Card 3: Education */}
                        <div className="about-card bento-card--edu reveal reveal-delay-4">
                            <div className="card-label">
                                <span className="card-label__dot" />
                                Education
                            </div>
                            <div className="edu-block">
                                <span className="edu-school">SJC Institute of Technology</span>
                                <span className="edu-degree">Computer Science Engineering</span>
                                <span className="edu-year">2022 – 2026</span>
                            </div>
                        </div>

                        {/* Card 4: Skills */}
                        <div className="about-card bento-card--skills reveal reveal-delay-5">
                            <div className="card-label">
                                <span className="card-label__dot" />
                                Tech Stack
                            </div>
                            <div className="skills-grid">
                                {['Manual-Testing', 'Java', 'GitHub', 'IntelliJ', 'VS Code',
                                    'Python', 'Photography', 'Video Editing'].map(s => (
                                        <span key={s} className="skill-tag">{s}</span>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* ── Projects ──────────────────────────────────────── */}
            <section className="projects" id="projects" ref={projectsRef}>
                <div className="container">
                    <div className="projects-header reveal">
                        <div>
                            <span className="section-eyebrow">
                                <span className="eyebrow-num">02</span> Work
                            </span>
                            <h2>Things I've built</h2>
                        </div>
                        <div className="projects-header__right">
                            <ProjectsIllustration />
                            <span className="projects-count reveal reveal-delay-1">
                                {projects.length.toString().padStart(2, '0')}
                            </span>
                        </div>
                    </div>

                    <div className="projects-grid">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                onMouseMove={handleCardMouseMove}
                                onMouseLeave={handleCardMouseLeave}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <SectionDivider />

            {/* ── Contact ───────────────────────────────────────── */}
            <section className="contact" id="contact" ref={contactRef}>
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-sidebar reveal reveal-delay-1">
                            <div className="contact-header-side">
                                <span className="section-eyebrow">
                                    <span className="eyebrow-num">03</span> Contact
                                </span>
                                <h2 className="contact-title">Let's Connect</h2>
                                <p className="contact-description">
                                    I'm open to work and collaborations.<br />Let's build something together.
                                </p>
                                <div className="contact-illustration-wrap">
                                    <ContactIllustration />
                                </div>
                            </div>

                            <div className="contact-info-list" role="list">
                                <a href="mailto:bhaskart.dev@gmail.com" className="contact-info-item" style={{ animationDelay: '0.1s' }}>
                                    <div className="info-icon"><EnvelopeClosedIcon /></div>
                                    <div className="info-text">
                                        <span className="info-label">Email</span>
                                        <span className="info-value">bhaskart.dev@gmail.com</span>
                                    </div>
                                    <ArrowRightIcon className="info-arrow" width={14} height={14} />
                                </a>
                                <a href="https://github.com/bhaskar2004" target="_blank" rel="noopener noreferrer" className="contact-info-item" style={{ animationDelay: '0.2s' }}>
                                    <div className="info-icon"><GitHubLogoIcon /></div>
                                    <div className="info-text">
                                        <span className="info-label">GitHub</span>
                                        <span className="info-value">bhaskar2004</span>
                                    </div>
                                    <ArrowRightIcon className="info-arrow" width={14} height={14} />
                                </a>
                                <a href="https://www.linkedin.com/in/bhaskart2004/" target="_blank" rel="noopener noreferrer" className="contact-info-item" style={{ animationDelay: '0.3s' }}>
                                    <div className="info-icon"><LinkedInLogoIcon /></div>
                                    <div className="info-text">
                                        <span className="info-label">LinkedIn</span>
                                        <span className="info-value">bhaskart2004</span>
                                    </div>
                                    <ArrowRightIcon className="info-arrow" width={14} height={14} />
                                </a>
                            </div>
                        </div>

                        <div className="contact-form-wrapper reveal reveal-delay-2">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home