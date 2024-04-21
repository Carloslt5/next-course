"use client";

import { getStockBySlug } from "@/actions/product/get-stock-by-slug";
import { titleFont } from "@/config/fonts";
import { useCallback, useEffect, useState } from "react";

type StockLabelProps = {
  slug: string;
};

export const StockLabel = ({ slug }: StockLabelProps) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getStock = useCallback(async () => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
    setIsLoading(false);
  }, [slug]);

  useEffect(() => {
    getStock();
  }, [getStock]);

  return (
    <>
      {isLoading ? (
        <SkeletonStockLabel />
      ) : (
        <h1 className={`${titleFont.className} antialiased font-bold `}>Stock: {stock}</h1>
      )}
    </>
  );
};

const SkeletonStockLabel = () => {
  return (
    <div className="animate-pulse w-full">
      <div className="h-6 bg-gray-200 rounded"></div>
    </div>
  );
};
