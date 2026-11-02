import { createFileRoute } from "@tanstack/react-router";
import { ButtonLink, PageHero, Section } from "@/components/SiteLayout";
import { PackageCard } from "@/components/PackageCard";
import { ADDONS, PACKAGES, formatVND } from "@/lib/site-data";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products & Services — Memora Photobooth" },
      { name: "description", content: "Four photobooth packages and optional add-ons, with exactly what's included." },
      { property: "og:title", content: "Products & Services — Memora Photobooth" },
      { property: "og:description", content: "Four photobooth packages and optional add-ons." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Products,
});

function Products() {
  return (
    <>
      <PageHero eyebrow="Products & services" title="Photo packages" bodyClassName="page-hero-lede-full">
        Each package is one photo session. Inclusions are listed exactly — nothing unlimited, no retouching.
      </PageHero>
      <section className="package-reference-section" aria-label="Photo packages">
        <div className="package-reference-grid">
          {PACKAGES.map((p) => <PackageCard key={p.name} pkg={p} reference />)}
        </div>
      </section>
      <div className="bg-secondary/50">
        <Section>
          <h2 className="text-3xl font-bold">Optional add-ons</h2>
          <p className="mt-2 text-muted-foreground">Purchased separately, unless the item is already included in your package.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ADDONS.map((a) => (
              <div key={a.name} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold">{a.name}</h3>
                <p className="mt-2 font-semibold text-primary">{formatVND(a.price)}</p>
              </div>
            ))}
          </div>
          
        </Section>
      </div>
    </>
  );
}
