import { useEffect, useState } from 'react'
import './ScrollProgress.css'

const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const scrolled = (window.scrollY / windowHeight) * 100
            setScrollProgress(scrolled)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div
            id="scroll-progress"
            className="scroll-progress"
            style={{ width: `${scrollProgress}%` }}
            role="progressbar"
            aria-label="Page scroll progress"
            aria-valuenow={Math.round(scrollProgress)}
            aria-valuemin="0"
            aria-valuemax="100"
        />
    )
}

export default ScrollProgress
