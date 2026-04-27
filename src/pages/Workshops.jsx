import { useState, useEffect, memo } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
    ArrowLeftIcon,
    SewingPinIcon,
    CalendarIcon,
    PersonIcon,
    ClockIcon,
    IdCardIcon,
    StarIcon,
    Cross2Icon,
    CodeIcon,
    LayersIcon,
    CameraIcon,
    ArrowTopRightIcon
} from '@radix-ui/react-icons'
import SEO from '../components/SEO'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Typewriter from '../components/animations/Typewriter'
import NumberCounter from '../components/animations/NumberCounter'
import './Workshops.css'

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const workshops = [
    {
        id: 1,
        type: 'workshop',
        number: '01',
        icon: CodeIcon,
        title: 'SUI Move 101',
        subtitle: 'Workshop Contribution',
        tagline: 'Blockchain & Smart Contracts with Sui Move',
        badges: ['Blockchain', 'Community', 'Event Management'],
        color: '#06C167',
        meta: [
            { icon: StarIcon, label: 'Event', value: 'Build on Sui Move 101' },
            { icon: SewingPinIcon, label: 'Location', value: 'SJC Institute of Technology' },
            { icon: CalendarIcon, label: 'Date', value: 'Nov 10–12, 2025' },
            { icon: PersonIcon, label: 'Participants', value: '38+ Students' },
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
                title: 'Workshop Topics',
                intro: 'The event introduced students to the following topics:',
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
        number: '02',
        icon: LayersIcon,
        title: 'Rust × Hifly',
        subtitle: 'Workshop Contribution',
        tagline: 'Systems Programming — Memory Safety & Ownership',
        badges: ['Rust Programming', 'Community', 'Event Management'],
        color: '#06C167',
        meta: [
            { icon: StarIcon, label: 'Event', value: 'Rust × Hifly Workshop' },
            { icon: SewingPinIcon, label: 'Location', value: 'CSE Seminar Hall, SJCIT' },
            { icon: CalendarIcon, label: 'Date', value: 'Nov 25–26, 2025' },
            { icon: ClockIcon, label: 'Duration', value: '2 Days' },
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
                title: 'Topics Covered',
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
        number: '03',
        icon: StarIcon,
        title: 'Sambrama 2025',
        subtitle: 'Core Committee Member',
        tagline: 'Cultural Fest — Creative Leadership & Planning',
        badges: ['Graphic Design', 'Core Committee', 'Event Planning'],
        color: '#06C167',
        meta: [
            { icon: StarIcon, label: 'Event', value: 'Sambrama 2025' },
            { icon: SewingPinIcon, label: 'Location', value: 'SJCIT Campus' },
            { icon: IdCardIcon, label: 'Role', value: 'Core Committee Member' },
            { icon: PersonIcon, label: 'Type', value: 'Cultural Fest' },
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
        number: '04',
        icon: CameraIcon,
        title: 'Technotsava',
        subtitle: 'Event Documentation',
        tagline: 'Tech Fest — Photography & Videography Lead',
        badges: ['Photography', 'Videography', 'Event Coverage'],
        color: '#06C167',
        meta: [
            { icon: StarIcon, label: 'Event', value: 'Technotsava' },
            { icon: SewingPinIcon, label: 'Location', value: 'SJCIT Campus' },
            { icon: IdCardIcon, label: 'Role', value: 'Lead Documentation' },
            { icon: PersonIcon, label: 'Type', value: 'Tech Fest' },
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
   MODAL
───────────────────────────────────────────────────────────── */
const WorkshopModal = memo(({ workshop, onClose }) => {
    const Icon = workshop.icon

    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handler)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handler)
            document.body.style.overflow = ''
        }
    }, [onClose])

    const handleCardMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width);
        const y = ((e.clientY - rect.top) / rect.height);
        
        const rotateX = (0.5 - y) * 10;
        const rotateY = (x - 0.5) * 10;

        card.style.setProperty('--mouse-x', `${x * 100}%`);
        card.style.setProperty('--mouse-y', `${y * 100}%`);
        card.style.setProperty('--rotate-x', `${rotateX}deg`);
        card.style.setProperty('--rotate-y', `${rotateY}deg`);
    };

    const handleCardMouseLeave = (e) => {
        const card = e.currentTarget;
        card.style.setProperty('--rotate-x', `0deg`);
        card.style.setProperty('--rotate-y', `0deg`);
    };

    return createPortal(
        <div
            className="ws-modal-backdrop"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={workshop.title}
        >
            <div
                className="ws-modal"
                onClick={(e) => e.stopPropagation()}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
            >
                {/* Hero banner */}
                <div className="ws-modal__hero">
                    <div className="ws-modal__hero-glow" aria-hidden="true" />
                    <button
                        className="ws-modal__close"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <Cross2Icon width={18} height={18} />
                    </button>
                    <div className="ws-modal__hero-icon">
                        <Icon width={28} height={28} />
                    </div>
                    <span className="ws-modal__chip font-mono">
                        {workshop.type === 'workshop' ? 'Workshop' : 'Event'}
                    </span>
                    <h2 className="ws-modal__title">{workshop.title}</h2>
                    <p className="ws-modal__tagline">{workshop.tagline}</p>
                </div>

                {/* Meta info bar */}
                <div className="ws-modal__meta-bar">
                    {workshop.meta.map(({ icon: MetaIcon, label, value }) => (
                        <div key={label} className="ws-modal__meta-item">
                            <div className="ws-modal__meta-icon">
                                <MetaIcon width={15} height={15} />
                            </div>
                            <div className="ws-modal__meta-text">
                                <span className="ws-modal__meta-label font-mono">{label}</span>
                                <span className="ws-modal__meta-value">{value}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Badges */}
                <div className="ws-modal__badges-wrap">
                    {workshop.badges.map((b) => (
                        <span key={b} className="ws-modal__badge font-mono">{b}</span>
                    ))}
                </div>

                {/* Content sections */}
                <div className="ws-modal__content">
                    {workshop.sections.map((section) => (
                        <div key={section.title} className="ws-modal__section">
                            <h3 className="ws-modal__section-title">{section.title}</h3>
                            {section.intro && (
                                <p className="ws-modal__section-intro">{section.intro}</p>
                            )}
                            <ul className="ws-modal__section-list">
                                {section.items.map((item, i) => (
                                    <li key={i}>
                                        <span className="ws-modal__item-num font-mono">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className="ws-modal__item-text">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>,
        document.body
    )
})

/* ─────────────────────────────────────────────────────────────
   CARD
───────────────────────────────────────────────────────────── */
const WorkshopCard = memo(({ workshop, index, onClick }) => {
    const Icon = workshop.icon

    const handleCardMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width);
        const y = ((e.clientY - rect.top) / rect.height);
        
        const rotateX = (0.5 - y) * 15;
        const rotateY = (x - 0.5) * 15;

        card.style.setProperty('--mouse-x', `${x * 100}%`);
        card.style.setProperty('--mouse-y', `${y * 100}%`);
        card.style.setProperty('--rotate-x', `${rotateX}deg`);
        card.style.setProperty('--rotate-y', `${rotateY}deg`);
    };

    const handleCardMouseLeave = (e) => {
        const card = e.currentTarget;
        card.style.setProperty('--rotate-x', `0deg`);
        card.style.setProperty('--rotate-y', `0deg`);
    };

    return (
        <article
            className="ws-card"
            style={{ '--card-delay': `${index * 80}ms` }}
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-label={`Open ${workshop.title} details`}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
        >
            {/* Green top bar on hover */}
            <div className="ws-card__shimmer" aria-hidden="true" />

            {/* Top: icon + number/type */}
            <div className="ws-card__top">
                <div className="ws-card__icon-wrap">
                    <Icon width={20} height={20} />
                </div>
                <div className="ws-card__top-meta">
                    <span className="ws-card__num font-mono">{workshop.number}</span>
                    <span className="ws-card__status font-mono">
                        {workshop.type === 'workshop' ? 'Workshop' : 'Event'}
                    </span>
                </div>
            </div>

            {/* Body */}
            <div className="ws-card__body">
                <h3 className="ws-card__title">{workshop.title}</h3>
                <p className="ws-card__tagline">{workshop.tagline}</p>
            </div>

            {/* Meta strip */}
            <div className="ws-card__meta">
                {workshop.meta.slice(0, 2).map(({ icon: MIcon, value }) => (
                    <div key={value} className="ws-card__meta-item">
                        <MIcon width={11} height={11} />
                        <span>{value}</span>
                    </div>
                ))}
            </div>

            {/* Badges */}
            <div className="ws-card__badges">
                {workshop.badges.map((b) => (
                    <span key={b} className="ws-card__badge font-mono">{b}</span>
                ))}
            </div>

            {/* Footer CTA */}
            <div className="ws-card__footer">
                <span className="ws-card__cta font-mono">View Details</span>
                <ArrowTopRightIcon width={14} height={14} />
            </div>
        </article>
    )
})

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
const Workshops = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activeFilter, setActiveFilter] = useState('all')
    const [selectedId, setSelectedId] = useState(null)

    const filtered = workshops.filter(
        (w) => activeFilter === 'all' || w.type === activeFilter
    )
    const selectedWorkshop = workshops.find((w) => w.id === selectedId)

    const filters = [
        { id: 'all', label: 'All', count: workshops.length },
        { id: 'workshop', label: 'Workshops', count: workshops.filter(w => w.type === 'workshop').length },
        { id: 'event', label: 'Events', count: workshops.filter(w => w.type === 'event').length },
    ]

    return (
        <div className="page-transition-wrapper">
            <div className="workshops-page">
            <SEO
                title="Tech Workshops & Events"
                description="Browse technical workshops and community events led by Bhaskar T. Focused on Sui Move, Rust programming, and technical event management."
                url="/workshops"
            />

            <div className="container">

                {/* Hero */}
                <header className="ws-hero">
                    <div className="ws-hero__content">
                        <span className="ws-hero__label">Portfolio · Community</span>
                        <h1 className="ws-hero__title">
                            Workshops &amp;&nbsp;<span className="ws-hero__title-accent">Events</span>
                        </h1>
                        <span className="ws-hero__subtitle font-mono" style={{ minHeight: '27px', display: 'inline-block' }}>
                            <Typewriter text="Sharing knowledge · Building community · Creating impact" delay={25} startDelay={600} />
                        </span>
                    </div>

                    {/* Stats row */}
                    <div className="ws-stats">
                        {[
                            { num: workshops.length, label: 'Total' },
                            { num: workshops.filter(w => w.type === 'workshop').length, label: 'Workshops' },
                            { num: workshops.filter(w => w.type === 'event').length, label: 'Events' },
                            { num: '38+', label: 'Students' },
                        ].map((s, i) => (
                            <div key={s.label} className="ws-stat">
                                <span className="ws-stat__num">
                                    <NumberCounter 
                                        end={typeof s.num === 'number' ? s.num : parseInt(s.num)} 
                                        suffix={typeof s.num === 'string' ? s.num.replace(/[0-9]/g, '') : ''} 
                                        duration={2000} 
                                        delay={i * 200}
                                    />
                                </span>
                                <span className="ws-stat__label font-mono">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </header>

                {/* Filters */}
                <nav className="ws-filters" aria-label="Filter workshops">
                    {filters.map(({ id, label, count }) => (
                        <button
                            key={id}
                            className={`ws-filter-btn${activeFilter === id ? ' ws-filter-btn--active' : ''} font-mono`}
                            onClick={() => setActiveFilter(id)}
                            aria-pressed={activeFilter === id}
                        >
                            {label}
                            <span className="ws-filter-btn__count">{count}</span>
                        </button>
                    ))}
                </nav>

                <p className="ws-hint font-mono">Click any card to view full details</p>

                {/* Card grid */}
                <div className="ws-grid">
                    {filtered.length > 0 ? (
                        filtered.map((workshop, index) => (
                            <WorkshopCard
                                key={workshop.id}
                                workshop={workshop}
                                index={index}
                                onClick={() => setSelectedId(workshop.id)}
                            />
                        ))
                    ) : (
                        <div className="ws-empty">
                            <p>No items match the current filter.</p>
                        </div>
                    )}
                </div>

                {/* Back nav */}
                <div className="ws-back-nav">
                    <Link to="/" className="btn ws-back-btn">
                        <ArrowLeftIcon width={14} height={14} />
                        <span>Back to Portfolio</span>
                    </Link>
                </div>
            </div>

            {/* Modal */}
            {selectedWorkshop && (
                <WorkshopModal
                    workshop={selectedWorkshop}
                    onClose={() => setSelectedId(null)}
                />
            )}
        </div>
        </div>
    )
}

export default Workshops