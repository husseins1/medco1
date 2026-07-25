import { Plus } from "lucide-react";

import { landingContent } from "@/lib/i18n/landing";

/** Editorial FAQ — native details/summary (zero JS), rotating plus icon. */
export function LpFaq() {
  const { faq } = landingContent;

  return (
    <section
      id="faq"
      className="scroll-mt-24 py-16 lg:py-24"
      aria-labelledby="lp-faq-title"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="lp-reveal text-center">
          <p className="text-sm font-bold tracking-wide text-brand">
            {faq.badge}
          </p>
          <h2
            id="lp-faq-title"
            className="mt-3 text-3xl font-extrabold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl"
          >
            {faq.title}
          </h2>
        </div>

        <div className="lp-reveal mt-12 divide-y divide-border/70 border-y border-border/70">
          {faq.items.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-bold text-foreground [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand transition-transform duration-300 group-open:rotate-45">
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
