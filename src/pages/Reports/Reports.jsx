import React, { useState } from "react";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientByCode } from "../../redux/features/patientSlice/patientSlice";
import { getReportsByPatientCode } from "../../redux/features/reportsSlice/reportsSlice";
import MessageModal from "../../components/MessageModal/MessageModal";
import { Search, User, Mail, Phone, Download, FileText, Calendar, Hash, Loader2 } from "lucide-react";

const Reports = () => {
  const [patientId, setPatientId] = useState("");
  const dispatch = useDispatch();
  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const openModal = (type, message) => {
    setModal({ show: true, type, message });
  };

  const closeModal = () => setModal({ ...modal, show: false });

  const { reports, loading } = useSelector((state) => state.reports);
  const { selectedPatient } = useSelector((state) => state.patients);

  const handleFetchReports = () => {
    if (!patientId.trim()) return openModal("info", "Please enter a Patient ID");

    dispatch(fetchPatientByCode(patientId))
      .unwrap()
      .then((res) => {
        dispatch(getReportsByPatientCode(patientId));
      })
      .catch((error) => openModal("error", error));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFetchReports();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Header
        title="Reports"
        image="https://kdahweb-static.kokilabenhospital.com/kdah-2019/slider/16672013291400.jpg"
      />

      {modal.show && (
        <MessageModal
          type={modal.type}
          message={modal.message}
          onClose={closeModal}
        />
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-6xl mx-2 md:mx-auto mt-20 mb-8">
          {/* Search Card */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                Patient Reports
              </h2>
              <p className="text-gray-600 text-lg">
                Enter patient ID to view medical reports and documents
              </p>
            </div>

            {/* Search Input */}
            <div className="max-w-md mx-auto">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter Patient ID (e.g., P001)"
                  className="w-full pl-12 pr-4 py-4 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-lg placeholder-gray-400"
                />
              </div>
              
              <button
                onClick={handleFetchReports}
                disabled={loading}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Fetching Reports...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Get Reports
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        {/* Patient Details Card */}
        {selectedPatient && (
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-6 md:p-8 mb-8 transform transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Patient Details</h3>
                <p className="text-gray-600">Complete patient information</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Hash className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Patient ID</p>
                  <p className="text-lg font-semibold text-gray-800">{selectedPatient?.patientCode}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-lg font-semibold text-gray-800">{selectedPatient?.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email Address</p>
                  <p className="text-lg font-semibold text-gray-800">{selectedPatient?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone Number</p>
                  <p className="text-lg font-semibold text-gray-800">{selectedPatient?.mobile}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Table */}
        {reports.length > 0 && (
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Medical Reports ({reports.length})
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Report Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date Created
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/60">
                  {reports.map((report, index) => (
                    <tr key={report._id || index} className="hover:bg-blue-50/30 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold text-gray-700">{index + 1}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{report.title}</p>
                            <p className="text-xs text-gray-500">Medical Report</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{formatDate(report.createdAt)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={report.fileUrl}
                          target="_blank"
                          download
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Reports State */}
        {selectedPatient && reports.length === 0 && !loading && (
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Reports Found</h3>
            <p className="text-gray-600">
              No medical reports are available for this patient at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;