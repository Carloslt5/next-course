import { Todo } from "@prisma/client";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <>
      <div className={todo.complete ? "todoDone" : "todoPending"}>
        <div className="flex flex-row w-full justify-start items-center gap-2">
          <div
            className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 bg-blue-100
          ${todo.complete ? "bg-blue-100" : "bg-red-100"}`}
          >
            {todo.complete ? <IoCheckboxOutline size={30} /> : <IoSquareOutline size={30} />}
          </div>
          <div className="text-center sm:text-left">{todo.description}</div>
        </div>
      </div>
    </>
  );
};
