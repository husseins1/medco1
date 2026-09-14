import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

/**
 * Renders trusted, owner-authored markdown. `react-markdown` escapes raw HTML
 * by default, so no extra sanitizer is required.
 */
export function MarkdownContent({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-base leading-8 text-foreground/90 break-words",
        "[&>*+*]:mt-5",
        className
      )}
    >
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </Markdown>
    </div>
  );
}

const components: Components = {
  h1: ({ node: _node, className, ...props }) => (
    <h1
      className={cn("mt-8 text-3xl font-bold tracking-tight text-foreground", className)}
      {...props}
    />
  ),
  h2: ({ node: _node, className, ...props }) => (
    <h2
      className={cn("mt-8 text-2xl font-bold tracking-tight text-foreground", className)}
      {...props}
    />
  ),
  h3: ({ node: _node, className, ...props }) => (
    <h3
      className={cn("mt-6 text-xl font-semibold text-foreground", className)}
      {...props}
    />
  ),
  h4: ({ node: _node, className, ...props }) => (
    <h4
      className={cn("mt-6 text-lg font-semibold text-foreground", className)}
      {...props}
    />
  ),
  p: ({ node: _node, className, ...props }) => (
    <p className={cn("leading-8", className)} {...props} />
  ),
  a: ({ node: _node, className, ...props }) => (
    <a
      className={cn(
        "font-medium text-brand underline underline-offset-4 hover:text-brand/80",
        className
      )}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: ({ node: _node, className, ...props }) => (
    <ul
      className={cn("list-disc space-y-2 ps-6 marker:text-muted-foreground", className)}
      {...props}
    />
  ),
  ol: ({ node: _node, className, ...props }) => (
    <ol
      className={cn("list-decimal space-y-2 ps-6 marker:text-muted-foreground", className)}
      {...props}
    />
  ),
  li: ({ node: _node, className, ...props }) => (
    <li className={cn("ps-1 leading-8", className)} {...props} />
  ),
  blockquote: ({ node: _node, className, ...props }) => (
    <blockquote
      className={cn(
        "border-s-4 border-brand/40 bg-muted/40 px-4 py-3 text-muted-foreground italic",
        className
      )}
      {...props}
    />
  ),
  hr: ({ node: _node, className, ...props }) => (
    <hr className={cn("border-border", className)} {...props} />
  ),
  strong: ({ node: _node, className, ...props }) => (
    <strong className={cn("font-bold text-foreground", className)} {...props} />
  ),
  code: ({ node: _node, className, ...props }) => (
    <code
      className={cn(
        "rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground",
        className
      )}
      {...props}
    />
  ),
  pre: ({ node: _node, className, ...props }) => (
    <pre
      className={cn(
        "overflow-x-auto rounded-xl bg-muted p-4 text-sm leading-7 [&_code]:bg-transparent [&_code]:p-0",
        className
      )}
      {...props}
    />
  ),
  img: ({ node: _node, className, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn("w-full rounded-xl border border-border", className)}
      alt={alt ?? ""}
      loading="lazy"
      {...props}
    />
  ),
  table: ({ node: _node, className, ...props }) => (
    <div className="w-full overflow-x-auto rounded-xl border border-border">
      <table className={cn("w-full text-sm", className)} {...props} />
    </div>
  ),
  thead: ({ node: _node, className, ...props }) => (
    <thead className={cn("bg-muted/50", className)} {...props} />
  ),
  th: ({ node: _node, className, ...props }) => (
    <th
      className={cn("border-b border-border px-3 py-2 text-start font-semibold", className)}
      {...props}
    />
  ),
  td: ({ node: _node, className, ...props }) => (
    <td
      className={cn("border-b border-border px-3 py-2 text-start", className)}
      {...props}
    />
  ),
};
