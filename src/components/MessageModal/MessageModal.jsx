import React, { useEffect, useRef } from "react";
import { X, Info, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const ICONS = {
  success: {
    icon: <CheckCircle className="text-green-500" size={36} />,
    title: "Success",
    textColor: "text-green-600",
    color:"green"
  },
  error: {
    icon: <AlertTriangle className="text-red-500" size={36} />,
    title: "Error",
    textColor: "text-red-600",
    color:"red"
  },
  info: {
    icon: <Info className="text-blue-500" size={36} />,
    title: "Information",
    textColor: "text-blue-600",
    color:"blue"
  },
};

const MessageModal = ({ type = "info", message = "", onClose }) => {
  const modalRef = useRef();
  const { icon, title, textColor,color } = ICONS[type] || ICONS.info;

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  // Auto close after 3 seconds
  useEffect(() => {
    const timeout = setTimeout(onClose, 3000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`bg-white w-full max-w-sm rounded-xl  shadow-xl px-6 py-5 relative`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-3">{icon}</div>

        {/* Title */}
        <h3 className={`text-lg font-semibold text-center ${textColor}`}>
          {title}
        </h3>

        {/* Message */}
        <p className="text-center text-sm text-gray-800 mt-2">{message}</p>

        {/* Optional Action Button */}
        <button
        onClick={onClose}
        className={`mt-8 w-full bg-${color}-500  text-white py-2 rounded-md`}>
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default MessageModal;
