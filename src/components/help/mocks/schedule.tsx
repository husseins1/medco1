import { Plus, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

/** Overview mock — mini dashboard with stat cards and a 6-month bar chart. */
export function OverviewMock() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[340px] rounded-xl border border-border/60 bg-background shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-foreground">
          <span className="size-2 rounded-full bg-brand" />
          لوحة التحكم
        </span>
        <span className="text-[9px] text-muted-foreground">اليوم · 12 موعداً</span>
      </div>

      <div className="grid grid-cols-3 gap-2 p-3">
        {[
          { value: "٤٨", label: "مريض" },
          { value: "١٢", label: "موعد" },
          { value: "٩", label: "مكتمل" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg bg-muted/50 px-2 py-2 text-center"
          >
            <p className="text-sm font-extrabold text-foreground">{stat.value}</p>
            <p className="text-[9px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-border/60 p-3">
        <p className="mb-2 text-[9px] font-bold text-muted-foreground">
          مواعيد آخر ٦ أشهر
        </p>
        <div className="flex h-14 items-end gap-1.5">
          {["h-[35%]", "h-[55%]", "h-[45%]", "h-[70%]", "h-[60%]", "h-[85%]"].map(
            (height, index) => (
              <span
                key={index}
                className={cn(
                  "flex-1 rounded-t-sm",
                  height,
                  index === 5 ? "bg-brand" : "bg-brand/30"
                )}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

/** Calendar mock — week header, today column highlighted, appointment chips. */
export function CalendarMock() {
  const days = ["س", "ح", "ن", "ث", "ر", "خ", "ج"];
  const appointments = [
    { time: "٩:٠٠", patient: "أحمد علي", active: true },
    { time: "١١:٣٠", patient: "سارة خالد", active: true },
    { time: "٢:٠٠", patient: "محمد حسن", active: false },
  ];

  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[400px] rounded-xl border border-border/60 bg-background shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <span className="text-[11px] font-bold text-foreground">التقويم</span>
        <span className="flex items-center gap-1 rounded-md bg-brand px-2 py-1 text-[9px] font-bold text-brand-foreground">
          <Plus className="size-2.5" />
          موعد جديد
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1 p-3 pb-1.5">
        {days.map((day, index) => (
          <span
            key={index}
            className={cn(
              "rounded-md py-1 text-center text-[9px] font-bold",
              index === 5
                ? "bg-brand text-brand-foreground"
                : "text-muted-foreground"
            )}
          >
            {day}
          </span>
        ))}
      </div>

      <div className="space-y-1.5 p-3 pt-1.5">
        {appointments.map((appointment) => (
          <div
            key={appointment.time}
            className={cn(
              "flex items-center gap-2 rounded-md px-2.5 py-1.5",
              appointment.active ? "bg-brand/5" : "bg-muted/40"
            )}
          >
            <span className="flex items-center gap-1 text-[10px] font-bold text-brand">
              <Clock className="size-2.5" />
              {appointment.time}
            </span>
            <span className="truncate text-[10px] text-muted-foreground">
              {appointment.patient}
            </span>
            <span
              className={cn(
                "ms-auto size-1.5 shrink-0 rounded-full",
                appointment.active ? "bg-brand" : "bg-border"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Availability mock — weekly toggles plus a 28-cell booking preview. */
export function AvailabilityMock() {
  const days = [
    { label: "السبت", active: true, time: "٨ص — ٥م" },
    { label: "الأحد", active: true, time: "٨ص — ٥م" },
    { label: "الاثنين", active: true, time: "٩ص — ٥م" },
    { label: "الثلاثاء", active: false, time: "" },
  ];

  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[340px] rounded-xl border border-border/60 bg-background shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5">
          <span className="size-1.5 rounded-full bg-brand" />
          <span className="text-[9px] text-muted-foreground">د. أحمد</span>
        </span>
        <span className="text-[11px] font-bold text-foreground">أوقات العمل</span>
      </div>

      <div className="space-y-2 p-4">
        {days.map((day) => (
          <div key={day.label} className="flex items-center justify-between">
            <span
              className={cn(
                "flex size-4 items-center justify-center rounded-full text-[8px] text-white",
                day.active
                  ? "bg-brand"
                  : "border-2 border-border bg-transparent text-transparent"
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
              {day.time || "مغلق"}
            </span>
          </div>
        ))}
      </div>

      <div className="mx-4 mb-4 overflow-hidden rounded-lg border border-border/60 bg-muted/30 p-3">
        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({ length: 28 }).map((_, index) => (
            <span
              key={index}
              className={cn(
                "aspect-square rounded-[2px]",
                (index + 1) % 3 === 0
                  ? "bg-brand shadow-sm"
                  : (index + 1) % 5 === 0
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

/** Waitlist mock — 4-column kanban board with patient cards. */
export function WaitlistMock() {
  const columns = [
    { label: "الحجز", count: 3, tone: "bg-brand/10 text-brand" },
    { label: "الانتظار", count: 2, tone: "bg-amber-500/10 text-amber-600" },
    { label: "تنفيذ", count: 1, tone: "bg-blue-500/10 text-blue-600" },
    { label: "مكتمل", count: 2, tone: "bg-emerald-500/10 text-emerald-600" },
  ];
  const cards = [
    ["أحمد", "١٠:٠٠"],
    ["سارة", "١٠:١٥"],
    ["محمد", "١٠:٣٠"],
    ["نور", "١١:٠٠"],
  ];

  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[430px] rounded-xl border border-border/60 bg-background shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <span className="text-[11px] font-bold text-foreground">قائمة الانتظار</span>
        <span className="text-[9px] text-muted-foreground">اسحب لتغيير الحالة</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 p-3">
        {columns.map((column, colIndex) => (
          <div
            key={column.label}
            className="flex flex-col gap-1.5 rounded-lg bg-muted/40 p-1.5"
          >
            <span className="flex items-center justify-between px-0.5">
              <span className="text-[8px] font-bold text-muted-foreground">
                {column.label}
              </span>
              <span className={cn("rounded-full px-1 text-[8px] font-bold", column.tone)}>
                {column.count}
              </span>
            </span>
            {cards.slice(colIndex, colIndex + 1).map((card) => (
              <div
                key={card[0]}
                className="rounded-md border border-border/60 bg-background px-1.5 py-1"
              >
                <p className="truncate text-[8px] font-bold text-foreground">{card[0]}</p>
                <p className="text-[7px] text-muted-foreground">{card[1]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
