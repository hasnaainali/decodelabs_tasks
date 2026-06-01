const Task = require('../models/Task');
const Project = require('../models/Project');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('projectId', 'name');
        res.json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('projectId', 'name');
        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }
        res.json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            projectId: req.body.projectId,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
            assignedTo: req.body.assignedTo,
            estimatedHours: req.body.estimatedHours,
            status: 'pending'
        });

        await task.save();
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }
        res.json({ success: true, data: task });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }
        res.json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }
        res.json({ success: true, data: task });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus
};