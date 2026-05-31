const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { validateTask, validateIdParam } = require('../middleware/validation');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getTasks);

router.post('/', validateTask, createTask);

router.get('/:id', validateIdParam, getTask);

router.put('/:id', validateIdParam, validateTask, updateTask);

router.delete('/:id', validateIdParam, deleteTask);

module.exports = router;