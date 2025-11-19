import React, { useEffect, useState } from 'react';
import { TodoForm } from './components/TodoForm.jsx';
import { TodoList } from './components/TodoList.jsx';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchTodos = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error('Failed to load todos');
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreate = async (payload, resetForm) => {
    setError('');
    try {
      // optimistic update
      const optimistic = {
        _id: `tmp-${Date.now()}`,
        ...payload,
        done: false,
        createdAt: new Date().toISOString(),
      };
      setTodos(prev => [optimistic, ...prev]);

      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error('Failed to create TODO');
      }
      const created = await res.json();
      setTodos(prev =>
        prev.map(t => (t._id === optimistic._id ? created : t))
      );
      resetForm();
    } catch (err) {
      setError(err.message || 'Something went wrong');
      fetchTodos();
    }
  };

  const handleUpdate = async (id, payload) => {
    setError('');
    try {
      setTodos(prev =>
        prev.map(t => (t._id === id ? { ...t, ...payload } : t))
      );
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to update TODO');
      const updated = await res.json();
      setTodos(prev => prev.map(t => (t._id === id ? updated : t)));
      setEditingId(null);
    } catch (err) {
      setError(err.message || 'Something went wrong');
      fetchTodos();
    }
  };

  const handleToggleDone = async id => {
    setError('');
    try {
      setTodos(prev =>
        prev.map(t => (t._id === id ? { ...t, done: !t.done } : t))
      );
      const res = await fetch(`${API_BASE}/${id}/done`, {
        method: 'PATCH',
      });
      if (!res.ok) throw new Error('Failed to toggle TODO');
      const updated = await res.json();
      setTodos(prev => prev.map(t => (t._id === id ? updated : t)));
    } catch (err) {
      setError(err.message || 'Something went wrong');
      fetchTodos();
    }
  };

  const handleDelete = async id => {
    setError('');
    const current = todos;
    setTodos(prev => prev.filter(t => t._id !== id));
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete TODO');
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setTodos(current);
    }
  };

  const pendingCount = todos.filter(t => !t.done).length;
  const doneCount = todos.filter(t => t.done).length;

  return (
    <div className="app-root">
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">TODOs</div>
            <div className="card-subtitle">
              Simple full-stack TODO app
            </div>
          </div>
          <span className="badge">
            {pendingCount} pending • {doneCount} done
          </span>
        </div>

        <TodoForm onCreate={handleCreate} />

        <div className="chip-row">
          <span className="badge-pill">
            Total: {todos.length}
          </span>
          <span className="badge-pill">
            Pending: {pendingCount}
          </span>
          <span className="badge-pill">
            Done: {doneCount}
          </span>
          {loading && <span>Loading…</span>}
        </div>

        {error && <div className="error">⚠ {error}</div>}

        {todos.length === 0 && !loading ? (
          <div className="empty-state">
            No TODOs yet. Add your first task above ✨
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggleDone={handleToggleDone}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        )}
      </div>
    </div>
  );
};

export default App;
