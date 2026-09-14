import prisma from "@/lib/prisma";
import { BLOG_POSTS_PER_PAGE } from "./constants";
import type {
  BlogCategoryWithCountDTO,
  BlogPostAdminDTO,
  BlogPostCardDTO,
  BlogPostDetailDTO,
  BlogPostTableRowDTO,
} from "./types";

const publishedWhere = () => ({
  status: "PUBLISHED" as const,
  publishedAt: { lte: new Date() },
});

function toCard(post: {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
  readingTimeMin: number | null;
  tags: string[];
  category: { slug: string; name: string } | null;
}): BlogPostCardDTO {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    readingTimeMin: post.readingTimeMin,
    tags: post.tags,
    category: post.category,
  };
}

export interface PublishedPostsResult {
  posts: BlogPostCardDTO[];
  total: number;
  totalPages: number;
  page: number;
}

export async function getPublishedPosts(options?: {
  page?: number;
  perPage?: number;
  categorySlug?: string;
}): Promise<PublishedPostsResult> {
  const perPage = options?.perPage ?? BLOG_POSTS_PER_PAGE;
  const requestedPage = Math.max(1, options?.page ?? 1);

  const where = {
    ...publishedWhere(),
    ...(options?.categorySlug ? { category: { slug: options.categorySlug } } : {}),
  };

  const total = await prisma.blogPost.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const page = Math.min(requestedPage, totalPages);

  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    skip: (page - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
      readingTimeMin: true,
      tags: true,
      category: { select: { slug: true, name: true } },
    },
  });

  return { posts: posts.map(toCard), total, totalPages, page };
}

export async function getPublishedPostBySlug(
  slug: string
): Promise<BlogPostDetailDTO | null> {
  const post = await prisma.blogPost.findFirst({
    where: { slug, ...publishedWhere() },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      content: true,
      coverImage: true,
      publishedAt: true,
      readingTimeMin: true,
      tags: true,
      seoTitle: true,
      seoDescription: true,
      canonicalUrl: true,
      noIndex: true,
      authorName: true,
      categoryId: true,
      updatedAt: true,
      category: { select: { slug: true, name: true } },
    },
  });

  if (!post) return null;

  return {
    ...toCard(post),
    content: post.content,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    canonicalUrl: post.canonicalUrl,
    noIndex: post.noIndex,
    authorName: post.authorName,
    categoryId: post.categoryId,
    updatedAt: post.updatedAt.toISOString(),
  };
}

export async function getRelatedPosts(
  postId: string,
  categoryId: string | null,
  limit = 3
): Promise<BlogPostCardDTO[]> {
  const posts = await prisma.blogPost.findMany({
    where: {
      ...publishedWhere(),
      id: { not: postId },
      ...(categoryId ? { categoryId } : {}),
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
      readingTimeMin: true,
      tags: true,
      category: { select: { slug: true, name: true } },
    },
  });

  return posts.map(toCard);
}

export async function getPublishedCategoriesWithCounts(): Promise<
  BlogCategoryWithCountDTO[]
> {
  const categories = await prisma.blogCategory.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      seoTitle: true,
      seoDescription: true,
      order: true,
      _count: { select: { posts: { where: publishedWhere() } } },
    },
  });

  return categories.map(({ _count, ...category }) => ({
    ...category,
    postCount: _count.posts,
  }));
}

export async function getPublishedCategoryBySlug(
  slug: string
): Promise<BlogCategoryWithCountDTO | null> {
  const category = await prisma.blogCategory.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      seoTitle: true,
      seoDescription: true,
      order: true,
      _count: { select: { posts: { where: publishedWhere() } } },
    },
  });

  if (!category) return null;
  const { _count, ...rest } = category;
  return { ...rest, postCount: _count.posts };
}

/* ── CMS queries (owner-only; called behind requireBlogOwner/assertBlogOwner) ── */

export async function getAdminPosts(): Promise<BlogPostTableRowDTO[]> {
  const posts = await prisma.blogPost.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      status: true,
      publishedAt: true,
      updatedAt: true,
      category: { select: { name: true } },
    },
  });

  return posts.map((post) => ({
    ...post,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    updatedAt: post.updatedAt.toISOString(),
  }));
}

export async function getAdminPostById(
  id: string
): Promise<BlogPostAdminDTO | null> {
  const post = await prisma.blogPost.findUnique({
    where: { id },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      content: true,
      coverImage: true,
      coverImagePath: true,
      status: true,
      publishedAt: true,
      seoTitle: true,
      seoDescription: true,
      canonicalUrl: true,
      noIndex: true,
      readingTimeMin: true,
      tags: true,
      authorName: true,
      categoryId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!post) return null;

  return {
    ...post,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
}

export async function getAllCategories() {
  return prisma.blogCategory.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      seoTitle: true,
      seoDescription: true,
      order: true,
      _count: { select: { posts: true } },
    },
  });
}

export async function getPublishedPostSlugs(): Promise<
  { slug: string; updatedAt: Date }[]
> {
  return prisma.blogPost.findMany({
    where: publishedWhere(),
    orderBy: { publishedAt: "desc" },
    select: { slug: true, updatedAt: true },
  });
}

export async function getCategorySlugs(): Promise<
  { slug: string; updatedAt: Date }[]
> {
  return prisma.blogCategory.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    select: { slug: true, updatedAt: true },
  });
}
