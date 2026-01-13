// backend/server.js - COMPLETE FIXED VERSION
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const adminRoutes = require('./routes/admin');
const volunteerRoutes = require('./routes/volunteers');

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://www.soorveeryuvasangthan.com',
    'http://localhost:3000',
    'https://soorveer-frontend.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200,
  maxAge: 86400
};

app.use(cors(corsOptions));

// Body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB Connection with Retry Logic
const connectWithRetry = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://digitalexpressindia30_db_user:digitalexpressindia30_db_user@clusterdigital.1y0nunx.mongodb.net/trust?retryWrites=true&w=majority&appName=ClusterDigital';
      
      console.log(`🔗 Attempt ${i + 1}/${retries}: Connecting to MongoDB...`);
      
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        minPoolSize: 2
      });
      
      console.log('✅ MongoDB Atlas Connected Successfully');
      
      // Connection event listeners
      mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err.message);
      });
      
      mongoose.connection.on('disconnected', () => {
        console.log('⚠️  MongoDB disconnected. Attempting to reconnect...');
        setTimeout(() => connectWithRetry(), 5000);
      });
      
      mongoose.connection.on('reconnected', () => {
        console.log('🔁 MongoDB reconnected');
      });
      
      return true;
      
    } catch (error) {
      console.error(`❌ Connection attempt ${i + 1} failed:`, error.message);
      
      if (i < retries - 1) {
        console.log(`⏳ Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('❌ All connection attempts failed');
        console.log('💡 Possible solutions:');
        console.log('1. Check MongoDB Atlas IP whitelist (0.0.0.0/0)');
        console.log('2. Check if database user has correct permissions');
        console.log('3. Check if cluster is not suspended');
        console.log('4. Try connecting with MongoDB Compass');
        
        // Continue without database
        console.log('⚠️  Running in offline mode without database');
        return false;
      }
    }
  }
};

// Initialize database connection
connectWithRetry();

// Mock data for when database is offline
const mockVolunteers = [
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

// Routes
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/admin', adminRoutes);

// Test endpoint
app.get('/api/test', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({
    success: true,
    message: 'API Server is Running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    database: {
      status: statusMap[dbStatus] || 'unknown',
      readyState: dbStatus
    },
    cloudinary: process.env.CLOUDINARY_CLOUD_NAME ? 'Configured' : 'Not Configured'
  });
});

// Health check with more details
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  
  res.json({
    status: 'OK',
    server: 'running',
    database: dbStatus === 1 ? 'connected' : 'disconnected',
    databaseReadyState: dbStatus,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    memoryUsage: process.memoryUsage()
  });
});

// Mock volunteers endpoint for offline use
app.get('/api/mock/volunteers', (req, res) => {
  res.json({
    success: true,
    data: mockVolunteers,
    isMock: true,
    count: mockVolunteers.length,
    message: 'Using mock data (database disconnected)'
  });
});

// Fallback route for volunteer API when database is down
app.use('/api/fallback/volunteers', (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    res.json({
      success: true,
      data: mockVolunteers,
      isMock: true,
      count: mockVolunteers.length,
      message: 'Database offline - using mock data'
    });
  } else {
    res.redirect('/api/volunteers');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
  console.log(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  MongoDB Status: ${mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Disconnected ⚠️'}`);
  console.log(`☁️  Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME ? 'Ready ✅' : 'Not Configured ⚠️'}`);
});