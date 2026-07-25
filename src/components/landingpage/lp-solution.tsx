import { landingContent } from "@/lib/i18n/landing";

/** Numbered editorial rows — ghost numerals that light up brand on hover. */
export function LpSolution() {
  const { solution } = landingContent;

  return (
    <section
      className="scroll-mt-24 bg-muted/40 py-16 lg:py-24"
      aria-labelledby="lp-solution-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="lp-reveal max-w-2xl">
          <p className="text-sm font-bold tracking-wide text-brand">
            {solution.badge}
          </p>
          <h2
            id="lp-solution-title"
            className="mt-3 text-3xl font-extrabold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl"
          >
            {solution.title}
          </h2>
        </div>

        <ol className="mt-10">
          {solution.items.map((item, index) => (
            <li
              key={item.title}
              className="lp-reveal group flex items-start gap-5 border-t border-border/70 py-7 transition-colors last:border-b hover:bg-brand/5 sm:gap-8 sm:px-4"
            >
              <span
                aria-hidden="true"
                className="w-14 shrink-0 text-5xl font-extrabold leading-none text-brand/20 transition-colors duration-300 group-hover:text-brand sm:text-6xl"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="flex items-center gap-2 text-xl font-extrabold text-foreground sm:text-2xl">
                  <item.icon
                    className="size-5 shrink-0 text-brand sm:size-6"
                    aria-hidden="true"
                  />
                  {item.title}
                </h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
