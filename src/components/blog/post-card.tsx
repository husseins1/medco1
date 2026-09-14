import Link from "next/link";
import { Clock } from "lucide-react";

import { formatDate } from "@/lib/date-utils";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { BlogPostCardDTO } from "@/lib/blog/types";

export function PostCard({
  post,
  className,
}: {
  post: BlogPostCardDTO;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md",
        className
      )}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-full flex-col"
        aria-label={post.title}
      >
        <div className="relative aspect-16/9 w-full overflow-hidden bg-muted">
          {post.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImage}
              alt={post.title}
              loading="lazy"
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
              طبيب تري
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {post.category && (
              <Badge variant="secondary">{post.category.name}</Badge>
            )}
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt, { month: "short" })}
              </time>
            )}
            {post.readingTimeMin && (
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden="true" />
                {post.readingTimeMin} د
              </span>
            )}
          </div>

          <h3 className="font-heading text-lg font-semibold leading-snug text-foreground group-hover:text-brand">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="line-clamp-3 text-sm leading-7 text-muted-foreground">
              {post.excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
