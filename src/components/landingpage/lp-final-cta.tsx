import Link from "next/link";
import { ArrowLeft, BadgeCheck } from "lucide-react";

import { landingContent } from "@/lib/i18n/landing";
import { Button } from "@/components/ui/Button";

const PULSE_PATH =
  "M0 20 H180 L200 20 210 6 222 34 232 20 H260 L268 14 276 26 284 20 H600";

/** Closing brand panel — dotted texture, white ECG sweep, inverted CTA. */
export function LpFinalCta() {
  const { finalCta } = landingContent;

  return (
    <section
      className="px-4 pb-16 sm:px-6 lg:pb-24"
      aria-labelledby="lp-final-cta-title"
    >
      <div className="lp-reveal relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-brand px-6 py-16 text-center text-brand-foreground sm:py-20">
        {/* Subtle dotted texture fading toward the top */}
        <div
          aria-hidden="true"
          className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.14)_1.5px,transparent_1.5px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_100%,black,transparent)]"
        />

        <div className="relative">
          <h2
            id="lp-final-cta-title"
            className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-balance sm:text-5xl"
          >
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-foreground/85">
            {finalCta.subtitle}
          </p>

          <Button
            size="lg"
            asChild
            className="mt-9 h-12 rounded-full bg-brand-foreground px-8 text-base font-bold text-brand hover:bg-brand-foreground/90"
          >
            <Link href="/signup">
              {finalCta.cta}
              <ArrowLeft aria-hidden="true" />
            </Link>
          </Button>

          <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {finalCta.trustSignals.map((signal) => (
              <li
                key={signal}
                className="flex items-center gap-1.5 text-sm font-medium text-brand-foreground/85"
              >
                <BadgeCheck className="size-4" aria-hidden="true" />
                {signal}
              </li>
            ))}
          </ul>

          <svg
            aria-hidden="true"
            viewBox="0 0 600 40"
            preserveAspectRatio="none"
            className="mx-auto mt-10 h-8 w-full max-w-md opacity-80"
          >
            <path
              d={PULSE_PATH}
              fill="none"
              pathLength={100}
              className="pulse-line pulse-line-white"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
