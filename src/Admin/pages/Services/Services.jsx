import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiSave, FiImage, FiType, FiInfo, FiX } from 'react-icons/fi';
import { fetchServices, createService, updateService, deleteService } from '../../../redux/features/servicesSlice/servicesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Modal from 'react-modal';
import MessageModal from '../../../components/MessageModal/MessageModal';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const Services = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { services, loading, error } = useSelector((state) => state.service);
  
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    image: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const openModal = (type, message) => {
    setModal({ show: true, type, message });
  };

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // Filter services
  const filteredServices = services?.filter(service => {
    return (
      service?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      service?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  // Open modal for adding new service
  const openAddServiceModal = () => {
    setIsAddingNew(true);
    setEditingId(null);
    setEditForm({
      title: '',
      description: '',
      image: ''
    });
    setImagePreview(null);
    setImageFile(null);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setIsAddingNew(false);
    setImagePreview(null);
    setImageFile(null);
    setEditForm({
      title: '',
      description: '',
      image: ''
    });
    setIsSubmitting(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      const resultAction = await dispatch(deleteService(deleteId));
      setShowConfirmModal(false);
      setDeleteId(null);

      if (deleteService.fulfilled.match(resultAction)) {
        openModal("success", "Service deleted successfully!");
        dispatch(fetchServices());
      } else {
        openModal("error", resultAction.payload?.message || "Failed to delete service");
      }
    } catch (error) {
      setShowConfirmModal(false);
      setDeleteId(null);
      openModal("error", "An error occurred while deleting the service");
    }
  };

  const saveChanges = async () => {
    // Validation
    if (!editForm.title.trim()) {
      openModal("error", "Please enter a service title.");
      return;
    }

    if (!editForm.description.trim()) {
      openModal("error", "Please enter a service description.");
      return;
    }

    if (isAddingNew && !imageFile) {
      openModal("error", "Please select an image for the new service.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", editForm.title.trim());
      formData.append("description", editForm.description.trim());

      if (imageFile) {
        formData.append("image", imageFile);
      } else if (!isAddingNew && editForm.image) {
        formData.append("image", editForm.image);
      }

      let resultAction;
      if (isAddingNew) {
        resultAction = await dispatch(createService(formData));
      } else if (editingId) {
        resultAction = await dispatch(updateService({ id: editingId, data: formData }));
      }

      if (createService.fulfilled.match(resultAction) || updateService.fulfilled.match(resultAction)) {
        openModal("success", `Service ${isAddingNew ? 'created' : 'updated'} successfully!`);
        closeModal();
        dispatch(fetchServices());
      } else {
        openModal("error", resultAction.payload?.message || `Failed to ${isAddingNew ? 'create' : 'update'} service`);
      }
    } catch (error) {
      openModal("error", "An unexpected error occurred.");
      // console.error("Save error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (service) => {
    setEditingId(service._id);
    setIsAddingNew(false);
    setEditForm({
      title: service.title,
      description: service.description,
      image: service.image
    });
    setImagePreview(service.image);
    setImageFile(null);
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Service Management</h1>
      
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search services..."
            className="pl-4 pr-4 py-2 border rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={openAddServiceModal}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
        >
          <FiPlus /> Add Service
        </button>
      </div>

      {/* Modal for Add/Edit Service */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel={isAddingNew ? "Add Service" : "Edit Service"}
        className="fixed inset-0 flex items-center justify-center p-4 z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
        shouldCloseOnOverlayClick={!isSubmitting}
      >
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-auto max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {isAddingNew ? "Add New Service" : "Edit Service"}
            </h2>
            <button 
              onClick={closeModal} 
              className="text-gray-500 hover:text-gray-700"
              disabled={isSubmitting}
            >
              <FiX size={24} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Service title"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Service description"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Image {isAddingNew && '*'}
              </label>
              <div className="flex items-center gap-4">
                <div className="w-32 h-32 rounded-md bg-gray-100 overflow-hidden border">
                  <img 
                    src={imagePreview || editForm.image || 'https://via.placeholder.com/150'} 
                    alt="Service preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="service-image-upload"
                    disabled={isSubmitting}
                  />
                  <label 
                    htmlFor="service-image-upload" 
                    className={`inline-block px-4 py-2 border rounded cursor-pointer text-sm ${
                      isSubmitting 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-blue-600 hover:bg-blue-50 border-blue-300'
                    }`}
                  >
                    <FiImage className="inline mr-2" />
                    Choose Image
                  </label>
                  {imageFile && (
                    <p className="text-xs text-green-600 mt-1">
                      New image selected
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className={`px-4 py-2 rounded flex items-center gap-2 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
                disabled={isSubmitting || !editForm.title.trim() || !editForm.description.trim() || (isAddingNew && !imageFile)}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {isAddingNew ? "Adding..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <FiSave /> {isAddingNew ? "Add Service" : "Save Changes"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Services List */}
      {loading ? (
        <div className="text-center py-8">Loading services...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.length > 0 ? (
            filteredServices.map(service => (
              <div 
                key={service._id} 
                className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image || 'https://via.placeholder.com/400x200'} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold">{service.title}</h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(service)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(service._id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-gray-600 flex items-start gap-2">
                    <p>{service.description}</p>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-500">
                    <div>Created: {formatDate(service.createdAt)}</div>
                    <div>Last updated: {formatDate(service.updatedAt)}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white border rounded-lg p-8 text-center text-gray-500">
              No services found matching your criteria
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm mx-4">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete this <strong>service</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setDeleteId(null);
                }}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {modal.show && (
        <MessageModal
          type={modal.type}
          message={modal.message}
          onClose={() => setModal({ ...modal, show: false })}
        />
      )}
    </div>
  );
};

export default Services;