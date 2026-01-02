import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import './Navigation.css'

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { theme, toggleTheme } = useTheme()
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/'
        return location.pathname.startsWith(path)
    }

    const scrollToSection = (sectionId) => {
        if (location.pathname !== '/') {
            // Navigate to home first, then scroll
            window.location.href = `/#${sectionId}`
            return
        }

        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setIsMobileMenuOpen(false)
        }
    }

    return (
        <nav className={isScrolled ? 'scrolled' : ''} id="navbar">
            <Link to="/" className="logo">
                <img src="/logo.png" alt="Bhaskar T Logo" className="logo-img" width="40" height="40" />
            </Link>

            <div
                className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
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
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Workshops & Events
                    </Link>
                </li>
            </ul>

            <button
                id="theme-toggle"
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
                {theme === 'dark' ? <Sun className="sun-icon" size={20} /> : <Moon className="moon-icon" size={20} />}
            </button>
        </nav>
    )
}

export default Navigation
