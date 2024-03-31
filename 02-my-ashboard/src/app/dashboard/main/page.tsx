import { WidgetGrid } from "@/components/WidgetGrid";

export default function MainPage() {
  return (
    <div className="text-black p-2">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <h2 className="mb-4">General information</h2>

      <WidgetGrid />
    </div>
  );
}
