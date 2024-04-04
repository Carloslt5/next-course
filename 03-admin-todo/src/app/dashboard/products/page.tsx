import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export const metadata = {
  title: "Products",
  description: "Products List",
};

export default function ProductsPage() {
  return (
    <>
      <h1>Products Page</h1>
      <div className="grid gris-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 ">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
