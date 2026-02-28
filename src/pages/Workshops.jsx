import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, Users, Clock, Briefcase, Star } from 'lucide-react'
import SEO from '../components/SEO'
import './Workshops.css'

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const workshops = [
    {
        id: 1,
        type: 'workshop',
        title: 'SUI Move 101',
        subtitle: 'Workshop Contribution',
        badges: ['Blockchain', 'Community', 'Event Management'],
        meta: [
            { icon: Star, label: 'Event', value: 'Build on Sui Move 101' },
            { icon: MapPin, label: 'Location', value: 'SJC Institute of Technology' },
            { icon: Calendar, label: 'Date', value: 'Nov 10–12, 2025' },
            { icon: Users, label: 'Participants', value: '38+ Students' },
        ],
        sections: [
            {
                title: 'My Contributions',
                items: [
                    'Designed the official promotional poster for the workshop',
                    'Created Google Forms for registrations and feedback collection',
                    'Captured event photos and videos across all three days for documentation',
                    'Assisted the organizing team to ensure smooth workflow during the sessions',
                ],
            },
            {
                title: 'About the Workshop',
                intro: 'The event introduced students to the following topics and practical workflows:',
                items: [
                    'Blockchain fundamentals & Sui architecture',
                    'Move programming & Smart contract development',
                    'Hands-on deployment using Sui tools and CLI',
                ],
            },
            {
                title: 'Impact',
                items: [
                    'Strengthened experience in technical event coordination',
                    'Improved skills in creative design for academic events',
                    'Fostered collaboration with speakers, faculty, and student teams',
                ],
            },
        ],
    },
    {
        id: 2,
        type: 'workshop',
        title: 'Rust × Hifly',
        subtitle: 'Workshop Contribution',
        badges: ['Rust Programming', 'Community', 'Event Management'],
        meta: [
            { icon: Star, label: 'Event', value: 'Rust × Hifly Workshop' },
            { icon: MapPin, label: 'Location', value: 'CSE Seminar Hall, SJCIT' },
            { icon: Calendar, label: 'Date', value: 'Nov 25–26, 2025' },
            { icon: Clock, label: 'Duration', value: '2 Days' },
        ],
        sections: [
            {
                title: 'My Contributions',
                items: [
                    'Designed the official promotional poster for the workshop',
                    'Created Google Forms for registrations and attendance tracking',
                    'Coordinated with speakers and organizing team for smooth execution',
                    'Managed event documentation through photos and videos',
                ],
            },
            {
                title: 'Workshop Topics Covered',
                items: [
                    'Rust fundamentals — syntax, variables, and data types',
                    "Ownership & Borrowing — understanding Rust's memory safety",
                    'Control flow and pattern matching techniques',
                    'Functions & Error handling in Rust',
                    'Hands-on exercises and code reviews with participants',
                ],
            },
            {
                title: 'Impact',
                items: [
                    'Introduced students to systems programming with Rust',
                    'Enhanced skills in technical event coordination and design',
                    'Strengthened collaboration with CSE department faculty and student teams',
                ],
            },
        ],
    },
    {
        id: 3,
        type: 'event',
        title: 'Sambrama 2025',
        subtitle: 'Core Committee Member',
        badges: ['Graphic Design', 'Core Committee', 'Event Planning'],
        meta: [
            { icon: Star, label: 'Event', value: 'Sambrama 2025' },
            { icon: MapPin, label: 'Location', value: 'SJCIT Campus' },
            { icon: Briefcase, label: 'Role', value: 'Core Committee Member' },
            { icon: Users, label: 'Type', value: 'Cultural Fest' },
        ],
        sections: [
            {
                title: 'My Contributions',
                items: [
                    'Designed official promotional posters for the event branding',
                    'Served as core committee member coordinating event activities',
                    'Collaborated with teams to ensure smooth event execution',
                    'Contributed to strategic planning and decision-making processes',
                ],
            },
            {
                title: 'Responsibilities',
                items: [
                    'Creative design leadership for visual communications',
                    'Event coordination across multiple departments',
                    'Team collaboration with organizing committee members',
                    'Marketing and promotion through visual content',
                ],
            },
            {
                title: 'Impact',
                items: [
                    'Enhanced skills in event management and leadership',
                    'Strengthened expertise in graphic design and branding',
                    'Developed organizational and coordination abilities',
                ],
            },
        ],
    },
    {
        id: 4,
        type: 'event',
        title: 'Technotsava',
        subtitle: 'Event Documentation',
        badges: ['Photography', 'Videography', 'Event Coverage'],
        meta: [
            { icon: Star, label: 'Event', value: 'Technotsava' },
            { icon: MapPin, label: 'Location', value: 'SJCIT Campus' },
            { icon: Briefcase, label: 'Role', value: 'Lead Documentation' },
            { icon: Users, label: 'Type', value: 'Tech Fest' },
        ],
        sections: [
            {
                title: 'My Role',
                items: [
                    'Handled complete photography coverage throughout the event',
                    'Managed videography and video documentation of all key moments',
                    'Captured technical sessions, competitions, and cultural activities',
                    'Created visual content for promotional and archival purposes',
                ],
            },
            {
                title: 'Coverage Highlights',
                items: [
                    'Multi-day event documentation across various venues',
                    'Technical competitions and hackathon coverage',
                    'Guest speaker sessions and panel discussions',
                    'Student activities and cultural performances',
                ],
            },
            {
                title: 'Impact',
                items: [
                    'Enhanced skills in event photography and live coverage',
                    'Improved proficiency in video editing and production',
                    'Developed expertise in capturing technical events effectively',
                ],
            },
        ],
    },
]

/* ─────────────────────────────────────────────────────────────
   HOOK — stagger reveal on scroll
───────────────────────────────────────────────────────────── */
function useStaggerReveal(deps) {
    const refs = useRef([])

    useEffect(() => {
        refs.current = refs.current.slice(0, deps.length)

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.08 }
        )

        refs.current.forEach((el) => el && observer.observe(el))
        return () => observer.disconnect()
    }, [deps])

    return refs
}

/* ─────────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────────── */
const TypeChip = ({ type }) => (
    <span className={`type-chip type-chip--${type}`}>
        {type === 'workshop' ? 'Workshop' : 'Event'}
    </span>
)

const MetaGrid = ({ items }) => (
    <div className="meta-grid">
        {items.map(({ icon: Icon, label, value }) => (
            <div key={label} className="meta-item">
                <span className="meta-label">
                    <Icon size={11} strokeWidth={2} aria-hidden="true" />
                    {label}
                </span>
                <span className="meta-value">{value}</span>
            </div>
        ))}
    </div>
)

const Section = ({ title, intro, items }) => (
    <div className="section">
        <h3 className="section-title">{title}</h3>
        {intro && <p className="section-intro">{intro}</p>}
        <ul>
            {items.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
        </ul>
    </div>
)

const WorkshopCard = ({ workshop, index, cardRef }) => (
    <article
        ref={cardRef}
        className="workshop-card card-stagger"
        style={{ '--stagger-delay': `${index * 80}ms` }}
        data-type={workshop.type}
    >
        {/* Card header row */}
        <div className="card-header">
            <div className="card-header__titles">
                <p className="card-subtitle">{workshop.subtitle}</p>
                <h2 className="workshop-title">{workshop.title}</h2>
            </div>
            <TypeChip type={workshop.type} />
        </div>

        {/* Badges */}
        <div className="badges" role="list" aria-label="Tags">
            {workshop.badges.map((badge) => (
                <span key={badge} className="badge" role="listitem">{badge}</span>
            ))}
        </div>

        {/* Meta info */}
        <MetaGrid items={workshop.meta} />

        {/* Content sections */}
        {workshop.sections.map((section) => (
            <Section key={section.title} {...section} />
        ))}
    </article>
)

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
const Workshops = () => {
    const [activeFilter, setActiveFilter] = useState('all')

    const filtered = workshops.filter(
        (w) => activeFilter === 'all' || w.type === activeFilter
    )

    const cardRefs = useStaggerReveal(filtered)

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'workshop', label: 'Workshops' },
        { id: 'event', label: 'Events' },
    ]

    return (
        <div className="workshops-page">
            <SEO
                title="Workshops & Events"
                description="Workshops and events Bhaskar T has contributed to or organized — SUI Move, Rust × Hifly, Sambrama 2025, and more."
                url="/workshops"
            />

            <div className="container">
                {/* ── Header ── */}
                <header className="page-header">
                    <div className="label" aria-hidden="true">Community</div>
                    <h1>Workshops &amp; Events</h1>
                    <p className="subtitle">Sharing knowledge and building together</p>
                </header>

                {/* ── Filter bar ── */}
                <nav className="filter-container" aria-label="Filter workshops">
                    {filters.map(({ id, label }) => (
                        <button
                            key={id}
                            className={`filter-btn${activeFilter === id ? ' active' : ''}`}
                            onClick={() => setActiveFilter(id)}
                            aria-pressed={activeFilter === id}
                        >
                            {label}
                            {id !== 'all' && (
                                <span className="filter-count">
                                    {workshops.filter((w) => w.type === id).length}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                {/* ── Cards ── */}
                <div className="cards-list" role="list">
                    {filtered.map((workshop, index) => (
                        <WorkshopCard
                            key={workshop.id}
                            workshop={workshop}
                            index={index}
                            cardRef={(el) => (cardRefs.current[index] = el)}
                        />
                    ))}
                </div>

                {/* ── Back nav ── */}
                <div className="back-nav">
                    <Link to="/" className="btn-back">
                        <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
                        <span>Back to Portfolio</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Workshops