import './GeometricShapes.css'

/**
 * GeometricShapes
 * Background decoration layer — Uber-inspired.
 * Sharp rectangles + very dim green halos. All aria-hidden.
 */
const GeometricShapes = () => {
    return (
        <div className="geometric-shapes" aria-hidden="true">
            {/* Ambient green halos — blurred, off-screen edges */}
            <div className="liquid-orb" />
            <div className="liquid-orb" />
            <div className="liquid-orb" />

            {/* Hard-edge shapes — barely visible depth layer */}
            <div className="shape triangle" />   {/* Large rotated square — top right */}
            <div className="shape circle" />     {/* Small square — mid left         */}
            <div className="shape square" />     {/* Medium square — bottom right     */}
            <div className="shape hexagon" />    {/* Thin diagonal rule line          */}
        </div>
    )
}

export default GeometricShapes