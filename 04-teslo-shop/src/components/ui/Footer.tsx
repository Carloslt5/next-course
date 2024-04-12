import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs gap-3 py-4 mt-10">
      <Link href={"/"}>
        <span className="font-bold">Teslo</span>
        <span> | shop </span>
        <span>©{new Date().getFullYear()}</span>
      </Link>

      <Link href={"/"}>
        <span>Privacy and legal</span>
      </Link>

      <Link href={"/"}>
        <span>Privacy and legal</span>
      </Link>
    </div>
  );
};
