import { Plus } from "lucide-react";

import { landingContent } from "@/lib/i18n/landing";

/**
 * Infinite keyword ticker (pure CSS). The track renders the list twice;
 * the keyframe loop translates it +50% which loops seamlessly in RTL.
 * Decorative — hidden from assistive tech.
 */
export function LpMarquee() {
  const { items } = landingContent.marquee;

  return (
    <section
      aria-hidden="true"
      className="overflow-hidden border-y border-border/60 py-5"
    >
      <div className="lp-marquee-track flex w-max items-center gap-10">
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-10 whitespace-nowrap text-base font-bold text-muted-foreground"
          >
            {item}
            <Plus className="size-4 text-brand" aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  );
}
