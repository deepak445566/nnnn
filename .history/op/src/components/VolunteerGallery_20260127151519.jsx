import React, { useState, useEffect } from 'react';
import { volunteerAPI } from '../services/api';
import { 
  Search, Filter, Download, User, Grid, List, Eye, Trash2, 
  Crown, Award, Users, Phone, MapPin, Calendar, IdCard, 
  Shield, RefreshCw, Printer, Share2, QrCode, ChevronRight,
  Star, CheckCircle, Tag, Mail
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import MiniVolunteerCard from './VolunteerCard';

const VolunteerGallery = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAakNo, setSelectedAakNo] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [volunteerToDelete, setVolunteerToDelete] = useState(null);
  
  const [selectedRole, setSelectedRole] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [batchSize, setBatchSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [roleCounts, setRoleCounts] = useState({
    all: 0,
    president: 0,
    'vice-president': 0,
    'soorveer yodha': 0
  });

  // Fetch all volunteers from database only
  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      
      const response = await volunteerAPI.getAllVolunteers();
      
      if (response.success && response.data) {
        const volunteersData = response.data;
        
        // Sort by role importance
        const sortedVolunteers = volunteersData.sort((a, b) => {
          const roleOrder = { 'president': 3, 'vice-president': 2, 'employee': 1 };
          return (roleOrder[b.role] || 0) - (roleOrder[a.role] || 0);
        });
        
        setVolunteers(sortedVolunteers);
        setFilteredVolunteers(sortedVolunteers);
        
        // Calculate role counts
        const counts = {
          all: sortedVolunteers.length,
          president: sortedVolunteers.filter(v => v.role === 'president').length,
          'vice-president': sortedVolunteers.filter(v => v.role === 'vice-president').length,
          employee: sortedVolunteers.filter(v => v.role === 'employee').length
        };
        setRoleCounts(counts);
      } else {
        toast.error('Failed to load volunteers');
        setVolunteers([]);
        setFilteredVolunteers([]);
      }
      
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      toast.error('Failed to load volunteers');
      setVolunteers([]);
      setFilteredVolunteers([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchVolunteers();
  }, []);

  // Filter volunteers with new filters
  useEffect(() => {
    let results = [...volunteers];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(v =>
        v.name.toLowerCase().includes(term) ||
        v.aakNo.toLowerCase().includes(term) ||
        v.mobileNo.includes(term) ||
        v.address.toLowerCase().includes(term)
      );
    }
    
    if (selectedAakNo) {
      results = results.filter(v => v.aakNo === selectedAakNo);
    }
    
    // Role filter
    if (selectedRole !== 'all') {
      results = results.filter(v => v.role === selectedRole);
    }
    
    // Sorting
    switch(sortBy) {
      case 'newest':
        results.sort((a, b) => new Date(b.joinDate || b.createdAt) - new Date(a.joinDate || a.createdAt));
        break;
      case 'oldest':
        results.sort((a, b) => new Date(a.joinDate || a.createdAt) - new Date(b.joinDate || b.createdAt));
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
  }, [searchTerm, selectedAakNo, selectedRole, sortBy, volunteers]);

  // Get unique AAK numbers for filter
  const aakNumbers = [...new Set(volunteers.map(v => v.aakNo))].sort();

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

  // Print ID Card
  const printIDCard = (volunteer) => {
    toast.loading('Opening print dialog...');
    setTimeout(() => {
      toast.dismiss();
      window.print();
    }, 1000);
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
      navigator.clipboard.writeText(`${volunteer.name} - AAK No: ${volunteer.aakNo}`);
      toast.success('Profile link copied to clipboard!');
    }
  };

  // Download all ID cards as ZIP
  const handleDownloadAll = async () => {
    toast.loading('Preparing downloads... This may take a moment');
    setTimeout(() => {
      toast.dismiss();
      toast.success('Please download each card individually for best quality');
    }, 1500);
  };

  // Delete volunteer
  const handleDeleteVolunteer = async (volunteerId) => {
    try {
      const response = await volunteerAPI.deleteVolunteer(volunteerId);
      if (response.success) {
        toast.success('Volunteer deleted successfully');
        fetchVolunteers();
        setShowDeleteModal(false);
        setVolunteerToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting volunteer:', error);
      toast.error('Failed to delete volunteer');
    }
  };

  // Confirm delete
  const confirmDelete = (volunteer) => {
    setVolunteerToDelete(volunteer);
    setShowDeleteModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading volunteers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Volunteer ID Card Gallery</h1>
            <p className="text-blue-100 opacity-90 mb-6">
              View and manage all volunteer ID cards. Total: {volunteers.length} volunteers
            </p>
            
            {/* Role Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total</p>
                    <h3 className="text-xl font-bold">{roleCounts.all}</h3>
                  </div>
                  <Users className="w-6 h-6 text-white opacity-80" />
                </div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">President</p>
                    <h3 className="text-xl font-bold">{roleCounts.president}</h3>
                  </div>
                  <Crown className="w-6 h-6 text-yellow-300" />
                </div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Vice President</p>
                    <h3 className="text-xl font-bold">{roleCounts['vice-president']}</h3>
                  </div>
                  <Award className="w-6 h-6 text-purple-300" />
                </div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-100 text-sm">Employees</p>
                    <h3 className="text-xl font-bold">{roleCounts.employee}</h3>
                  </div>
                  <User className="w-6 h-6 text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Controls */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, AAK No, mobile, or address..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-md transition ${viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded-md transition ${viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Refresh */}
              <button
                onClick={fetchVolunteers}
                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filters</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Role Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Role
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedRole('all')}
                      className={`px-3 py-1.5 rounded-lg text-sm transition ${selectedRole === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setSelectedRole('president')}
                      className={`px-3 py-1.5 rounded-lg text-sm transition flex items-center gap-1 ${selectedRole === 'president' ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
                    >
                      <Crown className="w-3 h-3" />
                      President
                    </button>
                    <button
                      onClick={() => setSelectedRole('vice-president')}
                      className={`px-3 py-1.5 rounded-lg text-sm transition flex items-center gap-1 ${selectedRole === 'vice-president' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
                    >
                      <Award className="w-3 h-3" />
                      Vice Pres.
                    </button>
                    <button
                      onClick={() => setSelectedRole('employee')}
                      className={`px-3 py-1.5 rounded-lg text-sm transition ${selectedRole === 'employee' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      Employees
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="role">Role (High to Low)</option>
                  </select>
                </div>

                {/* AAK Number Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by AAK No
                  </label>
                  <select
                    value={selectedAakNo}
                    onChange={(e) => setSelectedAakNo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">All AAK Numbers</option>
                    {aakNumbers.map((aak) => (
                      <option key={aak} value={aak}>{aak}</option>
                    ))}
                  </select>
                </div>

                {/* Items per page */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Volunteers per page
                  </label>
                  <select
                    value={batchSize}
                    onChange={(e) => setBatchSize(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value={6}>6 per page</option>
                    <option value={12}>12 per page</option>
                    <option value={24}>24 per page</option>
                    <option value={48}>48 per page</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters Button */}
              {(searchTerm || selectedAakNo || selectedRole !== 'all') && (
                <div className="mt-4">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedAakNo('');
                      setSelectedRole('all');
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto mb-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            Showing {Math.min(currentVolunteers.length, filteredVolunteers.length)} of {filteredVolunteers.length} volunteers
            {searchTerm && ` for "${searchTerm}"`}
            {selectedAakNo && ` with AAK: ${selectedAakNo}`}
            {selectedRole !== 'all' && ` • Role: ${selectedRole}`}
          </p>
          
          {/* Pagination info */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Volunteers Display */}
      {filteredVolunteers.length === 0 ? (
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <User className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {volunteers.length === 0 ? 'No volunteers registered yet' : 'No volunteers found'}
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedAakNo || selectedRole !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Register a new volunteer to get started.'}
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Grid View */}
          {viewMode === 'grid' ? (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentVolunteers.map((volunteer) => (
                  <div key={volunteer._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                    {/* Volunteer Header with Role Badge */}
                    <div className="relative">
                      {volunteer.role !== 'employee' && (
                        <div className={`absolute top-3 right-3 z-10 ${volunteer.role === 'president' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                          {volunteer.role === 'president' ? '👑 President' : '🥈 Vice Pres.'}
                        </div>
                      )}
                    </div>
                    
                    {/* Volunteer Summary */}
                    <div className="p-4 border-b">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                          <img 
                            src={volunteer.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff&size=96&bold=true`}
                            alt={volunteer.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff&size=96&bold=true`;
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 truncate">{volunteer.name}</h3>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-600">{volunteer.aakNo}</p>
                            <RoleBadge role={volunteer.role} />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Mobile:</span>
                          <div className="font-medium">+91 {volunteer.mobileNo}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Join Date:</span>
                          <div className="font-medium">
                            {new Date(volunteer.joinDate || volunteer.createdAt).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* ID Card Preview */}
                    <div className="p-4">
                      <div className="border-2 border-gray-200 rounded-lg overflow-hidden transform scale-90 origin-top">
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white overflow-hidden">
                              <img 
                                src="/images/logo.jpg" 
                                alt="Logo"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.parentElement.innerHTML = '<div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs">LOGO</div>';
                                }}
                              />
                            </div>
                            <div className="text-white text-sm font-semibold truncate">
                              Soorveer Yuva Sangathan Trust
                            </div>
                          </div>
                        </div>
                        <div className="p-3 bg-white">
                          <div className="text-center text-xs text-gray-500">
                            ID Card Preview - Click View to see full card
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="p-4 bg-gray-50 border-t">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewVolunteer(volunteer)}
                          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center text-sm"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Card
                        </button>
                        
                        <button
                          onClick={() => printIDCard(volunteer)}
                          className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                          title="Print"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => shareProfile(volunteer)}
                          className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                          title="Share"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination for grid view */}
              {totalPages > 1 && filteredVolunteers.length > batchSize && (
                <div className="mt-6 flex justify-center gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* List View */
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">Photo</th>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">AAK No</th>
                      <th className="py-3 px-4 text-left">Role</th>
                      <th className="py-3 px-4 text-left">Mobile</th>
                      <th className="py-3 px-4 text-left">Address</th>
                      <th className="py-3 px-4 text-left">Join Date</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentVolunteers.map((volunteer, index) => (
                      <tr 
                        key={volunteer._id} 
                        className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                      >
                        <td className="py-3 px-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img 
                              src={volunteer.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff&size=96&bold=true`}
                              alt={volunteer.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium">{volunteer.name}</td>
                        <td className="py-3 px-4 font-semibold text-blue-600">{volunteer.aakNo}</td>
                        <td className="py-3 px-4">
                          <RoleBadge role={volunteer.role} />
                        </td>
                        <td className="py-3 px-4">+91 {volunteer.mobileNo}</td>
                        <td className="py-3 px-4 text-sm max-w-xs truncate">{volunteer.address}</td>
                        <td className="py-3 px-4 text-sm">
                          {new Date(volunteer.joinDate || volunteer.createdAt).toLocaleDateString('en-IN')}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewVolunteer(volunteer)}
                              className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition flex items-center"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </button>
                            <button
                              onClick={() => printIDCard(volunteer)}
                              className="px-2 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                              title="Print"
                            >
                              <Printer className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => shareProfile(volunteer)}
                              className="px-2 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                              title="Share"
                            >
                              <Share2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => confirmDelete(volunteer)}
                              className="px-2 py-1 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                              title="Delete"
                            >
                              <Trash2 className="w-3 h-3" />
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

      {/* Modal for Full ID Card View */}
      {selectedVolunteer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  ID Card - {selectedVolunteer.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-600">{selectedVolunteer.aakNo}</span>
                  <RoleBadge role={selectedVolunteer.role} />
                </div>
              </div>
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              {/* Enhanced details section */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img 
                      src={selectedVolunteer.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedVolunteer.name)}&background=4f46e5&color=fff&size=200&bold=true`}
                      alt={selectedVolunteer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{selectedVolunteer.name}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>+91 {selectedVolunteer.mobileNo}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {new Date(selectedVolunteer.joinDate || selectedVolunteer.createdAt).toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">Address</span>
                    </div>
                    <p className="text-gray-700">{selectedVolunteer.address}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <IdCard className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">AAK Number</span>
                    </div>
                    <p className="text-blue-600 font-bold">{selectedVolunteer.aakNo}</p>
                  </div>
                </div>
              </div>
              
              <MiniVolunteerCard volunteer={selectedVolunteer} />
            </div>
            <div className="p-4 border-t flex justify-between gap-3">
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Close
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={() => printIDCard(selectedVolunteer)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print ID Card
                </button>
                
                <button
                  onClick={() => shareProfile(selectedVolunteer)}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && volunteerToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Delete Volunteer</h3>
                  <p className="text-gray-600 text-sm">This action cannot be undone</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete <span className="font-bold">{volunteerToDelete.name}</span> (AAK: {volunteerToDelete.aakNo})? This will permanently remove their ID card and all associated data.
              </p>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setVolunteerToDelete(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteVolunteer(volunteerToDelete._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Volunteer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            शूरवीर युवा ट्रस्ट Volunteer Management System
          </p>
          <div className="flex justify-center gap-6 mt-2 text-xs text-gray-500">
            <span>Total Volunteers: {roleCounts.all}</span>
            <span>President: {roleCounts.president}</span>
            <span>Vice President: {roleCounts['vice-president']}</span>
            <span>Employees: {roleCounts.employee}</span>
          </div>
          <p className="mt-2 text-gray-500 text-sm">
            Use the search and filter options to find specific volunteers
          </p>
        </div>
      </div>
    </div>
  );
};

export default VolunteerGallery;