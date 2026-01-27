const Volunteer = require('../models/Volunteer');
const jwt = require('jsonwebtoken');

// Admin Login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check admin credentials
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        email: email,
        role: 'admin',
        name: 'Soorveer Admin'
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        email: email,
        name: 'Soorveer Admin',
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get all volunteers with roles
exports.getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find()
      .sort({ 
        role: -1, // president first
        createdAt: -1 
      })
      .select('-__v');

    res.json({
      success: true,
      count: volunteers.length,
      data: volunteers
    });
  } catch (error) {
    console.error('Error getting volunteers:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Assign/Update Role
exports.assignRole = async (req, res) => {
  try {
    const { volunteerId, role } = req.body;
    const adminEmail = req.admin.email;

    // Validate role
    const validRoles = ['employee', 'president', 'vice-president'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be: employee, president, or vice-president'
      });
    }

    // Check if role already assigned to someone else
    if (role === 'president' || role === 'vice-president') {
      const existing = await Volunteer.findOne({ 
        role: role,
        _id: { $ne: volunteerId } // exclude current volunteer
      });

      if (existing) {
        // Remove previous role holder
        existing.role = 'employee';
        existing.assignedBy = {
          adminEmail: adminEmail,
          assignedAt: new Date()
        };
        await existing.save();
      }
    }

    // Update volunteer role
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }

    volunteer.role = role;
    volunteer.assignedBy = {
      adminEmail: adminEmail,
      assignedAt: new Date()
    };

    await volunteer.save();

    res.json({
      success: true,
      message: `Role updated to ${role} successfully`,
      data: volunteer
    });

  } catch (error) {
    console.error('Error assigning role:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const total = await Volunteer.countDocuments();
    const president = await Volunteer.countDocuments({ role: 'president' });
    const vicePresident = await Volunteer.countDocuments({ role: 'vice-president' });
    const employees = await Volunteer.countDocuments({ role: 'employee' });

    res.json({
      success: true,
      data: {
        total,
        president,
        vicePresident,
        employees
      }
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Remove role (set to employee)
exports.removeRole = async (req, res) => {
  try {
    const { volunteerId } = req.body;
    const adminEmail = req.admin.email;

    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }

    volunteer.role = 'Soorveer Yodha';
    volunteer.assignedBy = {
      adminEmail: adminEmail,
      assignedAt: new Date()
    };

    await volunteer.save();

    res.json({
      success: true,
      message: 'Role removed (set to employee)',
      data: volunteer
    });

  } catch (error) {
    console.error('Error removing role:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};