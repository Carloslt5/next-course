"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { CiBookmarkCheck } from "react-icons/ci";

type SidebarItemProps = {
  path: string;
  title: string;
  icon: ReactNode;
};
export const SidebarItem = ({ path, title, icon }: SidebarItemProps) => {
  const pathName = usePathname();

  return (
    <li>
      <Link
        href={path}
        className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group
        hover: bg-gradient-to-r hover:bg-sky-400 hover:text-white
        ${path === pathName ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400" : ""}`}
      >
        <CiBookmarkCheck size={30} />
        <span>{title}</span>
      </Link>
    </li>
  );
};
