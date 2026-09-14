/** Shared, client-safe blog constants. No server-only imports here. */

export const BLOG_BUCKET = "blog";

export const BLOG_POSTS_PER_PAGE = 9;

export const BLOG_COVER_MAX_BYTES = 5 * 1024 * 1024;

export const BLOG_COVER_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;

export const BLOG_SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const DEFAULT_AUTHOR_NAME = "طبيب تري";

export const BLOG_POST_STATUSES = ["DRAFT", "PUBLISHED"] as const;
