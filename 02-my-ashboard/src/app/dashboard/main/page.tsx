import { SimpleWidget } from "@/components/SimpleWidget";

export default function MainPage() {
  return (
    <div className="text-black p-2">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <h2>General information</h2>

      <div className="flex flex-wrap gap-2">
        <SimpleWidget />
      </div>
    </div>
  );
}
