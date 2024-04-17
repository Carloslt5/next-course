import { OrderSummaryInfo } from "@/components/cart/OrderSummaryInfo";
import { ProductsInCart } from "@/components/cart/ProductsInCart";
import { Title } from "@/components/ui/Title";
import Link from "next/link";

export const metadata = {
  title: "Your cart",
  description: "Explore the products in your cart and complete your purchase",
};

export default function CartPage() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-[1400px]">
        <Title title={"Cart"} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="text-lg">Add more products</span>
              <Link href={"/"} className="underline cursor-pointer mb-5">
                Continue shopping
              </Link>
            </div>

            <ProductsInCart />
          </div>

          <div className="flex flex-col bg-white shadow-md rounded-md p-4 h-fit">
            <OrderSummaryInfo />

            <Link href={"/checkout/address"} className="flex justify-center btn-primary mt-5">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
