import React, { useState, useEffect } from 'react';
import { volunteerAPI } from '../services/api';
import { 
  Search, Filter, Download, User, Grid, List, Eye, Trash2, 
  Crown, Award, Users, Phone, MapPin, Calendar, IdCard, 
  Shield, RefreshCw, Printer, Share2, QrCode, ChevronRight,
  Star, CheckCircle, Tag, Mail, Clock, Database, HardDrive, Battery, WifiOff
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
    employee: 0
  });

  // Cache settings - 10 MINUTES ONLY
  const CACHE_KEY = 'volunteer_gallery_cache_v2';
  const CACHE_TIMESTAMP_KEY = 'volunteer_gallery_timestamp_v2';
  const CACHE_DURATION = 10 * 60 * 1000; // 10 MINUTES ONLY
  const BACKGROUND_REFRESH_INTERVAL = 2 * 60 * 1000; // 2 minutes for background refresh
  const [cacheTimestamp, setCacheTimestamp] = useState(null);
  const [isUsingCache, setIsUsingCache] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(null);
  const [dataSource, setDataSource] = useState('fetching');
  const [cacheExpiryTime, setCacheExpiryTime] = useState(null);

  // Process volunteers data
  const processVolunteersData = (volunteersData) => {
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
  };

  // Clear old cache
  const clearOldCache = () => {
    const oldKeys = [
      'volunteer_gallery_cache',
      'volunteer_gallery_timestamp',
      'volunteer_gallery_cache_v1',
      'volunteer_gallery_timestamp_v1'
    ];
    
    oldKeys.forEach(key => {
      localStorage.removeItem(key);
    });
  };

  // Get cache status
  const getCacheStatus = () => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    
    if (!cachedData || !cachedTime) {
      return {
        exists: false,
        age: null,
        isExpired: true,
        expiryTime: null
      };
    }
    
    const age = Date.now() - parseInt(cachedTime);
    const isExpired = age > CACHE_DURATION;
    const expiryTime = parseInt(cachedTime) + CACHE_DURATION;
    
    return {
      exists: true,
      age,
      isExpired,
      expiryTime,
      timeLeft: expiryTime - Date.now()
    };
  };

  // Load from cache
  const loadFromCache = () => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      try {
        const volunteersData = JSON.parse(cachedData);
        processVolunteersData(volunteersData);
        const cachedTime = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        setCacheTimestamp(parseInt(cachedTime));
        setDataSource('cache');
        setIsUsingCache(true);
        
        // Calculate expiry time
        const expiryTime = parseInt(cachedTime) + CACHE_DURATION;
        setCacheExpiryTime(expiryTime);
        
        return true;
      } catch (error) {
        console.error('Error parsing cache:', error);
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
        return false;
      }
    }
    return false;
  };

  // Fetch fresh data from API
  const fetchFreshData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      
      const response = await volunteerAPI.getAllVolunteers();
      
      if (response.success && response.data) {
        const volunteersData = response.data;
        
        // Save to cache
        localStorage.setItem(CACHE_KEY, JSON.stringify(volunteersData));
        const timestamp = Date.now();
        localStorage.setItem(CACHE_TIMESTAMP_KEY, timestamp.toString());
        
        // Update states
        setCacheTimestamp(timestamp);
        setLastRefreshed(timestamp);
        setDataSource('api');
        setIsUsingCache(false);
        setCacheExpiryTime(timestamp + CACHE_DURATION);
        
        // Process and display data
        processVolunteersData(volunteersData);
        
        if (!silent) {
          toast.success('Data refreshed from server');
        }
        
        return true;
      } else {
        throw new Error('Failed to load volunteers from API');
      }
    } catch (error) {
      console.error('Error fetching fresh data:', error);
      
      if (!silent) {
        // Try to load from cache even if expired
        if (loadFromCache()) {
          toast.error('Network error. Showing cached data');
        } else {
          toast.error('Failed to load volunteers. Please check connection.');
        }
      }
      
      return false;
    } finally {
      if (!silent) setLoading(false);
    }
  };

  // Silent background refresh
  const backgroundRefresh = async () => {
    const cacheStatus = getCacheStatus();
    
    // Only refresh if cache is older than 2 minutes
    if (cacheStatus.exists && cacheStatus.age < 2 * 60 * 1000) {
      return; // Cache is fresh enough
    }
    
    try {
      const response = await volunteerAPI.getAllVolunteers();
      if (response.success && response.data) {
        // Update cache silently
        const timestamp = Date.now();
        localStorage.setItem(CACHE_KEY, JSON.stringify(response.data));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, timestamp.toString());
        
        setLastRefreshed(timestamp);
        setCacheExpiryTime(timestamp + CACHE_DURATION);
        
        // Update state if page is active and cache was expired
        if (!document.hidden && cacheStatus.isExpired) {
          processVolunteersData(response.data);
          setDataSource('api-background');
        }
      }
    } catch (error) {
      console.log('Background refresh failed:', error);
    }
  };

  // Initial load with cache strategy
  useEffect(() => {
    const initializeData = async () => {
      // Clear old cache versions
      clearOldCache();
      
      const cacheStatus = getCacheStatus();
      
      if (cacheStatus.exists && !cacheStatus.isExpired) {
        // Load from cache immediately
        loadFromCache();
        setLoading(false);
        
        // Fetch fresh data in background after 1 second
        setTimeout(() => {
          backgroundRefresh();
        }, 1000);
        
        toast.success(`Loaded from cache (${Math.floor(cacheStatus.age / 1000 / 60)}m old)`);
      } else {
        // Cache expired or doesn't exist, fetch fresh
        await fetchFreshData();
      }
    };
    
    initializeData();
    
    // Set up periodic background refresh every 2 minutes
    const backgroundInterval = setInterval(() => {
      if (!document.hidden) {
        backgroundRefresh();
      }
    }, BACKGROUND_REFRESH_INTERVAL);
    
    // Set up cache expiry check every minute
    const expiryCheckInterval = setInterval(() => {
      const cacheStatus = getCacheStatus();
      if (cacheStatus.exists && cacheStatus.isExpired) {
        // Cache expired, refresh in background
        backgroundRefresh();
      }
    }, 60 * 1000);
    
    return () => {
      clearInterval(backgroundInterval);
      clearInterval(expiryCheckInterval);
    };
  }, []);

  // Handle visibility change (tab switch)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Page became visible, check cache
        const cacheStatus = getCacheStatus();
        
        if (cacheStatus.exists) {
          if (cacheStatus.isExpired) {
            // Cache expired, refresh
            fetchFreshData(true);
          } else if (cacheStatus.age > 5 * 60 * 1000) {
            // Cache older than 5 minutes, background refresh
            backgroundRefresh();
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
    };
  }, []);

  // Manual refresh function
  const handleManualRefresh = async () => {
    await fetchFreshData();
  };

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

  // Format time function
  const formatTime = (timestamp) => {
    if (!timestamp) return 'Never';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + 
           ' ' + date.toLocaleDateString();
  };

  // Get cache time left
  const getCacheTimeLeft = () => {
    if (!cacheExpiryTime) return '0m';
    
    const timeLeft = cacheExpiryTime - Date.now();
    if (timeLeft <= 0) return 'Expired';
    
    const minutesLeft = Math.floor(timeLeft / 60000);
    return `${minutesLeft}m`;
  };

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

  // Delete volunteer
  const handleDeleteVolunteer = async (volunteerId) => {
    try {
      const response = await volunteerAPI.deleteVolunteer(volunteerId);
      if (response.success) {
        toast.success('Volunteer deleted successfully');
        // Clear cache and refresh
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
        await fetchFreshData();
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

  // Clear cache manually
  const handleClearCache = () => {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
    setCacheTimestamp(null);
    setIsUsingCache(false);
    toast.success('Cache cleared. Refreshing...');
    fetchFreshData();
  };

  if (loading && volunteers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading volunteers...</p>
          <p className="text-sm text-gray-500 mt-2">
            {dataSource === 'cache' ? 'Using cached data' : 'Fetching from server'}
          </p>
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
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Volunteer ID Card Gallery</h1>
                <p className="text-blue-100 opacity-90">
                  View and manage all volunteer ID cards. Total: {volunteers.length} volunteers
                </p>
              </div>
              
              {/* Cache Status Indicator */}
              <div className="mt-4 md:mt-0">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 inline-block">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-full ${isUsingCache ? 'bg-yellow-400' : 'bg-green-400'}`}>
                        {isUsingCache ? (
                          <HardDrive className="w-4 h-4 text-white" />
                        ) : (
                          <Database className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-blue-100">
                          {isUsingCache ? 'Using Cached Data' : 'Live Data'}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-blue-200">
                          <Clock className="w-3 h-3" />
                          <span>Updated: {formatTime(lastRefreshed || cacheTimestamp)}</span>
                          {isUsingCache && (
                            <span className="bg-yellow-500/30 px-2 py-0.5 rounded-full">
                              Expires in: {getCacheTimeLeft()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
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
              {/* Refresh with cache indicator */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleManualRefresh}
                  className={`p-2 rounded-lg transition flex items-center gap-2 ${isUsingCache ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
                  title={isUsingCache ? "Refresh from server (Cache active)" : "Refresh data"}
                >
                  <RefreshCw className={`w-4 h-4 ${isUsingCache ? 'animate-pulse' : ''}`} />
                  <span className="text-sm hidden md:inline">Refresh</span>
                </button>
                
                {isUsingCache && (
                  <button
                    onClick={handleClearCache}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm"
                    title="Clear cache and refresh"
                  >
                    Clear Cache
                  </button>
                )}
              </div>

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

      {/* Data Source Indicator */}
      {isUsingCache && (
        <div className="max-w-7xl mx-auto mb-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex items-center gap-3">
              <HardDrive className="w-5 h-5 text-yellow-600" />
              <div className="flex-1">
                <p className="text-yellow-800 font-medium">
                  Showing cached data
                </p>
                <p className="text-yellow-700 text-sm">
                  Last updated: {formatTime(cacheTimestamp)} • 
                  Auto-refresh in: {getCacheTimeLeft()} • 
                  <button 
                    onClick={handleManualRefresh}
                    className="ml-2 text-yellow-800 underline hover:text-yellow-900"
                  >
                    Click to refresh now
                  </button>
                </p>
              </div>
              <button
                onClick={handleClearCache}
                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg text-sm hover:bg-yellow-200"
              >
                Clear Cache
              </button>
            </div>
          </div>
        </div>
      )}

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
            {volunteers.length === 0 ? (
              <>
                <Database className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No volunteers registered yet
                </h3>
                <p className="text-gray-500">
                  Register a new volunteer to get started.
                </p>
              </>
            ) : (
              <>
                <Search className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No volunteers found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </>
            )}
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
          <div className="mt-2 text-gray-500 text-sm">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${isUsingCache ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                <span>
                  {isUsingCache 
                    ? `Using cached data (expires in ${getCacheTimeLeft()})` 
                    : 'Live data from server'}
                </span>
              </div>
              <button 
                onClick={handleManualRefresh}
                className="text-blue-600 hover:text-blue-800 underline text-xs"
              >
                Refresh Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerGallery;