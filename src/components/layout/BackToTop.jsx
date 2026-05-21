import { useEffect, useState, useCallback } from 'react'
import {
    ArrowUpIcon
} from '@radix-ui/react-icons'
import './BackToTop.css'

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [isLaunching, setIsLaunching] = useState(false)

    useEffect(() => {
        let rafId = null

        const onScroll = () => {
            if (rafId) return
            rafId = requestAnimationFrame(() => {
                const { scrollHeight, clientHeight } = document.documentElement
                const totalScrollable = scrollHeight - clientHeight
                // Show after 30% of page scrolled, with 400px minimum
                const threshold = Math.max(400, totalScrollable * 0.3)
                setIsVisible(window.scrollY > threshold)
                rafId = null
            })
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', onScroll)
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [])

    const scrollToTop = useCallback(() => {
        if (isLaunching) return
        setIsLaunching(true)

        const btn = document.getElementById('backToTop')
        if (btn) {
            btn.classList.add('igniting')
            setTimeout(() => {
                btn.classList.remove('igniting')
                btn.classList.add('launching')
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setTimeout(() => {
                    btn.classList.remove('launching')
                    setIsLaunching(false)
                }, 700)
            }, 280)
        }
    }, [isLaunching])

    return (
        <button
            id="backToTop"
            className={`back-to-top${isVisible ? ' visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Back to top"
        >
            <ArrowUpIcon width={20} height={20} />
        </button>
    )
}

export default BackToTop