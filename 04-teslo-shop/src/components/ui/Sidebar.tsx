"use client";

import { logout } from "@/actions/auth/logout";
import { useAddressStore } from "@/stores/address/address-store";
import { useCartStore } from "@/stores/cart/cart-store";
import { useMenuStore } from "@/stores/menu-ui/menu-ui";
import clsx from "clsx";
import { Session } from "next-auth";
import Link from "next/link";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

type SidebarProps = {
  session: Session | null;
};

export const Sidebar = ({ session }: SidebarProps) => {
  const isSideMenuOpen = useMenuStore((state) => state.isSideMenuOpen);
  const closeMenu = useMenuStore((state) => state.closeSideMenu);
  const clearCart = useCartStore((state) => state.clearCart);
  const clearAddress = useAddressStore((state) => state.clearAddress);
  const isAutenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  return (
    <div>
      {isSideMenuOpen && (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30 " />
          <div
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10  backdrop-filter backdrop-blur-sm"
            onClick={closeMenu}
          />
        </>
      )}

      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeMenu}
        />
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
        {isAutenticated && (
          <>
            <Link
              href={"/profile"}
              onClick={closeMenu}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPersonOutline size={30} /> <span className="ml-3 text-xl">Profile</span>
            </Link>

            <Link
              href={"/orders"}
              onClick={closeMenu}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} /> <span className="ml-3 text-xl">Orders</span>
            </Link>
          </>
        )}

        {isAutenticated ? (
          <button
            onClick={() => {
              logout();
              clearCart();
              clearAddress();
            }}
            className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogOutOutline size={30} /> <span className="ml-3 text-xl">Log out</span>
          </button>
        ) : (
          <Link
            href={"/auth/login"}
            onClick={closeMenu}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogInOutline size={30} /> <span className="ml-3 text-xl">Log in</span>
          </Link>
        )}

        <hr className="my-10" />

        {isAdmin && (
          <>
            <Link
              href={"/"}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline size={30} /> <span className="ml-3 text-xl">Products</span>
            </Link>

            <Link
              href={"/orders"}
              onClick={closeMenu}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} /> <span className="ml-3 text-xl">Orders</span>
            </Link>

            <Link
              href={"/"}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline size={30} /> <span className="ml-3 text-xl">Users</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
