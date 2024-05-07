import Image from "next/image";
import { StyleHTMLAttributes } from "react";

type ProductImageProps = {
  alt: string;
  className?: StyleHTMLAttributes<HTMLImageElement>["className"];
  style?: StyleHTMLAttributes<HTMLImageElement>["style"];
  height: number;
  src: string;
  width: number;
  priority?: boolean;
};

export const ProductImage = ({ src, alt, className, width, height, style }: ProductImageProps) => {
  const newSrc = src
    ? src?.startsWith("http")
      ? src
      : `/products/${src}`
    : `/imgs/placeholder.jpg`;

  return (
    <Image
      alt={alt}
      className={className}
      height={height}
      src={newSrc}
      width={width}
      style={style}
      priority
    />
  );
};
