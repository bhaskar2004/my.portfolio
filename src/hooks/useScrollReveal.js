import { useEffect, useRef } from 'react'

/**
 * Custom hook to add a 'visible' class to elements when they enter the viewport.
 * Uses IntersectionObserver for efficient scroll-based animations.
 */
export const useScrollReveal = (options = {}) => {
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active')
          // Optionally unobserve after reveal
          if (options.once !== false) {
            observer.unobserve(entry.target)
          }
        }
      })
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px 0px -50px 0px',
      ...options
    })

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [options])

  return elementRef
}
