import React from "react";
import { FaRegEnvelopeOpen } from "react-icons/fa";

const JoinUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 ">
      <div className="flex flex-col md:flex-row items-stretch gap-10">
        {/* Left Section - Form */}
        <div className="md:w-1/2 flex flex-col justify-center bg-white p-8 rounded-lg shadow-lg">
          <div className="flex justify-center md:justify-start items-center gap-2 mb-4">
            <FaRegEnvelopeOpen className="text-blue-600 text-xl" />
            <h2 className="text-3xl font-semibold text-blue-600">Join Us</h2>
          </div>
          <p className="text-slate-600 mb-6">
            Get notified about future events and free dental camps.
          </p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Notify Me
            </button>
          </form>
        </div>

        {/* Right Section - Image */}
        <div className="md:w-1/2 rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://t3plus.in/wp-content/uploads/2024/01/dr.jpg"
            alt="Dental Camp"
            className="w-full h-full object-cover"
            style={{ minHeight: '100%' }}
          />
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
