import SEO from '../components/SEO'
import { Link } from 'react-router-dom'
import {
    ArrowLeftIcon,
    Component1Icon,
    DownloadIcon,
    ExternalLinkIcon,
    FileTextIcon,
    MagicWandIcon,
    TargetIcon,
    StarIcon
} from '@radix-ui/react-icons'
import { useState, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Typewriter from '../components/animations/Typewriter'
import HighlightSwipe from '../components/animations/HighlightSwipe'
import { generateJobMatch } from '../services/ai'
import './Resume.css'

const Resume = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [pdfError, setPdfError] = useState(false)
    const [jdText, setJdText] = useState('')
    const [matchResult, setMatchResult] = useState(null)
    const [isMatching, setIsMatching] = useState(false)

    useEffect(() => {
        fetch('/resume.pdf', { method: 'HEAD' })
            .then(response => { if (!response.ok) setPdfError(true) })
            .catch(() => setPdfError(true))
    }, [])

    const handleMatch = async () => {
        if (!jdText.trim() || isMatching) return;
        setIsMatching(true);
        try {
            const result = await generateJobMatch(jdText);
            setMatchResult(result);
        } catch (err) {
            console.error("Match error:", err);
        } finally {
            setIsMatching(false);
        }
    }

    const handlePrint = () => {
        const printWindow = window.open('/resume.pdf', '_blank')
        if (printWindow) {
            printWindow.onload = () => printWindow.print()
        }
    }

    const handleDownload = () => {
        const link = document.createElement('a')
        link.href = '/resume.pdf'
        link.download = 'Bhaskar_T_Resume.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="page-transition-wrapper">
            <SEO
                title="Interactive Resume"
                description="Download the professional resume of Bhaskar T, a Software Tester specializing in QA, Java, and Automation."
                url="/resume"
            />
            <div className="resume-page">
                <div className="container" ref={useScrollReveal()}>

                    {/* ── Header ── */}
                    <div className="header reveal">
                        <div className="header-text">
                            <span className="section-eyebrow">Document</span>
                            <h1><HighlightSwipe delay={300}>Resume</HighlightSwipe></h1>
                            <p style={{ minHeight: '27px' }}>
                                <Typewriter text="Bhaskar T · Software Tester & Problem Solver" delay={30} startDelay={600} />
                            </p>
                        </div>

                        <div className="actions">
                            <Link to="/" className="btn">
                                <ArrowLeftIcon width={15} height={15} />
                                <span>Back</span>
                            </Link>
                            <button onClick={handlePrint} className="btn primary">
                                <Component1Icon width={15} height={15} />
                                <span>Print</span>
                            </button>
                            <button onClick={handleDownload} className="btn secondary">
                                <DownloadIcon width={15} height={15} />
                                <span>Download</span>
                            </button>
                        </div>
                    </div>

                    {/* ── AI Spotlight Matcher ── */}
                    <div className="ai-spotlight reveal reveal-delay-1" ref={useScrollReveal()}>
                        <div className="spotlight-card">
                            <div className="spotlight-header">
                                <MagicWandIcon className="wand-icon" />
                                <h3>AI Resume Spotlight</h3>
                                <span className="beta-badge">BETA</span>
                            </div>
                            <p className="spotlight-desc">Paste a Job Description below to instantly see how my skills and projects match the role.</p>

                            <div className="matcher-input-group">
                                <textarea
                                    placeholder="Paste job description here..."
                                    value={jdText}
                                    onChange={(e) => setJdText(e.target.value)}
                                    disabled={isMatching}
                                />
                                <button
                                    className={`btn primary match-btn ${isMatching ? 'loading' : ''}`}
                                    onClick={handleMatch}
                                    disabled={!jdText.trim() || isMatching}
                                >
                                    {isMatching ? (
                                        <div className="bouncing-loader">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    ) : 'Analyze Match'}
                                </button>
                            </div>

                            {matchResult && (
                                <div className="match-result-container animate-in">
                                    <div className="match-score-card">
                                        <div className="score-ring">
                                            <span className="score-val">{matchResult.score}%</span>
                                            <span className="score-lbl">Match</span>
                                        </div>
                                        <div className="match-summary">
                                            <h4>Recruiter Insight</h4>
                                            <p>{matchResult.summary}</p>
                                        </div>
                                    </div>

                                    <div className="match-details-grid">
                                        <div className="match-item">
                                            <div className="item-label"><TargetIcon /> Matching Skills</div>
                                            <div className="skill-pills-row">
                                                {matchResult.matchingSkills.map((skill, i) => (
                                                    <span key={i} className="skill-pill-highlight">{skill}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="match-item">
                                            <div className="item-label"><StarIcon /> Top Relevant Project</div>
                                            <div className="project-highlight-box">
                                                {matchResult.topProject}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── PDF Viewer ── */}
                    <div className="pdf-viewer reveal reveal-delay-2" ref={useScrollReveal()}>
                        {pdfError ? (
                            <div className="pdf-fallback">
                                <FileTextIcon width={72} height={72} />
                                <h3>Resume.pdf</h3>
                                <p>Could not load the PDF preview in your browser.</p>
                                <div className="pdf-fallback-actions">
                                    <a
                                        href="/resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn primary"
                                    >
                                        <ExternalLinkIcon width={14} height={14} />
                                        <span>Open in New Tab</span>
                                    </a>
                                    <button onClick={handleDownload} className="btn">
                                        <DownloadIcon width={14} height={14} />
                                        <span>Download PDF</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="pdf-container">
                                <object
                                    data="/resume.pdf"
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                >
                                    <div className="pdf-fallback">
                                        <FileTextIcon width={72} height={72} />
                                        <h3>Resume.pdf</h3>
                                        <p>Your browser doesn't support inline PDF preview.</p>
                                        <div className="pdf-fallback-actions">
                                            <a
                                                href="/resume.pdf"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn primary"
                                            >
                                                <ExternalLinkIcon width={14} height={14} />
                                                <span>Open in New Tab</span>
                                            </a>
                                            <button onClick={handleDownload} className="btn">
                                                <DownloadIcon width={14} height={14} />
                                                <span>Download PDF</span>
                                            </button>
                                        </div>
                                    </div>
                                </object>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Resume

