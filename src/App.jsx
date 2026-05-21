import { Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { lazy, Suspense, useEffect, useRef } from 'react'
import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'
import BackToTop from './components/layout/BackToTop'
import ScrollProgress from './components/layout/ScrollProgress'
import ScrollToHash from './components/utils/ScrollToHash'

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'))
const Workshops = lazy(() => import('./pages/Workshops'))
const Resume = lazy(() => import('./pages/Resume'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))


/* ── Minimal 404 page ───────────────────────────────────────────────────
   noindex prevents Google from crawling dead/mistyped URLs and wasting
   your crawl budget on pages that dilute your domain authority.
──────────────────────────────────────────────────────────────────────── */
const NotFound = () => (
    <>
        <Helmet>
            <title>404 – Page Not Found | Bhaskar T</title>
            <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <main style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h1>404 – Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <a href="/">← Back to Bhaskar T's Portfolio</a>
        </main>
    </>
)

/* ── Loading skeleton for Suspense ────────────────────────────────────
   Gives perceived performance — pulsing bars that mimic page structure
   instead of a jarring "Loading..." string.
──────────────────────────────────────────────────────────────────────── */
const LoadingSkeleton = () => (
    <div className="loading-skeleton" role="status" aria-label="Loading page">
        <div className="skeleton-hero">
            <div className="skeleton-bar skeleton-eyebrow" />
            <div className="skeleton-bar skeleton-title" />
            <div className="skeleton-bar skeleton-subtitle" />
            <div className="skeleton-bar skeleton-subtitle skeleton-subtitle--short" />
            <div className="skeleton-buttons">
                <div className="skeleton-bar skeleton-btn" />
                <div className="skeleton-bar skeleton-btn" />
            </div>
        </div>
        <span className="sr-only">Loading…</span>
    </div>
)

function App() {
    const location = useLocation()
    const mainRef = useRef(null)

    /* ── Focus management: move focus to main content on route change ── */
    useEffect(() => {
        // Small delay so the DOM is painted before moving focus
        const timer = setTimeout(() => {
            if (mainRef.current) {
                mainRef.current.focus({ preventScroll: true })
            }
        }, 100)
        return () => clearTimeout(timer)
    }, [location.pathname])

    return (
        <HelmetProvider>
            {/* Skip-to-content link for keyboard users */}
            <a href="#main-content" className="skip-to-content">
                Skip to content
            </a>

            {/* Global UI Elements */}
            <ScrollProgress />
            <ScrollToHash />

            {/* Main Layout */}
            <div className="main-content-wrapper" style={{ position: 'relative', zIndex: 'var(--z-content)' }}>
                <Navigation />

                {/* Routes with Suspense for code-splitting */}
                <Suspense fallback={<LoadingSkeleton />}>
                    <div
                        id="main-content"
                        ref={mainRef}
                        tabIndex={-1}
                        style={{ outline: 'none' }}
                        key={location.pathname}
                        className="route-transition"
                    >
                        <Routes location={location}>
                            <Route path="/" element={<Home />} />
                            <Route path="/workshops" element={<Workshops />} />
                            <Route path="/resume" element={<Resume />} />
                            <Route path="/project/:id" element={<ProjectDetail />} />

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </Suspense>

                <Footer />
            </div>
            <BackToTop />
        </HelmetProvider>
    )
}

export default App