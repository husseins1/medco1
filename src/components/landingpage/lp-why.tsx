import { landingContent } from "@/lib/i18n/landing";

/** Differentiators — compact icon rows with a brand-fill hover micro-interaction. */
export function LpWhy() {
  const { whyUs } = landingContent;

  return (
    <section
      className="scroll-mt-24 bg-muted/40 py-16 lg:py-24"
      aria-labelledby="lp-why-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="lp-reveal max-w-2xl">
          <p className="text-sm font-bold tracking-wide text-brand">
            {whyUs.badge}
          </p>
          <h2
            id="lp-why-title"
            className="mt-3 text-3xl font-extrabold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl"
          >
            {whyUs.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.items.map((item) => (
            <div key={item.title} className="lp-reveal group">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-brand-foreground">
                <item.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-extrabold text-foreground">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
