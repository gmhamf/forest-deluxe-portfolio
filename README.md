Forest Deluxe - Immersive Portfolio Website

An Awwwards-style immersive personal portfolio website featuring a "Tunnel Scroll" interaction, dynamic WebGL-like canvas effects, and a high-end "Forest Noir" aesthetic. Built with optimized Vanilla JavaScript, HTML5, and CSS3.

Key Features

Tunnel Scroll Interaction: Unique Z-axis navigation where sections scale and fade to simulate moving through a 3D tunnel.

Dynamic Hero Fade-Out: Main character and background elements (Forest & Branch) are visible only in the Hero section and fade out smoothly as the user scrolls, leaving a clean visual space for content readability.

Interactive Gold Reveal: A liquid mask effect follows the mouse cursor, revealing a gold version of the underlying assets.

Intelligent Text Contrast: Solves the "white text on gold background" issue using CSS mix-blend-mode: difference, ensuring text is always readable.

Golden Wind Particles: Organic particle system simulating wind flow, reacting to scroll speed and direction.

Fully Responsive: Optimized layouts for Desktop, Tablet, and Mobile devices with touch-friendly swipe navigation.

Performance Focused: Uses offscreen canvas buffering and requestAnimationFrame to maintain smooth 60fps performance on most devices.

Tech Stack

Core: HTML5, CSS3 (Custom Properties, Flexbox/Grid), Vanilla JavaScript (ES6+).

Rendering: HTML5 Canvas API for background effects and image manipulation.

Fonts: Google Fonts (Cinzel for headers, Montserrat for body).

No External Libraries: Pure, dependency-free code for maximum performance and control.

Project Structure
/project-root
│
├── index.html        # Main HTML structure and content
├── style.css         # Styling, animations, and responsive rules
├── script.js         # Core logic: Canvas rendering, scroll physics, particle system
│
└── Assets            # Required image files (Not included in repo)
    ├── normal (1).png
    ├── gold (1).png
    ├── branch.png
    └── branch_with_owl.png

Setup & Installation

Clone the Repository:

git clone https://github.com/your-username/forest-deluxe-portfolio.git


Add Assets: Place your 4 image files into the root directory. Ensure they match these filenames exactly:

normal (1).png – Main dark background

gold (1).png – Gold version of background

branch.png – Foreground branch/character

branch_with_owl.png – Gold version of foreground

Run Locally: Simply open index.html in any modern web browser. No build step or server is required (though using a local server like Live Server is recommended to avoid CORS issues with canvas image manipulation).

Controls & Interaction

Scroll / Wheel: Move forward/backward through the tunnel sections.

Arrow Keys / PageUp & PageDown: Keyboard navigation support.

Touch / Swipe: Vertical swipe to navigate on mobile devices.

Mouse Move: Controls the "Gold Reveal" flashlight effect.

Navigation Dots: Click the side dots to jump directly to specific sections.

Customization Guide

Changing Colors:
Open style.css and modify the :root variables:

:root {
    --bg-deep: #050505;       /* Background Color */
    --accent-color: #d4af37;  /* Main Gold Accent */
    --text-main: #ffffff;     /* Main Text Color */
}


Adjusting Scroll Speed:
Open script.js and tweak the CONFIG object:

const CONFIG = {
    lerp: 0.08,             // Lower = smoother/slower inertia
    mouseLerp: 0.1,         // Mouse follow delay
    mobilePCount: 30,       // Particle count on mobile
    desktopPCount: 80       // Particle count on desktop
};


Updating Content:
Edit index.html. The content is structured into <section> tags with the class slide.

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

Note: Requires a device capable of WebGL/Canvas hardware acceleration for best performance.

License

This project is open-source and available under the MIT License.
