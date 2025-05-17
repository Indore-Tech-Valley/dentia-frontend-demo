import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
  { end: 10000, suffix: "+", label: "Happy Patients" },
  { end: 2500, suffix: "+", label: "Teeth Whitened" },
  { end: 800, suffix: "+", label: "Dental Implants" },
  { end: 15, suffix: "+", label: "Years of Experience" },
];

const States = () => {
  return (
    <div className="bg-[#000C67] py-12 lg:py-24 text-white    text-base sm:text-lg">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 px-6 gap-8 text-center   ">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <h2 className="text-3xl font-extrabold">
              <CountUp end={stat.end} duration={2} />{stat.suffix}
            </h2>
            <p className="mt-2 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default States;
