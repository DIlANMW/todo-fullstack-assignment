import { Todo } from '../models/Todo.js';

/**
 * GET /api/todos
 */
export const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/todos
 */
export const createTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }
    const todo = await Todo.create({ title: title.trim(), description });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/todos/:id
 */
export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    await todo.save();
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/todos/:id/done
 */
export const toggleDone = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    todo.done = !todo.done;
    await todo.save();
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

/**
 *   DELETE /api/todos/:id
 */
export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
