import { Todo } from "@prisma/client";

class TodoServices {
  private baseURL: string;

  constructor() {
    this.baseURL = "http://localhost:3000/api";
  }
  async updateTodos(id: string, complete: boolean): Promise<Todo> {
    const body = { complete };
    const todo = await fetch(`${this.baseURL}/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return todo;
  }

  async createTodo(description: string): Promise<Todo> {
    const body = { description };
    const todo = await fetch(`${this.baseURL}/todos`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return todo;
  }

  async deletedCompleteTodo(): Promise<boolean> {
    const todo = await fetch(`${this.baseURL}/todos`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return true;
  }
}

const todoServices = new TodoServices();
export default todoServices;
