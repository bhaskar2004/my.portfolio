import { Routes, Route } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { lazy, Suspense } from 'react'
import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'
import CustomCursor from './components/layout/CustomCursor'
import BackToTop from './components/layout/BackToTop'
import ScrollProgress from './components/layout/ScrollProgress'
import ParticleCanvas from './components/particles/ParticleCanvas'
import GeometricShapes from './components/particles/GeometricShapes'
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

function App() {
    return (
        <HelmetProvider>
            {/* Global UI Elements */}
            <ScrollProgress />
            <ScrollToHash />
            <ParticleCanvas />
            <GeometricShapes />

            <CustomCursor />

            {/* Main Layout */}
            <div className="main-content-wrapper" style={{ position: 'relative', zIndex: 'var(--z-content)' }}>
                <Navigation />

                {/* Routes with Suspense for code-splitting */}
                <Suspense fallback={
                    <div style={{ 
                        height: '100vh', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: 'var(--color-primary)',
                        fontFamily: 'var(--font-mono)'
                    }}>
                        Loading Experience...
                    </div>
                }>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/workshops" element={<Workshops />} />
                        <Route path="/resume" element={<Resume />} />
                        <Route path="/project/:id" element={<ProjectDetail />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>

                <Footer />
            </div>
            <BackToTop />
        </HelmetProvider>
    )
}

export default App