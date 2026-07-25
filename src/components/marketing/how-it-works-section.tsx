import { landingContent } from "@/lib/i18n/landing";
import { SectionHeader } from "./section-header";

export function HowItWorksSection() {
  const { howItWorks } = landingContent;

  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 bg-muted/40 py-16 lg:py-24"
      aria-labelledby="how-it-works-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          badge={howItWorks.badge}
          title={howItWorks.title}
          id="how-it-works-title"
        />

        <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
          {howItWorks.steps.map((step, index) => (
            <li key={step.title} className="relative">
              <div
                className="mb-4 flex size-12 items-center justify-center rounded-full bg-brand text-xl font-extrabold text-brand-foreground"
                aria-hidden="true"
              >
                {index + 1}
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
