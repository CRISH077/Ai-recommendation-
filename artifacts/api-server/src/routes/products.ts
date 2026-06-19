import { Router } from "express";

export const productsRouter = Router();

export const PRODUCTS = [
  {
    id: 1,
    name: "Samsung Galaxy S24 FE",
    category: "Phones",
    price: 449.99,
    description: "A feature-rich Android flagship with a 6.7\" AMOLED display, 50MP camera, and all-day battery life.",
    rating: 4.4,
    reviewCount: 2340,
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    tags: ["android", "samsung", "5g", "amoled", "budget-flagship"],
  },
  {
    id: 2,
    name: "Apple iPhone 15",
    category: "Phones",
    price: 699.99,
    description: "Apple's iconic smartphone with A16 Bionic chip, 48MP camera system, and USB-C connectivity.",
    rating: 4.7,
    reviewCount: 5120,
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80",
    tags: ["ios", "apple", "5g", "usb-c", "premium"],
  },
  {
    id: 3,
    name: "Google Pixel 8a",
    category: "Phones",
    price: 499.99,
    description: "Pure Android experience with Google Tensor G3, exceptional camera AI, and 7 years of updates.",
    rating: 4.6,
    reviewCount: 1890,
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80",
    tags: ["android", "google", "5g", "ai-camera", "mid-range"],
  },
  {
    id: 4,
    name: "OnePlus 12",
    category: "Phones",
    price: 799.99,
    description: "Flagship killer with Snapdragon 8 Gen 3, 100W fast charging, and Hasselblad camera tuning.",
    rating: 4.5,
    reviewCount: 980,
    inStock: false,
    imageUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80",
    tags: ["android", "oneplus", "5g", "fast-charging", "flagship"],
  },
  {
    id: 5,
    name: "MacBook Air M3",
    category: "Laptops",
    price: 1099.99,
    description: "Thin, light, and powerful with Apple M3 chip, up to 18-hour battery, and a stunning Liquid Retina display.",
    rating: 4.9,
    reviewCount: 3210,
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
    tags: ["apple", "macos", "m3", "ultrabook", "premium"],
  },
  {
    id: 6,
    name: "Dell XPS 15",
    category: "Laptops",
    price: 1299.99,
    description: "Professional powerhouse with Intel Core i7, NVIDIA RTX 4060, and a gorgeous 4K OLED display.",
    rating: 4.5,
    reviewCount: 1560,
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80",
    tags: ["windows", "intel", "nvidia", "4k-oled", "professional"],
  },
  {
    id: 7,
    name: "ASUS ROG Zephyrus G14",
    category: "Laptops",
    price: 1499.99,
    description: "Gaming laptop with AMD Ryzen 9, RTX 4070, 144Hz QHD display, and MiniLED panel.",
    rating: 4.6,
    reviewCount: 890,
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80",
    tags: ["gaming", "amd", "nvidia", "144hz", "compact"],
  },
  {
    id: 8,
    name: "Lenovo ThinkPad X1 Carbon",
    category: "Laptops",
    price: 1199.99,
    description: "Business ultrabook with MIL-SPEC durability, Intel Core i7, legendary keyboard, and 15-hour battery.",
    rating: 4.7,
    reviewCount: 2100,
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80",
    tags: ["windows", "intel", "business", "ultrabook", "durable"],
  },
  {
    id: 9,
    name: "Sony WH-1000XM5",
    category: "Headphones",
    price: 349.99,
    description: "Industry-leading noise cancellation with 30-hour battery, crystal-clear calls, and premium comfort.",
    rating: 4.8,
    reviewCount: 7840,
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    tags: ["wireless", "noise-cancelling", "over-ear", "premium", "sony"],
  },
  {
    id: 10,
    name: "Apple AirPods Pro 2",
    category: "Headphones",
    price: 249.99,
    description: "Active noise cancellation, Adaptive Audio, and up to 6 hours of listening with H2 chip.",
    rating: 4.7,
    reviewCount: 9230,
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1588423771073-b8903febb85d?w=400&q=80",
    tags: ["wireless", "noise-cancelling", "in-ear", "apple", "anc"],
  },
  {
    id: 11,
    name: "Jabra Evolve2 55",
    category: "Headphones",
    price: 299.99,
    description: "Professional headset with advanced ANC, busylight indicator, and Teams/Zoom certified.",
    rating: 4.5,
    reviewCount: 1240,
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80",
    tags: ["wireless", "noise-cancelling", "over-ear", "business", "certified"],
  },
  {
    id: 12,
    name: "Anker Soundcore Q45",
    category: "Headphones",
    price: 79.99,
    description: "Budget-friendly wireless headphones with 50-hour battery, hybrid ANC, and excellent value.",
    rating: 4.3,
    reviewCount: 4560,
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    tags: ["wireless", "noise-cancelling", "over-ear", "budget", "anker"],
  },
  {
    id: 13,
    name: "iPad Pro M4 11\"",
    category: "Tablets",
    price: 999.99,
    description: "Supercomputer in a tablet with M4 chip, Ultra Retina XDR display, and Apple Pencil Pro support.",
    rating: 4.8,
    reviewCount: 2780,
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80",
    tags: ["apple", "ios", "m4", "oled", "premium"],
  },
  {
    id: 14,
    name: "Samsung Galaxy Tab S9 FE",
    category: "Tablets",
    price: 449.99,
    description: "Versatile Android tablet with 10.9\" display, IP68 water resistance, and S Pen included.",
    rating: 4.4,
    reviewCount: 1890,
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&q=80",
    tags: ["android", "samsung", "s-pen", "water-resistant", "mid-range"],
  },
  {
    id: 15,
    name: "Apple Watch Series 10",
    category: "Wearables",
    price: 399.99,
    description: "Thinnest Apple Watch ever with always-on display, advanced health sensors, and crash detection.",
    rating: 4.7,
    reviewCount: 3450,
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&q=80",
    tags: ["apple", "smartwatch", "health", "fitness", "premium"],
  },
  {
    id: 16,
    name: "Garmin Fenix 7",
    category: "Wearables",
    price: 599.99,
    description: "Premium GPS multisport watch with solar charging, 18-day battery, and advanced training metrics.",
    rating: 4.8,
    reviewCount: 2100,
    inStock: false,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    tags: ["gps", "sports", "solar", "outdoor", "premium"],
  },
  {
    id: 17,
    name: "Sony PlayStation 5 Slim",
    category: "Gaming",
    price: 449.99,
    description: "Next-gen gaming console with 4K 120fps gaming, ray tracing, DualSense haptics, and SSD storage.",
    rating: 4.9,
    reviewCount: 8920,
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80",
    tags: ["console", "sony", "4k", "gaming", "ps5"],
  },
  {
    id: 18,
    name: "Razer DeathAdder V3",
    category: "Gaming",
    price: 69.99,
    description: "Iconic gaming mouse with 30K DPI optical sensor, 90-hour battery, and ultra-lightweight design.",
    rating: 4.6,
    reviewCount: 3120,
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80",
    tags: ["mouse", "wireless", "gaming", "ergonomic", "razer"],
  },
  {
    id: 19,
    name: "LG C3 OLED 55\"",
    category: "TVs",
    price: 1299.99,
    description: "Award-winning OLED TV with perfect blacks, 120Hz gaming mode, Dolby Vision, and webOS smart platform.",
    rating: 4.9,
    reviewCount: 4670,
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f4834a?w=400&q=80",
    tags: ["oled", "4k", "120hz", "gaming", "premium"],
  },
  {
    id: 20,
    name: "Samsung T7 Shield SSD",
    category: "Storage",
    price: 89.99,
    description: "Rugged portable SSD with 1TB capacity, IP65 dust/water resistance, and 1,050MB/s read speed.",
    rating: 4.7,
    reviewCount: 5890,
    inStock: true,
    imageUrl: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80",
    tags: ["ssd", "portable", "rugged", "usb", "samsung"],
  },
];

productsRouter.get("/", (_req, res) => {
  res.json(PRODUCTS);
});

productsRouter.get("/categories", (_req, res) => {
  const categoryMap = new Map<
    string,
    { count: number; minPrice: number; maxPrice: number }
  >();
  for (const p of PRODUCTS) {
    const existing = categoryMap.get(p.category);
    if (existing) {
      existing.count++;
      existing.minPrice = Math.min(existing.minPrice, p.price);
      existing.maxPrice = Math.max(existing.maxPrice, p.price);
    } else {
      categoryMap.set(p.category, {
        count: 1,
        minPrice: p.price,
        maxPrice: p.price,
      });
    }
  }
  const result = Array.from(categoryMap.entries()).map(([category, data]) => ({
    category,
    ...data,
  }));
  res.json(result);
});

productsRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params["id"] ?? "");
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(product);
});
