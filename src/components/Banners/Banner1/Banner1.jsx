import React from 'react';

const Banner1 = () => {
  return (
    <div className="lg:py-24 py-12 bg-gradient-to-r from-blue-50 to-white flex items-center">
      <div className="max-w-7xl mx-auto px-6 pt-20 lg:pt-2 pb-2 flex flex-col lg:flex-row justify-between w-full gap-5">

        {/* Left Text Content */}
        <div className="lg:w-[65%] space-y-4 lg:text-left">
          <h4 className="text-blue-600 font-semibold text-base lg:text-lg">
            Welcome to Dentia
          </h4>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
            Exceptional <span className="text-blue-500">Dental Care</span>
          </h1>
          <p className="text-gray-600 text-lg lg:pt-4 max-w-lg lg:mx-0">
            We offer high-quality dental care tailored for the whole family. From routine checkups to advanced treatments, our compassionate team ensures your smile stays healthy and confident.
          </p>

          <div className="flex flex-col sm:flex-row lg:items-center justify-start space-y-4 sm:space-y-0 sm:space-x-6 pt-6">
         <button className="relative group bg-blue-600 hover:bg-[#10244b] text-white font-semibold px-8 py-4 text-lg rounded-lg overflow-hidden transition-colors duration-300 ease-in-out min-w-[160px] h-[56px]">
  {/* Default Text */}
  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
    Get Started Now
  </span>

  {/* Hover Text */}
  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
    Get Started Now
  </span>
</button>


            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                {/* Sample Avatars */}
                <img src="https://madebydesignesia.com/themes/dentia/images/testimonial/1.webp" alt="Avatar 1" className="w-12 h-12 rounded-full border-2 border-white" />
                <img src="https://madebydesignesia.com/themes/dentia/images/testimonial/2.webp" alt="Avatar 2" className="w-12 h-12 rounded-full border-2 border-white" />
                <img src="https://madebydesignesia.com/themes/dentia/images/testimonial/3.webp" alt="Avatar 3" className="w-12 h-12 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="font-semibold text-lg">23k</p>
                <p className="text-sm text-gray-500">happy customers</p>
              </div>
                
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-[45%] flex justify-center mb-12 lg:mb-0">
          <img
            src="https://madebydesignesia.com/themes/dentia/images/misc/c2.webp"
            alt="Tooth with toothbrush"
            className="w-[400px] md:w-[520px] lg:w-[620px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner1;
