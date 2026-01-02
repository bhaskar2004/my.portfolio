import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-left">
                    <div className="footer-logo">Bhaskar T </div>
                    <a href="https://telos.bhaskar.xyz" target="_blank" rel="noopener noreferrer" className="footer-tagline">Photography website</a>
                </div>

                <div className="footer-center">
                    <div className="footer-section-title">Navigate</div>
                    <a href="#about" className="footer-link">About</a>
                    <Link to="/#projects" className="footer-link">Projects</Link>
                    <a href="#contact" className="footer-link">Contact</a>
                    <Link to="/workshops" className="footer-link">Workshops & Events</Link>
                </div>

                <div className="footer-right">
                    <div className="footer-section-title">Connect</div>
                    <div className="footer-social-container">
                        <a href="https://github.com/bhaskar2004" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="GitHub">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/bhaskart2004/" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="LinkedIn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                        <a href="mailto:bhaskart.dev@gmail.com" className="footer-social" aria-label="Email">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2025 <span>Bhaskar</span> — All Rights Reserved</p>
            </div>
        </footer>
    )
}

export default Footer
