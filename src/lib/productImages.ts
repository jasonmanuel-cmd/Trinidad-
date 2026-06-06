const CATEGORY_STYLES: Record<string, { gradient: string; accent: string; pattern: string }> = {
  Flower: {
    gradient: "linear-gradient(135deg, #06D6A0 0%, #059669 30%, #065F46 60%, #022C22 100%)",
    accent: "#34D399",
    pattern: "M20,40 Q40,20 60,40 T100,40",
  },
  Edibles: {
    gradient: "linear-gradient(135deg, #E83E6B 0%, #BE185D 30%, #831843 60%, #4C0519 100%)",
    accent: "#F472B6",
    pattern: "M20,60 Q50,20 80,60 Q50,100 20,60",
  },
  Concentrates: {
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 30%, #4C1D95 60%, #1E1B4B 100%)",
    accent: "#A78BFA",
    pattern: "M20,40 Q40,60 60,40 T100,40",
  },
  Vapes: {
    gradient: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 30%, #1E3A5F 60%, #0F172A 100%)",
    accent: "#60A5FA",
    pattern: "M30,20 L50,80 L70,20",
  },
  "Pre-Rolls": {
    gradient: "linear-gradient(135deg, #FF6B35 0%, #EA580C 30%, #9A3412 60%, #431407 100%)",
    accent: "#FB923C",
    pattern: "M20,50 Q50,20 80,50",
  },
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getCategoryStyle(category: string) {
  return CATEGORY_STYLES[category] || CATEGORY_STYLES.Flower;
}

export function generateProductImageDataUrl(
  name: string,
  category: string,
  thc?: string
): string {
  const style = getCategoryStyle(category);
  const initials = getInitials(name);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">${style.gradient
      .replace("linear-gradient(135deg", "")
      .replace(")", "")
      .split(",")
      .map((part, i) => {
        const offset = ["0%", "35%", "65%", "100%"][i] || "100%";
        return `<stop offset="${offset}" stop-color="${part.trim()}"/>`;
      })
      .join("")}</linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${style.accent}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="${style.accent}" stop-opacity="0"/>
    </radialGradient>
    <filter id="glass">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
    </filter>
  </defs>

  <rect width="600" height="600" fill="url(#bg)"/>

  <circle cx="300" cy="300" r="280" fill="url(#glow)"/>

  <g opacity="0.15" stroke="${style.accent}" stroke-width="2" fill="none">
    <path d="${style.pattern}" transform="translate(0,0) scale(4)"/>
    <path d="${style.pattern}" transform="translate(50,200) scale(3) rotate(45)"/>
    <path d="${style.pattern}" transform="translate(400,50) scale(3.5) rotate(-30)"/>
    <path d="${style.pattern}" transform="translate(450,400) scale(2.5) rotate(90)"/>
    <path d="${style.pattern}" transform="translate(50,450) scale(2) rotate(-60)"/>
  </g>

  <g opacity="0.08">
    <circle cx="100" cy="100" r="200" fill="white"/>
    <circle cx="500" cy="500" r="150" fill="white"/>
    <circle cx="500" cy="100" r="100" fill="white"/>
  </g>

  <text x="300" y="280" font-family="system-ui,-apple-system,sans-serif" font-size="120" font-weight="900" fill="white" text-anchor="middle" opacity="0.95">
    ${initials}
  </text>

  <rect x="200" y="340" width="200" height="2" rx="1" fill="${style.accent}" opacity="0.5"/>

  <text x="300" y="395" font-family="system-ui,-apple-system,sans-serif" font-size="14" font-weight="700" fill="white" text-anchor="middle" letter-spacing="4" opacity="0.7">
    ${category.toUpperCase()}
  </text>

  ${thc ? `
  <rect x="230" y="420" width="140" height="32" rx="16" fill="white" opacity="0.15"/>
  <text x="300" y="442" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="700" fill="white" text-anchor="middle" letter-spacing="1" opacity="0.9">
    ${thc} THC
  </text>` : ""}
</svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export function generatePreorderImageDataUrl(
  brand: string,
  name: string
): string {
  const initials = getInitials(brand);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1E1B4B"/>
      <stop offset="50%" stop-color="#312E81"/>
      <stop offset="100%" stop-color="#4C1D95"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="600" height="600" fill="url(#bg)"/>
  <circle cx="300" cy="300" r="280" fill="url(#glow)"/>

  <g opacity="0.1" stroke="#A78BFA" stroke-width="1.5" fill="none">
    <rect x="50" y="50" width="500" height="500" rx="20"/>
    <rect x="80" y="80" width="440" height="440" rx="15"/>
    <rect x="110" y="110" width="380" height="380" rx="10"/>
  </g>

  <g opacity="0.06">
    <circle cx="150" cy="150" r="180" fill="white"/>
    <circle cx="450" cy="450" r="130" fill="white"/>
  </g>

  <text x="300" y="260" font-family="system-ui,-apple-system,sans-serif" font-size="100" font-weight="900" fill="white" text-anchor="middle" opacity="0.9">
    ${initials}
  </text>

  <rect x="200" y="310" width="200" height="2" rx="1" fill="#A78BFA" opacity="0.4"/>

  <text x="300" y="360" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="700" fill="white" text-anchor="middle" letter-spacing="3" opacity="0.6">
    PREORDER
  </text>

  <text x="300" y="420" font-family="system-ui,-apple-system,sans-serif" font-size="10" font-weight="600" fill="#A78BFA" text-anchor="middle" letter-spacing="5" opacity="0.8">
    COMING FROM CALIFORNIA
  </text>
</svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
