import { Title } from "@/components/ui/Title";
import { CategoryPageProps } from "./page";

export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = params;

  // if (id === "kids") {
  //   notFound();
  // }
  return (
    <div>
      <Title />
      <h1>Category Page {id}</h1>
    </div>
  );
}
