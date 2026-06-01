require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../models/Project');
const Task = require('../models/Task');

async function seedData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database connected!');

        await Project.deleteMany({});
        await Task.deleteMany({});

        const projects = await Project.create([
            { name: 'E-Commerce Platform', description: 'Online store', client: 'TechRetail', status: 'active', priority: 'high', endDate: new Date('2024-06-30'), budget: 150000 },
            { name: 'Mobile Banking App', description: 'Banking app', client: 'First Bank', status: 'active', priority: 'critical', endDate: new Date('2024-08-31'), budget: 250000 },
            { name: 'AI Chatbot', description: 'Customer support bot', client: 'SupportHub', status: 'planning', priority: 'medium', endDate: new Date('2024-05-30'), budget: 75000 }
        ]);

        console.log('Created:', projects.length, 'projects');

        const tasks = [];
        for (let i = 1; i <= 15; i++) {
            tasks.push({
                title: 'Task ' + i,
                description: 'Description for task ' + i,
                status: ['pending', 'in_progress', 'completed'][Math.floor(Math.random() * 3)],
                priority: ['low', 'medium', 'high', 'urgent'][Math.floor(Math.random() * 4)],
                projectId: projects[Math.floor(Math.random() * projects.length)]._id,
                assignedTo: 'User ' + (Math.floor(Math.random() * 5) + 1),
                dueDate: new Date(2024, Math.floor(Math.random() * 5) + 5, Math.floor(Math.random() * 28) + 1),
                estimatedHours: Math.floor(Math.random() * 20) + 5
            });
        }

        await Task.create(tasks);
        console.log('Created:', tasks.length, 'tasks');
        console.log('✅ Database seeded successfully!');
        process.exit(0);

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

seedData();