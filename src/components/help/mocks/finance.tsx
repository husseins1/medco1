import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

/** Invoices mock — summary, income/expense bars, and transaction rows. */
export function InvoicesMock() {
  const bars = ["h-[45%]", "h-[70%]", "h-[55%]", "h-[85%]", "h-[60%]", "h-[100%]"];
  const rows = [
    { label: "كشف — أحمد علي", amount: "٥٠٬٠٠٠ د.ع", tone: "text-emerald-600", dir: "in" },
    { label: "إيجار العيادة", amount: "١٢٠٬٠٠٠ د.ع", tone: "text-red-500", dir: "out" },
  ];

  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[360px] rounded-xl border border-border/60 bg-background shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <span className="text-[11px] font-bold text-foreground">الفواتير والمدفوعات</span>
        <span className="text-[9px] text-muted-foreground">يونيو ٢٠٢٦</span>
      </div>

      <div className="grid grid-cols-3 gap-2 p-3 pb-2">
        {[
          { value: "٤٫٢م", label: "دخل", tone: "text-emerald-600" },
          { value: "١٫٥م", label: "مصروف", tone: "text-red-500" },
          { value: "٢٫٧م", label: "صافي", tone: "text-foreground" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg bg-muted/50 px-2 py-1.5 text-center">
            <p className={cn("text-[11px] font-extrabold", stat.tone)}>{stat.value}</p>
            <p className="text-[8px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex h-14 items-end gap-1.5 px-3 pb-2">
        {bars.map((height, index) => (
          <span
            key={index}
            className={cn(
              "flex-1 rounded-t-sm",
              height,
              index === bars.length - 1 ? "bg-brand" : "bg-brand/25"
            )}
          />
        ))}
      </div>

      <div className="space-y-1 border-t border-border/60 p-3 pt-2.5">
        {rows.map((row) => {
          const Icon = row.dir === "in" ? TrendingUp : TrendingDown;
          return (
            <div key={row.label} className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-md",
                  row.dir === "in"
                    ? "bg-emerald-500/10 text-emerald-600"
                    : "bg-red-500/10 text-red-500"
                )}
              >
                <Icon className="size-3" />
              </span>
              <span className="flex-1 truncate text-[10px] text-muted-foreground">
                {row.label}
              </span>
              <span className={cn("text-[10px] font-bold", row.tone)}>{row.amount}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Analytics mock — summary chips, trend bars, and gender distribution. */
export function AnalyticsMock() {
  const chips = [
    { value: "١٨٩", label: "مواعيد" },
    { value: "١٤٢", label: "مكتملة" },
    { value: "٢٧", label: "جدد" },
  ];
  const bars = [
    { total: "h-[55%]", done: "h-[35%]" },
    { total: "h-[70%]", done: "h-[50%]" },
    { total: "h-[45%]", done: "h-[30%]" },
    { total: "h-[85%]", done: "h-[65%]" },
    { total: "h-[60%]", done: "h-[45%]" },
    { total: "h-[100%]", done: "h-[80%]" },
  ];

  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[360px] rounded-xl border border-border/60 bg-background shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-foreground">
          <Wallet className="size-3 text-brand" />
          الإحصاءات
        </span>
        <span className="text-[9px] text-muted-foreground">آخر ٦ أشهر</span>
      </div>

      <div className="grid grid-cols-3 gap-2 p-3 pb-2">
        {chips.map((chip) => (
          <div key={chip.label} className="rounded-lg bg-muted/50 px-2 py-1.5 text-center">
            <p className="text-[11px] font-extrabold text-foreground">{chip.value}</p>
            <p className="text-[8px] text-muted-foreground">{chip.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-end gap-2 px-3 pb-2">
        {bars.map((bar, index) => (
          <div
            key={index}
            className="flex h-16 flex-1 items-end justify-center gap-0.5"
          >
            <span className={cn("w-2.5 rounded-t-sm bg-brand/25", bar.total)} />
            <span className={cn("w-2.5 rounded-t-sm bg-brand", bar.done)} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border/60 px-4 py-2.5">
        <span className="text-[9px] text-muted-foreground">توزيع المرضى</span>
        <div className="flex gap-1">
          <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[8px] font-bold text-brand">
            ذكر
          </span>
          <span className="rounded-full bg-pink-500/10 px-2 py-0.5 text-[8px] font-bold text-pink-600">
            أنثى
          </span>
        </div>
      </div>
    </div>
  );
}
