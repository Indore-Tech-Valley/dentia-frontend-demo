import React from 'react'
import { Phone, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const fadeLeft = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const ContactInfo = () => {
  return (
    <div className="w-full bg-[#020968] text-white">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-col lg:flex-row justify-around">
        
        <motion.div {...fadeLeft}>
          <div className="flex items-center space-x-4">
            <Phone className="text-blue-400 w-10 h-10" />
            <div>
              <p className="text-lg font-semibold">Need Dental Services?</p>
              <p className="text-gray-300">Call: +1 123 456 789</p>
            </div>
          </div>
        </motion.div>

        <div className="w-px h-16 bg-gray-300 opacity-30 my-4 lg:my-0"></div>

        <motion.div {...fadeLeft} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="flex items-center space-x-4">
            <Clock className="text-blue-400 w-10 h-10" />
            <div>
              <p className="text-lg font-semibold">Opening Hours</p>
              <p className="text-gray-300">Mon to Sat 08:00 - 20:00</p>
            </div>
          </div>
        </motion.div>

        <div className="w-px h-16 bg-gray-300 opacity-30 my-4 lg:my-0"></div>

        <motion.div {...fadeLeft} transition={{ duration: 0.8, delay: 0.4 }}>
          <div className="flex items-center space-x-4">
            <MapPin className="text-blue-400 w-10 h-10" />
            <div>
              <p className="text-lg font-semibold">Our Location</p>
              <p className="text-gray-300">123 Smile Street, New York, NY 10001</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default ContactInfo
