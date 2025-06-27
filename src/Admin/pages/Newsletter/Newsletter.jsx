import React, { useState, useEffect } from 'react';
import { FiMail, FiUser, FiTrash2, FiSearch, FiDownload, FiSend } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchNewsletters,
  subscribeNewsletter,
  deleteNewsletter,
} from '../../../redux/features/newsletterSlice/newsletterSlice';
import MessageModal from '../../../components/MessageModal/MessageModal';
import DeleteConfirmation from '../../components/DeleteConfirmation/DeleteConfirmation';

const Newsletter = () => {
  const dispatch = useDispatch();
  const { subscriptions, loading, error } = useSelector((state) => state.newsletter);

  const [searchTerm, setSearchTerm] = useState('');
  const [newSubscriber, setNewSubscriber] = useState({ name: '', email: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [emailContent, setEmailContent] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  useEffect(() => {
    dispatch(fetchNewsletters());
  }, [dispatch]);

  const openModal = (type, message) => {
    setModal({ show: true, type, message });
  };

  const closeModal = () => {
    setModal({ ...modal, show: false });
  };

  const filteredSubscribers = subscriptions?.filter((subscriber) => {
    return (
      subscriber?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      subscriber?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubscriber((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubscriber = async () => {
    try {
      await dispatch(subscribeNewsletter(newSubscriber));
      openModal('success', 'Subscriber added successfully');
      setNewSubscriber({ name: '', email: '' });
      setShowAddForm(false);
      dispatch(fetchNewsletters());
    } catch (err) {
      openModal('error', 'Failed to add subscriber');
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteNewsletter(deleteId));
      openModal('success', 'Subscriber deleted successfully');
      setShowConfirmModal(false);
    } catch (err) {
      openModal('error', 'Failed to delete subscriber');
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Subscription Date'];
    const csvContent = [
      headers.join(','),
      ...subscriptions.map((s) => `${s.name},${s.email},${new Date(s.createdAt).toLocaleDateString()}`),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'newsletter_subscribers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sendNewsletter = () => {
    openModal('success', `Newsletter sent to ${subscriptions.length} subscribers!`);
    setShowEmailModal(false);
    setEmailContent('');
  };

  if (loading) {
    return <div className="p-4">Loading subscribers...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Newsletter Subscribers</h1>

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
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search subscribers..."
            className="pl-10 pr-4 py-2 border rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => {
            setShowAddForm(true);
            setNewSubscriber({ name: '', email: '' });
          }} 
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FiUser /> Add Subscriber
        </button>
        <button onClick={exportToCSV} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <FiDownload /> Export CSV
        </button>
        <button
          onClick={() => setShowEmailModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-2"
          disabled={subscriptions.length === 0}
        >
          <FiSend /> Send Newsletter
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white border border-blue-200 rounded-lg p-4 mb-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Add New Subscriber</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input 
                type="text" 
                name="name" 
                value={newSubscriber.name} 
                onChange={handleInputChange} 
                className="w-full p-2 border rounded" 
                placeholder="Enter name" 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input 
                type="email" 
                name="email" 
                value={newSubscriber.email} 
                onChange={handleInputChange} 
                className="w-full p-2 border rounded" 
                placeholder="Enter email" 
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button 
              onClick={() => {
                setShowAddForm(false);
                setNewSubscriber({ name: '', email: '' });
              }} 
              className="px-4 py-2 border rounded text-gray-700"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddSubscriber}
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={!newSubscriber.name || !newSubscriber.email}
            >
              Add Subscriber
            </button>
          </div>
        </div>
      )}

      {/* Subscribers Table */}
      <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribed On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscribers.length > 0 ? (
                filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiUser className="mr-2 text-gray-500" />
                        <span className="font-medium">{subscriber.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiMail className="mr-2 text-gray-500" />
                        <span>{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(subscriber.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleDeleteClick(subscriber._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No subscribers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        title="Confirm Subscriber Deletion"
        message="Are you sure you want to delete this subscriber? This action cannot be undone."
      />

      {/* Send Newsletter Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Send Newsletter</h2>
              <button onClick={() => { setShowEmailModal(false); setEmailContent(''); }} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">This will send an email to all {subscriptions.length} subscribers.</p>
              <textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                rows="8"
                className="w-full p-3 border rounded"
                placeholder="Write your newsletter content here..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => { setShowEmailModal(false); setEmailContent(''); }} className="px-4 py-2 border rounded text-gray-700">Cancel</button>
              <button onClick={sendNewsletter} className="px-4 py-2 bg-purple-600 text-white rounded flex items-center gap-2" disabled={!emailContent.trim()}>
                <FiSend /> Send to All Subscribers
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Newsletter;