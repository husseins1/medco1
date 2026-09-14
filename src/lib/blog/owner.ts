import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

/**
 * The blog CMS is intentionally local-only: it is disabled in production and
 * only the verified Supabase user whose email matches CMS_OWNER_EMAIL may use it.
 *
 * This is deliberately decoupled from the tenant/Profile RBAC model because the
 * blog is personal marketing content that belongs to the landing page, not to a
 * clinic tenant.
 */

export interface BlogOwner {
  id: string;
  email: string;
}

export function isCmsEnabled(): boolean {
  return process.env.NODE_ENV !== "production";
}

/** Returns the signed-in blog owner, or null when not authorized/enabled. */
export async function getBlogOwner(): Promise<BlogOwner | null> {
  if (!isCmsEnabled()) return null;

  const ownerEmail = process.env.CMS_OWNER_EMAIL;
  if (!ownerEmail) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;
  if (user.email.toLowerCase() !== ownerEmail.toLowerCase()) return null;

  return { id: user.id, email: user.email };
}

/** Page/layout guard — renders a 404 when the CMS is not accessible. */
export async function requireBlogOwner(): Promise<BlogOwner> {
  const owner = await getBlogOwner();
  if (!owner) notFound();
  return owner;
}

/** Server-action guard — returns a typed result instead of throwing. */
export async function assertBlogOwner(): Promise<
  { ok: true; owner: BlogOwner } | { ok: false; error: string }
> {
  if (!isCmsEnabled()) {
    return { ok: false, error: "لوحة التحكم غير متاحة في بيئة الإنتاج." };
  }
  const owner = await getBlogOwner();
  if (!owner) {
    return { ok: false, error: "غير مصرح." };
  }
  return { ok: true, owner };
}
