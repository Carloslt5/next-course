import { getPaginatedOrders } from "@/actions/order/get-paginated-orders";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { Title } from "@/components/ui/Title";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const { status, orders = [] } = await getPaginatedOrders();

  if (!status) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Setting Products" />

      <div className="mb-10">
        <OrdersTable orders={orders} />
        {/* Add Pagination */}
      </div>
    </>
  );
}
