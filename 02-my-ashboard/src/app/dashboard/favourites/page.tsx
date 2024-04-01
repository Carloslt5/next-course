import { PokemonsFavourite } from "@/components/PokemonsFavourite";

export const metadata = {
  title: "Favourites list",
  description: "My favourites pokemons",
};

export default async function FavouritesPage() {
  return (
    <>
      <div className="flex flex-col">
        <div className="text-3xl font-extrabold mb-2 underline">My favourites Pokemons</div>
        <PokemonsFavourite />
      </div>
    </>
  );
}
