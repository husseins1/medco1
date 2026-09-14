import Link from "next/link";
import { FileText, Plus } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { formatDateTime } from "@/lib/date-utils";
import { getAdminPosts, getPublishedCategoriesWithCounts } from "@/lib/blog/queries";
import { DeletePostButton } from "@/components/blog/cms/delete-post-button";

export default async function CmsHomePage() {
  const [posts, categories] = await Promise.all([
    getAdminPosts(),
    getPublishedCategoriesWithCounts(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            المقالات
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {posts.length} مقال · {categories.length} تصنيف
          </p>
        </div>
        <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90">
          <Link href="/cms/posts/new">
            <Plus aria-hidden="true" />
            مقال جديد
          </Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-background py-16 text-center">
          <FileText className="size-8 text-muted-foreground" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">لا توجد مقالات بعد.</p>
          <Button variant="outline" asChild>
            <Link href="/cms/posts/new">اكتب أول مقال</Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>العنوان</TableHead>
                <TableHead>التصنيف</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>تاريخ النشر</TableHead>
                <TableHead>آخر تحديث</TableHead>
                <TableHead className="text-end">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="max-w-xs font-medium">
                    <Link
                      href={`/cms/posts/${post.id}`}
                      className="line-clamp-1 hover:text-brand"
                    >
                      {post.title}
                    </Link>
                    <span className="block text-xs text-muted-foreground">
                      /{post.slug}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {post.category?.name ?? "—"}
                  </TableCell>
                  <TableCell>
                    {post.status === "PUBLISHED" ? (
                      <Badge variant="success">منشور</Badge>
                    ) : (
                      <Badge variant="warning">مسودة</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {post.publishedAt ? formatDateTime(post.publishedAt) : "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDateTime(post.updatedAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/cms/posts/${post.id}`}>تعديل</Link>
                      </Button>
                      <DeletePostButton id={post.id} title={post.title} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
