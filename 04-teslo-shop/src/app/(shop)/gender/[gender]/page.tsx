import { getPaginatedProductsWithImages } from "@/actions/products-pagination";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { Pagination } from "@/components/ui/Pagination";
import { Title } from "@/components/ui/Title";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

type CategoryPageProps = {
  params: {
    gender: Gender;
  };
  searchParams: {
    page?: string;
  };
};

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { currentPages, totalPages, products } = await getPaginatedProductsWithImages({
    page,
    gender,
  });

  if (products.length === 0) redirect(`/gender/${gender}`);

  // if (id === "kids") {
  //   notFound();
  // }

  const gendeLabels: Record<string, string> = {
    men: "Men",
    women: "Women",
    kid: "Kid",
    unisex: "All",
  };

  return (
    <>
      <Title
        title={`Articles for 
        ${gendeLabels[gender]}`}
        subTitle={"All products"}
        className="mb-2"
      />
      <ProductsGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
