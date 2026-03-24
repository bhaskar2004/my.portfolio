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
                <div className="footer-content">
                    {/* Left: brand */}
                    <div className="footer-left">
                        <div className="footer-logo">Bhaskar T</div>
                        <p className="footer-description">
                            Software Tester & Problem Solver<br />
                            Helping build reliable, bug-free software.
                        </p>
                        <a
                            href="https://fresnel.bhaskar.xyz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-tagline"
                        >
                            <ExternalLinkIcon width={14} height={14} />
                            <span>Photography Portfolio</span>
                        </a>
                    </div>

                    {/* Center: navigation */}
                    <div className="footer-center">
                        <div className="footer-section-title">Navigation</div>
                        <nav className="footer-nav">
                            <a href="#about" className="footer-link">About</a>
                            <Link to="/#projects" className="footer-link">Projects</Link>
                            <a href="#contact" className="footer-link">Contact</a>
                            <Link to="/workshops" className="footer-link">Workshops</Link>
                            <Link to="/resume" className="footer-link">Resume</Link>
                        </nav>
                    </div>

                    {/* Right: connect */}
                    <div className="footer-right">
                        <div className="footer-section-title">Connect</div>
                        <div className="footer-social-container">
                            <a
                                href="https://github.com/bhaskar2004"
                                target="_blank"
                                rel="noopener noreferrer me"
                                className="footer-social"
                                aria-label="GitHub"
                            >
                                <GitHubLogoIcon width={20} height={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/bhaskart2004/"
                                target="_blank"
                                rel="noopener noreferrer me"
                                className="footer-social"
                                aria-label="LinkedIn"
                            >
                                <LinkedInLogoIcon width={20} height={20} />
                            </a>
                            <a
                                href="mailto:bhaskart.dev@gmail.com"
                                className="footer-social"
                                aria-label="Email"
                            >
                                <EnvelopeClosedIcon width={20} height={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Bottom bar ── */}
            <div className="footer-bottom">
                <p>© {year} <span>Bhaskar T</span> — All rights reserved</p>
                <ul className="footer-bottom-links">
                    <li><a href="https://github.com/bhaskar2004" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                    <li><a href="https://www.linkedin.com/in/bhaskart2004/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                    <li><a href="mailto:bhaskart.dev@gmail.com">Email</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer