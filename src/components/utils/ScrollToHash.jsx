import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToHash handles scrolling to an anchor element when the URL hash changes.
 * Uses a MutationObserver + rAF approach instead of a fixed timeout so it works
 * reliably even when lazy-loaded content is still mounting.
 */
const ScrollToHash = () => {
    const { hash, pathname } = useLocation()
    const prevPathRef = useRef(pathname)

    useEffect(() => {
        if (!hash) {
            prevPathRef.current = pathname
            return
        }

        const id = hash.replace('#', '')

        const scrollToElement = () => {
            const element = document.getElementById(id)
            if (element) {
                // Use rAF to ensure the browser has finished layout
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        element.scrollIntoView({ behavior: 'smooth' })
                    })
                })
                return true
            }
            return false
        }

        // If element already exists, scroll immediately
        if (scrollToElement()) {
            prevPathRef.current = pathname
            return
        }

        // If we're navigating from another page, the lazy component may
        // not have mounted yet. Watch for DOM changes until we find it.
        let attempts = 0
        const maxAttempts = 50 // ~2.5s max wait

        const observer = new MutationObserver(() => {
            attempts++
            if (scrollToElement() || attempts >= maxAttempts) {
                observer.disconnect()
            }
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })

        // Safety cleanup
        const cleanup = setTimeout(() => observer.disconnect(), 3000)

        prevPathRef.current = pathname
        return () => {
            observer.disconnect()
            clearTimeout(cleanup)
        }
    }, [hash, pathname])

    return null
}

export default ScrollToHash
