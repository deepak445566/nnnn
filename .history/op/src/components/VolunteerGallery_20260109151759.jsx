import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  Search, Filter, Download, User, Grid, List, Eye, 
  Trash2, Crown, Award, Users, Mail, Phone, MapPin,
  Calendar, IdCard, Shield, RefreshCw, ChevronRight,
  Star, CheckCircle, Printer, Share2, QrCode, Tag
} from 'lucide-react';
import { volunteerAPI } from '../services/api';

const VolunteerGallery = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedAakNo, setSelectedAakNo] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [volunteerToDelete, setVolunteerToDelete] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [batchSize, setBatchSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all volunteers
  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      const response = await volunteerAPI.getAllVolunteers();
      
      if (response.success) {
        const volunteersData = response.data || [];
        
        // Sort by role importance first, then by date
        const sortedVolunteers = volunteersData.sort((a, b) => {
          const roleOrder = { 'president': 3, 'vice-president': 2, 'employee': 1 };
          return (roleOrder[b.role] || 0) - (roleOrder[a.role] || 0);
        });
        
        setVolunteers(sortedVolunteers);
        setFilteredVolunteers(sortedVolunteers);
      } else {
        // Fallback to mock data
        const mockVolunteers = generateMockVolunteers();
        setVolunteers(mockVolunteers);
        setFilteredVolunteers(mockVolunteers);
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      const mockVolunteers = generateMockVolunteers();
      setVolunteers(mockVolunteers);
      setFilteredVolunteers(mockVolunteers);
      toast.error('Using demo data. Connect to backend for live data.');
    } finally {
      setLoading(false);
    }
  };

  // Generate mock volunteers with roles
  const generateMockVolunteers = () => {
    const mockData = [
      {
        _id: '1',
        uniqueId: 1001,
        name: 'Rajesh Kumar',
        aakNo: 'AAK1001',
        mobileNo: '9876543210',
        address: 'Mumbai, Maharashtra',
        imageUrl: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=4f46e5&color=fff&size=200',
        role: 'president',
        joinDate: new Date('2023-01-15').toISOString(),
        assignedBy: { adminEmail: 'admin@soorveer.org', assignedAt: new Date('2023-02-01') }
      },
      {
        _id: '2',
        uniqueId: 1002,
        name: 'Priya Sharma',
        aakNo: 'AAK1002',
        mobileNo: '9876543211',
        address: 'Delhi, NCR',
        imageUrl: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=ec4899&color=fff&size=200',
        role: 'vice-president',
        joinDate: new Date('2023-02-20').toISOString(),
        assignedBy: { adminEmail: 'admin@soorveer.org', assignedAt: new Date('2023-03-01') }
      },
      {
        _id: '3',
        uniqueId: 1003,
        name: 'Amit Patel',
        aakNo: 'AAK1003',
        mobileNo: '9876543212',
        address: 'Ahmedabad, Gujarat',
        imageUrl: 'https://ui-avatars.com/api/?name=Amit+Patel&background=10b981&color=fff&size=200',
        role: 'employee',
        joinDate: new Date('2023-03-10').toISOString()
      },
      {
        _id: '4',
        uniqueId: 1004,
        name: 'Sneha Singh',
        aakNo: 'AAK1004',
        mobileNo: '9876543213',
        address: 'Lucknow, Uttar Pradesh',
        imageUrl: 'https://ui-avatars.com/api/?name=Sneha+Singh&background=f59e0b&color=fff&size=200',
        role: 'employee',
        joinDate: new Date('2023-03-15').toISOString()
      },
      {
        _id: '5',
        uniqueId: 1005,
        name: 'Vikram Yadav',
        aakNo: 'AAK1005',
        mobileNo: '9876543214',
        address: 'Patna, Bihar',
        imageUrl: 'https://ui-avatars.com/api/?name=Vikram+Yadav&background=ef4444&color=fff&size=200',
        role: 'employee',
        joinDate: new Date('2023-04-05').toISOString()
      },
      {
        _id: '6',
        uniqueId: 1006,
        name: 'Anjali Gupta',
        aakNo: 'AAK1006',
        mobileNo: '9876543215',
        address: 'Jaipur, Rajasthan',
        imageUrl: 'https://ui-avatars.com/api/?name=Anjali+Gupta&background=8b5cf6&color=fff&size=200',
        role: 'employee',
        joinDate: new Date('2023-04-20').toISOString()
      },
      {
        _id: '7',
        uniqueId: 1007,
        name: 'Rahul Verma',
        aakNo: 'AAK1007',
        mobileNo: '9876543216',
        address: 'Chandigarh',
        imageUrl: 'https://ui-avatars.com/api/?name=Rahul+Verma&background=06b6d4&color=fff&size=200',
        role: 'employee',
        joinDate: new Date('2023-05-10').toISOString()
      },
      {
        _id: '8',
        uniqueId: 1008,
        name: 'Pooja Mehta',
        aakNo: 'AAK1008',
        mobileNo: '9876543217',
        address: 'Surat, Gujarat',
        imageUrl: 'https://ui-avatars.com/api/?name=Pooja+Mehta&background=f97316&color=fff&size=200',
        role: 'employee',
        joinDate: new Date('2023-05-25').toISOString()
      }
    ];
    
    return mockData;
  };

  // Initial fetch
  useEffect(() => {
    fetchVolunteers();
  }, []);

  // Filter and sort volunteers
  useEffect(() => {
    let results = [...volunteers];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(v =>
        v.name.toLowerCase().includes(term) ||
        v.aakNo.toLowerCase().includes(term) ||
        v.mobileNo.includes(term) ||
        v.address.toLowerCase().includes(term)
      );
    }
    
    // Apply role filter
    if (selectedRole !== 'all') {
      results = results.filter(v => v.role === selectedRole);
    }
    
    // Apply AAK filter
    if (selectedAakNo) {
      results = results.filter(v => v.aakNo === selectedAakNo);
    }
    
    // Apply sorting
    switch(sortBy) {
      case 'newest':
        results.sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate));
        break;
      case 'oldest':
        results.sort((a, b) => new Date(a.joinDate) - new Date(b.joinDate));
        break;
      case 'name-asc':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        results.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'role':
        const roleOrder = { 'president': 3, 'vice-president': 2, 'employee': 1 };
        results.sort((a, b) => (roleOrder[b.role] || 0) - (roleOrder[a.role] || 0));
        break;
    }
    
    setFilteredVolunteers(results);
    setCurrentPage(1);
  }, [searchTerm, selectedRole, selectedAakNo, sortBy, volunteers]);

  // Get unique AAK numbers
  const aakNumbers = [...new Set(volunteers.map(v => v.aakNo))].sort();

  // Get role counts
  const roleCounts = {
    all: volunteers.length,
    president: volunteers.filter(v => v.role === 'president').length,
    'vice-president': volunteers.filter(v => v.role === 'vice-president').length,
    employee: volunteers.filter(v => v.role === 'employee').length
  };

  // Get paginated volunteers
  const indexOfLastVolunteer = currentPage * batchSize;
  const indexOfFirstVolunteer = indexOfLastVolunteer - batchSize;
  const currentVolunteers = filteredVolunteers.slice(indexOfFirstVolunteer, indexOfLastVolunteer);
  const totalPages = Math.ceil(filteredVolunteers.length / batchSize);

  // Role badge component
  const RoleBadge = ({ role }) => {
    const roleConfig = {
      president: {
        icon: <Crown className="w-3 h-3 mr-1" />,
        color: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
        label: 'President'
      },
      'vice-president': {
        icon: <Award className="w-3 h-3 mr-1" />,
        color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
        label: 'Vice President'
      },
      employee: {
        icon: <Users className="w-3 h-3 mr-1" />,
        color: 'bg-gray-100 text-gray-800',
        label: 'Employee'
      }
    };

    const config = roleConfig[role] || roleConfig.employee;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center ${config.color}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  // View volunteer details
  const handleViewVolunteer = (volunteer) => {
    setSelectedVolunteer(volunteer);
  };

  // Delete volunteer
  const handleDeleteVolunteer = async (volunteerId) => {
    try {
      const response = await volunteerAPI.deleteVolunteer(volunteerId);
      if (response.success) {
        toast.success('Volunteer deleted successfully');
        fetchVolunteers();
      } else {
        toast.error(response.message || 'Failed to delete volunteer');
      }
    } catch (error) {
      console.error('Error deleting volunteer:', error);
      toast.error('Failed to delete volunteer');
    } finally {
      setShowDeleteModal(false);
      setVolunteerToDelete(null);
    }
  };

  // Confirm delete
  const confirmDelete = (volunteer) => {
    setVolunteerToDelete(volunteer);
    setShowDeleteModal(true);
  };

  // Generate QR code for volunteer
  const generateQRCode = (volunteer) => {
    const qrData = {
      name: volunteer.name,
      aakNo: volunteer.aakNo,
      id: volunteer.uniqueId,
      role: volunteer.role
    };
    
    // For demo - show alert
    toast.success(`QR Code generated for ${volunteer.name}`);
    console.log('QR Code Data:', qrData);
  };

  // Share volunteer profile
  const shareProfile = async (volunteer) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${volunteer.name} - Soorveer Volunteer`,
          text: `Check out ${volunteer.name}'s profile at Soorveer Yuva Sangathan Trust`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`${volunteer.name} - AAK No: ${volunteer.aakNo}`);
      toast.success('Profile link copied to clipboard!');
    }
  };

  // Print ID Card
  const printIDCard = (volunteer) => {
    toast.loading('Opening print dialog...');
    setTimeout(() => {
      toast.dismiss();
      window.print();
    }, 1000);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading volunteers...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait while we fetch the data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-blue-600 via-green-600 to-orange-500 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">Volunteer ID Card Gallery</h1>
                  <p className="text-blue-100 text-lg">
                    Meet our dedicated team of volunteers
                  </p>
                </div>
                <Link
                  to="/volunteer/register"
                  className="mt-4 md:mt-0 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg flex items-center"
                >
                  <User className="w-5 h-5 mr-2" />
                  Register New Volunteer
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Volunteers</p>
                      <h3 className="text-2xl font-bold">{volunteers.length}</h3>
                    </div>
                    <Users className="w-8 h-8 text-white opacity-80" />
                  </div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-100 text-sm">President</p>
                      <h3 className="text-2xl font-bold">{roleCounts.president}</h3>
                    </div>
                    <Crown className="w-8 h-8 text-yellow-300" />
                  </div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Vice President</p>
                      <h3 className="text-2xl font-bold">{roleCounts['vice-president']}</h3>
                    </div>
                    <Award className="w-8 h-8 text-purple-300" />
                  </div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-100 text-sm">Employees</p>
                      <h3 className="text-2xl font-bold">{roleCounts.employee}</h3>
                    </div>
                    <User className="w-8 h-8 text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, AAK No, mobile, or address..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg transition ${viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Refresh */}
              <button
                onClick={fetchVolunteers}
                className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition flex items-center gap-2"
              >
                <Filter className="w-5 h-5" />
                <span className="hidden md:inline">Filters</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters (Collapsible) */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Role Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Role
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedRole('all')}
                      className={`px-4 py-2 rounded-lg transition ${selectedRole === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      All ({roleCounts.all})
                    </button>
                    <button
                      onClick={() => setSelectedRole('president')}
                      className={`px-4 py-2 rounded-lg transition flex items-center gap-1 ${selectedRole === 'president' ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
                    >
                      <Crown className="w-4 h-4" />
                      President ({roleCounts.president})
                    </button>
                    <button
                      onClick={() => setSelectedRole('vice-president')}
                      className={`px-4 py-2 rounded-lg transition flex items-center gap-1 ${selectedRole === 'vice-president' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
                    >
                      <Award className="w-4 h-4" />
                      Vice Pres. ({roleCounts['vice-president']})
                    </button>
                    <button
                      onClick={() => setSelectedRole('employee')}
                      className={`px-4 py-2 rounded-lg transition ${selectedRole === 'employee' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      Employees ({roleCounts.employee})
                    </button>
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="role">Role (High to Low)</option>
                  </select>
                </div>

                {/* AAK Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by AAK No
                  </label>
                  <select
                    value={selectedAakNo}
                    onChange={(e) => setSelectedAakNo(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All AAK Numbers</option>
                    {aakNumbers.map(aak => (
                      <option key={aak} value={aak}>{aak}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {filteredVolunteers.length} Volunteers Found
            </h2>
            <p className="text-gray-600 text-sm">
              {searchTerm && `Search results for "${searchTerm}"`}
              {selectedRole !== 'all' && ` • Role: ${selectedRole}`}
              {selectedAakNo && ` • AAK No: ${selectedAakNo}`}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={batchSize}
              onChange={(e) => setBatchSize(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="6">6 per page</option>
              <option value="12">12 per page</option>
              <option value="24">24 per page</option>
              <option value="48">48 per page</option>
            </select>
          </div>
        </div>

        {/* No Results */}
        {filteredVolunteers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <User className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No volunteers found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedRole !== 'all' || selectedAakNo
                ? 'Try adjusting your search or filter criteria'
                : 'No volunteers registered yet. Be the first to register!'}
            </p>
            <Link
              to="/volunteer/register"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transition"
            >
              <User className="w-5 h-5 mr-2" />
              Register First Volunteer
            </Link>
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === 'grid' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {currentVolunteers.map((volunteer) => (
                    <div 
                      key={volunteer._id} 
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {/* Volunteer Header */}
                      <div className="relative">
                        {/* Role Banner */}
                        {volunteer.role !== 'employee' && (
                          <div className={`absolute top-4 right-4 z-10 ${volunteer.role === 'president' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                            {volunteer.role === 'president' ? '👑 President' : '🥈 Vice President'}
                          </div>
                        )}
                        
                        {/* Profile Image */}
                        <div className="relative h-48 bg-gradient-to-r from-blue-100 to-green-100">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                              <img 
                                src={volunteer.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff&size=200&bold=true`}
                                alt={volunteer.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Quick Info */}
                        <div className="p-6 pt-16">
                          <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">{volunteer.name}</h3>
                          <div className="flex items-center gap-2 mb-3">
                            <IdCard className="w-4 h-4 text-blue-500" />
                            <span className="font-semibold text-blue-600">{volunteer.aakNo}</span>
                            <span className="text-gray-400">•</span>
                            <RoleBadge role={volunteer.role} />
                          </div>
                          
                          {/* Contact Info */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="w-4 h-4 mr-2 text-green-500" />
                              +91 {volunteer.mobileNo}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="w-4 h-4 mr-2 text-red-500" />
                              <span className="truncate">{volunteer.address}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                              Joined {new Date(volunteer.joinDate).toLocaleDateString('en-IN', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="p-4 bg-gray-50 border-t">
                        <div className="grid  gap-2">
                          <button
                            onClick={() => handleViewVolunteer(volunteer)}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition"
                          >
                            <Eye className="w-4 h-4" />
                            View Card
                          </button>
                          
                          
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mb-8">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-lg ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border border-gray-300'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* List View */
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-blue-50 to-green-50">
                      <tr>
                        <th className="py-4 px-6 text-left">Photo</th>
                        <th className="py-4 px-6 text-left">Name & Details</th>
                        <th className="py-4 px-6 text-left">AAK No</th>
                        <th className="py-4 px-6 text-left">Role</th>
                        <th className="py-4 px-6 text-left">Contact</th>
                        <th className="py-4 px-6 text-left">Join Date</th>
                        <th className="py-4 px-6 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentVolunteers.map((volunteer, index) => (
                        <tr 
                          key={volunteer._id}
                          className={`border-b hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}`}
                        >
                          <td className="py-4 px-6">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow">
                              <img 
                                src={volunteer.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff&size=96`}
                                alt={volunteer.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <h4 className="font-bold text-gray-800">{volunteer.name}</h4>
                              <p className="text-sm text-gray-600 truncate max-w-xs">{volunteer.address}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="font-semibold text-blue-600">{volunteer.aakNo}</div>
                            <div className="text-xs text-gray-500">ID: {volunteer.uniqueId}</div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex flex-col gap-1">
                              <RoleBadge role={volunteer.role} />
                              {volunteer.assignedBy && (
                                <div className="text-xs text-gray-500 mt-1">
                                  Assigned by Admin
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-sm">
                              <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-green-500" />
                                +91 {volunteer.mobileNo}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-sm">
                              {new Date(volunteer.joinDate).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleViewVolunteer(volunteer)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </button>
                              <button
                                onClick={() => printIDCard(volunteer)}
                                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                                title="Print"
                              >
                                <Printer className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Volunteer Detail Modal */}
      {selectedVolunteer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedVolunteer.name}'s ID Card
                </h2>
                <p className="text-gray-600">Full details and ID card preview</p>
              </div>
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Profile */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6">
                    <div className="text-center mb-6">
                      <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg mx-auto overflow-hidden mb-4">
                        <img 
                          src={selectedVolunteer.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedVolunteer.name)}&background=4f46e5&color=fff&size=200&bold=true`}
                          alt={selectedVolunteer.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">{selectedVolunteer.name}</h3>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <IdCard className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold text-blue-600">{selectedVolunteer.aakNo}</span>
                      </div>
                      <div className="mt-3">
                        <RoleBadge role={selectedVolunteer.role} />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Phone className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Mobile Number</p>
                          <p className="font-semibold">+91 {selectedVolunteer.mobileNo}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <MapPin className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-semibold">{selectedVolunteer.address}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Join Date</p>
                          <p className="font-semibold">
                            {new Date(selectedVolunteer.joinDate).toLocaleDateString('en-IN', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      {selectedVolunteer.assignedBy && (
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                            <Shield className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Role Assigned By</p>
                            <p className="font-semibold">Admin</p>
                            <p className="text-xs text-gray-500">
                              {new Date(selectedVolunteer.assignedBy.assignedAt).toLocaleDateString('en-IN')}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Right Column - ID Card Preview */}
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 h-full">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">ID Card Preview</h3>
                    
                    {/* ID Card Design */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                      {/* Card Header */}
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-white p-1">
                              <img 
                                src="/images/logo.jpg" 
                                alt="Logo"
                                className="w-full h-full object-cover rounded-full"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.parentElement.innerHTML = '<div class="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">SYST</div>';
                                }}
                              />
                            </div>
                            <div>
                              <h4 className="text-white font-bold text-lg">Soorveer Yuva Sangathan Trust</h4>
                              <p className="text-orange-100 text-sm">शूरवीर युवा ट्रस्ट</p>
                            </div>
                          </div>
                          {selectedVolunteer.role !== 'employee' && (
                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${selectedVolunteer.role === 'president' ? 'bg-yellow-500' : 'bg-purple-500'} text-white`}>
                              {selectedVolunteer.role === 'president' ? 'PRESIDENT' : 'VICE PRESIDENT'}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Card Body */}
                      <div className="p-6">
                        <div className="flex gap-6">
                          <div className="w-32 h-32 rounded-lg border-4 border-orange-100 overflow-hidden">
                            <img 
                              src={selectedVolunteer.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedVolunteer.name)}&background=4f46e5&color=fff&size=200&bold=true`}
                              alt={selectedVolunteer.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="mb-4">
                              <div className="text-sm text-gray-500">Full Name</div>
                              <div className="text-xl font-bold text-gray-800">{selectedVolunteer.name}</div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <div className="text-sm text-gray-500">AAK Number</div>
                                <div className="font-semibold text-blue-600">{selectedVolunteer.aakNo}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Volunteer ID</div>
                                <div className="font-semibold">#{selectedVolunteer.uniqueId}</div>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <div className="text-sm text-gray-500">Mobile</div>
                              <div className="font-semibold">+91 {selectedVolunteer.mobileNo}</div>
                            </div>
                            
                            <div>
                              <div className="text-sm text-gray-500">Address</div>
                              <div className="font-semibold text-sm">{selectedVolunteer.address}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-sm text-gray-500">Issued On</div>
                              <div className="font-semibold">
                                {new Date(selectedVolunteer.joinDate).toLocaleDateString('en-IN')}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">Valid Until</div>
                              <div className="font-semibold">31 Dec 2025</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Card Footer */}
                      <div className="bg-gray-50 p-4 border-t">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            This card certifies that the holder is a registered volunteer of Soorveer Yuva Sangathan Trust
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {selectedVolunteer._id.slice(-8).toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => window.print()}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transition flex items-center justify-center gap-2"
                      >
                        <Printer className="w-5 h-5" />
                        Print ID Card
                      </button>
                      <button
                        onClick={() => shareProfile(selectedVolunteer)}
                        className="flex-1 bg-white border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
                      >
                        <Share2 className="w-5 h-5" />
                        Share Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 text-left">
              <h3 className="text-xl font-bold text-gray-800">शूरवीर युवा ट्रस्ट</h3>
              <p className="text-gray-600">Volunteer Management System</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{volunteers.length}</div>
                <div className="text-sm text-gray-600">Total Volunteers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{roleCounts.president}</div>
                <div className="text-sm text-gray-600">President</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{roleCounts['vice-president']}</div>
                <div className="text-sm text-gray-600">Vice President</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-600">{roleCounts.employee}</div>
                <div className="text-sm text-gray-600">Employees</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              Use the search and filter options to find specific volunteers. 
              Admin can assign roles at <Link to="/admin/login" className="text-blue-600 hover:underline">Admin Portal</Link>
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <Link 
                to="/volunteer/register" 
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition"
              >
                Register New Volunteer
              </Link>
              <Link 
                to="/" 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Soorveer Yuva Sangathan Trust. All rights reserved.</p>
          <p className="mt-1">Volunteer Gallery v2.0 • Role-based display • Search & Filter enabled</p>
        </div>
      </div>
    </div>
  );
};

export default VolunteerGallery;