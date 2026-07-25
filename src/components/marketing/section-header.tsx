interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
  id?: string;
}

export function SectionHeader({ badge, title, subtitle, id }: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <span className="mb-4 inline-flex items-center rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">
        {badge}
      </span>
      <h2
        id={id}
        className="text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
