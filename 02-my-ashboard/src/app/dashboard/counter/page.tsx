import { Counter } from "@/components/Counter";

export const metadata = {
  title: "Counter page",
  description: "Simple counter",
};

export default function CounterPsge() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div>Productos</div>
      <Counter value={20} />
    </div>
  );
}
