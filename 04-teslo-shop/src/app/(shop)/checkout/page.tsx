import { PlaceOrder } from "@/components/checkout/PlaceOrder";
import { ProductsInCartCheckout } from "@/components/checkout/ProductsInCart";
import { Title } from "@/components/ui/Title";
import Link from "next/link";

export default function CheackoutPage() {
  return (
    <div className="flex justify-center items-center px-1">
      <div className="flex flex-col w-[1400px] ">
        <Title title={"Verify order"} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="text-lg">Adjust products</span>
              <Link href={"/cart"} className="underline cursor-pointer mb-5">
                Edit cart
              </Link>
            </div>

            <ProductsInCartCheckout />
          </div>

          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
