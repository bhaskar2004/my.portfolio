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

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const projectIndex = projects.findIndex(p => p.id === id);
    const project = projects[projectIndex];
    const nextProject = projects[projectIndex + 1] ?? projects[0];

    const [scrollProgress, setScrollProgress] = useState(0);
    const [coords, setCoords] = useState({ x: 50, y: 50 });
    const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

    const cardRef = useRef(null);
    const tiltRaf = useRef(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    /* ── Scroll progress ── */
    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement;
            setScrollProgress(
                el.scrollHeight > el.clientHeight
                    ? (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
                    : 0
            );
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ── Page cursor glow ── */
    const handlePageMouseMove = useCallback((e) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    }, []);

    /* ── Card 3D tilt ── */
    const handleCardMouseMove = useCallback((e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = (e.clientY - rect.top) / rect.height;
        const tx = (nx - 0.5) * 2;
        const ty = (ny - 0.5) * 2;

        if (tiltRaf.current) cancelAnimationFrame(tiltRaf.current);
        tiltRaf.current = requestAnimationFrame(() => {
            card.style.transform =
                `perspective(900px) rotateY(${tx * 8}deg) rotateX(${-ty * 6}deg) scale3d(1.02,1.02,1.02)`;
            card.style.setProperty('--glare-x', `${nx * 100}%`);
            card.style.setProperty('--glare-y', `${ny * 100}%`);
            setCoords({ x: Math.round(nx * 100), y: Math.round(ny * 100) });
        });
    }, []);

    const handleCardMouseLeave = useCallback(() => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
        setCoords({ x: 50, y: 50 });
    }, []);

    if (!project) {
        return (
            <div className="container" style={{ padding: '120px 20px', textAlign: 'center' }}>
                <h1 className="font-display">Project Not Found</h1>
                <p className="font-mono" style={{ margin: '24px 0' }}>
                    The project you're looking for doesn't exist.
                </p>
                <Link to="/" className="btn primary">Back to Home</Link>
            </div>
        );
    }

    const hasReadme = project.readme && project.readme.trim().length > 0;

    return (
        <div
            className="page-transition-wrapper pd-page"
            onMouseMove={handlePageMouseMove}
        >
            {/* Ambient cursor glow */}
            <div
                className="pd-cursor-glow"
                style={{ '--cx': `${cursorPos.x}px`, '--cy': `${cursorPos.y}px` }}
                aria-hidden="true"
            />

            {/* Scroll progress */}
            <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

            <SEO title={`${project.title} | Projects`} description={project.brief} />

            <div className="project-detail" ref={useScrollReveal()}>
                <div className="container">

                    {/* Back nav */}
                    <nav className="detail-nav reveal">
                        <Link to="/#projects" className="back-link font-mono">
                            <span className="back-arrow"><ArrowLeftIcon width={13} height={13} /></span>
                            Back to Projects
                        </Link>
                    </nav>

                    {/* Hero */}
                    <header className="detail-header">
                        <span className="hero-ghost-num font-display" aria-hidden="true">
                            {String(project.number).padStart(2, '0')}
                        </span>

                        <div className="header-eyebrow reveal">
                            <project.icon width={16} height={16} />
                            <span className="project-num font-mono">#{project.number}</span>
                            <span className="eyebrow-divider" aria-hidden="true">—</span>
                            <span className="eyebrow-label font-mono">Project</span>
                        </div>

                        <h1 className="detail-title reveal">
                            <HighlightSwipe delay={300}>{project.title}</HighlightSwipe>
                        </h1>

                        <p className="detail-brief font-mono reveal reveal-delay-1" style={{ minHeight: '40px' }}>
                            <Typewriter text={project.brief} delay={20} startDelay={600} />
                        </p>

                        {/* Stats */}
                        <div className="stats-strip reveal reveal-delay-1">
                            <div className="stat-pill">
                                <span className="stat-label font-mono">Stack</span>
                                <span className="stat-value font-mono">{project.tech.length} tools</span>
                            </div>
                            <span className="stat-sep" aria-hidden="true" />
                            <div className="stat-pill">
                                <span className="stat-label font-mono">Status</span>
                                <span className="stat-value stat-active font-mono">
                                    <span className="stat-live-dot" />
                                    Active
                                </span>
                            </div>
                            <span className="stat-sep" aria-hidden="true" />
                            <div className="stat-pill">
                                <span className="stat-label font-mono">Type</span>
                                <span className="stat-value font-mono">Web App</span>
                            </div>
                            {hasReadme && (
                                <>
                                    <span className="stat-sep" aria-hidden="true" />
                                    <div className="stat-pill">
                                        <span className="stat-label font-mono">Docs</span>
                                        <span className="stat-value stat-active font-mono">
                                            <span className="stat-live-dot" />
                                            README
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* CTAs */}
                        <div className="detail-ctas reveal reveal-delay-2">
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer"
                                    className="btn primary">
                                    <GitHubLogoIcon width={14} height={14} />
                                    View Source
                                </a>
                            )}
                            {project.live && (
                                <a href={project.live} target="_blank" rel="noopener noreferrer"
                                    className="btn secondary">
                                    <ExternalLinkIcon width={14} height={14} />
                                    Live Demo
                                </a>
                            )}
                        </div>

                        <div className="header-rule reveal reveal-delay-2" aria-hidden="true">
                            <span className="rule-line" />
                            <span className="rule-dot" />
                            <span className="rule-line rule-line--short" />
                        </div>
                    </header>

                    {/* Content grid */}
                    <div className="detail-content reveal reveal-delay-2">

                        {/* Main column */}
                        <div className="content-main">
                            <section className="detail-section">
                                <h2 className="section-title">
                                    <span className="section-num font-mono">01</span>
                                    <CodeIcon width={12} height={12} />
                                    Overview
                                </h2>
                                <p className="description-text">{project.description}</p>
                            </section>

                            <section className="detail-section">
                                <h2 className="section-title">
                                    <span className="section-num font-mono">02</span>
                                    <LayersIcon width={12} height={12} />
                                    Tech Stack
                                </h2>
                                <div className="detail-tags">
                                    {project.tech.map((t, i) => (
                                        <span
                                            key={t}
                                            className="tech-tag large"
                                            style={{ '--tag-delay': `${i * 50}ms` }}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {hasReadme && (
                                <section className="detail-section readme-section reveal">
                                    <h2 className="section-title">
                                        <span className="section-num font-mono">03</span>
                                        <ReaderIcon width={12} height={12} />
                                        README
                                    </h2>
                                    <div className="readme-body">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {project.readme}
                                        </ReactMarkdown>
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar card */}
                        <aside className="content-visual reveal reveal-delay-3">
                            <div
                                className="visual-card-wrap"
                                ref={cardRef}
                                onMouseMove={handleCardMouseMove}
                                onMouseLeave={handleCardMouseLeave}
                            >
                                <div className="card-glare" />
                                <div className="card-dot-grid" aria-hidden="true" />

                                {/* Top bar */}
                                <div className="card-header">
                                    <span className="card-title-bar font-mono">
                                        {project.title.toLowerCase().replace(/\s+/g, '-')}.app
                                    </span>
                                    <span className="card-status-badge font-mono">
                                        <span className="card-status-dot" />
                                        live
                                    </span>
                                </div>

                                {/* Corner brackets */}
                                <span className="bracket bracket--tl" aria-hidden="true" />
                                <span className="bracket bracket--tr" aria-hidden="true" />
                                <span className="bracket bracket--bl" aria-hidden="true" />
                                <span className="bracket bracket--br" aria-hidden="true" />

                                {/* Icon */}
                                <div className="card-mockup">
                                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div className="mockup-ring-outer" />
                                        <div className="mockup-ring">
                                            <project.icon width={44} height={44} className="mockup-icon" />
                                        </div>
                                    </div>
                                    <span className="mockup-label font-mono">{project.title}</span>
                                </div>

                                {/* Coord readout */}
                                <div className="coord-display font-mono" aria-hidden="true">
                                    <span>x: {String(coords.x).padStart(3, '0')}</span>
                                    <span>y: {String(coords.y).padStart(3, '0')}</span>
                                </div>

                                <div className="scan-line" aria-hidden="true" />
                            </div>

                            {/* Meta */}
                            <div className="card-meta font-mono">
                                <span className="meta-item">
                                    <span className="meta-dot" />
                                    {project.tech.length} technologies
                                </span>
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="meta-item meta-link"
                                    >
                                        <GitHubLogoIcon width={10} height={10} />
                                        Source
                                    </a>
                                )}
                            </div>
                        </aside>

                    </div>
                </div>
            </div>

            {/* Next project pill */}
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

export default ProjectDetail;