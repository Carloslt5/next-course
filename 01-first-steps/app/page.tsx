import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Hola mundo</h1>
      <Link href={"/home"}>Go Home</Link>
    </>
  );
}
