export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions/products/products-pagination";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { Pagination } from "@/components/ui/Pagination";
import { Title } from "@/components/ui/Title";
import { Gender } from "@/interfaces/product.type";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type CategoryPageProps = {
  params: {
    gender: Gender;
  };
  searchParams: {
    page?: string;
  };
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { gender } = params;

  return {
    title: `${capitalizeFirstLetter(gender)}`,
    description: `All ${gender} products`,
    openGraph: {
      title: `${capitalizeFirstLetter(gender)}`,
      description: `All ${gender} products`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { currentPages, totalPages, products } = await getPaginatedProductsWithImages({
    page,
    gender,
  });

  if (products.length === 0) redirect(`/gender/${gender}`);

  const gendeLabels: Record<string, string> = {
    men: "Men",
    women: "Women",
    kid: "Kid",
    unisex: "All",
  };

  return (
    <>
      <Title
        title={`Articles for ${gendeLabels[gender]}`}
        subTitle={"All products"}
        className="mb-2"
      />
      <ProductsGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
