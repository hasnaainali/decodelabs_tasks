const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    client: String,
    status: String,
    priority: String,
    startDate: Date,
    endDate: Date,
    budget: Number,
    teamMembers: Array,
    technologies: Array,
    progress: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);