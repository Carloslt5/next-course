import { ItemCard } from "@/components/ItemsCard";
import { WidgetItem } from "@/components/WidgetItem";
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
  const totalToPay = productsInCart.reduce(
    (prev, current) => current.product.price * current.quantity + prev,
    0
  );

  return (
    <>
      <h1 className="text-4xl">Product Cart</h1>
      <hr className="mb-2" />
      <div className="flex flex-col sm:flex-row gap-2 w-full ">
        <div className="flex flex-col gap-2 w-full sm:w-8/12 ">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
        <div className="flex flex-col bg-white p-2 rounded-lg w-full sm:w-4/12">
          <WidgetItem title="Total to pay">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold">${(totalToPay * 1.15).toFixed(2)}</h3>
            </div>
            <span className="font-bold text-center">
              Taxes 15%: ${(totalToPay * 0.15).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </>
  );
}
