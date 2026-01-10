import { Routes, Route } from 'react-router-dom'
import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'
import CustomCursor from './components/layout/CustomCursor'
import BackToTop from './components/layout/BackToTop'
import ScrollProgress from './components/layout/ScrollProgress'
import ParticleCanvas from './components/particles/ParticleCanvas'
import GeometricShapes from './components/particles/GeometricShapes'
import Home from './pages/Home'
import Workshops from './pages/Workshops'

import { HelmetProvider } from 'react-helmet-async'

function App() {
    return (
        <HelmetProvider>
            {/* Global UI Elements */}
            <ScrollProgress />
            <ParticleCanvas />
            <GeometricShapes />
            <CustomCursor />

            {/* Main Layout */}
            <Navigation />

            {/* Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/workshops" element={<Workshops />} />
            </Routes>

            <Footer />
            <BackToTop />
        </HelmetProvider>
    )
}

export default App
