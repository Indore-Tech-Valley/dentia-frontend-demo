import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchDoctors } from "../../redux/features/doctorSlice/doctorSlice";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DentalTeam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctors, loading, error } = useSelector((state) => state.doctor);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  useEffect(() => {
  if (showModal) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  // Cleanup on unmount
  return () => {
    document.body.classList.remove("overflow-hidden");
  };
}, [showModal]);


  const handleCardClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDoctor(null);
  };



  return (
    <section className="bg-[#f3f6fd] py-12 lg:py-24">
      <div className="max-w-7xl mx-auto text-center px-6">
        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-blue-600 font-bold text-md lg:text-lg mb-2 lg:text-center text-left"
        >
          MEET OUR DENTAL TEAM
        </motion.p>

        <motion.h2
          className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1d42] leading-tight text-left lg:text-center"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Committed to Your Smile
        </motion.h2>

        <motion.p
          className="mb-12 text-gray-500 text-base sm:text-lg text-left lg:text-center"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our experienced dental team is here to make every visit positive and personalized.
          <br />
          With gentle hands and caring hearts.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <motion.div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-md group w-full h-full mx-auto cursor-pointer"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 * index }}
              viewport={{ once: true }}
              onClick={() => handleCardClick(doctor)}
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-2xl shadow text-center w-[90%]">
                <h3 className="text-base font-semibold text-blue-900">{doctor.name}</h3>
                <p className="text-sm text-gray-500">{doctor.specialization}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL */}
{showModal && selectedDoctor && (
  <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 md:p-4 overflow-auto">
    <div className="bg-gradient-to-r from-[#f8fbff] to-[#e9f5ef] w-full max-w-4xl rounded-2xl shadow-2xl p-6 md:p-8 relative animate-fadeIn">
      
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
        onClick={closeModal}
      >
        <X size={24} />
      </button>

      {/* Responsive Flex Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Image Section */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <img
            src={selectedDoctor.image}
            alt={selectedDoctor.name}
            className="w-48 h-40 sm:w-56 sm:h-56 rounded-xl object-cover border-4 border-white shadow-md"
          />
        </div>

        {/* Doctor Details */}
        <div className="w-full lg:w-2/3 flex flex-col justify-between">
          <div className="space-y-1 mb-3">
            <div className="flex gap-2 flex-wrap">
              <span className="bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full font-semibold">Active</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full font-medium">Available</span>
            </div>
            <h2 className=" text-lg md:text-2xl font-bold text-blue-900">{selectedDoctor.name}</h2>
            <p className="text-sm text-blue-600">{selectedDoctor.specialization}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold text-gray-600">Degree:</p>
              <p>{selectedDoctor.degree}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Experience:</p>
              <p>{selectedDoctor.experience} years</p>
            </div>
            <div className="sm:col-span-2">
              <p className="font-semibold text-gray-600">Previous Hospital:</p>
              <p>{selectedDoctor.previous_hospital}</p>
            </div>
          </div>

          <div className=" mt-2 md:mt-6">
            <button
              onClick={() => navigate(`/#appointment`)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition"
            >
              📅 Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* About Section (Full width on small screens) */}
      <div className=" mt-2 md:mt-6">
        <div className="bg-white rounded-xl p-1 md:p-4 shadow-inner">
          <h3 className="text-lg font-bold text-gray-800 mb-2">About</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {selectedDoctor.description}
          </p>
        </div>
      </div>
    </div>
  </div>
)}




    </section>
  );
};

export default DentalTeam;
