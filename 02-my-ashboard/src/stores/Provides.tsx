"use client";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from ".";
import { setFavoritePokemons } from "./pokemons/pokemons";

type ProvidesProps = {
  children: ReactNode;
};

export const Provides = ({ children }: ProvidesProps) => {
  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("favourite-pokemons") ?? "{}");
    store.dispatch(setFavoritePokemons(favourites));
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
