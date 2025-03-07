import { FormEvent, useState } from "react";
import { Button } from "../common/Button";

interface TodoFormProps {
  onSubmit: (todoTitle: string) => void;
}

export const TodoForm = ({ onSubmit }: TodoFormProps) => {
  const [todoTitle, setTodoTitle] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (todoTitle.trim()) {
      onSubmit(todoTitle.trim());
      setTodoTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <Button type="submit" disabled={!todoTitle.trim()}>
        Add Todo
      </Button>
    </form>
  );
};
