import { Link } from 'react-router-dom'
import { ArrowLeft, Printer, Download, ExternalLink, FileText } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Resume.css'

const Resume = () => {
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
            <div className="resume-page">
                <div className="container" ref={useScrollReveal()}>

                {/* ── Header ── */}
                <div className="header reveal">
                    <div className="header-text">
                        {/* eyebrow label */}
                        <span className="section-eyebrow">Document</span>
                        <h1>Resume</h1>
                        <p>Bhaskar T &nbsp;·&nbsp; Software Tester &amp; Problem Solver</p>
                    </div>

                    <div className="actions">
                        <Link to="/" className="btn">
                            <ArrowLeft size={15} />
                            <span>Back</span>
                        </Link>
                        <button onClick={handlePrint} className="btn primary">
                            <Printer size={15} />
                            <span>Print</span>
                        </button>
                        <button onClick={handleDownload} className="btn secondary">
                            <Download size={15} />
                            <span>Download</span>
                        </button>
                    </div>
                </div>

                {/* ── PDF Viewer ── */}
                <div className="pdf-viewer reveal reveal-delay-2" ref={useScrollReveal()}>
                    {pdfError ? (
                        <div className="pdf-fallback">
                            <FileText size={72} strokeWidth={1.2} />
                            <h3>Resume.pdf</h3>
                            <p>Could not load the PDF preview in your browser.</p>
                            <div className="pdf-fallback-actions">
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn primary"
                                >
                                    <ExternalLink size={14} />
                                    <span>Open in New Tab</span>
                                </a>
                                <button onClick={handleDownload} className="btn">
                                    <Download size={14} />
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
                                    <FileText size={72} strokeWidth={1.2} />
                                    <h3>Resume.pdf</h3>
                                    <p>Your browser doesn't support inline PDF preview.</p>
                                    <div className="pdf-fallback-actions">
                                        <a
                                            href="/resume.pdf"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn primary"
                                        >
                                            <ExternalLink size={14} />
                                            <span>Open in New Tab</span>
                                        </a>
                                        <button onClick={handleDownload} className="btn">
                                            <Download size={14} />
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