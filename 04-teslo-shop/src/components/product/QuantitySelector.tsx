"use client";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

type QuantitySelectorProps = {
  quantity: number;
};

export const QuantitySelector = ({ quantity }: QuantitySelectorProps) => {
  const [count, setCount] = useState(quantity);

  const onQuantityChanged = (value: number) => {
    if (count + value < 1) return;
    setCount(count + value);
  };

  return (
    <div className="flex items-center">
      <button onClick={() => onQuantityChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-2 px-5 bg-gray-200 text-center rounded-sm">{count}</span>
      <button onClick={() => onQuantityChanged(+1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
