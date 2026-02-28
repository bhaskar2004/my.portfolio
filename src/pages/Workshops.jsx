import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, Users, Clock, Briefcase, Star, ChevronDown } from 'lucide-react'
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
function useStaggerReveal(count) {
    const refs = useRef([])

    useEffect(() => {
        refs.current = refs.current.slice(0, count)

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.05 }
        )

        refs.current.forEach((el) => el && observer.observe(el))
        return () => observer.disconnect()
    }, [count])

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

const Section = ({ title, intro, items }) => (
    <div className="section">
        <h3 className="section-title">{title}</h3>
        {intro && <p className="section-intro">{intro}</p>}
        <ul>
            {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
    </div>
)

/* ─────────────────────────────────────────────────────────────
   ACCORDION ITEM
───────────────────────────────────────────────────────────── */
const AccordionItem = ({ workshop, index, isOpen, onToggle, itemRef }) => {
    const panelId = `panel-${workshop.id}`
    const triggerId = `trigger-${workshop.id}`

    return (
        <article
            ref={itemRef}
            className={`accordion-item${isOpen ? ' open' : ''}`}
            style={{ '--stagger-delay': `${index * 80}ms` }}
            data-type={workshop.type}
        >
            {/* ── Trigger row ── */}
            <button
                id={triggerId}
                className="accordion-trigger"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={panelId}
            >
                {/* Index */}
                <span className="row-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                </span>

                {/* Title block */}
                <span className="row-title-block">
                    <span className="row-subtitle">{workshop.subtitle}</span>
                    <span className="row-title">{workshop.title}</span>
                </span>

                {/* Badges */}
                <span className="row-badges" aria-hidden="true">
                    {workshop.badges.slice(0, 2).map((b) => (
                        <span key={b} className="badge">{b}</span>
                    ))}
                </span>

                {/* Type chip */}
                <TypeChip type={workshop.type} />

                {/* Chevron */}
                <span className="row-chevron" aria-hidden="true">
                    <ChevronDown size={16} strokeWidth={1.5} />
                </span>
            </button>

            {/* ── Expandable panel ── */}
            <div
                id={panelId}
                className="accordion-panel"
                role="region"
                aria-labelledby={triggerId}
            >
                <div className="accordion-panel-inner">
                    <div className="accordion-content">
                        {/* Left: meta */}
                        <div className="content-meta">
                            {workshop.meta.map(({ icon: Icon, label, value }) => (
                                <div key={label} className="meta-row">
                                    <span className="meta-label">
                                        <Icon size={10} strokeWidth={1.5} aria-hidden="true" />
                                        {label}
                                    </span>
                                    <span className="meta-value">{value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Right: sections */}
                        <div className="content-sections">
                            {workshop.sections.map((section) => (
                                <Section key={section.title} {...section} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
const Workshops = () => {
    const [activeFilter, setActiveFilter] = useState('all')
    const [openId, setOpenId] = useState(null)

    const filtered = workshops.filter(
        (w) => activeFilter === 'all' || w.type === activeFilter
    )

    const cardRefs = useStaggerReveal(filtered.length)

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'workshop', label: 'Workshops' },
        { id: 'event', label: 'Events' },
    ]

    const handleFilterChange = (id) => {
        setActiveFilter(id)
        setOpenId(null)
    }

    const handleToggle = (id) => {
        setOpenId((prev) => (prev === id ? null : id))
    }

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
                    <p className="header-eyebrow">Community · Portfolio</p>
                    <h1>Workshops &amp; <strong>Events</strong></h1>
                    <div className="header-meta">
                        <p className="header-desc">Sharing knowledge and building together</p>
                    </div>
                    {/* Ghost total counter */}
                    <span className="header-ghost" aria-hidden="true">
                        {String(workshops.length).padStart(2, '0')}
                    </span>
                </header>

                {/* ── Full-width rule ── */}
                <div className="header-border-top" aria-hidden="true" />

                {/* ── Filter tabs ── */}
                <nav className="filter-container" aria-label="Filter workshops">
                    {filters.map(({ id, label }) => (
                        <button
                            key={id}
                            className={`filter-btn${activeFilter === id ? ' active' : ''}`}
                            onClick={() => handleFilterChange(id)}
                            aria-pressed={activeFilter === id}
                        >
                            {label}
                            {id !== 'all' && (
                                <span className="filter-count" aria-hidden="true">
                                    {workshops.filter((w) => w.type === id).length}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                {/* ── Column headers ── */}
                <div className="directory-header" aria-hidden="true">
                    <span>#</span>
                    <span>Title</span>
                    <span>Tags</span>
                    <span>Type</span>
                    <span />
                </div>

                {/* ── Accordion list ── */}
                <div className="accordion-list" role="list">
                    {filtered.map((workshop, index) => (
                        <AccordionItem
                            key={workshop.id}
                            workshop={workshop}
                            index={index}
                            isOpen={openId === workshop.id}
                            onToggle={() => handleToggle(workshop.id)}
                            itemRef={(el) => (cardRefs.current[index] = el)}
                        />
                    ))}
                </div>

                {/* ── Back nav ── */}
                <div className="back-nav">
                    <Link to="/" className="btn-back">
                        <ArrowLeft size={13} strokeWidth={1.5} aria-hidden="true" />
                        <span>Back to Portfolio</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Workshops