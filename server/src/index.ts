import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./types";
import { dbClient } from "./db";

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Error handling
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: express.NextFunction
  ) => {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
);

// Debug endpoint
app.get("/api/debug/db", (req, res) => {
  const todos = dbClient.getAllTodos();
  res.json({
    totalTodos: todos.length,
    todos: todos,
  });
});

// Routes
app.get("/api/todos", (req, res) => {
  const todos = dbClient.getAllTodos();
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTodo: Todo = {
    id: uuidv4(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const todo = dbClient.createTodo(newTodo);
  res.status(201).json(todo);
});

app.patch("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const updatedTodo = dbClient.updateTodo(id, { title, completed });
  if (!updatedTodo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json(updatedTodo);
});

app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const deleted = dbClient.deleteTodo(id);

  if (!deleted) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
