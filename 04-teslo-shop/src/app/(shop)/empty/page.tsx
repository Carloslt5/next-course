import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function EmptyPage() {
  return (
    <div className="flex justify-center items-center h-[800px] gap-2">
      <IoCartOutline size={80} />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl font-semibold">Your cart is empty</h1>
        <Link href={"/"} className="text-blue-500 text-3xl hover:underline">
          Go shopping
        </Link>
      </div>
    </div>
  );
}
