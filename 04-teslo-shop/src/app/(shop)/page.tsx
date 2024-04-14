import { getPaginatedProductsWithImages } from "@/actions/products-pagination";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { Title } from "@/components/ui/Title";

export default async function Home() {
  const { products } = await getPaginatedProductsWithImages();

  return (
    <>
      <Title title={"Shop"} subTitle={"All products"} className="mb-2" />
      <ProductsGrid products={products} />
    </>
  );
}
