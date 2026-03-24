import {
    RocketIcon,
    PaperPlaneIcon,
    LightningBoltIcon,
    SewingPinIcon,
    HeartIcon,
    FileTextIcon,
    CodeIcon,
    KeyboardIcon,
    HomeIcon
} from '@radix-ui/react-icons';

export const projects = [
    {
        id: 'vehicle-registration',
        number: '01',
        title: 'Vehicle Registration System',
        brief: 'Comprehensive system for managing vehicle registrations and owner details with intuitive database management.',
        description: 'A robust desktop application built to streamline the process of vehicle registration. It features a clean interface for data entry, powerful search capabilities, and a structured SQL backend for reliable data persistence.',
        tech: ['Java', 'SQL'],
        github: 'https://github.com/bhaskar2004/vehicle-registration-management-system.git',
        icon: RocketIcon,
        featured: false,
        readme: `
`
    },
    {
        id: 'smart-navigation',
        number: '02',
        title: 'Smart Navigation',
        brief: 'IoT-powered navigation aid system designed to help visually impaired users navigate safely and independently.',
        description: 'An innovative intersection of hardware and software. This project uses ultrasonic sensors and Python-based logic to provide real-time haptic or auditory feedback to users, empowering them to navigate unfamiliar environments with confidence.',
        tech: ['IoT', 'Python'],
        github: 'https://github.com/bhaskar2004/Innovative-Smart-Navigation-Systems-for-Empowering-the-Blind.git',
        icon: PaperPlaneIcon,
        featured: false,
        readme: `# Real-Time Object Detection Using YOLOv5  

This project demonstrates real-time object detection using the YOLOv5 model and a webcam feed. The YOLOv5 algorithm is known for its efficiency and accuracy in detecting and labeling objects in images or videos.  

---

## Features  
- **Real-time Object Detection**: Detect objects in a webcam feed with bounding boxes and labels.  
- **Lightweight and Fast**: Uses the YOLOv5s model for efficient processing.  
- **Extensible**: Can be adapted for use cases like surveillance, assistive technology, or research purposes.  

---

## Prerequisites  
Before running the project, ensure you have the following installed:  
- Python 3.7+  
- Torch and TorchVision  
- OpenCV  

Install the required libraries using:  
\`\`\`bash
pip install torch torchvision opencv-python
\`\`\``
    },
    {
        id: 'weather-bot',
        number: '03',
        title: 'Weather Forecast Bot',
        brief: 'Intelligent chatbot integrating OpenWeatherMap API to provide multi-city weather forecasts with formatted responses.',
        description: 'An automated assistant that brings real-time climate data to your fingertips. Built with BotPress, it handles natural language queries to fetch precise weather details, including temperature, humidity, and wind speed for any city globally.',
        tech: ['BotPress', 'API'],
        github: 'https://github.com/bhaskar2004/weather-bot',
        icon: LightningBoltIcon,
        featured: false,
        readme: ``
    },
    {
        id: 'better-trips',
        number: '04',
        title: 'Better Trips',
        brief: 'Responsive web application showcasing nearby attractions via Geoapify with advanced filters and routing capabilities.',
        description: 'A travel companion app that helps users discover hidden gems around them. It utilizes the Geoapify API for location intelligence, offering interactive maps, category-based filtering, and distance-based sorting.',
        tech: ['JavaScript', 'Geoapify API'],
        github: 'https://github.com/bhaskar2004/better-trips',
        live: 'https://better-trips.vercel.app/',
        icon: SewingPinIcon,
        featured: true,
        readme: ``
    },
    {
        id: 'blood-donor',
        number: '05',
        title: 'Blood Donor',
        brief: 'Web platform that efficiently connects people in need of blood with available donors in their area.',
        description: 'A life-saving digital bridge connecting urgent blood requirements with willing donors. Features include donor registration, proximity-based search, and a simplified communication channel to expedite the donation process.',
        tech: ['Web', 'Database'],
        github: 'https://github.com/bhaskar2004/blood-donor',
        live: 'https://bhaskar2004.github.io/blood-donor/',
        icon: HeartIcon,
        featured: true,
        readme: ``
    },
    {
        id: 'feedx',
        number: '06',
        title: 'Feedx',
        brief: 'Clean and elegant news aggregator delivering the latest headlines from multiple trusted sources in one place.',
        description: 'A minimalist news consumption experience. Feedx aggregates top stories from various global news APIs, presenting them in a highly readable, category-organized layout that works perfectly across all devices.',
        tech: ['API Integration', 'Frontend'],
        github: 'https://github.com/bhaskar2004/feedx',
        live: 'https://feedx.bhaskar.xyz/',
        icon: FileTextIcon,
        featured: true,
        readme: ``
    },
    {
        id: 'codepreview',
        number: '07',
        title: 'CodePreview',
        brief: 'Intuitive web-based application for previewing and testing code snippets in real-time with instant visual feedback.',
        description: 'A lightweight playground for web developers. Write HTML, CSS, and JavaScript in side-by-side editors and see the results instantly in a dedicated preview pane — perfect for quick experiments and component testing.',
        tech: ['HTML/CSS', 'JavaScript'],
        github: 'https://github.com/bhaskar2004/code-preview',
        live: 'https://preview.bhaskar.xyz/',
        icon: CodeIcon,
        featured: true,
        readme: ``
    },
    {
        id: 'modern-calculator',
        number: '08',
        title: 'Advanced Scientific Calculator',
        brief: 'Modern, feature-rich scientific calculator with elegant UI, supporting advanced mathematical operations.',
        description: 'Beyond basic arithmetic, this calculator provides a clean, dark-mode interface for complex trigonometric, logarithmic, and algebraic computations, ensuring accuracy with a sleek modern design.',
        tech: ['HTML/CSS', 'JavaScript'],
        github: 'https://github.com/bhaskar2004/modernCalculator',
        live: 'https://bhaskar2004.github.io/modernCalculator/',
        icon: KeyboardIcon,
        featured: true,
        readme: ``
    },
    {
        id: 'pg-maga',
        number: '09',
        title: 'PG Maga',
        brief: 'Real-time PG accommodation marketplace for Bangalore — live bed availability and owner dashboard.',
        description: 'The ultimate solution for finding PG accommodation in Bangalore. It features a real-time availability tracker, a secure owner portal for listing management, and a seamless search experience for students and professionals.',
        tech: ['Next.js', 'TypeScript', 'MongoDB'],
        github: 'https://github.com/bhaskar2004/pgmaga',
        live: 'https://pgmaga.onrender.com/',
        icon: HomeIcon,
        featured: true,
        readme: ``
    }
];