import { apiClient } from "../../../lib/api/client";
import { CreateTodoInput, Todo, UpdateTodoInput } from "../types";

export const todosApi = {
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await apiClient.get<Todo[]>("/todos");
    return response.data;
  },

  createTodo: async (todo: CreateTodoInput): Promise<Todo> => {
    const response = await apiClient.post<Todo>("/todos", {
      title: todo.title,
    });
    return response.data;
  },

  updateTodo: async (id: string, updates: UpdateTodoInput): Promise<Todo> => {
    const response = await apiClient.patch<Todo>(`/todos/${id}`, updates);
    return response.data;
  },

  deleteTodo: async (id: string): Promise<void> => {
    await apiClient.delete(`/todos/${id}`);
  },
};
