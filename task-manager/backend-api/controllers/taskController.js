const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = (req, res) => {
  const tasks = Task.getAll(req.user.id);
  
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = (req, res) => {
  const task = Task.getById(req.params.id, req.user.id);
  
  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: task
  });
};

// @desc    Create task
// @route   POST /api/tasks
// @access  Private
const createTask = (req, res) => {
  const task = Task.create(req.body, req.user.id);
  
  res.status(201).json({
    success: true,
    data: task
  });
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = (req, res) => {
  const task = Task.update(req.params.id, req.body, req.user.id);
  
  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: task
  });
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = (req, res) => {
  const deleted = Task.delete(req.params.id, req.user.id);
  
  if (!deleted) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: {}
  });
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};