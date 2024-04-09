"use client";
import { titleFont } from "@/config/fonts";
import { useMenuStore } from "@/stores/ui-menu";
import Link from "next/link";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const openSideMenu = useMenuStore((state) => state.openSideMenu);

  return (
    <nav className="flex px-5 justify-between items-center w-full py-1">
      <div>
        <Link href={"/"}>
          <span className={`${titleFont.className} antialised font-bold`}> Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>

      <div className="hidden sm:block">
        <Link
          href={"/category/men"}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          <span>Men</span>
        </Link>
        <Link
          href={"/category/women"}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          <span>Women</span>
        </Link>
        <Link
          href={"/category/kid"}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          <span>Kids</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link href={"/search"} className="p-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href={"/cart"} className="p-2">
          <div className="relative">
            <span className="absolute text-xs rounded-full font-bold px-1 bg-blue-400 text-white -top-2 -right-2">
              3
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          className="mx-2 p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={openSideMenu}
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
