import { Pokemon } from "@/types/Pokemons.type";
import { createSlice } from "@reduxjs/toolkit";

type PokemonsState = {
  [key: string]: Pokemon;
};

const initialState: PokemonsState = {
  "1": { id: "1", name: "bulbassaur" },
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {},
});

export const {} = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
