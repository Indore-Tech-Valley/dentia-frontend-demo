import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiSave } from 'react-icons/fi';
import { 
  fetchAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial 
} from '../../../redux/features/testimonialSlice/testimonialSlice';
import { useDispatch, useSelector } from 'react-redux';
import MessageModal from '../../../components/MessageModal/MessageModal';
import DeleteConfirmation from '../../components/DeleteConfirmation/DeleteConfirmation';

const Testimonials = () => {
  const dispatch = useDispatch();
  const { adminTestimonials, loading, error } = useSelector((state) => state.testimonial);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    message: '',
    isActive: true
  });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  // Load testimonials on component mount
  useEffect(() => {
    dispatch(fetchAdminTestimonials());
  }, [dispatch]);

  // console.log(adminTestimonials)

  // Open modal function
  const openModal = (type, message) => {
    setModal({ show: true, type, message });
  };

  // Close modal function
  const closeModal = () => {
    setModal({ ...modal, show: false });
  };

  // Filter testimonials
  const filteredTestimonials = adminTestimonials?.filter(testimonial => {
    const matchesSearch = testimonial?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) || 
                         testimonial?.message?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'All' || 
                         (statusFilter === 'Active' && testimonial?.isActive) || 
                         (statusFilter === 'Inactive' && !testimonial?.isActive);
    return matchesSearch && matchesStatus;
  });

  // Handle delete click
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await dispatch(deleteTestimonial(deleteId));
      openModal('success', 'Testimonial deleted successfully');
      dispatch(fetchAdminTestimonials());
      setShowConfirmModal(false);
    } catch (err) {
      openModal('error', 'Failed to delete testimonial');
    }
  };

  // Start editing
  const handleEdit = (testimonial) => {
    setEditingId(testimonial._id);
    setIsAddingNew(false);
    setEditForm({
      name: testimonial.name,
      message: testimonial.message,
      isActive: testimonial.isActive
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setIsAddingNew(false);
  };

  // Save changes
  const saveChanges = async () => {
    try {
      if (editingId) {
        // Update existing testimonial
        await dispatch(updateTestimonial({
          id: editingId,
          data: editForm
        }));
        openModal('success', 'Testimonial updated successfully');
      } else {
        // Create new testimonial
        await dispatch(createTestimonial(editForm));
        openModal('success', 'Testimonial created successfully');
      }
      dispatch(fetchAdminTestimonials());
      setEditingId(null);
      setIsAddingNew(false);
    } catch (err) {
      openModal('error', 'Failed to save testimonial');
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) {
    return <div className="p-4">Loading testimonials...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 mx-auto">
      <h1 className="text-2xl font-bold mb-6">Testimonial Management</h1>
      
      {/* Message Modal */}
      {modal.show && (
        <MessageModal
          type={modal.type}
          message={modal.message}
          onClose={closeModal}
        />
      )}
      
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search testimonials..."
            className="pl-4 pr-4 py-2 border rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="border rounded px-3 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button
          onClick={() => {
            setIsAddingNew(true);
            setEditingId(null);
            setEditForm({
              name: '',
              message: '',
              isActive: true
            });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FiPlus /> Add Testimonial
        </button>
      </div>

      {/* New Testimonial Form */}
      {isAddingNew && (
        <div className="bg-white border border-blue-200 rounded-lg p-4 mb-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Add New Testimonial</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Patient name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea
                name="message"
                value={editForm.message}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border rounded"
                placeholder="Patient testimonial"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={editForm.isActive}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                Active (Visible to public)
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 border rounded text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2"
                disabled={!editForm.name || !editForm.message}
              >
                <FiSave /> Save Testimonial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials List */}
      <div className="space-y-4">
        {filteredTestimonials.length > 0 ? (
          filteredTestimonials.map(testimonial => (
            <div 
              key={testimonial._id} 
              className={`bg-white border rounded-lg p-4 ${!testimonial.isActive ? 'opacity-70' : ''}`}
            >
              {editingId === testimonial._id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea
                      name="message"
                      value={editForm.message}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`isActive-${testimonial._id}`}
                      name="isActive"
                      checked={editForm.isActive}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <label htmlFor={`isActive-${testimonial._id}`} className="ml-2 text-sm text-gray-700">
                      Active
                    </label>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Created: {new Date(testimonial.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={cancelEdit}
                        className="px-3 py-1 border rounded text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveChanges}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm flex items-center gap-1"
                        disabled={!editForm.name || !editForm.message}
                      >
                        <FiSave size={14} /> Save
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        testimonial.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {testimonial.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <button 
                        onClick={() => handleEdit(testimonial)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(testimonial._id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 text-gray-700 whitespace-pre-line">
                    {testimonial.message}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Added on {new Date(testimonial.createdAt).toLocaleDateString()}
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white border rounded-lg p-8 text-center text-gray-500">
            No testimonials found matching your criteria
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        title="Confirm Testimonial Deletion"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
      />
    </div>
  );
};

export default Testimonials;