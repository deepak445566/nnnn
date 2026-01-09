const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { adminAuth } = require('../middleware/auth');

// Public route
router.post('/login', adminController.adminLogin);

// Protected routes (Admin only)
router.get('/volunteers', adminAuth, adminController.getAllVolunteers);
router.post('/assign-role', adminAuth, adminController.assignRole);
router.post('/remove-role', adminAuth, adminController.removeRole);
router.get('/stats', adminAuth, adminController.getDashboardStats);

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Admin API working',
    timestamp: new Date()
  });
});

module.exports = router;