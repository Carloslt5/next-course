import { ProductsGrid } from "@/components/products/ProductsGrid";
import { Title } from "@/components/ui/Title";
import { Category } from "@/interfaces/product.type";
import { initialData } from "@/seed/seed";

const seedProducts = initialData.products;

type CategoryPageProps = {
  params: {
    id: Category;
  };
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = params;
  const products = seedProducts.filter((prodduct) => prodduct.gender === id);

  // if (id === "kids") {
  //   notFound();
  // }

  const gendeLabels: Record<Category, string> = {
    men: "Men",
    women: "Women",
    kid: "Kid",
    unisex: "All",
  };

  return (
    <>
      <Title
        title={`Articles for 
        ${gendeLabels[id]}`}
        subTitle={"All products"}
        className="mb-2"
      />
      <ProductsGrid products={products} />
    </>
  );
}
