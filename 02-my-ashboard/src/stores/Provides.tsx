"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from ".";

type ProvidesProps = {
  children: ReactNode;
};

export const Provides = ({ children }: ProvidesProps) => {
  return <Provider store={store}>{children}</Provider>;
};
