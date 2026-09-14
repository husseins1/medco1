"use client";

import { useState, useTransition } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from "@/app/cms/actions";
import type { BlogCategoryDTO } from "@/lib/blog/types";
import { isValidBlogSlug } from "@/lib/blog/utils";

interface CategoryRow extends BlogCategoryDTO {
  postCount: number;
}

export function CategoryManager({ categories }: { categories: CategoryRow[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<CategoryRow | null>(null);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function openCreate() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(category: CategoryRow) {
    setEditing(category);
    setOpen(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const slug = String(formData.get("slug") ?? "");

    if (!isValidBlogSlug(slug)) {
      toast.error("المعرّف غير صالح: أحرف إنجليزية صغيرة وأرقام وشرطات فقط.");
      return;
    }

    startTransition(async () => {
      const result = editing
        ? await updateCategoryAction(editing.id, formData)
        : await createCategoryAction(formData);

      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success(editing ? "تم تحديث التصنيف." : "تم إنشاء التصنيف.");
      setOpen(false);
      router.refresh();
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteCategoryAction(id);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("تم حذف التصنيف.");
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            التصنيفات
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {categories.length} تصنيف
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="bg-brand text-brand-foreground hover:bg-brand/90"
        >
          <Plus aria-hidden="true" />
          تصنيف جديد
        </Button>
      </div>

      {categories.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-background py-16 text-center text-sm text-muted-foreground">
          لا توجد تصنيفات بعد.
        </p>
      ) : (
        <div className="rounded-2xl border border-border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>المعرّف</TableHead>
                <TableHead>المقالات</TableHead>
                <TableHead>الترتيب</TableHead>
                <TableHead className="text-end">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-muted-foreground" dir="ltr">
                    {category.slug}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{category.postCount}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {category.order}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => openEdit(category)}
                        aria-label={`تعديل ${category.name}`}
                      >
                        <Pencil aria-hidden="true" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon-sm"
                            disabled={isPending}
                            aria-label={`حذف ${category.name}`}
                          >
                            <Trash2 aria-hidden="true" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>حذف التصنيف؟</AlertDialogTitle>
                            <AlertDialogDescription>
                              سيتم حذف «{category.name}». المقالات المرتبطة لن
                              تُحذف، لكنها ستصبح بدون تصنيف.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <AlertDialogAction
                              variant="destructive"
                              onClick={(event) => {
                                event.preventDefault();
                                handleDelete(category.id);
                              }}
                            >
                              حذف
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {editing ? "تعديل التصنيف" : "تصنيف جديد"}
              </DialogTitle>
              <DialogDescription>
                أكمل بيانات التصنيف. المعرّف يظهر في رابط التصنيف.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">الاسم</Label>
                <Input
                  id="category-name"
                  name="name"
                  defaultValue={editing?.name ?? ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-slug">المعرّف (Slug)</Label>
                <Input
                  id="category-slug"
                  name="slug"
                  defaultValue={editing?.slug ?? ""}
                  dir="ltr"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-description">الوصف</Label>
                <Textarea
                  id="category-description"
                  name="description"
                  defaultValue={editing?.description ?? ""}
                  rows={2}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category-seo-title">عنوان SEO</Label>
                  <Input
                    id="category-seo-title"
                    name="seoTitle"
                    defaultValue={editing?.seoTitle ?? ""}
                    maxLength={70}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category-order">الترتيب</Label>
                  <Input
                    id="category-order"
                    name="order"
                    type="number"
                    min={0}
                    defaultValue={editing?.order ?? 0}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-seo-description">وصف SEO</Label>
                <Textarea
                  id="category-seo-description"
                  name="seoDescription"
                  defaultValue={editing?.seoDescription ?? ""}
                  maxLength={170}
                  rows={2}
                />
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                إلغاء
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="animate-spin" aria-hidden="true" />}
                {editing ? "حفظ" : "إنشاء"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
