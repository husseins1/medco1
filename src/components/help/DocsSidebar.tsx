import Link from "next/link";
import { helpCategories } from "@/lib/help/topics";
import { cn } from "@/lib/utils";

interface DocsSidebarProps {
  activeSlug?: string;
}

export function DocsSidebar({ activeSlug }: DocsSidebarProps) {
  return (
    <nav aria-label="أقسام المساعدة" className="space-y-6">
      {helpCategories.map((category) => (
        <div key={category.label}>
          <h4 className="px-3 mb-2 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
            {category.label}
          </h4>
          <div className="flex flex-col gap-0.5">
            {category.topics.map((topic) => {
              const isActive = topic.slug === activeSlug;
              const Icon = topic.icon;
              return (
                <Link
                  key={topic.slug}
                  href={`/help/${topic.slug}`}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="truncate">{topic.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
