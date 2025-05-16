import { Link } from 'lucide-react'
import React from 'react'


const ReadyToBook = () => {
  return (
    <div>
      <div className="bg-blue-600 py-10">
      <div className=" px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-white">
        {/* Left Text */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center md:text-left mb-4 md:mb-0">
          Ready to book your dental care session?
        </h2>

        {/* Right Button */}
         <button className="text-md mt-6 relative group text-white font-semibold px-6 py-3 rounded  shadow overflow-hidden h-[48px] min-w-[180px]">
              <span className="border rounded-lg bg-transparent absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
                Book Appointment
              </span>
              <span className="bg-[#001F5B] absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                Book Appointment
              </span>
            </button>
      </div>
    </div>
    </div>
  )
}

export default ReadyToBook
