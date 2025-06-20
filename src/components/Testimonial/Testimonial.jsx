import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaQuoteLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestimonials } from "../../redux/features/testimonialSlice/testimonialSlice";

const Testimonial = () => {
  const dispatch = useDispatch();
  const { testimonials, loading } = useSelector((state) => state.testimonial);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  const skeletons = Array.from({ length: 3 });

  return (
    <div className="bg-blue-50 py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h4 className="text-sm text-left lg:text-center text-blue-600 font-bold mb-2">
          TESTIMONIALS
        </h4>
        <h2 className="my-4 text-3xl text-left lg:text-center sm:text-4xl lg:text-5xl font-bold text-[#0a1d42] leading-tight">
          Our Happy Customers
        </h2>
        <p className="max-w-2xl mx-auto text-gray-500 text-base sm:text-lg text-left lg:text-center">
          Join thousands of happy patients who trust us for gentle, expert care
          and beautiful smiles. Your perfect dental experience starts here!
        </p>

        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          className="mt-10"
        >
          {loading
            ? skeletons.map((_, i) => (
                <SwiperSlide key={i}>
                  <div className="bg-white p-12 rounded-2xl shadow-md h-full flex flex-col justify-between animate-pulse min-h-[320px]">
                    <div className="bg-blue-100 rounded-full w-8 h-8 mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
                    <div className="flex items-center space-x-4 mt-auto">
                      <div className="w-12 h-12 bg-gray-300 rounded-full" />
                      <div className="flex flex-col space-y-2">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        <div className="h-3 w-16 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : testimonials.map((item, index) => (
                <SwiperSlide key={item._id || index}>
                  <div className="bg-white p-12 rounded-2xl shadow-md text-left h-full flex flex-col justify-between min-h-[320px] relative">
                    <FaQuoteLeft className="text-blue-500 text-2xl mb-4" />
                    <p className="text-gray-600 mb-6">&ldquo;{item.message}&rdquo;</p>
                    <div className="flex items-center space-x-4 mt-auto">
                      <img
                        src={item.image || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                        alt={item.name}
                        className="w-12 h-12 rounded-full border-2 border-blue-500"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">Customer</p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-blue-50 to-white"></div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
