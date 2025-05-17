
import React from "react";
import { Link } from "react-router-dom";


const UpcomingEvents = () => {
  const upcomingEventsData = [
    {
      id: 1,
      image:
        "https://dentalresourceasia.com/wp-content/uploads/2024/11/SIDC-2025_DRA.png", // Replace with actual image
      title: "Advanced Dental Conference 2025",
      description:
        "A gathering of leading dental professionals to explore innovations and future trends in dentistry.",
    },
    {
      id: 2,
      image:
        "https://yamuna.edu.in/wp-content/uploads/2022/12/WhatsApp-Image-2022-12-19-at-14.56.09-1024x766.jpg", // Replace with actual image
      title: "Free Dental Check-Up Camp",
      description:
        "Offering complimentary dental check-ups and oral care consultations to the local community.",
    },
    {
      id: 3,
      image:
        "https://i.ytimg.com/vi/hbRPYGDgl1c/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBNNtyWJHVdeiisSO6Wk3lDZWFvZg", // Replace with actual image
      title: "Digital Dentistry Workshop",
      description:
        "Hands-on workshop introducing digital tools and techniques revolutionizing modern dental practice.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
      <div className="mb-14">
       <h2 className="mb-2 lg:text-center text-left   text-blue-600 font-semibold text-sm sm:text-base">Upcoming Events</h2>
        <h3 className=" mb-4 lg:text-center text-left  text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1d42] leading-tight">Complete Care for Every Smile</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingEventsData.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl shadow hover:shadow-md transition-shadow duration-300"
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
              <p className="text-sm text-slate-600">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-14">
      <Link
    to="/"  // change this to your target route
    className="relative group hidden md:inline-block bg-blue-600 hover:bg-[#10244b] text-white px-6 py-3 rounded-lg font-semibold text-md overflow-hidden min-w-[160px] h-[44px] transition-colors duration-300 ease-in-out"
  >
    {/* Default Text */}
    <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
      View More
    </span>

    {/* Hover Text */}
    <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
      View More
    </span>
  </Link>
  </div>
    </section>
  );
};

export default UpcomingEvents;
