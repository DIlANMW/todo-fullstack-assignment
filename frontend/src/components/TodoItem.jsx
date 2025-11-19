import React, { useState } from 'react';

export const TodoItem = ({
  todo,
  onToggleDone,
  onDelete,
  onUpdate,
  isEditing,
  setEditingId,
}) => {
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleSave = () => {
    onUpdate(todo._id, {
      title: editTitle,
      description: editDescription,
    });
  };

  const createdAt = todo.createdAt ? new Date(todo.createdAt) : null;

  return (
    <div className={`todo-item ${todo.done ? 'done' : ''}`}>
      {/* Checkbox */}
      <div className="checkbox">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggleDone(todo._id)}
        />
      </div>

      {/* Main content */}
      <div className="todo-main">
        {isEditing ? (
          <div className="edit-container">
            <input
              className="input edit-input"
              value={editTitle}
              placeholder="Edit title"
              onChange={e => setEditTitle(e.target.value)}
            />
            <textarea
              className="input textarea edit-input"
              placeholder="Edit description"
              value={editDescription}
              onChange={e => setEditDescription(e.target.value)}
            />
          </div>
        ) : (
          <>
            <div className={`todo-title ${todo.done ? 'done' : ''}`}>
              {todo.title}
            </div>
            {todo.description && (
              <div className="todo-description">{todo.description}</div>
            )}
          </>
        )}

        <div className="todo-meta">
          {todo.done ? 'Completed' : 'Pending'}
          {createdAt && ` • created ${createdAt.toLocaleString()}`}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {isEditing ? (
          <>
            <button className="button button-ghost" type="button" onClick={handleSave}>
              Save
            </button>
            <button className="button button-ghost" type="button" onClick={() => setEditingId(null)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="button-icon" type="button" title="Edit" onClick={() => setEditingId(todo._id)}>
              ✏️
            </button>
            <button className="button-icon" type="button" title="Delete" onClick={() => onDelete(todo._id)}>
              🗑
            </button>
          </>
        )}
      </div>
    </div>
  );
};
