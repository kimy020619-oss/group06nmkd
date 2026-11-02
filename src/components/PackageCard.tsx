import { formatVND, type Package } from "@/lib/site-data";

export function PackageCard({ pkg, compact = false, reference = false }: { pkg: Package; compact?: boolean; reference?: boolean }) {
  return (
    <article className={reference ? `package-reference-card${pkg.tag ? " package-reference-card--featured" : ""}` : "relative flex h-full flex-col rounded-xl border border-border bg-card p-6"}>
      {pkg.tag && (
        <span className={reference ? "package-reference-tag" : "absolute -top-3 left-6 rounded-md bg-accent px-2.5 py-1 font-heading text-[11px] font-semibold uppercase tracking-wider text-espresso"}>
          {pkg.tag}
        </span>
      )}
      <h3 className={reference ? "package-reference-name" : "text-lg font-bold"}>{pkg.name}</h3>
      <p className={reference ? `package-reference-audience${pkg.name === "Basic Package" ? " package-reference-italic" : ""}` : "mt-1 text-sm text-muted-foreground"}>{pkg.audience}</p>
      <p className={reference ? "package-reference-price" : "mt-4 text-2xl font-semibold text-primary"}>{formatVND(pkg.price)}</p>
      {!compact && (
        <>
          <ul className={reference ? "package-reference-includes" : "mt-5 space-y-2 text-sm"}>
            {pkg.includes.map((i) => (
              <li key={i} className={reference ? "package-reference-item" : "flex gap-2"}>
                <span aria-hidden className={reference ? "package-reference-star" : "text-camel"}>✦</span>
                <span>{i}</span>
              </li>
            ))}
          </ul>
          {pkg.note && <p className={reference ? "package-reference-note" : "mt-auto pt-5 text-xs text-muted-foreground"}>{pkg.note}</p>}
        </>
      )}
    </article>
  );
}
