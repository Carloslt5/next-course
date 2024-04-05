import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import {
  IoBasketOutline,
  IoBrowsersOutline,
  IoCheckboxOutline,
  IoFlashSharp,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { LogoutButton } from "./LogoutButton";
import { SidebarItem } from "./SidebarItem";

const menuItems = [
  {
    icon: <IoBrowsersOutline size={20} />,
    path: "/dashboard",
    title: "Dashboard",
  },
  {
    icon: <IoCheckboxOutline size={20} />,
    path: "/dashboard/rest-todos",
    title: "Rest TODOS",
  },
  {
    icon: <IoListOutline size={20} />,
    path: "/dashboard/server-actions",
    title: "Server Actions",
  },
  {
    icon: <IoFlashSharp size={20} />,
    path: "/dashboard/cookies",
    title: "Cookies",
  },
  {
    icon: <IoBasketOutline size={20} />,
    path: "/dashboard/products",
    title: "Products",
  },
  {
    icon: <IoPersonOutline size={20} />,
    path: "/dashboard/profile",
    title: "Profile",
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32"
              alt="tailus logo"
              width={150}
              height={150}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={
              session?.user?.image ??
              "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
            }
            alt={`Profile image ${session?.user?.name}`}
            className="m-auto rounded-full object-cover"
            width={120}
            height={120}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {session?.user?.name ?? "No Name"}
          </h5>
          <span className="hidden text-gray-400 lg:block capitalize">
            {session?.user?.roles?.join(", ") ?? ["client"]}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};
