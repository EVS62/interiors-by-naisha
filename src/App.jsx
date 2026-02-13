import { useState, useEffect, useRef, useCallback } from "react";

// Logo - place 3TYPEDLOGO_transparent.png in your public folder
const LOGO_URL = "/3TYPEDLOGO_transparent.png";

const PROJECTS = [
  {
    id: 1,
    name: "Yorkville Residence",
    type: "Residential",
    cover: "/images/yorkville_living.jpg",
    summary: "To properly display the residence's stunning city views, a well-thought-out spatial plan was necessary. We created a more balanced, welcoming layout by centering the room and moving the furniture away from the windows to let in an abundance of natural light while maintaining uninterrupted sightlines. Handcrafted herringbone flooring was uncovered beneath dated wall-to-wall carpeting and beautifully restored.",
    gallery: [
      "/images/yorkville_living.jpg",
      "/images/yorkville_dining.jpg",
      "/images/yorkville_bedroom.jpg",
    ],
    highlights: [
      "Restored handcrafted herringbone flooring beneath dated carpeting",
      "Centered layout maximizing city views and natural light",
      "Classic Kohler tub with marble-look porcelain tile surround",
      "Chrome fixtures from the Miseno collection throughout",
      "Curated material palette: walnut floors, porcelain tile, black leather, linen textile",
    ],
  },
  {
    id: 2,
    name: "Lower East Side Residence",
    type: "Residential",
    cover: "/images/les_living.jpg",
    summary: "This Lower East Side residence underwent a full-scale renovation, elevated by the discovery of original brick walls concealed within the space. Once restored, the brick became the project's defining focal point. A floor-to-ceiling built-in was introduced, anchoring the room while providing both function and architectural presence. Soundproof windows maximize natural light without compromising comfort.",
    gallery: [
      "/images/les_brick_living.jpg",
      "/images/les_kitchen.jpg",
      "/images/les_dining.jpg",
    ],
    highlights: [
      "Original brick walls discovered and restored as focal point",
      "Floor-to-ceiling entertainment built-in with custom shelving",
      "Layered lighting strategy with dedicated dining and art illumination",
      "Insulated soundproof ceiling for intimate retreat feel",
      "Curated layering of textiles, warm woods, and nuanced lighting",
    ],
  },
  {
    id: 3,
    name: "NoHo Residence",
    type: "Residential",
    cover: "/images/noho_living.jpg",
    summary: "This project consisted of comprehensive styling, furniture sourcing, and thoughtful space planning, all executed with photography in mind. The result is a refined urban residence that balances modern comfort with editorial polish.",
    gallery: [
      "/images/noho_living.jpg",
      "/images/les_nook.jpg",
      "/images/les_bedroom.jpg",
    ],
    highlights: [
      "Comprehensive furniture sourcing and styling",
      "Thoughtful space planning for photography-ready interiors",
      "Statement pendant lighting as sculptural elements",
      "Warm wood tones balanced with neutral upholstery",
      "Editorial-quality finish throughout",
    ],
  },
  {
    id: 4,
    name: "The TriBeCa Residence",
    type: "Residential",
    cover: "https://www.compass.com/m/0/487ec327-5e5f-47a6-b598-9c7e216cf711/origin.webp",
    summary: "A stunning high-floor corner unit in the heart of TriBeCa with curved floor-to-ceiling windows and breathtaking panoramic views. Elegant proportions, hardwood floors, and crown moldings create the perfect setting for both lively gatherings and intimate evenings.",
    gallery: [
      "https://www.compass.com/m/0/487ec327-5e5f-47a6-b598-9c7e216cf711/origin.webp",
      "/images/yorkville_terrace.jpg",
      "/images/yorkville_living2.jpg",
    ],
    highlights: [
      "Curved floor-to-ceiling windows with panoramic skyline views",
      "Custom galley kitchen with copious counter and cabinet space",
      "King-sized primary bedroom with en-suite bath overlooking Hudson River",
      "Crown moldings and elegant hardwood flooring throughout",
      "Split layout converting from two-bedroom to three-bedroom plus study",
    ],
  },
  {
    id: 5,
    name: "The Murray Hill Studio",
    type: "Residential",
    cover: "https://www.compass.com/m/0/a4cbb540-a925-41f3-b308-c994166877c3/origin.webp",
    summary: "A recently renovated pre-war studio capturing quintessential Art Deco living with high-beamed ceilings, large casement windows, and elegant arched passageways. New hardwood floors and stainless steel appliances bring contemporary comfort to timeless architectural detail.",
    gallery: [
      "https://www.compass.com/m/0/a4cbb540-a925-41f3-b308-c994166877c3/origin.webp",
      "/images/yorkville_bath1.jpg",
      "/images/les_bedroom.jpg",
    ],
    highlights: [
      "Art Deco architectural details preserved and highlighted",
      "High-beamed ceilings with large casement windows",
      "Brand-new hardwood floors throughout living area",
      "Gracious entrance foyer with elegant arched passageways",
      "Newly renovated kitchen with stainless steel appliances",
    ],
  },
  {
    id: 6,
    name: "Selah City Church",
    type: "Commercial",
    cover: "/images/les_brick_living.jpg",
    summary: "A community space designed to inspire gathering and connection. Exposed brick, warm woods, and industrial lighting create an inviting atmosphere that balances reverence with warmth, making every visitor feel at home.",
    gallery: [
      "/images/les_brick_living.jpg",
      "/images/les_dining.jpg",
      "/images/les_kitchen.jpg",
    ],
    highlights: [
      "Exposed brick walls as defining design element",
      "Custom walnut and iron built-in shelving system",
      "Industrial pendant lighting with warm Edison bulbs",
      "Curated mix of modern and vintage seating",
      "Warm material palette unifying the entire space",
    ],
  },
];

const BEFORE_AFTER = [
  {
    id: 1,
    name: "Yorkville Residence",
    before: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    after: "/images/yorkville_living.jpg",
  },
  {
    id: 2,
    name: "Lower East Side Residence",
    before: "https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?w=600&q=80",
    after: "/images/les_brick_living.jpg",
  },
  {
    id: 3,
    name: "NoHo Residence",
    before: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80",
    after: "/images/noho_living.jpg",
  },
];

const SERVICES = ["Full-Service Design", "E-Design", "Room Refresh", "Styling & Staging"];
const KNOWN_FOR = [
  "Layered neutral palettes that feel warm, not bland",
  "Spaces designed for real life—beautiful and functional",
  "Thoughtful material mixing with rich textures",
  "Curated detail that makes a home feel finished",
  "Seamless project management from concept to install",
];

// ── Styles ──
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

:root {
  --cream: #F5F0EB;
  --stone: #E8E0D8;
  --taupe: #C4B5A5;
  --warm-gray: #8A7E74;
  --charcoal: #3A3530;
  --soft-black: #2A2522;
  --white: #FDFCFB;
  --accent: #B8A48E;
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'DM Sans', system-ui, sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: var(--font-sans);
  color: var(--soft-black);
  background: var(--cream);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--cream); }
::-webkit-scrollbar-thumb { background: var(--taupe); border-radius: 3px; }

/* ── Nav ── */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 clamp(1.5rem, 4vw, 4rem);
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.nav.scrolled {
  background: rgba(245, 240, 235, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 rgba(0,0,0,0.04);
}

.nav-brand {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: var(--soft-black);
  cursor: pointer;
  transition: opacity 0.3s;
}

.nav-brand:hover { opacity: 0.7; }

.nav-logo {
  height: 40px;
  width: auto;
  cursor: pointer;
  transition: opacity 0.3s;
  filter: invert(15%) sepia(8%) saturate(600%) hue-rotate(350deg);
}

.nav-logo:hover { opacity: 0.7; }

.hero-logo {
  height: clamp(60px, 12vw, 120px);
  width: auto;
  margin-bottom: 1.5rem;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
  filter: brightness(10);
}

.footer-logo {
  height: 32px;
  width: auto;
  filter: brightness(0.7);
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-link {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--charcoal);
  cursor: pointer;
  position: relative;
  padding: 4px 0;
  transition: color 0.3s;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--charcoal);
  transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.nav-link:hover::after,
.nav-link.active::after { width: 100%; }

.nav-link:hover { color: var(--soft-black); }

.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 8px;
  z-index: 101;
}

.mobile-toggle span {
  display: block;
  width: 24px;
  height: 1.5px;
  background: var(--soft-black);
  transition: all 0.3s ease;
}

.mobile-toggle.open span:nth-child(1) { transform: rotate(45deg) translate(4px, 5px); }
.mobile-toggle.open span:nth-child(2) { opacity: 0; }
.mobile-toggle.open span:nth-child(3) { transform: rotate(-45deg) translate(4px, -5px); }

.mobile-menu {
  position: fixed;
  inset: 0;
  background: var(--cream);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  z-index: 99;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

.mobile-menu.open { opacity: 1; pointer-events: all; }

.mobile-menu-link {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 300;
  color: var(--soft-black);
  cursor: pointer;
  letter-spacing: 0.02em;
  transition: opacity 0.3s;
}

.mobile-menu-link:hover { opacity: 0.6; }

@media (max-width: 768px) {
  .nav-links { display: none; }
  .mobile-toggle { display: flex; }
}

/* ── Hero ── */
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
  transition: transform 8s ease-out;
}

.hero:hover .hero-img { transform: scale(1.03); }

.hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.hero-brand {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 300;
  color: var(--white);
  letter-spacing: 0.04em;
  line-height: 1.1;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
}

.hero-tagline {
  font-family: var(--font-sans);
  font-size: clamp(0.85rem, 1.5vw, 1.05rem);
  font-weight: 300;
  color: rgba(253, 252, 251, 0.85);
  letter-spacing: 0.06em;
  max-width: 500px;
  margin-bottom: 2.5rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.7s forwards;
}

.hero-ctas {
  display: flex;
  align-items: center;
  gap: 2rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 1s forwards;
}

.btn-primary {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--soft-black);
  background: var(--white);
  border: none;
  padding: 14px 36px;
  cursor: pointer;
  transition: all 0.4s ease;
}

.btn-primary:hover {
  background: var(--stone);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}

.btn-secondary {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(253,252,251,0.9);
  cursor: pointer;
  border-bottom: 1px solid rgba(253,252,251,0.4);
  padding-bottom: 2px;
  transition: all 0.3s;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
}

.btn-secondary:hover { border-bottom-color: var(--white); color: var(--white); }

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}

/* ── Sections ── */
.section {
  padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem);
  max-width: 1400px;
  margin: 0 auto;
}

.section-label {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--warm-gray);
  margin-bottom: 1rem;
}

.section-title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 300;
  color: var(--soft-black);
  letter-spacing: 0.02em;
  line-height: 1.15;
  margin-bottom: 1.5rem;
}

.section-text {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 300;
  line-height: 1.75;
  color: var(--charcoal);
  max-width: 640px;
}

.divider {
  width: 48px;
  height: 1px;
  background: var(--taupe);
  margin: 3rem 0;
}

/* ── Brand Blurb ── */
.blurb-section {
  text-align: center;
  padding: clamp(5rem, 10vw, 8rem) clamp(2rem, 8vw, 8rem);
  max-width: 800px;
  margin: 0 auto;
}

.blurb-section .section-text {
  margin: 0 auto;
  max-width: 600px;
  font-size: 1.05rem;
  line-height: 1.85;
}

/* ── Featured Projects ── */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .featured-grid { grid-template-columns: 1fr; gap: 2rem; }
}

.project-card {
  cursor: pointer;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.project-card:hover { transform: translateY(-4px); }

.project-card-img-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/5;
  margin-bottom: 1rem;
}

.project-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.project-card:hover .project-card-img { transform: scale(1.05); }

.project-card-type {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--warm-gray);
  margin-bottom: 0.35rem;
}

.project-card-name {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--soft-black);
  letter-spacing: 0.01em;
}

/* ── Projects Grid ── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

@media (max-width: 768px) {
  .projects-grid { grid-template-columns: 1fr; }
}

/* ── Project Detail ── */
.project-detail {
  padding-top: 100px;
}

.project-detail-hero {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  margin-bottom: 3rem;
}

.project-detail-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin: 2.5rem 0;
}

.project-detail-gallery img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  transition: transform 0.5s ease;
  cursor: pointer;
}

.project-detail-gallery img:hover { transform: scale(1.02); }

.highlights-list {
  list-style: none;
  margin-top: 1rem;
}

.highlights-list li {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 300;
  color: var(--charcoal);
  padding: 0.65rem 0;
  border-bottom: 1px solid rgba(196, 181, 165, 0.3);
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  line-height: 1.5;
}

.highlights-list li::before {
  content: '—';
  color: var(--taupe);
  flex-shrink: 0;
}

.back-btn {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--warm-gray);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  transition: color 0.3s;
}

.back-btn:hover { color: var(--soft-black); }

/* ── Before & After ── */
.ba-grid {
  display: flex;
  flex-direction: column;
  gap: 5rem;
  margin-top: 3rem;
}

.ba-item-name {
  font-family: var(--font-serif);
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--soft-black);
  margin-bottom: 1.5rem;
}

.ba-images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 640px) {
  .ba-images { grid-template-columns: 1fr; }
}

.ba-image-wrap {
  position: relative;
}

.ba-image-wrap img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
}

.ba-label {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--white);
  background: rgba(42, 37, 34, 0.7);
  backdrop-filter: blur(8px);
  padding: 6px 14px;
}

/* ── Slider ── */
.ba-slider-container {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16/9;
  cursor: ew-resize;
  user-select: none;
}

.ba-slider-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ba-slider-after {
  clip-path: inset(0 0 0 0);
}

.ba-slider-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--white);
  z-index: 2;
  pointer-events: none;
}

.ba-slider-handle {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--white);
  box-shadow: 0 2px 12px rgba(0,0,0,0.25);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.ba-slider-handle svg { width: 18px; height: 18px; }

/* ── About ── */
.about-layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: clamp(3rem, 6vw, 6rem);
  align-items: start;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .about-layout { grid-template-columns: 1fr; }
}

.about-headshot {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  filter: grayscale(15%);
}

.about-bio {
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.85;
  color: var(--charcoal);
  margin-bottom: 2.5rem;
}

.about-sub-title {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--soft-black);
  margin-bottom: 1rem;
  margin-top: 2.5rem;
}

.about-list {
  list-style: none;
}

.about-list li {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 300;
  color: var(--charcoal);
  padding: 0.5rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  line-height: 1.5;
}

.about-list li::before {
  content: '·';
  font-size: 1.4rem;
  line-height: 1;
  color: var(--taupe);
  flex-shrink: 0;
  margin-top: -2px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-top: 0.5rem;
}

@media (max-width: 500px) {
  .services-grid { grid-template-columns: 1fr; }
}

.service-tag {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--charcoal);
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--stone);
  text-align: center;
  transition: all 0.3s;
}

.service-tag:hover {
  background: var(--stone);
}

/* ── Contact ── */
.contact-layout {
  max-width: 640px;
  margin-top: 2rem;
}

.contact-intro {
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.75;
  color: var(--charcoal);
  margin-bottom: 2.5rem;
}

.form-group {
  margin-bottom: 1.75rem;
}

.form-label {
  display: block;
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--warm-gray);
  margin-bottom: 0.5rem;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 300;
  color: var(--soft-black);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--taupe);
  padding: 0.75rem 0;
  outline: none;
  transition: border-color 0.3s;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-bottom-color: var(--soft-black);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  border: 1px solid var(--taupe);
  padding: 1rem;
  margin-top: 0.25rem;
}

.form-textarea:focus { border-color: var(--soft-black); }

.form-select {
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%238A7E74' stroke-width='1.2'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0 center;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 500px) {
  .form-row { grid-template-columns: 1fr; }
}

.submit-btn {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--white);
  background: var(--soft-black);
  border: none;
  padding: 16px 48px;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.4s ease;
}

.submit-btn:hover {
  background: var(--charcoal);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0,0,0,0.15);
}

.consult-btn {
  display: inline-block;
  margin-top: 2rem;
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--warm-gray);
  border-bottom: 1px solid var(--taupe);
  padding-bottom: 3px;
  cursor: pointer;
  transition: color 0.3s, border-color 0.3s;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
}

.consult-btn:hover { color: var(--soft-black); border-bottom-color: var(--soft-black); }

/* ── Footer ── */
.footer {
  background: var(--soft-black);
  color: var(--stone);
  padding: clamp(3rem, 6vw, 5rem) clamp(1.5rem, 6vw, 6rem);
}

.footer-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-brand {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-weight: 300;
  color: var(--stone);
  letter-spacing: 0.02em;
}

.footer-socials {
  display: flex;
  gap: 2rem;
}

.footer-social-link {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--warm-gray);
  text-decoration: none;
  transition: color 0.3s;
  cursor: pointer;
}

.footer-social-link:hover { color: var(--stone); }

.footer-copy {
  width: 100%;
  text-align: center;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(196, 181, 165, 0.15);
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: var(--warm-gray);
}

/* ── Page transition ── */
.page-enter {
  opacity: 0;
  transform: translateY(16px);
}

.page-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

/* ── Fade In on Scroll ── */
.fade-in-view {
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.fade-in-view.visible {
  opacity: 1;
  transform: translateY(0);
}
`;

// ── Before/After Slider Component ──
function BeforeAfterSlider({ before, after }) {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const onMouseDown = () => { dragging.current = true; };
  const onMouseUp = () => { dragging.current = false; };
  const onMouseMove = (e) => { if (dragging.current) updatePos(e.clientX); };
  const onTouchMove = (e) => { updatePos(e.touches[0].clientX); };

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="ba-slider-container"
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
      onTouchMove={onTouchMove}
      onTouchEnd={onMouseUp}
    >
      <img src={before} alt="Before" />
      <img
        src={after}
        alt="After"
        className="ba-slider-after"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <div className="ba-slider-line" style={{ left: `${pos}%` }} />
      <div className="ba-slider-handle" style={{ left: `${pos}%` }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#3A3530" strokeWidth="2">
          <path d="M8 4l-6 8 6 8M16 4l6 8-6 8" />
        </svg>
      </div>
      <div className="ba-label" style={{ left: "1rem" }}>Before</div>
      <div className="ba-label" style={{ left: "auto", right: "1rem" }}>After</div>
    </div>
  );
}

// ── Fade-in on scroll hook ──
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeIn({ children, className = "", style }) {
  const ref = useFadeIn();
  return <div ref={ref} className={`fade-in-view ${className}`} style={style}>{children}</div>;
}

// ── Pages ──

function HomePage({ navigate }) {
  return (
    <>
      <div className="hero">
        <img
          className="hero-img"
          src="/images/hero.jpg"
          alt="Lower East Side living room with exposed brick and curated design"
        />
        <div className="hero-overlay">
          <img src={LOGO_URL} alt="Interiors by Naisha" className="hero-logo" />
          <p className="hero-tagline">Elevated interiors with warmth and intention.</p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => navigate("projects")}>View Projects</button>
            <button className="btn-secondary" onClick={() => navigate("beforeafter")}>Before &amp; After</button>
          </div>
        </div>
      </div>

      <div className="blurb-section">
        <FadeIn>
          <p className="section-label" style={{ textAlign: "center" }}>Our Approach</p>
          <p className="section-text" style={{ textAlign: "center", margin: "0 auto" }}>
            We create interiors that balance beauty with livability—spaces that feel elevated,
            personal, and deeply functional. Our design philosophy centers on warm palettes,
            layered textures, and curated details that make a home feel finished
            without ever feeling untouchable.
          </p>
        </FadeIn>
      </div>

      <div className="section">
        <FadeIn>
          <p className="section-label">Selected Work</p>
          <h2 className="section-title">Featured Projects</h2>
        </FadeIn>
        <div className="featured-grid">
          {PROJECTS.slice(0, 3).map((p, i) => (
            <FadeIn key={p.id} style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className="project-card" onClick={() => navigate("project-detail", p.id)}>
                <div className="project-card-img-wrap">
                  <img className="project-card-img" src={p.cover} alt={p.name} loading="lazy" />
                </div>
                <p className="project-card-type">{p.type}</p>
                <h3 className="project-card-name">{p.name}</h3>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </>
  );
}

function ProjectsPage({ navigate }) {
  return (
    <div className="section" style={{ paddingTop: "120px" }}>
      <FadeIn>
        <p className="section-label">Portfolio</p>
        <h2 className="section-title">Our Projects</h2>
        <p className="section-text">
          Each project is a collaboration rooted in understanding how you live.
          Browse our work below—every space tells a story.
        </p>
      </FadeIn>
      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <FadeIn key={p.id} style={{ transitionDelay: `${i * 0.08}s` }}>
            <div className="project-card" onClick={() => navigate("project-detail", p.id)}>
              <div className="project-card-img-wrap">
                <img className="project-card-img" src={p.cover} alt={p.name} loading="lazy" />
              </div>
              <p className="project-card-type">{p.type}</p>
              <h3 className="project-card-name">{p.name}</h3>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function ProjectDetailPage({ projectId, navigate }) {
  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) return <div className="section" style={{ paddingTop: "120px" }}>Project not found.</div>;

  return (
    <div className="section project-detail">
      <button className="back-btn" onClick={() => navigate("projects")}>← Back to Projects</button>
      <FadeIn>
        <p className="section-label">{project.type}</p>
        <h2 className="section-title">{project.name}</h2>
      </FadeIn>
      <FadeIn>
        <img className="project-detail-hero" src={project.cover} alt={project.name} />
      </FadeIn>
      <FadeIn>
        <p className="section-text">{project.summary}</p>
      </FadeIn>
      <FadeIn>
        <div className="project-detail-gallery">
          {project.gallery.map((src, i) => (
            <img key={i} src={src} alt={`${project.name} ${i + 1}`} loading="lazy" />
          ))}
        </div>
      </FadeIn>
      <FadeIn>
        <div className="divider" />
        <h3 className="section-title" style={{ fontSize: "1.6rem" }}>Design Highlights</h3>
        <ul className="highlights-list">
          {project.highlights.map((h, i) => <li key={i}>{h}</li>)}
        </ul>
      </FadeIn>
    </div>
  );
}

function BeforeAfterPage() {
  return (
    <div className="section" style={{ paddingTop: "120px" }}>
      <FadeIn>
        <p className="section-label">Transformations</p>
        <h2 className="section-title">Before &amp; After</h2>
        <p className="section-text">
          Drag the slider to reveal the transformation. Every project begins with
          potential—here's how we bring it to life.
        </p>
      </FadeIn>
      <div className="ba-grid">
        {BEFORE_AFTER.map((ba) => (
          <FadeIn key={ba.id}>
            <h3 className="ba-item-name">{ba.name}</h3>
            <BeforeAfterSlider before={ba.before} after={ba.after} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="section" style={{ paddingTop: "120px" }}>
      <FadeIn>
        <p className="section-label">The Designer</p>
        <h2 className="section-title">About Naisha</h2>
      </FadeIn>
      <div className="about-layout">
        <FadeIn>
          <img
            className="about-headshot"
            src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&q=80"
            alt="Naisha — Interior Designer"
          />
        </FadeIn>
        <FadeIn>
          <p className="about-bio">
            Hi, I'm Naisha, the founder and lead designer behind Interiors by Naisha.
            I create interiors that balance beauty and livability—spaces that feel elevated,
            personal, and functional. My approach blends thoughtful layout planning with
            texture, layered neutrals, and curated details that make a home feel finished
            without feeling untouchable. Whether you're refreshing one room or reimagining
            an entire home, my goal is to design a space that supports your day-to-day
            and reflects your style.
          </p>

          <h3 className="about-sub-title">What I'm Known For</h3>
          <ul className="about-list">
            {KNOWN_FOR.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          <h3 className="about-sub-title">Services</h3>
          <div className="services-grid">
            {SERVICES.map((s, i) => <div className="service-tag" key={i}>{s}</div>)}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="section" style={{ paddingTop: "120px" }}>
      <FadeIn>
        <p className="section-label">Get in Touch</p>
        <h2 className="section-title">Start Your Project</h2>
      </FadeIn>
      <FadeIn>
        <div className="contact-layout">
          <p className="contact-intro">
            Whether you have a clear vision or just a feeling, we'd love to hear about
            your space. Fill out the form below and we'll be in touch within 48 hours.
          </p>

          {submitted ? (
            <div style={{
              padding: "3rem 2rem",
              textAlign: "center",
              border: "1px solid var(--stone)"
            }}>
              <p className="section-title" style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                Thank you
              </p>
              <p className="section-text" style={{ margin: "0 auto" }}>
                We've received your inquiry and will follow up soon.
              </p>
            </div>
          ) : (
            <div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name *</label>
                  <input className="form-input" type="text" placeholder="Your full name" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input className="form-input" type="email" placeholder="hello@email.com" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone (optional)</label>
                  <input className="form-input" type="tel" placeholder="(555) 000-0000" />
                </div>
                <div className="form-group">
                  <label className="form-label">Project Type</label>
                  <select className="form-select">
                    <option value="">Select one</option>
                    <option>Full-Service Design</option>
                    <option>E-Design</option>
                    <option>Room Refresh</option>
                    <option>Styling & Staging</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Budget Range</label>
                <select className="form-select">
                  <option value="">Select a range</option>
                  <option>Under $5,000</option>
                  <option>$5,000 – $15,000</option>
                  <option>$15,000 – $30,000</option>
                  <option>$30,000 – $50,000</option>
                  <option>$50,000+</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" placeholder="Tell us about your space, your vision, and any details you'd like to share…" rows={5} />
              </div>
              <button className="submit-btn" onClick={handleSubmit}>Send Inquiry</button>
              <br />
              <button className="consult-btn">Or book a free consultation →</button>
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
}

// ── Footer Component ──
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand"><img src={LOGO_URL} alt="Interiors by Naisha" className="footer-logo" /></div>
        <div className="footer-socials">
          <a className="footer-social-link" href="https://instagram.com/interiorsbynaisha" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a className="footer-social-link" href="https://tiktok.com/@interiorsbynaisha" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a className="footer-social-link" href="https://pinterest.com/interiorsbynaisha" target="_blank" rel="noopener noreferrer">Pinterest</a>
        </div>
        <p className="footer-copy">© 2026 Interiors by Naisha. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ── Main App ──
export default function App() {
  const [page, setPage] = useState("home");
  const [projectId, setProjectId] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [transition, setTransition] = useState(false);

  const navigate = useCallback((target, id) => {
    setTransition(true);
    setMobileOpen(false);
    setTimeout(() => {
      if (target === "project-detail") {
        setPage("project-detail");
        setProjectId(id);
      } else {
        setPage(target);
        setProjectId(null);
      }
      window.scrollTo({ top: 0, behavior: "instant" });
      setTimeout(() => setTransition(false), 50);
    }, 300);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV_ITEMS = [
    { key: "home", label: "Home" },
    { key: "projects", label: "Projects" },
    { key: "beforeafter", label: "Before & After" },
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },
  ];

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage navigate={navigate} />;
      case "projects": return <ProjectsPage navigate={navigate} />;
      case "project-detail": return <ProjectDetailPage projectId={projectId} navigate={navigate} />;
      case "beforeafter": return <BeforeAfterPage />;
      case "about": return <AboutPage />;
      case "contact": return <ContactPage />;
      default: return <HomePage navigate={navigate} />;
    }
  };

  return (
    <>
      <style>{css}</style>

      {/* Nav */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-brand" onClick={() => navigate("home")}><img src={LOGO_URL} alt="Interiors by Naisha" className="nav-logo" /></div>
        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.key}
              className={`nav-link ${page === item.key ? "active" : ""}`}
              onClick={() => navigate(item.key)}
            >
              {item.label}
            </li>
          ))}
        </ul>
        <div className={`mobile-toggle ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(!mobileOpen)}>
          <span /><span /><span />
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <div key={item.key} className="mobile-menu-link" onClick={() => navigate(item.key)}>
            {item.label}
          </div>
        ))}
      </div>

      {/* Page */}
      <main className={transition ? "page-enter" : "page-active"}>
        {renderPage()}
      </main>

      <Footer />
    </>
  );
}
