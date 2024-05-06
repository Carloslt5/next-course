import { getCategories } from "@/actions/category/get-categories";
import { getProductBySlug } from "@/actions/product/get-product-by-slug";
import { ProductForm } from "@/components/product/ProductForm";
import { Title } from "@/components/ui/Title";
import { redirect } from "next/navigation";

type ProductPageProps = {
  params: {
    slug: string;
  };
};
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;

  const [product, categories] = await Promise.all([getProductBySlug(slug), getCategories()]);

  if (!product) {
    redirect("admin/products");
  }

  const title = slug === "new" ? "New product" : "Edit product";

  return (
    <>
      <Title title={title} />
      <ProductForm product={product} categories={categories} />
    </>
  );
}
