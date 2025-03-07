import { useState, useEffect, useCallback } from "react";
import { todosApi } from "../api/todosApi";
import { Todo } from "../types";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await todosApi.getAllTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching todos:", err);
      setError("Failed to fetch todos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (todoTitle: string) => {
    try {
      const newTodo = await todosApi.createTodo({ title: todoTitle });
      setTodos((prev) => [...prev, newTodo]);
      setError(null);
    } catch (err) {
      console.error("Error adding todo:", err);
      setError("Failed to add todo");
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (!todoToUpdate) return;

      const updatedTodo = await todosApi.updateTodo(id, {
        completed: !todoToUpdate.completed,
      });

      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      setError(null);
    } catch (err) {
      console.error("Error updating todo:", err);
      setError("Failed to update todo");
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await todosApi.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      setError(null);
    } catch (err) {
      console.error("Error deleting todo:", err);
      setError("Failed to delete todo");
    }
  };

  return {
    todos,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};
