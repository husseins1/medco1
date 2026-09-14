import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { PostCard } from "@/components/blog/post-card";
import { CategoryFilter } from "@/components/blog/category-filter";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { JsonLd } from "@/components/JsonLd";
import {
  getPublishedCategoriesWithCounts,
  getPublishedCategoryBySlug,
  getPublishedPosts,
} from "@/lib/blog/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getPublishedCategoryBySlug(slug);
  if (!category) notFound();

  const title = category.seoTitle ?? `${category.name} — مدونة طبيب تري`;
  const description =
    category.seoDescription ??
    category.description ??
    `مقالات تصنيف ${category.name} على مدونة طبيب تري.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/blog/category/${category.slug}` },
    openGraph: {
      title,
      description,
      url: `/blog/category/${category.slug}`,
      siteName: "طبيب تري — Tabibtree",
      locale: "ar_IQ",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Number.parseInt(pageParam ?? "1", 10) || 1;

  const category = await getPublishedCategoryBySlug(slug);
  if (!category) notFound();

  const [{ posts, totalPages, page: currentPage }, categories] =
    await Promise.all([
      getPublishedPosts({ page, categorySlug: slug }),
      getPublishedCategoriesWithCounts(),
    ]);

  const pageUrl = `${siteUrl}/blog/category/${category.slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "المدونة", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: category.name, item: pageUrl },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      <div className="mx-auto max-w-2xl text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
          كل المقالات
        </Link>
        <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {category.name}
        </h1>
        {(category.description ?? category.seoDescription) && (
          <p className="mt-3 text-base leading-8 text-muted-foreground">
            {category.description ?? category.seoDescription}
          </p>
        )}
      </div>

      <CategoryFilter
        categories={categories}
        activeSlug={category.slug}
        className="mt-8 justify-center"
      />

      {posts.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          لا توجد مقالات في هذا التصنيف بعد.
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
        basePath={`/blog/category/${category.slug}`}
        className="mt-12"
      />
    </>
  );
}
