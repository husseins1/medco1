import { Copy, User, ShieldCheck, UserPlus, Send, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Profile mock — clinic public card with URL, QR and social links. */
export function ProfileMock() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[320px] rounded-xl border border-border/60 bg-background shadow-sm"
    >
      <div className="flex items-center gap-3 border-b border-border/60 p-3.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-[11px] font-extrabold text-brand">
          ع
        </span>
        <div className="min-w-0 flex-1 text-start">
          <p className="truncate text-[11px] font-bold text-foreground">
            عيادة السن السليم
          </p>
          <p className="text-[9px] text-muted-foreground">الصفحة العامة للعيادة</p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-border/60 px-3.5 py-2.5">
        <div className="flex-1 rounded-md bg-brand/5 px-2 py-1.5" dir="ltr">
          <p className="truncate text-center text-[10px] font-mono font-semibold text-brand">
            tabibtree.com/saleem-clinic
          </p>
        </div>
        <span className="flex size-5 shrink-0 items-center justify-center rounded bg-muted text-muted-foreground">
          <Copy className="size-3" />
        </span>
      </div>

      <div className="flex items-center gap-3 p-3.5">
        <div className="relative flex-1 overflow-hidden rounded-lg border border-border/40 bg-muted/50">
          <span className="absolute start-2 top-1.5 size-2 rounded-full bg-brand shadow-sm" />
          <span className="absolute bottom-0 start-0 end-0 h-4 bg-slate-200" />
        </div>
        <span className="flex size-12 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30">
          <span className="font-mono text-[10px] font-bold text-brand">QR</span>
        </span>
      </div>

      <div className="flex items-center justify-center gap-1.5 border-t border-border/60 px-3.5 py-2.5">
        {["bg-brand/25", "bg-brand/15", "bg-brand/10", "bg-brand/20"].map(
          (bg, index) => (
            <span key={index} className={cn("size-3.5 rounded-full", bg)} />
          )
        )}
      </div>
    </div>
  );
}

/** Account mock — personal info form with avatar and save action. */
export function AccountMock() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[320px] rounded-xl border border-border/60 bg-background shadow-sm"
    >
      <div className="flex items-center gap-3 border-b border-border/60 p-3.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
          <User className="size-4" />
        </span>
        <div className="min-w-0 flex-1 text-start">
          <p className="truncate text-[11px] font-bold text-foreground">د. أحمد علي</p>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[8px] text-muted-foreground">
            طبيب
          </span>
        </div>
      </div>

      <div className="space-y-2.5 p-3.5">
        <div className="space-y-1">
          <p className="text-[9px] font-semibold text-muted-foreground">الاسم الأول</p>
          <div className="rounded-md border border-border/60 bg-muted/30 px-2.5 py-1.5">
            <p className="text-[10px] text-foreground">أحمد</p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-[9px] font-semibold text-muted-foreground">اسم العائلة</p>
          <div className="rounded-md border border-border/60 bg-muted/30 px-2.5 py-1.5">
            <p className="text-[10px] text-foreground">علي</p>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-md bg-muted/40 px-2.5 py-2">
          <span className="text-[9px] text-muted-foreground">البريد الإلكتروني</span>
          <span className="text-[9px] font-semibold text-foreground" dir="ltr">
            dr@clinic.com
          </span>
        </div>
        <span className="block rounded-md bg-brand py-1.5 text-center text-[10px] font-bold text-brand-foreground">
          حفظ التغييرات
        </span>
      </div>
    </div>
  );
}

/** Plans mock — current tier, usage bars and upgrade action. */
export function PlansMock() {
  const bars = [
    { label: "المواعيد", value: "٦٠/١٠٠", width: "w-[60%]" },
    { label: "واتساب", value: "٤٠/١٠٠", width: "w-[40%]" },
  ];

  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[320px] rounded-xl border border-border/60 bg-background shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-foreground">
          <BarChart3 className="size-3 text-brand" />
          الباقة والاستخدام
        </span>
        <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[9px] font-bold text-brand">
          بروفيشنال
        </span>
      </div>

      <div className="space-y-3 p-4">
        {bars.map((bar) => (
          <div key={bar.label} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-muted-foreground">{bar.label}</span>
              <span className="text-[9px] font-semibold text-foreground">{bar.value}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <span className={cn("block h-full rounded-full bg-brand", bar.width)} />
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border/60 p-3.5">
        <span className="block rounded-md bg-slate-900 py-1.5 text-center text-[10px] font-bold text-white">
          ترقية الباقة
        </span>
      </div>
    </div>
  );
}

/** Invite mock — invite form with role chips and a pending row. */
export function InviteMock() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[340px] rounded-xl border border-border/60 bg-background shadow-sm"
    >
      <div className="flex items-center gap-1.5 border-b border-border/60 px-4 py-2.5">
        <UserPlus className="size-3 text-brand" />
        <span className="text-[11px] font-bold text-foreground">إرسال دعوة جديدة</span>
      </div>

      <div className="space-y-2.5 p-4">
        <div className="rounded-md border border-border/60 bg-muted/30 px-2.5 py-1.5">
          <p className="text-[10px] text-muted-foreground" dir="ltr">
            new-doctor@email.com
          </p>
        </div>
        <div className="flex gap-1.5">
          <span className="rounded-full bg-brand px-2.5 py-1 text-[9px] font-bold text-brand-foreground">
            طبيب
          </span>
          <span className="rounded-full bg-muted px-2.5 py-1 text-[9px] font-bold text-muted-foreground">
            موظف استقبال
          </span>
        </div>
        <span className="flex items-center justify-center gap-1 rounded-md bg-brand py-1.5 text-[10px] font-bold text-brand-foreground">
          <Send className="size-3" />
          إرسال الدعوة
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-border/60 px-4 py-2.5">
        <span className="truncate text-[9px] text-muted-foreground" dir="ltr">
          pending@email.com
        </span>
        <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[8px] font-bold text-amber-600">
          معلقة
        </span>
      </div>
    </div>
  );
}

/** Users mock — team list with role badges. */
export function UsersMock() {
  const users = [
    { name: "د. أحمد علي", initials: "أ", role: "مدير", tone: "bg-brand/10 text-brand" },
    { name: "د. سارة خالد", initials: "س", role: "طبيب", tone: "bg-blue-500/10 text-blue-600" },
    { name: "نور حسين", initials: "ن", role: "استقبال", tone: "bg-violet-500/10 text-violet-600" },
  ];

  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[340px] rounded-xl border border-border/60 bg-background shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-foreground">
          <ShieldCheck className="size-3 text-brand" />
          المستخدمين والصلاحيات
        </span>
        <span className="text-[9px] text-muted-foreground">٣ أعضاء</span>
      </div>

      <div className="space-y-1.5 p-3">
        {users.map((user) => (
          <div
            key={user.name}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted/40"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand/15 text-[9px] font-extrabold text-brand">
              {user.initials}
            </span>
            <span className="min-w-0 flex-1 truncate text-[11px] font-bold text-foreground">
              {user.name}
            </span>
            <span className={cn("rounded-full px-2 py-0.5 text-[8px] font-bold", user.tone)}>
              {user.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
