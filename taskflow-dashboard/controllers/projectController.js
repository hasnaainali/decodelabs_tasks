const Project = require('../models/Project');
const Task = require('../models/Task');

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json({ success: true, data: projects });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }
        const tasks = await Task.find({ projectId: project._id });
        res.json({ success: true, data: { project, tasks } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const createProject = async (req, res) => {
    try {
        const project = new Project({
            name: req.body.name,
            description: req.body.description,
            client: req.body.client,
            priority: req.body.priority,
            endDate: req.body.endDate,
            budget: req.body.budget,
            status: 'active'
        });

        await project.save();
        res.status(201).json({ success: true, data: project });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }
        res.json({ success: true, data: project });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        await Task.deleteMany({ projectId: req.params.id });
        await Project.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Project and associated tasks deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getDashboardStats = async (req, res) => {
    try {
        const totalProjects = await Project.countDocuments();
        const activeProjects = await Project.countDocuments({ status: 'active' });
        const completedProjects = await Project.countDocuments({ status: 'completed' });

        const totalTasks = await Task.countDocuments();
        const completedTasks = await Task.countDocuments({ status: 'completed' });
        const pendingTasks = await Task.countDocuments({ status: 'pending' });
        const inProgressTasks = await Task.countDocuments({ status: 'in_progress' });

        const urgentTasks = await Task.countDocuments({ priority: 'urgent', status: { $ne: 'completed' } });
        const overdueTasks = await Task.countDocuments({
            dueDate: { $lt: new Date() },
            status: { $ne: 'completed' }
        });

        const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        const recentTasks = await Task.find()
            .populate('projectId', 'name')
            .sort({ createdAt: -1 })
            .limit(5);

        const projects = await Project.find().limit(5);

        res.json({
            success: true,
            data: {
                projects: { total: totalProjects, active: activeProjects, completed: completedProjects },
                tasks: { total: totalTasks, completed: completedTasks, pending: pendingTasks, inProgress: inProgressTasks, completionRate, urgent: urgentTasks, overdue: overdueTasks },
                recentTasks,
                topProjects: projects
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    getDashboardStats
};