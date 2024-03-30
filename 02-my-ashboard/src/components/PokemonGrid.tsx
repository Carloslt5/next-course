import { Pokemon } from "@/types/Pokemons.type";
import Image from "next/image";

type PokemonGridProps = {
  pokemons: Pokemon[];
};

export const PokemonGrid = ({ pokemons }: PokemonGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {pokemons.map((pokemon) => (
        <article key={pokemon.id} className="flex flex-col items-center rounded-md bg-slate-300">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            width={100}
            height={100}
            alt={pokemon.name}
          />
          <h1>{pokemon.name}</h1>
        </article>
      ))}
    </div>
  );
};
