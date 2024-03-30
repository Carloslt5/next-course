"use client";
import { useState } from "react";

type CounterProps = {
  value?: number;
};

export const Counter = ({ value = 0 }: CounterProps) => {
  const [counter, setCounter] = useState(value);

  return (
    <>
      <span className="text-9xl">{counter}</span>

      <div className="flex items-center gap-2">
        <button
          className="flex items-center rounded-md bg-slate-900 text-white py-1 px-4 hover:bg-slate-700"
          onClick={() => setCounter(counter - 1)}
        >
          -1
        </button>
        <button
          className="flex items-center rounded-md bg-slate-900 text-white py-1 px-4 hover:bg-slate-700"
          onClick={() => setCounter(counter + 1)}
        >
          +1
        </button>
      </div>
    </>
  );
};
