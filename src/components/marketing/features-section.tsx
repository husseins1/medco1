import { landingContent } from "@/lib/i18n/landing";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { SectionHeader } from "./section-header";

export function FeaturesSection() {
  const { features } = landingContent;

  return (
    <section
      id="features"
      className="scroll-mt-20 py-16 lg:py-24"
      aria-labelledby="features-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          badge={features.badge}
          title={features.title}
          id="features-title"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.items.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-brand/10">
                  <item.icon className="size-6 text-brand" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
                <p
                  dir="ltr"
                  className="text-start text-xs font-medium text-muted-foreground/70 italic"
                >
                  &ldquo;{item.jtbd}&rdquo;
                </p>
                <CardDescription className="leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
