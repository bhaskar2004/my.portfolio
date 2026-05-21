import { useEffect, useRef } from 'react'
import './ScrollProgress.css'

/**
 * ScrollProgress — uses direct DOM mutation via ref instead of
 * React setState on every scroll pixel. This avoids triggering
 * React re-renders 60+ times/second while scrolling.
 */
const ScrollProgress = () => {
    const barRef = useRef(null)

    useEffect(() => {
        let rafId = null

        const handleScroll = () => {
            if (rafId) return
            rafId = requestAnimationFrame(() => {
                const { scrollHeight, clientHeight } = document.documentElement
                const total = scrollHeight - clientHeight
                if (total > 0 && barRef.current) {
                    const pct = (window.scrollY / total) * 100
                    barRef.current.style.width = `${pct}%`
                    barRef.current.setAttribute('aria-valuenow', Math.round(pct))
                }
                rafId = null
            })
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [])

    return (
        <div
            ref={barRef}
            id="scroll-progress"
            className="scroll-progress"
            style={{ width: '0%' }}
            role="progressbar"
            aria-label="Page scroll progress"
            aria-valuenow={0}
            aria-valuemin="0"
            aria-valuemax="100"
        />
    )
}

export default ScrollProgress
