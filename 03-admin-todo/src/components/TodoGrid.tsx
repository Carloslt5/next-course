import { Todo } from "@prisma/client";
import { TodoItem } from "./TodoItem";

type TodoGridProps = {
  todos: Todo[];
};

export const TodoGrid = ({ todos }: TodoGridProps) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
};
