const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    priority: String,
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    assignedTo: String,
    dueDate: Date,
    estimatedHours: Number,
    tags: Array,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);