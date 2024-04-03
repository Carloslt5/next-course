"use client";

import { addTodo, deleteTodo } from "@/actions/todo-actions";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

export const NewTodo = () => {
  const [description, setDescription] = useState("");
  const route = useRouter();

  // RestAPI
  // const onSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   if (description.trim().length === 0) return;
  //   await todoServices.createTodo(description);
  //   setDescription("");
  //   route.refresh();
  // };
  // const handleDeleteCompete = async () => {
  //   await todoServices.deletedCompleteTodo();
  //   route.refresh();
  // };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (description.trim().length === 0) return;
    await addTodo(description);
    setDescription("");
  };

  const handleDeleteCompete = async () => {
    await deleteTodo();
  };

  return (
    <form onSubmit={onSubmit} className="flex ">
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        className="w-6/12 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <button
        onClick={handleDeleteCompete}
        type="button"
        className="flex ml-auto items-center justify-center rounded  bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        Delete completed
      </button>
    </form>
  );
};
