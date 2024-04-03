import { Todo } from "@prisma/client";
import { useOptimistic } from "react";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

type TodoItemProps = {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => void;
};

export const TodoItem = ({ todo, toggleTodo }: TodoItemProps) => {
  const [todoOptimistic, setTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({ ...state, complete: newCompleteValue })
  );
  const handleToggleTodo = async () => {
    try {
      setTodoOptimistic(!todoOptimistic.complete);
      await toggleTodo(todo.id, !todo.complete);
    } catch (error) {
      setTodoOptimistic(!todoOptimistic.complete);
    }
  };

  return (
    <>
      <div className={todoOptimistic.complete ? "todoDone" : "todoPending"}>
        <div className="flex flex-row w-full justify-start items-center gap-2">
          <div
            className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 bg-blue-100
          ${todoOptimistic.complete ? "bg-blue-100" : "bg-red-100"}`}
            // without optimistic
            // onClick={() => toggleTodo(todo.id, !todo.complete)}
            onClick={handleToggleTodo}
          >
            {todoOptimistic.complete ? (
              <IoCheckboxOutline size={30} />
            ) : (
              <IoSquareOutline size={30} />
            )}
          </div>
          <div className="text-center sm:text-left">{todoOptimistic.description}</div>
        </div>
      </div>
    </>
  );
};
