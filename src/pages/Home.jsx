import { ArrowUpRight, Car, Navigation as NavigationIcon, CloudRain, MapPin, HeartPulse, Newspaper, Code2, Calculator, Github, Linkedin, Mail } from 'lucide-react'
import SEO from '../components/SEO'
import './Home.css'

const Home = () => {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Bhaskar T",
        "url": "https://bhaskar.xyz",
        "image": "https://bhaskar.xyz/logo.png",
        "jobTitle": "Front-End Developer",
        "worksFor": {
            "@type": "Organization",
            "name": "SJC Institute of Technology"
        },
        "sameAs": [
            "https://github.com/bhaskar2004",
            "https://www.linkedin.com/in/bhaskart2004/"
        ],
        "email": "bhaskart.dev@gmail.com"
    }

    return (
        <>
            <SEO
                title="Front-End Developer & Problem Solver"
                description="Bhaskar (bhaskar2004) - Front-End Developer and Problem Solver. Explore my projects, portfolio, skills, and tech journey at bhaskar.xyz."
                jsonLd={personSchema}
            />
            {/* Hero Section */}
            <section className="hero" id="home">
                <div className="container">
                    <div className="portfolio-label font-mono" aria-label="Portfolio site">PORTFOLIO</div>
                    <h1>&lt; Bhaskar T &gt;</h1>
                    <p className="subtitle font-mono">Front-End Dev & Problem Solver</p>

                    <div className="cta-buttons">
                        <a href="#contact" className="btn primary">Contact Me</a>
                        <a href="#projects" className="btn secondary">View Projects</a>
                        <a href="/resume.pdf" download="Bhaskar_T_Resume.pdf" className="btn outline">Download Resume</a>
                    </div>

                    <div className="social-links" role="list" aria-label="Social media links">
                        <a href="https://github.com/bhaskar2004" target="_blank" rel="noopener noreferrer" aria-label="Visit my GitHub profile">
                            <Github size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/bhaskart2004/" target="_blank" rel="noopener noreferrer" aria-label="Visit my LinkedIn profile">
                            <Linkedin size={24} />
                        </a>
                        <a href="mailto:bhaskart.dev@gmail.com" aria-label="Send me an email">
                            <Mail size={24} />
                        </a>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about" id="about">
                <div className="container">
                    <h2>About Me</h2>
                    <p className="about-content">
                        I'm an average Computer Science student who's learning to build exceptional things. I turn ideas into
                        impactful, user-friendly solutions by staying committed to continuous learning and focusing on clean,
                        accessible, and performant web experiences.
                    </p>

                    <div className="about-grid">
                        {/* Education Timeline */}
                        <div className="timeline-section">
                            <h3 className="section-title font-mono">EDUCATION TIMELINE</h3>

                            <div className="timeline" role="list">
                                <article className="timeline-item" role="listitem">
                                    <time className="timeline-date font-mono" dateTime="2022/2026">2022 - 2026</time>
                                    <div className="timeline-content">
                                        <h4>SJC Institute of Technology</h4>
                                        <p>Computer Science Engineering</p>
                                        <span className="grade font-mono">8.67 CGPA</span>
                                    </div>
                                </article>

                                <article className="timeline-item" role="listitem">
                                    <time className="timeline-date font-mono">Completed</time>
                                    <div className="timeline-content">
                                        <h4>BGS PU College</h4>
                                        <p>Pre-University</p>
                                        <span className="grade font-mono">91.33%</span>
                                    </div>
                                </article>

                                <article className="timeline-item" role="listitem">
                                    <time className="timeline-date font-mono">Completed</time>
                                    <div className="timeline-content">
                                        <h4>BGS Public School</h4>
                                        <p>High School</p>
                                        <span className="grade font-mono">96.33%</span>
                                    </div>
                                </article>
                            </div>
                        </div>

                        {/* Skills Section */}
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

            {/* Projects Section */}
            <section className="projects" id="projects">
                <div className="container">
                    <div className="section-header">
                        <h2>Featured Projects</h2>
                        <p className="section-subtitle">Transforming ideas into functional, user-centric solutions</p>
                    </div>

                    <div className="projects-grid">
                        {/* Project 1 */}
                        <article className="project-card">
                            <div className="project-header">
                                <div className="project-icon">
                                    <Car />
                                </div>
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
                                    <span>View on GitHub</span>
                                    <ArrowUpRight />
                                </a>
                            </div>
                        </article>

                        {/* Project 2 */}
                        <article className="project-card">
                            <div className="project-header">
                                <div className="project-icon">
                                    <NavigationIcon />
                                </div>
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
                                    <span>View on GitHub</span>
                                    <ArrowUpRight />
                                </a>
                            </div>
                        </article>

                        {/* Project 3 */}
                        <article className="project-card">
                            <div className="project-header">
                                <div className="project-icon">
                                    <CloudRain />
                                </div>
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
                                    <span>View on GitHub</span>
                                    <ArrowUpRight />
                                </a>
                            </div>
                        </article>

                        {/* Project 4 */}
                        <article className="project-card">
                            <div className="project-header">
                                <div className="project-icon">
                                    <MapPin />
                                </div>
                                <div className="project-meta">
                                    <span className="project-number">#04</span>
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
                                <a href="https://github.com/bhaskar2004/better-trips" className="project-link" target="_blank" rel="noopener noreferrer">
                                    <span>View on GitHub</span>
                                    <ArrowUpRight />
                                </a>
                            </div>
                        </article>

                        {/* Project 5 */}
                        <article className="project-card">
                            <div className="project-header">
                                <div className="project-icon">
                                    <HeartPulse />
                                </div>
                                <div className="project-meta">
                                    <span className="project-number">#05</span>
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
                                <a href="https://github.com/bhaskar2004/blood-donor" className="project-link" target="_blank" rel="noopener noreferrer">
                                    <span>View on GitHub</span>
                                    <ArrowUpRight />
                                </a>
                            </div>
                        </article>

                        {/* Project 6 */}
                        <article className="project-card featured">
                            <div className="project-header">
                                <div className="project-icon">
                                    <Newspaper />
                                </div>
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
                                    <span>View Code</span>
                                    <Github />
                                </a>
                                <a href="https://feedx.bhaskar.xyz/" className="project-link primary" target="_blank" rel="noopener noreferrer">
                                    <span>Live Demo</span>
                                    <ArrowUpRight />
                                </a>
                            </div>
                        </article>

                        {/* Project 7 */}
                        <article className="project-card featured">
                            <div className="project-header">
                                <div className="project-icon">
                                    <Code2 />
                                </div>
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
                                    <span>View Code</span>
                                    <Github />
                                </a>
                                <a href="https://preview.bhaskar.xyz/" className="project-link primary" target="_blank" rel="noopener noreferrer">
                                    <span>Live Demo</span>
                                    <ArrowUpRight />
                                </a>
                            </div>
                        </article>

                        {/* Project 8 */}
                        <article className="project-card featured">
                            <div className="project-header">
                                <div className="project-icon">
                                    <Calculator />
                                </div>
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
                                    <span>View Code</span>
                                    <Github />
                                </a>
                                <a href="https://bhaskar2004.github.io/modernCalculator/" className="project-link primary" target="_blank" rel="noopener noreferrer">
                                    <span>Live Demo</span>
                                    <ArrowUpRight />
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact" id="contact">
                <div className="container">
                    <h2>Contact</h2>
                    <p className="contact-description">I'm open to work and collaborations. Let's connect!</p>
                    <div className="contact-links" role="list">
                        <a href="mailto:bhaskart.dev@gmail.com" className="contact-item" role="listitem">
                            <Mail size={20} />
                        </a>
                        <a href="https://github.com/bhaskar2004" target="_blank" rel="noopener noreferrer" className="contact-item" role="listitem">
                            <Github size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/bhaskart2004/" target="_blank" rel="noopener noreferrer" className="contact-item" role="listitem">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
