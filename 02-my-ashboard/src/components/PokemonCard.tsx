import { Pokemon } from "@/types/Pokemons.type";
import Image from "next/image";
import Link from "next/link";
import { IoHeartOutline } from "react-icons/io5";

type PokemonCardrops = {
  pokemon: Pokemon;
};

export const PokemonCard = ({ pokemon }: PokemonCardrops) => {
  return (
    <div className="mx-auto right-0 mt-2 w-full">
      <div className="bg-white rounded overflow-hidden shadow-lg">
        <div className="text-center p-6 bg-gray-800 border-b">
          <article key={pokemon.id} className="flex flex-col items-center rounded-md">
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              width={100}
              height={100}
              alt={pokemon.name}
            />
          </article>
          <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">{pokemon.name}</p>
          <div className="mt-5">
            <Link
              href={`/pokemon/${pokemon.id}`}
              className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
            >
              More info...
            </Link>
          </div>
        </div>
        <div className="border-b px-4 py-2 hover:bg-gray-100 flex">
          <Link href="/dashboard/main" className=" flex items-center">
            <div className="text-red-500">
              <IoHeartOutline />
            </div>
            <div className="pl-3">
              <p className="text-sm font-medium text-gray-800 leading-none">Not favourite</p>
              <p className="text-xs text-gray-500">View your campaigns</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
