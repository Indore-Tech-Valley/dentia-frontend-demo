import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const images = {
    dentist1:
      "https://plus.unsplash.com/premium_photo-1661775741361-3b68b05900ee?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGVudGlzdCUyMHBhdGllbnR8ZW58MHx8MHx8fDA%3D",
    dentist2:
      "https://www.rajkotdentist.com/wp-content/uploads/2024/03/happy-dentists-with-patient.jpg",
  };

  return (
    <section className="w-full bg-white py-12 mt-12 lg:py-24 ">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-center lg:items-start px-6">
        {/* Left Section - Images */}
       <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:mb-10 flex-1 justify-center lg:justify-start">
  <motion.img
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6 }}
    src={images.dentist1}
    alt="Dentist smiling"
    className="w-full lg:mt-10  h-[400px] object-cover rounded-2xl shadow-md"
  />
  <motion.img
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    src={images.dentist2}
    alt="Dentist with patient"
    className="w-full lg:mb-10 h-[400px] object-cover rounded-2xl shadow-md"
  />
</div>


        {/* Right Section - Text */}
        <div className="flex-1 md:text-left ">
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className=" text-blue-600 font-semibold text-sm sm:text-base mb-2"
          >
            About Us
          </motion.p>

          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className=" mb-4       text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1d42] leading-tight"
          >
            Professionals and <br className="hidden sm:block" />
            Personalized Dental <br className="hidden sm:block" /> Excellence
          </motion.h2>

          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className=" mb-6   text-gray-500 text-base sm:text-lg"
          >
            We offer high-quality dental care tailored for the whole family.
            From routine checkups to advanced treatments, our compassionate team
            ensures your smile stays healthy and confident.
          </motion.p>

          <motion.ul
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6"
          >
            <li className="flex items-center gap-2">
              <span className="text-blue-600 font-bold">✔</span>
              Personalized Treatment Plans
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600 font-bold">✔</span>
              Gentle Care for Kids and Adults
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600 font-bold">✔</span>
              State-of-the-Art Technology
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600 font-bold">✔</span>
              Flexible Appointment Scheduling
            </li>
          </motion.ul>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex justify-center md:justify-start"
          >
            <Link
              to="/#appointment"
              className="relative group hidden md:inline-block bg-blue-600 hover:bg-[#10244b] text-white px-6 py-3 rounded-lg font-semibold text-md overflow-hidden min-w-[160px] h-[44px] transition-colors duration-300 ease-in-out"
            >
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
                Book Appointment
              </span>
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                Book Appointment
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
