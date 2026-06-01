const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', (req, res) => {
    res.render('dashboard', {
        title: 'TaskFlow Dashboard',
        currentYear: new Date().getFullYear()
    });
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        title: 'TaskFlow Dashboard',
        currentYear: new Date().getFullYear()
    });
});

router.get('/api/dashboard/stats', projectController.getDashboardStats);

module.exports = router;