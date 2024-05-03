import { PAID, PENDING_PAYMENT } from "@/constants/OrderStatus.const";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

type OrdersStatusProps = {
  isPaid: boolean;
};

export const OrdersStatus = ({ isPaid }: OrdersStatusProps) => {
  return (
    <div
      className={clsx(
        "flex gap-2 items-center rounded-lg py-2 px-3 text-xs font-bold text-white mb-2",
        {
          "bg-red-500": !isPaid,
          "bg-green-700": isPaid,
        }
      )}
    >
      <IoCardOutline size={30} />
      <span>{isPaid ? PAID : PENDING_PAYMENT}</span>
    </div>
  );
};
