import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Bryan G.",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "From the moment I walked in, I felt at ease. The staff made me feel like family, and the care I received was exceptional. I’m so happy with my smile—thank you for everything!",
  },
  
  {
    name: "Robert L.",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
    quote:
      "My family and I have been coming here for years. The service is exceptional, and the team always goes the extra mile to make sure we’re happy and well taken care of.",
  },
   {
    name: "Robert L.",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
    quote:
      "My family and I have been coming here for years. The service is exceptional, and the team always goes the extra mile to make sure we’re happy and well taken care of.",
  },
   {
    name: "Bryan G.",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "From the moment I walked in, I felt at ease. The staff made me feel like family, and the care I received was exceptional. I’m so happy with my smile—thank you for everything!",
  },

  {
    name: "Robert L.",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
    quote:
      "My family and I have been coming here for years. The service is exceptional, and the team always goes the extra mile to make sure we’re happy and well taken care of.",
  },
   {
    name: "Robert L.",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
    quote:
      "My family and I have been coming here for years. The service is exceptional, and the team always goes the extra mile to make sure we’re happy and well taken care of.",
  },
];

const Testimonial = () => {
  return (
    <div className="bg-blue-50 py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 text-center ">
        <h4 className="text-blue-600 font-semibold text-sm sm:text-base">Testimonials</h4>
        <h2 className="  my-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1d42] leading-tight">
          Our Happy Customers
        </h2>
        <p className=" max-w-2xl mx-auto text-gray-500 text-base sm:text-lg">
          Join thousands of happy patients who trust us for gentle, expert care and beautiful smiles. Your perfect dental experience starts here!
        </p>

        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          className="mt-10"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-12 rounded-2xl shadow-md text-left h-full flex flex-col justify-between min-h-[320px] relative">
                <FaQuoteLeft className="text-blue-500 text-2xl mb-4" />
                <p className="text-gray-600 mb-6">&ldquo;{item.quote}&rdquo;</p>
                <div className="flex items-center space-x-4 mt-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full border-2 border-blue-500"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-blue-50 to-white"></div> {/* Gradient bottom effect */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
