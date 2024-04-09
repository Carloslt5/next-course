import { ProductsGrid } from "@/components/products/ProductsGrid";
import { Title } from "@/components/ui/Title";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function Home() {
  return (
    <>
      <Title title={"Shop"} subTitle={"All products"} />
      <ProductsGrid products={products} />
    </>
  );
}
