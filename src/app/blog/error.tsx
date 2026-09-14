"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function BlogError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-24 text-center">
      <AlertTriangle className="size-10 text-destructive" aria-hidden="true" />
      <h1 className="font-heading text-2xl font-bold text-foreground">
        حدث خطأ غير متوقع
      </h1>
      <p className="text-sm leading-7 text-muted-foreground">
        تعذّر تحميل المدونة. حاول مرة أخرى.
      </p>
      <Button onClick={reset}>إعادة المحاولة</Button>
    </div>
  );
}
