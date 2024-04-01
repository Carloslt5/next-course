import { Pokemon } from "@/types/Pokemons.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PokemonsState = {
  favourites: { [key: string]: Pokemon };
};

const initialState: PokemonsState = {
  favourites: {},
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setFavoritePokemons(state, action: PayloadAction<{ [key: string]: Pokemon }>) {
      state.favourites = action.payload;
    },
    toggleFavourite(state, action: PayloadAction<Pokemon>) {
      const pokemon = action.payload;
      const { id } = pokemon;
      if (!!state.favourites[id]) {
        delete state.favourites[id];
      } else {
        state.favourites[id] = pokemon;
      }
    },
  },
});

export const { toggleFavourite, setFavoritePokemons } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
