"use client";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

type QuantitySelectorProps = {
  quantity: number;
  onSelectedQuantity: (quantity: number) => void;
};

export const QuantitySelector = ({ quantity, onSelectedQuantity }: QuantitySelectorProps) => {
  const onQuantityChanged = (value: number) => {
    if (quantity + value < 1) return;
    onSelectedQuantity(quantity + value);
  };

  return (
    <div className="flex items-center">
      <button onClick={() => onQuantityChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-2 px-5 bg-gray-200 text-center rounded-sm">{quantity}</span>
      <button onClick={() => onQuantityChanged(+1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
