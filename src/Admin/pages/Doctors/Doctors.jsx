import React, { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaUser, FaPhone, FaEnvelope, FaStethoscope, FaClock, FaCalendarCheck } from 'react-icons/fa';
import { MdClose, MdSearch, MdFilterList } from 'react-icons/md';

const sampleDoctors = [...Array(25)].map((_, i) => ({
  id: 100000 + i,
  name: `Dr. Example ${i + 1}`,
  specialization: 'MBBS',
  experience: `${i + 1} Years`,
  appointments: 50 + i,
  mobile: `+91 98765${10000 + i}`,
  email: `doctor${i + 1}@example.com`,
  status: i % 6 === 0 ? 'Inactive' : 'Active',
}));

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [form, setForm] = useState({ name: '', specialization: '', experience: '', mobile: '', email: '', status: 'Active' });
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const perPage = 8;

  useEffect(() => {
    setDoctors(sampleDoctors);
  }, []);

  const handleEdit = (doc) => {
    setCurrentDoctor(doc);
    setForm(doc);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setDoctors(doctors.filter(d => d.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentDoctor) {
      setDoctors(doctors.map(d => (d.id === currentDoctor.id ? { ...form, id: currentDoctor.id, appointments: d.appointments } : d)));
    } else {
      setDoctors([{ ...form, id: Date.now(), appointments: 0 }, ...doctors]);
    }
    setModalOpen(false);
    setCurrentDoctor(null);
    setForm({ name: '', specialization: '', experience: '', mobile: '', email: '', status: 'Active' });
  };

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const start = (page - 1) * perPage;
  const paginated = filteredDoctors.slice(start, start + perPage);
  const totalPages = Math.ceil(filteredDoctors.length / perPage);

  const resetModal = () => {
    setModalOpen(false);
    setCurrentDoctor(null);
    setForm({ name: '', specialization: '', experience: '', mobile: '', email: '', status: 'Active' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctors Management</h1>
              <p className="text-gray-600">Manage your medical staff and their information</p>
            </div>
            <button 
              onClick={() => setModalOpen(true)} 
              className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg transform transition-all duration-200 hover:scale-105 focus:ring-4 focus:ring-teal-200"
            >
              <FaPlus className="text-sm" /> Add New Doctor
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FaUser className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Doctors</p>
                <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <FaUser className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Active Doctors</p>
                <p className="text-2xl font-bold text-gray-900">{doctors.filter(d => d.status === 'Active').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <FaCalendarCheck className="text-orange-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{doctors.reduce((sum, d) => sum + d.appointments, 0)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <FaStethoscope className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Specializations</p>
                <p className="text-2xl font-bold text-gray-900">{new Set(doctors.map(d => d.specialization)).size}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search doctors by name, specialization, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              />
            </div>
            <div className="relative">
              <MdFilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors bg-white"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {paginated.map(doc => (
            <div key={doc.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-gradient-to-br from-teal-100 to-blue-100 p-3 rounded-xl">
                  <FaUser className="text-teal-600 text-xl" />
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  doc.status === 'Active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {doc.status}
                </span>
              </div>
              
              <h3 className="font-bold text-lg text-gray-900 mb-2">{doc.name}</h3>
              <p className="text-gray-600 text-sm mb-4">ID: {doc.id}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaStethoscope className="text-teal-500" />
                  <span>{doc.specialization}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaClock className="text-teal-500" />
                  <span>{doc.experience}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaCalendarCheck className="text-teal-500" />
                  <span>{doc.appointments} appointments</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaPhone className="text-teal-500" />
                  <span>{doc.mobile}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaEnvelope className="text-teal-500" />
                  <span className="truncate">{doc.email}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(doc)} 
                  className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <FaEdit /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(doc.id)} 
                  className="flex-1 bg-red-50 text-red-600 py-2 px-4 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <button 
                disabled={page === 1} 
                onClick={() => setPage(p => p - 1)} 
                className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl transition-colors font-medium"
              >
                Previous
              </button>
              <div className="flex items-center gap-2">
                {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 rounded-xl font-medium transition-colors ${
                        page === pageNum
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 5 && (
                  <>
                    <span className="text-gray-400">...</span>
                    <span className="text-gray-600 font-medium">Page {page} of {totalPages}</span>
                  </>
                )}
              </div>
              <button 
                disabled={page === totalPages} 
                onClick={() => setPage(p => p + 1)} 
                className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl transition-colors font-medium"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentDoctor ? 'Edit Doctor' : 'Add New Doctor'}
                  </h2>
                  <button 
                    onClick={resetModal} 
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <MdClose size={24} className="text-gray-500" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Name</label>
                      <input 
                        value={form.name} 
                        onChange={(e) => setForm({ ...form, name: e.target.value })} 
                        placeholder="Enter doctor's full name" 
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                      <input 
                        value={form.specialization} 
                        onChange={(e) => setForm({ ...form, specialization: e.target.value })} 
                        placeholder="e.g., MBBS, MD, etc." 
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                      <input 
                        value={form.experience} 
                        onChange={(e) => setForm({ ...form, experience: e.target.value })} 
                        placeholder="e.g., 5 Years" 
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                      <input 
                        value={form.mobile} 
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })} 
                        placeholder="+91 98765 43210" 
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input 
                        type="email"
                        value={form.email} 
                        onChange={(e) => setForm({ ...form, email: e.target.value })} 
                        placeholder="doctor@example.com" 
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select 
                        value={form.status} 
                        onChange={(e) => setForm({ ...form, status: e.target.value })} 
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors bg-white"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-6">
                    <button 
                      type="button"
                      onClick={resetModal}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSubmit}
                      className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 px-6 rounded-xl transition-all duration-200 font-medium shadow-lg"
                    >
                      {currentDoctor ? 'Update Doctor' : 'Add Doctor'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;