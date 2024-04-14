import { getPaginatedProductsWithImages } from "@/actions/products-pagination";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { Title } from "@/components/ui/Title";
import { redirect } from "next/navigation";

type HomeProps = {
  searchParams: {
    page?: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { currentPages, totalPages, products } = await getPaginatedProductsWithImages({ page });
  console.log("🚀 --------- currentPages", currentPages, totalPages);

  if (products.length === 0) redirect("/");

  return (
    <>
      <Title title={"Shop"} subTitle={"All products"} className="mb-2" />
      <ProductsGrid products={products} />
    </>
  );
}
