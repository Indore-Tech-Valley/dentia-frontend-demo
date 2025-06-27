import React, { useState, useEffect } from 'react';
import { FiCalendar, FiEdit2, FiTrash2, FiPlus, FiSave, FiImage, FiX } from 'react-icons/fi';
import { createEvent,fetchEvents,updateEvent,deleteEvent } from '../../../redux/features/eventSlice/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import MessageModal from '../../../components/MessageModal/MessageModal';

const Events = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.event);
  
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    eventDate: '',
    image: '',
    eventType: 'Upcoming'
  });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [eventTypeFilter, setEventTypeFilter] = useState('All');
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const openModal = (type, message) => {
    setModal({ show: true, type, message });
  };

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Filter events
  const filteredEvents = events?.filter(event => {
    return eventTypeFilter === 'All' || event.eventType === eventTypeFilter;
  });

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  // Handle delete click
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      const resultAction = await dispatch(deleteEvent(deleteId));
      setShowConfirmModal(false);
      setDeleteId(null);

      if (deleteEvent.fulfilled.match(resultAction)) {
        openModal("success", "Event deleted successfully!");
        dispatch(fetchEvents());
      } else {
        openModal("error", resultAction.payload?.message || "Failed to delete event");
      }
    } catch (error) {
      setShowConfirmModal(false);
      setDeleteId(null);
      openModal("error", "An error occurred while deleting the event");
    }
  };

  // Start editing
  const handleEdit = (event) => {
    setEditingId(event._id);
    setIsAddingNew(false);
    setEditForm({
      title: event.title,
      description: event.description,
      eventDate: event.eventDate.split('T')[0],
      image: event.image,
      eventType: event.eventType
    });
    setImagePreview(event.image);
    setImageFile(null);
  };

  // Start adding new event
  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingId(null);
    setEditForm({
      title: '',
      description: '',
      eventDate: '',
      image: '',
      eventType: 'Upcoming'
    });
    setImagePreview(null);
    setImageFile(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setIsAddingNew(false);
    setImagePreview(null);
    setImageFile(null);
    setEditForm({
      title: '',
      description: '',
      eventDate: '',
      image: '',
      eventType: 'Upcoming'
    });
    setIsSubmitting(false);
  };

  // Save changes
  const saveChanges = async () => {
    // Validation
    if (!editForm.title.trim()) {
      openModal("error", "Please enter an event title.");
      return;
    }

    if (!editForm.description.trim()) {
      openModal("error", "Please enter an event description.");
      return;
    }

    if (!editForm.eventDate) {
      openModal("error", "Please select an event date.");
      return;
    }

    if (isAddingNew && !imageFile) {
      openModal("error", "Please select an image for the new event.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", editForm.title.trim());
      formData.append("description", editForm.description.trim());
      formData.append("eventDate", editForm.eventDate);
      formData.append("eventType", editForm.eventType);

      if (imageFile) {
        formData.append("image", imageFile);
      } else if (!isAddingNew && editForm.image) {
        formData.append("image", editForm.image);
      }

      let resultAction;
      if (isAddingNew) {
        resultAction = await dispatch(createEvent(formData));
      } else if (editingId) {
        resultAction = await dispatch(updateEvent({ id: editingId, data: formData }));
      }

      if (createEvent.fulfilled.match(resultAction) || updateEvent.fulfilled.match(resultAction)) {
        openModal("success", `Event ${isAddingNew ? 'created' : 'updated'} successfully!`);
        cancelEdit();
        dispatch(fetchEvents());
      } else {
        openModal("error", resultAction.payload?.message || `Failed to ${isAddingNew ? 'create' : 'update'} event`);
      }
    } catch (error) {
      openModal("error", "An unexpected error occurred.");
      // console.error("Save error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  // Get event type color
  const getEventTypeColor = (type) => {
    switch(type) {
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      case 'Past Event': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Event Management</h1>
      
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select 
          className="border rounded px-3 py-2"
          value={eventTypeFilter}
          onChange={(e) => setEventTypeFilter(e.target.value)}
        >
          <option value="All">All Events</option>
          <option value="Upcoming Event">Upcoming Event</option>
          <option value="Past Event">Past Events</option>
        </select>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
        >
          <FiPlus /> Add Event
        </button>
      </div>

      {/* New Event Form */}
      {isAddingNew && (
        <div className="bg-white border border-blue-200 rounded-lg p-6 mb-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Add New Event</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Event title"
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
                placeholder="Event description"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Date *</label>
                <input
                  type="date"
                  name="eventDate"
                  value={editForm.eventDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                <select
                  name="eventType"
                  value={editForm.eventType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Past Event">Past Event</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Image *</label>
              <div className="flex items-center gap-4">
                <div className="w-32 h-32 rounded-md bg-gray-100 overflow-hidden border">
                  <img 
                    src={imagePreview || 'https://via.placeholder.com/150'} 
                    alt="Event preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="event-image-upload"
                    disabled={isSubmitting}
                  />
                  <label 
                    htmlFor="event-image-upload" 
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
            
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelEdit}
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
                disabled={isSubmitting || !editForm.title.trim() || !editForm.description.trim() || !editForm.eventDate || !imageFile}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <FiSave /> Save Event
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Events List */}
      {loading ? (
        <div className="text-center py-8">Loading events...</div>
      ) : (
        <div className="space-y-6">
          {filteredEvents && filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <div 
                key={event._id} 
                className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                {editingId === event._id ? (
                  // Edit Mode
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                        <input
                          type="text"
                          name="title"
                          value={editForm.title}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Event Date *</label>
                          <input
                            type="date"
                            name="eventDate"
                            value={editForm.eventDate}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                          <select
                            name="eventType"
                            value={editForm.eventType}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isSubmitting}
                          >
                            <option value="Upcoming Event">Upcoming Event</option>
                            <option value="Past Event">Past Event</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                        <div className="flex items-center gap-4">
                          <div className="w-32 h-32 rounded-md bg-gray-100 overflow-hidden border">
                            <img 
                              src={imagePreview || editForm.image || 'https://via.placeholder.com/150'} 
                              alt="Event preview" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="event-image-edit"
                              disabled={isSubmitting}
                            />
                            <label 
                              htmlFor="event-image-edit" 
                              className={`inline-block px-4 py-2 border rounded cursor-pointer text-sm ${
                                isSubmitting 
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                  : 'bg-white text-blue-600 hover:bg-blue-50 border-blue-300'
                              }`}
                            >
                              <FiImage className="inline mr-2" />
                              Change Image
                            </label>
                            {imageFile && (
                              <p className="text-xs text-green-600 mt-1">
                                New image selected
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Created: {formatDate(event.createdAt)}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={cancelEdit}
                            className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
                            disabled={isSubmitting}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={saveChanges}
                            className={`px-3 py-1 rounded text-sm flex items-center gap-1 ${
                              isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                            } text-white`}
                            disabled={isSubmitting || !editForm.title.trim() || !editForm.description.trim() || !editForm.eventDate}
                          >
                            {isSubmitting ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                Saving...
                              </>
                            ) : (
                              <>
                                <FiSave size={14} /> Save
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img 
                          src={event.image || 'https://via.placeholder.com/400x200'} 
                          alt={event.title} 
                          className="w-full h-32 md:h-48 object-cover"
                        />
                      </div>
                      <div className="p-4 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold">{event.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${getEventTypeColor(event.eventType)}`}>
                              {event.eventType}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleEdit(event)}
                              className="text-blue-500 hover:text-blue-700"
                              title="Edit"
                            >
                              <FiEdit2 />
                            </button>
                            <button 
                              onClick={() => handleDeleteClick(event._id)}
                              className="text-red-500 hover:text-red-700"
                              title="Delete"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center gap-2 text-gray-600">
                          <FiCalendar />
                          <span>{formatDate(event.eventDate)}</span>
                        </div>
                        
                        <div className="mt-4 text-gray-700">
                          {event.description}
                        </div>
                        
                        <div className="mt-4 text-xs text-gray-500">
                          Created: {formatDate(event.createdAt)} | Last updated: {formatDate(event.updatedAt)}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white border rounded-lg p-8 text-center text-gray-500">
              No events found matching your criteria
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
              Are you sure you want to delete this <strong>event</strong>?
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

export default Events;