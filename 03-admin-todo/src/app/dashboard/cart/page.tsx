import { ItemCard } from "@/components/ItemsCard";
import { Product, products } from "@/data/products";
import { cookies } from "next/headers";

export const metadata = {
  title: "Cart",
  description: "Shopping Cart",
};

type ProducsInCart = {
  product: Product;
  quantity: number;
};

const getProductsInCart = (cart: { [id: string]: number }): ProducsInCart[] => {
  let productsInCart: ProducsInCart[] = [];

  for (const id of Object.keys(cart)) {
    const product = products.find((product) => product.id === id);
    if (product) {
      productsInCart.push({ product: product, quantity: cart[id] });
    }
  }

  return productsInCart;
};

export default function CartPage() {
  const cookieStore = cookies();
  const cart = JSON.parse(cookieStore.get("cart")?.value ?? "{}");
  const productsInCart = getProductsInCart(cart);

  return (
    <>
      <h1 className="text-4xl">Product Cart</h1>
      <hr className="mb-2" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-fill">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
      </div>
    </>
  );
}
