"use server";

import prisma from "@/libs/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

const sleep = (seconds: number = 1): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
  await sleep(3);
  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo) {
    throw `Todo with ${id} not found`;
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-actions");
  return updatedTodo;
};

export const addTodo = async (description: string) => {
  try {
    const createTodo = await prisma.todo.create({ data: { description } });

    revalidatePath("/dashboard/server-actions");
    return createTodo;
  } catch (error) {
    return { message: "Todo not created" };
  }
};

export const deleteTodo = async () => {
  try {
    const deletedTodo = await prisma.todo.deleteMany({ where: { complete: true } });
    revalidatePath("/dashboard/server-actions");
    return deletedTodo;
  } catch (error) {
    return { message: "Todo not deleted" };
  }
};
