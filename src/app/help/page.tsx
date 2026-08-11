import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { helpCategories } from "@/lib/help/topics";
import { Card, CardContent } from "@/components/ui/Card";

export default function HelpIndexPage() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Sparkles className="size-6" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              مركز المساعدة
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              كل ما تحتاجه لإدارة عيادتك على طبيب تري — شروحات خطوة بخطوة لكل
              قسم في النظام، من جدولة المواعيد وحتى التقارير المالية.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      {helpCategories.map((category) => (
        <section key={category.label} className="space-y-4">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
            {category.label}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {category.topics.map((topic) => {
              const Icon = topic.icon;
              return (
                <Card key={topic.slug} className="p-0">
                  <Link
                    href={`/help/${topic.slug}`}
                    className="group flex h-full flex-col gap-3 p-5 transition-colors hover:bg-muted/40"
                  >
                    <CardContent className="flex flex-1 flex-col gap-3 p-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Icon className="size-5" />
                        </div>
                        <ArrowLeft
                          className="size-4 text-muted-foreground transition-transform group-hover:-translate-x-1"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-foreground">
                          {topic.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {topic.description}
                        </p>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </section>
      ))}

      {/* Getting started */}
      <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-foreground">
              جديد على طبيب تري؟
            </h2>
            <p className="text-muted-foreground max-w-xl">
              ابدأ من نظرة عامة لفهم لوحة التحكم، ثم رتّب أوقات العمل، ثم احجز
              أول موعد لك. كل شيء جاهز للعمل خلال دقائق.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/help/overview"
              className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
            >
              البدء — نظرة عامة
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              إنشاء حساب مجاني
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
