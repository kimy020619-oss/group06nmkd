import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import { Button } from "@/components/ui/button";
import { Instagram, Mail, MapPin, PhoneCall } from "lucide-react";
import { Section } from "@/components/SiteLayout";
import { CONTACT, CONTACT_LINKS } from "@/lib/site-data";

export const Route = createFileRoute("/where-to-buy")({
  head: () => ({
    meta: [
      { title: "Where to Buy — Memora Photobooth" },
      { name: "description", content: "How to visit, contact or follow the Memora photobooth." },
      { property: "og:title", content: "Where to Buy — Memora Photobooth" },
      { property: "og:description", content: "How to visit, contact or follow Memora." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WhereToBuy,
});

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`;
const OPEN_HOUR = 10;
const CLOSE_HOUR = 22;

const handle = (url: string) => {
  const last = url.replace(/\/+$/, "").split("/").pop() ?? url;
  return last.startsWith("@") ? last : `@${last}`;
};

type IconProps = { className?: string };

function TikTokIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.6 1c.3 2.7 1.8 4.3 4.4 4.5v4.1a10 10 0 0 1-4.4-1.2v7.5A7.1 7.1 0 1 1 10.5 9v4.2a3 3 0 1 0 2 2.8V1z"
      />
    </svg>
  );
}

type Row = { label: string; value: string; href?: string; icon: ComponentType<IconProps> };

function WhereToBuy() {
  const ways: Row[] = [
    { label: "Visit the studio", value: CONTACT.address, icon: MapPin },
    { label: "Call the hotline", value: CONTACT.hotline, href: CONTACT_LINKS.hotline, icon: PhoneCall },
    { label: "Send an email", value: CONTACT.email, href: CONTACT_LINKS.email, icon: Mail },
  ];
  const socials: Row[] = [
    { label: "Instagram", value: handle(CONTACT.instagram), href: CONTACT_LINKS.instagram, icon: Instagram },
    { label: "TikTok", value: handle(CONTACT.tiktok), href: CONTACT_LINKS.tiktok, icon: TikTokIcon },
  ];
  const [openNow, setOpenNow] = useState<boolean | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    setOpenNow(hour >= OPEN_HOUR && hour < CLOSE_HOUR);
  }, []);

  return (
    <>
      <section className="border-b border-border bg-secondary/50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="eyebrow">Where to buy</p>
            <h1 className="page-title-display mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">Find us &amp; say hello</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Ways to visit, contact or follow Memora — tap any detail to reach us directly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="editorial-button h-auto min-h-12 rounded-full px-6 py-3 font-heading text-sm font-semibold"
              >
                <a href={CONTACT_LINKS.hotline}>
                  <PhoneCall aria-hidden />
                  Call the hotline
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="editorial-button h-auto min-h-12 rounded-full border-primary px-6 py-3 font-heading text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                  <MapPin aria-hidden />
                  Get directions
                </a>
              </Button>
            </div>
          </div>
          <div className="rounded-xl bg-espresso p-6 text-linen">
            <p className="eyebrow text-khaki">Opening hours</p>
            <p className="mt-2 text-2xl font-bold">{CONTACT.hours}</p>
            {openNow !== null && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-linen/15 px-3 py-1 text-xs text-khaki">
                <span className="h-2 w-2 rounded-full bg-khaki" aria-hidden="true" />
                {openNow ? "Open now. Closes at 10 p.m." : "Closed now. Opens at 10 a.m."}
              </p>
            )}
            <p className="mt-4 text-sm text-khaki">{CONTACT.address}</p>
          </div>
        </div>
      </section>

      <Section className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">Visit or contact</h2>
          <dl className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {ways.map(({ label, value, href, icon: Icon }) => (
              <div key={label} className="flex items-start gap-4 p-5">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary/50 text-primary"
                  aria-hidden="true"
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <dt className="eyebrow">{label}</dt>
                  <dd className="mt-1 break-words">
                    {href ? (
                      <a href={href} className="underline-offset-4 transition-colors hover:text-primary hover:underline">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Follow along</h2>
          <dl className="mt-6 space-y-4">
            {socials.map(({ label, value, href, icon: Icon }) => (
              <div key={label} className="flex items-center gap-4 rounded-xl border border-border bg-secondary/50 p-5">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary"
                  aria-hidden="true"
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <dt className="eyebrow">{label}</dt>
                  <dd className="mt-1 break-words">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 transition-colors hover:text-primary hover:underline"
                    >
                      {value}
                    </a>
                  </dd>
                </div>
              </div>
            ))}
          </dl>
          <div className="mt-8 rounded-xl border border-dashed border-border bg-card p-6">
            <p className="font-display text-xl">Have a question?</p>
            <p className="mt-2 text-muted-foreground">
              Reach us at{" "}
              <a href={CONTACT_LINKS.hotline} className="underline underline-offset-4 hover:text-primary">
                {CONTACT.hotline}
              </a>{" "}
              or{" "}
              <a href={CONTACT_LINKS.email} className="underline underline-offset-4 hover:text-primary">
                {CONTACT.email}
              </a>
              . This site does not send messages on your behalf.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
