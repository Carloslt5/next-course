"use client";

import { setCookie } from "cookies-next";
import { useState } from "react";

type TabBarProps = {
  currentTab?: number;
  tabOptions?: number[];
};

export const TabBar = ({ currentTab = 1, tabOptions = [1, 2, 3, 4] }: TabBarProps) => {
  const [selected, setSelected] = useState(currentTab);

  const onTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie("selected-tab", tab.toString());
  };

  return (
    <div
      className={`grid w-full md:w-1/2 transition-all space-x-2 rounded-xl bg-zinc-100 p-2
      ${"grid-cols-" + tabOptions.length}`}
    >
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            checked={selected === tab}
            onChange={() => {}}
            type="radio"
            id={tab.toString()}
            className="peer hidden"
          />
          <label
            onClick={() => onTabSelected(tab)}
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
