import { projects } from '../../data/projects';

export const portfolioData = {
    bio: {
        name: "Bhaskar T",
        title: "Software Tester & Problem Solver",
        about: "Bhaskar T is a dedicated Software Tester and developer with a passion for creative problem solving and AI integration. Based in Bangalore, he specializes in Java, SQL, and automation, while exploring modern web technologies like React and Next.js.",
        tagline: "Building digital resilience through testing and innovation."
    },
    skills: {
        technical: ["Java", "SQL", "Selenium", "Python", "JavaScript", "React", "Next.js", "IoT", "BotPress"],
        testing: ["Automation Testing", "Manual Testing", "API Testing", "Real-time Monitoring", "Database Management"],
        tools: ["Firebase", "MongoDB", "Geoapify API", "OpenWeatherMap API", "Framer Motion", "Tailwind CSS"]
    },
    experience: [
        {
            role: "Software Development & Testing",
            description: "Built and tested multiple systems ranging from Vehicle Registration (Java/SQL) to Real-Time IoT Navigation (Python/Sensors)."
        }
    ],
    projects: projects.map(p => ({
        id: p.id,
        title: p.title,
        tech: p.tech,
        brief: p.brief,
        url: p.id === 'vehicle-registration' ? '/' : `/project/${p.id}`
    })),
    sections: [
        { name: "Home", path: "/" },
        { name: "About", path: "/#about" },
        { name: "Projects", path: "/#projects" },
        { name: "Workshops", path: "/workshops" },
        { name: "Resume", path: "/resume" },
        { name: "Contact", path: "/#contact" }
    ]
};
