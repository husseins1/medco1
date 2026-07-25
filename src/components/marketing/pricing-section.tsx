import Link from "next/link";
import { BadgeCheck, Check } from "lucide-react";

import { landingContent } from "@/lib/i18n/landing";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { SectionHeader } from "./section-header";

export function PricingSection() {
  const { pricing } = landingContent;

  return (
    <section
      id="pricing"
      className="scroll-mt-20 bg-muted/40 py-16 lg:py-24"
      aria-labelledby="pricing-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          badge={pricing.badge}
          title={pricing.title}
          id="pricing-title"
        />

        <div className="grid items-stretch gap-6 pt-3 lg:grid-cols-3">
          {pricing.plans.map((plan) => (
            <div key={plan.name} className="relative">
              {plan.highlight && (
                <span className="absolute -top-3 start-1/2 z-10 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-xs font-bold whitespace-nowrap text-brand-foreground">
                  {pricing.recommendedBadge}
                </span>
              )}
              <Card
                className={cn(
                  "h-full bg-background",
                  plan.highlight && "ring-2 ring-brand shadow-lg"
                )}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-extrabold">
                    {plan.name}
                  </CardTitle>
                  <CardDescription>{plan.audience}</CardDescription>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-foreground">
                      {plan.price ?? pricing.freePrice}
                    </span>
                    {plan.price && (
                      <span className="text-sm text-muted-foreground">
                        {pricing.currency} {pricing.period}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="mb-6 flex-1 space-y-2.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <Check
                          className="size-4 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={plan.highlight ? "default" : "outline"}
                    className={cn(
                      "w-full",
                      plan.highlight &&
                        "bg-brand text-brand-foreground hover:bg-brand/90"
                    )}
                  >
                    <Link href="/signup">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-sm font-semibold text-muted-foreground">
            {pricing.trustLabel}
          </p>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {pricing.trustSignals.map((signal) => (
              <li
                key={signal}
                className="flex items-center gap-1.5 text-sm font-medium text-foreground"
              >
                <BadgeCheck className="size-4 text-brand" aria-hidden="true" />
                {signal}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
