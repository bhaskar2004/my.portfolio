import SEO from '../components/SEO'
import { Link } from 'react-router-dom'
import {
    ArrowLeftIcon,
    Component1Icon,
    DownloadIcon,
    ExternalLinkIcon,
    FileTextIcon
} from '@radix-ui/react-icons'
import { useState, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Typewriter from '../components/animations/Typewriter'
import HighlightSwipe from '../components/animations/HighlightSwipe'
import './Resume.css'

const Resume = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [pdfError, setPdfError] = useState(false)

    useEffect(() => {
        fetch('/resume.pdf', { method: 'HEAD' })
            .then(response => { if (!response.ok) setPdfError(true) })
            .catch(() => setPdfError(true))
    }, [])

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