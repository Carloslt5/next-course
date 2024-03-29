import Link from "next/link";

export const Navigation = () => {
  return (
    <>
      <nav className="bg-slate-500 p-2 ">
        <div className="flex gap-2 justify-between">
          <h1>
            <Link href={"/"}>HOME</Link>
          </h1>
          <div className="flex gap-2 items-center">
            <Link href={"/contact"}>contact</Link>
            <Link href={"/price"}>price</Link>
            <Link href={"/about"}>about</Link>
          </div>
        </div>
      </nav>
    </>
  );
};
