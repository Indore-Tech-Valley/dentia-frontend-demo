import React, { useEffect, useState } from 'react';
import { FiUser, FiMail, FiMessageSquare, FiClock, FiTrash2, FiSearch, FiEdit2, FiSave } from 'react-icons/fi';
import { submitFeedback, fetchFeedbacks, updateFeedback, deleteFeedback } from '../../../redux/features/feedbackSlice/feedbackSlice';
import { useDispatch, useSelector } from 'react-redux';
import MessageModal from '../../../components/MessageModal/MessageModal';
import DeleteConfirmation from '../../components/DeleteConfirmation/DeleteConfirmation';

const Feedback = () => {
  const dispatch = useDispatch();
  const { feedbacks, loading, error } = useSelector(state => state.feedback);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    message: '',
    status: 'pending'
  });
    const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const openModal = (type, message) => {
    setModal({ show: true, type, message });
  };

  const closeModal = () => setModal({ ...modal, show: false });

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  // Filter feedbacks
  const filteredFeedbacks = feedbacks?.filter(feedback => {
    return (
      feedback?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      feedback?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      feedback?.message?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  });

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

    const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  // Handle delete
  const confirmDelete = async (id) => {
    try {
     const resultAction =  await dispatch(deleteFeedback(id));
     if (deleteFeedback.fulfilled.match(resultAction)) {
      openModal("success",resultAction.payload.message || "Feedback deleted successfully!!!");
         setShowConfirmModal(false);
           dispatch(fetchFeedbacks()); // Refresh the list
     }
     else{
      openModal("error",resultAction.payload || "Error deleting feedback");
     }
       
    } catch (err) {
      openModal('error', err.message || "Failed to delete feedback");
    }
  };

  // Start editing
  const handleEdit = (feedback) => {
    setEditingId(feedback._id);
    setEditForm({
      name: feedback.name,
      email: feedback.email,
      message: feedback.message,
      status: feedback.status
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
  };

  // Save changes
  const saveChanges = async (id) => {
    try {
    const resultAction=  await dispatch(updateFeedback({ id, data: editForm }));
        // console.log(resultAction)
    if(updateFeedback.fulfilled.match(resultAction)){
  
           openModal('success', resultAction.payload.message || "Feedback updated successfully");
      setEditingId(null);
      dispatch(fetchFeedbacks()); // Refresh the list
    }
    else{
      openModal("error",resultAction.paylaod || "Error in update")
    }

    } catch (err) {
      openModal('error', err.message || "Failed to update feedback");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="p-4">Loading feedbacks...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Patient Feedback</h1>
      
      {/* Message Modal */}
      {modal.show && (
        <MessageModal
          type={modal.type}
          message={modal.message}
          onClose={closeModal}
        />
      )}

      <DeleteConfirmation
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={()=>confirmDelete(deleteId)}
        title="Confirm Feedback Deletion"
        message="Are you sure you want to delete this feedback? This action cannot be undone."
      />
      
      {/* Search */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search feedback..."
          className="pl-10 pr-4 py-2 border rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedbacks.length > 0 ? (
          filteredFeedbacks.map(feedback => (
            <div 
              key={feedback._id} 
              className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow relative"
            >
              {editingId === feedback._id ? (
                // Edit Mode
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Patient Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Feedback</label>
                    <textarea
                      name="message"
                      value={editForm.message}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Status</label>
                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="published">Published</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1 border rounded text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => saveChanges(feedback._id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm flex items-center gap-1"
                    >
                      <FiSave size={14} /> Save
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium flex items-center">
                        <FiUser className="mr-2 text-gray-500" />
                        {feedback.name}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <FiMail className="mr-2" />
                        {feedback.email}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(feedback)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(feedback._id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-gray-700 flex items-start">
                      <FiMessageSquare className="mr-2 mt-1 text-gray-500 flex-shrink-0" />
                      {feedback.message}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-400 flex items-center">
                      <FiClock className="mr-1" />
                      {formatDate(feedback.updatedAt)}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(feedback.status)}`}>
                      {feedback.status }
                    </span>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white border rounded-lg p-8 text-center text-gray-500">
            No feedback found matching your search
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;