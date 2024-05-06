export interface Product {
  ProductImage?: ProductImage[];
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  // type: Type;
  gender: Gender;
}

export interface CartProduct {
  id: string;
  image: string;
  price: number;
  quantity: number;
  size: Size;
  slug: string;
  title: string;
}

export interface ProductImage {
  url: string;
  id: number;
}

export type Gender = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Type = "shirts" | "pants" | "hoodies" | "hats";
