import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(value);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        className="input"
        type="text"
        placeholder="Add a todo..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn" type="submit">Add</button>
    </form>
  );
}
