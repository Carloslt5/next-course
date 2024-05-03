import { getOrderByID } from "@/actions/order/get-order-by-id";
import { OrdersStatus } from "@/components/orders/OrdersStatus";
import { PaypalButton } from "@/components/paypal/PaypalButton";
import { Title } from "@/components/ui/Title";
import { currencyFormat } from "@/utils/currencyFormat";
import Image from "next/image";
import { redirect } from "next/navigation";

type OrderPageProps = {
  params: {
    id: string;
  };
};

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = params;

  const { status, order } = await getOrderByID(id);

  if (!status) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center px-1 ">
      <div className="flex flex-col w-[1400px] ">
        <Title title={`Order #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <OrdersStatus isPaid={order!.isPaid} />

            {order?.OrderItem.map((item) => (
              <div key={item.product.slug + "-" + item.size} className="flex flex-row gap-2">
                <figure className=" w-1/3 max-w-[100px] bg-green-100 rounded-md overflow-hidden">
                  <Image
                    src={`/products/${item.product.ProductImage[0].url}`}
                    width={120}
                    height={120}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    alt={item.product.title}
                    className="rounded-md"
                    priority
                  />
                </figure>
                <article className="w-2/3">
                  <p>{item.product.title}</p>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: ${currencyFormat(item.price * item.quantity)}
                  </p>
                </article>
              </div>
            ))}
          </div>

          <div className="flex flex-col bg-white shadow-md rounded-md p-4 gap-10">
            <div>
              <h2 className="mb-2 text-2xl font-bold">Delivery address</h2>
              <article>
                <p className="text-2xl">
                  {order?.OrderAddress?.name} {order?.OrderAddress?.lastName}
                </p>
                <p>{order?.OrderAddress?.address}</p>
                <p>{order?.OrderAddress?.city}</p>
                <p>
                  {order?.OrderAddress?.city}, {order?.OrderAddress?.countryId}
                </p>
                <p>{order?.OrderAddress?.zipCode}</p>
                <p>{order?.OrderAddress?.phone}</p>
              </article>
            </div>
            <hr />
            <div>
              <h2 className="mb-2 text-2xl font-bold">Order Summary</h2>
              <article className="grid grid-cols-2">
                <span>Product Nº</span>
                <span className="text-right">{order?.itemsInOrder} items</span>

                <span>Subtotal</span>
                <span className="text-right">{currencyFormat(order!.subTotal)}</span>

                <span>Taxes 15%</span>
                <span className="text-right">{currencyFormat(order!.tax)}</span>

                <span className="mt-5 font-bold text-xl ">Total:</span>
                <span className="mt-5 font-bold text-xl text-right">
                  {currencyFormat(order!.total)}
                </span>
              </article>
            </div>

            {order?.isPaid ? (
              <OrdersStatus isPaid={order!.isPaid} />
            ) : (
              <PaypalButton orderId={order!.id} amount={order!.total} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
