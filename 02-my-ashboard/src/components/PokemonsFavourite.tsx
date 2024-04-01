"use client";
import { useAppSelector } from "@/stores";
import { PokemonGrid } from "./PokemonGrid";

export const PokemonsFavourite = () => {
  const pokemons = useAppSelector((state) => Object.values(state.pokemons));

  return (
    <>
      <PokemonGrid pokemons={pokemons} />
    </>
  );
};
