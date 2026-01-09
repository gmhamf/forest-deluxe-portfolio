Forest Deluxe - Immersive Portfolio Website

Description:
Forest Deluxe is a high-end, interactive personal portfolio website built with HTML5, CSS3, and Vanilla JavaScript. Featuring a "Tunnel Scroll" interaction, dynamic canvas effects, and a visually rich "Forest Noir" aesthetic, this project combines performance, readability, and immersive visual storytelling.

Key Features

Tunnel Scroll Interaction: Smooth Z-axis scale and fade animations simulate moving through a 3D tunnel.

Dynamic Hero Fade-Out: Hero section elements (background and character) fade out as the user scrolls, leaving inner slides visually clean.

Interactive Gold Reveal: Mouse-controlled liquid mask reveals gold versions of background and foreground assets.

Intelligent Text Contrast: Solves the "white text on gold background" problem using mix-blend-mode: difference.

Golden Wind Particles: Organic particle system reacts to scroll speed and direction for depth and motion.

Fully Responsive: Desktop, tablet, and mobile optimized with touch-friendly swipe navigation.

Performance Optimized: Offscreen canvas buffering and requestAnimationFrame ensure smooth 60fps performance.

Tech Stack

HTML5 & CSS3: Flexbox/Grid, Custom Properties

JavaScript (ES6+): Vanilla JS, optimized for performance

Canvas API: Background animations and interactive effects

Fonts: Google Fonts – Cinzel (headers), Montserrat (body)

No External Libraries: Dependency-free for full control

Project Structure
/project-root
│
├── index.html        # Main HTML structure and content
├── style.css         # Styling, animations, and responsive rules
├── script.js         # Core logic: canvas rendering, scroll physics, particle system
└── Assets            # Required image files (not included)
    ├── normal (1).png
    ├── gold (1).png
    ├── branch.png
    └── branch_with_owl.png

Setup & Installation

Clone the repository:

git clone https://github.com/gmhamf/forest-deluxe-portfolio.git


Add Assets: Place the following images in the root directory:

normal (1).png – Dark background

gold (1).png – Gold background

branch.png – Foreground branch/character

branch_with_owl.png – Gold version of foreground

Run Locally: Open index.html in a modern browser. For best results, use a local server (e.g., Live Server) to avoid CORS issues.

Controls & Interaction

Scroll / Wheel: Navigate through tunnel sections

Arrow Keys / PageUp & PageDown: Keyboard navigation

Touch / Swipe: Mobile-friendly swipe navigation

Mouse Move: Controls the Gold Reveal effect

Navigation Dots: Jump directly to any section

Customization Guide

Colors: Edit :root in style.css:

:root {
  --bg-deep: #050505;       /* Background Color */
  --accent-color: #d4af37;  /* Gold Accent Color */
  --text-main: #ffffff;     /* Main Text Color */
}


Scroll & Particle Settings: Edit CONFIG in script.js:

const CONFIG = {
  lerp: 0.08,             // Smoothness / scroll inertia
  mouseLerp: 0.1,         // Mouse follow delay
  mobilePCount: 30,       // Particle count for mobile
  desktopPCount: 80       // Particle count for desktop
};


Slides Content: Edit index.html <section class="slide">:

Slide 0: Hero / Introduction

Slide 1: About Me

Slide 2: Technical Skills

Slide 3: Projects

Slide 4: Contact

Browser Support

Chrome (Latest)

Firefox (Latest)

Safari (Latest)

Edge (Latest)

Hardware-accelerated WebGL/Canvas recommended for best performance.

License

MIT License – Open source

Hashtags / Keywords

#WebDevelopment #PortfolioWebsite #HTML5 #CSS3 #JavaScript #Canvas #WebGL #UIUX #InteractiveDesign #Awwwards #FrontEnd #ResponsiveDesign #HighPerformance #CreativeCoding
