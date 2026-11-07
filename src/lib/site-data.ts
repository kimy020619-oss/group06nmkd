export const BRAND = {
  name: "Memora",
  slogan: "Little Moments, Lasting Memories.",
};

export const CONTACT = {
  address: "HUFLIT Hoc Mon Campus, Ho Chi Minh City",
  hotline: "0922598271",
  email: "photomemora111@gmail.com",
  instagram: "https://www.instagram.com/photomemora_",
  tiktok: "https://www.tiktok.com/@photomemora1th11",
  hours: "10 a.m. to 10 p.m.",
};

export const CONTACT_LINKS = {
  hotline: `tel:${CONTACT.hotline}`,
  email: `mailto:${CONTACT.email}`,
  instagram: CONTACT.instagram,
  tiktok: CONTACT.tiktok,
};

export const formatVND = (n: number) => `${n.toLocaleString("en-US")} VND`;

export type Package = {
  name: string;
  price: number;
  audience: string;
  includes: string[];
  note?: string;
  tag?: string;
};

export const PACKAGES: Package[] = [
  {
    name: "Basic Package",
    price: 50000,
    audience: "For an individual or a pair",
    includes: ["One photo session", "Two printed photo strips", "One available frame design"],
    note: "Photo props and digital files not included.",
  },
  {
    name: "Couple & Friends",
    price: 70000,
    audience: "For couples and small groups of up to 3 people",
    includes: [
      "One photo session",
      "Four printed photo strips",
      "Free use of photo props",
      "Choice of an available themed frame",
    ],
    note: "Digital file available as an add-on.",
    tag: "Suggested pick",
  },
  {
    name: "Bestie Package",
    price: 90000,
    audience: "For friend groups of up to four people",
    includes: [
      "One photo session for up to four people",
      "Four printed photo strips",
      "One digital photo file",
      "Free use of photo props",
    ],
  },
  {
    name: "Special Edition",
    price: 120000,
    audience: "For birthdays, anniversaries & seasonal occasions",
    includes: [
      "One photo session",
      "Four printed photo strips",
      "A special themed frame with your name, date, message",
      "Free use of photo props",
      "One small souvenir (sticker or photo sleeve)",
    ],
  },
];

export const ADDONS = [
  { name: "Extra Photo Strip", price: 10000 },
  { name: "Custom Photo Frame", price: 15000 },
  { name: "Digital Photo File", price: 10000 },
  { name: "Photo Holder / Sleeve", price: 15000 },
];

export const PROMOTIONS = [
  {
    name: "Student Day",
    headline: "10% off",
    condition: "On weekdays (Mon-Thu) with a valid student ID.",
  },
  {
    name: "Birthday Treat",
    headline: "1 free photo strip",
    condition: "With any package from 70,000 VND during your birthday month. Valid ID required. Once per year.",
  },
  {
    name: "Bring Your Bestie",
    headline: "10,000 VND voucher",
    condition: "For groups of 3 or more choosing the Bestie Package or above. Valid for your next visit within 30 days.",
  },
];

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Products" },
  { to: "/promotions", label: "Promotions" },
  { to: "/where-to-buy", label: "Where to Buy" },
] as const;
