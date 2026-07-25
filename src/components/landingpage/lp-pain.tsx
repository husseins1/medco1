import { Quote, TrendingDown } from "lucide-react";

import { landingContent } from "@/lib/i18n/landing";

/** Editorial pain cards — oversized quote glyph, research verbatim, ROI stat. */
export function LpPain() {
  const { pain } = landingContent;

  return (
    <section
      className="scroll-mt-24 py-16 lg:py-24"
      aria-labelledby="lp-pain-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="lp-reveal max-w-2xl">
          <p className="text-sm font-bold tracking-wide text-destructive">
            {pain.badge}
          </p>
          <h2
            id="lp-pain-title"
            className="mt-3 text-3xl font-extrabold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl"
          >
            {pain.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pain.items.map((item) => (
            <figure
              key={item.title}
              className="lp-reveal flex flex-col rounded-2xl border border-border/70 bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-destructive/30 hover:shadow-lg"
            >
              <Quote
                className="size-8 text-destructive/30"
                aria-hidden="true"
              />
              <blockquote className="mt-4 flex-1">
                <p className="text-lg font-bold leading-relaxed text-foreground">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </blockquote>
              <figcaption
                dir="ltr"
                lang="en"
                className="mt-5 border-t border-dashed border-border pt-4 text-xs leading-relaxed text-muted-foreground"
              >
                &ldquo;{item.quote}&rdquo;
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="lp-reveal mt-10 flex items-center justify-center gap-3 rounded-2xl bg-destructive/5 px-6 py-5 text-center">
          <TrendingDown
            className="size-6 shrink-0 text-destructive"
            aria-hidden="true"
          />
          <p className="text-lg font-extrabold text-foreground sm:text-xl">
            {pain.roiCallout}
          </p>
        </div>
      </div>
    </section>
  );
}
