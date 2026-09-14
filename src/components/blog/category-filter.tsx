import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { BlogCategoryWithCountDTO } from "@/lib/blog/types";

export function CategoryFilter({
  categories,
  activeSlug,
  className,
}: {
  categories: BlogCategoryWithCountDTO[];
  activeSlug?: string;
  className?: string;
}) {
  if (categories.length === 0) return null;

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      role="navigation"
      aria-label="تصفية حسب التصنيف"
    >
      <Button variant={activeSlug ? "outline" : "default"} size="sm" asChild>
        <Link href="/blog">الكل</Link>
      </Button>
      {categories.map((category) => {
        const active = category.slug === activeSlug;
        return (
          <Button
            key={category.id}
            variant={active ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link href={`/blog/category/${category.slug}`}>
              {category.name}
              <span className="text-xs opacity-70">({category.postCount})</span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
