import React,{useEffect,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { LiaToothSolid } from "react-icons/lia";
import { CiFaceSmile } from "react-icons/ci";
import { PiPersonArmsSpreadLight } from "react-icons/pi";
import { RiToothLine } from "react-icons/ri";
import { MdOutlineShield } from "react-icons/md";
import { LiaTeethSolid } from "react-icons/lia";
import { motion } from "framer-motion";
import { useSelector,useDispatch } from "react-redux";
import { fetchServices } from "../../redux/features/servicesSlice/servicesSlice";

const OurServices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services,loading,error } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleReadMoreClick = (id) => {
    navigate(`/services#${id}`);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
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
  {services.slice(0, 4).map((service) => (
    <motion.div
      key={service.id}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-[450px]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      viewport={{ once: true }}
    >
      {/* Service Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Service Content */}
      <div className="flex-grow p-6 flex flex-col justify-between">
        <div>
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="font-bold text-xl text-blue-900 mb-2"
          >
            {service.title}
          </motion.h4>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="text-gray-600 text-sm line-clamp-4"
          >
            {service.description}
          </motion.p>
        </div>

        {/* Read More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="pt-4"
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              handleReadMoreClick(service.id);
            }}
            className="group relative flex items-center border border-blue-200 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-900 overflow-hidden transition-all duration-300 ease-in-out pl-4 pr-4 h-11 w-12 hover:w-40"
          >
            <FaPlus className="text-blue-800 z-10" />
            <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out whitespace-nowrap font-semibold">
              Read more
            </span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  ))}
</div>


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
};

export default OurServices;
