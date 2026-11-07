import { createFileRoute } from "@tanstack/react-router";
import { ButtonLink, PageHero, Section } from "@/components/SiteLayout";
import { PROMOTIONS, PROMOTION_COMBINING_RULE, BESTIE_VOUCHER_RULE } from "@/lib/site-data";
import { VoucherGame } from "@/components/VoucherGame";

export const Route = createFileRoute("/promotions")({
  head: () => ({
    meta: [
      { title: "Promotions — Memora Photobooth" },
      { name: "description", content: "Student Day, Birthday Treat and Bring Your Bestie offers at Memora." },
      { property: "og:title", content: "Promotions — Memora Photobooth" },
      { property: "og:description", content: "Proposed photobooth offers and their conditions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Promotions,
});

function Promotions() {
  return (
    <>
      <PageHero eyebrow="Proposed promotions" title="Promotions">Three simple offers for students, birthdays and friend groups.</PageHero>
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {PROMOTIONS.map((p, i) => (
            <article key={p.name} className={`rounded-xl border p-7 ${i === 1 ? "border-espresso bg-espresso text-linen" : "border-border bg-card"}`}>
              <p className={`font-heading text-xs font-semibold uppercase tracking-widest ${i === 1 ? "text-camel" : "text-primary"}`}>{p.name}</p>
              <h2 className="mt-3 text-3xl font-bold">{p.headline}</h2>
              <p className={`mt-3 ${i === 1 ? "text-khaki" : "text-muted-foreground"}`}>{p.condition}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-xl border-l-4 border-primary bg-secondary/60 p-6">
          <p className="font-heading font-bold">Promotions cannot be combined.</p>
          <p className="mt-1 text-muted-foreground">{PROMOTION_COMBINING_RULE}</p>
          <p className="mt-1 text-muted-foreground">{BESTIE_VOUCHER_RULE}</p>
        </div>
        <div className="mt-10"><ButtonLink to="/products">Explore Packages</ButtonLink></div>
      </Section>
      <VoucherGame />
    </>
  );
}
