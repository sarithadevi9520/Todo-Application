const Todo = require('../models/Todo');
const Project = require('../models/Project');

exports.createTodo = async (req, res) => {
  try {
    const { project, task, dueDate, priority } = req.body;
    const todo = new Todo({ project, task, dueDate, priority });
    await todo.save();
    await Project.findByIdAndUpdate(project, { $push: { todos: todo._id } });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().populate('project');
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};