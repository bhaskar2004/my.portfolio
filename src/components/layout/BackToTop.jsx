import { useEffect, useState } from 'react'
import {
    ArrowUpIcon
} from '@radix-ui/react-icons'
import './BackToTop.css'

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [isLaunching, setIsLaunching] = useState(false)

    useEffect(() => {
        const onScroll = () => setIsVisible(window.scrollY > 400)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollToTop = () => {
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
    }

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