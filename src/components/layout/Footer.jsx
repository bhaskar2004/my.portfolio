import { Link } from 'react-router-dom'
import {
    GitHubLogoIcon,
    LinkedInLogoIcon,
    EnvelopeClosedIcon,
    ExternalLinkIcon
} from '@radix-ui/react-icons'
import './Footer.css'

const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className="footer-container">
            <div className="container">
                {/* ── Tier 1: Branding ── */}
                <div className="footer-upper">
                    <div className="footer-brand">
                        <h2 className="footer-logo-massive">Bhaskar T</h2>
                        <div className="footer-tagline-expanded">
                            <span>Software Tester & QA Engineer</span>
                            <span className="dot-separator">•</span>
                            <span>Problem Solver</span>
                        </div>
                    </div>
                    <div className="footer-cta">
                        <a
                            href="https://fresnel.bhaskar.xyz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-external-link"
                        >
                            <span>Explore Photography Portfolio</span>
                            <ExternalLinkIcon />
                        </a>
                    </div>
                </div>

                {/* ── Tier 2: Links Grid ── */}
                <div className="footer-middle-grid">
                    <div className="footer-column">
                        <h3 className="footer-label">Navigation</h3>
                        <nav className="footer-nav-list">
                            <Link to="/" className="footer-nav-link">Home</Link>
                            <Link to="/#about" className="footer-nav-link">About</Link>
                            <Link to="/#projects" className="footer-nav-link">Projects</Link>
                            <Link to="/#contact" className="footer-nav-link">Contact</Link>
                            <Link to="/workshops" className="footer-nav-link">Workshops</Link>
                            <Link to="/resume" className="footer-nav-link">Resume</Link>
                        </nav>
                    </div>


                    <div className="footer-column">
                        <h3 className="footer-label">Connect</h3>
                        <div className="footer-social-icons">
                            <a href="https://github.com/bhaskar2004" target="_blank" rel="noopener noreferrer" className="footer-icon-btn" aria-label="GitHub">
                                <GitHubLogoIcon />
                            </a>
                            <a href="https://www.linkedin.com/in/bhaskart2004/" target="_blank" rel="noopener noreferrer" className="footer-icon-btn" aria-label="LinkedIn">
                                <LinkedInLogoIcon />
                            </a>
                            <a href="mailto:bhaskart.dev@gmail.com" className="footer-icon-btn" aria-label="Email">
                                <EnvelopeClosedIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-divider-wrap">
                <div className="footer-divider-line"></div>
            </div>

            {/* ── Tier 3: Bottom Bar ── */}
            <div className="footer-bottom">
                <div className="container footer-bottom-inner">
                    <div className="footer-copyright">
                        © {year} Bhaskar T. <span>Crafted with Precision.</span>
                    </div>
                    <div className="footer-legal">
                        <span className="font-mono">INDIA / GLOBAL</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer