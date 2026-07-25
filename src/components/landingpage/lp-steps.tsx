import { landingContent } from "@/lib/i18n/landing";

/** 3-step setup — circled numerals joined by a dashed connector on desktop. */
export function LpSteps() {
  const { howItWorks } = landingContent;

  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 py-16 lg:py-24"
      aria-labelledby="lp-steps-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="lp-reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold tracking-wide text-brand">
            {howItWorks.badge}
          </p>
          <h2
            id="lp-steps-title"
            className="mt-3 text-3xl font-extrabold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl"
          >
            {howItWorks.title}
          </h2>
        </div>

        <ol className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Dashed connector behind the circles (desktop only) */}
          <div
            aria-hidden="true"
            className="absolute top-6 hidden w-full border-t-2 border-dashed border-border md:block"
          />
          {howItWorks.steps.map((step, index) => (
            <li
              key={step.title}
              className="lp-reveal relative flex flex-col items-center text-center"
            >
              <span className="relative z-10 flex size-12 items-center justify-center rounded-full bg-brand text-lg font-extrabold text-brand-foreground shadow-md">
                {index + 1}
              </span>
              <h3 className="mt-5 text-xl font-extrabold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
