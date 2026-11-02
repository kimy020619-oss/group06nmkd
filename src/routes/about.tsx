import { createFileRoute } from "@tanstack/react-router";
import { ButtonLink } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    links: [{ rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap" }],
    meta: [
      { title: "About Us — Memora Photobooth" },
      { name: "description", content: "The vision, mission and values behind the Memora photobooth concept." },
      { property: "og:title", content: "About Us — Memora Photobooth" },
      { property: "og:description", content: "The vision, mission and values behind Memora." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const VALUES = ["Accessibility", "Creativity", "Connection", "Personalization", "Customer care"];

const HEART = "M0 3.2C-1.6 1.6-3.4 0.4-3.4-1.4C-3.4-2.6-2.5-3.4-1.5-3.4C-0.8-3.4-0.3-3-0 -2.4C0.3-3 0.8-3.4 1.5-3.4C2.5-3.4 3.4-2.6 3.4-1.4C3.4 0.4 1.6 1.6 0 3.2Z";

function Strip({ x, y, rotate }: { x: number; y: number; rotate: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate} 36 106)`}>
      <rect width="72" height="212" className="about-strip-body" />
      {[8, 69, 130].map((fy, i) => (
        <g key={fy}>
          <rect x={8 + (i % 2) * 1} y={fy} width="55" height="55" transform={`rotate(${i % 2 ? 2 : -2} ${35.5} ${fy + 27.5})`} className="about-strip-line" />
          <path d={HEART} transform={`translate(${36} ${fy + 27.5}) scale(1.35)`} className="about-strip-line" />
        </g>
      ))}
      <text x="36" y="202" textAnchor="middle" className="about-strip-script">Memora</text>
    </g>
  );
}

function StripsArt() {
  return (
    <svg viewBox="0 0 180 250" role="img" aria-label="Two Memora photostrips with heart frames" className="about-strips-art mx-auto block h-auto w-full">
      <Strip x={10} y={14} rotate={-6} />
      <Strip x={88} y={30} rotate={6} />
    </svg>
  );
}

function ValueTicket({ label }: { label: string }) {
  return (
    <li className="value-ticket">
      <svg viewBox="0 0 200 50" preserveAspectRatio="none" aria-hidden="true" className="value-ticket-shape">
        <path className="value-ticket-fill" d="M6 0H194A6 6 0 0 0 200 6V18A7 7 0 0 0 200 32V44A6 6 0 0 0 194 50H6A6 6 0 0 0 0 44V32A7 7 0 0 0 0 18V6A6 6 0 0 0 6 0Z" />
        <path className="value-ticket-line" d="M8.5 3H191.5A9 9 0 0 0 197 8.5V15.5A10 10 0 0 0 197 34.5V41.5A9 9 0 0 0 191.5 47H8.5A9 9 0 0 0 3 41.5V34.5A10 10 0 0 0 3 15.5V8.5A9 9 0 0 0 8.5 3Z" />
        <line className="value-ticket-line value-ticket-perf" x1="152" y1="3" x2="152" y2="47" />
        <path className="value-ticket-spark" d="M17 21L18 24L21 25L18 26L17 29L16 26L13 25L16 24Z" />
        <path className="value-ticket-spark" d="M183 21L184 24L187 25L184 26L183 29L182 26L179 25L182 24Z" />
      </svg>
      <span className="value-ticket-label">{label}</span>
    </li>
  );
}

function About() {
  return (
    <>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-[1340px] px-5 pb-16 pt-14 md:px-8 md:pt-20">
          <div className="grid items-center gap-8 md:grid-cols-[1.05fr_1fr]">
            <div>
              <p className="eyebrow about-eyebrow">About us</p>
              <h1 className="page-title-display mt-3 max-w-2xl text-4xl font-bold leading-[1.08] md:text-6xl">A small booth for the moments you share</h1>
              <p className="mt-5 max-w-[480px] text-base leading-relaxed text-muted-foreground md:text-lg">Memora is a proposed photobooth concept built around affordable self-expression, shared memories and a welcoming space for young people to simply be themselves.</p>
            </div>
            <div className="mx-auto w-full max-w-[270px]">
              <StripsArt />
            </div>
          </div>
          <div className="about-vision-grid mt-12 grid gap-4 md:grid-cols-2">
            {[
              ["01", "Vision", "To become a memorable, approachable photobooth choice for young people who want to celebrate everyday moments and special occasions."],
              ["02", "Mission", "To provide an enjoyable and accessible photo experience with attractive printed photo strips, flexible package options, and thoughtful keepsakes."],
            ].map(([n, label, text]) => (
              <div key={n} className="about-card rounded-2xl bg-card">
                <p className="about-card-num" aria-hidden="true">{n}</p>
                <span className="about-card-rule" aria-hidden="true" />
                <p className="eyebrow about-eyebrow mt-3">{label}</p>
                <p className="mt-2 text-sm leading-snug md:text-[15px]">{text}</p>
              </div>
            ))}
          </div>
          <p className="eyebrow about-eyebrow mt-12">Core values</p>
          <ul className="mt-5 flex flex-wrap gap-x-10 gap-y-5">
            {VALUES.map((v) => (
              <ValueTicket key={v} label={v} />
            ))}
          </ul>
        </div>
      </section>
      <section className="about-approach">
        <div className="about-approach-card">
          <span className="about-approach-dot" aria-hidden="true" />
          <h2 className="text-4xl font-bold md:text-5xl">Our approach</h2>
          <p className="mx-auto mt-5 max-w-[480px] text-[15px] leading-relaxed text-muted-foreground">Themed frames give each strip a personal touch. Package choices are kept simple so it's easy to pick. Photo props are there to help everyone loosen up, and souvenirs are optional extras for those who want something more to take home.</p>
          <div className="mt-8"><ButtonLink to="/products">View Products</ButtonLink></div>
        </div>
      </section>
    </>
  );
}
