/**
 * Illo-style Standing Character Illustrations
 * Matches existing illustration style: thin blue monoline, oversized hands,
 * geometric bodies, bubble/afro/bun/ponytail/cap/spiky hair variants.
 *
 * Usage:
 *   import { CharacterGrid, Character1, Character4 } from './IlloCharacters'
 *
 *   <CharacterGrid />              — all 7 in a row
 *   <Character1 className="..." /> — individual character
 */

const S = '#60A5FA'
const A = '#2563EB'
const W = 1.8

/** Reusable oversized hand */
const Hand = ({ x, y, flip = false }) => {
    const sc = flip ? -1 : 1
    return (
        <g transform={`translate(${x},${y}) scale(${sc},1)`}>
            <ellipse cx="0" cy="0" rx="11" ry="7.5" stroke={S} strokeWidth="1.4" fill={A} fillOpacity="0.08" />
            <line x1="-7" y1="-6" x2="-12" y2="-11" stroke={S} strokeWidth="1.2" strokeLinecap="round" />
            <line x1="-2" y1="-8" x2="-4" y2="-15" stroke={S} strokeWidth="1.2" strokeLinecap="round" />
            <line x1="5" y1="-8" x2="5" y2="-16" stroke={S} strokeWidth="1.2" strokeLinecap="round" />
            <line x1="11" y1="-6" x2="15" y2="-12" stroke={S} strokeWidth="1.2" strokeLinecap="round" />
        </g>
    )
}

/** Shared legs + feet */
const Legs = ({ yStart = 108 }) => (
    <>
        <path d={`M0,${yStart} L-4,${yStart + 67}`} stroke={S} strokeWidth={W} strokeLinecap="round" />
        <path d={`M24,${yStart} L28,${yStart + 67}`} stroke={S} strokeWidth={W} strokeLinecap="round" />
        <path d={`M-4,${yStart + 67} Q-10,${yStart + 70} -16,${yStart + 67}`} stroke={S} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d={`M28,${yStart + 67} Q34,${yStart + 70} 40,${yStart + 67}`} stroke={S} strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </>
)

/** Shared standard arms */
const Arms = ({ raiseRight = false }) => (
    <>
        {/* Left arm */}
        <path d="M-8,22 Q-24,50 -26,82" stroke={S} strokeWidth={W} fill="none" strokeLinecap="round" />
        <Hand x={-27} y={90} flip={false} />
        {/* Right arm */}
        {raiseRight ? (
            <>
                <path d="M32,22 Q52,0 62,-16" stroke={S} strokeWidth={W} fill="none" strokeLinecap="round" />
                <g transform="translate(68,-22) rotate(-40)">
                    <ellipse cx="0" cy="0" rx="11" ry="7.5" stroke={S} strokeWidth="1.4" fill={A} fillOpacity="0.08" />
                    <line x1="-7" y1="-6" x2="-12" y2="-11" stroke={S} strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="-2" y1="-8" x2="-4" y2="-15" stroke={S} strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="5" y1="-8" x2="5" y2="-16" stroke={S} strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="11" y1="-6" x2="15" y2="-12" stroke={S} strokeWidth="1.2" strokeLinecap="round" />
                </g>
            </>
        ) : (
            <>
                <path d="M32,22 Q48,50 50,82" stroke={S} strokeWidth={W} fill="none" strokeLinecap="round" />
                <Hand x={51} y={90} flip={true} />
            </>
        )}
    </>
)

/** Shared neck */
const Neck = () => (
    <>
        <line x1="8" y1="0" x2="8" y2="12" stroke={S} strokeWidth={W} />
        <line x1="16" y1="0" x2="16" y2="12" stroke={S} strokeWidth={W} />
    </>
)

/** Shared face */
const Face = ({ cx = 12, cy = -18 }) => (
    <>
        <circle cx={cx} cy={cy} r="18" stroke={S} strokeWidth={W} fill="none" />
        <circle cx={cx - 6} cy={cy + 3} r="2" fill={S} />
        <circle cx={cx + 6} cy={cy + 3} r="2" fill={S} />
        <path d={`M${cx - 4},${cy + 10} Q${cx},${cy + 13} ${cx + 4},${cy + 10}`} stroke={S} strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </>
)

// ─── Individual Characters ───────────────────────────────────────────────────

/** Bubble hair, plain outfit */
export const Character1 = ({ className = '' }) => (
    <svg className={`illustration illustration--char1 ${className}`} viewBox="-50 -80 130 310" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="-8" cy="-48" r="9" stroke={S} strokeWidth="1.6" fill={A} fillOpacity=".1" />
        <circle cx="4" cy="-54" r="10" stroke={S} strokeWidth="1.6" fill={A} fillOpacity=".1" />
        <circle cx="18" cy="-48" r="8" stroke={S} strokeWidth="1.6" fill={A} fillOpacity=".1" />
        <Face />
        <Neck />
        <path d="M-8,18 Q-8,10 12,10 Q32,10 32,18 L32,100 Q32,108 12,108 Q-8,108 -8,100Z" stroke={S} strokeWidth={W} fill="none" />
        <line x1="-8" y1="60" x2="32" y2="60" stroke={S} strokeWidth="1" opacity=".3" />
        <Arms />
        <Legs />
    </svg>
)

/** Cap hair, wide belt */
export const Character2 = ({ className = '' }) => (
    <svg className={`illustration illustration--char2 ${className}`} viewBox="-50 -80 130 310" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M-20,-20 Q-22,-36 12,-38 Q46,-36 44,-20" stroke={S} strokeWidth="1.6" fill={A} fillOpacity=".08" />
        <circle cx="12" cy="-46" r="4" fill={S} fillOpacity=".5" />
        <Face />
        <Neck />
        <path d="M-8,18 Q-8,10 12,10 Q32,10 32,18 L32,100 Q32,108 12,108 Q-8,108 -8,100Z" stroke={S} strokeWidth={W} fill="none" />
        <path d="M2,10 L12,26 L22,10" stroke={S} strokeWidth="1.3" fill="none" opacity=".5" />
        <rect x="-8" y="54" width="40" height="10" rx="2" stroke={S} strokeWidth="1.2" fill={A} fillOpacity=".1" />
        <Arms />
        <Legs />
    </svg>
)

/** Spiky hair, filled blue pants */
export const Character3 = ({ className = '' }) => (
    <svg className={`illustration illustration--char3 ${className}`} viewBox="-50 -80 130 310" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M-18,-20 Q-20,-36 12,-38 Q44,-36 42,-20" stroke={S} strokeWidth="1.6" fill="none" />
        <circle cx="12" cy="-42" r="6" stroke={S} strokeWidth="1.4" fill={A} fillOpacity=".15" />
        <Face />
        <Neck />
        {/* Shirt */}
        <path d="M-8,18 Q-8,10 12,10 Q32,10 32,18 L32,64 Q32,68 12,68 Q-8,68 -8,64Z" stroke={S} strokeWidth={W} fill="none" />
        <rect x="0" y="22" width="10" height="10" rx="1.5" stroke={S} strokeWidth="1" fill="none" opacity=".35" />
        {/* Filled pants */}
        <path d="M-8,64 Q-8,72 12,72 Q32,72 32,64 L32,108 Q32,112 12,112 Q-8,112 -8,108Z" stroke={S} strokeWidth={W} fill={S} fillOpacity=".18" />
        <Arms />
        <Legs yStart={112} />
    </svg>
)

/** Afro hair, long coat */
export const Character4 = ({ className = '' }) => (
    <svg className={`illustration illustration--char4 ${className}`} viewBox="-40 -90 120 330" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="-10" cy="-46" r="12" stroke={S} strokeWidth="1.6" fill={A} fillOpacity=".1" />
        <circle cx="6" cy="-52" r="13" stroke={S} strokeWidth="1.6" fill={A} fillOpacity=".1" />
        <circle cx="22" cy="-46" r="11" stroke={S} strokeWidth="1.6" fill={A} fillOpacity=".1" />
        <circle cx="-2" cy="-36" r="8" stroke={S} strokeWidth="1.2" fill={A} fillOpacity=".07" />
        <circle cx="16" cy="-36" r="8" stroke={S} strokeWidth="1.2" fill={A} fillOpacity=".07" />
        <Face cx={6} cy={-20} />
        <line x1="2" y1="0" x2="2" y2="14" stroke={S} strokeWidth={W} />
        <line x1="10" y1="0" x2="10" y2="14" stroke={S} strokeWidth={W} />
        <path d="M-10,26 Q-10,18 6,18 Q22,18 22,26 L26,120 Q26,128 6,128 Q-14,128 -10,120Z" stroke={S} strokeWidth={W} fill="none" />
        <line x1="-10" y1="68" x2="22" y2="68" stroke={S} strokeWidth="1" opacity=".3" />
        {/* Left arm */}
        <path d="M-10,30 Q-24,56 -26,86" stroke={S} strokeWidth={W} fill="none" strokeLinecap="round" />
        <Hand x={-27} y={94} flip={false} />
        {/* Right arm */}
        <path d="M22,30 Q36,56 38,86" stroke={S} strokeWidth={W} fill="none" strokeLinecap="round" />
        <Hand x={39} y={94} flip={true} />
        {/* Legs below coat */}
        <path d="M-6,128 L-10,195" stroke={S} strokeWidth={W} strokeLinecap="round" />
        <path d="M18,128 L22,195" stroke={S} strokeWidth={W} strokeLinecap="round" />
        <path d="M-10,195 Q-16,198 -22,195" stroke={S} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M22,195 Q28,198 34,195" stroke={S} strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
)

/** Curly bob, earrings, waving arm */
export const Character5 = ({ className = '' }) => (
    <svg className={`illustration illustration--char5 ${className}`} viewBox="-50 -80 160 310" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M-20,-16 Q-22,-36 12,-38 Q46,-36 44,-16" stroke={S} strokeWidth="1.6" fill={A} fillOpacity=".08" />
        <circle cx="-14" cy="-22" r="5" stroke={S} strokeWidth="1.2" fill={A} fillOpacity=".1" />
        <circle cx="38" cy="-22" r="5" stroke={S} strokeWidth="1.2" fill={A} fillOpacity=".1" />
        <Face />
        <circle cx="-6" cy="-12" r="3" stroke={S} strokeWidth="1.2" fill="none" opacity=".6" />
        <circle cx="30" cy="-12" r="3" stroke={S} strokeWidth="1.2" fill="none" opacity=".6" />
        <Neck />
        <path d="M-8,18 Q-8,10 12,10 Q32,10 32,18 L32,100 Q32,108 12,108 Q-8,108 -8,100Z" stroke={S} strokeWidth={W} fill="none" />
        <path d="M2,14 L2,64 Q2,70 12,70 Q22,70 22,64 L22,14" stroke={S} strokeWidth="1" fill={A} fillOpacity=".07" opacity=".5" />
        <Arms raiseRight={true} />
        <Legs />
    </svg>
)

/** Top bun, filled blue jacket */
export const Character6 = ({ className = '' }) => (
    <svg className={`illustration illustration--char6 ${className}`} viewBox="-50 -80 130 310" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="-46" r="10" stroke={S} strokeWidth="1.6" fill={A} fillOpacity=".2" />
        <path d="M2,-36 Q12,-28 22,-36" stroke={S} strokeWidth="1.4" fill="none" />
        <Face />
        <Neck />
        {/* Filled jacket */}
        <path d="M-8,18 Q-8,10 12,10 Q32,10 32,18 L32,64 Q32,70 12,70 Q-8,70 -8,64Z" stroke={S} strokeWidth={W} fill={S} fillOpacity=".18" />
        <path d="M2,10 L12,28 L22,10" stroke={S} strokeWidth="1.3" fill="none" opacity=".6" />
        {/* Trousers */}
        <path d="M-8,64 Q-8,72 12,72 Q32,72 32,64 L32,108 Q32,112 12,112 Q-8,112 -8,108Z" stroke={S} strokeWidth={W} fill="none" />
        <Arms />
        <Legs yStart={112} />
    </svg>
)

/** Ponytail, flared skirt */
export const Character7 = ({ className = '' }) => (
    <svg className={`illustration illustration--char7 ${className}`} viewBox="-50 -70 130 310" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M-18,-16 Q-20,-34 12,-36 Q36,-34 36,-16" stroke={S} strokeWidth="1.6" fill="none" />
        <path d="M36,-16 Q50,-8 44,12" stroke={S} strokeWidth="2" fill="none" strokeLinecap="round" />
        <Face />
        <Neck />
        {/* Top */}
        <path d="M-4,18 Q-4,10 12,10 Q28,10 28,18 L28,60 Q28,66 12,66 Q-4,66 -4,60Z" stroke={S} strokeWidth={W} fill="none" />
        {/* Flared skirt */}
        <path d="M-4,60 Q-14,68 -18,108 Q-18,114 12,114 Q42,114 42,108 Q38,68 28,60Z" stroke={S} strokeWidth={W} fill={S} fillOpacity=".08" />
        {/* Arms adapted for narrower torso */}
        <path d="M-4,22 Q-18,46 -20,76" stroke={S} strokeWidth={W} fill="none" strokeLinecap="round" />
        <Hand x={-21} y={84} flip={false} />
        <path d="M28,22 Q44,46 46,76" stroke={S} strokeWidth={W} fill="none" strokeLinecap="round" />
        <Hand x={47} y={84} flip={true} />
        {/* Legs */}
        <path d="M2,114 L-2,185" stroke={S} strokeWidth={W} strokeLinecap="round" />
        <path d="M22,114 L26,185" stroke={S} strokeWidth={W} strokeLinecap="round" />
        <path d="M-2,185 Q-8,188 -14,185" stroke={S} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M26,185 Q32,188 38,185" stroke={S} strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
)

// ─── CSS for floating animations (add to your global stylesheet) ─────────────
//
// .illustration--char1 { animation: illoFloat 4s ease-in-out infinite; }
// .illustration--char2 { animation: illoFloat 4.6s ease-in-out infinite 0.4s; }
// .illustration--char3 { animation: illoFloat 3.8s ease-in-out infinite 0.8s; }
// .illustration--char4 { animation: illoFloat 5s ease-in-out infinite 1s; }
// .illustration--char5 { animation: illoFloat 4.2s ease-in-out infinite 0.6s; }
// .illustration--char6 { animation: illoFloat 4.8s ease-in-out infinite 0.2s; }
// .illustration--char7 { animation: illoFloat 4.4s ease-in-out infinite 1.2s; }
//
// @keyframes illoFloat {
//   0%, 100% { transform: translateY(0); }
//   50%       { transform: translateY(-8px); }
// }

// ─── CharacterGrid — all 7 side by side ──────────────────────────────────────
export const CharacterGrid = ({ className = '' }) => (
    <div className={`illustration-grid ${className}`} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <Character1 style={{ width: 80 }} />
        <Character2 style={{ width: 80 }} />
        <Character3 style={{ width: 80 }} />
        <Character4 style={{ width: 80 }} />
        <Character5 style={{ width: 80 }} />
        <Character6 style={{ width: 80 }} />
        <Character7 style={{ width: 80 }} />
    </div>
)

/* ─── Modern SaaS-style Illustration Suite ─── */

export const HeroIllustration = ({ className = '' }) => (
    <svg
        className={`illustration illustration--hero ${className}`}
        viewBox="0 0 520 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        {/* Background glow and orbit lines */}
        <circle cx="260" cy="210" r="190" stroke={S} strokeWidth="0.8" strokeDasharray="4 8" opacity="0.2" fill="none" />
        <circle cx="260" cy="210" r="140" stroke={S} strokeWidth="0.8" strokeDasharray="3 6" opacity="0.15" fill="none" />
        <circle cx="260" cy="210" r="210" fill={A} fillOpacity="0.02" filter="blur(50px)" />

        {/* Floating React Atom (top right) */}
        <g transform="translate(380, 70)" className="illustration__float">
            <circle cx="0" cy="0" r="4.5" fill={S} />
            <ellipse cx="0" cy="0" rx="18" ry="6" stroke={S} strokeWidth="1.2" fill="none" transform="rotate(30)" />
            <ellipse cx="0" cy="0" rx="18" ry="6" stroke={S} strokeWidth="1.2" fill="none" transform="rotate(90)" />
            <ellipse cx="0" cy="0" rx="18" ry="6" stroke={S} strokeWidth="1.2" fill="none" transform="rotate(150)" />
        </g>

        {/* Floating Git Branch (top left) */}
        <g transform="translate(80, 90)" className="illustration__float" style={{ animationDelay: '1s' }}>
            <path d="M0,-15 L0,15 M0,-2 L15,-2" stroke={S} strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="0" cy="-15" r="4" stroke={S} strokeWidth="1.5" fill={A} />
            <circle cx="0" cy="15" r="4" stroke={S} strokeWidth="1.5" fill={A} />
            <circle cx="15" cy="-2" r="4" stroke={S} strokeWidth="1.5" fill={A} />
        </g>

        {/* Floating Bug Badge (bottom right) */}
        <g transform="translate(420, 290)" className="illustration__float" style={{ animationDelay: '1.5s' }}>
            <rect x="-16" y="-12" width="32" height="24" rx="6" stroke={S} strokeWidth="1.2" fill={A} fillOpacity="0.08" />
            <circle cx="0" cy="0" r="4" stroke={S} strokeWidth="1.2" fill="none" />
            <path d="M-8,-8 L-4,-4 M8,-8 L4,-4 M-10,0 L-4,0 M10,0 L4,0 M-8,8 L-4,4 M8,8 L4,4" stroke={S} strokeWidth="1.2" />
        </g>

        {/* Floating Checkmark Badge (bottom left) */}
        <g transform="translate(100, 310)" className="illustration__float" style={{ animationDelay: '0.5s' }}>
            <circle cx="0" cy="0" r="14" stroke={S} strokeWidth="1.2" fill={A} fillOpacity="0.08" />
            <path d="M-5,0 L-1,4 L6,-4" stroke={S} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        {/* Character 1 standing on the left */}
        <g transform="translate(110, 180) scale(1.05)">
            <circle cx="-8" cy="-48" r="9" stroke={S} strokeWidth="1.6" fill={A} fillOpacity=".1" />
            <circle cx="4" cy="-54" r="10" stroke={S} strokeWidth="1.6" fill={A} fillOpacity=".1" />
            <circle cx="18" cy="-48" r="8" stroke={S} strokeWidth="1.6" fill={A} fillOpacity=".1" />
            <Face />
            <Neck />
            <path d="M-8,18 Q-8,10 12,10 Q32,10 32,18 L32,100 Q32,108 12,108 Q-8,108 -8,100Z" stroke={S} strokeWidth={W} fill="none" />
            <line x1="-8" y1="60" x2="32" y2="60" stroke={S} strokeWidth="1" opacity=".3" />
            <Arms />
            <Legs />
        </g>

        {/* Floating Terminal/Code Panel on the right */}
        <g transform="translate(250, 120)">
            {/* Panel border */}
            <rect x="0" y="0" width="200" height="160" rx="8" stroke={S} strokeWidth={W} fill={A} fillOpacity="0.03" />
            
            {/* Header / window bar */}
            <line x1="0" y1="26" x2="200" y2="26" stroke={S} strokeWidth="1.2" opacity="0.8" />
            
            {/* Control dots */}
            <circle cx="14" cy="13" r="3" stroke={S} strokeWidth="1.2" fill={A} fillOpacity="0.2" />
            <circle cx="24" cy="13" r="3" stroke={S} strokeWidth="1.2" fill={A} fillOpacity="0.2" />
            <circle cx="34" cy="13" r="3" stroke={S} strokeWidth="1.2" fill={A} fillOpacity="0.2" />
            
            {/* Code Lines */}
            <g transform="translate(16, 42)">
                <line x1="0" y1="0" x2="60" y2="0" stroke={S} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                <line x1="0" y1="12" x2="110" y2="12" stroke={S} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                <line x1="12" y1="24" x2="80" y2="24" stroke={S} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
                <line x1="12" y1="36" x2="50" y2="36" stroke={S} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
                
                <line x1="24" y1="48" x2="90" y2="48" stroke={S} strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
                <line x1="24" y1="60" x2="70" y2="60" stroke={S} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
                
                <line x1="12" y1="72" x2="120" y2="72" stroke={S} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                <line x1="0" y1="84" x2="40" y2="84" stroke={S} strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
                
                {/* Cursor blink */}
                <rect x="44" y="81" width="2" height="6" fill={S} className="illustration__cursor" />
            </g>
        </g>
    </svg>
)

export const AboutIllustration = ({ className = '' }) => (
    <svg
        className={`illustration illustration--about ${className}`}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        {/* Background elements */}
        <circle cx="120" cy="120" r="95" stroke={S} strokeWidth="0.8" strokeDasharray="4 6" opacity="0.15" fill="none" />
        <circle cx="120" cy="120" r="105" fill={A} fillOpacity="0.01" filter="blur(30px)" />

        {/* Character 5 standing on the left */}
        <g transform="translate(60, 105) scale(0.6)">
            <path d="M-20,-16 Q-22,-36 12,-38 Q46,-36 44,-16" stroke={S} strokeWidth="1.6" fill={A} fillOpacity=".08" />
            <circle cx="-14" cy="-22" r="5" stroke={S} strokeWidth="1.2" fill={A} fillOpacity=".1" />
            <circle cx="38" cy="-22" r="5" stroke={S} strokeWidth="1.2" fill={A} fillOpacity=".1" />
            <Face />
            <circle cx="-6" cy="-12" r="3" stroke={S} strokeWidth="1.2" fill="none" opacity=".6" />
            <circle cx="30" cy="-12" r="3" stroke={S} strokeWidth="1.2" fill="none" opacity=".6" />
            <Neck />
            <path d="M-8,18 Q-8,10 12,10 Q32,10 32,18 L32,100 Q32,108 12,108 Q-8,108 -8,100Z" stroke={S} strokeWidth={W} fill="none" />
            <path d="M2,14 L2,64 Q2,70 12,70 Q22,70 22,64 L22,14" stroke={S} strokeWidth="1" fill={A} fillOpacity=".07" opacity=".5" />
            <Arms raiseRight={true} />
            <Legs />
        </g>

        {/* Magnifying Glass inspecting a bug on the right */}
        <g transform="translate(145, 115)">
            {/* Handle */}
            <line x1="26" y1="26" x2="55" y2="55" stroke={S} strokeWidth="4.5" strokeLinecap="round" />
            <line x1="26" y1="26" x2="55" y2="55" stroke={A} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
            
            {/* Glass Lens Rim */}
            <circle cx="0" cy="0" r="34" stroke={S} strokeWidth={W} fill={A} fillOpacity="0.04" />
            <circle cx="0" cy="0" r="30" stroke={S} strokeWidth="0.8" opacity="0.3" fill="none" />
            
            {/* Lens Reflection highlight */}
            <path d="M-20,-16 Q-10,-24 0,-20 Q-10,-14 -16,-6" stroke="#FFF" strokeWidth="1" fill="none" opacity="0.3" />

            {/* Magnified Bug Icon */}
            <g transform="scale(1.1)">
                <ellipse cx="0" cy="2" rx="6" ry="8" stroke={S} strokeWidth="1.2" fill={A} fillOpacity="0.1" />
                <circle cx="0" cy="-8" r="2.5" stroke={S} strokeWidth="1.2" fill="none" />
                <path d="M-6,0 L-10,-2 M-6,4 L-11,4 M-5,8 L-9,10 M6,0 L10,-2 M6,4 L11,4 M5,8 L9,10" stroke={S} strokeWidth="1.2" />
                <path d="M-2,-10 Q-4,-14 -6,-13 M2,-10 Q4,-14 6,-13" stroke={S} strokeWidth="1" fill="none" />
            </g>
        </g>
    </svg>
)

export const ProjectsIllustration = ({ className = '' }) => (
    <svg
        className={`illustration illustration--projects ${className}`}
        viewBox="0 0 240 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        {/* Background stars & orbit line */}
        <ellipse cx="120" cy="180" rx="75" ry="20" stroke={S} strokeWidth="1" strokeDasharray="4 6" opacity="0.25" fill="none" />
        <circle cx="120" cy="130" r="105" fill={A} fillOpacity="0.01" filter="blur(30px)" />
        
        {/* Decorative sparkles */}
        <circle cx="35" cy="50" r="2" fill={S} className="illustration__sparkle" />
        <circle cx="210" cy="80" r="1.5" fill={S} className="illustration__sparkle" style={{ animationDelay: '1.2s' }} />
        <circle cx="195" cy="220" r="2.5" fill={S} className="illustration__sparkle" style={{ animationDelay: '0.6s' }} />

        {/* Character 6 standing on the left */}
        <g transform="translate(60, 115) scale(0.62)">
            <circle cx="12" cy="-46" r="10" stroke={S} strokeWidth="1.6" fill={A} fillOpacity=".2" />
            <path d="M2,-36 Q12,-28 22,-36" stroke={S} strokeWidth="1.4" fill="none" />
            <Face />
            <Neck />
            <path d="M-8,18 Q-8,10 12,10 Q32,10 32,18 L32,64 Q32,70 12,70 Q-8,70 -8,64Z" stroke={S} strokeWidth={W} fill={S} fillOpacity=".18" />
            <path d="M2,10 L12,28 L22,10" stroke={S} strokeWidth="1.3" fill="none" opacity=".6" />
            <path d="M-8,64 Q-8,72 12,72 Q32,72 32,64 L32,108 Q32,112 12,112 Q-8,112 -8,108Z" stroke={S} strokeWidth={W} fill="none" />
            <Arms />
            <Legs yStart={112} />
        </g>

        {/* Rocket ship launching on the right */}
        <g transform="translate(155, 95)" className="illustration__float">
            {/* Rocket exhaust plume */}
            <path d="M-6,55 C-8,70 0,90 0,90 C0,90 8,70 6,55 Z" stroke={S} strokeWidth="1.2" fill={A} fillOpacity="0.2" />
            <line x1="0" y1="55" x2="0" y2="85" stroke={S} strokeWidth="1" opacity="0.6" strokeDasharray="2 3" />

            {/* Fins */}
            <path d="M-14,35 L-24,52 L-14,48 Z" stroke={S} strokeWidth={W} fill={A} fillOpacity="0.1" />
            <path d="M14,35 L24,52 L14,48 Z" stroke={S} strokeWidth={W} fill={A} fillOpacity="0.1" />

            {/* Rocket body */}
            <path d="M0,-45 C12,-15 14,10 14,48 L-14,48 C-14,10 -12,-15 0,-45 Z" stroke={S} strokeWidth={W} fill={A} fillOpacity="0.04" />
            
            {/* Rocket nose cone */}
            <path d="M0,-45 C4,-30 10,-20 12,-14 L-12,-14 C-10,-20 -4,-30 0,-45 Z" stroke={S} strokeWidth={W} fill={A} fillOpacity="0.2" />
            
            {/* Porthole */}
            <circle cx="0" cy="12" r="6" stroke={S} strokeWidth="1.4" fill="none" />
            <circle cx="0" cy="12" r="3" stroke={S} strokeWidth="0.8" fill={A} />
        </g>
    </svg>
)

export const ContactIllustration = ({ className = '' }) => (
    <svg
        className={`illustration illustration--contact ${className}`}
        viewBox="0 0 230 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        {/* Background elements */}
        <circle cx="115" cy="105" r="85" stroke={S} strokeWidth="0.8" strokeDasharray="3 5" opacity="0.15" fill="none" />
        <circle cx="115" cy="105" r="95" fill={A} fillOpacity="0.01" filter="blur(30px)" />

        {/* Character 7 standing on the left */}
        <g transform="translate(60, 95) scale(0.55)">
            <path d="M-18,-16 Q-20,-34 12,-36 Q36,-34 36,-16" stroke={S} strokeWidth="1.6" fill="none" />
            <path d="M36,-16 Q50,-8 44,12" stroke={S} strokeWidth="2" fill="none" strokeLinecap="round" />
            <Face />
            <Neck />
            <path d="M-4,18 Q-4,10 12,10 Q28,10 28,18 L28,60 Q28,66 12,66 Q-4,66 -4,60Z" stroke={S} strokeWidth={W} fill="none" />
            <path d="M-4,60 Q-14,68 -18,108 Q-18,114 12,114 Q42,114 42,108 Q38,68 28,60Z" stroke={S} strokeWidth={W} fill={S} fillOpacity=".08" />
            <path d="M-4,22 Q-18,46 -20,76" stroke={S} strokeWidth={W} fill="none" strokeLinecap="round" />
            <Hand x={-21} y={84} flip={false} />
            <path d="M28,22 Q44,46 46,76" stroke={S} strokeWidth={W} fill="none" strokeLinecap="round" />
            <Hand x={47} y={84} flip={true} />
            <path d="M2,114 L-2,185" stroke={S} strokeWidth={W} strokeLinecap="round" />
            <path d="M22,114 L26,185" stroke={S} strokeWidth={W} strokeLinecap="round" />
            <path d="M-2,185 Q-8,188 -14,185" stroke={S} strokeWidth="1.6" strokeLinecap="round" fill="none" />
            <path d="M26,185 Q32,188 38,185" stroke={S} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </g>

        {/* Envelope on the right */}
        <g transform="translate(130, 110)">
            <rect x="0" y="0" width="70" height="46" rx="4" stroke={S} strokeWidth={W} fill={A} fillOpacity="0.04" />
            <path d="M0,0 L35,22 L70,0" stroke={S} strokeWidth={W} fill="none" />
            <path d="M0,46 L26,20 M70,46 L44,20" stroke={S} strokeWidth="1" opacity="0.6" />
        </g>

        {/* Paper airplane soaring above the envelope */}
        <g transform="translate(145, 55)" className="illustration__float">
            {/* Trajectory dot-trail */}
            <path d="M-35,45 Q-20,30 -5,35" stroke={S} strokeWidth="1.2" strokeDasharray="2 3" opacity="0.5" fill="none" />
            
            {/* Airplane shape */}
            <path d="M0,-10 L30,-2 L12,12 Z" stroke={S} strokeWidth="1.4" fill={A} fillOpacity="0.1" />
            <path d="M0,-10 L12,12 L8,3 Z" stroke={S} strokeWidth="1" fill={A} fillOpacity="0.2" />
        </g>
    </svg>
)

export const FooterIllustration = ({ className = '' }) => (
    <svg
        className={`illustration illustration--footer ${className}`}
        viewBox="0 0 140 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        {/* Main stem */}
        <path d="M70,74 Q68,58 64,42 Q61,26 58,12" stroke={S} strokeWidth="2.2" strokeLinecap="round" fill="none" />

        {/* Secondary stems */}
        <path d="M66,52 Q76,46 86,50" stroke={S} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.8" />
        <path d="M64,38 Q52,32 42,38" stroke={S} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.8" />
        <path d="M61,24 Q70,16 80,20" stroke={S} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />
        <path d="M59,16 Q50,10 40,14" stroke={S} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />

        {/* Leaf 1 — top-left (large) */}
        <path d="M58,12 Q36,20 42,38 Q56,28 58,12Z" stroke={S} strokeWidth="1.2" fill={A} fillOpacity="0.08" />
        <path d="M58,12 Q46,24 42,38" stroke={S} strokeWidth="0.8" fill="none" opacity="0.5" />

        {/* Leaf 2 — right mid */}
        <path d="M66,52 Q92,40 86,50 Q80,62 66,52Z" stroke={S} strokeWidth="1.2" fill={A} fillOpacity="0.08" />
        <path d="M66,52 Q78,46 86,50" stroke={S} strokeWidth="0.8" fill="none" opacity="0.5" />

        {/* Leaf 3 — top-right small */}
        <path d="M61,24 Q82,14 80,20 Q76,32 61,24Z" stroke={S} strokeWidth="1.2" fill={A} fillOpacity="0.08" />

        {/* Leaf 4 — left small */}
        <path d="M59,16 Q36,8 40,14 Q44,22 59,16Z" stroke={S} strokeWidth="1.2" fill={A} fillOpacity="0.08" />

        {/* Ground / pot base */}
        <ellipse cx="70" cy="76" rx="10" ry="3" fill={S} opacity="0.18" />

        {/* Berry cluster at tip - blue styled */}
        <circle cx="57" cy="11" r="3.5" stroke={S} strokeWidth="1" fill={S} />
        <circle cx="64" cy="9" r="2.8" stroke={S} strokeWidth="1" fill={A} />
        <circle cx="52" cy="8" r="2" stroke={S} strokeWidth="1" fill={A} />

        {/* Sparkle */}
        <circle cx="40" cy="6" r="2" fill={S} className="illustration__sparkle" />
        <circle cx="92" cy="44" r="1.5" fill={S} className="illustration__sparkle" style={{ animationDelay: '1.2s' }} />
    </svg>
)