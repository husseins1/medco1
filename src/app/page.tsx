import type { Metadata } from "next";

import { landingContent } from "@/lib/i18n/landing";
import { LpHeader } from "@/components/landingpage/lp-header";
import { LpHero } from "@/components/landingpage/lp-hero";
import { LpMarquee } from "@/components/landingpage/lp-marquee";
import { LpPain } from "@/components/landingpage/lp-pain";
import { LpSolution } from "@/components/landingpage/lp-solution";
import { LpSteps } from "@/components/landingpage/lp-steps";
import { LpFeatures } from "@/components/landingpage/lp-features";
import { LpPricing } from "@/components/landingpage/lp-pricing";
import { LpWhy } from "@/components/landingpage/lp-why";
import { LpFaq } from "@/components/landingpage/lp-faq";
import { LpFinalCta } from "@/components/landingpage/lp-final-cta";
import { LpFooter } from "@/components/landingpage/lp-footer";
import { MetaLandingView, MetaPixel } from "@/components/meta/meta-pixel";


const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    absolute:
      "طبيب تري — برنامج إدارة العيادات | بالعربي، على جوّالك | Tabibtree",
  },
  description:
    "نظّم عيادتك كاملة — مواعيد، سجلات مرضى، حسابات، وتذكير واتساب. تطبيق عربي على الجوال. مجاني للبدء.",
  alternates: {
    canonical: "/",
    languages: {
      ar: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "طبيب تري — عيادتك في جيبك",
    description:
      "إدارة عيادة كاملة — بالعربي، على جوّالك. مواعيد، سجلات مرضى، حسابات، وتذكير واتساب في تطبيق واحد. مجاني للبدء.",
    url: "/",
    siteName: "طبيب تري — Tabibtree",
    locale: "ar_IQ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "طبيب تري — عيادتك في جيبك",
    description:
      "إدارة عيادة كاملة — بالعربي، على جوّالك. مواعيد، سجلات مرضى، حسابات، وتذكير واتساب في تطبيق واحد. مجاني للبدء.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: landingContent.jsonLd.organizationName,
  description: landingContent.jsonLd.organizationDescription,
  url: siteUrl,
  logo: `${siteUrl}/ttLogo.svg`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+964-780-696-9277",
    contactType: "customer support",
    availableLanguage: ["Arabic"],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: landingContent.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function LandingPageV2() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={faqJsonLd} />
      <MetaPixel pixelId={process.env.META_PIXEL_ID} />
      <MetaLandingView />
      <LpHeader />
      <main className="font-sans">
        <LpHero />
        <LpMarquee />
        <LpPain />
        <LpSolution />
        <LpSteps />
        <LpFeatures />
        <LpPricing />
        <LpWhy />
        <LpFaq />
        <LpFinalCta />
      </main>
      <LpFooter />
    </>
  );
}
