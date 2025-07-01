import React, { useEffect, useState } from 'react';
import { FiMail, FiPhone, FiUser, FiTrash2, FiCornerUpLeft, FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContacts,
  deleteContact,
  updateContact
} from '../../../redux/features/contactSlice/contactSlice';
import { useLocation } from "react-router-dom";
import { useRef } from "react";

const ContactUs = () => {
  const dispatch = useDispatch();
    const location = useLocation();
  const highlightId = location.state?.highlightId;
  const highlightRefMap = useRef({});
  const { contacts, loading, error } = useSelector((state) => state.contact);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

      useEffect(() => {
    if (highlightId && highlightRefMap.current[highlightId]) {
      highlightRefMap.current[highlightId].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  
      // Clear the highlight from history state after 5s
      const timer = setTimeout(() => {
        window.history.replaceState({}, "");
      }, 5000);
  
      return () => clearTimeout(timer);
    }
  }, [highlightId]);

  const filteredContacts = contacts?.filter((contact) => {
    const matchesSearch =
      contact?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      contact?.message?.toLowerCase()?.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteContact(deleteId));
    setShowConfirmModal(false);
  };

  const handleReply = (contact) => {
    setSelectedContact(contact);
    setReplyText('');
  };

  const sendReply = () => {
    if (!selectedContact || !replyText.trim()) return;

    dispatch(
      updateContact({
        id: selectedContact._id,
        data: { status: 'Resolved' },
      })
    );

    alert(`Reply sent to ${selectedContact.email}: ${replyText}`);
    setSelectedContact(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            className="pl-10 pr-4 py-2 border rounded w-full"
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
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-lg border overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : filteredContacts?.length > 0 ? (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Patient</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Message</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact._id}
                  ref={(el) => {
    if (contact._id === highlightId) {
      highlightRefMap.current[contact._id] = el;
    }
  }}
  className={`bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border
    ${contact._id === highlightId
      ? "border-yellow-400 bg-yellow-50 animate-pulse"
      : "border-gray-100 hover:shadow-lg"}
    transition-all duration-300 hover:scale-[1.02]`}
               >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FiUser className="mr-2 text-gray-500" />
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-gray-500">{contact.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">{contact.message}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        contact.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {(contact.status)?contact.status : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReply(contact)}
                        className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                      >
                        <FiCornerUpLeft className="mr-1" /> Reply
                      </button>
                      <button
                        onClick={() => handleDeleteClick(contact._id)}
                        className="text-red-600 hover:text-red-800 flex items-center text-sm"
                      >
                        <FiTrash2 className="mr-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 text-center text-gray-500">No contact messages found</div>
        )}
      </div>

      {/* Reply Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Reply to {selectedContact.name}</h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Original Message:</p>
              <p className="bg-gray-50 p-3 rounded">{selectedContact.message}</p>
            </div>

            <textarea
              className="w-full border rounded p-3 mb-4"
              rows="4"
              placeholder="Type your response here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedContact(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={sendReply}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={!replyText.trim()}
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-6">Are you sure you want to delete this contact message?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;