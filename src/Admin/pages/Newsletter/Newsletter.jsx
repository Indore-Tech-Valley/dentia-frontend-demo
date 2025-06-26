import React, { useState } from 'react';
import { FiMail, FiUser, FiTrash2, FiSearch, FiDownload, FiSend } from 'react-icons/fi';

const Newsletter = () => {
  // Sample subscriber data
  const [subscribers, setSubscribers] = useState([
    { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', subscribedAt: '2023-06-15' },
    { id: 2, name: 'Priya Patel', email: 'priya@example.com', subscribedAt: '2023-06-10' },
    { id: 3, name: 'Amit Singh', email: 'amit@example.com', subscribedAt: '2023-06-05' },
    { id: 4, name: 'Neha Gupta', email: 'neha@example.com', subscribedAt: '2023-05-28' },
    { id: 5, name: 'Vikram Joshi', email: 'vikram@example.com', subscribedAt: '2023-05-20' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [newSubscriber, setNewSubscriber] = useState({ name: '', email: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [emailContent, setEmailContent] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Filter subscribers
  const filteredSubscribers = subscribers.filter(subscriber => {
    return (
      subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubscriber(prev => ({ ...prev, [name]: value }));
  };

  // Add new subscriber
  const addSubscriber = () => {
    if (newSubscriber.name && newSubscriber.email) {
      setSubscribers([
        {
          id: Math.max(...subscribers.map(s => s.id), 0) + 1,
          name: newSubscriber.name,
          email: newSubscriber.email,
          subscribedAt: new Date().toISOString().split('T')[0]
        },
        ...subscribers
      ]);
      setNewSubscriber({ name: '', email: '' });
      setShowAddForm(false);
    }
  };

  // Delete subscriber
  const deleteSubscriber = (id) => {
    setSubscribers(subscribers.filter(subscriber => subscriber.id !== id));
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Subscription Date'];
    const csvContent = [
      headers.join(','),
      ...subscribers.map(s => `${s.name},${s.email},${s.subscribedAt}`)
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

  // Send newsletter
  const sendNewsletter = () => {
    // In a real app, you would connect to your email service here
    alert(`Newsletter sent to ${subscribers.length} subscribers!`);
    setShowEmailModal(false);
    setEmailContent('');
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Newsletter Subscribers</h1>
      
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
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FiUser /> Add Subscriber
        </button>
        <button
          onClick={exportToCSV}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FiDownload /> Export CSV
        </button>
        <button
          onClick={() => setShowEmailModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-2"
          disabled={subscribers.length === 0}
        >
          <FiSend /> Send Newsletter
        </button>
      </div>

      {/* Add Subscriber Form */}
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
              onClick={addSubscriber}
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={!newSubscriber.name || !newSubscriber.email}
            >
              Add Subscriber
            </button>
          </div>
        </div>
      )}

      {/* Subscribers Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
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
              filteredSubscribers.map(subscriber => (
                <tr key={subscriber.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiUser className="mr-2 text-gray-500" />
                      {subscriber.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiMail className="mr-2 text-gray-500" />
                      {subscriber.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(subscriber.subscribedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => deleteSubscriber(subscriber.id)}
                      className="text-red-600 hover:text-red-900"
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

      {/* Send Newsletter Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Send Newsletter</h2>
              <button
                onClick={() => {
                  setShowEmailModal(false);
                  setEmailContent('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                This will send an email to all {subscribers.length} subscribers.
              </p>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Content *</label>
              <textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                rows="8"
                className="w-full p-3 border rounded"
                placeholder="Write your newsletter content here..."
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowEmailModal(false);
                  setEmailContent('');
                }}
                className="px-4 py-2 border rounded text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={sendNewsletter}
                className="px-4 py-2 bg-purple-600 text-white rounded flex items-center gap-2"
                disabled={!emailContent.trim()}
              >
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