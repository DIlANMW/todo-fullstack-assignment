import React from 'react';
import { TodoItem } from './TodoItem.jsx';

export const TodoList = ({
  todos,
  onToggleDone,
  onDelete,
  onUpdate,
  editingId,
  setEditingId,
}) => {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggleDone={onToggleDone}
          onDelete={onDelete}
          onUpdate={onUpdate}
          isEditing={editingId === todo._id}
          setEditingId={setEditingId}
        />
      ))}
    </div>
  );
};
