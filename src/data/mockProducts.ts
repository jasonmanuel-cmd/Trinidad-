export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "Flower" | "Edibles" | "Concentrates" | "Vapes";
  brand: string;
  price: number;
  weight: string;
  thc?: string;
  image: string;
  isPreorder: boolean;
  expectedArrival?: string;
  stockStatus: "In Stock" | "Low Stock" | "Sold Out" | "Preorder";
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Trippy Truffles",
    slug: "trippy-truffles",
    category: "Edibles",
    brand: "Trinidad's",
    price: 35.0,
    weight: "100mg",
    image: "/products/edible-1.jpg",
    isPreorder: false,
    stockStatus: "In Stock",
    description: "Our signature artisanal chocolate truffles infused with premium distillate.",
  },
  {
    id: "2",
    name: "Golden Goat",
    slug: "golden-goat",
    category: "Flower",
    brand: "Private Reserve",
    price: 45.0,
    weight: "3.5g",
    thc: "24%",
    image: "/products/flower-1.jpg",
    isPreorder: false,
    stockStatus: "Low Stock",
    description: "Energizing sativa dominant hybrid with a sweet and spicy aroma.",
  },
  {
    id: "3",
    name: "Midnight Kush",
    slug: "midnight-kush",
    category: "Flower",
    brand: "Exclusive",
    price: 50.0,
    weight: "3.5g",
    thc: "28%",
    image: "/products/flower-2.jpg",
    isPreorder: true,
    expectedArrival: "In 2 days",
    stockStatus: "Preorder",
    description: "Deeply relaxing indica for the ultimate nighttime experience.",
  },
  {
    id: "4",
    name: "Live Resin Diamond",
    slug: "live-resin-diamond",
    category: "Concentrates",
    brand: "Elite Labs",
    price: 65.0,
    weight: "1g",
    thc: "82%",
    image: "/products/concentrate-1.jpg",
    isPreorder: false,
    stockStatus: "In Stock",
    description: "High potency live resin with preserved terpene profiles.",
  },
];
