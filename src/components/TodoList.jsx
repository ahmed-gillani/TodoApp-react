import { useEffect } from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onRemove, onToggle, onUpdate }) {
  useEffect(() => {
    console.log("✅ TodoList mounted");
    return () => {
      console.log("❌ TodoList unmounted");
    };
  }, []);

  if (!todos.length) {
    return <p className="muted" style={{ marginTop: 12 }}>No todos in this view — try a different filter or add one above.</p>;
  }

  return (
    <ul style={{ marginTop: 12 }}>
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onRemove={onRemove}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
