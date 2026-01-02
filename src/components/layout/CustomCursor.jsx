import { useEffect, useState } from 'react'
import './CustomCursor.css'

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Check if device is mobile
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px) or (hover: none)').matches)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        if (isMobile) return

        const handleMouseMove = (e) => {
            requestAnimationFrame(() => {
                setPosition({ x: e.clientX, y: e.clientY })
            })
        }

        const handleMouseOver = (e) => {
            if (
                e.target.closest('a') ||
                e.target.closest('button') ||
                e.target.closest('[role="button"]')
            ) {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseover', handleMouseOver)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseover', handleMouseOver)
            window.removeEventListener('resize', checkMobile)
        }
    }, [isMobile])

    if (isMobile) return null

    return (
        <>
            <div
                className="cursor-dot"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
            />
            <div
                className={`cursor-outline ${isHovering ? 'hovering' : ''}`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
            />
        </>
    )
}

export default CustomCursor
