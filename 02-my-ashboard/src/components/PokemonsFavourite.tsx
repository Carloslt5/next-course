"use client";
import { useAppSelector } from "@/stores";
import { Pokemon } from "@/types/Pokemons.type";
import { useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { PokemonGrid } from "./PokemonGrid";

export const PokemonsFavourite = () => {
  const favouritePokemons = useAppSelector((state) => Object.values(state.pokemons));
  const [pokemons, setPokemons] = useState<Pokemon[]>(favouritePokemons);
  return (
    <>{pokemons.length === 0 ? <NoFavourites /> : <PokemonGrid pokemons={favouritePokemons} />}</>
  );
};

export const NoFavourites = () => {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center">
      <IoHeartOutline size={100} className="text-red-500" />
      <p>No favourites</p>
    </div>
  );
};
