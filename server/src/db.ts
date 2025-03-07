import { Todo } from "./types";
import { db } from "./config/database";

// Prepare statements for better performance
const statements = {
  getAllTodos: db.prepare("SELECT * FROM todos ORDER BY createdAt DESC"),
  getTodoById: db.prepare("SELECT * FROM todos WHERE id = ?"),
  insertTodo: db.prepare(
    "INSERT INTO todos (id, title, completed, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)"
  ),
  updateTodo: db.prepare(
    "UPDATE todos SET title = ?, completed = ?, updatedAt = ? WHERE id = ?"
  ),
  deleteTodo: db.prepare("DELETE FROM todos WHERE id = ?"),
};

export const dbClient = {
  getAllTodos: () => {
    try {
      return statements.getAllTodos.all() as Todo[];
    } catch (error) {
      console.error("Database error in getAllTodos:", error);
      throw new Error("Failed to fetch todos");
    }
  },

  createTodo: (todo: Todo) => {
    try {
      statements.insertTodo.run(
        todo.id,
        todo.title,
        todo.completed ? 1 : 0,
        todo.createdAt,
        todo.updatedAt
      );
      return todo;
    } catch (error) {
      console.error("Database error in createTodo:", error);
      throw new Error("Failed to create todo");
    }
  },

  updateTodo: (id: string, todo: Partial<Todo>) => {
    try {
      const current = statements.getTodoById.get(id) as Todo;
      if (!current) return null;

      statements.updateTodo.run(
        todo.title || current.title,
        todo.completed !== undefined ? todo.completed : current.completed,
        new Date().toISOString(),
        id
      );

      return statements.getTodoById.get(id) as Todo;
    } catch (error) {
      console.error("Database error in updateTodo:", error);
      throw new Error("Failed to update todo");
    }
  },

  deleteTodo: (id: string) => {
    try {
      const result = statements.deleteTodo.run(id);
      return result.changes > 0;
    } catch (error) {
      console.error("Database error in deleteTodo:", error);
      throw new Error("Failed to delete todo");
    }
  },
};
