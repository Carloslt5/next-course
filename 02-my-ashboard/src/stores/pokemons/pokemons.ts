import { Pokemon } from "@/types/Pokemons.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PokemonsState = {
  [key: string]: Pokemon;
};

const initialState: PokemonsState = {
  // "1": { id: "1", name: "bulbassaur" },
  // "3": { id: "3", name: "venusaur" },
  // "6": { id: "6", name: "charizard" },
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    toggleFavourite(state, action: PayloadAction<Pokemon>) {
      const pokemon = action.payload;
      const { id } = pokemon;
      if (!!state[id]) {
        delete state[id];
        return;
      }
      state[id] = pokemon;
    },
  },
});

export const { toggleFavourite } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
