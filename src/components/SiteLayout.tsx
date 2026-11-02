import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import markAsset from "@/assets/memora-mark.png.asset.json";
import originalLogoAsset from "@/assets/memora-logo-original.png.asset.json";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowUpRight, MapPin, PhoneCall, Mail, Clock, Instagram } from "lucide-react";
import { BRAND, CONTACT, CONTACT_LINKS, NAV } from "@/lib/site-data";

export function Wordmark({
  className = "h-12 w-auto",
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const asset = variant === "light" ? originalLogoAsset : markAsset;
  return (
    <img
      src={asset.url}
      alt={`${BRAND.name} Photobooth`}
      width={1393}
      height={variant === "light" ? 666 : 605}
      className={`block ${className}`}
    />
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const isHome = useRouterState({ select: (state) => state.location.pathname === "/" });
  return (
    <header className={`${isHome ? "home-navigation " : ""}sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link to="/" aria-label={`${BRAND.name} home`} onClick={() => setOpen(false)}>
          <Wordmark className="h-12 w-auto md:h-14" />
        </Link>
        <nav aria-label="Main" className="hidden gap-7 text-sm font-semibold md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="nav-link py-1 text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary nav-active" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Button
          variant="outline" size="icon"
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-heading font-semibold"
                  activeProps={{ className: "text-primary" }}
                  activeOptions={{ exact: true }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const rows = [
    { label: "Address", value: CONTACT.address, href: undefined, external: false, icon: MapPin },
    { label: "Hotline", value: CONTACT.hotline, href: CONTACT_LINKS.hotline, external: false, icon: PhoneCall },
    { label: "Email", value: CONTACT.email, href: CONTACT_LINKS.email, external: false, icon: Mail },
    { label: "Opening hours", value: CONTACT.hours, href: undefined, external: false, icon: Clock },
    { label: "Instagram", value: CONTACT.instagram, href: CONTACT_LINKS.instagram, external: true, icon: Instagram },
    { label: "TikTok", value: CONTACT.tiktok, href: CONTACT_LINKS.tiktok, external: true, icon: null },
  ];
  const hideContacts = useRouterState({ select: (s) => s.location.pathname === "/where-to-buy" });
  return (
    <footer className="contact-footer border-t border-border">
        {!hideContacts && <dl className="contact-reference-grid">
          {rows.map(({ label, value, href, external, icon: Icon }) => (
            <div key={label} className="contact-reference-item">
              <span className="contact-reference-icon" aria-hidden="true">
                {Icon ? <Icon strokeWidth={1.6} /> : <svg viewBox="0 0 24 24"><path fill="currentColor" d="M16.6 1c.3 2.7 1.8 4.3 4.4 4.5v4.1a10 10 0 0 1-4.4-1.2v7.5A7.1 7.1 0 1 1 10.5 9v4.2a3 3 0 1 0 2 2.8V1z" /></svg>}
              </span>
              <div className="contact-reference-copy">
              <dt>{label}</dt>
              <dd>
                {href ? (
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="underline-offset-4 transition-colors hover:text-primary hover:underline"
                  >
                    {value}
                  </a>
                ) : (
                  value
                )}
              </dd>
              </div>
            </div>
          ))}
        </dl>}
      <p className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © [Year] {BRAND.name}. Fictional class project.
      </p>
    </footer>
  );
}

export function PageHero({ eyebrow, title, children, bodyClassName = "" }: { eyebrow: string; title: string; children?: ReactNode; bodyClassName?: string }) {
  return (
    <section className="border-b border-border bg-secondary/50">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-title-display mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
        {children && <div className={`mt-4 max-w-2xl text-lg text-muted-foreground ${bodyClassName}`.trim()}>{children}</div>}
      </div>
    </section>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-6xl px-5 py-16 md:py-20 ${className}`}>{children}</section>;
}

export function ButtonLink({ to, children, variant = "primary" }: { to: (typeof NAV)[number]["to"]; children: ReactNode; variant?: "primary" | "outline" }) {
  const base = "editorial-button h-auto min-h-12 whitespace-normal rounded-md px-6 py-3 font-heading text-sm font-semibold";
  const v = variant === "primary"
    ? "bg-primary text-primary-foreground hover:bg-espresso"
    : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground";
  return <Button asChild variant={variant === "primary" ? "default" : "outline"} className={`${base} ${v}`}><Link to={to}>{children}<ArrowUpRight aria-hidden /></Link></Button>;
}
