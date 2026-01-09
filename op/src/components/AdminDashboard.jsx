import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  Users, Crown, UserCheck, Shield, LogOut, 
  Edit2, Trash2, Eye, Filter, Search,
  Award, UserMinus, Download, RefreshCw
} from 'lucide-react';

const AdminDashboard = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    president: 0,
    vicePresident: 0,
    employees: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [newRole, setNewRole] = useState('employee');

  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');

    try {
      // Fetch stats
      const statsRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.data);

      // Fetch volunteers
      const volunteersRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/volunteers`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const volunteersData = await volunteersRes.json();
      if (volunteersData.success) {
        setVolunteers(volunteersData.data);
        setFilteredVolunteers(volunteersData.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
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
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/assign-role`, {
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

      const data = await response.json();

      if (data.success) {
        toast.success(`Role updated to ${newRole}`);
        fetchData(); // Refresh data
        setShowRoleModal(false);
        setSelectedVolunteer(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error assigning role:', error);
      toast.error('Failed to assign role');
    }
  };

  // Handle remove role
  const handleRemoveRole = async (volunteerId) => {
    if (!window.confirm('Set this volunteer to employee?')) return;

    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/remove-role`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ volunteerId })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Role removed (set to employee)');
        fetchData();
      } else {
        toast.error(data.message);
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
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  // Get role icon
  const getRoleIcon = (role) => {
    switch(role) {
      case 'president':
        return <Crown className="w-4 h-4" />;
      case 'vice-president':
        return <Award className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8" />
              <div>
                <h1 className="text-xl font-bold">AAK Admin Dashboard</h1>
                <p className="text-blue-100 text-sm">Soorveer Yuva Sangathan Trust</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchData}
                className="flex items-center space-x-1 bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-lg"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Volunteers</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.total}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">President</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.president}</h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Crown className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.president > 0 ? 'Active' : 'Not assigned'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Vice President</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.vicePresident}</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.vicePresident > 0 ? 'Active' : 'Not assigned'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Employees</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.employees}</h3>
              </div>
              <div className="bg-gray-100 p-3 rounded-full">
                <UserCheck className="w-8 h-8 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Volunteers
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, AAK No, or mobile..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Role
              </label>
              <div className="relative">
                <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Roles</option>
                  <option value="president">President</option>
                  <option value="vice-president">Vice President</option>
                  <option value="employee">Employees</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Volunteers Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              Volunteers ({filteredVolunteers.length})
            </h2>
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-green-50">
                <tr>
                  <th className="py-3 px-4 text-left">Photo</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">AAK No</th>
                  <th className="py-3 px-4 text-left">Mobile</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-left">Join Date</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVolunteers.map((volunteer, index) => (
                  <tr 
                    key={volunteer._id} 
                    className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={volunteer.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(volunteer.name)}&background=4f46e5&color=fff&size=96`}
                          alt={volunteer.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-800">{volunteer.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {volunteer.address}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-blue-600">
                      {volunteer.aakNo}
                    </td>
                    <td className="py-3 px-4">
                      +91 {volunteer.mobileNo}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadge(volunteer.role)}`}>
                          <span className="flex items-center space-x-1">
                            {getRoleIcon(volunteer.role)}
                            <span className="capitalize">
                              {volunteer.role.replace('-', ' ')}
                            </span>
                          </span>
                        </span>
                        {volunteer.role !== 'employee' && volunteer.assignedBy && (
                          <span className="text-xs text-gray-500" title={`Assigned by ${volunteer.assignedBy.adminEmail}`}>
                            ✓
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {new Date(volunteer.joinDate).toLocaleDateString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedVolunteer(volunteer);
                            setNewRole(volunteer.role);
                            setShowRoleModal(true);
                          }}
                          className="flex items-center space-x-1 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-lg text-sm"
                          title="Change Role"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Role</span>
                        </button>
                        
                        {volunteer.role !== 'employee' && (
                          <button
                            onClick={() => handleRemoveRole(volunteer._id)}
                            className="flex items-center space-x-1 bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-lg text-sm"
                            title="Remove Role"
                          >
                            <UserMinus className="w-3 h-3" />
                            <span>Demote</span>
                          </button>
                        )}

                        <a
                          href={`/volunteer/card/${volunteer._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-lg text-sm"
                          title="View ID Card"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredVolunteers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600">No volunteers found</h3>
              <p className="text-gray-500">
                {searchTerm || roleFilter !== 'all' 
                  ? 'Try adjusting your search criteria'
                  : 'No volunteers registered yet'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Role Assignment Modal */}
      {showRoleModal && selectedVolunteer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Change Role for {selectedVolunteer.name}
              </h3>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Current role: <span className="font-semibold capitalize">
                    {selectedVolunteer.role.replace('-', ' ')}
                  </span>
                </p>
                
                <div className="space-y-3">
                  {['president', 'vice-president', 'employee'].map((role) => (
                    <label key={role} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={newRole === role}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="h-4 w-4 text-blue-600"
                      />
                      <div className="flex items-center space-x-2">
                        {getRoleIcon(role)}
                        <span className="capitalize">{role.replace('-', ' ')}</span>
                      </div>
                      {role === 'president' && (
                        <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                          Only One
                        </span>
                      )}
                      {role === 'vice-president' && (
                        <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                          Only One
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowRoleModal(false);
                    setSelectedVolunteer(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignRole}
                  disabled={newRole === selectedVolunteer.role}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Update Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Soorveer Yuva Sangathan Trust - AAK Admin Portal
          </p>
          <p className="mt-1">
            Total Volunteers: {stats.total} | 
            President: {stats.president} | 
            Vice President: {stats.vicePresident}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;