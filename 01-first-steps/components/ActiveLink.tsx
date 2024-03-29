"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ActiveLinkProps = {
  path: string;
  name: string;
};

export const ActiveLink = ({ path, name }: ActiveLinkProps) => {
  const pathName = usePathname();
  console.log("🚀 --------- pathName", pathName);

  return (
    <>
      <Link
        href={path}
        className={`hover:underline hover:text-blue-700 transition-all ${
          pathName === path ? "text-blue-700" : ""
        }`}
      >
        {name}
      </Link>
    </>
  );
};
