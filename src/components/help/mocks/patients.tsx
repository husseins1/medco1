import { Search, Plus, CheckCheck, MessageSquare, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

/** Patients mock — search bar plus a small patient list. */
export function PatientsMock() {
  const patients = [
    { name: "أحمد علي", initials: "أ", phone: "٠٧٧٠ ...", source: "توصية" },
    { name: "سارة خالد", initials: "س", phone: "٠٧٧١ ...", source: "خرائط" },
    { name: "محمد حسن", initials: "م", phone: "٠٧٧٢ ...", source: "زيارة" },
  ];

  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[340px] rounded-xl border border-border/60 bg-background shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <span className="text-[11px] font-bold text-foreground">قائمة المرضى</span>
        <span className="flex items-center gap-1 rounded-md bg-brand px-2 py-1 text-[9px] font-bold text-brand-foreground">
          <Plus className="size-2.5" />
          مريض جديد
        </span>
      </div>

      <div className="p-3 pb-2">
        <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-2.5 py-1.5">
          <Search className="size-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">
            ابحث بالاسم أو الهاتف...
          </span>
        </div>
      </div>

      <div className="space-y-1.5 px-3 pb-3">
        {patients.map((patient) => (
          <div
            key={patient.name}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted/40"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand/15 text-[9px] font-extrabold text-brand">
              {patient.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-bold text-foreground">
                {patient.name}
              </p>
              <p className="truncate text-[9px] text-muted-foreground">{patient.phone}</p>
            </div>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[8px] text-muted-foreground">
              {patient.source}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Services mock — service cards with colored accent bars. */
export function ServicesMock() {
  const services = [
    { name: "كشف طبي", duration: "١٥ دقيقة", active: true, color: "bg-brand" },
    { name: "استشارة", duration: "٣٠ دقيقة", active: true, color: "bg-blue-500" },
    { name: "متابعة", duration: "١٠ دقائق", active: false, color: "bg-border" },
  ];

  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[340px] rounded-xl border border-border/60 bg-background shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <span className="text-[11px] font-bold text-foreground">الخدمات الطبية</span>
        <span className="flex items-center gap-1 rounded-md bg-brand px-2 py-1 text-[9px] font-bold text-brand-foreground">
          <Plus className="size-2.5" />
          إضافة خدمة
        </span>
      </div>

      <div className="space-y-2 p-3">
        {services.map((service) => (
          <div
            key={service.name}
            className="overflow-hidden rounded-lg border border-border/60"
          >
            <span className={cn("block h-0.5 w-full", service.color)} />
            <div className="flex items-center justify-between px-2.5 py-2">
              <span className="text-[11px] font-bold text-foreground">
                {service.name}
              </span>
              <span className="flex items-center gap-1 text-[9px] text-muted-foreground">
                <Clock className="size-2.5" />
                {service.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Reminders mock — WhatsApp bubble plus a reminder toggle row. */
export function RemindersMock() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[340px] rounded-xl border border-border/60 bg-background shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-foreground">
          <MessageSquare className="size-3 text-brand" />
          التذكيرات
        </span>
        <span className="text-[9px] text-muted-foreground">عبر واتساب</span>
      </div>

      <div className="p-3">
        <div className="max-w-[85%] rounded-2xl rounded-se-sm bg-brand px-3 py-2.5 shadow-sm">
          <p className="text-[10px] leading-relaxed text-brand-foreground">
            تذكير بموعدكم يوم السبت الساعة ١٠ صباحاً في العيادة.
          </p>
          <span className="mt-1 flex items-center justify-end gap-1 text-[8px] text-brand-foreground/80">
            ١٠:٠٠
            <CheckCheck className="size-3" />
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border/60 px-4 py-2.5">
        <span className="text-[10px] font-semibold text-foreground">تأكيد الحجز</span>
        <span className="relative inline-flex h-4 w-8 items-center rounded-full bg-brand">
          <span className="ms-auto me-0.5 block size-3 rounded-full bg-white" />
        </span>
      </div>
    </div>
  );
}
