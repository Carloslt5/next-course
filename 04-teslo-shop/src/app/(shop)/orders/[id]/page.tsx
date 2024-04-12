import { Title } from "@/components/ui/Title";
import { PAID } from "@/constants/OrderStatus.const";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import { IoCardOutline } from "react-icons/io5";

const productInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

type OrderPageProps = {
  params: {
    id: string;
  };
};

export default function OrderPage({ params }: OrderPageProps) {
  const { id } = params;
  return (
    <div className="flex justify-center items-center px-1 ">
      <div className="flex flex-col w-[1400px] ">
        <Title title={`Order #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div
              className={clsx(
                "flex gap-2 items-center rounded-lg py-2 px-3 text-xs font-bold text-white mb-2",
                {
                  "bg-red-300": false,
                  "bg-green-700": true,
                }
              )}
            >
              <IoCardOutline size={30} />
              {/* <span>{ PENDING_PAYMENT}t</span> */}
              <span>{PAID}</span>
            </div>

            {productInCart.map((product) => (
              <div key={product.slug} className="flex flex-row gap-2">
                <figure className=" w-1/3 max-w-[100px] bg-green-100 rounded-md overflow-hidden">
                  <Image
                    src={`/products/${product.images[0]}`}
                    width={120}
                    height={120}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    alt={product.title}
                    className="rounded-md"
                    priority
                  />
                </figure>
                <article className="w-2/3">
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </article>
              </div>
            ))}
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
            <div
              className={clsx(
                "flex gap-2 items-center rounded-lg py-2 px-3 text-xs font-bold text-white",
                {
                  "bg-red-300": false,
                  "bg-green-700": true,
                }
              )}
            >
              <IoCardOutline size={30} />
              {/* <span>{ PENDING_PAYMENT}</span> */}
              <span>{PAID}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
