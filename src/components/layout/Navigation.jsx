import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import './Navigation.css'

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileOpen] = useState(false)
    const { theme, toggleTheme } = useTheme()
    const location = useLocation()

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    /* Close mobile menu on route change */
    useEffect(() => { setIsMobileOpen(false) }, [location.pathname])

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/'
        return location.pathname.startsWith(path)
    }

    const scrollToSection = (sectionId) => {
        if (location.pathname !== '/') {
            window.location.href = `/#${sectionId}`
            return
        }
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
        setIsMobileOpen(false)
    }

    return (
        <nav className={isScrolled ? 'scrolled' : ''} id="navbar">

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

            {/* Nav links — conditionally scroll-spy or route links */}
            <ul className={`nav-links${isMobileMenuOpen ? ' active' : ''}`}>
                {location.pathname === '/' ? (
                    <>
                        <li><a href="#about" onClick={() => scrollToSection('about')}>About</a></li>
                        <li><a href="#projects" onClick={() => scrollToSection('projects')}>Projects</a></li>
                        <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/#about">About</Link></li>
                        <li><Link to="/#projects">Projects</Link></li>
                        <li><Link to="/#contact">Contact</Link></li>
                    </>
                )}
                <li>
                    <Link
                        to="/workshops"
                        className={isActive('/workshops') ? 'active' : ''}
                        onClick={() => setIsMobileOpen(false)}
                    >
                        Workshops
                    </Link>
                </li>
                <li>
                    <Link
                        to="/resume"
                        className={isActive('/resume') ? 'active' : ''}
                        onClick={() => setIsMobileOpen(false)}
                    >
                        Resume
                    </Link>
                </li>
            </ul>

            <span className="nav-divider" aria-hidden="true" />

            {/* Theme toggle */}
            <button
                id="theme-toggle"
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
                {theme === 'dark'
                    ? <Sun size={18} strokeWidth={1.8} />
                    : <Moon size={18} strokeWidth={1.8} />
                }
            </button>

            {/* Hamburger */}
            <button
                className={`menu-toggle${isMobileMenuOpen ? ' active' : ''}`}
                onClick={() => setIsMobileOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
            >
                <span />
                <span />
                <span />
            </button>

        </nav>
    )
}

export default Navigation