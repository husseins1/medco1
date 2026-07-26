import { CheckCheck } from "lucide-react";

import { landingContent } from "@/lib/i18n/landing";
import { cn } from "@/lib/utils";

type MockKind = "calendar" | "records" | "whatsapp" | "finance" | "booking";

/** Bento layout — pairs each i18n feature item with its cell span + mockup. */
const layout: ReadonlyArray<{ span: string; mock: MockKind }> = [
  { span: "md:col-span-4", mock: "calendar" },
  { span: "md:col-span-2", mock: "records" },
  { span: "md:col-span-2", mock: "whatsapp" },
  { span: "md:col-span-2", mock: "finance" },
  { span: "md:col-span-2", mock: "booking" },
];

type MockStrings = (typeof landingContent)["features"]["mock"];

/** 0 = empty day, 1 = has appointments, 2 = today */
const calendarPattern = [
  0, 1, 0, 0, 1, 0, 0,
  1, 0, 1, 2, 0, 1, 0,
  0, 0, 1, 0, 0, 1, 0,
] as const;

function CalendarMock({ mock }: { mock: MockStrings }) {
  return (
    <div
      aria-hidden="true"
      className="mt-6 rounded-xl border border-border/60 bg-background p-4"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-bold text-muted-foreground">
          {mock.calendarCaption}
        </span>
        <span className="size-2 rounded-full bg-brand" />
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1.5">
        {mock.calendarDayLabels.map((day) => (
          <span
            key={day}
            className="text-center text-[10px] font-bold text-muted-foreground"
          >
            {day.slice(0, 3)}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {calendarPattern.map((day, index) => {
          const dayNum = index + 8;
          return (
            <span
              key={index}
              className={cn(
                "flex aspect-square flex-col items-center justify-center rounded-md text-[10px] font-bold",
                day === 2 && "bg-brand text-brand-foreground shadow-sm",
                day === 1 && "bg-brand/10 text-foreground",
                day === 0 && "text-muted-foreground"
              )}
            >
              {dayNum.toLocaleString("ar-SA")}
              {day >= 1 && (
                <span
                  className={cn(
                    "mt-px size-1 rounded-full",
                    day === 2 ? "bg-brand-foreground" : "bg-brand"
                  )}
                />
              )}
            </span>
          );
        })}
      </div>

      <div className="mt-3 space-y-1.5">
        {mock.calendarAppointments.map((apt) => (
          <div
            key={apt.time}
            className="flex items-center gap-2 rounded-md bg-brand/5 px-2.5 py-1.5"
          >
            <span className="shrink-0 text-[11px] font-bold text-brand">
              {apt.time}
            </span>
            <span className="truncate text-[11px] text-muted-foreground">
              {apt.patient}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecordsMock({ mock }: { mock: MockStrings }) {
  return (
    <div
      aria-hidden="true"
      className="mt-6 space-y-2 rounded-xl border border-border/60 bg-background p-4"
    >
      {mock.recordsPatients.map((patient, index) => (
        <div
          key={patient.name}
          className={cn(
            "flex items-start gap-2 rounded-md px-2 py-1.5",
            index < mock.recordsPatients.length - 1 &&
              "border-b border-border/40 pb-2"
          )}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand/15 text-[10px] font-extrabold text-brand">
            {patient.initials}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-xs font-bold text-foreground">
                {patient.name}
              </span>
              <span className="shrink-0 text-[10px] text-muted-foreground">
                {patient.date}
              </span>
            </div>
            <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
              {patient.note}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function WhatsappMock({ mock }: { mock: MockStrings }) {
  return (
    <div aria-hidden="true" className="mt-6">
      <div className="max-w-[85%] rounded-2xl rounded-ss-sm bg-brand px-4 py-3 text-sm leading-relaxed text-brand-foreground shadow-sm">
        {mock.whatsappMessage}
        <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-brand-foreground/80">
          {mock.whatsappStatus}
          <CheckCheck className="size-3.5" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

const barHeights = [
  "h-[45%]",
  "h-[70%]",
  "h-[50%]",
  "h-[85%]",
  "h-[60%]",
  "h-[100%]",
  "h-[75%]",
] as const;

function FinanceMock({ mock }: { mock: MockStrings }) {
  return (
    <div
      aria-hidden="true"
      className="mt-6 rounded-xl border border-border/60 bg-background p-4"
    >
      <p className="text-xs font-bold text-muted-foreground">
        {mock.financeLabel}
      </p>
      <div className="mt-3 flex h-20 items-end gap-1.5">
        {barHeights.map((height, index) => (
          <span
            key={index}
            className={cn(
              "flex-1 rounded-t-sm",
              height,
              index === barHeights.length - 2 ? "bg-brand" : "bg-brand/30"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function BookingMock({ mock }: { mock: MockStrings }) {
  return (
    <div
      aria-hidden="true"
      className="mt-6 rounded-xl border border-border/60 bg-background p-4"
    >
      <p dir="ltr" className="text-center text-xs font-bold text-brand">
        {mock.bookingUrl}
      </p>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {mock.bookingSlots.map((slot) => (
          <span
            key={slot}
            className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-bold text-brand"
          >
            {slot}
          </span>
        ))}
      </div>
      <span className="mt-3 block rounded-full bg-brand py-1.5 text-center text-xs font-bold text-brand-foreground">
        {mock.bookingCta}
      </span>
    </div>
  );
}

function FeatureMock({ kind, mock }: { kind: MockKind; mock: MockStrings }) {
  switch (kind) {
    case "calendar":
      return <CalendarMock mock={mock} />;
    case "records":
      return <RecordsMock mock={mock} />;
    case "whatsapp":
      return <WhatsappMock mock={mock} />;
    case "finance":
      return <FinanceMock mock={mock} />;
    case "booking":
      return <BookingMock mock={mock} />;
  }
}

/** Asymmetric bento grid — each cell carries a tiny pure-CSS product mockup. */
export function LpFeatures() {
  const { features } = landingContent;

  return (
    <section
      id="features"
      className="scroll-mt-24 bg-muted/40 py-16 lg:py-24"
      aria-labelledby="lp-features-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="lp-reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold tracking-wide text-brand">
            {features.badge}
          </p>
          <h2
            id="lp-features-title"
            className="mt-3 text-3xl font-extrabold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl"
          >
            {features.title}
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-6">
          {features.items.map((item, index) => (
            <article
              key={item.title}
              className={cn(
                "lp-reveal group rounded-2xl border border-border/70 bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg",
                layout[index]?.span
              )}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-foreground">
                    {item.title}
                  </h3>
                  <p
                    dir="ltr"
                    lang="en"
                    className="text-end text-[11px] font-medium text-muted-foreground"
                  >
                    {item.jtbd}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              {layout[index] ? (
                <FeatureMock kind={layout[index].mock} mock={features.mock} />
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
