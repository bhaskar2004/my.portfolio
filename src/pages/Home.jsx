import { ArrowUpRight, Car, Navigation as NavigationIcon, CloudRain, MapPin, HeartPulse, Newspaper, Code2, Calculator, Github, Linkedin, Mail } from 'lucide-react'
import SEO from '../components/SEO'
import './Home.css'

const Home = () => {
    /*
     * ── FAQ schema ───────────────────────────────────────────────────────
     * These Q&As target zero-click snippets for name-based queries like
     * "who is bhaskar", "what does bhaskar t do", "bhaskar2004 portfolio".
     * Google pulls the answer text directly into search results.
     */
    const homeFaq = [
        {
            question: 'Who is Bhaskar T?',
            answer:
                'Bhaskar T (also known as bhaskar2004) is a Software Tester and Problem Solver ' +
                'based in India. He is a Computer Science Engineering student at SJC Institute of ' +
                'Technology with expertise in Java, SQL, and Selenium. His portfolio is at bhaskar.xyz.',
        },
        {
            question: 'What does Bhaskar T do?',
            answer:
                'Bhaskar T specialises in software testing, quality assurance, and problem solving. ' +
                'He builds web projects, contributes to open source on GitHub as bhaskar2004, and ' +
                'is passionate about making software reliable and bug-free.',
        },
        {
            question: 'Where can I find Bhaskar T\'s portfolio?',
            answer:
                'Bhaskar T\'s official portfolio is at https://bhaskar.xyz. ' +
                'You can also find him on GitHub at github.com/bhaskar2004 and ' +
                'on LinkedIn at linkedin.com/in/bhaskart2004.',
        },
    ]

    return (
        <>
            <SEO
                /*
                 * isHome → renders ProfilePage schema (most impactful for name ranking)
                 * title  → kept descriptive; SEO component prepends "Bhaskar T –" automatically
                 * faq    → injects FAQPage schema targeting "who is bhaskar" queries
                 */
                isHome
                title="Software Tester & Problem Solver"
                description={
                    'Bhaskar T (bhaskar2004) – Software Tester and Problem Solver based in India. ' +
                    'Official portfolio of Bhaskar at bhaskar.xyz. Explore projects, skills, and the tech journey of Bhaskar T.'
                }
                keywords="Bhaskar T portfolio, bhaskar2004, Bhaskar software tester India, bhaskar.xyz"
                faq={homeFaq}
            /*
             * No jsonLd prop needed here — the new SEO component already
             * emits a richer Person schema with all your details built-in.
             * Passing a second Person schema would create duplicate/conflicting signals.
             */
            />

            {/* ── Hero Section ──────────────────────────────────────────────
                itemScope + itemType + itemProp = microdata layer on top of JSON-LD.
                Two independent signals for the same entity = stronger confidence for Google.
            ─────────────────────────────────────────────────────────────── */}
            <section
                className="hero"
                id="home"
                itemScope
                itemType="https://schema.org/Person"
            >
                {/* Hidden but crawlable identity anchors */}
                <meta itemProp="name" content="Bhaskar T" />
                <meta itemProp="alternateName" content="bhaskar2004" />
                <meta itemProp="url" content="https://bhaskar.xyz" />
                <meta itemProp="email" content="bhaskart.dev@gmail.com" />
                <meta itemProp="jobTitle" content="Software Tester" />
                <meta itemProp="image" content="https://bhaskar.xyz/logo.png" />

                <div className="container">
                    <div className="portfolio-label font-mono" aria-label="Portfolio site">PORTFOLIO</div>

                    {/*
                     * CHANGED: Removed decorative < > angle brackets.
                     * Google was reading the h1 as "< Bhaskar T >" (literal text with
                     * HTML entities) instead of "Bhaskar T". Clean name in h1 is critical.
                     * Keep the visual styling via CSS (e.g. font-mono or a ::before/::after).
                     */}
                    <h1 itemProp="name">Bhaskar T</h1>

                    <p className="subtitle font-mono" itemProp="description">
                        Software Tester &amp; Problem Solver
                    </p>

                    <div className="cta-buttons">
                        <a href="#contact" className="btn primary">Contact Me</a>
                        <a href="#projects" className="btn secondary">View Projects</a>
                        <a
                            href="/resume.pdf"
                            download="Bhaskar_T_Resume.pdf"
                            className="btn outline"
                            aria-label="Download Bhaskar T resume PDF"
                        >
                            Download Resume
                        </a>
                    </div>

                    <div className="social-links" role="list" aria-label="Social media links">
                        {/*
                         * CHANGED: Added rel="me" to all social links.
                         * This is how Google verifies you own these profiles — it matches
                         * rel="me" on your site with rel="me" back-links on the social profiles.
                         * Critical for entity graph verification and Knowledge Panel eligibility.
                         */}
                        <a
                            href="https://github.com/bhaskar2004"
                            target="_blank"
                            rel="noopener noreferrer me"
                            aria-label="Visit Bhaskar T on GitHub"
                            itemProp="sameAs"
                        >
                            <Github size={24} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/bhaskart2004/"
                            target="_blank"
                            rel="noopener noreferrer me"
                            aria-label="Visit Bhaskar T on LinkedIn"
                            itemProp="sameAs"
                        >
                            <Linkedin size={24} />
                        </a>
                        <a
                            href="mailto:bhaskart.dev@gmail.com"
                            aria-label="Send Bhaskar T an email"
                            itemProp="email"
                        >
                            <Mail size={24} />
                        </a>
                    </div>
                </div>
            </section>

            {/* ── About Section ─────────────────────────────────────────── */}
            <section className="about" id="about">
                <div className="container">
                    {/* CHANGED: "About Me" → "About Bhaskar T" — name in headings matters */}
                    <h2>About Bhaskar T</h2>
                    <p className="about-content">
                        {/*
                         * CHANGED: First sentence now includes full name + handle.
                         * Google uses on-page text to confirm entity identity.
                         * The original was good copy but had zero name-signal value.
                         */}
                        I'm Bhaskar T (bhaskar2004) — a CS student who loves finding bugs.
                        I test software until something breaks, then figure out exactly why.
                        My focus is on making software solid, reliable, and production-ready.
                        Details matter, and I'm kind of obsessed with getting them right.
                    </p>

                    <div className="about-grid">
                        {/* Education Timeline — unchanged, already semantic */}
                        <div className="timeline-section">
                            <h3 className="section-title font-mono">EDUCATION TIMELINE</h3>

                            <div className="timeline" role="list">
                                <article className="timeline-item" role="listitem">
                                    <time className="timeline-date font-mono" dateTime="2022/2026">2022 - 2026</time>
                                    <div className="timeline-content">
                                        <h4>SJC Institute of Technology</h4>
                                        <p>Computer Science Engineering</p>
                                        <span className="grade font-mono">Completed</span>
                                    </div>
                                </article>

                                <article className="timeline-item" role="listitem">
                                    <time className="timeline-date font-mono">Completed</time>
                                    <div className="timeline-content">
                                        <h4>BGS PU College</h4>
                                        <p>Pre-University</p>
                                        <span className="grade font-mono">Completed</span>
                                    </div>
                                </article>

                                <article className="timeline-item" role="listitem">
                                    <time className="timeline-date font-mono">Completed</time>
                                    <div className="timeline-content">
                                        <h4>BGS Public School</h4>
                                        <p>High School</p>
                                        <span className="grade font-mono">Completed</span>
                                    </div>
                                </article>
                            </div>
                        </div>

                        {/* Skills Section — unchanged */}
                        <div className="skills-section">
                            <h3 className="section-title">SKILLS</h3>

                            <div className="skill-category">
                                <h4 className="skill-label">Technical Skills:</h4>
                                <p className="skill-items">Core Java, SQL, Selenium</p>
                            </div>

                            <div className="skill-category">
                                <h4 className="skill-label">Tools:</h4>
                                <p className="skill-items">GitHub, IntelliJ, VS Code</p>
                            </div>

                            <div className="skill-category">
                                <h4 className="skill-label">Creative:</h4>
                                <p className="skill-items">Photography, Video Editing</p>
                            </div>

                            <div className="skill-category">
                                <h4 className="skill-label">Languages:</h4>
                                <p className="skill-items">English, Kannada, Telugu, Hindi</p>
                            </div>

                            <div className="skill-category">
                                <h4 className="skill-label">Soft Skills:</h4>
                                <p className="skill-items">Team Collaboration, Problem Solving</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Projects Section ──────────────────────────────────────── */}
            <section className="projects" id="projects">
                <div className="container">
                    <div className="section-header">
                        <h2>Featured Projects</h2>
                        <p className="section-subtitle">Transforming ideas into functional, user-centric solutions</p>
                    </div>

                    <div className="projects-grid">
                        <article className="project-card">
                            <div className="project-header">
                                <div className="project-icon"><Car /></div>
                                <div className="project-meta">
                                    <span className="project-number">#01</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3 className="project-title">Vehicle Registration System</h3>
                                <p className="project-description">A comprehensive system for managing vehicle registrations and owner details with intuitive database management.</p>
                                <div className="tech-stack">
                                    <span className="tech-tag">Java</span>
                                    <span className="tech-tag">SQL</span>
                                </div>
                            </div>
                            <div className="project-footer">
                                <a href="https://github.com/bhaskar2004/vehicle-registration-management-system.git" className="project-link" target="_blank" rel="noopener noreferrer">
                                    <span>View on GitHub</span><ArrowUpRight />
                                </a>
                            </div>
                        </article>

                        <article className="project-card">
                            <div className="project-header">
                                <div className="project-icon"><NavigationIcon /></div>
                                <div className="project-meta">
                                    <span className="project-number">#02</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3 className="project-title">Smart Navigation</h3>
                                <p className="project-description">IoT-powered navigation aid system designed to help visually impaired users navigate safely and independently.</p>
                                <div className="tech-stack">
                                    <span className="tech-tag">IoT</span>
                                    <span className="tech-tag">Python</span>
                                </div>
                            </div>
                            <div className="project-footer">
                                <a href="https://github.com/bhaskar2004/Innovative-Smart-Navigation-Systems-for-Empowering-the-Blind.git" className="project-link" target="_blank" rel="noopener noreferrer">
                                    <span>View on GitHub</span><ArrowUpRight />
                                </a>
                            </div>
                        </article>

                        <article className="project-card">
                            <div className="project-header">
                                <div className="project-icon"><CloudRain /></div>
                                <div className="project-meta">
                                    <span className="project-number">#03</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3 className="project-title">Weather Forecast Bot</h3>
                                <p className="project-description">Intelligent chatbot integrating OpenWeatherMap API to provide multi-city weather forecasts with formatted responses.</p>
                                <div className="tech-stack">
                                    <span className="tech-tag">BotPress</span>
                                    <span className="tech-tag">API</span>
                                </div>
                            </div>
                            <div className="project-footer">
                                <a href="https://github.com/bhaskar2004/weather-bot" className="project-link" target="_blank" rel="noopener noreferrer">
                                    <span>View on GitHub</span><ArrowUpRight />
                                </a>
                            </div>
                        </article>

                        <article className="project-card featured">
                            <div className="project-header">
                                <div className="project-icon"><MapPin /></div>
                                <div className="project-meta">
                                    <span className="project-number">#04</span>
                                    <span className="project-badge">Live</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3 className="project-title">Better Trips</h3>
                                <p className="project-description">Responsive web application showcasing nearby attractions via Geoapify with advanced filters and routing capabilities.</p>
                                <div className="tech-stack">
                                    <span className="tech-tag">JavaScript</span>
                                    <span className="tech-tag">Geoapify API</span>
                                </div>
                            </div>
                            <div className="project-footer">
                                <a href="https://github.com/bhaskar2004/better-trips" className="project-link secondary" target="_blank" rel="noopener noreferrer">
                                    <span>View Code</span><Github />
                                </a>
                                <a href="https://better-trips.vercel.app/" className="project-link primary" target="_blank" rel="noopener noreferrer">
                                    <span>Live Demo</span><ArrowUpRight />
                                </a>
                            </div>
                        </article>

                        <article className="project-card featured">
                            <div className="project-header">
                                <div className="project-icon"><HeartPulse /></div>
                                <div className="project-meta">
                                    <span className="project-number">#05</span>
                                    <span className="project-badge">Live</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3 className="project-title">Blood Donor</h3>
                                <p className="project-description">Web platform that efficiently connects people in need of blood with available donors in their area.</p>
                                <div className="tech-stack">
                                    <span className="tech-tag">Web</span>
                                    <span className="tech-tag">Database</span>
                                </div>
                            </div>
                            <div className="project-footer">
                                <a href="https://github.com/bhaskar2004/blood-donor" className="project-link secondary" target="_blank" rel="noopener noreferrer">
                                    <span>View Code</span><Github />
                                </a>
                                <a href="https://bhaskar2004.github.io/blood-donor/" className="project-link primary" target="_blank" rel="noopener noreferrer">
                                    <span>Live Demo</span><ArrowUpRight />
                                </a>
                            </div>
                        </article>

                        <article className="project-card featured">
                            <div className="project-header">
                                <div className="project-icon"><Newspaper /></div>
                                <div className="project-meta">
                                    <span className="project-number">#06</span>
                                    <span className="project-badge">Live</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3 className="project-title">Feedx</h3>
                                <p className="project-description">Clean and elegant news aggregator delivering the latest headlines from multiple trusted sources in one place.</p>
                                <div className="tech-stack">
                                    <span className="tech-tag">API Integration</span>
                                    <span className="tech-tag">Frontend</span>
                                </div>
                            </div>
                            <div className="project-footer">
                                <a href="https://github.com/bhaskar2004/feedx" className="project-link secondary" target="_blank" rel="noopener noreferrer">
                                    <span>View Code</span><Github />
                                </a>
                                <a href="https://feedx.bhaskar.xyz/" className="project-link primary" target="_blank" rel="noopener noreferrer">
                                    <span>Live Demo</span><ArrowUpRight />
                                </a>
                            </div>
                        </article>

                        <article className="project-card featured">
                            <div className="project-header">
                                <div className="project-icon"><Code2 /></div>
                                <div className="project-meta">
                                    <span className="project-number">#07</span>
                                    <span className="project-badge">Live</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3 className="project-title">CodePreview</h3>
                                <p className="project-description">Intuitive web-based application for previewing and testing code snippets in real-time with instant visual feedback.</p>
                                <div className="tech-stack">
                                    <span className="tech-tag">HTML/CSS</span>
                                    <span className="tech-tag">JavaScript</span>
                                </div>
                            </div>
                            <div className="project-footer">
                                <a href="https://github.com/bhaskar2004/code-preview" className="project-link secondary" target="_blank" rel="noopener noreferrer">
                                    <span>View Code</span><Github />
                                </a>
                                <a href="https://preview.bhaskar.xyz/" className="project-link primary" target="_blank" rel="noopener noreferrer">
                                    <span>Live Demo</span><ArrowUpRight />
                                </a>
                            </div>
                        </article>

                        <article className="project-card featured">
                            <div className="project-header">
                                <div className="project-icon"><Calculator /></div>
                                <div className="project-meta">
                                    <span className="project-number">#08</span>
                                    <span className="project-badge">Live</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3 className="project-title">Advanced Scientific Calculator</h3>
                                <p className="project-description">Modern, feature-rich scientific calculator with elegant UI, supporting advanced mathematical operations and conversions.</p>
                                <div className="tech-stack">
                                    <span className="tech-tag">HTML/CSS</span>
                                    <span className="tech-tag">JavaScript</span>
                                </div>
                            </div>
                            <div className="project-footer">
                                <a href="https://github.com/bhaskar2004/modernCalculator" className="project-link secondary" target="_blank" rel="noopener noreferrer">
                                    <span>View Code</span><Github />
                                </a>
                                <a href="https://bhaskar2004.github.io/modernCalculator/" className="project-link primary" target="_blank" rel="noopener noreferrer">
                                    <span>Live Demo</span><ArrowUpRight />
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* ── Contact Section ───────────────────────────────────────── */}
            <section className="contact" id="contact">
                <div className="container">
                    <h2>Contact Bhaskar T</h2>
                    {/* CHANGED: "Contact" → "Contact Bhaskar T" — name in every heading */}
                    <p className="contact-description">I'm open to work and collaborations. Let's connect!</p>
                    <div className="contact-links" role="list">
                        <a
                            href="mailto:bhaskart.dev@gmail.com"
                            className="contact-item"
                            role="listitem"
                            aria-label="Email Bhaskar T"
                        >
                            <Mail size={20} />
                        </a>
                        <a
                            href="https://github.com/bhaskar2004"
                            target="_blank"
                            rel="noopener noreferrer me"
                            className="contact-item"
                            role="listitem"
                            aria-label="Bhaskar T on GitHub"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/bhaskart2004/"
                            target="_blank"
                            rel="noopener noreferrer me"
                            className="contact-item"
                            role="listitem"
                            aria-label="Bhaskar T on LinkedIn"
                        >
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home