import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Sparkles } from "lucide-react";
import { helpCategories, helpTopics } from "@/lib/help/topics";
import { Card, CardContent } from "@/components/ui/Card";
import { JsonLd } from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    absolute: "مركز المساعدة — شروحات ودليل استخدام طبيب تري",
  },
  description:
    "مركز مساعدة طبيب تري بالعربية: شروحات خطوة بخطوة لجدولة المواعيد، إدارة المرضى والملفات الطبية، الفواتير والمدفوعات، تذكيرات واتساب، والإحصاءات — دليلك الكامل.",
  alternates: {
    canonical: "/help",
  },
  openGraph: {
    title: "مركز المساعدة — شروحات طبيب تري",
    description:
      "شروحات عربية خطوة بخطوة لكل أقسام طبيب تري: المواعيد، المرضى، الفواتير، التذكيرات، والإحصاءات.",
    url: "/help",
    siteName: "طبيب تري — Tabibtree",
    locale: "ar_IQ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "مركز المساعدة — شروحات طبيب تري",
    description:
      "شروحات عربية خطوة بخطوة لكل أقسام طبيب تري: المواعيد، المرضى، الفواتير، التذكيرات، والإحصاءات.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "الرئيسية",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "مركز المساعدة",
      item: `${siteUrl}/help`,
    },
  ],
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "مركز المساعدة — طبيب تري",
  description:
    "شروحات عربية خطوة بخطوة لكل أقسام طبيب تري: المواعيد، المرضى، الفواتير، التذكيرات، والإحصاءات.",
  url: `${siteUrl}/help`,
  hasPart: helpTopics.map((topic) => ({
    "@type": "WebPage",
    name: topic.title,
    url: `${siteUrl}/help/${topic.slug}`,
    description: topic.seoDescription ?? topic.description,
  })),
};

export default function HelpIndexPage() {
  return (
    <div className="space-y-10">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={collectionJsonLd} />
      {/* Hero */}
      <section className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
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
                        <div className="size-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
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
       <section className="rounded-2xl border border-brand/20 bg-brand/5 p-6 sm:p-8">
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
              className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
            >
              إنشاء حساب مجاني
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
