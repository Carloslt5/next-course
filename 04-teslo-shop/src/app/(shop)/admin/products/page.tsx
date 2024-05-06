import { getPaginatedProductsWithImages } from "@/actions/products/products-pagination";
import { ProductsTable } from "@/components/products/ProductsTable";
import { Pagination } from "@/components/ui/Pagination";
import { Title } from "@/components/ui/Title";
import Link from "next/link";

type ProductsPageProps = {
  searchParams: {
    page?: string;
  };
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { currentPages, totalPages, products } = await getPaginatedProductsWithImages({ page });

  return (
    <>
      <Title title="Setting Products" />
      <div className="flex justify-end mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          New Product
        </Link>
      </div>
      <div className="mb-10">
        <ProductsTable products={products} />
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
