import { TodoForm } from "./components/todos/TodoForm";
import { TodoList } from "./components/todos/TodoList";
import { useTodos } from "./features/todos/hooks/useTodos";

function App() {
  const { todos, isLoading, error, addTodo, toggleTodo, deleteTodo } =
    useTodos();

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-center mb-8">
                  Todo App
                </h1>
                <TodoForm onSubmit={addTodo} />
                {error && (
                  <div className="p-4 text-red-700 bg-red-100 rounded-md">
                    {error}
                  </div>
                )}
                {isLoading ? (
                  <div className="text-center py-4">Loading todos...</div>
                ) : (
                  <TodoList
                    todos={todos}
                    onToggleTodo={toggleTodo}
                    onDeleteTodo={deleteTodo}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
