import { Product } from "@/interfaces/product.type";
import { currencyFormat } from "@/utils/currencyFormat";
import Link from "next/link";
import { ProductImage } from "../ui/ProductImage";

type ProductsTableProps = {
  products: Product[];
};

export const ProductsTable = ({ products }: ProductsTableProps) => {
  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Image
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Title
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Price
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Gender
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Stock
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Sizes
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr
            key={product.id}
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <Link href={`/product/${product.slug}`}>
                <ProductImage
                  src={product.ProductImage?.[0]?.url!}
                  alt={product.title}
                  height={80}
                  width={80}
                />
              </Link>
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <Link href={`/admin/product/${product.slug}`} className="hover:underline">
                {product.title}
              </Link>
            </td>
            <td className="text-sm font-bold  text-gray-900 px-6 py-4 whitespace-nowrap">
              {currencyFormat(product.price)}
            </td>

            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {product.gender}
            </td>

            <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
              {product.inStock}
            </td>

            <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
              {product.sizes.join(", ")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
