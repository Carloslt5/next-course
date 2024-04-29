import { ProductsInCartCheckout } from "@/components/checkout/ProductsInCart";
import { Title } from "@/components/ui/Title";
import { initialData } from "@/seed/seed";
import Link from "next/link";

const productInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

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

          <div className="flex flex-col bg-white shadow-md rounded-md p-4 gap-10">
            <div>
              <h2 className="mb-2 text-2xl font-bold">Delivery address</h2>
              <article>
                <p className="text-2xl">Name Last name</p>
                <p>Address</p>
                <p>City</p>
                <p>Country</p>
                <p>ZIP code</p>
                <p>phone</p>
              </article>
            </div>
            <hr />
            <div>
              <h2 className="mb-2 text-2xl font-bold">Order Summary</h2>
              <article className="grid grid-cols-2">
                <span>Product Nº</span>
                <span className="text-right">Quantity</span>

                <span>Subtotal</span>
                <span className="text-right">$100</span>

                <span>Taxes 15%</span>
                <span className="text-right">$100</span>

                <span className="mt-5 font-bold text-xl ">Total:</span>
                <span className="mt-5 font-bold text-xl text-right">$100</span>
              </article>
            </div>

            <Link href={"/orders/123"} className="flex justify-center btn-primary mt-5">
              Place order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
