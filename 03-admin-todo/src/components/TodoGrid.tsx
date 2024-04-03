"use client";
import todoServices from "@/services/todo.services";
import { Todo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { TodoItem } from "./TodoItem";

type TodoGridProps = {
  todos: Todo[];
};

export const TodoGrid = ({ todos }: TodoGridProps) => {
  const router = useRouter();

  const toggleTodo = async (id: string, complete: boolean) => {
    await todoServices.updateTodos(id, complete);
    router.refresh();
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        ))}
      </div>
    </>
  );
};
