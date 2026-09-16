import type { Metadata } from "next";

import { PostCard } from "@/components/blog/post-card";
import { CategoryFilter } from "@/components/blog/category-filter";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { JsonLd } from "@/components/JsonLd";
import {
  getPublishedCategoriesWithCounts,
  getPublishedPosts,
} from "@/lib/blog/queries";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

const title = "مدونة طبيب تري — مقالات عن إدارة العيادات";
const description =
  "مقالات عملية حول إدارة العيادات: تنظيم المواعيد، سجلات المرضى، التذكيرات، الحسابات، وتجربة المريض. من فريق طبيب تري.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title,
    description,
    url: "/blog",
    siteName: "طبيب تري — Tabibtree",
    locale: "ar_IQ",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Number.parseInt(pageParam ?? "1", 10) || 1;

  const [{ posts, totalPages, page: currentPage }, categories] =
    await Promise.all([
      getPublishedPosts({ page }),
      getPublishedCategoriesWithCounts(),
    ]);

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "مدونة طبيب تري",
    description,
    url: absoluteUrl("/blog"),
    inLanguage: "ar",
    publisher: {
      "@type": "Organization",
      name: "طبيب تري",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: absoluteUrl("/ttLogo.svg") },
    },
  };

  return (
    <>
      <JsonLd data={blogJsonLd} />

      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          المدونة
        </h1>
        <p className="mt-3 text-base leading-8 text-muted-foreground">
          {description}
        </p>
      </header>

      <CategoryFilter categories={categories} className="mt-8 justify-center" />

      {posts.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          لا توجد مقالات منشورة بعد.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <BlogPagination
        page={currentPage}
        totalPages={totalPages}
        basePath="/blog"
        className="mt-12"
      />
    </>
  );
}
