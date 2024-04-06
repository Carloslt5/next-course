export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getUserSessionServer } from "@/actions/auth-actions";
import { NewTodo } from "@/components/NewTodo";
import { TodoGrid } from "@/components/TodoGrid";
import prisma from "@/libs/prisma";

export const metadata = {
  title: "TODO List",
  description: "All todos",
};

export default async function RestTodosPage() {
  const user = await getUserSessionServer();

  const todos = await prisma.todo.findMany({
    where: { userId: user?.id },
    orderBy: { description: "asc" },
  });

  return (
    <>
      <h1 className="text-4xl">Rest API TODOS</h1>

      <div className="mb-5">
        <NewTodo />
      </div>
      <TodoGrid todos={todos} />
    </>
  );
}
