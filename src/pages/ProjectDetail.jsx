import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {
    ArrowLeftIcon,
    GitHubLogoIcon,
    ExternalLinkIcon,
    CodeIcon,
    LayersIcon,
    ReaderIcon,
} from '@radix-ui/react-icons';
import SEO from '../components/SEO';
import { projects } from '../data/projects';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Typewriter from '../components/animations/Typewriter';
import HighlightSwipe from '../components/animations/HighlightSwipe';
import './ProjectDetail.css';

/* ─── helpers ─────────────────────────────────────────────── */
const pad = (n, len = 2) => String(n).padStart(len, '0');
const slug = (s) => s.toLowerCase().replace(/\s+/g, '-');
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/* ─── component ───────────────────────────────────────────── */
const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const revealRef = useScrollReveal();

    const projectIndex = projects.findIndex(p => p.id === id);
    const project = projects[projectIndex];
    const nextProject = projects[projectIndex + 1] ?? projects[0];

    /* state */
    const [scrollProgress, setScrollProgress] = useState(0);
    const [coords, setCoords] = useState({ x: 50, y: 50 });
    const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

    /* refs */
    const cardRef = useRef(null);
    const tiltRafId = useRef(null);

    /* scroll to top on mount */
    useEffect(() => { window.scrollTo(0, 0); }, []);

    /* scroll-progress bar */
    useEffect(() => {
        const onScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const total = scrollHeight - clientHeight;
            setScrollProgress(total > 0 ? (scrollTop / total) * 100 : 0);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* cursor glow */
    const handlePageMouseMove = useCallback((e) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    }, []);

    /* card 3-D tilt */
    const handleCardMouseMove = useCallback((e) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const nx = clamp((e.clientX - rect.left) / rect.width, 0, 1);
        const ny = clamp((e.clientY - rect.top) / rect.height, 0, 1);
        const tx = (nx - 0.5) * 2;
        const ty = (ny - 0.5) * 2;

        cancelAnimationFrame(tiltRafId.current);
        tiltRafId.current = requestAnimationFrame(() => {
            card.style.transform = `perspective(900px) rotateY(${tx * 8}deg) rotateX(${-ty * 6}deg) scale3d(1.02,1.02,1.02)`;
            card.style.setProperty('--glare-x', `${nx * 100}%`);
            card.style.setProperty('--glare-y', `${ny * 100}%`);
            setCoords({ x: Math.round(nx * 100), y: Math.round(ny * 100) });
        });
    }, []);

    const handleCardMouseLeave = useCallback(() => {
        cancelAnimationFrame(tiltRafId.current);
        const card = cardRef.current;
        if (card) card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
        setCoords({ x: 50, y: 50 });
    }, []);

    /* ── not found ── */
    if (!project) {
        return (
            <div className="pd-not-found">
                <h1 className="font-display">Project Not Found</h1>
                <p className="font-mono">The project you're looking for doesn't exist.</p>
                <Link to="/" className="btn primary">Back to Home</Link>
            </div>
        );
    }

    const hasReadme = Boolean(project.readme?.trim());
    const sectionCount = hasReadme ? '03' : '02';

    return (
        <div
            className="page-transition-wrapper pd-page"
            onMouseMove={handlePageMouseMove}
        >
            {/* ambient cursor glow */}
            <div
                className="pd-cursor-glow"
                style={{ '--cx': `${cursorPos.x}px`, '--cy': `${cursorPos.y}px` }}
                aria-hidden="true"
            />

            {/* scroll progress */}
            <div
                className="scroll-progress-bar"
                style={{ width: `${scrollProgress}%` }}
                role="progressbar"
                aria-valuenow={Math.round(scrollProgress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Reading progress"
            />

            <SEO title={project.title} description={project.brief} />

            <div className="project-detail" ref={revealRef}>
                <div className="container">

                    {/* ── back nav ── */}
                    <nav className="detail-nav reveal" aria-label="Project navigation">
                        <Link to="/#projects" className="back-link font-mono">
                            <span className="back-arrow" aria-hidden="true">
                                <ArrowLeftIcon width={13} height={13} />
                            </span>
                            Back to Projects
                        </Link>
                    </nav>

                    {/* ── hero header ── */}
                    <header className="detail-header">
                        <span className="hero-ghost-num font-display" aria-hidden="true">
                            {pad(project.number)}
                        </span>

                        <div className="header-eyebrow reveal">
                            <project.icon width={16} height={16} aria-hidden="true" />
                            <span className="project-num font-mono">#{project.number}</span>
                            <span className="eyebrow-divider" aria-hidden="true">—</span>
                            <span className="eyebrow-label font-mono">Project</span>
                        </div>

                        <h1 className="detail-title reveal">
                            <HighlightSwipe delay={300} textColor="#000">
                                {project.title}
                            </HighlightSwipe>
                        </h1>

                        <p className="detail-brief font-mono reveal reveal-delay-1">
                            <Typewriter text={project.brief} delay={20} startDelay={600} />
                        </p>

                        {/* stats strip */}
                        <div className="stats-strip reveal reveal-delay-1" role="list">
                            <StatPill label="Stack" value={`${project.tech.length} tools`} />
                            <span className="stat-sep" aria-hidden="true" />
                            <StatPill label="Status" value="Active" live />
                            <span className="stat-sep" aria-hidden="true" />
                            <StatPill label="Type" value="Web App" />
                            {hasReadme && (
                                <>
                                    <span className="stat-sep" aria-hidden="true" />
                                    <StatPill label="Docs" value="README" live />
                                </>
                            )}
                        </div>

                        {/* CTAs */}
                        <div className="detail-ctas reveal reveal-delay-2">
                            {project.live && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn primary"
                                    aria-label={`Open live demo for ${project.title}`}
                                >
                                    <ExternalLinkIcon width={14} height={14} aria-hidden="true" />
                                    Live Demo
                                </a>
                            )}
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn secondary"
                                    aria-label={`View source code for ${project.title} on GitHub`}
                                >
                                    <GitHubLogoIcon width={14} height={14} aria-hidden="true" />
                                    Source Code
                                </a>
                            )}
                        </div>

                        <div className="header-rule reveal reveal-delay-2" aria-hidden="true">
                            <span className="rule-line" />
                            <span className="rule-dot" />
                            <span className="rule-line rule-line--short" />
                        </div>
                    </header>

                    {/* ── content grid ── */}
                    <div className="detail-content reveal reveal-delay-2">

                        {/* main column */}
                        <main className="content-main">
                            <section className="detail-section" aria-labelledby="section-overview">
                                <SectionTitle id="section-overview" num="01" icon={<CodeIcon width={12} height={12} />}>
                                    Overview
                                </SectionTitle>
                                <p className="description-text">{project.description}</p>
                            </section>

                            <section className="detail-section" aria-labelledby="section-stack">
                                <SectionTitle id="section-stack" num="02" icon={<LayersIcon width={12} height={12} />}>
                                    Tech Stack
                                </SectionTitle>
                                <div className="detail-tags" role="list">
                                    {project.tech.map((t, i) => (
                                        <span
                                            key={t}
                                            className="tech-tag large"
                                            style={{ '--tag-delay': `${i * 50}ms` }}
                                            role="listitem"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {hasReadme && (
                                <section className="detail-section readme-section reveal" aria-labelledby="section-readme">
                                    <SectionTitle id="section-readme" num="03" icon={<ReaderIcon width={12} height={12} />}>
                                        README
                                    </SectionTitle>
                                    <div className="readme-body">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {project.readme}
                                        </ReactMarkdown>
                                    </div>
                                </section>
                            )}
                        </main>

                        {/* sidebar card */}
                        <aside className="content-visual reveal reveal-delay-3" aria-label="Project preview card">
                            <div
                                className="visual-card-wrap"
                                ref={cardRef}
                                onMouseMove={handleCardMouseMove}
                                onMouseLeave={handleCardMouseLeave}
                            >
                                <div className="card-glare" aria-hidden="true" />
                                <div className="card-dot-grid" aria-hidden="true" />

                                {/* top bar */}
                                <div className="card-header">
                                    <span className="card-title-bar font-mono">
                                        {slug(project.title)}.app
                                    </span>
                                    <span className="card-status-badge font-mono">
                                        <span className="card-status-dot" aria-hidden="true" />
                                        live
                                    </span>
                                </div>

                                {/* corner brackets */}
                                {['tl', 'tr', 'bl', 'br'].map(pos => (
                                    <span key={pos} className={`bracket bracket--${pos}`} aria-hidden="true" />
                                ))}

                                {/* icon mockup */}
                                <div className="card-mockup">
                                    <div className="mockup-ring-container">
                                        <div className="mockup-ring-outer" aria-hidden="true" />
                                        <div className="mockup-ring">
                                            <project.icon width={44} height={44} className="mockup-icon" aria-hidden="true" />
                                        </div>
                                    </div>
                                    <span className="mockup-label font-mono">{project.title}</span>
                                </div>

                                {/* coordinate readout */}
                                <div className="coord-display font-mono" aria-hidden="true">
                                    <span>x: {pad(coords.x, 3)}</span>
                                    <span>y: {pad(coords.y, 3)}</span>
                                </div>

                                <div className="scan-line" aria-hidden="true" />
                            </div>

                            {/* meta */}
                            <div className="card-meta font-mono">
                                <span className="meta-item">
                                    <span className="meta-dot" aria-hidden="true" />
                                    {project.tech.length} technologies
                                </span>
                            </div>
                        </aside>

                    </div>
                </div>
            </div>

            {/* next project pill */}
            <button
                className="next-project-pill font-mono"
                onClick={() => navigate(`/project/${nextProject.id}`)}
                aria-label={`Next project: ${nextProject.title}`}
            >
                <span className="next-label">Next</span>
                <span className="next-sep" aria-hidden="true">→</span>
                <span className="next-title">{nextProject.title}</span>
            </button>
        </div>
    );
};

/* ─── sub-components ──────────────────────────────────────── */

/** Reusable stat pill — avoids repeating the same markup 4×. */
const StatPill = ({ label, value, live = false }) => (
    <div className="stat-pill" role="listitem">
        <span className="stat-label font-mono">{label}</span>
        <span className={`stat-value font-mono${live ? ' stat-active' : ''}`}>
            {live && <span className="stat-live-dot" aria-hidden="true" />}
            {value}
        </span>
    </div>
);

/** Reusable section heading with accessible id prop. */
const SectionTitle = ({ id, num, icon, children }) => (
    <h2 id={id} className="section-title">
        <span className="section-num font-mono">{num}</span>
        <span aria-hidden="true">{icon}</span>
        {children}
    </h2>
);

export default ProjectDetail;