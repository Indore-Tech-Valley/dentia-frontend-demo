import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiSave, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAdminFaqs,
  createFaq,
  updateFaq,
  deleteFaq 
} from '../../../redux/features/faqSlice/faqSlice';
import DeleteConfirmation from '../../components/DeleteConfirmation/DeleteConfirmation';


const Faqs = () => {
  const dispatch = useDispatch();
  const { adminFaqs, loading, error } = useSelector(state => state.faq);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    question: '',
    answer: '',
    isActive: true
  });
  const [newFAQ, setNewFAQ] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Load FAQs on component mount
  useEffect(() => {
    dispatch(fetchAdminFaqs());
  }, [dispatch]);

  // Filter FAQs
  const filteredFaqs = adminFaqs.filter(faq => {
    return faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
           faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Toggle FAQ expansion
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Handle delete click
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await dispatch(deleteFaq(deleteId));
      dispatch(fetchAdminFaqs()); // Refresh the list
      setShowConfirmModal(false);
    } catch (err) {
      // console.error('Failed to delete FAQ:', err);
    }
  };

  // Start editing
  const handleEdit = (faq) => {
    setEditingId(faq._id);
    setEditForm({
      question: faq.question,
      answer: faq.answer,
      isActive: faq.isActive
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setNewFAQ(false);
  };

  // Save changes
  const saveChanges = async () => {
    try {
      if (editingId) {
        // Update existing FAQ
        await dispatch(updateFaq({
          id: editingId,
          data: editForm
        }));
      } else {
        // Create new FAQ
        await dispatch(createFaq(editForm));
      }
      dispatch(fetchAdminFaqs()); // Refresh the list
      setEditingId(null);
      setNewFAQ(false);
    } catch (err) {
      // console.error('Failed to save FAQ:', err);
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
    return <div className="p-4">Loading FAQs...</div>;
  }


  return (
    <div className="p-4 mx-auto">
      <h1 className="text-2xl font-bold mb-6">FAQ Management</h1>
      
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search FAQs..."
            className="pl-4 pr-4 py-2 border rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            setNewFAQ(true);
            setEditingId(null);
            setEditForm({
              question: '',
              answer: '',
              isActive: true
            });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FiPlus /> Add FAQ
        </button>
      </div>

      {/* New FAQ Form */}
      {newFAQ && (
        <div className="bg-white border border-blue-200 rounded-lg p-4 mb-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Add New FAQ</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question *</label>
              <input
                type="text"
                name="question"
                value={editForm.question}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter question"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Answer *</label>
              <textarea
                name="answer"
                value={editForm.answer}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border rounded"
                placeholder="Enter detailed answer"
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
                disabled={!editForm.question || !editForm.answer}
              >
                <FiSave /> Save FAQ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map(faq => (
            <div 
              key={faq._id} 
              className={`bg-white border rounded-lg overflow-hidden ${
                !faq.isActive ? 'opacity-70' : ''
              }`}
            >
              {editingId === faq._id ? (
                // Edit Mode
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Question *</label>
                      <input
                        type="text"
                        name="question"
                        value={editForm.question}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Answer *</label>
                      <textarea
                        name="answer"
                        value={editForm.answer}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`isActive-${faq._id}`}
                        name="isActive"
                        checked={editForm.isActive}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label htmlFor={`isActive-${faq._id}`} className="ml-2 text-sm text-gray-700">
                        Active
                      </label>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Last updated: {new Date(faq.updatedAt).toLocaleDateString()}
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
                          disabled={!editForm.question || !editForm.answer}
                        >
                          <FiSave size={14} /> Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div 
                    className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleExpand(faq._id)}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        faq.isActive ? 'bg-green-500' : 'bg-gray-400'
                      }`}></span>
                      <h3 className="font-medium">{faq.question}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(faq);
                        }}
                        className="text-blue-500 hover:text-blue-700 p-1"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(faq._id);
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                      {expandedId === faq._id ? <FiChevronUp /> : <FiChevronDown />}
                    </div>
                  </div>
                  {expandedId === faq._id && (
                    <div className="px-4 pb-4">
                      <div className="text-gray-700 whitespace-pre-line pl-5 border-l-2 border-blue-200">
                        {faq.answer}
                      </div>
                      <div className="mt-3 text-xs text-gray-500">
                        Last updated: {new Date(faq.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white border rounded-lg p-8 text-center text-gray-500">
            No FAQs found matching your criteria
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        title="Confirm FAQ Deletion"
        message="Are you sure you want to delete this FAQ? This action cannot be undone."
      />
    </div>
  );
};

export default Faqs;