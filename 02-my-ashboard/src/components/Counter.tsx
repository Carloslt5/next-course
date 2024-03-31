"use client";
import { useAppSelector } from "@/stores";
import { addOne, initCounterState, substractOne } from "@/stores/counter/counterSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type CounterProps = {
  value?: number;
};

export const Counter = ({ value = 0 }: CounterProps) => {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCounterState(value));
  }, [dispatch, value]);

  return (
    <>
      <span className="text-9xl">{count}</span>

      <div className="flex items-center gap-2">
        <button
          className="flex items-center rounded-md bg-slate-900 text-white py-1 px-4 hover:bg-slate-700"
          onClick={() => dispatch(substractOne())}
        >
          -1
        </button>
        <button
          className="flex items-center rounded-md bg-slate-900 text-white py-1 px-4 hover:bg-slate-700"
          onClick={() => dispatch(addOne())}
        >
          +1
        </button>
      </div>
    </>
  );
};
