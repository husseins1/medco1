import { landingContent } from "@/lib/i18n/landing";
import { cn } from "@/lib/utils";

/* ── Step mock thumbnails (pure CSS, decorative) ── */

/** Mini setup-wizard form card — mirrors src/app/setup/page.tsx step 1. */
function SetupMock() {
  return (
    <div
      aria-hidden="true"
      className="mt-5 mx-auto w-full max-w-[260px]  rounded-xl border border-border/60 bg-background overflow-hidden shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:shadow-md"
    >
      <div className="bg-slate-900 px-4 py-2.5">
        <p className="text-start text-[11px] font-bold text-white">
          إعداد العيادة الجديدة
        </p>
        <div className="mt-2 flex items-center justify-center gap-3">
          <span className="flex size-4 items-center justify-center rounded-full bg-brand text-[8px] font-extrabold text-white">
            1
          </span>
          <span className="h-px w-8 bg-slate-600" />
          <span className="flex size-4 items-center justify-center rounded-full bg-slate-600 text-[8px] font-bold text-slate-400">
            2
          </span>
        </div>
      </div>
      <div className="space-y-2 p-4">
          <p className="text-start text-[12px] ">
            اسم العيادة
          </p>
        <div className="rounded-md border border-border bg-muted/40 px-2.5 py-1.5">
          <p className="text-start text-[10px] text-muted-foreground">
            السن السليم
          </p>
        </div>
        <p className="text-start text-[12px] ">
           رابط العيادة
          </p>
        <div
          className="flex items-center gap-1 rounded-md border border-border bg-muted/40 px-2.5 py-1.5"
          dir="ltr"
        >
         
          
          <span className="text-[10px] text-muted-foreground shrink-0">
            .tabibtree.com/
          </span>
          <span className="text-[12px] font-mono font-semibold text-foreground">
            saleem-clinic
          </span>
        </div>
        <div className="flex justify-start pt-0.5">
          <span className="rounded-md bg-brand px-3 py-1 text-[10px] font-bold text-white">
            التالي
          </span>
        </div>
      </div>
    </div>
  );
}

/** Mini availability schedule — mirrors src/app/dashboard/availability/page.tsx. */
function AvailabilityMock() {
  const days = [
    { label: "السبت", active: true, time: "8ص - ٥م" },
    { label: "الأحد", active: true, time: "8ص - ٥م" },
    { label: "الاثنين", active: true, time: "٩ص - ٥م" },
    { label: "الثلاثاء", active: false, time: "" },
  ];

  return (
    <div
      aria-hidden="true"
      className="mt-5 mx-auto w-full max-w-[260px] rounded-xl border border-border/60 bg-background overflow-hidden shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:shadow-md"
    >
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5">
          <span className="size-1.5 rounded-full bg-brand" />
          <span className="text-[9px] text-muted-foreground">د. أحمد</span>
        </span>
        <p className="text-[11px] font-bold text-foreground">
          أوقات العمل
        </p>
      </div>
      <div className="flex border-b border-border/60">
        <span className="flex-1 py-1.5 text-center text-[9px] font-bold text-brand">
          ساعات العمل
        </span>
        <span className="flex-1 py-1.5 text-center text-[9px] text-muted-foreground">
          الحجز أونلاين
        </span>
      </div>
      <div className="space-y-2 p-4">
        {days.map((day) => (
          <div
            key={day.label}
            className="flex items-center justify-between"
          >
            <span
              className={cn(
                "flex size-4 items-center justify-center rounded-full text-[8px] text-white",
                day.active ? "bg-brand" : "border-2 border-border bg-transparent text-transparent"
              )}
            >
              {day.active ? "✓" : ""}
            </span>
            <span
              className={cn(
                "text-[10px]",
                day.active ? "font-semibold text-foreground" : "text-muted-foreground/60"
              )}
            >
              {day.label}
            </span>
            <span
              className={cn(
                "text-[9px]",
                day.active ? "text-muted-foreground" : "text-muted-foreground/40"
              )}
            >
              {day.time || "—"}
            </span>
          </div>
        ))}
      </div>
      <div className="mx-4 mb-4 overflow-hidden rounded-lg border border-border/60 bg-muted/30 p-3">
        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "aspect-square rounded-[2px]",
                (i + 1) % 3 === 0
                  ? "bg-brand shadow-sm"
                  : (i + 1) % 5 === 0
                    ? "bg-brand/20"
                    : "bg-transparent"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Mini clinic-profile card — mirrors src/app/dashboard/profile/page.tsx. */
function ProfileMock() {
  return (
    <div
      aria-hidden="true"
      className="mt-5 mx-auto w-full max-w-[260px] rounded-xl border border-border/60 bg-background overflow-hidden shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:shadow-md"
    >
      <div className="flex items-center gap-3 border-b border-border/60 p-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand text-[11px] font-extrabold">
          ع
        </span>
        <div className="text-start min-w-0 flex-1">
          <p className="text-[11px] font-bold text-foreground truncate">
            عيادة السن السليم
          </p>
          <p className="text-[9px] text-muted-foreground">
            الصفحة العامة للعيادة
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 border-b border-border/60 px-4 py-2.5">
        <div className="flex-1 rounded-md bg-brand/5 px-2.5 py-1.5" dir="ltr">
          <p className="text-center text-[10px] font-mono font-semibold text-brand">
            tabibtree.com/saleem-clinic
          </p>
        </div>
        <span className="flex size-5 items-center justify-center rounded bg-muted">
          <span className="block text-[9px] leading-none text-muted-foreground">
            c
          </span>
        </span>
      </div>
      <div className="flex items-center justify-center gap-1.5 border-b border-border/60 px-4 py-2.5">
        {["bg-brand/25", "bg-brand/15", "bg-brand/10"].map((bg, i) => (
          <span key={i} className={cn("size-4 rounded-full", bg)} />
        ))}
      </div>
      <div className="flex gap-3 p-4">
        <div className="relative flex-1 overflow-hidden rounded-lg border border-border/40 bg-muted/50">
          <span className="absolute start-2 top-1.5 size-2 rounded-full bg-brand shadow-sm" />
          <span className="absolute bottom-0 start-0 end-0 h-4 bg-slate-200" />
        </div>
        <span className="flex size-14 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30">
          <span className="text-sm font-mono font-bold text-brand">QR</span>
        </span>
      </div>
    </div>
  );
}

/* ── Main section ── */

/** 3-step setup — circled numerals joined by a dashed connector on desktop. */
export function LpSteps() {
  const { howItWorks } = landingContent;

  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 py-16 lg:py-24"
      aria-labelledby="lp-steps-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="lp-reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold tracking-wide text-brand">
            {howItWorks.badge}
          </p>
          <h2
            id="lp-steps-title"
            className="mt-3 text-3xl font-extrabold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl"
          >
            {howItWorks.title}
          </h2>
        </div>

        <ol className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Dashed connector behind the circles (desktop only) */}
          <div
            aria-hidden="true"
            className="absolute top-6 hidden w-full border-t-2 border-dashed border-border md:block"
          />
          {howItWorks.steps.map((step, index) => (
            <li
              key={step.title}
              className="lp-reveal group relative flex flex-col items-center text-center"
            >
              <span className="relative z-10 flex size-12 items-center justify-center rounded-full bg-brand text-lg font-extrabold text-brand-foreground shadow-md">
                {index + 1}
              </span>
              <h3 className="mt-5 text-xl font-extrabold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs leading-relaxed text-muted-foreground">
                {step.description}
              </p>
              {index === 0 && <SetupMock />}
              {index === 1 && <AvailabilityMock />}
              {index === 2 && <ProfileMock />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
