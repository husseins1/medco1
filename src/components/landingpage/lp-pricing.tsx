"use client";

import { useState } from "react";
import Link from "next/link";
import { BadgeCheck, Check } from "lucide-react";

import { landingContent } from "@/lib/i18n/landing";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type BillingPeriod = "monthly" | "yearly";

export function LpPricing() {
  const { pricing } = landingContent;
  const [billing, setBilling] = useState<BillingPeriod>("monthly");

  return (
    <section
      id="pricing"
      className="scroll-mt-24 py-16 lg:py-24"
      aria-labelledby="lp-pricing-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="lp-reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold tracking-wide text-brand">
            {pricing.badge}
          </p>
          <h2
            id="lp-pricing-title"
            className="mt-3 text-3xl font-extrabold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl"
          >
            {pricing.title}
          </h2>

          {/* Billing toggle */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="inline-flex rounded-full border border-border bg-muted p-1">
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={cn(
                  "rounded-full px-5 py-1.5 text-sm font-semibold transition-all",
                  billing === "monthly"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {pricing.billingToggle.monthly}
              </button>
              <button
                type="button"
                onClick={() => setBilling("yearly")}
                className={cn(
                  "rounded-full px-5 py-1.5 text-sm font-semibold transition-all",
                  billing === "yearly"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {pricing.billingToggle.yearly}
              </button>
            </div>
            {pricing.yearlySave && (
              <span className="text-sm font-bold text-emerald-600">
                {pricing.yearlySave}
              </span>
            )}
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pricing.plans.map((plan) => {
            const isYearly = billing === "yearly" && !!plan.yearlyPrice;
            const isFree = !plan.price;

            return (
              <div
                key={plan.name}
                className={cn(
                  "lp-reveal relative flex flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1",
                  plan.highlight
                    ? "border-brand bg-brand text-brand-foreground shadow-xl"
                    : "border-border/70 bg-background hover:border-brand/40 hover:shadow-lg"
                )}
              >
                {plan.highlight && (
                  <span className="absolute -top-3.5 start-1/2 -translate-x-1/2 rounded-full bg-foreground px-4 py-1 text-xs font-bold whitespace-nowrap text-background">
                    {pricing.recommendedBadge}
                  </span>
                )}

                <h3 className="text-xl font-extrabold">{plan.name}</h3>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    plan.highlight
                      ? "text-brand-foreground/80"
                      : "text-muted-foreground"
                  )}
                >
                  {plan.audience}
                </p>

                <div className="mt-5 flex items-baseline gap-2">
                  {isFree ? (
                    <span className="text-5xl font-extrabold tracking-tight">
                      {pricing.freePrice}
                    </span>
                  ) : isYearly ? (
                    <>
                      <span className="text-5xl font-extrabold tracking-tight">
                        {plan.price}
                      </span>
                      <span
                        className={cn(
                          "text-sm",
                          plan.highlight
                            ? "text-brand-foreground/80"
                            : "text-muted-foreground"
                        )}
                      >
                        {pricing.currency} {pricing.yearlyPerMonth}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-5xl font-extrabold tracking-tight">
                        {plan.price}
                      </span>
                      <span
                        className={cn(
                          "text-sm",
                          plan.highlight
                            ? "text-brand-foreground/80"
                            : "text-muted-foreground"
                        )}
                      >
                        {pricing.currency} {pricing.period}
                      </span>
                    </>
                  )}
                </div>

                {isYearly && (
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-bold",
                        plan.highlight
                          ? "bg-brand-foreground/20 text-brand-foreground"
                          : "bg-emerald-100 text-emerald-700"
                      )}
                    >
                      {pricing.yearlySave}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-semibold ",
                        plan.highlight
                          ? "text-brand-foreground/60"
                          : "text-muted-foreground"
                      )}
                    >
                      {plan.yearlyPrice} {pricing.currency}{" "}
                      {pricing.yearlyPeriod}
                    </span>
                  </div>
                )}

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <Check
                        className={cn(
                          "size-4 shrink-0",
                          plan.highlight
                            ? "text-brand-foreground"
                            : "text-brand"
                        )}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={plan.highlight ? "secondary" : "outline"}
                  className={cn(
                    "mt-8 h-11 w-full rounded-full",
                    plan.highlight &&
                      "bg-brand-foreground text-brand hover:bg-brand-foreground/90"
                  )}
                >
                  <Link href="/signup">{plan.cta}</Link>
                </Button>
              </div>
            );
          })}
        </div>

        <div className="lp-reveal mt-12 text-center">
          <p className="mb-4 text-sm font-semibold text-muted-foreground">
            {pricing.trustLabel}
          </p>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {pricing.trustSignals.map((signal) => (
              <li
                key={signal}
                className="flex items-center gap-1.5 text-sm font-medium text-foreground"
              >
                <BadgeCheck
                  className="size-4 text-brand"
                  aria-hidden="true"
                />
                {signal}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
