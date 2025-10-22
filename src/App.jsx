import { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function App() {
  // todo: { id, text, completed }
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos_v1");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // for mount/unmount demo (unchanged)
  const [showList, setShowList] = useState(true);

  // filter: "all" | "active" | "completed"
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos_v1", JSON.stringify(todos));
  }, [todos]);

  // Add todo
  function addTodo(text) {
    if (!text.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now().toString(), text: text.trim(), completed: false },
    ]);
  }

  // Remove todo
  function removeTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  // Update todo text
  function updateTodo(id, newText) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  }

  // Toggle completed
  function toggleCompleted(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  // Derived view: filtered todos
  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true; // all
  });

  // counts for header
  const totalCount = todos.length;
  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="app">
      <Header count={totalCount} activeCount={activeCount} completedCount={completedCount} />

      <div className="card">
        <TodoForm onAdd={addTodo} />

        <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <button className={`btn ${filter === "all" ? "" : "secondary"}`} onClick={() => setFilter("all")}>
              All
            </button>
            <button className={`btn ${filter === "active" ? "" : "secondary"}`} onClick={() => setFilter("active")} style={{ marginLeft: 8 }}>
              Active
            </button>
            <button className={`btn ${filter === "completed" ? "" : "secondary"}`} onClick={() => setFilter("completed")} style={{ marginLeft: 8 }}>
              Completed
            </button>
          </div>

          <div style={{ marginLeft: "auto" }}>
            <button className="btn secondary" onClick={() => setShowList((s) => !s)}>
              {showList ? "Hide" : "Show"} Todo List (mount/unmount)
            </button>
          </div>
        </div>

        {/* Conditional rendering for mount/unmount */}
        {showList ? (
          <TodoList
            todos={filteredTodos}
            onRemove={removeTodo}
            onToggle={toggleCompleted}
            onUpdate={updateTodo}
          />
        ) : (
          <p className="muted" style={{ marginTop: 12 }}>
            Todo list is hidden. Toggle to mount it again.
          </p>
        )}
      </div>
    </div>
  );
}
