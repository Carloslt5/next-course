import { Pokemon } from "@/types/Pokemons.type";
import { PokemonCard } from "./PokemonCard";

type PokemonGridProps = {
  pokemons: Pokemon[];
};

export const PokemonGrid = ({ pokemons }: PokemonGridProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};
