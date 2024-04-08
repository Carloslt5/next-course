import { titleFont } from "@/config/fonts";

export default function Home() {
  return (
    <div>
      <h1>Hola mundo </h1>
      <h1 className={`${titleFont.className} font-bold`}>Hola mundo con otra fuente</h1>
    </div>
  );
}
