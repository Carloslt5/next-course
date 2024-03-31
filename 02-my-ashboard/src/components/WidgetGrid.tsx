"use client";
import { useAppSelector } from "@/stores";
import { IoCafeOutline } from "react-icons/io5";
import { SimpleWidget } from "./SimpleWidget";

export const WidgetGrid = () => {
  const count = useAppSelector((state) => state.counter.count);
  return (
    <div className="flex flex-wrap gap-2">
      <SimpleWidget
        title={"Counter"}
        subtitle={"Counter"}
        icon={<IoCafeOutline size={40} />}
        value={`${count}`}
        href={"/dashboard/counter"}
      />
    </div>
  );
};
