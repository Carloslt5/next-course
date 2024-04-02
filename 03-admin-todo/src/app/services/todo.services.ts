import { Todo } from "@prisma/client";

const baseURL = "http://localhost:3000/api";

class TodoServices {
  async updateTodos(id: string, complete: boolean): Promise<Todo> {
    const body = { complete };
    const todo = await fetch(`${baseURL}/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return todo;
  }
}

const todoServices = new TodoServices();
export default todoServices;
