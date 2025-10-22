import { useState } from "react";

export default function TodoItem({ todo, onRemove, onToggle, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function handleSave() {
    const trimmed = draft.trim();
    if (!trimmed) return; // avoid empty text
    onUpdate(todo.id, trimmed);
    setIsEditing(false);
  }

  function handleCancel() {
    setDraft(todo.text); // revert
    setIsEditing(false);
  }

  return (
    <li className="todo-item">
      <div style={{ display: "flex", gap: 8, alignItems: "center", flex: 1 }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />

        {isEditing ? (
          <input
            className="input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            style={{ padding: "6px 8px", fontSize: 15 }}
          />
        ) : (
          <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.text}
          </span>
        )}
      </div>

      <div style={{ display: "flex", gap: 8, marginLeft: 12 }}>
        {isEditing ? (
          <>
            <button className="btn small" onClick={handleSave}>Save</button>
            <button className="btn small secondary" onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <>
            <button className="btn small" onClick={() => { setIsEditing(true); setDraft(todo.text); }}>
              Edit
            </button>
            <button className="btn small danger" onClick={() => onRemove(todo.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
