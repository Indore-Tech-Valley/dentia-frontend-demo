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

// const pastEventsData = [
//   {
//     id: 1,
//     image:
//       "https://cdn-az.allevents.in/events7/banners/e2b0582fea6103252e87c131f5b1b3a919c8102c962f57e4b9332a091b442ca4-rimg-w819-h546-dcd5d3d8-gmir.jpg?v=1730761623",
//     title: "Smile Makeover Seminar",
//     description:
//       "An in-depth session on cosmetic dentistry techniques for enhancing smiles using modern procedures.",
//   },
//   {
//     id: 2,
//     image:
//       "https://web.inmobicdn.net/website/website/6.0.1/ui/uploads/resources/case-study/LP_Header_Image_1.jpg",
//     title: "Oral Hygiene Awareness Drive",
//     description:
//       "Community outreach program promoting proper brushing techniques and preventive dental care habits.",
//   },
//   {
//     id: 3,
//     image:
//       "https://www.sproutpediatricdentistry.com/wp-content/uploads/2024/02/01-Learn-if-Dental-Sedation-1.jpg",
//     title: "Pediatric Dental Camp",
//     description:
//       "Specialized event for children's dental check-ups, education, and introducing friendly dental care.",
//   },
// ];

const PastEvents = ({pastEventsData}) => {
  return (
    <motion.div
      className="w-full bg-blue-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
        <motion.div className="mb-14" variants={cardVariants}>
          <h2 className="lg:text-center text-blue-600 font-bold text-md lg:text-lg sm:text-base mb-2 text-left">
            PAST EVENTS
          </h2>
          <h3 className="mb-4 lg:text-center text-left text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1d42] leading-tight">
            Complete Care for Every Smile
          </h3>
        </motion.div>

        {pastEventsData?.length === 0 && (
          <motion.div
            className="text-center text-gray-500 text-lg"
            // variants={cardVariants}
          >
            No past events available at the moment. Please check back later!
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastEventsData?.map((event) => (
            <motion.div
              key={event._id}
              className="bg-white rounded-xl shadow hover:shadow-md transition-shadow duration-300"
              // variants={cardVariants}
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

        {/* <motion.div className="text-center mt-14" variants={cardVariants}>
          <Link
            to="/events/past"
            className="relative group hidden md:inline-block bg-blue-600 hover:bg-[#10244b] text-white px-6 py-3 rounded-lg font-semibold text-md overflow-hidden min-w-[160px] h-[44px] transition-colors duration-300 ease-in-out"
          >
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
              View More
            </span>
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
              View More
            </span>
          </Link>
        </motion.div> */}
      </section>
    </motion.div>
  );
};

export default PastEvents;
