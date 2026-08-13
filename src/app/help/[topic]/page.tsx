import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getHelpTopic, helpTopics } from "@/lib/help/topics";
import { HelpTopicView } from "@/components/help/HelpTopicView";
import { JsonLd } from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

interface HelpTopicPageProps {
  params: Promise<{ topic: string }>;
}

export function generateStaticParams() {
  return helpTopics.map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({
  params,
}: HelpTopicPageProps): Promise<Metadata> {
  const { topic } = await params;
  const helpTopic = getHelpTopic(topic);
  if (!helpTopic) return { title: "غير موجود" };

  const title = helpTopic.seoTitle ?? helpTopic.title;
  const description = helpTopic.seoDescription ?? helpTopic.description;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/help/${helpTopic.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/help/${helpTopic.slug}`,
      siteName: "طبيب تري — Tabibtree",
      locale: "ar_IQ",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function HelpTopicPage({ params }: HelpTopicPageProps) {
  const { topic } = await params;
  const helpTopic = getHelpTopic(topic);
  if (!helpTopic) notFound();

  const headline = helpTopic.seoTitle ?? helpTopic.title;
  const description = helpTopic.seoDescription ?? helpTopic.description;
  const pageUrl = `${siteUrl}/help/${helpTopic.slug}`;

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
      {
        "@type": "ListItem",
        position: 3,
        name: helpTopic.title,
        item: pageUrl,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    inLanguage: "ar",
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    publisher: {
      "@type": "Organization",
      name: "طبيب تري",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/ttLogo.svg`,
      },
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />
      <HelpTopicView topic={helpTopic} />
    </>
  );
}
