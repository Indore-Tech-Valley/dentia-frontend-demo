import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.3,
      duration: 0.6,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const upcomingEventsData = [
  {
    id: 1,
    image:
      "https://dentalresourceasia.com/wp-content/uploads/2024/11/SIDC-2025_DRA.png",
    title: "Advanced Dental Conference 2025",
    description:
      "A gathering of leading dental professionals to explore innovations and future trends in dentistry.",
  },
  {
    id: 2,
    image:
      "https://yamuna.edu.in/wp-content/uploads/2022/12/WhatsApp-Image-2022-12-19-at-14.56.09-1024x766.jpg",
    title: "Free Dental Check-Up Camp",
    description:
      "Offering complimentary dental check-ups and oral care consultations to the local community.",
  },
  {
    id: 3,
    image:
      "https://i.ytimg.com/vi/hbRPYGDgl1c/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBNNtyWJHVdeiisSO6Wk3lDZWFvZg",
    title: "Digital Dentistry Workshop",
    description:
      "Hands-on workshop introducing digital tools and techniques revolutionizing modern dental practice.",
  },
];

const UpcomingEvents = () => {
  return (
    <motion.section
      className="max-w-7xl mx-auto px-6 py-12 lg:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.div className="mb-14" variants={cardVariants}>
        <h2 className="lg:text-center text-blue-600 font-bold text-md lg:text-lg sm:text-base mb-2 text-left">
          UPCOMING EVENTS
        </h2>
        <h3 className="mb-4 lg:text-center text-left text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1d42] leading-tight">
          Complete Care for Every Smile
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingEventsData.map((event) => (
          <motion.div
            key={event.id}
            className="bg-white rounded-xl shadow hover:shadow-md transition-shadow duration-300"
            variants={cardVariants}
          >
            <img
              src={event.image}
              alt={event.title}
              className="rounded-t-xl w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {event.title}
              </h3>
        <p className="text-gray-500 text-base sm:text-lg">
  {event.description}
</p>

            </div>
          </motion.div>
        ))}
      </div>

      <motion.div className="text-center mt-14" variants={cardVariants}>
        <Link
          to="/"
          className="relative group hidden md:inline-block bg-blue-600 hover:bg-[#10244b] text-white px-6 py-3 rounded-lg font-semibold text-md overflow-hidden min-w-[160px] h-[44px] transition-colors duration-300 ease-in-out"
        >
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
            View More
          </span>
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
            View More
          </span>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default UpcomingEvents;
