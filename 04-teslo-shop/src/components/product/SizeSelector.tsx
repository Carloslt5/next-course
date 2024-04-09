import { type Size } from "@/interfaces/product.type";
import clsx from "clsx";

type SizeSelectorProps = {
  selectedSize: Size;
  availableSizes: Size[];
};

export const SizeSelector = ({ selectedSize, availableSizes }: SizeSelectorProps) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Available Sizes</h3>
      <div className="flex items-center gap-2">
        {availableSizes.map((size) => (
          <button
            key={size}
            className={clsx("mx hover:underline text-lg", {
              underline: size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
