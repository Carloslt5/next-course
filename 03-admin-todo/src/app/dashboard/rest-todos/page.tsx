import { NewTodo } from "@/components/NewTodo";
import { TodoGrid } from "@/components/TodoGrid";
import prisma from "@/libs/prisma";

export const metadata = {
  title: "TODO List",
  description: "All todos",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <>
      <div className="mb-5">
        <NewTodo />
      </div>
      <TodoGrid todos={todos} />
    </>
  );
}
