import { BLOG_SLUG_REGEX } from "./constants";

const WORDS_PER_MINUTE = 200;

/** Returns a minimum reading time of 1 minute based on word count. */
export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Best-effort markdown strip so excerpts read as plain Arabic prose. */
export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/[*_~]{1,3}([^*_~]+)[*_~]{1,3}/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Derives a plain-text excerpt from markdown when none was provided. */
export function deriveExcerpt(markdown: string, maxLength = 180): string {
  const plain = stripMarkdown(markdown);
  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength).trimEnd()}…`;
}

export function isValidBlogSlug(slug: string): boolean {
  return BLOG_SLUG_REGEX.test(slug);
}

/** Normalizes a comma/newline separated tag input into a clean array. */
export function parseTags(input: string | null | undefined): string[] {
  if (!input) return [];
  return Array.from(
    new Set(
      input
        .split(/[,\n]/)
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0 && tag.length <= 40)
    )
  ).slice(0, 12);
}
