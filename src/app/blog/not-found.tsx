import Link from "next/link";
import { FileQuestion } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function BlogNotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-24 text-center">
      <FileQuestion className="size-10 text-muted-foreground" aria-hidden="true" />
      <h1 className="font-heading text-2xl font-bold text-foreground">
        الصفحة غير موجودة
      </h1>
      <p className="text-sm leading-7 text-muted-foreground">
        ربما حُذف المقال أو لم يُنشر بعد.
      </p>
      <Button asChild>
        <Link href="/blog">العودة إلى المدونة</Link>
      </Button>
    </div>
  );
}
