import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { LiaToothSolid } from "react-icons/lia";
import { CiFaceSmile } from "react-icons/ci";
import { PiPersonArmsSpreadLight } from "react-icons/pi";
import { RiToothLine } from "react-icons/ri";
import { MdOutlineShield } from "react-icons/md";
import { LiaTeethSolid } from "react-icons/lia";
import { motion } from "framer-motion";

const services = [
  {
    id: "general-dentistry",
    title: "General Dentistry",
    description: "Our general dentistry services include routine exams, cleanings, and fillings, ensuring optimal oral health for every patient.",
    icon: <LiaToothSolid className="text-blue-500 text-5xl" />,
  },
  {
    id: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    description: "Cosmetic dentistry enhances your smile’s appearance with state-of-the-art treatments like veneers, professional whitening, and bonding.",
    icon: <CiFaceSmile className="text-blue-500 text-5xl" />,
  },
  {
    id: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    description: "We provide specialized dental care for children in a warm and friendly environment with fluoride treatments and sealants.",
    icon: <PiPersonArmsSpreadLight className="text-blue-500 text-5xl" />,
  },
  {
    id: "restorative-dentistry",
    title: "Restorative Dentistry",
    description: "Restore the function and aesthetics of your smile with crowns, bridges, dental implants, and more.",
    icon: <RiToothLine className="text-blue-500 text-5xl" />,
  },
  {
    id: "preventive-dentistry",
    title: "Preventive Dentistry",
    description: "Proactive care including cleanings, fluoride, and sealants to stop decay and gum disease before they start.",
    icon: <MdOutlineShield className="text-blue-500 text-5xl" />,
  },
  {
    id: "orthodontics",
    title: "Orthodontics",
    description: "Straighten your teeth and bite with modern braces or clear aligners tailored to your dental goals.",
    icon: <LiaTeethSolid className="text-blue-500 text-5xl" />,
  },
];

export default function OurServices() {
  const [clicked, setClicked] = useState(null);
  const [animating, setAnimating] = useState(false);

  const handleReadMoreClick = (id) => {
    setAnimating(true);
    setClicked(id);

    // Navigate after the animation completes
    setTimeout(() => {
      setAnimating(false);
      window.location.href = `/services#${id}`;  // Perform navigation after animation
    }, 500);  // Adjust the timing based on your animation duration
  };

  return (
    <section className="bg-blue-50 lg:py-24 py-12">
      <div className="text-center mb-14 px-6 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="lg:text-center text-blue-600 font-bold text-md lg:text-lg sm:text-base mb-2 text-left"
        >
          OUR SERVICES
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-4 lg:text-center text-left text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1d42] leading-tight"
        >
          Complete Care for Every Smile
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-500 max-w-xl lg:mx-auto text-lg lg:text-center text-left"
        >
          From routine cleanings to advanced restorations, we provide personalized dental solutions for patients of all ages.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
        {services.slice(0, 4).map((service, index) => (
          <motion.div
            key={service.id}
            className="bg-white rounded-2xl p-8 shadow hover:shadow-lg transition duration-300 flex flex-col h-[420px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.4,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          >
            <div className="flex-grow">
              {service.icon}
              <motion.h4
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                viewport={{ once: true }}
                className="font-semibold text-xl mt-6 mb-3"
              >
                {service.title}
              </motion.h4>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                viewport={{ once: true }}
                className="leading-relaxed text-gray-500 text-base sm:text-lg"
              >
                {service.description}
              </motion.p>
            </div>

            {/* Button with smooth animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1 }}
              viewport={{ once: true }}
              className="mt-auto pt-6"
            >
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleReadMoreClick(service.id);
                }}
                className={`group relative flex items-center border border-slate-300 rounded-full bg-white text-blue-900 overflow-hidden transition-all duration-300 pl-4 pr-4 h-12 ${
                  animating ? "w-40" : "w-12"
                }`}
              >
                <FaPlus className="text-blue-900 z-10" />
                <span
                  className={`absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-semibold ${
                    animating ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Read more
                </span>
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* View All Services Button */}
      <div className="text-center mt-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            to="/services"
            className="relative group hidden md:inline-block bg-blue-600 hover:bg-[#10244b] text-white px-6 py-3 rounded-lg font-semibold text-md overflow-hidden min-w-[160px] h-[44px] transition-colors duration-300 ease-in-out"
          >
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
              View All Services
            </span>
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
              View All Services
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
