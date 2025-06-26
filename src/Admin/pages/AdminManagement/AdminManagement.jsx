import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';

const AdminManagement = () => {
  // Sample admin data
  const [admins, setAdmins] = useState([
    {
      id: 1,
      email: 'admin@clinic.com',
      username: 'superadmin',
      password: '••••••••', // Note: In real apps, never store passwords in state like this
      createdAt: '2023-06-01',
      lastLogin: '2023-06-15'
    },
    {
      id: 2,
      email: 'manager@clinic.com',
      username: 'clinicmanager',
      password: '••••••••',
      createdAt: '2023-06-05',
      lastLogin: '2023-06-14'
    },
    {
      id: 3,
      email: 'reception@clinic.com',
      username: 'receptionadmin',
      password: '••••••••',
      createdAt: '2023-06-10',
      lastLogin: '2023-06-15'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  // Filter admins
  const filteredAdmins = admins.filter(admin => {
    return (
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.username) newErrors.username = 'Username is required';
    else if (formData.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters';
    }
    
    if (!isEditing && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isEditing) {
      // Update existing admin
      setAdmins(admins.map(admin => 
        admin.id === currentAdmin.id ? { 
          ...admin, 
          email: formData.email,
          username: formData.username,
          ...(formData.password && { password: formData.password }) // Only update password if changed
        } : admin
      ));
    } else {
      // Add new admin
      const newAdmin = {
        id: Math.max(...admins.map(a => a.id), 0) + 1,
        email: formData.email,
        username: formData.username,
        password: '••••••••', // In real app, this would be hashed
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: 'Never'
      };
      setAdmins([newAdmin, ...admins]);
    }

    resetForm();
  };

  // Edit admin
  const handleEdit = (admin) => {
    setCurrentAdmin(admin);
    setIsEditing(true);
    setIsAdding(true);
    setFormData({
      email: admin.email,
      username: admin.username,
      password: '',
      confirmPassword: ''
    });
  };

  // Delete admin
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      setAdmins(admins.filter(admin => admin.id !== id));
    }
  };

  // Reset form
  const resetForm = () => {
    setIsAdding(false);
    setIsEditing(false);
    setCurrentAdmin(null);
    setFormData({
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  return (
    <div className="p-4  mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Accounts Management</h1>
      
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search admins..."
            className="pl-10 pr-4 py-2 border rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            setIsAdding(true);
            setIsEditing(false);
            setCurrentAdmin(null);
            setFormData({
              email: '',
              username: '',
              password: '',
              confirmPassword: ''
            });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FiPlus /> Add Admin
        </button>
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-white border border-blue-200 rounded-lg p-6 mb-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            {isEditing ? 'Edit Admin Account' : 'Add New Admin Account'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 pr-4 py-2 border rounded w-full ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="admin@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`pl-10 pr-4 py-2 border rounded w-full ${errors.username ? 'border-red-500' : ''}`}
                    placeholder="username"
                  />
                </div>
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isEditing ? 'New Password' : 'Password *'}
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 pr-4 py-2 border rounded w-full ${errors.password ? 'border-red-500' : ''}`}
                    placeholder={isEditing ? 'Leave blank to keep current' : '••••••••'}
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isEditing ? 'Confirm New Password' : 'Confirm Password *'}
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`pl-10 pr-4 py-2 border rounded w-full ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border rounded text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2"
              >
                {isEditing ? 'Update Admin' : 'Add Admin'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Admins Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAdmins.length > 0 ? (
              filteredAdmins.map(admin => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiMail className="mr-2 text-gray-500" />
                      {admin.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiUser className="mr-2 text-gray-500" />
                      {admin.username}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {admin.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {admin.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(admin)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(admin.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No admin accounts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Security Note */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
        <strong>Security Note:</strong> In a production environment, never store or display actual passwords. 
        Always use proper password hashing and implement secure authentication practices.
      </div>
    </div>
  );
};

export default AdminManagement;