import { Product } from "@/interfaces/product.type";

type ProductsGridProps = {
  products: Product[];
};
export const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {products.map((product) => (
        <span key={product.slug}>{product.title}</span>
      ))}
    </div>
  );
};
