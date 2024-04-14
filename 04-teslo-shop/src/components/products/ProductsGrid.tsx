import { Product } from "@/interfaces/product.type";
import { ProductGridItem } from "./ProductGridItem";

type ProductsGridProps = {
  products: Product[];
};

export const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductGridItem key={product.slug} product={product} />
      ))}
    </div>
  );
};
