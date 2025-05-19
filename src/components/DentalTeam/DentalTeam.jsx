import React from "react";
import { motion } from "framer-motion";

const doctors = [
  {
    name: "Dr. Sarah Bennett",
    title: "Lead Dentist",
    image: "https://madebydesignesia.com/themes/dentia/images/team/1.webp",
  },
  {
    name: "Dr. Maya Lin",
    title: "Cosmetic Dentist",
    image: "https://madebydesignesia.com/themes/dentia/images/team/2.webp",
  },
  {
    name: "Dr. Michael Reyes",
    title: "Pediatric Specialist",
    image: "https://madebydesignesia.com/themes/dentia/images/team/3.webp",
  },
  {
    name: "Dr. James Carter",
    title: "Dental Hygienist",
    image: "https://madebydesignesia.com/themes/dentia/images/team/4.webp",
  },
];

const DentalTeam = () => {
  return (
    <section className="bg-[#f3f6fd] py-12 lg:py-24 ">
      <div className="max-w-7xl mx-auto text-center px-6">
<motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className=" text-blue-600 font-bold text-md lg:text-lg sm:text-base mb-2 lg:text-center text-left"
          >
            MEET OUR DENTAL TEAM
          </motion.p>

        <motion.h2
          className=" mb-4 lg:text-center text-left     text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1d42] leading-tight "
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Committed to Your Smile
        </motion.h2>

        <motion.p
          className=" mb-12 lg:text-center text-left      text-gray-500 text-base sm:text-lg "
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our experienced dental team is here to make every visit positive and personalized.<br />
          With gentle hands and caring hearts.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4  gap-8">
          {doctors.map((doctor, index) => (
            <motion.div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-md group w-full h-full mx-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 * index }} // Stagger the animation
              viewport={{ once: true }}
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-2xl shadow text-center w-[90%]">
                <h3 className="text-base font-semibold text-blue-900">{doctor.name}</h3>
                <p className="text-sm text-gray-500">{doctor.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DentalTeam;
