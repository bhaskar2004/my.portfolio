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
        readme: `# 🦯 Blind Assistance Navigation System

A real-time assistive navigation system for visually impaired individuals, combining voice interaction, YOLO-based obstacle detection, depth estimation, and turn-by-turn GPS navigation with spoken and haptic feedback.

---

## 📋 Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Module Reference](#module-reference)
- [Known Issues & Limitations](#known-issues--limitations)
- [Future Improvements](#future-improvements)

---

## Overview

This system is built to assist visually impaired users in navigating real-world environments. The user speaks a destination, and the system:

1. Geocodes the destination using the GraphHopper API
2. Calculates a walking route
3. Navigates step-by-step with spoken turn-by-turn instructions
4. Continuously monitors the camera feed for obstacles using YOLOv3/YOLOv8
5. Alerts the user to nearby hazards with directional voice warnings and haptic (audio) feedback

Two implementation variants are provided:

| File | Model | Approach |
|------|-------|----------|
| \`MAIN1.py\` | YOLOv8 (Ultralytics) + MiDaS depth | Advanced — includes depth estimation for distance measurement |
| \`MAIN2.py\` | YOLOv3 (OpenCV DNN) | Standard — uses classic YOLO with \`.weights\`/\`.cfg\` files |
| \`main3.py\` | YOLOv3 Optimized | Hyper-Optimized — predictive collision risk, intelligent caching, and multi-threaded audio |

---

## System Architecture

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    User (Visually Impaired)              │
└───────────────┬─────────────────────────┬───────────────┘
                │ Voice Input             │ Voice / Haptic Output
                ▼                         ▼
┌───────────────────────────┐   ┌─────────────────────────┐
│   MultisensoryInterface   │   │   pyttsx3 TTS Engine     │
│   (Speech Recognition)    │   │   sounddevice (Haptic)   │
└──────────────┬────────────┘   └─────────────────────────┘
               │ Destination Text
               ▼
┌───────────────────────────┐
│     NavigationSystem      │
│  ┌─────────────────────┐  │
│  │  GraphHopper API    │  │  ← Geocoding + Route Planning
│  │  (Geocode + Route)  │  │
│  └─────────────────────┘  │
│  ┌─────────────────────┐  │
│  │  Waypoint Iterator  │  │  ← Step-by-step walking guidance
│  │  + Bearing Calc     │  │
│  └─────────────────────┘  │
└──────────────┬────────────┘
               │ Per-step frame capture
               ▼
┌───────────────────────────┐
│   AdvancedObstacleDetector│
│  ┌────────────┐           │
│  │ YOLOv8 /  │           │  ← Object detection (80 COCO classes)
│  │ YOLOv3    │           │
│  └────────────┘           │
│  ┌────────────┐           │
│  │ MiDaS     │           │  ← Depth estimation (MAIN1 only)
│  │ Depth Est.│           │
│  └────────────┘           │
└───────────────────────────┘
\`\`\`

---

## Features

### 🎙️ Voice Interaction
- Listens for the user's spoken destination using Google Speech Recognition
- All navigation instructions and warnings are spoken aloud via pyttsx3 TTS
- Ambient noise adjustment before listening for improved accuracy

### 🗺️ GPS Navigation
- Geocodes any location name to coordinates via the GraphHopper Geocoding API
- Calculates pedestrian walking routes via the GraphHopper Routing API
- Decodes polyline-encoded routes into step-by-step waypoints
- Computes compass bearing between waypoints and announces directional guidance (North / East / South / West or Turn Left / Right / Straight)

### 🚧 Obstacle Detection
- Real-time object detection from webcam using YOLOv3 or YOLOv8
- Detects 80 object classes from the COCO dataset (see \`coco.names\`)
- High-risk class filtering: \`person\`, \`car\`, \`truck\`, \`bicycle\`, \`motorcycle\`, \`bus\`
- Classifies obstacle position as **left**, **right**, **front**, or **back** based on bounding box location in frame
- Announces directional avoidance instructions: *"Warning: car detected on the left. Slightly move right."*

### 📏 Depth Estimation (MAIN1 only)
- Uses Intel MiDaS (\`MiDaS_small\`) loaded via \`torch.hub\` to estimate object depth
- Calculates average depth within each detection's bounding box region
- Filters obstacles within a configurable safety buffer (default: 1.5 meters)

### 📳 Haptic Feedback (MAIN1 only)
- Generates sinusoidal audio tones via \`sounddevice\` to simulate vibration alerts
- Intensity-adjustable frequency (default: 50 Hz at 0.5 intensity)

---

## Project Structure

\`\`\`
blind_assist/
│
├── MAIN1.py              # Advanced implementation (YOLOv8 + MiDaS depth)
├── MAIN2.py              # Standard implementation (YOLOv3 OpenCV DNN)
├── main3.py              # Hyper-Optimized implementation (Predictive + Caching)
│
├── yolov3.weights        # YOLOv3 pretrained weights
├── yolov3.cfg            # YOLOv3 network architecture config
├── coco.names            # 80 COCO class labels
│
└── README.md
\`\`\`

---

## Prerequisites

- Python 3.8+
- A working webcam
- Microphone access
- Internet connection (for GraphHopper API and Google Speech Recognition)
- GraphHopper API key ([get one free at graphhopper.com](https://www.graphhopper.com/))

---

## Installation

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/your-username/blind-assist-nav.git
cd blind-assist-nav
\`\`\`

### 2. Install dependencies

**For MAIN2.py (YOLOv3 / OpenCV DNN):**

\`\`\`bash
pip install opencv-python numpy requests polyline geopy SpeechRecognition pyttsx3
\`\`\`

**For MAIN1.py (YOLOv8 + MiDaS):**

\`\`\`bash
pip install ultralytics torch torchvision timm opencv-python numpy requests \\
            polyline geopy SpeechRecognition pyttsx3 sounddevice soundfile
\`\`\`

### 3. Download model weights

**YOLOv3 weights** (required for MAIN2.py):

\`\`\`bash
wget https://pjreddie.com/media/files/yolov3.weights
\`\`\`

Place the downloaded file at the path specified in \`MAIN2.py\`:
\`\`\`python
YOLO_WEIGHTS = 'path/to/yolov3.weights'
YOLO_CONFIG  = 'path/to/yolov3.cfg'
YOLO_NAMES   = 'path/to/coco.names'
\`\`\`

**YOLOv8** (for MAIN1.py) auto-downloads \`yolov8n.pt\` on first run via the Ultralytics package.

**MiDaS** (for MAIN1.py) auto-downloads via \`torch.hub\` on first run.

---

## Configuration

### MAIN1.py — \`ConfigManager\`

Edit the \`get_config()\` method in \`ConfigManager\`:

\`\`\`python
{
    'graphhopper_api_key': 'YOUR_API_KEY_HERE',
    'yolo_model_path': 'yolov8n.pt',   # or yolov8s.pt for better accuracy
    'log_level': 'INFO',
    'debug_mode': False
}
\`\`\`

### MAIN2.py — \`main()\` constants

\`\`\`python
API_KEY      = 'YOUR_API_KEY_HERE'
YOLO_WEIGHTS = '/path/to/yolov3.weights'
YOLO_CONFIG  = '/path/to/yolov3.cfg'
YOLO_NAMES   = '/path/to/coco.names'
\`\`\`

### Starting location

Both files use a hardcoded starting coordinate. Update this to reflect your actual location or integrate a GPS module:

\`\`\`python
# MAIN1.py
current_location = [12.9716, 77.5946]  # Bangalore

# MAIN2.py
return [13.3957, 77.7270]  # Gauribidanur
\`\`\`

---

## Usage

### Running MAIN2.py (recommended for first-time setup)

\`\`\`bash
python MAIN2.py
\`\`\`

1. The system says: *"Welcome to the Blind Assistance Navigation System"*
2. It says: *"Listening for your destination"*
3. Speak your destination (e.g., *"Cubbon Park"*)
4. Navigation begins — you'll hear step-by-step instructions
5. At each step, the camera captures a frame and alerts you to any obstacles
6. On arrival: *"You have reached your destination!"*

### Running MAIN1.py (advanced)

\`\`\`bash
python MAIN1.py
\`\`\`

Same flow as above, with additional depth-based distance warnings and haptic audio feedback when obstacles are within 1.5 meters.

---

## Module Reference

### \`ObstacleDetector\` / \`AdvancedObstacleDetector\`

| Method | Description |
|--------|-------------|
| \`detect_obstacles(frame)\` | Runs YOLO inference and returns list of detected objects with class, confidence, bbox |
| \`_estimate_depth(frame)\` | (MAIN1) Runs MiDaS depth estimation, returns depth map |
| \`_calculate_distance(...)\` | (MAIN1) Estimates distance to object using depth ROI average |
| \`draw_detections(frame, detections)\` | (MAIN2) Draws bounding boxes on frame for visual debug |

### \`MultisensoryInterface\` / \`NavigationSystem.speak/listen\`

| Method | Description |
|--------|-------------|
| \`speak(message)\` | Speaks text aloud using pyttsx3 |
| \`listen(timeout)\` | Records microphone input and returns recognized text |
| \`provide_haptic_feedback(intensity)\` | (MAIN1) Plays sinusoidal audio tone for tactile simulation |

### \`NavigationSystem\`

| Method | Description |
|--------|-------------|
| \`get_coordinates(name)\` | Geocodes a location name → \`[lat, lng]\` |
| \`get_route(start, end)\` | Fetches walking route → list of \`(lat, lng)\` waypoints |
| \`navigate(destination)\` | Main loop: route → waypoints → obstacle check → guidance |
| \`_handle_obstacles(...)\` | Filters high-risk obstacles and triggers voice/haptic alerts |
| \`_provide_navigation_guidance(...)\` | Announces distance and compass direction to next waypoint |
| \`_calculate_bearing(p1, p2)\` | Returns compass bearing (0–360°) between two coordinates |
| \`calculate_direction(p1, p2)\` | (MAIN2) Returns turn instruction string |
| \`detect_and_alert_obstacles()\` | (MAIN2) Captures frame, detects obstacles, announces positions |

---

## Known Issues & Limitations

- **Hardcoded start location** — real deployment requires GPS integration (e.g., via \`gpsd\` or a mobile GPS module)
- **MiDaS depth is uncalibrated** — the \`* 10\` conversion factor is a rough estimate and should be calibrated for real-world use
- **Single-frame obstacle detection** — (MAIN1/MAIN2) Frame is captured once per waypoint rather than continuously; \`main3.py\` addresses this with a background thread
- **No offline fallback** — both speech recognition (Google) and routing (GraphHopper) require internet

---

## Future Improvements

- [ ] Integrate real GPS via smartphone or hardware module
- [x] Integrate background detection thread (implemented in \`main3.py\`)
- [ ] Calibrate MiDaS depth output against real-world measurements
- [x] Add \`position\` field to obstacle detection output in MAIN1
- [ ] Add offline TTS fallback (e.g., \`espeak\`) for no-internet scenarios
- [ ] Support landmark-based navigation announcements (e.g., "traffic light ahead")
- [ ] Package as a mobile/Raspberry Pi deployable application

---

## License

MIT License. See \`LICENSE\` for details.
`
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
        tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'MongoDB', 'Firebase'],
        github: 'https://github.com/bhaskar2004/pgmaga',
        live: 'https://pgmaga.onrender.com/',
        icon: HomeIcon,
        featured: true,
        readme: `# PG Maga 🏠

> A real-time PG accommodation marketplace built for Bangalore — find, list, and connect with paying guest accommodations instantly.

**Live Demo → [pgmaga.onrender.com](https://pgmaga.onrender.com)**

---

## What is PG Maga?

PG Maga is a full-stack accommodation discovery platform built specifically for Bangalore's paying guest rental market. It bridges the gap between tenants searching for PG accommodations and landlords or property owners — making the entire process faster, more transparent, and accessible in real time.

Whether you're a student relocating for college, a working professional hunting for a place close to your office, or a property owner looking to get your PG listed — PG Maga is built for you.

---

## Features

- **Real-time listings** — Browse PG accommodations with live data, no stale results
- **Firebase Authentication** — Secure sign-in with Google or email/password
- **Search & Filter** — Filter by location, price range, gender preference, and amenities
- **List your PG** — Property owners can submit and manage their own listings
- **Responsive design** — Mobile-first, works seamlessly across all screen sizes
- **Smooth animations** — Framer Motion powered transitions and micro-interactions
- **Type-safe codebase** — Full TypeScript coverage across frontend and API routes

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **UI Library** | React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion |
| **Database** | MongoDB Atlas |
| **Authentication** | Firebase Auth |
| **Deployment** | Render |`
    }
];