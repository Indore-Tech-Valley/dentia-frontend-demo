import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaHeartbeat,
  FaCalendarAlt,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaIdCard,
  FaUserInjured,
} from "react-icons/fa";
import {
  MdClose,
  MdSearch,
  MdFilterList,
  MdMale,
  MdFemale,
  MdBloodtype,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPatients,
  createPatient,
  updatePatient,
  deletePatient,
  fetchPatientStats,
} from "../../../redux/features/patientSlice/patientSlice";
import MessageModal from "../../../components/MessageModal/MessageModal";
import DeleteConfirmation from "../../components/DeleteConfirmation/DeleteConfirmation";

// const samplePatients = [...Array(30)].map((_, i) => ({
//   id: 200000 + i,
//   name: `Patient ${i + 1}`,
//   age: 25 + (i % 50),
//   gender: i % 2 === 0 ? 'Male' : 'Female',
//   bloodGroup: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'][i % 8],
//   mobile: `+91 98765${20000 + i}`,
//   email: `patient${i + 1}@example.com`,
//   address: `${i + 1} Main Street, City`,
//   emergencyContact: `+91 98765${30000 + i}`,
//   medicalHistory: ['Diabetes', 'Hypertension', 'Asthma', 'None'][i % 4],
//   lastVisit: new Date(2024, 5, 15 + (i % 30)).toLocaleDateString(),
//   totalVisits: 1 + (i % 10),
//   status: i % 8 === 0 ? 'Critical' : i % 6 === 0 ? 'Under Treatment' : 'Stable',
//   insurance: i % 3 === 0 ? 'Yes' : 'No',
//   registrationDate: new Date(2024, 0, 1 + (i % 180)).toLocaleDateString(),
// }));

const Patients = () => {
  const dispatch = useDispatch();
  const { patients, stats, loading, error } = useSelector(
    (state) => state.patients
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    bloodGroup: "A+",
    mobile: "",
    email: "",
    address: "",
    emergencyContact: "",
    medicalHistory: "",
    status: "Stable",
    insurance: "No",
  });
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
    const [deleteId, setDeleteId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
  const perPage = 8;

  useEffect(() => {
    dispatch(fetchPatientStats());
    dispatch(fetchPatients());
  }, [dispatch]);

  console.log(stats)

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

  const handleEdit = (patient) => {
    setCurrentPatient(patient);
    setForm({
      name: patient.name || "",
      age: patient.age || "",
      gender: patient.gender || "Male",
      bloodGroup: patient.bloodGroup || "A+",
      mobile: patient.mobile || "",
      email: patient.email || "",
      address: patient.address || "",
      emergencyContact: patient.emergencyContact || "",
      medicalHistory: patient.medicalHistory || "",
      status: patient.status || "Stable",
      insurance: patient.insurance || "No",
    });
    setModalOpen(true);
  };

    // Handle delete click
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
     await dispatch(deletePatient(deleteId))
     .then((res)=>{
      openModal("success",res?.payload?.message || "Patient deleted successfully");
     })
     .catch((err)=>{
      openModal("error", res?.payload || "Error deleting patient");
     })
       dispatch(fetchPatientStats())
       dispatch(fetchPatients())
      setShowConfirmModal(false);
    } catch (err) {
      // console.error('Failed to delete patient:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      age: parseInt(form.age),  
    };

    if (currentPatient) {
      const resultAction = await dispatch(
        updatePatient({ id: currentPatient._id, data: payload })
      );
      if (updatePatient.fulfilled.match(resultAction)) {
        setModalOpen(false);
        setForm({
          name: "",
          age: "",
          gender: "Male",
          bloodGroup: "A+",
          mobile: "",
          email: "",
          address: "",
          emergencyContact: "",
          medicalHistory: "",
          status: "Stable",
          insurance: "No",
        });
        setCurrentPatient(null);
        openModal("success", resultAction?.payload?.message);
        dispatch(fetchPatientStats());
        dispatch(fetchPatients());
      } else {
        openModal("error", resultAction?.payload || "failed to update patient");
      }
    } else {
      const resultAction = await dispatch(createPatient(payload));
      if (createPatient.fulfilled.match(resultAction)) {
        setModalOpen(false);
        setForm({
          name: "",
          age: "",
          gender: "Male",
          bloodGroup: "A+",
          mobile: "",
          email: "",
          address: "",
          emergencyContact: "",
          medicalHistory: "",
          status: "Stable",
          insurance: "No",
        });
        openModal("success", resultAction?.payload?.message);
        dispatch(fetchPatientStats());
        dispatch(fetchPatients());
       
      } else {
        openModal("error", resultAction?.payload || "failed to create patient");
      }
    }
   dispatch(fetchPatientStats());
        dispatch(fetchPatients());
    resetModal();
  };

  const filteredPatients = patients?.filter((patient) => {
    const matchesSearch =
      patient?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      patient?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      patient?.mobile?.includes(searchTerm) ||
      patient?.id?.toString()?.includes(searchTerm);
    const matchesStatus =
      statusFilter === "All" || patient?.status === statusFilter;
    const matchesGender =
      genderFilter === "All" || patient?.gender === genderFilter;
    return matchesSearch && matchesStatus && matchesGender;
  });

  const start = (page - 1) * perPage;
  const paginated = filteredPatients.slice(start, start + perPage);
  const totalPages = Math.ceil(filteredPatients.length / perPage);

  const resetModal = () => {
    setModalOpen(false);
    setCurrentPatient(null);
    setForm({
      name: "",
      age: "",
      gender: "Male",
      bloodGroup: "A+",
      mobile: "",
      email: "",
      address: "",
      emergencyContact: "",
      medicalHistory: "",
      status: "Stable",
      insurance: "No",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Critical":
        return "bg-red-100 text-red-700";
      case "Under Treatment":
        return "bg-yellow-100 text-yellow-700";
      case "Stable":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) return <div className="text-center py-20">Loading patients...</div>;


  const totalVisits = patients.reduce((sum, p) => sum + p.totalVisits, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-4 md:p-6">
      {/* Message Modal */}
      {modal.show && (
        <MessageModal
          type={modal.type}
          message={modal.message}
          onClose={closeModal}
        />
      )}

            {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        title="Confirm Patient Deletion"
        message="Are you sure you want to delete this Patient? This action cannot be undone."
      />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Patients Management
              </h1>
              <p className="text-gray-600">
                Manage patient records and medical information
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-4 md:px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transform transition-all duration-200 hover:scale-105 focus:ring-4 focus:ring-indigo-200 w-full md:w-auto"
            >
              <FaPlus className="text-sm" /> Add New Patient
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="bg-blue-100 p-2 md:p-3 rounded-lg md:rounded-xl">
                <FaUser className="text-blue-600 text-lg md:text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-xs md:text-sm">
                  Total Patients
                </p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {stats?.total || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="bg-red-100 p-2 md:p-3 rounded-lg md:rounded-xl">
                <FaUserInjured className="text-red-600 text-lg md:text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-xs md:text-sm">Critical</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {stats?.critical || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="bg-yellow-100 p-2 md:p-3 rounded-lg md:rounded-xl">
                <FaHeartbeat className="text-yellow-600 text-lg md:text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-xs md:text-sm">
                  Under Treatment
                </p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {stats?.underTreatment || 0}
                </p>
              </div>
            </div>
          </div>
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="bg-red-100 p-2 md:p-3 rounded-lg md:rounded-xl">
                <FaUserInjured className="text-red-600 text-lg md:text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-xs md:text-sm">Stable</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {stats?.stable || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="bg-green-100 p-2 md:p-3 rounded-lg md:rounded-xl">
                <FaCalendarAlt className="text-green-600 text-lg md:text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-xs md:text-sm">Recovered</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {stats?.recovered || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 mb-6 md:mb-8">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <MdFilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
                >
                  <option value="All">All Status</option>
                  <option value="Stable">Stable</option>
                  <option value="Under Treatment">Under Treatment</option>
                  <option value="Critical">Critical</option>
                  <option value="Recovered">Recovered</option>
                </select>
              </div>
              <div className="relative">
                <MdFilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
                >
                  <option value="All">All Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {paginated.map((patient) => (
            <div
              key={patient.id}
              className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-2 md:p-3 rounded-lg md:rounded-xl">
                  {patient.gender === "Male" ? (
                    <MdMale className="text-indigo-600 text-xl md:text-2xl" />
                  ) : (
                    <MdFemale className="text-pink-600 text-xl md:text-2xl" />
                  )}
                </div>
                <span
                  className={`text-xs font-semibold px-2 md:px-3 py-1 rounded-full ${getStatusColor(
                    patient.status
                  )}`}
                >
                  {patient.status}
                </span>
              </div>

              <h3 className="font-bold text-base md:text-lg text-gray-900 mb-1">
                {patient.name}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm mb-4">
                ID: {patient._id}
              </p>
 <p className="text-gray-600 text-xs md:text-sm mb-4">
                PID: {patient.patientCode || 'xxxx'}
              </p>
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-600">
                  <FaBirthdayCake className="text-indigo-500 text-xs md:text-sm" />
                  <span>{patient.age} years</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-600">
                  <MdBloodtype className="text-red-500 text-sm md:text-base" />
                  <span>{patient.bloodGroup}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-600">
                  <FaPhone className="text-indigo-500 text-xs md:text-sm" />
                  <span className="truncate">{patient.mobile}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-600">
                  <FaEnvelope className="text-indigo-500 text-xs md:text-sm" />
                  <span className="truncate">{patient.email}</span>
                </div>
                {/* <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-600">
                  <FaCalendarAlt className="text-indigo-500 text-xs md:text-sm" />
                  <span>1 visits</span>
                </div> */}
                <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-600">
                  <FaHeartbeat className="text-indigo-500 text-xs md:text-sm" />
                  <span className="truncate">{patient.medicalHistory}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(patient)}
                  className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 md:px-4 rounded-lg md:rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm font-medium"
                >
                  <FaEdit className="text-xs" /> Edit
                </button>
                <button
                  key={patient._id}
                  onClick={() => handleDeleteClick(patient._id)}
                  className="flex-1 bg-red-50 text-red-600 py-2 px-3 md:px-4 rounded-lg md:rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm font-medium"
                >
                  <FaTrash className="text-xs" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl transition-colors font-medium text-sm md:text-base"
              >
                Previous
              </button>
              <div className="flex items-center gap-1 md:gap-2">
                {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl font-medium transition-colors text-sm md:text-base ${
                        page === pageNum
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 5 && (
                  <>
                    <span className="text-gray-400 text-sm md:text-base">
                      ...
                    </span>
                    <span className="text-gray-600 font-medium text-sm md:text-base">
                      Page {page} of {totalPages}
                    </span>
                  </>
                )}
              </div>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl transition-colors font-medium text-sm md:text-base"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white w-full max-w-4xl rounded-xl md:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    {currentPatient ? "Edit Patient" : "Add New Patient"}
                  </h2>
                  <button
                    onClick={resetModal}
                    className="p-2 hover:bg-gray-100 rounded-lg md:rounded-xl transition-colors"
                  >
                    <MdClose size={20} className="text-gray-500 md:text-2xl" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Patient Name *
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="Enter patient's full name"
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        max="150"
                        value={form.age}
                        onChange={(e) =>
                          setForm({ ...form, age: e.target.value })
                        }
                        placeholder="Enter age"
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        value={form.gender}
                        onChange={(e) =>
                          setForm({ ...form, gender: e.target.value })
                        }
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blood Group
                      </label>
                      <select
                        value={form.bloodGroup}
                        onChange={(e) =>
                          setForm({ ...form, bloodGroup: e.target.value })
                        }
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Number *
                      </label>
                      <input
                        required
                        value={form.mobile}
                        onChange={(e) =>
                          setForm({ ...form, mobile: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="patient@example.com"
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        value={form.address}
                        onChange={(e) =>
                          setForm({ ...form, address: e.target.value })
                        }
                        placeholder="Enter complete address"
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact
                      </label>
                      <input
                        value={form.emergencyContact}
                        onChange={(e) =>
                          setForm({ ...form, emergencyContact: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Medical History
                      </label>
                      <input
                        value={form.medicalHistory}
                        onChange={(e) =>
                          setForm({ ...form, medicalHistory: e.target.value })
                        }
                        placeholder="e.g., Diabetes, Hypertension"
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={form.status}
                        onChange={(e) =>
                          setForm({ ...form, status: e.target.value })
                        }
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
                      >
                        <option value="Stable">Stable</option>
                        <option value="Under Treatment">Under Treatment</option>
                        <option value="Critical">Critical</option>
                        <option value="Recovered">Recovered</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Insurance
                      </label>
                      <select
                        value={form.insurance}
                        onChange={(e) =>
                          setForm({ ...form, insurance: e.target.value })
                        }
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 pt-6">
                    <button
                      type="button"
                      onClick={resetModal}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-3 px-6 rounded-xl transition-all duration-200 font-medium shadow-lg"
                    >
                      {currentPatient ? "Update Patient" : "Add Patient"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;
