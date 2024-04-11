import { QuantitySelector } from "@/components/product/QuantitySelector";
import { Title } from "@/components/ui/Title";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-1">
      <div className="flex flex-col w-[1400px] bg-slate-400">
        <Title title={"Cart"} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col mt-5">
            <span className="text-lg">Add more products</span>
            <Link href={"/"} className="underline cursor-pointer mb-5">
              Continue shopping
            </Link>

            {productInCart.map((product) => (
              <div key={product.slug} className="flex gap-3 mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                />
                <article>
                  <p className="font-bold">{product.title}</p>
                  <p>${product.price}</p>
                  <QuantitySelector quantity={3} />
                  <button className="text-red-900 underline">Remove</button>
                </article>
              </div>
            ))}
          </div>

          <div className="flex flex-col bg-white shadow-md rounded-md p-4">
            <h2 className="mb-2 text-2xl">Order Summary</h2>

            <div className="grid grid-cols-2">
              <span>Product Nº</span>
              <span className="text-right">Quantity</span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span>Taxes 15%</span>
              <span className="text-right">$100</span>

              <span className="mt-5 font-bold text-xl ">Total:</span>
              <span className="mt-5 font-bold text-xl text-right">$100</span>
            </div>
            <Link href={"/checkout/address"} className="flex justify-center btn-primary mt-5">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
