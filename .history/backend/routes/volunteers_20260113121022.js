// backend/routes/volunteers.js - COMPLETE FIXED VERSION
const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const upload = require('../middleware/upload');
const mongoose = require('mongoose');

// Mock data
const getMockVolunteers = () => {
  return [
    {
      _id: 'mock-001',
      name: 'Soorveer Admin',
      aakNo: '001',
      role: 'president',
      mobileNo: '9876543210',
      address: 'Mumbai, Maharashtra',
      imageUrl: 'https://ui-avatars.com/api/?name=Soorveer+Admin&background=4f46e5&color=fff&size=200',
      uniqueId: 1,
      joinDate: new Date('2024-01-01'),
      createdAt: new Date('2024-01-01')
    },
    {
      _id: 'mock-002',
      name: 'Test Volunteer',
      aakNo: '002',
      role: 'vice-president',
      mobileNo: '8887776665',
      address: 'Delhi, India',
      imageUrl: 'https://ui-avatars.com/api/?name=Test+Volunteer&background=10b981&color=fff&size=200',
      uniqueId: 2,
      joinDate: new Date('2024-02-01'),
      createdAt: new Date('2024-02-01')
    },
    {
      _id: 'mock-003',
      name: 'Demo Employee',
      aakNo: '003',
      role: 'employee',
      mobileNo: '7776665554',
      address: 'Pune, Maharashtra',
      imageUrl: 'https://ui-avatars.com/api/?name=Demo+Employee&background=6366f1&color=fff&size=200',
      uniqueId: 3,
      joinDate: new Date('2024-03-01'),
      createdAt: new Date('2024-03-01')
    }
  ];
};

// Check database connection
const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Test route
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Volunteer routes working',
    database: isDBConnected() ? 'connected' : 'disconnected'
  });
});

// GET all volunteers with fallback
router.get('/', async (req, res) => {
  try {
    if (!isDBConnected()) {
      console.log('⚠️  Database disconnected, returning mock data');
      return res.json({
        success: true,
        data: getMockVolunteers(),
        isMock: true,
        count: 3,
        message: 'Using mock data (database disconnected)'
      });
    }
    
    // Try to get real data
    const volunteers = await volunteerController.getAllVolunteers(req, res);
    
  } catch (error) {
    console.error('Error in volunteers route:', error);
    
    // Fallback to mock data
    res.json({
      success: true,
      data: getMockVolunteers(),
      isMock: true,
      error: error.message,
      count: 3
    });
  }
});

// Routes with database check
router.post('/', upload.single('image'), (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({
      success: false,
      message: 'Database unavailable. Cannot create volunteer.',
      isMock: true
    });
  }
  volunteerController.createVolunteer(req, res);
});

router.get('/:id', (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({
      success: false,
      message: 'Database unavailable.',
      isMock: true
    });
  }
  volunteerController.getVolunteerById(req, res);
});

router.delete('/:id', (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({
      success: false,
      message: 'Database unavailable. Cannot delete volunteer.',
      isMock: true
    });
  }
  volunteerController.deleteVolunteer(req, res);
});

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Volunteer API is working',
    database: isDBConnected() ? 'connected' : 'disconnected',
    timestamp: new Date()
  });
});

module.exports = router;