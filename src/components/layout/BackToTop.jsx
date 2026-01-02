import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import './BackToTop.css'

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [isLaunching, setIsLaunching] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        if (isLaunching) return

        setIsLaunching(true)

        // Start ignition animation
        const btn = document.getElementById('backToTop')
        if (btn) {
            btn.classList.add('igniting')

            setTimeout(() => {
                btn.classList.remove('igniting')
                btn.classList.add('launching')

                // Smooth scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })

                setTimeout(() => {
                    btn.classList.remove('launching')
                    setIsLaunching(false)
                }, 1000)
            }, 300)
        }
    }

    return (
        <button
            id="backToTop"
            className={`back-to-top ${isVisible ? 'visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Back to top"
        >
            <ArrowUp size={24} />
        </button>
    )
}

export default BackToTop
