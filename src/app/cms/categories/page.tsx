import { CategoryManager } from "@/components/blog/cms/category-manager";
import { getAllCategories } from "@/lib/blog/queries";

export default async function CmsCategoriesPage() {
  const categories = await getAllCategories();

  return (
    <CategoryManager
      categories={categories.map(({ _count, ...category }) => ({
        ...category,
        postCount: _count.posts,
      }))}
    />
  );
}
