import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, Info, TriangleAlert, CircleCheck } from "lucide-react";
import type { HelpTopic } from "@/lib/help/types";
import { getHelpTopic, helpTopics } from "@/lib/help/topics";
import { TopicMock } from "@/components/help/mocks";
import { cn } from "@/lib/utils";

function CalloutIcon({ tone }: { tone: "info" | "warning" | "success" }) {
  if (tone === "warning") return <TriangleAlert className="size-4 shrink-0" />;
  if (tone === "success") return <CircleCheck className="size-4 shrink-0" />;
  return <Info className="size-4 shrink-0" />;
}

const CALLOUT_STYLES: Record<string, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

interface HelpTopicViewProps {
  topic: HelpTopic;
}

export function HelpTopicView({ topic }: HelpTopicViewProps) {
  const index = helpTopics.findIndex((t) => t.slug === topic.slug);
  const prev = index > 0 ? helpTopics[index - 1] : undefined;
  const next = index >= 0 && index < helpTopics.length - 1 ? helpTopics[index + 1] : undefined;
  const Icon = topic.icon;

  return (
    <article className="space-y-8">
      {/* Header */}
      <header className="space-y-3">
        <nav aria-label="مسار التنقل" className="text-sm text-muted-foreground">
          <Link href="/help" className="hover:text-foreground transition-colors">
            مركز المساعدة
          </Link>
          <span aria-hidden="true" className="mx-1.5">
            /
          </span>
          <span className="text-foreground">{topic.title}</span>
        </nav>

        <div className="flex items-start gap-4">
          <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Icon className="size-5" />
          </div>
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              {topic.title}
            </h1>
            <p className="text-muted-foreground max-w-2xl">{topic.description}</p>
          </div>
        </div>
      </header>

      {/* Purpose illustration */}
      <div
        data-help-mock={topic.slug}
        className="rounded-2xl border border-border bg-muted/30 p-5 sm:p-7"
      >
        <TopicMock slug={topic.slug} />
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {topic.sections.map((section, idx) => {
          if (section.kind === "paragraph") {
            return (
              <section key={idx} className="space-y-2">
                {section.title && (
                  <h2 className="text-lg font-bold text-foreground">
                    {section.title}
                  </h2>
                )}
                <p className="leading-relaxed text-muted-foreground">
                  {section.body}
                </p>
              </section>
            );
          }

          if (section.kind === "steps") {
            return (
              <section key={idx} className="space-y-4">
                {section.title && (
                  <h2 className="text-lg font-bold text-foreground">
                    {section.title}
                  </h2>
                )}
                <ol className="space-y-4">
                  {section.steps.map((step, stepIdx) => (
                    <li key={stepIdx} className="flex gap-3">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold mt-0.5">
                        {stepIdx + 1}
                      </span>
                      <div className="space-y-1 min-w-0">
                        {step.title && (
                          <h3 className="font-semibold text-foreground">
                            {step.title}
                          </h3>
                        )}
                        <p className="leading-relaxed text-muted-foreground">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            );
          }

          if (section.kind === "list") {
            return (
              <section key={idx} className="space-y-3">
                {section.title && (
                  <h2 className="text-lg font-bold text-foreground">
                    {section.title}
                  </h2>
                )}
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="flex items-start gap-2.5 text-muted-foreground leading-relaxed"
                    >
                      <Check className="size-4 shrink-0 text-primary mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          }

          return (
            <aside
              key={idx}
              role="note"
              className={cn(
                "flex items-start gap-3 rounded-xl border p-4",
                CALLOUT_STYLES[section.tone]
              )}
            >
              <CalloutIcon tone={section.tone} />
              <div className="space-y-1 min-w-0">
                {section.title && (
                  <p className="font-semibold">{section.title}</p>
                )}
                <p className="text-sm leading-relaxed opacity-90">
                  {section.body}
                </p>
              </div>
            </aside>
          );
        })}
      </div>

      {/* Feature link */}
      {topic.featureHref && (
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <Link
            href={topic.featureHref}
            className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
          >
            الانتقال إلى {topic.title}
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </div>
      )}

      {/* Related */}
      {topic.related && topic.related.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
            مواضيع ذات صلة
          </h2>
          <div className="flex flex-wrap gap-2">
            {topic.related.map((slug) => {
              const related = getHelpTopic(slug);
              if (!related) return null;
              return (
                <Link
                  key={slug}
                  href={`/help/${slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  {related.title}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Prev / Next */}
      <nav
        aria-label="التنقل بين المواضيع"
        className="grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/help/${prev.slug}`}
            className="group flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted"
          >
            <ArrowRight className="size-4 text-muted-foreground" aria-hidden="true" />
            <span className="min-w-0">
              <span className="block text-xs text-muted-foreground">السابق</span>
              <span className="block truncate font-semibold text-foreground">
                {prev.title}
              </span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/help/${next.slug}`}
            className="group flex items-center gap-3 justify-end rounded-xl border border-border p-4 transition-colors hover:bg-muted sm:col-start-2"
          >
            <span className="min-w-0 text-start">
              <span className="block text-xs text-muted-foreground">التالي</span>
              <span className="block truncate font-semibold text-foreground">
                {next.title}
              </span>
            </span>
            <ArrowLeft className="size-4 text-muted-foreground" aria-hidden="true" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
