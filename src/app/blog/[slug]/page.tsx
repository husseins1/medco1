import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ChevronLeft, CalendarDays, User } from "lucide-react";

import { MarkdownContent } from "@/components/blog/markdown-content";
import { PostCard } from "@/components/blog/post-card";
import { JsonLd } from "@/components/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/date-utils";
import { deriveExcerpt } from "@/lib/blog/utils";
import { getPublishedPostBySlug, getRelatedPosts } from "@/lib/blog/queries";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const title = post.seoTitle ?? post.title;
  const description =
    post.seoDescription ?? post.excerpt ?? deriveExcerpt(post.content);
  const canonical = post.canonicalUrl ?? `/blog/${post.slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: post.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url: `/blog/${post.slug}`,
      siteName: "طبيب تري — Tabibtree",
      locale: "ar_IQ",
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.id, post.categoryId);
  const pageUrl = absoluteUrl(`/blog/${post.slug}`);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "المدونة", item: absoluteUrl("/blog") },
      ...(post.category
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: post.category.name,
              item: absoluteUrl(`/blog/category/${post.category.slug}`),
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: post.category ? 4 : 3,
        name: post.title,
        item: pageUrl,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt ?? deriveExcerpt(post.content),
    inLanguage: "ar",
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt,
    ...(post.authorName ? { author: { "@type": "Person", name: post.authorName } } : {}),
    ...(post.coverImage ? { image: [post.coverImage] } : {}),
    ...(post.tags.length > 0 ? { keywords: post.tags.join(", ") } : {}),
    publisher: {
      "@type": "Organization",
      name: "طبيب تري",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: absoluteUrl("/ttLogo.svg") },
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />

      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
          كل المقالات
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {post.category && (
              <Link href={`/blog/category/${post.category.slug}`}>
                <Badge variant="secondary">{post.category.name}</Badge>
              </Link>
            )}
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" aria-hidden="true" />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </span>
            )}
            {post.readingTimeMin && (
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden="true" />
                {post.readingTimeMin} دقائق قراءة
              </span>
            )}
          </div>

          <h1 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-lg leading-9 text-muted-foreground">
              {post.excerpt}
            </p>
          )}

          {post.authorName && (
            <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
              <User className="size-4" aria-hidden="true" />
              {post.authorName}
            </p>
          )}
        </header>

        {post.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={post.title}
            className="mt-8 w-full rounded-2xl border border-border object-cover"
          />
        )}

        <div className="mt-10">
          <MarkdownContent content={post.content} />
        </div>

        {post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </article>

      {related.length > 0 && (
        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            مقالات ذات صلة
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <PostCard key={item.id} post={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
