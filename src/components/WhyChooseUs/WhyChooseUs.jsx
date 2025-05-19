import React from "react";
import { motion } from "framer-motion";
import { FiUserCheck, FiCpu, FiSliders, FiUsers } from "react-icons/fi"; // ✅ Imported icons

const WhyChooseUs = () => {
  const images = [
    "https://madebydesignesia.com/themes/dentia/images/misc/s3.webp",
    "https://madebydesignesia.com/themes/dentia/images/misc/s2.webp",
    "https://madebydesignesia.com/themes/dentia/images/misc/p3.webp"
  ];

  return (
    <section className="bg-white py-12  px lg:py-24 ">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-6">
        <motion.div
          className="w-full lg:w-1/2 flex flex-col space-y-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <h4 className="text-blue-600 font-bold text-md lg:text-lg sm:text-base mb-2 text-left">WHY CHOOSE OUR DENTAL CARE</h4>
            <motion.h2
              className="mb-4     text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1d42] leading-tight"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Exceptional Service With a Personal Touch
            </motion.h2>
            <motion.p
              className="text-gray-500 text-base sm:text-lg"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Choosing the right dental provider matters. We combine expert care,
              advanced technology, and a warm atmosphere to ensure every visit is
              comfortable, efficient, and tailored to your unique needs.
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-6"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="flex items-center mb-4">
                <FiUserCheck className="text-blue-600 text-4xl" />
              </div>
              <h5 className="font-semibold text-lg text-gray-900 r">
                Experienced Dental
              </h5>
              <p className="text-gray-500 mt-1 r">
                Skilled care backed by years of trusted dental experience.
              </p>
            </div>
            <div>
              <div className="flex items-center  mb-4">
                <FiCpu className="text-blue-600 text-4xl" />
              </div>
              <h5 className="font-semibold text-lg text-gray-900 ">
                Advanced Technology
              </h5>
              <p className="text-gray-500 mt-1 ">
                Modern tools ensure accurate and efficient treatments.
              </p>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <FiSliders className="text-blue-600 text-4xl" />
              </div>
              <h5 className="font-semibold text-lg text-gray-900 ">
                Personalized Treatment
              </h5>
              <p className="text-gray-500 mt-1 ">
                Custom care plans made to fit your smile and lifestyle.
              </p>
            </div>
            <div>
              <div className="flex items-center  mb-4">
                <FiUsers className="text-blue-600 text-4xl" />
              </div>
              <h5 className="font-semibold text-lg text-gray-900 ">
                Family-Friendly
              </h5>
              <p className="text-gray-500 mt-1 ">
                Welcoming space for kids, teens, adults, and seniors.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 flex items-stretch"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full h-full">
            <div className="flex flex-col gap-4 h-full">
              <motion.img
                src={images[0]}
                alt="Dental care 1"
                className="rounded-lg shadow-md object-cover w-2/3 h-2/7 ml-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              />
              <motion.img
                src={images[1]}
                alt="Dental care 2"
                className="rounded-lg shadow-md object-cover w-full h-full"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
              />
            </div>
            <motion.div
              className="h-5/6 my-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <img
                src={images[2]}
                alt="Dental care 3"
                className="rounded-lg shadow-md object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
