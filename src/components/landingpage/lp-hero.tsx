import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

import { landingContent } from "@/lib/i18n/landing";
import { Button } from "@/components/ui/Button";

/** Shared ECG sweep path — pathLength=100 matches the .pulse-line dash trick. */
const PULSE_PATH =
  "M0 20 H180 L200 20 210 6 222 34 232 20 H260 L268 14 276 26 284 20 H600";

/**
 * Centered typographic hero: staggered CSS entrance, hand-drawn brand
 * underline, floating phone mockup on a fading dot grid, ECG sweep.
 */
export function LpHero() {
  const { hero } = landingContent;

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="lp-hero-title"
    >
      {/* Fading dot-grid backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [background-image:radial-gradient(var(--border)_1.5px,transparent_1.5px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,black,transparent)]"
      />

      <div className="flex flex-col lg:flex-row lg:max-w-5xl items-center mx-auto">
        <div className="mx-auto lg:text-right  max-w-4xl px-4 pt-16 text-center sm:px-6 sm:pt-24">
          <span className="inline-flex items-center rounded-full border border-brand/25 bg-brand/5 px-4 py-1.5 text-sm font-semibold text-brand">
            {hero.badge}
          </span>
          <h1
            id="lp-hero-title"
            className="mt-6 text-5xl font-extrabold leading-[1.15] tracking-tight text-balance text-foreground sm:text-6xl lg:text-7xl"
          >
            <span className="relative inline-block px-1">
              {hero.titleAccent}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                className="lp-squiggle absolute -bottom-2 start-0 h-3 w-full"
              >
                <path
                  d="M3 9 C 55 3, 145 3, 197 8"
                  fill="none"
                  stroke="var(--brand)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            {hero.titleRest}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {hero.subtitle}
          </p>
          <div className="mt-9 lg:justify-start flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              asChild
              className="h-12 rounded-full bg-brand px-7 text-base text-brand-foreground hover:bg-brand/90"
            >
              <Link href="/signup">{hero.primaryCta}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 rounded-full px-7 text-base"
            >
              <a href="#how-it-works">
                {hero.secondaryCta}
                <ArrowLeft aria-hidden="true" />
              </a>
            </Button>
          </div>
          <ul className="mt-8 flex lg:justify-start flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {hero.trustBadges.map((badge) => (
              <li
                key={badge}
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground"
              >
                <Check className="size-4 text-brand" aria-hidden="true" />
                {badge}
              </li>
            ))}
          </ul>
        </div>
        {/* Floating phone mockup — no entrance animation (image is LCP target) */}
        <div className="mx-auto mt-14 w-full max-w-[240px] sm:max-w-[480px]">
          <div className="lp-float relative before:pointer-events-none before:absolute before:inset-0 before:z-10">
            <Image
              src="/hero-img.webp"
              alt={hero.imageAlt}
              width={384}
              height={832}
              sizes="(max-width: 640px) 240px, 480px"
              className="h-auto w-full drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* ECG pulse sweep across the hero's bottom edge */}
      <svg
        aria-hidden="true"
        viewBox="0 0 600 40"
        preserveAspectRatio="none"
        className="mt-8 h-10 w-full"
      >
        <path
          d={PULSE_PATH}
          fill="none"
          pathLength={100}
          className="pulse-line pulse-line-brand"
        />
      </svg>
    </section>
  );
}
