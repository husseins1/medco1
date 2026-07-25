import { TrendingDown } from "lucide-react";

import { landingContent } from "@/lib/i18n/landing";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { SectionHeader } from "./section-header";

export function PainSection() {
  const { pain } = landingContent;

  return (
    <section className="bg-muted/40 py-16 lg:py-24" aria-labelledby="pain-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader badge={pain.badge} title={pain.title} id="pain-title" />

        <div className="grid gap-6 md:grid-cols-3">
          {pain.items.map((item) => (
            <Card key={item.title} className="bg-background">
              <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-destructive/10">
                  <item.icon
                    className="size-6 text-destructive"
                    aria-hidden="true"
                  />
                </div>
                <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <blockquote
                  dir="ltr"
                  className="border-s-2 border-border ps-3 text-start text-sm italic text-muted-foreground"
                >
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center sm:flex-row sm:justify-center sm:gap-4">
          <TrendingDown
            className="size-8 shrink-0 text-destructive"
            aria-hidden="true"
          />
          <p className="text-lg font-bold text-foreground">{pain.roiCallout}</p>
        </div>
      </div>
    </section>
  );
}
