import { PokemonGrid } from "@/components/PokemonGrid";
import { Pokemon, PokemonResponse } from "@/types/Pokemons.type";

const getPokemons = async (limit = 100, offset = 0): Promise<Pokemon[]> => {
  const data: PokemonResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then((res) => res.json());

  const pokemons = data.results.map((pokemon) => ({
    id: pokemon.url.split("/").at(-2)!,
    name: pokemon.name,
  }));

  return pokemons;
};

export default async function PokemonsPage() {
  const pokemons = await getPokemons();

  return (
    <>
      <div className="flex flex-col">
        <div className="text-3xl font-extrabold mb-2 underline">Pokemons List</div>
        <PokemonGrid pokemons={pokemons} />
      </div>
    </>
  );
}
