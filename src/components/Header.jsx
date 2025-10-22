export default function Header({ count = 0, activeCount = 0, completedCount = 0 }) {
  return (
    <header className="header">
      <h1>Todo App </h1>
      <p className="muted">
        Total: {count} • Active: {activeCount} • Completed: {completedCount}
      </p>
    </header>
  );
}
