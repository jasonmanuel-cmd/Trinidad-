export interface PreorderProduct {
  id: string;
  name: string;
  brand: string;
  category: "flower" | "edibles" | "concentrates" | "vapes" | "prerolls" | "other";
  price: number;
  thcPercentage?: number;
  description: string;
  effects?: string[];
  estimatedDelivery: string; // "2-3 business days"
  minOrderQuantity?: number;
}

export const PREORDER_PRODUCTS: PreorderProduct[] = [
  // Stizzy
  {
    id: "stizzy-live-resin-1g",
    name: "Live Resin Disposable Pen",
    brand: "Stizzy",
    category: "vapes",
    price: 45,
    thcPercentage: 88,
    description: "Premium live resin vape with full spectrum cannabinoid profile",
    effects: ["Energetic", "Creative", "Uplifting"],
    estimatedDelivery: "2-3 business days",
  },
  {
    id: "stizzy-thca-flower",
    name: "THCA Flower Premium Eighth",
    brand: "Stizzy",
    category: "flower",
    price: 55,
    thcPercentage: 32,
    description: "Premium THCA flower with exceptional terpene profile",
    effects: ["Relaxing", "Euphoric", "Calming"],
    estimatedDelivery: "2-3 business days",
  },

  // Canadas (Cannabis Sativa dominant strains)
  {
    id: "canadas-pink-kush",
    name: "Pink Kush Flower - Half Ounce",
    brand: "Canadas",
    category: "flower",
    price: 120,
    thcPercentage: 28,
    description: "Legendary Pink Kush with rich, complex flavor profile",
    effects: ["Relaxing", "Pain Relief", "Sleep"],
    estimatedDelivery: "2-3 business days",
  },
  {
    id: "canadas-edible-pack",
    name: "Gummy Collection - Mixed Flavors",
    brand: "Canadas",
    category: "edibles",
    price: 35,
    description: "20-pack assorted gummies, 10mg THC each",
    effects: ["Relaxing", "Social", "Euphoric"],
    estimatedDelivery: "2-3 business days",
  },

  // Cookies
  {
    id: "cookies-berner-flower",
    name: "Berner's Cookies Flower - Quarter Pound",
    brand: "Cookies",
    category: "flower",
    price: 200,
    thcPercentage: 30,
    description: "Signature Berner blend, award-winning genetics",
    effects: ["Balanced", "Creative", "Euphoric"],
    estimatedDelivery: "2-3 business days",
  },
  {
    id: "cookies-rosin-gram",
    name: "Fresh Rosin - Premium 1g",
    brand: "Cookies",
    category: "concentrates",
    price: 60,
    thcPercentage: 85,
    description: "Solventless rosin with rich terpene expression",
    effects: ["Potent", "Flavorful", "Balanced"],
    estimatedDelivery: "2-3 business days",
  },

  // Jeeter (Pre-Rolls)
  {
    id: "jeeter-infused-preroll",
    name: "Infused Pre-Roll - 1.5g",
    brand: "Jeeter",
    category: "prerolls",
    price: 25,
    thcPercentage: 32,
    description: "Pre-roll coated with kief for extra potency",
    effects: ["Smooth", "Flavorful", "Balanced"],
    estimatedDelivery: "2-3 business days",
  },

  // Rove (Cartridges)
  {
    id: "rove-full-spectrum-cart",
    name: "Full Spectrum Cartridge - 1g",
    brand: "Rove",
    category: "vapes",
    price: 50,
    thcPercentage: 82,
    description: "Full-spectrum live resin cartridge with premium hardware",
    effects: ["Energetic", "Creative", "Uplifting"],
    estimatedDelivery: "2-3 business days",
  },

  // West Coast Cure
  {
    id: "wcc-sauce-cart",
    name: "Sauce Cartridge - 1g",
    brand: "West Coast Cure",
    category: "vapes",
    price: 48,
    thcPercentage: 80,
    description: "Terpy sauce cartridge with premium cannabinoid blend",
    effects: ["Smooth", "Flavorful", "Relaxing"],
    estimatedDelivery: "2-3 business days",
  },

  // Kushy Punch (Edibles)
  {
    id: "kushy-punch-drinks",
    name: "Mixed Drink Pack - 5 Pack",
    brand: "Kushy Punch",
    category: "edibles",
    price: 40,
    description: "5 assorted beverages, 10mg THC each",
    effects: ["Relaxing", "Social", "Euphoric"],
    estimatedDelivery: "2-3 business days",
  },

  // Kiva Confections
  {
    id: "kiva-chocolate-bars",
    name: "Dark Chocolate Bars - 4 Pack",
    brand: "Kiva Confections",
    category: "edibles",
    price: 45,
    description: "Premium dark chocolate infused with THC",
    effects: ["Relaxing", "Creative", "Euphoric"],
    estimatedDelivery: "2-3 business days",
  },

  // Stiiizy Hash Rosin
  {
    id: "stiiizy-hash-rosin",
    name: "Hash Rosin - Premium 1g",
    brand: "Stiiizy",
    category: "concentrates",
    price: 65,
    thcPercentage: 88,
    description: "Hand-pressed hash rosin with full terpene spectrum",
    effects: ["Potent", "Flavorful", "Balanced"],
    estimatedDelivery: "2-3 business days",
  },

  // Plug Play (Vape)
  {
    id: "plug-play-pod",
    name: "Cannabis Pod Cartridge",
    brand: "Plug Play",
    category: "vapes",
    price: 55,
    thcPercentage: 84,
    description: "Premium pod with advanced heating technology",
    effects: ["Smooth", "Potent", "Flavorful"],
    estimatedDelivery: "2-3 business days",
  },

  // Heavy Hitters (Flower)
  {
    id: "heavy-hitters-flower-oz",
    name: "Premium Flower - Full Ounce",
    brand: "Heavy Hitters",
    category: "flower",
    price: 240,
    thcPercentage: 29,
    description: "Ultra-premium hand-selected buds",
    effects: ["Balanced", "Potent", "Flavorful"],
    estimatedDelivery: "2-3 business days",
  },

  // Raw Garden (Concentrates)
  {
    id: "raw-garden-badder",
    name: "Live Badder - 1g",
    brand: "Raw Garden",
    category: "concentrates",
    price: 55,
    thcPercentage: 82,
    description: "Smooth live badder with robust flavor profile",
    effects: ["Flavorful", "Relaxing", "Balanced"],
    estimatedDelivery: "2-3 business days",
  },

  // Wyld (Edibles)
  {
    id: "wyld-gummies-pack",
    name: "Berry Gummies - 20 Pack",
    brand: "Wyld",
    category: "edibles",
    price: 38,
    description: "Organic berry gummies, 5mg THC each",
    effects: ["Relaxing", "Natural", "Euphoric"],
    estimatedDelivery: "2-3 business days",
  },

  // Sunday Goods (Flower)
  {
    id: "sunday-goods-flower-quarter",
    name: "Craft Flower - Quarter Pound",
    brand: "Sunday Goods",
    category: "flower",
    price: 110,
    thcPercentage: 26,
    description: "Hand-trimmed craft cannabis with exceptional quality",
    effects: ["Creative", "Euphoric", "Uplifting"],
    estimatedDelivery: "2-3 business days",
  },
];
