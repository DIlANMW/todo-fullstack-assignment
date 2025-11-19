import React, { useState, useEffect } from 'react';

export const TodoForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  
  const validateForm = () => {
    if (!title.trim()) {
      setError('Title is required');
      return false;
    }
    if (title.trim().length < 3) {
      setError('Title must be at least 3 characters long');
      return false;
    }
    if (description.length > 200) {
      setError('Description cannot exceed 200 characters');
      return false;
    }
    setError('');
    return true;
  };

  useEffect(() => {
    setIsValid(validateForm());
  }, [title, description]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!validateForm()) return;

    onCreate(
      { title: title.trim(), description: description.trim() || '' },
      () => {
        setTitle('');
        setDescription('');
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">⚠ {error}</div>}
      <div className="form-row">
        <div
          style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <input
            className="input"
            placeholder="What do you need to get done?"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="input textarea"
            placeholder="Optional description (200 chars max)"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
            {description.length}/200
          </span>
        </div>

        <button
          type="submit"
          className="button button-primary"
          disabled={!isValid} 
          style={{ opacity: isValid ? 1 : 0.5, cursor: isValid ? 'pointer' : 'not-allowed' }}
        >
          ＋ Add
        </button>
      </div>
    </form>
  );
};
