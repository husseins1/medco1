"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";
import { serviceRoleClient } from "@/utils/supabase/service-role";
import { assertBlogOwner } from "@/lib/blog/owner";
import { blogCategorySchema, blogPostSchema } from "@/lib/schemas/blog";
import {
  BLOG_BUCKET,
  BLOG_COVER_MAX_BYTES,
  BLOG_COVER_MIME_TYPES,
  DEFAULT_AUTHOR_NAME,
} from "@/lib/blog/constants";
import { calculateReadingTime, deriveExcerpt, parseTags } from "@/lib/blog/utils";

export type ActionResult = { success: true } | { error: string };

function field(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  if (typeof value !== "string") return null;
  return value.trim().length > 0 ? value.trim() : null;
}

function checked(formData: FormData, key: string): boolean {
  const value = formData.get(key);
  return value === "true" || value === "on" || value === "1";
}

function revalidateBlog(slug?: string) {
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/blog/${slug}`);
}

function extensionFor(mimeType: string): string {
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/webp") return "webp";
  if (mimeType === "image/avif") return "avif";
  return "jpg";
}

async function uploadCover(
  file: File
): Promise<{ url: string; path: string } | { error: string }> {
  if (!(BLOG_COVER_MIME_TYPES as readonly string[]).includes(file.type)) {
    return { error: "نوع الصورة غير مدعوم (JPG، PNG، WebP، AVIF)." };
  }
  if (file.size > BLOG_COVER_MAX_BYTES) {
    return { error: "حجم الصورة يتجاوز 5 ميجابايت." };
  }

  const path = `covers/${crypto.randomUUID()}.${extensionFor(file.type)}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await serviceRoleClient.storage
    .from(BLOG_BUCKET)
    .upload(path, buffer, { contentType: file.type, upsert: true });

  if (error) {
    return { error: `فشل رفع الصورة: ${error.message}` };
  }

  const { data } = serviceRoleClient.storage.from(BLOG_BUCKET).getPublicUrl(path);

  return { url: data.publicUrl, path };
}

async function removeCover(path: string | null) {
  if (!path) return;
  const { error } = await serviceRoleClient.storage.from(BLOG_BUCKET).remove([path]);
  if (error) console.error("Failed to remove blog cover:", error.message);
}

export async function createPostAction(formData: FormData): Promise<ActionResult> {
  const auth = await assertBlogOwner();
  if (!auth.ok) return { error: auth.error };

  const parsed = blogPostSchema.safeParse({
    title: field(formData, "title") ?? "",
    slug: field(formData, "slug") ?? "",
    excerpt: field(formData, "excerpt") ?? undefined,
    content: field(formData, "content") ?? "",
    categoryId: field(formData, "categoryId") ?? undefined,
    tags: parseTags(field(formData, "tags")),
    status: field(formData, "status") ?? "DRAFT",
    publishedAt: field(formData, "publishedAt") ?? undefined,
    seoTitle: field(formData, "seoTitle") ?? undefined,
    seoDescription: field(formData, "seoDescription") ?? undefined,
    canonicalUrl: field(formData, "canonicalUrl") ?? undefined,
    noIndex: checked(formData, "noIndex"),
    authorName: field(formData, "authorName") ?? undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "بيانات غير صالحة." };
  }

  const data = parsed.data;
  const cover = formData.get("cover");

  let coverImage: string | undefined;
  let coverImagePath: string | undefined;
  if (cover instanceof File && cover.size > 0) {
    const uploaded = await uploadCover(cover);
    if ("error" in uploaded) return uploaded;
    coverImage = uploaded.url;
    coverImagePath = uploaded.path;
  }

  const publishedAt =
    data.status === "PUBLISHED" ? (data.publishedAt ?? new Date()) : data.publishedAt ?? null;

  try {
    await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt ?? deriveExcerpt(data.content),
        content: data.content,
        coverImage,
        coverImagePath,
        status: data.status,
        publishedAt,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        canonicalUrl: data.canonicalUrl,
        noIndex: data.noIndex ?? false,
        readingTimeMin: calculateReadingTime(data.content),
        tags: data.tags ?? [],
        authorName: data.authorName ?? DEFAULT_AUTHOR_NAME,
        categoryId: data.categoryId,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "المعرّف (slug) مستخدم بالفعل. اختر معرّفاً آخر." };
    }
    console.error("createPostAction failed:", error);
    return { error: "تعذّر إنشاء المقال." };
  }

  revalidateBlog(data.slug);
  return { success: true };
}

export async function updatePostAction(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const auth = await assertBlogOwner();
  if (!auth.ok) return { error: auth.error };
  

  const existing = await prisma.blogPost.findUnique({
    where: { id },
    select: { coverImagePath: true },
  });
  if (!existing) return { error: "المقال غير موجود." };

  const parsed = blogPostSchema.safeParse({
    title: field(formData, "title") ?? "",
    slug: field(formData, "slug") ?? "",
    excerpt: field(formData, "excerpt") ?? undefined,
    content: field(formData, "content") ?? "",
    categoryId: field(formData, "categoryId") ?? undefined,
    tags: parseTags(field(formData, "tags")),
    status: field(formData, "status") ?? "DRAFT",
    publishedAt: field(formData, "publishedAt") ?? undefined,
    seoTitle: field(formData, "seoTitle") ?? undefined,
    seoDescription: field(formData, "seoDescription") ?? undefined,
    canonicalUrl: field(formData, "canonicalUrl") ?? undefined,
    noIndex: checked(formData, "noIndex"),
    authorName: field(formData, "authorName") ?? undefined,

  });
  

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "بيانات غير صالحة." };
  }

  const data = parsed.data;
  const cover = formData.get("cover");
  const removeCoverFlag = field(formData, "removeCover") === "true";

  let coverImage: string | null | undefined;
  let coverImagePath: string | null | undefined;

  if (cover instanceof File && cover.size > 0) {
    const uploaded = await uploadCover(cover);
    if ("error" in uploaded) return uploaded;
    coverImage = uploaded.url;
    coverImagePath = uploaded.path;
    await removeCover(existing.coverImagePath);
  } else if (removeCoverFlag) {
    coverImage = null;
    coverImagePath = null;
    await removeCover(existing.coverImagePath);
  }

  const publishedAt =
    data.status === "PUBLISHED" ? (data.publishedAt ?? new Date()) : data.publishedAt ?? null;

  try {
    await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt ?? deriveExcerpt(data.content),
        content: data.content,
        status: data.status,
        publishedAt,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        canonicalUrl: data.canonicalUrl,
        noIndex: data.noIndex ?? false,
        readingTimeMin: calculateReadingTime(data.content),
        tags: data.tags ?? [],
        authorName: data.authorName ?? DEFAULT_AUTHOR_NAME,
        categoryId: data.categoryId,
        ...(coverImage !== undefined ? { coverImage } : {}),
        ...(coverImagePath !== undefined ? { coverImagePath } : {}),
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "المعرّف (slug) مستخدم بالفعل. اختر معرّفاً آخر." };
    }
    console.error("updatePostAction failed:", error);
    return { error: "تعذّر تحديث المقال." };
  }

  revalidateBlog(data.slug);
  revalidatePath(`/cms/posts/${id}`);
  return { success: true };
}

export async function deletePostAction(id: string): Promise<ActionResult> {
  const auth = await assertBlogOwner();
  if (!auth.ok) return { error: auth.error };

  const post = await prisma.blogPost.findUnique({
    where: { id },
    select: { slug: true, coverImagePath: true },
  });
  if (!post) return { error: "المقال غير موجود." };

  try {
    await prisma.blogPost.delete({ where: { id } });
    await removeCover(post.coverImagePath);
  } catch (error) {
    console.error("deletePostAction failed:", error);
    return { error: "تعذّر حذف المقال." };
  }

  revalidateBlog(post.slug);
  revalidatePath("/cms");
  return { success: true };
}

export async function createCategoryAction(
  formData: FormData
): Promise<ActionResult> {
  const auth = await assertBlogOwner();
  if (!auth.ok) return { error: auth.error };

  const parsed = blogCategorySchema.safeParse({
    name: field(formData, "name") ?? "",
    slug: field(formData, "slug") ?? "",
    description: field(formData, "description") ?? undefined,
    seoTitle: field(formData, "seoTitle") ?? undefined,
    seoDescription: field(formData, "seoDescription") ?? undefined,
    order: field(formData, "order") ?? undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "بيانات غير صالحة." };
  }

  try {
    await prisma.blogCategory.create({
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        description: parsed.data.description,
        seoTitle: parsed.data.seoTitle,
        seoDescription: parsed.data.seoDescription,
        order: parsed.data.order ?? 0,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "المعرّف (slug) مستخدم بالفعل." };
    }
    console.error("createCategoryAction failed:", error);
    return { error: "تعذّر إنشاء التصنيف." };
  }

  revalidateBlog();
  revalidatePath("/cms/categories");
  return { success: true };
}

export async function updateCategoryAction(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const auth = await assertBlogOwner();
  if (!auth.ok) return { error: auth.error };

  const parsed = blogCategorySchema.safeParse({
    name: field(formData, "name") ?? "",
    slug: field(formData, "slug") ?? "",
    description: field(formData, "description") ?? undefined,
    seoTitle: field(formData, "seoTitle") ?? undefined,
    seoDescription: field(formData, "seoDescription") ?? undefined,
    order: field(formData, "order") ?? undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "بيانات غير صالحة." };
  }

  try {
    await prisma.blogCategory.update({
      where: { id },
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        description: parsed.data.description,
        seoTitle: parsed.data.seoTitle,
        seoDescription: parsed.data.seoDescription,
        order: parsed.data.order ?? 0,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "المعرّف (slug) مستخدم بالفعل." };
    }
    console.error("updateCategoryAction failed:", error);
    return { error: "تعذّر تحديث التصنيف." };
  }

  revalidateBlog();
  revalidatePath("/cms/categories");
  return { success: true };
}

export async function deleteCategoryAction(id: string): Promise<ActionResult> {
  const auth = await assertBlogOwner();
  if (!auth.ok) return { error: auth.error };

  try {
    await prisma.blogCategory.delete({ where: { id } });
  } catch (error) {
    console.error("deleteCategoryAction failed:", error);
    return { error: "تعذّر حذف التصنيف." };
  }

  revalidateBlog();
  revalidatePath("/cms/categories");
  return { success: true };
}
