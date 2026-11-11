export interface CategoryItem {
  id: string;
  name: string;
  sector: string;
  spectrum: "INFORMAL" | "FORMAL" | "DUAL";
  defaultRadiusKm: number;
  description: string;
  popularLocations: string[];
}

export const ESWATINI_CATEGORIES: CategoryItem[] = [
  // 1. Street Food & Local Catering
  {
    id: "chicken-dust-braai",
    name: "Chicken Dust & Street Braai",
    sector: "Food & Catering",
    spectrum: "INFORMAL",
    defaultRadiusKm: 10,
    description: "Flame-grilled chicken portions, pap (lipaleshi), and slaai at local spots and markets.",
    popularLocations: ["Manzini Market", "Mbabane Bus Rank", "Matsapha Industrial", "Kwaluseni"]
  },
  {
    id: "event-catering-spitbraai",
    name: "Event Catering & Spit Braai",
    sector: "Food & Catering",
    spectrum: "DUAL",
    defaultRadiusKm: 30,
    description: "Weddings, traditional ceremonies (Umutimba/Lusekwane), and corporate events.",
    popularLocations: ["Ezulwini Valley", "Mbabane", "Manzini", "Mhlambanyatsi"]
  },
  {
    id: "custom-cakes-bakery",
    name: "Custom Cakes & Baking",
    sector: "Food & Catering",
    spectrum: "DUAL",
    defaultRadiusKm: 20,
    description: "Birthday cakes, celebration platters, and traditional baked treats.",
    popularLocations: ["Mbabane", "Ezulwini", "Manzini"]
  },

  // 2. Personal Care & Grooming
  {
    id: "township-barbers",
    name: "Township Barbers & Haircuts",
    sector: "Personal Care",
    spectrum: "INFORMAL",
    defaultRadiusKm: 8,
    description: "Local barber kiosks and mobile haircut services.",
    popularLocations: ["Manzini Bus Rank", "Mbabane Msunduza", "Matsapha Mobeni", "Nhlangano"]
  },
  {
    id: "braiding-hair-salons",
    name: "Hair Braiding, Weaves & Dreadlocks",
    sector: "Personal Care",
    spectrum: "DUAL",
    defaultRadiusKm: 15,
    description: "Knotless braids, dreadlock maintenance, and hair styling.",
    popularLocations: ["President Centre Manzini", "Mbabane Mall", "Ezulwini Corner Plaza"]
  },
  {
    id: "mobile-nails-makeup",
    name: "Mobile Nails & Makeup Artistry",
    sector: "Personal Care",
    spectrum: "DUAL",
    defaultRadiusKm: 25,
    description: "Bridal makeup, acrylics, gel nails, and home visits.",
    popularLocations: ["Ezulwini", "Mbabane", "Manzini"]
  },

  // 3. Transport & Haulage
  {
    id: "bakkie-hire-moving",
    name: "Bakkie Hire & Local Moving",
    sector: "Transport & Logistics",
    spectrum: "DUAL",
    defaultRadiusKm: 35,
    description: "Pickup trucks and light trucks for household moving, furniture delivery, and farm produce.",
    popularLocations: ["Manzini", "Mbabane", "Matsapha", "Ezulwini"]
  },
  {
    id: "breakdown-towing",
    name: "Breakdown & Towing Services",
    sector: "Transport & Logistics",
    spectrum: "FORMAL",
    defaultRadiusKm: 50,
    description: "24/7 vehicle recovery along MR3 highway, Malagwane hill, and national routes.",
    popularLocations: ["MR3 Corridor", "Mbabane", "Manzini", "Matsapha"]
  },
  {
    id: "kombi-private-shuttle",
    name: "Private Shuttles & Airport Transfers",
    sector: "Transport & Logistics",
    spectrum: "DUAL",
    defaultRadiusKm: 60,
    description: "King Mswati III International (KMIII) transfers, cross-border to O.R. Tambo, and group trips.",
    popularLocations: ["Sikhuphe (KMIII)", "Mbabane", "Manzini", "Ezulwini"]
  },

  // 4. Welding, Steel & Construction Trades
  {
    id: "welding-burglar-proofing",
    name: "Welding, Burglar Gates & Carports",
    sector: "Trades & Construction",
    spectrum: "DUAL",
    defaultRadiusKm: 30,
    description: "Custom security gates, window burglar guards, tank stands, and steel carports.",
    popularLocations: ["Matsapha Industrial", "Mbabane Sheffield Rd", "Manzini Light Industrial"]
  },
  {
    id: "plumbing-water-tanks",
    name: "Plumbing & JoJo Tank Installation",
    sector: "Trades & Construction",
    spectrum: "DUAL",
    defaultRadiusKm: 30,
    description: "Leak repairs, geysers, pipe fittings, and rainwater harvesting / booster pumps.",
    popularLocations: ["Mbabane", "Ezulwini", "Manzini", "Matsapha"]
  },
  {
    id: "electricians-solar-inverters",
    name: "Electricians, Solar & Inverters",
    sector: "Trades & Construction",
    spectrum: "DUAL",
    defaultRadiusKm: 40,
    description: "House wiring, fault finding, backup solar batteries, and inverter installations.",
    popularLocations: ["Mbabane", "Manzini", "Ezulwini", "Piggs Peak"]
  },
  {
    id: "borehole-siting-drilling",
    name: "Borehole Siting, Drilling & Pumps",
    sector: "Trades & Construction",
    spectrum: "FORMAL",
    defaultRadiusKm: 70,
    description: "Geological survey, borehole drilling, casing, and submersible pump setup.",
    popularLocations: ["Lowveld", "Manzini Peri-Urban", "Shiselweni", "Lubombo"]
  },
  {
    id: "gardening-tree-felling",
    name: "Gardening, Landscaping & Tree Felling",
    sector: "Trades & Construction",
    spectrum: "INFORMAL",
    defaultRadiusKm: 20,
    description: "Lawn mowing, hedge trimming, garden design, and hazardous tree felling.",
    popularLocations: ["Mbabane", "Ezulwini", "Malkerns"]
  },

  // 5. Automotive & Mechanical Services
  {
    id: "mobile-mechanic-roadside",
    name: "Mobile Mechanics & Roadside Assistance",
    sector: "Automotive",
    spectrum: "DUAL",
    defaultRadiusKm: 30,
    description: "On-site engine repairs, starter motors, alternators, and roadside diagnostics.",
    popularLocations: ["Mbabane", "Matsapha", "Manzini"]
  },
  {
    id: "auto-body-spray-painting",
    name: "Auto Body Repair & Panel Beating",
    sector: "Automotive",
    spectrum: "DUAL",
    defaultRadiusKm: 30,
    description: "Dent removal, chassis straightening, and spray painting.",
    popularLocations: ["Matsapha", "Mbabane Industrial", "Manzini Industrial"]
  },
  {
    id: "tyres-wheel-alignment",
    name: "Tyres, Puncture Repairs & Alignment",
    sector: "Automotive",
    spectrum: "DUAL",
    defaultRadiusKm: 25,
    description: "New and retread tyres, 3D wheel alignment, and roadside puncture repairs.",
    popularLocations: ["Manzini", "Mbabane", "Matsapha"]
  },

  // 6. Traditional & Custom Tailoring
  {
    id: "swazi-traditional-attire",
    name: "Swazi Traditional Attire & Regalia",
    sector: "Tailoring & Fashion",
    spectrum: "INFORMAL",
    defaultRadiusKm: 25,
    description: "Handcrafted emahiya, incwancwa, sidvwaba (cowhide skirt), and cultural beadwork.",
    popularLocations: ["Manzini Market", "Mbabane", "Ezulwini Cultural Village"]
  },
  {
    id: "tailoring-school-uniforms",
    name: "Seamstresses, Tailors & Uniforms",
    sector: "Tailoring & Fashion",
    spectrum: "DUAL",
    defaultRadiusKm: 20,
    description: "Suit tailoring, dressmaking, curtains, and school uniform alterations.",
    popularLocations: ["Manzini President Centre", "Mbabane New Mall", "Nhlangano"]
  },

  // 7. Tech, Electronics & Appliances
  {
    id: "phone-tablet-repair",
    name: "Smartphone & Tablet Screen Repairs",
    sector: "Electronics & Tech",
    spectrum: "DUAL",
    defaultRadiusKm: 15,
    description: "iPhone/Samsung screens, charging ports, battery replacements, and unlocking.",
    popularLocations: ["Mbabane Plaza", "Manzini Bhunu Mall", "Matsapha Complex"]
  },
  {
    id: "dstv-satellite-installers",
    name: "DSTV & Satellite TV Installers",
    sector: "Electronics & Tech",
    spectrum: "DUAL",
    defaultRadiusKm: 30,
    description: "Decoder dish alignment, extra view setup, signal troubleshooting, and mounting.",
    popularLocations: ["Mbabane", "Ezulwini", "Manzini", "Matsapha"]
  },
  {
    id: "refrigeration-appliance-repair",
    name: "Fridge, Washing Machine & AC Repairs",
    sector: "Electronics & Tech",
    spectrum: "DUAL",
    defaultRadiusKm: 30,
    description: "Gas regassing, cooling diagnostics, and commercial cold room servicing.",
    popularLocations: ["Matsapha", "Manzini", "Mbabane"]
  },

  // 8. Cleaning & Sanitation
  {
    id: "car-wash-valet",
    name: "Car Wash & Mobile Valet",
    sector: "Cleaning Services",
    spectrum: "INFORMAL",
    defaultRadiusKm: 10,
    description: "Exterior wash, interior shampoo, engine bay cleaning, and mobile driveway visits.",
    popularLocations: ["Ezulwini Gables", "Mbabane Checkers", "Manzini Club"]
  },
  {
    id: "carpet-couch-cleaning",
    name: "Carpet & Couch Deep Cleaning",
    sector: "Cleaning Services",
    spectrum: "DUAL",
    defaultRadiusKm: 25,
    description: "Steam extraction for rugs, upholstery, car seats, and mattresses.",
    popularLocations: ["Mbabane", "Ezulwini", "Manzini"]
  },

  // 9. Professional & Compliance Services
  {
    id: "tax-pin-ers-accounting",
    name: "Tax PIN, ERS Returns & Bookkeeping",
    sector: "Professional Services",
    spectrum: "FORMAL",
    defaultRadiusKm: 50,
    description: "Eswatini Revenue Service (ERS) tax clearance, VAT, PAYE, and financial statements.",
    popularLocations: ["Mbabane", "Manzini"]
  },
  {
    id: "company-registration-licensing",
    name: "Company Registration & Trading Licenses",
    sector: "Professional Services",
    spectrum: "FORMAL",
    defaultRadiusKm: 50,
    description: "Form J/Form C filings, registrar of companies, and municipal health inspections.",
    popularLocations: ["Mbabane Ministry of Commerce", "Manzini"]
  },

  // 10. Financial Access Points (Mapped directly in Geospatial Engine)
  {
    id: "mtn-momo-agent",
    name: "MTN MoMo Cash-In / Cash-Out Agent",
    sector: "Financial Nodes",
    spectrum: "DUAL",
    defaultRadiusKm: 5,
    description: "Mobile Money deposit, withdrawal, and cash-voucher redemptions.",
    popularLocations: ["All urban centers, bus ranks, and rural trading stores"]
  },
  {
    id: "fnb-cashplus-agent",
    name: "FNB CashPlus Retail Agent",
    sector: "Financial Nodes",
    spectrum: "FORMAL",
    defaultRadiusKm: 5,
    description: "Deposits, withdrawals, and payments at authorized neighbourhood grocery stores.",
    popularLocations: ["Pick n Pay, local supermarkets, and corner stores"]
  },
  {
    id: "bank-atm-access",
    name: "Commercial Bank ATM",
    sector: "Financial Nodes",
    spectrum: "FORMAL",
    defaultRadiusKm: 5,
    description: "FNB Eswatini, Standard Bank, Nedbank, and Eswatini Building Society (SBS) ATMs.",
    popularLocations: ["Mbabane Mall, Manzini Bhunu Mall, Ezulwini Gables, Matsapha Mahhala"]
  }
];
