import React from "react";
import { Mail, Clock } from "lucide-react";

import { Link } from "react-router-dom";

const Appointment = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:py-24 py-12">
      <div className="md:flex md:items-start md:gap-8 ">
        {/* Left: Form */}
        <div className="md:w-1/2 bg-white rounded-2xl p-6 shadow">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="text-blue-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Book Your Appointment
            </h2>
          </div>
          <p className="text-slate-500 mb-8 max-w-md">
            Book your appointment today for expert dental care tailored to your
            needs. Healthy, beautiful smiles start with a simple step, schedule
            now!
          </p>

          <form className="space-y-4">
            <select className="w-full border border-gray-300 rounded-md px-4 py-3">
              <option>Select Service</option>
              <option>Cleaning</option>
              <option>Root Canal</option>
            </select>

            <div className="flex gap-4">
              <input
                type="date"
                className="w-1/2 border border-gray-300 rounded-md px-4 py-3 "
                defaultValue={new Date().toISOString().split("T")[0]}
              />
              <select className="w-1/2 border border-gray-300 rounded-md px-4 py-3">
                <option>Select Time</option>
                <option>10:00 AM</option>
                <option>12:30 PM</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Name"
                className="flex-1 min-w-0 border border-gray-300 rounded-md px-4 py-3 "
              />
              <input
                type="email"
                placeholder="Email"
                className="flex-1 min-w-0 border border-gray-300 rounded-md px-4 py-3 "
              />
              <input
                type="tel"
                placeholder="Phone"
                className="flex-1 min-w-0 border border-gray-300 rounded-md px-4 py-3"
              />
            </div>

            <textarea
              rows="3"
              placeholder="Message"
              className="w-full border border-gray-300 rounded-md px-4 py-3 "
            ></textarea>

            <Link
              to="/appointment"
              className="relative group hidden md:inline-block bg-blue-600 hover:bg-[#10244b] text-white px-6 py-3 rounded-lg font-semibold text-md overflow-hidden min-w-[160px] h-[44px] transition-colors duration-300 ease-in-out"
            >
              {/* Default Text */}
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
                Send Appointment
              </span>

              {/* Hover Text */}
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                Send Appointment
              </span>
            </Link>
          </form>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 relative rounded-2xl overflow-hidden shadow">
          <img
            src="https://images.pexels.com/photos/6812548/pexels-photo-6812548.jpeg"
            alt="Dentist with kid"
            className="w-full object-cover rounded-2xl max-h-[480px]"
          />
          <div className="absolute bottom-6 left-6 bg-black/60 text-white rounded-xl px-6 py-4 flex items-center gap-4 backdrop-blur-sm shadow-lg">
            <Clock className="w-6 h-6 text-white" />
            <div>
              <p className="font-semibold text-white">Opening Hours</p>
              <p className="text-sm text-white/80">Mon to Sat 08:00 - 20:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
