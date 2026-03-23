import { useEffect, useRef, useCallback } from 'react'

/**
 * Custom hook to add 'reveal-active' class when element enters the viewport.
 * Uses IntersectionObserver for efficient scroll-based animations.
 *
 * @param {object} options
 * @param {number}  options.threshold  - 0–1, how much of element must be visible (default 0.1)
 * @param {string}  options.rootMargin - CSS margin string (default '0px 0px -50px 0px')
 * @param {boolean} options.once       - unobserve after first reveal (default true)
 */
export const useScrollReveal = ({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  once = true,
} = {}) => {
  const elementRef = useRef(null)

  // Stable callback — won't change between renders
  const handleIntersect = useCallback((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('reveal-active')
      if (once) observer.unobserve(entry.target)
    })
  }, [once])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
      // ↑ Only valid IntersectionObserver options — 'once' is NOT passed here.
      // The original code spread the entire options object which would silently
      // pass unknown keys into the observer config.
    })

    observer.observe(element)

    return () => observer.disconnect()
    //            ↑ disconnect() is safer than unobserve() in cleanup —
    //              it clears all observations, not just this element.
  }, [handleIntersect, threshold, rootMargin])
  //   ↑ Primitive values as deps are stable — no infinite re-render loop.

  return elementRef
}