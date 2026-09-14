import { notFound } from "next/navigation";

import { PostForm } from "@/components/blog/cms/post-form";
import { getAdminPostById, getAllCategories } from "@/lib/blog/queries";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [post, categories] = await Promise.all([
    getAdminPostById(id),
    getAllCategories(),
  ]);

  if (!post) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        تعديل المقال
      </h1>
      <PostForm
        post={post}
        categories={categories.map((category) => ({
          id: category.id,
          name: category.name,
        }))}
      />
    </div>
  );
}
