import React from 'react'
import { Link } from 'react-router-dom'



const ReadyToBook = () => {
  return (
    <div>
      <div className="bg-blue-950 py-10">
      <div className=" px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-white">
        {/* Left Text */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center md:text-left mb-4 md:mb-0">
          Ready to book your dental care session?
        </h2>

        {/* Right Button */}
        <Link
          to="/#appointment"
          className="text-md mt-6 relative group text-white font-semibold px-6 py-3 rounded shadow overflow-hidden h-[48px] min-w-[180px] inline-flex items-center justify-center no-underline"
          style={{ textDecoration: 'none' }}
        >
          {/* Outer layer with border + top text */}
          <span className="border border-white rounded-lg absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:border-transparent group-hover:bg-blue-700">
            {/* Text that slides up AND fades out */}
            <span className="transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
              Book Appointment
            </span>
          </span>
        
          {/* Second text fading + sliding in from below */}
          <span className="rounded-lg absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100">
            Book Appointment
          </span>
        </Link>
      </div>
    </div>
    </div>
  )
}

export default ReadyToBook
