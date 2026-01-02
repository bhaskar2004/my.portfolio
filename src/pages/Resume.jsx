import { Link } from 'react-router-dom'
import { ArrowLeft, Printer, Download, ExternalLink, FileText } from 'lucide-react'
import { useState, useEffect } from 'react'
import './Resume.css'

const Resume = () => {
    const [pdfError, setPdfError] = useState(false)

    useEffect(() => {
        // Check if PDF exists
        fetch('/resume.pdf', { method: 'HEAD' })
            .then(response => {
                if (!response.ok) setPdfError(true)
            })
            .catch(() => setPdfError(true))
    }, [])

    const handlePrint = () => {
        // Open PDF in new window and trigger print
        const printWindow = window.open('/resume.pdf', '_blank')
        if (printWindow) {
            printWindow.onload = () => {
                printWindow.print()
            }
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
        <div className="resume-page">
            <div className="container">
                <div className="header">
                    <h1>Resume</h1>
                    <p>Bhaskar T | Front-End Developer & Problem Solver</p>
                </div>

                <div className="actions">
                    <Link to="/" className="btn">
                        <ArrowLeft size={16} />
                        <span>Back to Portfolio</span>
                    </Link>
                    <button onClick={handlePrint} className="btn primary">
                        <Printer size={16} />
                        <span>Print Resume</span>
                    </button>
                </div>

                <div className="pdf-viewer">
                    {pdfError ? (
                        <div className="pdf-fallback">
                            <FileText size={90} strokeWidth={1.5} />
                            <h3>Resume.pdf</h3>
                            <p>PDF file could not be loaded</p>
                            <div>
                                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn primary">
                                    <ExternalLink size={16} />
                                    <span>Open in New Tab</span>
                                </a>
                                <button onClick={handleDownload} className="btn">
                                    <Download size={16} />
                                    <span>Download PDF</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="pdf-container">
                            <object data="/resume.pdf" type="application/pdf" width="100%" height="100%">
                                <div className="pdf-fallback">
                                    <FileText size={90} strokeWidth={1.5} />
                                    <h3>Resume.pdf</h3>
                                    <p>Your browser doesn't support PDF preview</p>
                                    <div>
                                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn primary">
                                            <ExternalLink size={16} />
                                            <span>Open in New Tab</span>
                                        </a>
                                        <button onClick={handleDownload} className="btn">
                                            <Download size={16} />
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
    )
}

export default Resume   