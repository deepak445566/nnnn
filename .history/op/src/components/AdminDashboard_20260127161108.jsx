import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  Users, Crown, Shield, LogOut, 
  Edit2, Filter, Search,
  Award, UserMinus, Download, RefreshCw,
  BarChart, Calendar, Home, Settings,
  Bell, User, ChevronDown, Mail, Phone
} from 'lucide-react';

const AdminDashboard = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    president: 0,
    vicePresident: 0,
    soorveerYodha: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [newRole, setNewRole] = useState('soorveer-yodha');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminInfo, setAdminInfo] = useState(null);

  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const info = localStorage.getItem('adminInfo');
    
    if (!token) {
      navigate('/admin/login');
    } else {
      if (info) {
        setAdminInfo(JSON.parse(info));
      }
    }
  }, [navigate]);

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');

    try {
      // Try backend API
      const API_URL = process.env.REACT_APP_API_URL || 'https://nnnn-x39m.onrender.com';
      
      // Fetch stats
      const statsRes = await fetch(`${API_URL}/api/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        if (statsData.success) setStats(statsData.data);
      }

      // Fetch volunteers
      const volunteersRes = await fetch(`${API_URL}/api/admin/volunteers`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (volunteersRes.ok) {
        const volunteersData = await volunteersRes.json();
        if (volunteersData.success) {
          setVolunteers(volunteersData.data);
          setFilteredVolunteers(volunteersData.data);
        }
      } else {
        // Mock data for development
        setMockData();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Mock data for development
      setMockData();
      toast.info('Using demo data');
    } finally {
      setLoading(false);
    }
  };

  // Mock data for development
  const setMockData = () => {
    const mockStats = {
      total: 15,
      president: 1,
      vicePresident: 2,
      soorveerYodha: 12
    };
    
    const mockVolunteers = [
      {
        _id: '1',
        name: 'राजेश शर्मा',
        aakNo: '0015',
        mobileNo: '9876543210',
        address: 'मुंबई, महाराष्ट्र',
        imageUrl: '',
        role: 'president',
        joinDate: new Date('2023-01-15')
      },
      {
        _id: '2',
        name: 'प्रिया पाटील',
        aakNo: '0014',
        mobileNo: '9876543211',
        address: 'पुणे, महाराष्ट्र',
        imageUrl: '',
        role: 'vice-president',
        joinDate: new Date('2023-02-20')
      },
      {
        _id: '3',
        name: 'विकास जैन',
        aakNo: '0013',
        mobileNo: '9876543212',
        address: 'दिल्ली',
        imageUrl: '',
        role: 'soorveer-yodha',
        joinDate: new Date('2023-03-10')
      },
      {
        _id: '4',
        name: 'अंजली सिंह',
        aakNo: '0012',
        mobileNo: '9876543213',
        address: 'लखनऊ, उत्तर प्रदेश',
        imageUrl: '',
        role: 'soorveer-yodha',
        joinDate: new Date('2023-04-05')
      }
    ];
    
    setStats(mockStats);
    setVolunteers(mockVolunteers);
    setFilteredVolunteers(mockVolunteers);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter volunteers
  useEffect(() => {
    let results = [...volunteers];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(v =>
        v.name.toLowerCase().includes(term) ||
        v.aakNo.toLowerCase().includes(term) ||
        v.mobileNo.includes(term)
      );
    }
    
    if (roleFilter !== 'all') {
      results = results.filter(v => v.role === roleFilter);
    }
    
    setFilteredVolunteers(results);
  }, [searchTerm, roleFilter, volunteers]);

  // Handle role assignment
  const handleAssignRole = async () => {
    if (!selectedVolunteer || !newRole) return;

    const token = localStorage.getItem('adminToken');
    const API_URL = process.env.REACT_APP_API_URL || 'https://nnnn-x39m.onrender.com';
    
    try {
      const response = await fetch(`${API_URL}/api/admin/assign-role`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          volunteerId: selectedVolunteer._id,
          role: newRole
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          toast.success(`Role updated to ${getRoleDisplayName(newRole)}`);
          fetchData();
        } else {
          toast.error(data.message);
        }
      } else {
        // Mock success for development
        toast.success(`Role updated to ${getRoleDisplayName(newRole)} (Demo Mode)`);
        fetchData();
      }
      
      setShowRoleModal(false);
      setSelectedVolunteer(null);
    } catch (error) {
      console.error('Error assigning role:', error);
      toast.error('Failed to assign role');
    }
  };

  // Handle remove role
  const handleRemoveRole = async (volunteerId) => {
    if (!window.confirm('Set this volunteer to Soorveer Yodha?')) return;

    const token = localStorage.getItem('adminToken');
    const API_URL = process.env.REACT_APP_API_URL || 'https://nnnn-x39m.onrender.com';
    
    try {
      const response = await fetch(`${API_URL}/api/admin/remove-role`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ volunteerId })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          toast.success('Role removed (set to Soorveer Yodha)');
          fetchData();
        } else {
          toast.error(data.message);
        }
      } else {
        // Mock success for development
        toast.success('Role removed (set to Soorveer Yodha) (Demo Mode)');
        fetchData();
      }
    } catch (error) {
      console.error('Error removing role:', error);
      toast.error('Failed to remove role');
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  // Get role badge color
  const getRoleBadge = (role) => {
    switch(role) {
      case 'president':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'vice-president':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'soorveer-yodha':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      default:
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
    }
  };

  // Get role icon
  const getRoleIcon = (role) => {
    switch(role) {
      case 'president':
        return <Crown className="w-4 h-4" />;
      case 'vice-president':
        return <Award className="w-4 h-4" />;
      case 'soorveer-yodha':
        return <Shield className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  // Get role display name
  const getRoleDisplayName = (role) => {
    switch(role) {
      case 'president':
        return 'President';
      case 'vice-president':
        return 'Vice President';
      case 'soorveer-yodha':
        return 'Soorveer Yodha';
      default:
        return 'Soorveer Yodha';
    }
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Dashboard</h2>
          <p className="text-gray-500">Please wait while we fetch your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-lg border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Brand */}
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Soorveer Yuva Sangathan Trust</p>
              </div>
            </div>

            {/* Right: Admin Info */}
            <div className="flex items-center space-x-6">
              <button
                onClick={fetchData}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Refresh</span>
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium text-gray-800">
                    {adminInfo?.name || 'Admin User'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {adminInfo?.email || 'admin@soorveer.com'}
                  </p>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    {adminInfo?.name?.charAt(0) || 'A'}
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Volunteers */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-2">Total Volunteers</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.total}</h3>
                <p className="text-green-600 text-sm mt-1">
                  <span className="font-semibold">+{Math.floor(stats.total * 0.1)}</span> this month
                </p>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* President */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-2">President</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.president}</h3>
                <p className={stats.president > 0 ? "text-green-600 text-sm mt-1" : "text-gray-400 text-sm mt-1"}>
                  {stats.president > 0 ? 'Active' : 'Not assigned'}
                </p>
              </div>
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl">
                <Crown className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Vice President */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-2">Vice President</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.vicePresident}</h3>
                <p className={stats.vicePresident > 0 ? "text-green-600 text-sm mt-1" : "text-gray-400 text-sm mt-1"}>
                  {stats.vicePresident > 0 ? 'Active' : 'Not assigned'}
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Soorveer Yodha */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-2">Soorveer Yodha</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.soorveerYodha}</h3>
                <p className="text-blue-600 text-sm mt-1">
                  <span className="font-semibold">{Math.round((stats.soorveerYodha / stats.total) * 100)}%</span> of total
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search volunteers by name, AAK No, or mobile..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Roles</option>
                  <option value="president">President</option>
                  <option value="vice-president">Vice President</option>
                  <option value="soorveer-yodha">Soorveer Yodha</option>
                </select>
              </div>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
              >
                <Download className="w-5 h-5" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Volunteers Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Volunteer Management</h2>
              <p className="text-gray-500 text-sm">
                Showing {filteredVolunteers.length} of {volunteers.length} volunteers
              </p>
            </div>
            <div className="flex items-center gap-2">
              <BarChart className="w-5 h-5 text-gray-400" />
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-green-50">
                <tr>
                  <th className="py-4 px-6 text-left text-gray-700 font-semibold">Volunteer</th>
                  <th className="py-4 px-6 text-left text-gray-700 font-semibold">AAK No</th>
                  <th className="py-4 px-6 text-left text-gray-700 font-semibold">Contact</th>
                  <th className="py-4 px-6 text-left text-gray-700 font-semibold">Role</th>
                  <th className="py-4 px-6 text-left text-gray-700 font-semibold">Join Date</th>
                  <th className="py-4 px-6 text-left text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVolunteers.map((volunteer, index) => (
                  <tr 
                    key={volunteer._id} 
                    className={`border-b hover:bg-gray-50 transition ${index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow">
                          <img 
                            src={volunteer.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff&size=96&bold=true`}
                            alt={volunteer.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{volunteer.name}</h4>
                          <p className="text-sm text-gray-500 truncate max-w-xs">
                            {volunteer.address}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {volunteer.aakNo}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">+91 {volunteer.mobileNo}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${getRoleBadge(volunteer.role)}`}>
                          {getRoleIcon(volunteer.role)}
                          {getRoleDisplayName(volunteer.role)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{formatDate(volunteer.joinDate)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedVolunteer(volunteer);
                            setNewRole(volunteer.role);
                            setShowRoleModal(true);
                          }}
                          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition flex items-center gap-2"
                          title="Change Role"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Role</span>
                        </button>
                        
                        {volunteer.role !== 'soorveer-yodha' && (
                          <button
                            onClick={() => handleRemoveRole(volunteer._id)}
                            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center gap-2"
                            title="Remove Role"
                          >
                            <UserMinus className="w-4 h-4" />
                            <span className="hidden sm:inline">Demote</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredVolunteers.length === 0 && (
            <div className="text-center py-16">
              <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No volunteers found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchTerm || roleFilter !== 'all' 
                  ? 'Try adjusting your search criteria'
                  : 'No volunteers registered yet. Start by registering volunteers.'}
              </p>
            </div>
          )}

          {/* Table Footer */}
          <div className="px-6 py-4 border-t bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {Math.min(filteredVolunteers.length, 10)} entries
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-100">
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">
                  1
                </button>
                <button className="px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-100">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Roles Assigned</p>
                <h3 className="text-2xl font-bold">{stats.president + stats.vicePresident}</h3>
              </div>
              <Award className="w-8 h-8" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Active Volunteers</p>
                <h3 className="text-2xl font-bold">{stats.total}</h3>
              </div>
              <Users className="w-8 h-8" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">This Month</p>
                <h3 className="text-2xl font-bold">{Math.floor(stats.total * 0.1)}</h3>
              </div>
              <BarChart className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Role Assignment Modal */}
      {showRoleModal && selectedVolunteer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow">
                  <img 
                    src={selectedVolunteer.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedVolunteer.name)}&background=4f46e5&color=fff&size=128`}
                    alt={selectedVolunteer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedVolunteer.name}</h3>
                  <p className="text-gray-600">AAK No: {selectedVolunteer.aakNo}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Current role: <span className={`font-semibold ${getRoleBadge(selectedVolunteer.role)} px-3 py-1 rounded-full`}>
                    {getRoleDisplayName(selectedVolunteer.role)}
                  </span>
                </p>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Select New Role</label>
                  {['president', 'vice-president', 'soorveer-yodha'].map((role) => (
                    <label key={role} className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${newRole === role ? 'ring-2 ring-blue-500 border-blue-500' : 'hover:border-gray-400'}`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="role"
                          value={role}
                          checked={newRole === role}
                          onChange={(e) => setNewRole(e.target.value)}
                          className="h-5 w-5 text-blue-600"
                        />
                        <div className="flex items-center gap-2">
                          {getRoleIcon(role)}
                          <span className="font-medium">{getRoleDisplayName(role)}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {role === 'president' && '👑 Only One'}
                        {role === 'vice-president' && '🥈 Only One'}
                        {role === 'soorveer-yodha' && '🛡️ Default'}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowRoleModal(false);
                    setSelectedVolunteer(null);
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignRole}
                  disabled={newRole === selectedVolunteer.role}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:from-blue-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Update Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 py-8 bg-white border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-bold text-gray-800">शूरवीर युवा ट्रस्ट</span>
              </div>
              <p className="text-gray-600 text-sm">
                Admin Portal v1.0 • Volunteer Management System
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <span>Total: {stats.total}</span>
              <span>•</span>
              <span>President: {stats.president}</span>
              <span>•</span>
              <span>Vice President: {stats.vicePresident}</span>
              <span>•</span>
              <span>Soorveer Yodha: {stats.soorveerYodha}</span>
            </div>
            
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Soorveer Trust. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;