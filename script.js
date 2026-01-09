/**
 * FOREST DELUXE - HIGH PERFORMANCE CORE
 * Optimized for Mobile, Laptop, and Desktop (60fps target)
 */

const canvas = document.getElementById('forestCanvas');
const ctx = canvas.getContext('2d');
const slides = document.querySelectorAll('.slide');

// Assets
const assets = {
    bg: document.getElementById('imgBgNormal'),
    bgGold: document.getElementById('imgBgGold'),
    side: document.getElementById('imgSideNormal'),
    sideGold: document.getElementById('imgSideGold')
};

// Configuration
const CONFIG = {
    lerp: 0.08,
    mouseLerp: 0.1,
    gold: '212, 175, 55',
    mobilePCount: 30,
    desktopPCount: 80
};

// State
let state = {
    target: 0,
    current: 0,
    max: slides.length - 1
};

let w, h, isMobile;
let time = 0;
const ptr = { x: 0, y: 0 };
const lerpPtr = { x: 0, y: 0 };

// Offscreen Buffers (Pre-rendering for performance)
const buffer = {
    bg: document.createElement('canvas'),
    bgGold: document.createElement('canvas')
};

// --- PRE-RENDERING ---
function prepCanvas(c, img, filter) {
    const cx = c.getContext('2d');
    c.width = w; c.height = h;
    cx.clearRect(0, 0, w, h);

    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight) * 0.65;
    const iW = img.naturalWidth * scale;
    const iH = img.naturalHeight * scale;
    const iX = (w - iW) / 2;
    const iY = (h - iH) / 2;

    cx.save();
    if (filter) cx.filter = filter;
    cx.drawImage(img, iX, iY, iW, iH);
    cx.restore();
}

// --- GOLDEN WIND PARTICLES ---
let particles = [];
class WindParticle {
    constructor() { this.reset(true); }
    reset(init = false) {
        this.x = init ? Math.random() * w : -10;
        this.y = Math.random() * h;
        this.vx = (Math.random() * 2) + 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
        this.life = Math.random();
        this.decay = 0.005;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        if (this.life <= 0 || this.x > w) this.reset();
    }
    draw() {
        ctx.fillStyle = `rgba(${CONFIG.gold}, ${this.life})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initScene() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    isMobile = w < 768;
    ptr.x = w / 2; ptr.y = h / 2;

    prepCanvas(buffer.bg, assets.bg, 'grayscale(100%) contrast(140%) brightness(0.3)');
    prepCanvas(buffer.bgGold, assets.bgGold, 'contrast(120%) brightness(1.2)');

    particles = [];
    const count = isMobile ? CONFIG.mobilePCount : CONFIG.desktopPCount;
    for (let i = 0; i < count; i++) particles.push(new WindParticle());
}

// --- RENDERING HELPERS ---
function drawLiquigMask(cx, cy, r) {
    ctx.beginPath();
    for (let i = 0; i <= 30; i++) {
        const angle = (i / 30) * Math.PI * 2;
        const noise = Math.sin(angle * 3 + time) * 15 + Math.cos(angle * 5 - time * 1.5) * 10;
        const rad = r + noise;
        const x = cx + Math.cos(angle) * rad;
        const y = cy + Math.sin(angle) * rad;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
}

// --- MAIN LOOP ---
function animate() {
    time += 0.015;
    ctx.clearRect(0, 0, w, h);

    // Physics
    state.current += (state.target - state.current) * CONFIG.lerp;
    if (Math.abs(state.target - state.current) < 0.001) state.current = state.target;

    lerpPtr.x += (ptr.x - lerpPtr.x) * CONFIG.mouseLerp;
    lerpPtr.y += (ptr.y - lerpPtr.y) * CONFIG.mouseLerp;

    // === HERO IMAGE FADE-OUT LOGIC ===
    // All 4 images are HERO-ONLY: Fade 1.0 (Slide 0) to 0.0 (Slide 1+)
    const heroOpacity = Math.max(0, 1 - state.current);

    // Draw Backgrounds - ONLY IF VISIBLE
    if (heroOpacity > 0.01) {
        const pX = (lerpPtr.x - w / 2) * 0.02;
        const pY = (lerpPtr.y - h / 2) * 0.02;

        ctx.save();
        ctx.globalAlpha = heroOpacity;
        ctx.translate(pX, pY);
        ctx.drawImage(buffer.bg, 0, 0);

        // Reveal Gold
        ctx.save();
        drawLiquigMask(lerpPtr.x - pX, lerpPtr.y - pY, 220);
        ctx.clip();
        ctx.drawImage(buffer.bgGold, 0, 0);
        ctx.restore();
        ctx.restore();

        // Foreground Branch (Hero-Only)
        ctx.save();
        ctx.globalAlpha = heroOpacity;
        const bScale = Math.min(w / assets.side.naturalWidth, h / assets.side.naturalHeight) * 0.6;
        const bW = assets.side.naturalWidth * bScale;
        const bH = assets.side.naturalHeight * bScale;
        const bX = w - bW + (pX * 2);
        const bY = h - bH + (pY * 2);

        ctx.filter = 'grayscale(100%) brightness(0.2)';
        ctx.drawImage(assets.side, bX, bY, bW, bH);

        ctx.save();
        drawLiquigMask(lerpPtr.x, lerpPtr.y, 220);
        ctx.clip();
        ctx.filter = 'none';
        ctx.drawImage(assets.sideGold, bX, bY, bW, bH);
        ctx.restore();
        ctx.restore();
    }

    // Gold Wind - BOOST when images fade
    particles.forEach(p => {
        if (state.current > 0.5) p.vx = Math.min(p.vx * 1.2, 5);
        p.update();
        p.draw();
    });

    // DOM Slide Transforms
    slides.forEach((sl, i) => {
        const dist = state.current - i;
        if (Math.abs(dist) < 1.5) {
            sl.style.display = 'flex';

            if (dist >= 0) {
                const scale = 1 + (dist * 0.5);
                const op = 1 - dist;
                const y = dist * -50;
                sl.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
                sl.style.opacity = Math.max(0, op);
                sl.style.filter = `blur(${dist * 10}px)`;
                sl.style.pointerEvents = dist < 0.1 ? 'auto' : 'none';
            } else {
                const p = 1 + dist;
                const scale = 0.8 + (p * 0.2);
                sl.style.transform = `scale(${scale})`;
                sl.style.opacity = p;
                sl.style.filter = `blur(${(1 - p) * 5}px)`;
                sl.style.pointerEvents = 'none';
            }
        } else {
            sl.style.display = 'none';
        }
    });

    // Update Nav Dots
    const activeIdx = Math.round(state.current);
    document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === activeIdx);
    });

    requestAnimationFrame(animate);
}

// --- INPUT HANDLERS ---
function setTarget(val) {
    state.target = Math.max(0, Math.min(val, state.max));
}

window.addEventListener('resize', initScene);
window.addEventListener('mousemove', e => { ptr.x = e.clientX; ptr.y = e.clientY; });

window.addEventListener('wheel', e => {
    e.preventDefault();
    setTarget(state.target + Math.sign(e.deltaY) * 0.2);
}, { passive: false });

window.addEventListener('keydown', e => {
    if (['ArrowDown', 'PageDown', ' '].includes(e.key)) setTarget(state.target + 1);
    if (['ArrowUp', 'PageUp'].includes(e.key)) setTarget(state.target - 1);
});

let ts = 0;
window.addEventListener('touchstart', e => ts = e.touches[0].clientY, { passive: false });
window.addEventListener('touchmove', e => {
    const delta = ts - e.touches[0].clientY;
    setTarget(state.target + (delta * 0.005));
    ts = e.touches[0].clientY;
}, { passive: false });

window.scrollToSlide = (i) => setTarget(i);

// Startup
let loaded = 0;
const imgs = Object.values(assets);
imgs.forEach(i => {
    if (i.complete) loaded++;
    else i.onload = () => loaded++;
});

const starter = setInterval(() => {
    if (loaded === 4) {
        clearInterval(starter);
        initScene();
        animate();
    }
}, 100);
