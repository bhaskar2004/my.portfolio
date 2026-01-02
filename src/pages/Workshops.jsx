import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './Workshops.css'

const Workshops = () => {
    const [activeFilter, setActiveFilter] = useState('all')

    const workshops = [
        {
            id: 1,
            type: 'workshop',
            title: 'SUI Move 101 — Workshop Contribution',
            badges: ['Blockchain', 'Community', 'Event Management'],
            meta: {
                event: 'Build on Sui Move 101',
                location: 'SJC Institute of Technology',
                date: 'Nov 10–12, 2025',
                participants: '38+ Students'
            },
            contributions: [
                'Designed the official promotional poster for the workshop',
                'Created Google Forms for registrations and feedback collection',
                'Captured event photos and videos across all three days for documentation',
                'Assisted the organizing team to ensure smooth workflow during the sessions'
            ],
            about: [
                'Blockchain fundamentals & Sui architecture',
                'Move programming & Smart contract development',
                'Hands-on deployment using Sui tools and CLI'
            ],
            impact: [
                'Strengthened experience in technical event coordination',
                'Improved skills in creative design for academic events',
                'Fostered collaboration with speakers, faculty, and student teams'
            ]
        },
        {
            id: 2,
            type: 'workshop',
            title: 'Rust x Hifly — Workshop Contribution',
            badges: ['Rust Programming', 'Community', 'Event Management'],
            meta: {
                event: 'Rust x Hifly Workshop',
                location: 'CSE Seminar Hall, SJCIT',
                date: 'Nov 25–26, 2025',
                duration: '2 Days'
            },
            contributions: [
                'Designed the official promotional poster for the workshop',
                'Created Google Forms for registrations and attendance tracking',
                'Coordinated with speakers and organizing team for smooth execution',
                'Managed event documentation through photos and videos'
            ],
            topics: [
                'Rust fundamentals — syntax, variables, and data types',
                'Ownership & Borrowing — understanding Rust\'s memory safety',
                'Control flow and pattern matching techniques',
                'Functions & Error handling in Rust',
                'Hands-on exercises and code reviews with participants'
            ],
            impact: [
                'Introduced students to systems programming with Rust',
                'Enhanced skills in technical event coordination and design',
                'Strengthened collaboration with CSE department faculty and student teams'
            ]
        },
        {
            id: 3,
            type: 'event',
            title: 'Sambrama 2025 — Core Committee Member',
            badges: ['Graphic Design', 'Core Committee', 'Event Planning'],
            meta: {
                event: 'Sambrama 2025',
                location: 'SJCIT Campus',
                role: 'Core Committee Member',
                type: 'Cultural Fest'
            },
            contributions: [
                'Designed official promotional posters for the event branding',
                'Served as core committee member coordinating event activities',
                'Collaborated with teams to ensure smooth event execution',
                'Contributed to strategic planning and decision-making processes'
            ],
            responsibilities: [
                'Creative design leadership for visual communications',
                'Event coordination across multiple departments',
                'Team collaboration with organizing committee members',
                'Marketing and promotion through visual content'
            ],
            impact: [
                'Enhanced skills in event management and leadership',
                'Strengthened expertise in graphic design and branding',
                'Developed organizational and coordination abilities'
            ]
        },
        {
            id: 4,
            type: 'event',
            title: 'Technotsava — Event Documentation',
            badges: ['Photography', 'Videography', 'Event Coverage'],
            meta: {
                event: 'Technotsava',
                location: 'SJCIT Campus',
                role: 'Lead Documentation',
                type: 'Tech Fest'
            },
            role: [
                'Handled complete photography coverage throughout the event',
                'Managed videography and video documentation of all key moments',
                'Captured technical sessions, competitions, and cultural activities',
                'Created visual content for promotional and archival purposes'
            ],
            highlights: [
                'Multi-day event documentation across various venues',
                'Technical competitions and hackathon coverage',
                'Guest speaker sessions and panel discussions',
                'Student activities and cultural performances'
            ],
            impact: [
                'Enhanced skills in event photography and live coverage',
                'Improved proficiency in video editing and production',
                'Developed expertise in capturing technical events effectively'
            ]
        }
    ]

    const filteredWorkshops = workshops.filter(workshop =>
        activeFilter === 'all' || workshop.type === activeFilter
    )

    return (
        <div className="workshops-page">
            <div className="container">
                <header className="page-header">
                    <div className="label">Community</div>
                    <h1>Workshops & Events</h1>
                    <p className="subtitle">Sharing knowledge and building together</p>
                </header>

                {/* Filter Buttons */}
                <div className="filter-container">
                    <button
                        className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter-btn ${activeFilter === 'workshop' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('workshop')}
                    >
                        Workshops
                    </button>
                    <button
                        className={`filter-btn ${activeFilter === 'event' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('event')}
                    >
                        Events
                    </button>
                </div>

                {/* Workshop Cards */}
                {filteredWorkshops.map(workshop => (
                    <div key={workshop.id} className="workshop-card reveal active" data-type={workshop.type}>
                        <h2 className="workshop-title">{workshop.title}</h2>

                        <div className="badges">
                            {workshop.badges.map((badge, index) => (
                                <span key={index} className="badge">{badge}</span>
                            ))}
                        </div>

                        <div className="meta-grid">
                            {Object.entries(workshop.meta).map(([key, value]) => (
                                <div key={key} className="meta-item">
                                    <span className="meta-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                                    <span className="meta-value">{value}</span>
                                </div>
                            ))}
                        </div>

                        {workshop.contributions && (
                            <div className="section">
                                <h3 className="section-title">My Contributions</h3>
                                <ul>
                                    {workshop.contributions.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {workshop.about && (
                            <div className="section">
                                <h3 className="section-title">About the Workshop</h3>
                                <p style={{ color: 'var(--color-text-muted)', marginBottom: '20px' }}>
                                    The event introduced students to the following topics and practical workflows:
                                </p>
                                <ul>
                                    {workshop.about.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {workshop.topics && (
                            <div className="section">
                                <h3 className="section-title">Workshop Topics Covered</h3>
                                <ul>
                                    {workshop.topics.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {workshop.role && (
                            <div className="section">
                                <h3 className="section-title">My Role</h3>
                                <ul>
                                    {workshop.role.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {workshop.responsibilities && (
                            <div className="section">
                                <h3 className="section-title">Responsibilities</h3>
                                <ul>
                                    {workshop.responsibilities.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {workshop.highlights && (
                            <div className="section">
                                <h3 className="section-title">Coverage Highlights</h3>
                                <ul>
                                    {workshop.highlights.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {workshop.impact && (
                            <div className="section">
                                <h3 className="section-title">Impact</h3>
                                <ul>
                                    {workshop.impact.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}

                <div className="back-nav">
                    <Link to="/" className="btn">
                        <ArrowLeft size={16} />
                        <span>Back to Portfolio</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Workshops
