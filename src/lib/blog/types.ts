import type { BlogPostStatus } from "@prisma/client";

/** Minimal category shape used across public pages and the CMS. */
export interface BlogCategoryDTO {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  order: number;
}

/** Category with the number of published posts attached. */
export interface BlogCategoryWithCountDTO extends BlogCategoryDTO {
  postCount: number;
}

/** Card-level post data for list/grid pages. */
export interface BlogPostCardDTO {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string | null;
  readingTimeMin: number | null;
  tags: string[];
  category: { slug: string; name: string } | null;
}

/** Full post payload for the public article page. */
export interface BlogPostDetailDTO extends BlogPostCardDTO {
  content: string;
  seoTitle: string | null;
  seoDescription: string | null;
  canonicalUrl: string | null;
  noIndex: boolean;
  authorName: string | null;
  categoryId: string | null;
  updatedAt: string;
}

/** Full post payload used by the CMS editor. */
export interface BlogPostAdminDTO {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  coverImagePath: string | null;
  status: BlogPostStatus;
  publishedAt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  canonicalUrl: string | null;
  noIndex: boolean;
  readingTimeMin: number | null;
  tags: string[];
  authorName: string | null;
  categoryId: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Lightweight row used in the CMS posts table. */
export interface BlogPostTableRowDTO {
  id: string;
  slug: string;
  title: string;
  status: BlogPostStatus;
  publishedAt: string | null;
  updatedAt: string;
  category: { name: string } | null;
}
