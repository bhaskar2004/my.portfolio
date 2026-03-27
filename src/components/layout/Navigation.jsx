import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SunIcon, MoonIcon, GitHubLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { useTheme } from '../../context/ThemeContext'
import './Navigation.css'

const NAV_LINKS = [
    { label: 'About', type: 'hash', id: 'about' },
    { label: 'Projects', type: 'hash', id: 'projects' },
    { label: 'Contact', type: 'hash', id: 'contact' },
    { label: 'Workshops', type: 'route', path: '/workshops' },
    { label: 'Resume', type: 'route', path: '/resume' },
]

const useScrolled = (threshold = 20) => {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        let rafId
        const onScroll = () => {
            cancelAnimationFrame(rafId)
            rafId = requestAnimationFrame(() => {
                setScrolled(window.scrollY > threshold)
            })
        }

        window.addEventListener('scroll', onScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', onScroll)
            cancelAnimationFrame(rafId)
        }
    }, [threshold])

    return scrolled
}

const Navigation = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const navRef = useRef(null)
    const isScrolled = useScrolled()
    const { theme, toggleTheme } = useTheme()
    const location = useLocation()
    const navigate = useNavigate()
    const isHome = location.pathname === '/'

    // Close menu on route change
    useEffect(() => {
        setIsMobileOpen(false)
    }, [location.pathname])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [isMobileOpen])

    // Close menu on ESC key
    useEffect(() => {
        if (!isMobileOpen) return

        const onKey = (e) => {
            if (e.key === 'Escape') setIsMobileOpen(false)
        }

        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [isMobileOpen])

    const close = useCallback(() => setIsMobileOpen(false), [])

    const handleHashLink = useCallback((id) => {
        close()

        if (!isHome) {
            navigate(`/#${id}`)
            return
        }

        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }, [isHome, navigate, close])

    const isActive = useCallback((path) => {
        if (path === '/') return location.pathname === '/'
        return location.pathname.startsWith(path)
    }, [location.pathname])

    return (
        <>
            <nav
                ref={navRef}
                id="navbar"
                className={isScrolled ? 'scrolled' : ''}
                aria-label="Main navigation"
            >
                {/* Logo */}
                <Link to="/" className="logo" aria-label="Bhaskar T — Home">
                    <img
                        src="/logo.png"
                        alt="Bhaskar T"
                        className="logo-img"
                        width="36"
                        height="36"
                    />
                </Link>

                {/* Nav Links */}
                <div 
                    className={`nav-links-container${isMobileOpen ? ' active' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="nav-mobile-header">
                        <span className="nav-mobile-label font-mono">Navigation</span>
                    </div>

                    <ul
                        id="nav-links"
                        className="nav-links"
                        role="list"
                    >
                        {NAV_LINKS.map(({ label, type, id, path }) =>
                            type === 'hash' ? (
                                <li key={id}>
                                    <a
                                        href={`/#${id}`}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleHashLink(id)
                                        }}
                                    >
                                        <span className="link-num font-mono">0{NAV_LINKS.findIndex(n => n.id === id) + 1}</span>
                                        <span className="link-text">{label}</span>
                                    </a>
                                </li>
                            ) : (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        className={isActive(path) ? 'active' : ''}
                                        onClick={close}
                                    >
                                        <span className="link-num font-mono">0{NAV_LINKS.findIndex(n => n.path === path) + 1}</span>
                                        <span className="link-text">{label}</span>
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>

                    <div className="nav-mobile-footer">
                        <div className="nav-mobile-label font-mono">Social</div>
                        <div className="nav-mobile-socials">
                            <a href="https://github.com/bhaskar2004" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <GitHubLogoIcon width={20} height={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/bhaskart2004/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <LinkedInLogoIcon width={20} height={20} />
                            </a>
                            <a href="mailto:bhaskart.dev@gmail.com" aria-label="Email">
                                <EnvelopeClosedIcon width={20} height={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <span className="nav-divider" aria-hidden="true" />

                {/* Theme Toggle */}
                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    {theme === 'dark'
                        ? <SunIcon width={18} height={18} />
                        : <MoonIcon width={18} height={18} />
                    }
                </button>

                {/* Mobile Menu Toggle */}
                <button
                    className={`menu-toggle${isMobileOpen ? ' active' : ''}`}
                    onClick={() => setIsMobileOpen(prev => !prev)}
                    aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-expanded={isMobileOpen}
                    aria-controls="nav-links"
                >
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </button>
            </nav>

            {/* Backdrop */}
            {isMobileOpen && (
                <div
                    className="nav-backdrop"
                    onClick={close}
                    aria-hidden="true"
                />
            )}
        </>
    )
}

export default Navigation