/**
 * Inline SVG Illustration Components — Precision Redesign
 *
 * All gradients are namespaced per-component to avoid DOM ID collisions.
 * Physical/character scenes use hardcoded hex (no dark-mode inversion).
 * Animations: float, sparkle, cursor-blink, glow — all CSS class-driven.
 */

/* ─────────────────────────────────────────────────────────────
   HeroIllustration — Developer seated at desk, coding
   Viewbox: 520 × 420
   Layers: background → chair → body → neck/head → desk → laptop → accessories
   ───────────────────────────────────────────────────────────── */
export const HeroIllustration = ({ className = '' }) => (
    <svg
        className={`illustration illustration--hero ${className}`}
        viewBox="0 0 520 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <defs>
            <linearGradient id="h-wood" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B8845A" />
                <stop offset="40%" stopColor="#D4A574" />
                <stop offset="100%" stopColor="#C09060" />
            </linearGradient>
            <linearGradient id="h-laptop" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D8D8E2" />
                <stop offset="100%" stopColor="#ACACBA" />
            </linearGradient>
            <radialGradient id="h-screenglow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4361EE" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#4361EE" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="h-bgglow" cx="50%" cy="38%" r="55%">
                <stop offset="0%" stopColor="#4361EE" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#4361EE" stopOpacity="0" />
            </radialGradient>
            <clipPath id="h-screenclip">
                <rect x="158" y="193" width="204" height="77" rx="5" />
            </clipPath>
        </defs>

        {/* Ambient background */}
        <ellipse cx="260" cy="180" rx="260" ry="210" fill="url(#h-bgglow)" />

        {/* ── Chair back ── */}
        <rect x="212" y="186" width="96" height="106" rx="13" fill="#18182A" />
        <rect x="218" y="192" width="84" height="94" rx="10" fill="#21213A" />
        {/* Backrest stitching lines */}
        <line x1="218" y1="222" x2="302" y2="222" stroke="#18182A" strokeWidth="1.2" />
        <line x1="218" y1="252" x2="302" y2="252" stroke="#18182A" strokeWidth="1.2" />
        <line x1="218" y1="272" x2="302" y2="272" stroke="#18182A" strokeWidth="1.2" />
        {/* Lumbar bump */}
        <path d="M218,252 Q260,248 302,252" stroke="#2A2A48" strokeWidth="3" fill="none" />

        {/* Arm rests */}
        <rect x="196" y="220" width="18" height="38" rx="7" fill="#18182A" />
        <rect x="306" y="220" width="18" height="38" rx="7" fill="#18182A" />
        {/* Arm-rest pads */}
        <rect x="196" y="250" width="18" height="10" rx="5" fill="#28284A" />
        <rect x="306" y="250" width="18" height="10" rx="5" fill="#28284A" />

        {/* Chair pole + star base */}
        <rect x="252" y="292" width="16" height="55" rx="5" fill="#2A2A3E" />
        <ellipse cx="260" cy="350" rx="34" ry="8" fill="#18182A" />
        <ellipse cx="260" cy="348" rx="30" ry="5" fill="#0A0A14" opacity="0.45" />
        {/* Star legs */}
        {[0, 72, 144, 216, 288].map((deg, i) => {
            const r = deg * Math.PI / 180
            const x2 = 260 + Math.cos(r) * 30
            const y2 = 350 + Math.sin(r) * 7
            return <line key={i} x1="260" y1="348" x2={x2.toFixed(1)} y2={y2.toFixed(1)} stroke="#2A2A3E" strokeWidth="6" strokeLinecap="round" />
        })}

        {/* ── Shirt / upper body ── */}
        {/* Main torso shape visible above desk */}
        <path
            d="M208,202 Q200,220 202,268 Q204,286 210,294
         Q234,306 260,307 Q286,306 310,294
         Q316,286 318,268 Q320,220 312,202
         Q286,185 260,182 Q234,185 208,202Z"
            fill="#2D3494"
        />
        {/* Shirt collar — crew neck */}
        <path d="M245,193 L260,214 L275,193 Q270,188 260,186 Q250,188 245,193Z" fill="#252882" />
        {/* Shirt button placket hint */}
        <line x1="260" y1="214" x2="260" y2="290" stroke="#252882" strokeWidth="1.5" opacity="0.4" />
        {/* Shirt shoulder seams */}
        <path d="M228,194 Q218,202 210,218" stroke="#252882" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M292,194 Q302,202 310,218" stroke="#252882" strokeWidth="1.5" fill="none" opacity="0.5" />
        {/* Breast pocket */}
        <rect x="276" y="220" width="22" height="18" rx="3" fill="#252882" opacity="0.45" />
        <line x1="276" y1="226" x2="298" y2="226" stroke="#1E1E70" strokeWidth="1" opacity="0.5" />

        {/* ── Arms (shirt sleeve → skin forearm) ── */}
        {/* Left upper arm */}
        <path d="M210,208 Q186,250 168,284" stroke="#2D3494" strokeWidth="22" strokeLinecap="round" fill="none" />
        {/* Left forearm skin */}
        <path d="M192,264 Q178,276 166,286" stroke="#F0C090" strokeWidth="16" strokeLinecap="round" fill="none" />
        {/* Left hand */}
        <ellipse cx="163" cy="288" rx="15" ry="9" fill="#F0C090" />
        <ellipse cx="155" cy="285" rx="5" ry="3.5" fill="#EAB880" />

        {/* Right upper arm */}
        <path d="M310,208 Q334,250 352,284" stroke="#2D3494" strokeWidth="22" strokeLinecap="round" fill="none" />
        {/* Right forearm skin */}
        <path d="M328,264 Q342,276 354,286" stroke="#F0C090" strokeWidth="16" strokeLinecap="round" fill="none" />
        {/* Right hand */}
        <ellipse cx="357" cy="288" rx="15" ry="9" fill="#F0C090" />
        <ellipse cx="365" cy="285" rx="5" ry="3.5" fill="#EAB880" />

        {/* ── Neck ── */}
        <rect x="249" y="162" width="22" height="28" rx="9" fill="#F5C5A3" />
        <rect x="249" y="162" width="7" height="28" rx="4" fill="#E8B08A" opacity="0.4" />

        {/* ── Head ── */}
        <circle cx="260" cy="136" r="34" fill="#F5C5A3" />
        {/* Subtle shadow on right side of face */}
        <path d="M260,103 Q292,107 293,136 Q292,164 260,168" fill="#E8A87C" opacity="0.2" />

        {/* ── Hair ── */}
        {/* Back hair mass */}
        <path d="M227,130 Q228,100 260,96 Q292,100 293,130 Q284,108 260,105 Q236,108 227,130Z" fill="#3D2B1F" />
        {/* Top layer hair */}
        <path d="M228,130 Q226,112 242,104 Q260,98 278,104 Q294,112 292,130" fill="#4A3328" />
        {/* Side hair left (covers ear partially) */}
        <path d="M227,130 Q223,142 226,154 Q230,140 235,132Z" fill="#3D2B1F" />
        {/* Side hair right */}
        <path d="M293,130 Q297,142 294,154 Q290,140 285,132Z" fill="#3D2B1F" />
        {/* Hair highlight */}
        <path d="M248,100 Q260,96 272,100 Q264,104 256,104Z" fill="#6A4C38" opacity="0.5" />

        {/* ── Ears ── */}
        <ellipse cx="227" cy="139" rx="5.5" ry="7.5" fill="#F0C090" />
        <ellipse cx="293" cy="139" rx="5.5" ry="7.5" fill="#F0C090" />
        {/* Inner ear detail */}
        <ellipse cx="226" cy="139" rx="2.5" ry="4" fill="#DDA070" opacity="0.5" />
        <ellipse cx="294" cy="139" rx="2.5" ry="4" fill="#DDA070" opacity="0.5" />

        {/* ── Face details ── */}
        {/* Eyebrows */}
        <path d="M242,124 Q249,120 257,122" stroke="#3D2B1F" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M263,122 Q271,120 278,124" stroke="#3D2B1F" strokeWidth="2.2" fill="none" strokeLinecap="round" />

        {/* Left eye */}
        <ellipse cx="250" cy="133" rx="6.5" ry="5" fill="#FFFFFF" />
        <circle cx="251" cy="133" r="3.2" fill="#3D2B1F" />
        <circle cx="252" cy="132" r="1.1" fill="#FFFFFF" opacity="0.9" />
        {/* Upper lash */}
        <path d="M243,129 Q250,125 257,129" stroke="#3D2B1F" strokeWidth="1.4" fill="none" />

        {/* Right eye */}
        <ellipse cx="270" cy="133" rx="6.5" ry="5" fill="#FFFFFF" />
        <circle cx="271" cy="133" r="3.2" fill="#3D2B1F" />
        <circle cx="272" cy="132" r="1.1" fill="#FFFFFF" opacity="0.9" />
        <path d="M263,129 Q270,125 277,129" stroke="#3D2B1F" strokeWidth="1.4" fill="none" />

        {/* Nose */}
        <path d="M257,144 Q260,150 263,144" stroke="#D4967A" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <circle cx="255.5" cy="149" r="1.8" fill="#D4967A" opacity="0.35" />
        <circle cx="264.5" cy="149" r="1.8" fill="#D4967A" opacity="0.35" />

        {/* Mouth — slight focused smile */}
        <path d="M251,157 Q260,162 269,157" stroke="#C4846A" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M251,157 Q255,159 260,157" fill="#E08070" opacity="0.25" />

        {/* Chin / jaw definition */}
        <path d="M232,150 Q228,160 234,168" stroke="#DDA070" strokeWidth="0.8" fill="none" opacity="0.3" />

        {/* ── Desk ── */}
        {/* Surface */}
        <rect x="76" y="293" width="368" height="19" rx="9" fill="url(#h-wood)" />
        {/* Front edge darker strip */}
        <rect x="76" y="308" width="368" height="5" rx="2" fill="#A07048" opacity="0.35" />
        {/* Surface sheen */}
        <rect x="80" y="294" width="360" height="5" rx="2" fill="#F0D0A8" opacity="0.14" />
        {/* Legs */}
        <rect x="114" y="312" width="16" height="86" rx="5" fill="#9C7045" />
        <rect x="390" y="312" width="16" height="86" rx="5" fill="#9C7045" />
        {/* Feet */}
        <rect x="100" y="394" width="44" height="9" rx="4" fill="#80583A" />
        <rect x="376" y="394" width="44" height="9" rx="4" fill="#80583A" />

        {/* ── Laptop ── */}
        {/* Body/base */}
        <rect x="140" y="277" width="240" height="18" rx="7" fill="url(#h-laptop)" />
        {/* Keyboard inset */}
        <rect x="149" y="280" width="222" height="12" rx="4" fill="#0C0C1C" opacity="0.58" />
        {/* Key rows (3 rows of subtle rects) */}
        {[152, 172, 192, 212, 232, 252, 272, 292, 312, 332].map((x, i) => (
            <rect key={i} x={x} y="281" width="17" height="4" rx="1.5" fill="#FFFFFF" opacity="0.055" />
        ))}
        {[155, 178, 202, 228, 254, 278, 302].map((x, i) => (
            <rect key={i} x={x} y="287" width="20" height="3.5" rx="1.5" fill="#FFFFFF" opacity="0.04" />
        ))}
        {/* Trackpad */}
        <rect x="218" y="282" width="84" height="7" rx="3" fill="#0C0C1C" opacity="0.28" />
        {/* Hinge */}
        <rect x="222" y="274" width="76" height="5" rx="2" fill="#ACACBA" />

        {/* Screen outer frame */}
        <rect x="146" y="182" width="228" height="96" rx="11" fill="#1A1A28" stroke="url(#h-laptop)" strokeWidth="2.5" />
        {/* Screen inner (dark glass) */}
        <rect x="155" y="191" width="210" height="80" rx="7" fill="#0D1117" />
        {/* Screen ambient glow */}
        <rect x="155" y="191" width="210" height="80" rx="7" fill="url(#h-screenglow)" />
        {/* Camera */}
        <circle cx="260" cy="187" r="2.2" fill="#2E2E44" />
        <circle cx="260" cy="187" r="0.9" fill="#1A1A2E" />

        {/* ── Code on screen ── */}
        {/* Line-number gutter */}
        <rect x="157" y="193" width="18" height="76" rx="3" fill="#0A0A12" opacity="0.6" />
        {[197, 207, 217, 227, 237, 247, 257, 267].map((y, i) => (
            <rect key={i} x="160" y={y} width="10" height="3" rx="1.5" fill="#3E4462" />
        ))}

        {/* line 1: import React from 'react' */}
        <rect x="180" y="196" width="24" height="4" rx="2" fill="#FF7B72" />
        <rect x="207" y="196" width="28" height="4" rx="2" fill="#CDD9E5" opacity="0.7" />
        <rect x="238" y="196" width="18" height="4" rx="2" fill="#FF7B72" />
        <rect x="259" y="196" width="36" height="4" rx="2" fill="#A5D6FF" />

        {/* line 2: const App = () => \{ */}
        <rect x="180" y="207" width="24" height="4" rx="2" fill="#FF7B72" />
        <rect x="207" y="207" width="22" height="4" rx="2" fill="#D2A8FF" />
        <rect x="232" y="207" width="8" height="4" rx="2" fill="#CDD9E5" opacity="0.4" />
        <rect x="243" y="207" width="26" height="4" rx="2" fill="#FFA657" />
        <rect x="272" y="207" width="7" height="4" rx="2" fill="#CDD9E5" opacity="0.4" />

        {/* line 3:   return ( */}
        <rect x="188" y="218" width="28" height="4" rx="2" fill="#FF7B72" />
        <rect x="219" y="218" width="7" height="4" rx="2" fill="#CDD9E5" opacity="0.35" />

        {/* line 4:     \<div className="app"\> */}
        <rect x="196" y="229" width="7" height="4" rx="2" fill="#7EE787" />
        <rect x="205" y="229" width="16" height="4" rx="2" fill="#7EE787" />
        <rect x="224" y="229" width="38" height="4" rx="2" fill="#D2A8FF" />
        <rect x="265" y="229" width="32" height="4" rx="2" fill="#A5D6FF" />

        {/* line 5:       \<h1\>Hello World\</h1\> */}
        <rect x="204" y="240" width="14" height="4" rx="2" fill="#7EE787" />
        <rect x="221" y="240" width="36" height="4" rx="2" fill="#CDD9E5" opacity="0.8" />
        <rect x="260" y="240" width="18" height="4" rx="2" fill="#7EE787" />

        {/* line 6:     \</div\> */}
        <rect x="196" y="251" width="26" height="4" rx="2" fill="#7EE787" />

        {/* line 7:   ) */}
        <rect x="188" y="262" width="7" height="4" rx="2" fill="#CDD9E5" opacity="0.35" />

        {/* Cursor blink */}
        <rect x="180" y="262" width="2.5" height="7" rx="1" fill="#58A6FF" className="illustration__cursor" />

        {/* ── Coffee mug ── */}
        {/* Mug body */}
        <rect x="390" y="258" width="30" height="34" rx="7" fill="#F8F8FA" />
        <rect x="390" y="258" width="30" height="7" rx="4" fill="#F8F8FA" />
        {/* Coffee surface */}
        <ellipse cx="405" cy="262" rx="12" ry="4" fill="#7C5132" />
        <ellipse cx="402" cy="262" rx="5" ry="2" fill="#9B6844" opacity="0.5" />
        {/* Mug handle */}
        <path d="M420,265 Q432,265 432,275 Q432,285 420,285" stroke="#E0E0E4" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Mug saucer */}
        <ellipse cx="405" cy="292" rx="18" ry="3" fill="#D0D0D8" opacity="0.4" />
        {/* Steam */}
        <path d="M397,255 Q394,245 397,237" stroke="#AAAABC" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.45" className="illustration__float" style={{ animationDelay: '0.3s' }} />
        <path d="M405,253 Q402,242 405,234" stroke="#AAAABC" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.32" className="illustration__float" style={{ animationDelay: '0.8s' }} />
        <path d="M413,255 Q410,245 413,237" stroke="#AAAABC" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.38" className="illustration__float" style={{ animationDelay: '1.3s' }} />

        {/* Sticky note on desk */}
        <rect x="430" y="266" width="42" height="36" rx="4" fill="#FFE27A" />
        <rect x="430" y="266" width="42" height="6" rx="2" fill="#F0D060" />
        <line x1="436" y1="278" x2="466" y2="278" stroke="#C8A840" strokeWidth="1.2" opacity="0.6" />
        <line x1="436" y1="284" x2="460" y2="284" stroke="#C8A840" strokeWidth="1.2" opacity="0.5" />
        <line x1="436" y1="290" x2="464" y2="290" stroke="#C8A840" strokeWidth="1.2" opacity="0.4" />
        <line x1="436" y1="296" x2="454" y2="296" stroke="#C8A840" strokeWidth="1.2" opacity="0.3" />

        {/* ── Floating tech badges ── */}
        {/* React */}
        <g className="illustration__float" style={{ animationDelay: '0s' }}>
            <rect x="352" y="92" width="72" height="38" rx="12" fill="#20232A" stroke="#61DAFB" strokeWidth="1.5" opacity="0.94" />
            {/* React atom icon */}
            <circle cx="376" cy="111" r="4.5" fill="none" stroke="#61DAFB" strokeWidth="1.8" />
            <ellipse cx="376" cy="111" rx="12" ry="4.5" fill="none" stroke="#61DAFB" strokeWidth="1" />
            <ellipse cx="376" cy="111" rx="12" ry="4.5" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 376 111)" />
            <ellipse cx="376" cy="111" rx="12" ry="4.5" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 376 111)" />
            {/* Label */}
            <rect x="393" y="105" width="22" height="4" rx="2" fill="#61DAFB" opacity="0.85" />
            <rect x="393" y="113" width="16" height="3" rx="1.5" fill="#61DAFB" opacity="0.4" />
        </g>

        {/* Git */}
        <g className="illustration__float" style={{ animationDelay: '1.5s' }}>
            <rect x="78" y="122" width="68" height="38" rx="12" fill="#1A1A2E" stroke="#F05032" strokeWidth="1.5" opacity="0.94" />
            {/* Git icon dots + lines */}
            <circle cx="97" cy="141" r="4.5" fill="none" stroke="#F05032" strokeWidth="1.8" />
            <circle cx="110" cy="133" r="3.5" fill="none" stroke="#F05032" strokeWidth="1.5" />
            <circle cx="110" cy="149" r="3.5" fill="none" stroke="#F05032" strokeWidth="1.5" />
            <path d="M97,136.5 L110,133" stroke="#F05032" strokeWidth="1.3" fill="none" />
            <path d="M97,145.5 L110,149" stroke="#F05032" strokeWidth="1.3" fill="none" />
            <rect x="118" y="137" width="20" height="4" rx="2" fill="#F05032" opacity="0.75" />
            <rect x="118" y="144" width="14" height="3" rx="1.5" fill="#F05032" opacity="0.4" />
        </g>

        {/* TypeScript */}
        <g className="illustration__float" style={{ animationDelay: '2.3s' }}>
            <rect x="76" y="222" width="68" height="38" rx="12" fill="#007ACC" opacity="0.94" />
            {/* TS squares */}
            <rect x="88" y="232" width="18" height="18" rx="3" fill="#FFFFFF" opacity="0.12" />
            <rect x="91" y="235" width="12" height="3" rx="1.5" fill="#FFFFFF" opacity="0.9" />
            <rect x="94" y="240" width="6" height="3" rx="1.5" fill="#FFFFFF" opacity="0.8" />
            <rect x="94" y="244" width="6" height="3" rx="1.5" fill="#FFFFFF" opacity="0.7" />
            <rect x="110" y="232" width="8" height="18" rx="2" fill="#FFFFFF" opacity="0.12" />
            <rect x="110" y="235" width="8" height="3" rx="1.5" fill="#FFFFFF" opacity="0.85" />
            <rect x="113" y="240" width="5" height="3" rx="1.5" fill="#FFFFFF" opacity="0.75" />
            <rect x="113" y="244" width="5" height="3" rx="1.5" fill="#FFFFFF" opacity="0.65" />
            <rect x="113" y="248" width="5" height="2" rx="1" fill="#FFFFFF" opacity="0.5" />
            <rect x="120" y="234" width="18" height="4" rx="2" fill="#FFFFFF" opacity="0.8" />
            <rect x="120" y="241" width="14" height="3" rx="1.5" fill="#FFFFFF" opacity="0.45" />
        </g>

        {/* Deploy / CI */}
        <g className="illustration__float" style={{ animationDelay: '3.2s' }}>
            <rect x="404" y="190" width="72" height="38" rx="12" fill="#1A1A2E" stroke="#56D364" strokeWidth="1.5" opacity="0.94" />
            {/* Check circle */}
            <circle cx="424" cy="209" r="9" fill="none" stroke="#56D364" strokeWidth="1.8" />
            <path d="M419,209 L423,213 L429,205" stroke="#56D364" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="438" y="204" width="28" height="4" rx="2" fill="#56D364" opacity="0.75" />
            <rect x="438" y="212" width="20" height="3" rx="1.5" fill="#56D364" opacity="0.4" />
        </g>

        {/* ── Sparkles ── */}
        <circle cx="110" cy="90" r="4.5" fill="#FFD166" className="illustration__sparkle" />
        <circle cx="438" cy="68" r="5.5" fill="#FF6B6B" className="illustration__sparkle" style={{ animationDelay: '0.7s' }} />
        <circle cx="476" cy="300" r="4" fill="#4CC9F0" className="illustration__sparkle" style={{ animationDelay: '1.4s' }} />
        {/* Four-pointed star */}
        <path d="M456,138 L458,148 L468,150 L458,152 L456,162 L454,152 L444,150 L454,148Z"
            fill="#FFD166" opacity="0.55" className="illustration__sparkle" style={{ animationDelay: '0.9s' }} />
        <path d="M46,165 L47.5,171 L54,172.5 L47.5,174 L46,180 L44.5,174 L38,172.5 L44.5,171Z"
            fill="#4CC9F0" opacity="0.5" className="illustration__sparkle" style={{ animationDelay: '2s' }} />
    </svg>
)


/* ─────────────────────────────────────────────────────────────
   AboutIllustration — Magnifying glass over syntax-highlighted code
   Viewbox: 240 × 240
   ───────────────────────────────────────────────────────────── */
export const AboutIllustration = ({ className = '' }) => (
    <svg
        className={`illustration illustration--about ${className}`}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <defs>
            <linearGradient id="ab-chrome" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D8D8E0" />
                <stop offset="100%" stopColor="#909098" />
            </linearGradient>
            <clipPath id="ab-lensclip">
                <circle cx="152" cy="132" r="36" />
            </clipPath>
        </defs>

        {/* ── Document ── */}
        {/* Shadow */}
        <rect x="36" y="36" width="120" height="158" rx="14" fill="#000000" opacity="0.06" />
        {/* Body */}
        <rect x="32" y="32" width="120" height="158" rx="13" fill="#FFFFFF" stroke="#E4E4EE" strokeWidth="1.5" />
        {/* Header bar (window chrome) */}
        <rect x="32" y="32" width="120" height="26" rx="13" fill="#F2F2FA" />
        <rect x="32" y="46" width="120" height="12" fill="#F2F2FA" />
        {/* Window dots */}
        <circle cx="48" cy="45" r="4" fill="#FF6058" />
        <circle cx="60" cy="45" r="4" fill="#FFBD2E" />
        <circle cx="72" cy="45" r="4" fill="#28C940" />
        {/* Folded top-right corner */}
        <path d="M140 32 L152 44 L140 44Z" fill="#E4E4EE" />
        <path d="M140 32 L152 44" stroke="#D0D0DC" strokeWidth="1" fill="none" />

        {/* Line number gutter */}
        <rect x="32" y="58" width="20" height="130" rx="0" fill="#F8F8FE" opacity="0.6" />
        {[68, 80, 92, 104, 116, 128, 140, 152, 164, 176].map((y, i) => (
            <rect key={i} x="35" y={y} width="12" height="3.5" rx="1.5" fill="#CACADE" />
        ))}

        {/* Syntax code lines */}
        {/* Line 1 */}
        <rect x="57" y="67" width="28" height="4.5" rx="2" fill="#FF7B72" />
        <rect x="89" y="67" width="42" height="4.5" rx="2" fill="#A5D6FF" />
        {/* Line 2 */}
        <rect x="57" y="79" width="24" height="4.5" rx="2" fill="#FF7B72" />
        <rect x="85" y="79" width="22" height="4.5" rx="2" fill="#D2A8FF" />
        <rect x="111" y="79" width="30" height="4.5" rx="2" fill="#FFA657" />
        {/* Line 3 */}
        <rect x="65" y="91" width="32" height="4.5" rx="2" fill="#7EE787" />
        <rect x="101" y="91" width="22" height="4.5" rx="2" fill="#FFA657" />
        {/* Line 4 */}
        <rect x="65" y="103" width="20" height="4.5" rx="2" fill="#CDD9E5" opacity="0.6" />
        <rect x="89" y="103" width="44" height="4.5" rx="2" fill="#D2A8FF" />
        {/* Line 5 */}
        <rect x="73" y="115" width="14" height="4.5" rx="2" fill="#FF7B72" />
        <rect x="91" y="115" width="18" height="4.5" rx="2" fill="#7EE787" />
        <rect x="113" y="115" width="26" height="4.5" rx="2" fill="#A5D6FF" />
        {/* Line 6 */}
        <rect x="65" y="127" width="38" height="4.5" rx="2" fill="#FFA657" />
        <rect x="107" y="127" width="28" height="4.5" rx="2" fill="#CDD9E5" opacity="0.5" />
        {/* Line 7 */}
        <rect x="57" y="139" width="10" height="4.5" rx="2" fill="#D2A8FF" />
        {/* Line 8 */}
        <rect x="57" y="151" width="22" height="4.5" rx="2" fill="#7EE787" />
        <rect x="83" y="151" width="36" height="4.5" rx="2" fill="#CDD9E5" opacity="0.55" />
        {/* Line 9 */}
        <rect x="57" y="163" width="46" height="4.5" rx="2" fill="#FF7B72" />
        {/* Line 10 */}
        <rect x="57" y="175" width="32" height="4.5" rx="2" fill="#A5D6FF" />
        <rect x="93" y="175" width="16" height="4.5" rx="2" fill="#D2A8FF" />

        {/* ── Magnifying glass ── */}
        {/* Handle */}
        <line x1="176" y1="158" x2="208" y2="194" stroke="#4A4A5A" strokeWidth="9" strokeLinecap="round" />
        <line x1="176" y1="158" x2="208" y2="194" stroke="#6A6A7A" strokeWidth="5" strokeLinecap="round" opacity="0.35" />

        {/* Outer ring */}
        <circle cx="152" cy="132" r="42" fill="#FFFFFF" stroke="url(#ab-chrome)" strokeWidth="5" />
        {/* Inner ring detail */}
        <circle cx="152" cy="132" r="38" fill="none" stroke="#E0E0EC" strokeWidth="1" />
        {/* Lens glass tint */}
        <circle cx="152" cy="132" r="36" fill="#4361EE" opacity="0.05" />
        {/* Glass shine */}
        <path d="M133,112 Q142,106 152,108 Q148,116 140,118Z" fill="#FFFFFF" opacity="0.45" />

        {/* Magnified code inside lens */}
        <g clipPath="url(#ab-lensclip)">
            <rect x="120" y="120" width="64" height="26" rx="0" fill="#0D1117" opacity="0.85" />
            {/* Magnified tokens */}
            <rect x="122" y="122" width="20" height="5.5" rx="2" fill="#FF7B72" />
            <rect x="145" y="122" width="30" height="5.5" rx="2" fill="#D2A8FF" />
            <rect x="122" y="131" width="16" height="5.5" rx="2" fill="#7EE787" />
            <rect x="141" y="131" width="24" height="5.5" rx="2" fill="#FFA657" />
            <rect x="168" y="131" width="12" height="5.5" rx="2" fill="#A5D6FF" />
            <rect x="122" y="140" width="36" height="5.5" rx="2" fill="#CDD9E5" opacity="0.7" />
        </g>

        {/* Sparkles */}
        <circle cx="188" cy="42" r="5" fill="#FFD166" className="illustration__sparkle" />
        <circle cx="24" cy="92" r="3.5" fill="#4CC9F0" className="illustration__sparkle" style={{ animationDelay: '0.8s' }} />
        <circle cx="208" cy="84" r="3" fill="#FF6B6B" className="illustration__sparkle" style={{ animationDelay: '1.6s' }} />
    </svg>
)


/* ─────────────────────────────────────────────────────────────
   ContactIllustration — Paper airplane arcing to envelope
   Viewbox: 230 × 210
   ───────────────────────────────────────────────────────────── */
export const ContactIllustration = ({ className = '' }) => (
    <svg
        className={`illustration illustration--contact ${className}`}
        viewBox="0 0 230 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <defs>
            <linearGradient id="co-env" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F0F0F8" />
            </linearGradient>
        </defs>

        {/* ── Envelope ── */}
        {/* Shadow */}
        <rect x="42" y="102" width="146" height="96" rx="14" fill="#000000" opacity="0.06" />
        {/* Body */}
        <rect x="38" y="96" width="146" height="96" rx="13" fill="url(#co-env)" stroke="#E0E0EE" strokeWidth="1.5" />

        {/* Envelope back flap (open, slightly lifted) */}
        <path d="M38,108 Q111,152 184,108 L184,96 Q111,124 38,96Z" fill="#F4F4FC" />
        <path d="M38,108 Q111,152 184,108" stroke="#D0D0E0" strokeWidth="1.5" fill="none" />

        {/* Bottom-left fold line to center bottom */}
        <path d="M38,192 L111,148" stroke="#E0E0EE" strokeWidth="1" />
        {/* Bottom-right fold line */}
        <path d="M184,192 L111,148" stroke="#E0E0EE" strokeWidth="1" />

        {/* Stamp */}
        <rect x="156" y="106" width="20" height="26" rx="3" fill="#FF6B6B" opacity="0.25" stroke="#FF6B6B" strokeWidth="0.8" />
        <rect x="159" y="109" width="14" height="14" rx="2" fill="#FF6B6B" opacity="0.4" />
        <line x1="159" y1="127" x2="173" y2="127" stroke="#FF6B6B" strokeWidth="0.8" opacity="0.4" />
        <line x1="159" y1="130" x2="173" y2="130" stroke="#FF6B6B" strokeWidth="0.8" opacity="0.3" />

        {/* Address lines */}
        <rect x="46" y="148" width="50" height="4" rx="2" fill="#CACADE" opacity="0.7" />
        <rect x="46" y="156" width="38" height="3" rx="1.5" fill="#CACADE" opacity="0.5" />
        <rect x="46" y="162" width="44" height="3" rx="1.5" fill="#CACADE" opacity="0.4" />

        {/* ── Arc path (dotted trail) ── */}
        <path d="M68,72 Q74,44 92,50 Q112,56 118,96"
            stroke="#4361EE" strokeWidth="1.8" strokeDasharray="5 5" fill="none" opacity="0.45" />

        {/* Motion trail (fading) */}
        <line x1="22" y1="62" x2="44" y2="66" stroke="#4361EE" strokeWidth="2.5" strokeLinecap="round" opacity="0.18" />
        <line x1="30" y1="72" x2="46" y2="74" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round" opacity="0.1" />

        {/* ── Paper airplane ── */}
        <g className="illustration__float" style={{ animationDelay: '0.4s' }}>
            {/* Main body */}
            <path d="M22,64 L70,78 L46,96Z" fill="#FFFFFF" stroke="#D0D0E4" strokeWidth="1" />
            {/* Bottom fold */}
            <path d="M22,64 L46,96 L40,76Z" fill="#E8E8F4" />
            {/* Inner crease fold */}
            <path d="M40,76 L46,96 L52,80Z" fill="#D8D8EC" />
            {/* Wing crease line */}
            <path d="M22,64 L52,80" stroke="#C8C8E0" strokeWidth="0.8" fill="none" />
            {/* Tip glint */}
            <circle cx="22" cy="64" r="1.5" fill="#4361EE" opacity="0.5" />
        </g>

        {/* Heart (floating, top-right) */}
        <g className="illustration__float illustration__sparkle" style={{ animationDelay: '0.6s' }}>
            <path d="M196,88 Q196,80 204,80 Q212,80 212,88 Q212,96 204,104 Q196,96 196,88Z"
                fill="#FF6B6B" opacity="0.85" />
            {/* Heart shine */}
            <path d="M199,84 Q202,81 205,82" stroke="#FFFFFF" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
        </g>

        {/* Stars / sparkles */}
        <circle cx="178" cy="68" r="4" fill="#FFD166" className="illustration__sparkle" />
        <circle cx="28" cy="120" r="2.5" fill="#4CC9F0" className="illustration__sparkle" style={{ animationDelay: '1.2s' }} />
        <path d="M200,50 L201.5,56 L208,57.5 L201.5,59 L200,65 L198.5,59 L192,57.5 L198.5,56Z"
            fill="#FFD166" opacity="0.6" className="illustration__sparkle" style={{ animationDelay: '0.5s' }} />
    </svg>
)


/* ─────────────────────────────────────────────────────────────
   ProjectsIllustration — Rocket with orbit ring + stars
   Viewbox: 240 × 260
   ───────────────────────────────────────────────────────────── */
export const ProjectsIllustration = ({ className = '' }) => (
    <svg
        className={`illustration illustration--projects ${className}`}
        viewBox="0 0 240 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <defs>
            <linearGradient id="pr-body" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#D4D4E4" />
            </linearGradient>
            <linearGradient id="pr-flame" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFD166" />
                <stop offset="50%" stopColor="#FF9A3C" />
                <stop offset="100%" stopColor="#FF6B6B" />
            </linearGradient>
            <radialGradient id="pr-exhaust" cx="50%" cy="0%" r="100%">
                <stop offset="0%" stopColor="#FFD166" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0" />
            </radialGradient>
        </defs>

        {/* Background stars */}
        {[
            [30, 30, 1.5], [55, 18, 1], [180, 24, 2], [204, 40, 1], [20, 100, 1.2],
            [218, 120, 1.5], [24, 188, 1], [214, 200, 1.2], [40, 220, 1.5], [200, 240, 1]
        ].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill="#CDD9E5" opacity={0.4 + i * 0.04} />
        ))}

        {/* Orbit ring */}
        <ellipse cx="120" cy="195" rx="68" ry="18"
            stroke="#4361EE" strokeWidth="1.5" strokeDasharray="6 5" fill="none" opacity="0.28" />

        {/* Small satellite on orbit */}
        <g className="illustration__float" style={{ animationDelay: '1.8s' }}>
            <rect x="176" y="183" width="14" height="10" rx="3" fill="#4CC9F0" opacity="0.85" />
            <rect x="168" y="186" width="8" height="4" rx="1" fill="#4CC9F0" opacity="0.6" />
            <rect x="190" y="186" width="8" height="4" rx="1" fill="#4CC9F0" opacity="0.6" />
        </g>

        {/* ── Rocket (floating) ── */}
        <g className="illustration__float" style={{ animationDelay: '0.2s' }}>

            {/* Exhaust glow */}
            <ellipse cx="120" cy="170" rx="18" ry="30" fill="url(#pr-exhaust)" opacity="0.5" />

            {/* Main flame */}
            <path d="M108,152 Q120,185 132,152 Q126,165 120,168 Q114,165 108,152Z"
                fill="url(#pr-flame)" />
            {/* Inner flame (bright core) */}
            <path d="M113,152 Q120,175 127,152 Q123,162 120,164 Q117,162 113,152Z"
                fill="#FFFDE4" opacity="0.85" />

            {/* Fins — left */}
            <path d="M98,120 L72,158 L98,148Z" fill="#D63031" />
            <path d="M98,120 L72,158 L98,148Z" fill="#FF6B6B" opacity="0.4" />
            {/* Left fin edge highlight */}
            <path d="M98,120 L72,158" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.3" />

            {/* Fins — right */}
            <path d="M142,120 L168,158 L142,148Z" fill="#D63031" />
            <path d="M142,120 L168,158 L142,148Z" fill="#FF6B6B" opacity="0.4" />
            <path d="M142,120 L168,158" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.3" />

            {/* Rocket body */}
            <path d="M120,18 Q148,52 148,120 L120,134 L92,120 Q92,52 120,18Z"
                fill="url(#pr-body)" />
            {/* Body center seam */}
            <line x1="120" y1="18" x2="120" y2="134" stroke="#C0C0D0" strokeWidth="0.8" opacity="0.4" />
            {/* Body panels */}
            <path d="M102,60 Q92,90 92,120 L102,124 Q98,96 102,60Z" fill="#E8E8F4" opacity="0.35" />
            <path d="M138,60 Q148,90 148,120 L138,124 Q142,96 138,60Z" fill="#D0D0E4" opacity="0.3" />

            {/* Nose cone tint */}
            <path d="M120,18 Q140,40 148,70 Q134,50 120,40 Q106,50 92,70 Q100,40 120,18Z"
                fill="#4361EE" opacity="0.08" />

            {/* Porthole */}
            <circle cx="120" cy="75" r="17" fill="#1A1A2E" stroke="#A0A0B8" strokeWidth="2.5" />
            <circle cx="120" cy="75" r="13" fill="#0D1117" />
            <circle cx="120" cy="75" r="13" fill="#4361EE" opacity="0.15" />
            {/* Porthole shine */}
            <path d="M112,67 Q118,63 124,66" stroke="#FFFFFF" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.45" />
            {/* Porthole reflection */}
            <ellipse cx="115" cy="68" rx="3" ry="2" fill="#FFFFFF" opacity="0.12" />

            {/* Rivet dots */}
            <circle cx="98" cy="104" r="1.5" fill="#B0B0C8" opacity="0.6" />
            <circle cx="142" cy="104" r="1.5" fill="#B0B0C8" opacity="0.6" />
            <circle cx="96" cy="90" r="1.2" fill="#B0B0C8" opacity="0.5" />
            <circle cx="144" cy="90" r="1.2" fill="#B0B0C8" opacity="0.5" />
        </g>

        {/* Sparkles */}
        <circle cx="44" cy="44" r="4.5" fill="#FFD166" className="illustration__sparkle" />
        <path d="M185,36 L187,44 L195,46 L187,48 L185,56 L183,48 L175,46 L183,44Z"
            fill="#4CC9F0" opacity="0.6" className="illustration__sparkle" style={{ animationDelay: '0.6s' }} />
        <circle cx="204" cy="72" r="3.5" fill="#FF6B6B" className="illustration__sparkle" style={{ animationDelay: '2.2s' }} />
        <circle cx="30" cy="160" r="2.5" fill="#4361EE" className="illustration__sparkle" style={{ animationDelay: '1.5s' }} />
    </svg>
)


/* ─────────────────────────────────────────────────────────────
   FooterIllustration — Botanical plant accent
   Viewbox: 140 × 80
   ───────────────────────────────────────────────────────────── */
export const FooterIllustration = ({ className = '' }) => (
    <svg
        className={`illustration illustration--footer ${className}`}
        viewBox="0 0 140 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        {/* Main stem */}
        <path d="M70,74 Q68,58 64,42 Q61,26 58,12"
            stroke="#2D6A4F" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Secondary stems */}
        <path d="M66,52 Q76,46 86,50" stroke="#52B788" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M64,38 Q52,32 42,38" stroke="#52B788" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M61,24 Q70,16 80,20" stroke="#52B788" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M59,16 Q50,10 40,14" stroke="#74C69D" strokeWidth="1.2" strokeLinecap="round" fill="none" />

        {/* Leaf 1 — top-left (large) */}
        <path d="M58,12 Q36,20 42,38 Q56,28 58,12Z" fill="#52B788" opacity="0.45" />
        <path d="M58,12 Q46,24 42,38" stroke="#2D6A4F" strokeWidth="0.9" fill="none" opacity="0.55" />
        {/* Leaf vein 1 */}
        <path d="M53,16 Q47,28 44,36" stroke="#2D6A4F" strokeWidth="0.5" fill="none" opacity="0.3" />

        {/* Leaf 2 — right mid */}
        <path d="M66,52 Q92,40 86,50 Q80,62 66,52Z" fill="#74C69D" opacity="0.35" />
        <path d="M66,52 Q78,46 86,50" stroke="#2D6A4F" strokeWidth="0.8" fill="none" opacity="0.45" />

        {/* Leaf 3 — top-right small */}
        <path d="M61,24 Q82,14 80,20 Q76,32 61,24Z" fill="#95D5B2" opacity="0.3" />

        {/* Leaf 4 — left small */}
        <path d="M59,16 Q36,8 40,14 Q44,22 59,16Z" fill="#52B788" opacity="0.28" />

        {/* Ground / pot base */}
        <ellipse cx="70" cy="76" rx="10" ry="3" fill="#2D6A4F" opacity="0.18" />

        {/* Berry cluster at tip */}
        <circle cx="57" cy="11" r="4" fill="#D63031" opacity="0.82" />
        <circle cx="64" cy="9" r="3" fill="#E04040" opacity="0.65" />
        <circle cx="52" cy="8" r="2.2" fill="#C02020" opacity="0.55" />
        {/* Berry shine */}
        <circle cx="55.5" cy="9.5" r="1.2" fill="#FFFFFF" opacity="0.4" />

        {/* Sparkle */}
        <circle cx="40" cy="6" r="2.8" fill="#FFD166" className="illustration__sparkle" />
        <circle cx="92" cy="44" r="2" fill="#4CC9F0" className="illustration__sparkle" style={{ animationDelay: '1.2s' }} />
    </svg>
)