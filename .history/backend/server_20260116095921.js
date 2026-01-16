// backend/server.js - UPDATED COMPLETE FILE
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
    'https://www.soorveeryuvasangthan.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200,
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// Body parsing with increased limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ============================================
// 🔥 ENHANCED MONGODB CONNECTION WITH KEEP-ALIVE
// ============================================
let isConnecting = false;
let connectionAttempts = 0;

const connectDB = async () => {
  // Prevent multiple simultaneous connection attempts
  if (isConnecting) {
    console.log('⏳ Connection already in progress...');
    return;
  }
  
  if (mongoose.connection.readyState === 1) {
    console.log('✅ Already connected to MongoDB');
    return;
  }

  isConnecting = true;
  connectionAttempts++;

  try {
    console.log(`🔄 Attempting MongoDB connection (Attempt ${connectionAttempts})...`);
    
    // MongoDB connection options - SIMPLIFIED (no keepAlive)
    const options = {
      maxPoolSize: 100,                    // Increased pool size
      minPoolSize: 10,                     // Minimum connections ready
      serverSelectionTimeoutMS: 30000,     // 30 seconds wait
      socketTimeoutMS: 45000,              // 45 seconds socket timeout
      connectTimeoutMS: 30000,             // 30 seconds connection timeout
      retryWrites: true,
      retryReads: true,
      family: 4,                           // Use IPv4 (faster)
      autoIndex: true,
      bufferCommands: false                // Don't buffer commands if not connected
    };

    const mongoURI = process.env.MONGODB_URI || 
                    'mongodb+srv://techdigitalsolution6_db_user:techdigitalsolution6_db_user@cluster0.ztyt61g.mongodb.net/oktrust';

    console.log(`📡 Connecting to: ${mongoURI.substring(0, 50)}...`);
    
    await mongoose.connect(mongoURI, options);
    
    isConnecting = false;
    console.log('🎉 MongoDB Connected Successfully!');
    console.log(`📊 Connection Status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    console.log(`🔗 Host: ${mongoose.connection.host}`);
    
    // Setup connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('✅ Mongoose connected to DB');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err.message);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  Mongoose disconnected from DB');
    });
    
    // Start the keep-alive service
    startKeepAliveService();
    
  } catch (error) {
    isConnecting = false;
    console.error('❌ MongoDB Connection Failed:', error.message);
    
    // Retry logic with exponential backoff
    if (connectionAttempts < 5) {
      const delay = Math.min(1000 * Math.pow(2, connectionAttempts), 30000);
      console.log(`⏳ Retrying in ${delay/1000} seconds...`);
      setTimeout(connectDB, delay);
    } else {
      console.error('💥 Max connection attempts reached. Please check:');
      console.error('1. MongoDB server status');
      console.error('2. Internet connection');
      console.error('3. MongoDB credentials');
    }
  }
};

// ============================================
// 🔄 MANUAL KEEP-ALIVE SERVICE
// ============================================
let keepAliveInterval;

function startKeepAliveService() {
  // Clear any existing interval
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval);
  }
  
  // Send ping every 5 minutes to keep connection alive
  keepAliveInterval = setInterval(async () => {
    try {
      if (mongoose.connection.readyState === 1) {
        const startTime = Date.now();
        await mongoose.connection.db.command({ ping: 1 });
        const pingTime = Date.now() - startTime;
        
        console.log(`❤️  Keep-alive ping successful (${pingTime}ms) - ${new Date().toLocaleTimeString()}`);
      } else {
        console.log('⚠️  Connection lost, attempting reconnect...');
        connectDB();
      }
    } catch (error) {
      console.log('⚠️  Keep-alive failed:', error.message);
      connectDB(); // Try to reconnect
    }
  }, 5 * 60 * 1000); // 5 minutes
  
  console.log('🔄 Keep-alive service started (5 minute intervals)');
}

// ============================================
// INITIAL DATABASE CONNECTION
// ============================================
connectDB();

// ============================================
// ROUTES
// ============================================
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/admin', adminRoutes);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API is working',
    environment: process.env.NODE_ENV || 'development',
    cloudinary: process.env.CLOUDINARY_CLOUD_NAME ? 'Configured' : 'Not Configured',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    connectionState: mongoose.connection.readyState,
    connectionAttempts: connectionAttempts
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    databaseState: mongoose.connection.readyState,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 🆕 NEW: Keep-alive ping endpoint (for external services)
app.get('/api/ping', async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Test MongoDB connection
    let dbStatus = 'disconnected';
    let pingTime = null;
    
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.db.command({ ping: 1 });
      dbStatus = 'connected';
      pingTime = Date.now() - startTime;
    }
    
    res.json({
      success: true,
      message: 'Server is alive',
      serverTime: new Date().toISOString(),
      mongodb: dbStatus,
      mongodbState: mongoose.connection.readyState,
      responseTime: pingTime ? `${pingTime}ms` : 'N/A',
      uptime: process.uptime(),
      connectionAttempts: connectionAttempts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database connection issue',
      error: error.message,
      mongodbState: mongoose.connection.readyState
    });
  }
});

// 🆕 NEW: Wake-up endpoint (triggers connection)
app.get('/api/wakeup', async (req, res) => {
  try {
    console.log('🔔 Manual wake-up triggered');
    
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }
    
    res.json({
      success: true,
      message: 'Wake-up initiated',
      previousState: mongoose.connection.readyState,
      currentState: mongoose.connection.readyState,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Wake-up failed',
      error: error.message
    });
  }
});

// 🆕 NEW: Connection status endpoint
app.get('/api/connection-status', (req, res) => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({
    mongodb: {
      state: mongoose.connection.readyState,
      status: states[mongoose.connection.readyState] || 'unknown',
      host: mongoose.connection.host,
      name: mongoose.connection.name,
      readyState: mongoose.connection.readyState
    },
    server: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString()
    }
  });
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ============================================
// SERVER START
// ============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
  console.log(`☁️  Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME ? 'Ready' : 'Not Configured'}`);
  console.log(`🗄️  MongoDB State: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected (Connecting...)'}`);
  console.log(`⏰ Server time: ${new Date().toLocaleString()}`);
  
  // Log all available endpoints
  console.log('\n📡 Available Endpoints:');
  console.log(`  GET  /api/test              - Test API`);
  console.log(`  GET  /api/health            - Health check`);
  console.log(`  GET  /api/ping              - Ping with DB check`);
  console.log(`  GET  /api/wakeup            - Manual wake-up`);
  console.log(`  GET  /api/connection-status - Connection details`);
  console.log(`  GET  /api/volunteers/*      - Volunteer routes`);
  console.log(`  GET  /api/admin/*           - Admin routes`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval);
  }
  
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
  }
  
  process.exit(0);
});