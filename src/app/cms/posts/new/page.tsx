import { PostForm } from "@/components/blog/cms/post-form";
import { getAllCategories } from "@/lib/blog/queries";

export default async function NewPostPage() {
  const categories = await getAllCategories();

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">مقال جديد</h1>
      <PostForm
        categories={categories.map((category) => ({
          id: category.id,
          name: category.name,
        }))}
      />
    </div>
  );
}
