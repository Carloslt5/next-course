import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import counterReducer from "./counter/counterSlice";
import { localStorageMiddleware } from "./middlewares/localStorage-middleware";
import pokemonsReducer from "./pokemons/pokemons";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pokemons: pokemonsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
