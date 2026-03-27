import { useEffect, useRef } from 'react'
import './ParticleCanvas.css'

/**
 * ParticleCanvas
 *
 * Uber-redesigned particle system:
 *  – Particles use Uber green (#06C167) instead of white
 *  – Connection lines use green at very low opacity
 *  – Theme-aware: lighter on dark bg, near-invisible on light bg
 *  – Mouse repulsion radius tightened (80px) for subtlety
 *  – Particle count capped lower for a cleaner, sparser field
 *  – Speed halved — slow drift, not frantic movement
 */
const ParticleCanvas = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let particles = []
        let animationFrameId
        let mouseX = -9999
        let mouseY = -9999
        const connectDistance = 100 // Define missing connectDistance

        /* ── Theme detection ────────────────────────────────── */
        const isDark = () =>
            !document.documentElement.getAttribute('data-theme') ||
            document.documentElement.getAttribute('data-theme') === 'dark'

        /* ── Particle ───────────────────────────────────────── */
        class Particle {
            constructor() { this.reset() }

            reset() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 1.4 + 0.4   // 0.4 – 1.8px
                this.speedX = (Math.random() - 0.5) * 0.22
                this.speedY = (Math.random() - 0.5) * 0.22
                this.opacity = Math.random() * 0.5 + 0.4  // 0.40 – 0.90
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                /* Mouse repulsion — gentle push away */
                const dx = mouseX - this.x
                const dy = mouseY - this.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                const repelR = 80

                if (dist > 0 && dist < repelR) {
                    const force = ((repelR - dist) / repelR) * 1.4
                    this.x -= (dx / dist) * force
                    this.y -= (dy / dist) * force
                }

                /* Edge wrap */
                if (this.x > canvas.width) this.x = 0
                if (this.x < 0) this.x = canvas.width
                if (this.y > canvas.height) this.y = 0
                if (this.y < 0) this.y = canvas.height
            }

            draw() {
                /* Uber green on dark; near-invisible on light */
                const dx = mouseX - this.x
                const dy = mouseY - this.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                const glowR = 150

                let alpha = isDark()
                    ? this.opacity
                    : this.opacity * 1

                if (dist < glowR) {
                    const glowFactor = (1 - dist / glowR) * 0.5
                    alpha += glowFactor
                    ctx.shadowBlur = 10 * glowFactor
                    ctx.shadowColor = 'rgba(6, 193, 103, 0.8)'
                } else {
                    ctx.shadowBlur = 0
                }

                ctx.fillStyle = `rgba(6, 193, 103, ${alpha})`
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
                ctx.shadowBlur = 0 // reset
            }
        }

        /* ── Init ───────────────────────────────────────────── */
        const initParticles = () => {
            particles = []
            /* Sparser field: ~1 particle per 14k px² max 100 */
            const count = Math.min(
                Math.floor((canvas.width * canvas.height) / 14000),
                100
            )
            for (let i = 0; i < count; i++) particles.push(new Particle())
        }

        /* ── Resize ─────────────────────────────────────────── */
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initParticles()
        }

        let resizeTimeout
        const handleResize = () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(resizeCanvas, 150)
        }

        resizeCanvas()
        window.addEventListener('resize', handleResize)

        /* ── Animate ────────────────────────────────────────── */
        let isVisible = true
        const handleVisibilityChange = () => {
            isVisible = !document.hidden
            if (isVisible) {
                cancelAnimationFrame(animationFrameId)
                animate()
            }
        }
        document.addEventListener('visibilitychange', handleVisibilityChange)

        const animate = () => {
            if (!isVisible) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const dark = isDark()

            particles.forEach((p, i) => {
                p.update()
                p.draw()

                /* Connection lines — only between nearby pairs */
                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j]
                    const dx = q.x - p.x
                    const dy = q.y - p.y
                    const d = Math.sqrt(dx * dx + dy * dy)

                    if (d < connectDistance) {
                        const baseAlpha = dark ? 0.5 : 0.25
                        const alpha = baseAlpha * (1 - d / connectDistance)
                        ctx.strokeStyle = `rgba(6, 193, 103, ${alpha})`
                        ctx.lineWidth = 0.6
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(q.x, q.y)
                        ctx.stroke()
                    }
                }
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        /* ── Mouse tracking ─────────────────────────────────── */
        const onMouseMove = (e) => { mouseX = e.clientX; mouseY = e.clientY }
        const onMouseLeave = () => { mouseX = -9999; mouseY = -9999 }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseleave', onMouseLeave)

        initParticles()
        animate()

        /* ── Cleanup ─────────────────────────────────────────── */
        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseleave', onMouseLeave)
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            id="particle-canvas"
            aria-hidden="true"
        />
    )
}

export default ParticleCanvas