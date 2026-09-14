"use client";

import { useRef, useState, useTransition } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ImagePlus, Loader2, Save, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Textarea } from "@/components/ui/Textarea";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { createPostAction, updatePostAction } from "@/app/cms/actions";
import type { BlogPostAdminDTO } from "@/lib/blog/types";
import { BLOG_COVER_MAX_BYTES } from "@/lib/blog/constants";
import { isValidBlogSlug } from "@/lib/blog/utils";

interface PostFormProps {
  post?: BlogPostAdminDTO;
  categories: { id: string; name: string }[];
}

function toLocalInputValue(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function PostForm({ post, categories }: PostFormProps) {
  const router = useRouter();
  const isEdit = Boolean(post);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [coverPreview, setCoverPreview] = useState<string | null>(
    post?.coverImage ?? null
  );
  const [removeCover, setRemoveCover] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleCoverChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > BLOG_COVER_MAX_BYTES) {
      toast.error("حجم الصورة يتجاوز 5 ميجابايت.");
      event.target.value = "";
      return;
    }
    setRemoveCover(false);
    setCoverPreview(URL.createObjectURL(file));
  }

  function clearCover() {
    setCoverPreview(null);
    setRemoveCover(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function generateSlug() {
    const generated = slugify(title);
    if (!generated) {
      toast.error("العنوان لا يحتوي على أحرف لاتينية. اكتب المعرّف يدوياً.");
      return;
    }
    setSlug(generated);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    formData.set("removeCover", removeCover ? "true" : "false");
    
    if (!isValidBlogSlug(slug)) {
      toast.error("المعرّف غير صالح: أحرف إنجليزية صغيرة وأرقام وشرطات فقط.");
      return;
    }

    startTransition(async () => {
      const result = isEdit
        ? await updatePostAction(post!.id, formData)
        : await createPostAction(formData);

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      toast.success(isEdit ? "تم حفظ التعديلات." : "تم إنشاء المقال.");
      if (isEdit) {
        router.refresh();
      } else {
        router.push("/cms");
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <div className="space-y-5">
        <section className="space-y-4 rounded-2xl border border-border bg-background p-5">
          <div className="space-y-2">
            <Label htmlFor="title">العنوان</Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="عنوان المقال"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">المعرّف (Slug)</Label>
            <div className="flex gap-2">
              <Input
                id="slug"
                name="slug"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                placeholder="my-post-slug"
                dir="ltr"
                required
              />
              <Button type="button" variant="outline" onClick={generateSlug}>
                توليد
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              يُستخدم في رابط المقال: /blog/{slug || "…"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">المقتطف</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              defaultValue={post?.excerpt ?? ""}
              rows={2}
              placeholder="وصف قصير يظهر في القائمة (اختياري)"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-background p-5">
          <Tabs defaultValue="write">
            <TabsList>
              <TabsTrigger value="write">المحتوى</TabsTrigger>
              <TabsTrigger value="preview">معاينة</TabsTrigger>
            </TabsList>
            <TabsContent value="write" className="mt-3">
              <Textarea
                id="content"
                name="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                rows={18}
                dir="ltr"
                className="font-mono text-sm"
                placeholder={"# عنوان\n\nاكتب المقال بصيغة Markdown…"}
                required
              />
            </TabsContent>
            <TabsContent value="preview" className="mt-3">
              <div className="min-h-40 rounded-xl border border-border bg-muted/20 p-5">
                {content.trim() ? (
                  <MarkdownContent content={content} />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    لا يوجد محتوى للمعاينة.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>

      <aside className="space-y-5">
        <section className="space-y-4 rounded-2xl border border-border bg-background p-5">
          <h2 className="font-heading text-sm font-semibold">النشر</h2>

          <div className="space-y-2">
            <Label htmlFor="status">الحالة</Label>
            <Select name="status" defaultValue={post?.status ?? "DRAFT"}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">مسودة</SelectItem>
                <SelectItem value="PUBLISHED">منشور</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="publishedAt">تاريخ النشر</Label>
            <Input
              id="publishedAt"
              name="publishedAt"
              type="datetime-local"
              defaultValue={toLocalInputValue(post?.publishedAt ?? null)}
            />
            <p className="text-xs text-muted-foreground">
              اتركه فارغاً للنشر الفوري، أو حدّد تاريخاً مستقبلياً للنشر المجدول.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryId">التصنيف</Label>
            <Select
              name="categoryId"
              defaultValue={post?.categoryId ?? "none"}
            >
              <SelectTrigger id="categoryId" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">بدون تصنيف</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">الوسوم</Label>
            <Input
              id="tags"
              name="tags"
              defaultValue={post?.tags.join(", ") ?? ""}
              placeholder="مواعيد، تذكيرات، إدارة"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="authorName">الكاتب</Label>
            <Input
              id="authorName"
              name="authorName"
              defaultValue={post?.authorName ?? "طبيب تري"}
            />
          </div>
        </section>

        <section className="space-y-3 rounded-2xl border border-border bg-background p-5">
          <h2 className="font-heading text-sm font-semibold">صورة الغلاف</h2>

          {coverPreview && (
            <div className="relative overflow-hidden rounded-xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverPreview}
                alt="معاينة الغلاف"
                className="aspect-16/9 w-full object-cover"
              />
              <button
                type="button"
                onClick={clearCover}
                className="absolute top-2 end-2 rounded-full bg-background/90 p-1.5 text-foreground shadow-sm hover:bg-background"
                aria-label="إزالة الصورة"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          )}

          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-border py-8 text-center text-sm text-muted-foreground hover:bg-muted/30">
            <ImagePlus className="size-6" aria-hidden="true" />
            {coverPreview
              ? "تغيير الصورة"
              : "اختر صورة (JPG، PNG، WebP، AVIF)"}
            <input
              ref={fileInputRef}
              type="file"
              name="cover"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleCoverChange}
              className="sr-only"
            />
          </label>
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-background p-5">
          <h2 className="font-heading text-sm font-semibold">تحسين محركات البحث</h2>

          <div className="space-y-2">
            <Label htmlFor="seoTitle">عنوان SEO</Label>
            <Input
              id="seoTitle"
              name="seoTitle"
              defaultValue={post?.seoTitle ?? ""}
              maxLength={70}
              placeholder="يُفضّل ألا يتجاوز 60 حرفاً"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seoDescription">وصف SEO</Label>
            <Textarea
              id="seoDescription"
              name="seoDescription"
              defaultValue={post?.seoDescription ?? ""}
              maxLength={170}
              rows={3}
              placeholder="وصف يظهر في نتائج البحث"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="canonicalUrl">الرابط الأساسي (Canonical)</Label>
            <Input
              id="canonicalUrl"
              name="canonicalUrl"
              type="url"
              dir="ltr"
              defaultValue={post?.canonicalUrl ?? ""}
              placeholder="https://..."
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <Checkbox name="noIndex" defaultChecked={post?.noIndex ?? false} />
            عدم فهرسة الصفحة في محركات البحث
          </label>
        </section>

        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-brand text-brand-foreground hover:bg-brand/90"
          >
            {isPending ? (
              <Loader2 className="animate-spin" aria-hidden="true" />
            ) : (
              <Save aria-hidden="true" />
            )}
            {isEdit ? "حفظ التعديلات" : "إنشاء المقال"}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/cms">إلغاء</Link>
          </Button>
        </div>
      </aside>
    </form>
  );
}
