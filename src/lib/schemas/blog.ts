import { z } from "zod";
import { BLOG_SLUG_REGEX } from "@/lib/blog/constants";

const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(
    BLOG_SLUG_REGEX,
    "المعرّف يجب أن يحتوي على أحرف إنجليزية صغيرة وأرقام وشرطات فقط"
  );

export const blogPostSchema = z.object({
  title: z.string().trim().min(1, "عنوان المقال مطلوب").max(200, "العنوان طويل جداً"),
  slug: slugSchema,
  excerpt: z.string().trim().max(300, "المقتطف طويل جداً").optional(),
  content: z.string().trim().min(1, "محتوى المقال مطلوب"),
  categoryId: z.string().uuid("التصنيف غير صالح").optional(),
  tags: z.array(z.string().trim().min(1).max(40)).max(12, "عدد الوسوم كبير").optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  publishedAt: z.coerce.date().optional(),
  seoTitle: z.string().trim().max(70, "عنوان SEO طويل جداً").optional(),
  seoDescription: z.string().trim().max(170, "وصف SEO طويل جداً").optional(),
  canonicalUrl: z.string().url("الرابط غير صالح").optional(),
  noIndex: z.boolean().optional(),
  authorName: z.string().trim().max(120, "اسم الكاتب طويل جداً").optional(),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

export const blogCategorySchema = z.object({
  name: z.string().trim().min(1, "اسم التصنيف مطلوب").max(100, "الاسم طويل جداً"),
  slug: slugSchema,
  description: z.string().trim().max(300, "الوصف طويل جداً").optional(),
  seoTitle: z.string().trim().max(70, "عنوان SEO طويل جداً").optional(),
  seoDescription: z.string().trim().max(170, "وصف SEO طويل جداً").optional(),
  order: z.coerce.number().int("الترتيب يجب أن يكون رقماً").min(0).optional(),
});

export type BlogCategoryInput = z.infer<typeof blogCategorySchema>;
