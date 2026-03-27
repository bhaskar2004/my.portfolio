import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToHash handles scrolling to an anchor element when the URL hash change.
 * This is useful for cross-page navigation to a specific section.
 */
const ScrollToHash = () => {
    const { hash } = useLocation()

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '')
            const element = document.getElementById(id)
            if (element) {
                // Delay to ensure the DOM is rendered, especially during lazy loading
                const timer = setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' })
                }, 100)
                return () => clearTimeout(timer)
            }
        }
    }, [hash])

    return null
}

export default ScrollToHash
