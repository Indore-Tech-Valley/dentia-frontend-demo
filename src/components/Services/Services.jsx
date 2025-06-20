import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { fetchServices } from "../../redux/features/servicesSlice/servicesSlice";

const Services = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { services, loading } = useSelector((state) => state.service);

  useEffect(() => {
  dispatch(fetchServices());
}, [dispatch]);

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      // Wait until DOM has rendered
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100); // Slight delay to ensure layout is painted
    }
  }, [location]);

  return (
    <div className="py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="lg:text-center text-blue-600 font-bold text-md lg:text-lg sm:text-base mb-2 text-left">
          SERVICES
        </h2>
       <h3 className="mb-4 lg:text-center text-left text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1d42] leading-tight">
  Complete Dental Solutions Tailored to You
</h3>


        <div>
          {
          loading ? (
  <p className="text-center text-gray-500">Loading services...</p>
) : (
          services.map((item, index) => (
            <div
              key={index}
              id={item.id}
              className={`flex flex-col lg:flex-row items-start gap-10 lg:pt-24 pt-20 ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="lg:w-1/2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-60 object-cover rounded-2xl shadow-md"
                />
              </div>
              <div className="lg:w-1/2 text-left flex flex-col justify-start">
                <h3 className="text-2xl lg:text-3xl font-semibold text-blue-600 mb-4">
                {/* <h3 className="lg:text-3xl mb-4 font-semibold text-lg text-gray-900"> */}
                  {item.title}
                </h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))
        ) 
          }
        </div>
      </div>
    </div>
  );
};

export default Services;
