import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

import { landingContent } from "@/lib/i18n/landing";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const { hero } = landingContent;

  return (
    <section className="overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-flex items-center rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">
            {hero.badge}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              asChild
              className="h-12 bg-brand px-6 text-base text-brand-foreground hover:bg-brand/90"
            >
              <Link href="/signup">{hero.primaryCta}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 px-6 text-base">
              <a href="#how-it-works">
                {hero.secondaryCta}
                <ArrowLeft aria-hidden="true" />
              </a>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
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

        <div className="mx-auto w-full max-w-xs sm:max-w-sm">
          <Image
            src="/hero-img.webp"
            alt={hero.imageAlt}
            width={852}
            height={1846}
            priority
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
