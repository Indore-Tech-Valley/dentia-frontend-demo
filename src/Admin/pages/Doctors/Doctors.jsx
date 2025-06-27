import React, { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaUser, FaPhone, FaEnvelope, FaStethoscope, FaClock } from 'react-icons/fa';
import { MdClose, MdSearch, MdFilterList } from 'react-icons/md';
import { fetchAllDoctorsForAdmin, createDoctor, updateDoctor, deleteDoctor } from '../../../redux/features/doctorSlice/doctorSlice';
import { useDispatch, useSelector } from 'react-redux';
import DeleteConfirmation from '../../components/DeleteConfirmation/DeleteConfirmation';
import { FiImage } from 'react-icons/fi';


const Doctors = () => {
  const dispatch = useDispatch();
  const { adminDoctors, loading, error } = useSelector((state) => state.doctor);
  
  // State management
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    specialization: '', 
    degree: '', 
    experience: '', 
    previous_hospital: '', 
    description: '', 
    status: 'active',
    image: '' // Add image field
  });
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const perPage = 8;

  useEffect(() => {
    dispatch(fetchAllDoctorsForAdmin());
  }, [dispatch]);

   // Image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    
    // Create preview
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
  };
 // Update handleEdit to include image
  const handleEdit = (doctor) => {
    setCurrentDoctor(doctor);
    setForm({
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      specialization: doctor.specialization,
      degree: doctor.degree,
      experience: doctor.experience,
      previous_hospital: doctor.previous_hospital,
      description: doctor.description,
      status: doctor.status,
      image: doctor.image || ''
    });
    setImagePreview(doctor.image || null);
    setImageFile(null);
    setModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteDoctor(deleteId));
      dispatch(fetchAllDoctorsForAdmin()); // Refresh the list
      setShowConfirmModal(false);
    } catch (err) {
      console.error('Failed to delete doctor:', err);
    }
  };

// Modify handleSubmit to handle image upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      
      // Append all form fields
      Object.keys(form).forEach(key => {
        if (key !== 'image') {
          formData.append(key, form[key]);
        }
      });
      
      // Append image if it's a new file
      if (imageFile) {
        formData.append('image', imageFile);
      } else if (!currentDoctor && form.image) {
        // For new doctors with existing image URL (if any)
        formData.append('image', form.image);
      }
      
      if (currentDoctor) {
        // Update existing doctor
        await dispatch(updateDoctor({
          id: currentDoctor._id,
          data: formData
        }));
      } else {
        // Create new doctor
        await dispatch(createDoctor(formData));
      }
      
      resetModal();
      dispatch(fetchAllDoctorsForAdmin());
    } catch (err) {
      console.error('Operation failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };


  const filteredDoctors = adminDoctors?.filter(doctor => {
    const matchesSearch = doctor?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         doctor?.specialization?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         doctor?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'All' || doctor?.status === statusFilter?.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const start = (page - 1) * perPage;
  const paginated = filteredDoctors.slice(start, start + perPage);
  const totalPages = Math.ceil(filteredDoctors.length / perPage);

  // Update resetModal to clear image state
  const resetModal = () => {
    setModalOpen(false);
    setCurrentDoctor(null);
    setForm({ 
      name: '', 
      email: '', 
      phone: '', 
      specialization: '', 
      degree: '', 
      experience: '', 
      previous_hospital: '', 
      description: '', 
      status: 'active',
      image: ''
    });
    setImagePreview(null);
    setImageFile(null);
    setIsSubmitting(false);
  };

  if (loading && !adminDoctors.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Delete Confirmation Modal */}
        <DeleteConfirmation
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={confirmDelete}
          title="Confirm Doctor Deletion"
          message="Are you sure you want to delete this doctor? This action cannot be undone."
        />

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
                <p className="text-2xl font-bold text-gray-900">{adminDoctors.length}</p>
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
                <p className="text-2xl font-bold text-gray-900">{adminDoctors.filter(d => d.status === 'active').length}</p>
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
                <p className="text-2xl font-bold text-gray-900">{new Set(adminDoctors.map(d => d.specialization)).size}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <FaClock className="text-orange-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Avg. Experience</p>
                <p className="text-2xl font-bold text-gray-900">
                  {adminDoctors.length > 0 
                    ? Math.round(adminDoctors.reduce((sum, d) => sum + d.experience, 0) / adminDoctors.length)
                    : 0} years
                </p>
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
          {paginated.map(doctor => (
            <div key={doctor._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-4">
            <div className="bg-gradient-to-br from-teal-100 to-blue-100 p-3 rounded-xl">
  {doctor.image ? (
    <img 
      src={doctor.image} 
      alt={doctor.name} 
      className="w-10 h-10 rounded-full object-cover" 
    />
  ) : (
    <FaUser className="text-teal-600 text-xl" />
  )}
</div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  doctor.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {doctor.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <h3 className="font-bold text-lg text-gray-900 mb-2">{doctor.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{doctor.degree}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaStethoscope className="text-teal-500" />
                  <span>{doctor.specialization}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaClock className="text-teal-500" />
                  <span>{doctor.experience} years experience</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaPhone className="text-teal-500" />
                  <span>{doctor.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaEnvelope className="text-teal-500" />
                  <span className="truncate">{doctor.email}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(doctor)} 
                  className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <FaEdit /> Edit
                </button>
                <button 
                  onClick={() => handleDeleteClick(doctor._id)} 
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

        {/* Add/Edit Doctor Modal */}
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
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name*</label>
                      <input 
                        value={form.name} 
                        onChange={(e) => setForm({ ...form, name: e.target.value })} 
                        placeholder="Dr. John Doe" 
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email*</label>
                      <input 
                        type="email"
                        value={form.email} 
                        onChange={(e) => setForm({ ...form, email: e.target.value })} 
                        placeholder="doctor@example.com" 
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone*</label>
                      <input 
                        value={form.phone} 
                        onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                        placeholder="+91 98765 43210" 
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specialization*</label>
                      <input 
                        value={form.specialization} 
                        onChange={(e) => setForm({ ...form, specialization: e.target.value })} 
                        placeholder="Cardiology, Neurology, etc." 
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Degree*</label>
                      <input 
                        value={form.degree} 
                        onChange={(e) => setForm({ ...form, degree: e.target.value })} 
                        placeholder="MBBS, MD, etc." 
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Experience (years)*</label>
                      <input 
                        type="number"
                        value={form.experience} 
                        onChange={(e) => setForm({ ...form, experience: e.target.value })} 
                        placeholder="5" 
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Previous Hospital</label>
                      <input 
                        value={form.previous_hospital} 
                        onChange={(e) => setForm({ ...form, previous_hospital: e.target.value })} 
                        placeholder="Hospital name" 
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status*</label>
                      <select 
                        value={form.status} 
                        onChange={(e) => setForm({ ...form, status: e.target.value })} 
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors bg-white"
                        required
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea 
                        value={form.description} 
                        onChange={(e) => setForm({ ...form, description: e.target.value })} 
                        placeholder="Brief description about the doctor" 
                        rows="3"
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors" 
                      />
                    </div>
                  </div>

                    {/* // Add image upload field to your modal form (inside the form in the modal) */}
  <div className="md:col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
        <img 
          src={imagePreview || form.image || 'https://via.placeholder.com/150'} 
          alt="Doctor preview" 
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="doctor-image-upload"
          disabled={isSubmitting}
        />
        <label 
          htmlFor="doctor-image-upload" 
          className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
            isSubmitting
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-blue-600 hover:bg-blue-50 border-blue-300 cursor-pointer'
          }`}
        >
          <FiImage className="mr-2" />
          {form.image || imagePreview ? 'Change Image' : 'Upload Image'}
        </label>
      </div>
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
    type="submit"
    disabled={isSubmitting}
    className={`flex-1 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 px-6 rounded-xl transition-all duration-200 font-medium shadow-lg ${
      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
    }`}
  >
    {isSubmitting ? (
      <div className="flex items-center justify-center gap-2">
        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
        {currentDoctor ? 'Updating...' : 'Creating...'}
      </div>
    ) : (
      currentDoctor ? 'Update Doctor' : 'Add Doctor'
    )}
  </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;