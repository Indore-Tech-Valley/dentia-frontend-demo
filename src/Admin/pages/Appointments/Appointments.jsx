import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaStethoscope,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import {
  MdClose,
  MdSearch,
  MdFilterList,
  MdDateRange,
  MdAccessTime,
  MdPersonPin,
  MdMedicalServices 
} from "react-icons/md";
import { fetchAppointments } from "../../../redux/features/appointmentSlice/appointmentSlice";
import { fetchServices } from "../../../redux/features/servicesSlice/servicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MessageModal from "../../../components/MessageModal/MessageModal";
import {
  createAppointment,
  deleteAppointment,
  updateAppointment,
} from "../../../redux/features/appointmentSlice/appointmentSlice";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

const timeSlots = ["9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];

const Appointments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const highlightId = location.state?.highlightId;
  const highlightRefMap = useRef({});

  const { appointments, loading, error } = useSelector(
    (state) => state.appointment
  );
  const { services } = useSelector((state) => state.service);
  const serviceTypes = services.map((service) => service.title);
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // console.log(serviceTypes);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    message: "",
  });
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All");
  const perPage = 8;

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
    dispatch(fetchServices());
    dispatch(fetchAppointments());
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

  const handleEdit = (appointment) => {
    setCurrentAppointment(appointment);
    setForm({
      name: appointment.name,
      email: appointment.email,
      phone: appointment.phone,
      date: appointment.date,
      time: appointment.time,
      service: appointment.service,
      message: appointment.message,
    });
    setModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    const resultAction = await dispatch(deleteAppointment(deleteId));
    setShowConfirmModal(false);

    if (resultAction.payload?.success) {
      openModal(
        "success",
        resultAction.payload.message || "Appointment deleted successfully!"
      );
      dispatch(fetchAppointments());
    } else {
      openModal(
        "error",
        resultAction.payload || "Failed to delete appointment"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitting:", form);
    if (currentAppointment) {
      // Update existing appointment
      // console.log(currentAppointment);
      const resultAction = await dispatch(
        updateAppointment({
          id: currentAppointment._id,
          updatedData: form,
        })
      );
      if (updateAppointment.fulfilled.match(resultAction)) {
        // console.log(resultAction);
        openModal(
          "success",
          resultAction.payload.message || "Appointment updated successfully!"
        );
        setModalOpen(false);
        setCurrentAppointment(null);
        dispatch(fetchAppointments());
      } else {
        // console.log(resultAction)
        openModal(
          "error",
          resultAction.payload || "Failed to update appointment"
        );
      }
       dispatch(fetchAppointments());
    } else {
      try {
        const resultAction = await dispatch(createAppointment(form));
        if (createAppointment.fulfilled.match(resultAction)) {
          // console.log(resultAction);
          resetModal();
          openModal(
            "success",
            resultAction?.payload?.message || "Appointment booked successfully!"
          );
          setFormData({
            service: "",
            date: "",
            time: "",
            name: "",
            email: "",
            phone: "",
            message: "",
          });
         
        } else {
          // console.log(resultAction.payload)
          // resetModal();
          openModal(
            "error",
            resultAction?.payload || "Failed to book appointment"
          );
        }
         dispatch(fetchAppointments());
      } catch (err) {
        // console.error(err);
        // resetModal();
        // openModal("error", "An error occurred while booking the appointment.");
      }
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      service: "",
      message: "",
    });
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      appointment?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      appointment?.service
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase()) ||
      appointment?.phone?.includes(searchTerm);

    const matchesService =
      serviceFilter === "All" || appointment?.service === serviceFilter;
    const matchesTime =
      timeFilter === "All" || appointment?.time === timeFilter;

    let matchesDate = true;
    if (dateFilter !== "All") {
      const today = new Date();
      const appointmentDate = new Date(appointment?.date);

      switch (dateFilter) {
        case "Today":
          matchesDate = appointmentDate.toDateString() === today.toDateString();
          break;
        case "Tomorrow":
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
          matchesDate =
            appointmentDate.toDateString() === tomorrow.toDateString();
          break;
        case "This Week":
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          matchesDate =
            appointmentDate >= weekStart && appointmentDate <= weekEnd;
          break;
        case "Next Week":
          const nextWeekStart = new Date(today);
          nextWeekStart.setDate(today.getDate() + (7 - today.getDay()));
          const nextWeekEnd = new Date(nextWeekStart);
          nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
          matchesDate =
            appointmentDate >= nextWeekStart && appointmentDate <= nextWeekEnd;
          break;
      }
    }

    return matchesSearch && matchesService && matchesDate && matchesTime;
  });

  const start = (page - 1) * perPage;
  const paginated = filteredAppointments.slice(start, start + perPage);
  const totalPages = Math.ceil(filteredAppointments.length / perPage);

  const resetModal = () => {
    setModalOpen(false);
    setCurrentAppointment(null);
    resetForm();
  };

  const formatTime = (time) => {
    const hour = parseInt(time);
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get today's date for minimum date input
  const today = new Date().toISOString().split("T")[0];

  // Get unique services for filter
  const uniqueServices = [...new Set(serviceTypes.map((a) => a))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-4 md:p-6">
      {modal.show && (
        <MessageModal
          type={modal.type}
          message={modal.message}
          onClose={closeModal}
        />
      )}
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Appointments Management
              </h1>
              <p className="text-gray-600">
                Schedule and manage service appointments
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 md:px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transform transition-all duration-200 hover:scale-105 focus:ring-4 focus:ring-purple-200 w-full md:w-auto"
            >
              <FaPlus className="text-sm" /> Schedule Appointment
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="bg-blue-100 p-2 md:p-3 rounded-lg md:rounded-xl">
                <FaCalendarAlt className="text-blue-600 text-lg md:text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-xs md:text-sm">
                  Total Appointments
                </p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {appointments.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="bg-green-100 p-2 md:p-3 rounded-lg md:rounded-xl">
                <FaCheckCircle className="text-green-600 text-lg md:text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-xs md:text-sm">This Week</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {
                    appointments.filter((a) => {
                      const today = new Date();
                      const weekStart = new Date(today);
                      weekStart.setDate(today.getDate() - today.getDay());
                      const weekEnd = new Date(weekStart);
                      weekEnd.setDate(weekStart.getDate() + 6);
                      const appointmentDate = new Date(a.date);
                      return (
                        appointmentDate >= weekStart &&
                        appointmentDate <= weekEnd
                      );
                    }).length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="bg-orange-100 p-2 md:p-3 rounded-lg md:rounded-xl">
                <FaClock className="text-orange-600 text-lg md:text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-xs md:text-sm">Today</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {
                    appointments.filter((a) => {
                      const today = new Date().toDateString();
                      const appointmentDate = new Date(a.date).toDateString();
                      return appointmentDate === today;
                    }).length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="bg-purple-100 p-2 md:p-3 rounded-lg md:rounded-xl">
                <FaStethoscope className="text-purple-600 text-lg md:text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-xs md:text-sm">Services</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {uniqueServices.length}
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
                placeholder="Search by name, email, service, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MdFilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white"
                >
                  <option value="All">All Services</option>
                  {uniqueServices.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <MdDateRange className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white"
                >
                  <option value="All">All Dates</option>
                  <option value="Today">Today</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="This Week">This Week</option>
                  <option value="Next Week">Next Week</option>
                </select>
              </div>
              <div className="relative">
                <MdAccessTime className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white"
                >
                  <option value="All">All Times</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {formatTime(time)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-sm text-gray-500">
                  Showing {filteredAppointments.length} of {appointments.length}{" "}
                  appointments
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        )}

        {/* Appointments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {paginated.map((appointment) => (
            <div
              key={appointment._id}
              ref={(el) => {
                if (appointment._id === highlightId) {
                  highlightRefMap.current[appointment._id] = el;
                }
              }}
              className={`bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border
    ${
      appointment._id === highlightId
        ? "border-yellow-400 bg-yellow-50 animate-pulse"
        : "border-gray-100 hover:shadow-lg"
    }
    transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-2 md:p-3 rounded-lg md:rounded-xl">
                  <FaUser className="text-purple-600 text-lg md:text-xl" />
                </div>
                <span className="text-xs font-semibold px-2 md:px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                  {appointment.service}
                </span>
              </div>

              <h3 className="font-bold text-base md:text-lg text-gray-900 mb-1">
                {appointment.name}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm mb-4 truncate">
                {appointment.email}
              </p>

              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-600">
                  <FaCalendarAlt className="text-purple-500 text-xs md:text-sm" />
                  <span>{formatDate(appointment.date)}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-600">
                  <MdAccessTime className="text-purple-500 text-sm md:text-base" />
                  <span>{formatTime(appointment.time)}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-600">
                  <FaPhone className="text-purple-500 text-xs md:text-sm" />
                  <span className="truncate">{appointment.phone}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-600">
                  <MdMedicalServices  className="text-purple-500 text-xs md:text-sm" />
                  <span className="truncate">{appointment.service}</span>
                </div>
                {appointment.message && (
                  <div className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-gray-600">
                    <FaEnvelope className="text-purple-500 text-xs md:text-sm mt-0.5" />
                    <span className="truncate">{appointment.message}</span>
                  </div>
                )}
                <div className="text-xs text-gray-500">
                  Created: {formatDate(appointment.createdAt)}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(appointment)}
                  className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 md:px-4 rounded-lg md:rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm font-medium"
                >
                  <FaEdit className="text-xs" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(appointment._id)}
                  className="flex-1 bg-red-50 text-red-600 py-2 px-3 md:px-4 rounded-lg md:rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm font-medium"
                >
                  <FaTrash className="text-xs" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && appointments.length === 0 && (
          <div className="text-center py-12">
            <FaCalendarAlt className="text-gray-300 text-6xl mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No appointments yet
            </h3>
            <p className="text-gray-500">
              Schedule your first appointment to get started.
            </p>
          </div>
        )}

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
                          ? "bg-purple-600 text-white"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40 p-4">
            <div className="bg-white w-full max-w-2xl rounded-xl md:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    {currentAppointment
                      ? "Edit Appointment"
                      : "Schedule New Appointment"}
                  </h2>
                  <button
                    onClick={resetModal}
                    className="p-2 hover:bg-gray-100 rounded-lg md:rounded-xl transition-colors"
                  >
                    <MdClose size={20} className="text-gray-500 md:text-2xl" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="Enter your name"
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="Enter your email"
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        required
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        placeholder="Enter your phone number"
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date *
                      </label>
                      <input
                        type="date"
                        required
                        min={today}
                        value={form.date}
                        onChange={(e) =>
                          setForm({ ...form, date: e.target.value })
                        }
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time *
                      </label>
                      <select
                        required
                        value={form.time}
                        onChange={(e) =>
                          setForm({ ...form, time: e.target.value })
                        }
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white"
                      >
                        <option value="">Select Time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {formatTime(time)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service *
                      </label>
                      <select
                        required
                        value={form.service}
                        onChange={(e) =>
                          setForm({ ...form, service: e.target.value })
                        }
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white"
                      >
                        {serviceTypes.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Additional message or notes"
                      rows={3}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={resetModal}
                      className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium"
                    >
                      {currentAppointment
                        ? "Update Appointment"
                        : "Schedule Appointment"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
              <p className="mb-6">
                Are you sure you want to delete this appointment?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
