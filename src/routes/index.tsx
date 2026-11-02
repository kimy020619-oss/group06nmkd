import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import { Camera, Images, Printer, ArrowDown, ArrowUpRight, Gift, Check } from "lucide-react";
import heroBooth from "@/assets/wooden-booth-reference.jpg.asset.json";
import photostripDesign from "@/assets/photostrip-design.jpg.asset.json";
import { Film, Crop, Image as ImageIcon, Bookmark } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ADDON_DETAILS: Record<string, { icon: LucideIcon; note: string }> = {
  "Extra Photo Strip": { icon: Film, note: "More prints, more memories." },
  "Custom Photo Frame": { icon: Crop, note: "A personal touch to keep." },
  "Digital Photo File": { icon: ImageIcon, note: "Your moments, always accessible." },
  "Photo Holder / Sleeve": { icon: Bookmark, note: "Keep your prints protected." },
};
import philosophyBooth from "@/assets/philosophy-booth.png.asset.json";

function Sparkle() {
  return <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden className="home-philosophy-star"><path d="M12 0c.6 6.6 4.8 11.4 12 12-7.2.6-11.4 5.4-12 12-.6-6.6-4.8-11.4-12-12 7.2-.6 11.4-5.4 12-12z" fill="currentColor" /></svg>;
}

function Souvenirs() {
  const [picked, setPicked] = useState<string[]>([]);
  const total = ADDONS.filter(a => picked.includes(a.name)).reduce((s, a) => s + a.price, 0);
  const toggle = (n: string) => setPicked(p => p.includes(n) ? p.filter(x => x !== n) : [...p, n]);
  return <>
    <div className="home-souvenirs-left">
      <svg className="home-souvenirs-orbit" viewBox="0 0 160 60" aria-hidden><path d="M2 58C30 20 80 2 140 8" fill="none" stroke="currentColor" strokeWidth="1" /><path d="M147 0c.5 4.6 3.4 7.4 8 8-4.6.6-7.5 3.4-8 8-.5-4.6-3.4-7.4-8-8 4.6-.6 7.5-3.4 8-8z" fill="currentColor" /></svg>
      <p className="home-souvenirs-eyebrow"><span aria-hidden />Photo souvenirs</p>
      <h2 className="home-souvenirs-title">Keep the moment close.</h2>
      <p className="home-souvenirs-text">Small keepsakes such as stickers and photo sleeves.</p>
      <p className="home-souvenirs-note"><Gift size={16} strokeWidth={1.5} aria-hidden /><span>The Special Edition package includes one small souvenir. Everything else here is an optional add-on.</span></p>
    </div>
    <div className="home-souvenirs-right">
      <p className="home-souvenirs-label">Optional add-ons</p>
      <ul className="home-souvenirs-list">{ADDONS.map(a => { const extra = ADDON_DETAILS[a.name]; const Icon = extra?.icon ?? Images; const on = picked.includes(a.name); return <li key={a.name}><button type="button" aria-pressed={on} onClick={() => toggle(a.name)} className="home-souvenir-row"><span className="home-souvenir-icon"><Icon size={17} strokeWidth={1.5} aria-hidden /></span><span className="home-souvenir-copy"><span className="home-souvenir-name">{a.name}</span>{extra && <span className="home-souvenir-sub">{extra.note}</span>}</span><span className="home-souvenir-price">{formatVND(a.price)}</span><span className={`home-souvenir-check${on ? " is-on" : ""}`} aria-hidden>{on && <Check size={12} strokeWidth={3} />}</span></button></li>; })}</ul>
      <p className="home-souvenirs-total" aria-live="polite">{picked.length ? <>Add-on total: <strong>{formatVND(total)}</strong></> : "Tap an add-on to see your total."}</p>
    </div>
  </>;
}
import stripSolo from "@/assets/strip-solo.png.asset.json";
import stripPair from "@/assets/strip-pair.webp.asset.json";
import stripFriends from "@/assets/strip-friends.png.asset.json";
import stripBirthday from "@/assets/strip-birthday.png.asset.json";
import { ButtonLink, Section, Wordmark } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { ADDONS, BRAND, PACKAGES, formatVND } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Memora — Little Moments, Lasting Memories" },
    { name: "description", content: "Affordable photobooth sessions, printed photo strips and keepsakes for students, couples and friends." },
    { property: "og:title", content: "Memora — Little Moments, Lasting Memories" },
    { property: "og:description", content: "Affordable photobooth sessions, printed photo strips and keepsakes." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap" },
  ] }),
  component: Index,
});

const EXPERIENCE_IMAGES = [
  { src: stripSolo.url, width: 736, height: 836, alt: "A printed black-and-white photostrip of one woman resting on cream linen fabric" },
  { src: stripPair.url, width: 736, height: 1308, alt: "A black-and-white film-style photostrip of two friends posing playfully together" },
  { src: stripFriends.url, width: 665, height: 1182, alt: "A black-and-white photostrip of four friends posing together against a white backdrop" },
  { src: stripBirthday.url, width: 1200, height: 1600, alt: "Two printed photostrips beside a birthday cupcake with lit number candles on kraft paper" },
];
const STEPS = [
  { title: "Choose your moment", text: "Pick a package for you, your date or your group.", icon: Images },
  { title: "Pose & choose a frame", text: "Step into the booth, take your photos and select an available frame. Props depend on your package.", icon: Camera },
  { title: "Keep the memories", text: "Collect your printed strips and any digital files included in your package.", icon: Printer },
];

function Index() {
  return <>
    <section className="home-cover home-editorial-cover border-b border-border">
      <div className="home-cover-content min-w-0">
        <div className="min-w-0">
          <p className="eyebrow hero-stagger" style={{ "--d": "0ms" } as CSSProperties}>Photobooth studio</p>
          <h1 className="mt-4 text-4xl leading-[1.16] sm:text-5xl md:text-[56px]"><span className="hero-stagger" style={{ "--d": "120ms" } as CSSProperties}>Little Moments,</span><br /><span className="hero-stagger italic text-primary" style={{ "--d": "240ms" } as CSSProperties}>Lasting Memories.</span></h1>
          <p className="hero-stagger mt-6 max-w-sm text-base leading-relaxed text-muted-foreground" style={{ "--d": "360ms" } as CSSProperties}>{BRAND.name} is a proposed small photobooth concept for students, couples and friend groups who want to capture memories at accessible prices.</p>
          <div className="home-cover-actions mt-7 flex flex-wrap gap-3"><span className="hero-stagger" style={{ "--d": "480ms" } as CSSProperties}><ButtonLink to="/products">Explore Packages</ButtonLink></span><span className="hero-stagger" style={{ "--d": "600ms" } as CSSProperties}><ButtonLink to="/promotions" variant="outline">View Our Promotions</ButtonLink></span></div>
          <a href="#how-it-works" className="hero-stagger mt-7 inline-flex min-h-11 items-center gap-3 font-heading text-xs font-semibold text-primary underline-offset-4 hover:underline" style={{ "--d": "720ms" } as CSSProperties}>How It Works <ArrowDown size={15} aria-hidden /></a>
        </div>
      </div>
      <img src={heroBooth.url} alt="Wooden Memora photobooth with rounded corners, cream curtains and a black seat" width={871} height={808} className="hero-photo" fetchPriority="high" />
    </section>

    <Section>
      <Reveal className="home-story grid items-center gap-10 md:grid-cols-[1.35fr_1fr] md:gap-16">
        <div className="home-image-reveal"><img src={photostripDesign.url} alt="Memora photostrip design with three blank photo slots, flower, safety pin, heart and kiss-mark stickers and the words Endless Moments" width={736} height={920} loading="lazy" className="mx-auto block h-auto w-full max-w-[500px]" /></div>
        <div className="home-story-copy border-t border-border pt-6"><p className="eyebrow">The Memora story</p><h2 className="mt-4 text-3xl leading-tight md:text-4xl">A little moment.<br /><span className="italic text-primary">Something to keep.</span></h2><p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">The spontaneous smiles, the silly poses, the people beside you. Memora brings those little moments together in printed photostrips — small memories you can hold onto.</p><Link to="/about" className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-primary font-heading text-sm font-semibold text-primary">Our story <ArrowUpRight size={16} aria-hidden /></Link></div>
      </Reveal>
    </Section>

    <div className="border-y border-border bg-secondary/30"><Section>
      <Reveal><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">Photo experiences</p><h2 className="mt-3 text-3xl md:text-4xl">Your people. Your moment.</h2></div><ButtonLink to="/products" variant="outline">See what's included</ButtonLink></div></Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{PACKAGES.map((pkg, i) => { const photo = EXPERIENCE_IMAGES[i]; return <Reveal key={pkg.name}><article className="home-package experience-card flex h-full flex-col overflow-hidden rounded-md border border-border bg-card"><div className="relative aspect-[4/5] overflow-hidden">{photo && <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" className="h-full w-full object-contain" />}{pkg.tag && <span className="absolute bottom-3 left-3 bg-card px-3 py-2 font-heading text-xs font-semibold text-primary">{pkg.tag}</span>}</div><div className="flex flex-1 flex-col p-5"><h3 className="text-base font-semibold">{pkg.name}</h3><p className="mt-2 min-h-10 text-sm text-muted-foreground">{pkg.audience}</p><p className="mt-auto pt-5 font-display text-xl text-primary"><span className="block border-t border-border pt-4">{formatVND(pkg.price)}</span></p></div></article></Reveal>; })}</div>
    </Section></div>

    <section className="home-philosophy">
      <Reveal className="home-philosophy-copy">
        <p className="home-philosophy-eyebrow"><span>The Memora</span> <span className="text-accent">Philosophy</span></p>
        <h2 className="home-philosophy-title">A moment<br /><span className="italic">worth keeping.</span></h2>
        <p className="home-philosophy-text">Some moments may last only a second, but the memories they create deserve a lifetime. At Memora, we turn fleeting moments into timeless keepsakes.</p>
        <div className="home-philosophy-values" aria-label="Capture, keep, remember">
          <span className="home-philosophy-line" aria-hidden />
          {["Capture", "Keep", "Remember"].map((word, i) => <span key={word} className="home-philosophy-value">{i > 0 && <span className="home-philosophy-sep" aria-hidden />}<Sparkle /> {word}</span>)}
          <span className="home-philosophy-line" aria-hidden />
        </div>
      </Reveal>
      <Reveal className="home-philosophy-art"><img src={philosophyBooth.url} alt="Illustration of a vintage PHOTOS booth with a wood-grain panel, black curtain and stool, framed by soft arcs and sparkles" width={940} height={930} loading="lazy" /></Reveal>
    </section>

    <section id="how-it-works" className="scroll-mt-24 border-y border-border bg-card"><Section>
      <Reveal><p className="eyebrow">How it works</p><h2 className="mt-3 text-3xl md:text-4xl">From a pose to a keepsake.</h2></Reveal>
      <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">{STEPS.map((step, i) => <li key={step.title}><Reveal className="border-t border-border pt-6"><div className="flex items-center justify-between text-primary"><span className="font-display text-4xl">0{i + 1}</span><step.icon size={26} strokeWidth={1.25} aria-hidden /></div><h3 className="mt-7 text-base font-semibold">{step.title}</h3><p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{step.text}</p></Reveal></li>)}</ol>
    </Section></section>

    <section className="home-souvenirs-wrap"><Reveal className="home-souvenirs"><Souvenirs /></Reveal></section>

    <section className="border-t border-border bg-secondary/40"><Section className="text-center"><Reveal><Wordmark className="mx-auto mb-7 h-16 w-auto" /><p className="eyebrow">Make a memory</p><h2 className="mx-auto mt-4 max-w-2xl text-3xl leading-tight md:text-5xl">Your Moments Deserve<br />to Be <span className="italic text-primary">Remembered.</span></h2><p className="mt-5 text-muted-foreground">Find the package that suits your moment.</p><div className="mt-8"><ButtonLink to="/products">Explore Packages</ButtonLink></div></Reveal></Section></section>
  </>;
}
