export const revalidate = 604800; //7 days

import { getProductBySlug } from "@/actions/get-product-by-slug";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { SizeSelector } from "@/components/product/SizeSelector";
import { ProductMobileSlideshow } from "@/components/product/Slideshow/ProductMobileSlideshow";
import { ProductSlideshow } from "@/components/product/Slideshow/ProductSlideshow";
import { StockLabel } from "@/components/product/StockLabel";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.title ?? "Product not found",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Product not found",
      description: product?.description ?? "",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      <div className="col-span-1 md:col-span-2">
        <ProductMobileSlideshow
          images={product.images}
          title={product.title}
          className="block md:hidden"
        />
        <ProductSlideshow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
      </div>

      <div className="col-span-1">
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
        <p className="text-lg mb-5">${product.price}</p>

        <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />
        <QuantitySelector quantity={2} />

        <button className="btn-primary my-5">Add to cart</button>
        <h1 className="font-bold text-sm">Description</h1>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
