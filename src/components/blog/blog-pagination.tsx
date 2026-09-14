import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function buildHref(basePath: string, page: number): string {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

function getPageWindow(page: number, totalPages: number, radius = 2): number[] {
  const start = Math.max(1, page - radius);
  const end = Math.min(totalPages, page + radius);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function BlogPagination({
  page,
  totalPages,
  basePath,
  className,
}: {
  page: number;
  totalPages: number;
  basePath: string;
  className?: string;
}) {
  if (totalPages <= 1) return null;

  const pages = getPageWindow(page, totalPages);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav
      aria-label="ترقيم الصفحات"
      className={cn("flex items-center justify-center gap-1.5", className)}
    >
      <Button variant="outline" size="icon-sm" asChild>
        <Link
          href={buildHref(basePath, page - 1)}
          aria-label="الصفحة السابقة"
          aria-disabled={!hasPrev}
          className={cn(!hasPrev && "pointer-events-none opacity-50")}
        >
          <ChevronRight className="rtl:rotate-180" aria-hidden="true" />
        </Link>
      </Button>

      {pages[0] > 1 && (
        <>
          <PageLink basePath={basePath} page={1} active={false} />
          {pages[0] > 2 && (
            <span className="px-1 text-sm text-muted-foreground">…</span>
          )}
        </>
      )}

      {pages.map((pageNumber) => (
        <PageLink
          key={pageNumber}
          basePath={basePath}
          page={pageNumber}
          active={pageNumber === page}
        />
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className="px-1 text-sm text-muted-foreground">…</span>
          )}
          <PageLink basePath={basePath} page={totalPages} active={false} />
        </>
      )}

      <Button variant="outline" size="icon-sm" asChild>
        <Link
          href={buildHref(basePath, page + 1)}
          aria-label="الصفحة التالية"
          aria-disabled={!hasNext}
          className={cn(!hasNext && "pointer-events-none opacity-50")}
        >
          <ChevronLeft className="rtl:rotate-180" aria-hidden="true" />
        </Link>
      </Button>
    </nav>
  );
}

function PageLink({
  basePath,
  page,
  active,
}: {
  basePath: string;
  page: number;
  active: boolean;
}) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      size="icon-sm"
      asChild
    >
      <Link
        href={buildHref(basePath, page)}
        aria-current={active ? "page" : undefined}
      >
        {page}
      </Link>
    </Button>
  );
}
