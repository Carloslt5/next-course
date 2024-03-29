import { HomeIcon } from "@primer/octicons-react";
import Link from "next/link";
import { ActiveLink } from "./ActiveLink";

export const Navigation = () => {
  const navItems = [
    { path: "/contact", name: "Contact" },
    { path: "/price", name: "Price" },
    { path: "/about", name: "About" },
  ];

  return (
    <>
      <nav className="bg-slate-500 p-2 ">
        <div className="flex gap-2 justify-between">
          <Link href="/" className="flex items-center gap-2">
            <HomeIcon />
            <h1>HOME</h1>{" "}
          </Link>
          <div className="flex gap-2 items-center">
            {navItems.map((item, idx) => (
              <ActiveLink key={idx} {...item} />
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};
