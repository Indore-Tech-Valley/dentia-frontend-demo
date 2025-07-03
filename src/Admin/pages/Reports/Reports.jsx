import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  uploadReport,
  getAllReports,
  deleteReport,
  updateReport
} from '../../../redux/features/reportsSlice/reportsSlice';
import { Plus, Edit2, Trash2, Download, Upload, Search, FileText, Eye } from 'lucide-react';
import MessageModal from '../../../components/MessageModal/MessageModal';

const Reports = () => {
  const dispatch = useDispatch();
  const { reports, loading, error } = useSelector((state) => state.reports);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [formData, setFormData] = useState({
    patientCode: '',
    title: '',
    file: null,
  });

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const openModal = (type, message) => {
    setModal({ show: true, type, message });
  };

  const closeModal = () => {
    setModal({ ...modal, show: false });
  };

  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(getAllReports());
  }, [dispatch]);

  const filteredReports = reports?.filter((r) =>
    r?.patientCode?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    r?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = () => {
    if (!formData.patientCode || !formData.title || (!editingReport && !formData.file)) {
      alert('Please fill in all required fields and select a file');
      return;
    }

    const data = new FormData();
    data.append('patientCode', formData.patientCode);
    data.append('title', formData.title);
    if (formData.file) data.append('file', formData.file);

    if (editingReport) {
      dispatch(updateReport({ id: editingReport._id, formData: data }))
        .then((res) => {
          if (updateReport.fulfilled.match(res)) {
            openModal('success', res.payload.message || 'Report updated');
            resetForm();
            setIsModalOpen(false);
            dispatch(getAllReports());
          } else {
            openModal('error', res.payload || 'Update failed');
          }
        });
    } else {
      dispatch(uploadReport(data))
        .then((res) => {
          if (uploadReport.fulfilled.match(res)) {
            openModal('success', res.payload.message || 'Report uploaded');
            resetForm();
            setIsModalOpen(false);
            dispatch(getAllReports());
          } else {
            openModal('error', res.payload || 'Upload failed');
          }
        });
    }
  };

  const handleEdit = (report) => {
    setEditingReport(report);
    setFormData({
      patientCode: report.patientCode,
      title: report.title,
      file: null,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      const resultAction = await dispatch(deleteReport(id));
      if (deleteReport.fulfilled.match(resultAction)) {
        openModal("success", resultAction?.payload?.message);
      } else {
        openModal("error", resultAction?.payload);
      }
    }
  };

  const resetForm = () => {
    setFormData({ patientCode: '', title: '', file: null });
    setEditingReport(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getFileIcon = (type) => {
    if (type?.includes('pdf')) return '📄';
    if (type?.includes('image')) return '🖼️';
    return '📁';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Message Modal */}
      {modal.show && (
        <MessageModal
          type={modal.type}
          message={modal.message}
          onClose={closeModal}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Medical Reports</h1>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus size={20} /> Add Report
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search by patient code or title..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Code
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Upload Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                    Loading reports...
                  </td>
                </tr>
              ) : filteredReports?.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                    No reports found
                  </td>
                </tr>
              ) : (
                filteredReports?.map((report) => (
                  <tr key={report._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="text-blue-600 mr-2" size={18} />
                        <span className="text-sm font-medium text-gray-900">
                          {report.patientCode}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {report.title}
                      </div>
                      <div className="text-sm text-gray-500 sm:hidden">
                        {formatDate(report.createdAt)}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                      {formatDate(report.createdAt)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="mr-2">{getFileIcon(report.fileType)}</span>
                        <a 
                          href={report.fileUrl} 
                          download 
                          target='_blank' 
                          rel="noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm underline flex items-center gap-1"
                        >
                          <Download size={14} />
                          <span className="hidden sm:inline">Download</span>
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEdit(report)} 
                          className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(report._id)} 
                          className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View (Alternative for very small screens) */}
      <div className="sm:hidden mt-6">
        <div className="text-sm text-gray-500 mb-2">
          Showing {filteredReports?.length || 0} reports
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">
              {editingReport ? 'Update Report' : 'Add New Report'}
            </h2>

            <div className="space-y-4">
              <input 
                type="text" 
                name="patientCode" 
                value={formData.patientCode} 
                onChange={handleInputChange} 
                placeholder="Patient Code"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                placeholder="Report Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Upload File (PDF only)
                </label>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".pdf" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button 
                onClick={() => { resetForm(); setIsModalOpen(false); }} 
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleSubmit} 
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : (editingReport ? 'Update' : 'Add')} Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;