export interface CategoryItem {
  id: string;
  name: string;
  sector: string;
  spectrum: "INFORMAL" | "FORMAL" | "DUAL";
  defaultRadiusKm: number;
  description: string;
  keywords: string[];
  popularLocations: string[];
}

export const ESWATINI_CATEGORIES: CategoryItem[] = [
  // 1. Personal Care & Grooming
  {
    id: "hair-styling-braids",
    name: "Hair Styling, Braiding & Salons",
    sector: "Beauty & Grooming",
    spectrum: "DUAL",
    defaultRadiusKm: 5,
    description: "Knotless braids, dreadlocks, wash & set, wig installation, and township barbers.",
    keywords: ["hairstylist", "hair", "braids", "salon", "barber", "haircut", "wig", "locks", "twists"],
    popularLocations: ["Mbabane Bus Rank", "Swazi Plaza Walkway", "Msunduza", "The Mall"]
  },
  {
    id: "nail-tech-services",
    name: "Nail Technicians & Manicures",
    sector: "Beauty & Grooming",
    spectrum: "INFORMAL",
    defaultRadiusKm: 5,
    description: "Acrylic tips, gel overlay, press-ons, pedicure, manicure, and mobile nail art.",
    keywords: ["nail tech", "nails", "acrylic", "gel", "pedicure", "manicure", "nail artist"],
    popularLocations: ["Bus Rank Container 8", "Swazi Plaza", "Eveni (Mobile)", "Woodlands"]
  },

  // 2. Street Food & Local Eateries
  {
    id: "food-stalls-street-braai",
    name: "Food Stalls, Chicken Dust & Kotas",
    sector: "Food & Refreshment",
    spectrum: "INFORMAL",
    defaultRadiusKm: 5,
    description: "Fresh flame-grilled chicken dust, pap and slaai, kotas, magwinya (fat cakes), and lunch plates.",
    keywords: ["food stall", "chicken dust", "braai", "food", "kota", "magwinya", "lunch", "eating", "restaurant"],
    popularLocations: ["Mbabane Market", "Main Bus Rank", "Sheffield Road", "Msunduza"]
  },
  {
    id: "event-catering-baking",
    name: "Event Catering & Home Baking",
    sector: "Food & Refreshment",
    spectrum: "DUAL",
    defaultRadiusKm: 15,
    description: "Platters, birthday cakes, family spit braai, and traditional ceremony food.",
    keywords: ["catering", "cake", "baking", "spit braai", "pastries", "chef"],
    popularLocations: ["Eveni", "Mountain View", "Checkers", "Swazi Plaza"]
  },

  // 3. Printing, Copying & Internet
  {
    id: "printing-copying-internet",
    name: "Printing, Photocopying & Stationery",
    sector: "Office & Media",
    spectrum: "DUAL",
    defaultRadiusKm: 6,
    description: "Colour printing, photocopy, document binding, passport photos, scanning, and typing.",
    keywords: ["printing shop", "printing", "photocopy", "copy", "passport photo", "internet cafe", "typing", "binding", "stationery"],
    popularLocations: ["Sheffield Road", "The Mall 1st Floor", "Corporate Place", "Swazi Plaza"]
  },

  // 4. Fueling & Service Stations
  {
    id: "fueling-stations",
    name: "Fueling Stations & 24h Express",
    sector: "Automotive & Energy",
    spectrum: "FORMAL",
    defaultRadiusKm: 8,
    description: "Petrol, diesel, tyre air pressure, oil checks, and 24-hour convenience express stores.",
    keywords: ["fueling station", "petrol station", "fuel", "petrol", "diesel", "garage", "gas", "shell", "total", "galp", "puma"],
    popularLocations: ["Mbabane By-Pass", "Sheffield Road", "Malagwane Hill", "Msunduza"]
  },

  // 5. Healthcare, Clinics & Pharmacies
  {
    id: "hospitals-clinics-pharmacy",
    name: "Hospitals, Clinics & Pharmacies",
    sector: "Health & Medical",
    spectrum: "FORMAL",
    defaultRadiusKm: 10,
    description: "Emergency rooms, general practitioners, private clinics, prescription medicine, and wellness.",
    keywords: ["hospital", "clinic", "pharmacy", "doctor", "chemist", "medication", "emergency", "health", "nurse"],
    popularLocations: ["Mbabane Government Hospital", "Corporate Place", "The Mall", "Swazi Plaza"]
  },

  // 6. Automotive, Mechanics & Tyres
  {
    id: "mechanics-tyres-puncture",
    name: "Auto Mechanics & Roadside Tyres",
    sector: "Automotive & Energy",
    spectrum: "DUAL",
    defaultRadiusKm: 10,
    description: "Engine diagnostics, mobile roadside help, tyre puncture repairs, wheel alignment, battery jumpstart.",
    keywords: ["mechanic", "tyre", "puncture", "auto", "car repair", "battery", "breakdown", "wheel"],
    popularLocations: ["Sheffield Road", "Sidwashini", "Checkers", "By-Pass"]
  },
  {
    id: "car-wash-valet",
    name: "Car Wash & Mobile Valet",
    sector: "Automotive & Energy",
    spectrum: "INFORMAL",
    defaultRadiusKm: 6,
    description: "Hand wash, foam spray, interior vacuuming, polish, and mobile driveway visits.",
    keywords: ["car wash", "car valet", "car cleaning", "vehicle wash", "wash bay"],
    popularLocations: ["Checkers", "Sheffield Road", "Msunduza", "Sidwashini"]
  },

  // 7. Trades, Plumbing & Electrical
  {
    id: "plumbers-electricians-handyman",
    name: "Plumbers, Electricians & Handymen",
    sector: "Home & Repairs",
    spectrum: "DUAL",
    defaultRadiusKm: 15,
    description: "Burst pipes, geysers, JoJo water tanks, home wiring, solar backup, appliance & microwave repair.",
    keywords: ["plumber", "electrician", "handyman", "pipes", "geyser", "wiring", "solar", "appliance repair", "microwave", "stove"],
    popularLocations: ["Eveni", "Msunduza", "Fonteyn", "Sidwashini"]
  },

  // 8. Tailoring, Seamstresses & Traditional Regalia
  {
    id: "tailoring-traditional-attire",
    name: "Seamstresses, Tailors & Swazi Regalia",
    sector: "Tailoring & Fashion",
    spectrum: "INFORMAL",
    defaultRadiusKm: 8,
    description: "School uniforms, zip repairs, suit adjustments, handcrafted emahiya, and sidvwaba regalia.",
    keywords: ["tailor", "seamstress", "dressmaker", "uniform", "alterations", "traditional attire", "lihiya", "incwancwa"],
    popularLocations: ["Mbabane Market", "Swazi Plaza", "Msunduza"]
  },

  // 9. Smartphone & Tech Repairs
  {
    id: "phone-tech-repairs",
    name: "Phone Screen & Laptop Repairs",
    sector: "Electronics & Tech",
    spectrum: "DUAL",
    defaultRadiusKm: 6,
    description: "Broken screen replacement, charging ports, battery swap, software flashing, DSTV dish setup.",
    keywords: ["phone repair", "screen repair", "laptop repair", "dstv", "technician", "iphone", "samsung", "electronics"],
    popularLocations: ["Mbabane Bus Rank Kiosks", "Swazi Plaza", "The Mall"]
  },

  // 10. Financial Access Points
  {
    id: "financial-momo-atms",
    name: "ATMs, MoMo & CashPlus Outlets",
    sector: "Financial Nodes",
    spectrum: "FORMAL",
    defaultRadiusKm: 5,
    description: "MTN MoMo cash-in/cash-out, FNB CashPlus, Nedbank Unayo, and commercial bank ATMs.",
    keywords: ["atm", "momo", "cashplus", "cash out", "deposit", "money", "bank", "fnb", "standard bank", "sbs"],
    popularLocations: ["Swazi Plaza", "Bus Rank", "Corporate Place", "The Mall"]
  }
];
