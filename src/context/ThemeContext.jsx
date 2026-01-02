import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem('portfolio-theme')
        return savedTheme || 'dark'
    })

    useEffect(() => {
        // Update document data-theme attribute
        document.documentElement.setAttribute('data-theme', theme)

        // Save to localStorage
        localStorage.setItem('portfolio-theme', theme)

        // Update theme stylesheet ID for compatibility
        const stylesheet = document.getElementById('theme-stylesheet')
        if (stylesheet) {
            stylesheet.href = theme === 'dark' ? 'darkcss.css' : 'lightcss.css'
        }
    }, [theme])

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
    }

    const value = {
        theme,
        toggleTheme,
        isDark: theme === 'dark'
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
