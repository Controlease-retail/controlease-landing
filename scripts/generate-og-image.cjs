const fs = require('fs');
const path = require('path');

// Create an SVG-based OG image (1200x630)
const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#191435"/>
      <stop offset="50%" style="stop-color:#100c21"/>
      <stop offset="100%" style="stop-color:#191435"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f26672"/>
      <stop offset="100%" style="stop-color:#e97391"/>
    </linearGradient>
    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ffffff"/>
      <stop offset="50%" style="stop-color:#f26672"/>
      <stop offset="100%" style="stop-color:#4c73e4"/>
    </linearGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="20" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Decorative circles -->
  <circle cx="1100" cy="100" r="300" fill="#f26672" opacity="0.1" filter="url(#glow)"/>
  <circle cx="100" cy="530" r="250" fill="#4c73e4" opacity="0.1" filter="url(#glow)"/>

  <!-- Grid pattern overlay -->
  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
  </pattern>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- Logo area -->
  <g transform="translate(80, 80)">
    <!-- Logo icon placeholder (stylized C) -->
    <rect x="0" y="0" width="50" height="50" rx="12" fill="url(#accent)"/>
    <text x="16" y="37" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white">C</text>

    <!-- Brand name -->
    <text x="65" y="38" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white">Controlease</text>
  </g>

  <!-- Main headline -->
  <text x="80" y="280" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="white">One platform for your</text>
  <text x="80" y="360" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="url(#textGradient)">entire lease portfolio.</text>

  <!-- Subheadline -->
  <text x="80" y="430" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.7)">Capture, manage, and analyze all your leases in one place.</text>
  <text x="80" y="465" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.7)">Built for global teams.</text>

  <!-- Bottom stats -->
  <g transform="translate(80, 530)">
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.5)" text-transform="uppercase">LEASE LIFECYCLE</text>
    <text x="0" y="30" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="white">End-to-End</text>

    <text x="200" y="0" font-family="Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.5)">DATA SOURCE</text>
    <text x="200" y="30" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="white">Single Truth</text>

    <text x="400" y="0" font-family="Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.5)">DEPLOYMENT</text>
    <text x="400" y="30" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="white">Cloud-Native</text>
  </g>

  <!-- Accent line -->
  <rect x="80" y="500" width="120" height="4" rx="2" fill="url(#accent)"/>

  <!-- Website URL -->
  <text x="1120" y="590" font-family="Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.5)" text-anchor="end">controlease.net</text>
</svg>
`;

const outputPath = path.join(__dirname, '../public/og-image.svg');
fs.writeFileSync(outputPath, svg.trim());
console.log('OG image created at:', outputPath);
