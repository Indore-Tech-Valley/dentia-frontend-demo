import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Define the services data
const services = [
  {
    id: "general-dentistry",
    title: "General Dentistry",
    desc: "Our general dentistry services include routine exams, cleanings, and fillings, ensuring optimal oral health for every patient. We focus on prevention and education, helping you maintain a healthy smile with regular checkups and personalized care plans.",
    image: "https://imk.storage.googleapis.com/file/AjsNfBtxHs3mSAYYn/file_why-is-general-dentistry-necessary-kokua-smiles.jpg",
  },
  {
    id: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    desc: "Cosmetic dentistry enhances your smile’s appearance with state-of-the-art treatments like veneers, professional whitening, and composite bonding. We tailor every procedure to suit your goals, creating a confident, radiant smile you’ll love to show off.",
    image: "https://lh5.googleusercontent.com/Anh42yGS6iolqml9drlUSA3Jdkm9IUjMPErAO8507kA7SYYtMPlnPUPefTaN9bvXfO12bPiVGBytkIk0K8hHyweb_XXnrR6xvfGa0mJFbeGpZAgXvx0iXMEpiCBKCykqzg2nnAnTqnBxWIzTLQ",
  },
  {
    id: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    desc: "We provide specialized dental care for children in a warm and friendly environment. Our pediatric services include preventive treatments, fluoride applications, sealants, and cavity care—focused on making every visit enjoyable and stress-free for kids and parents alike.",
    image: "https://www.innovativepediatricdentistry.com/wp-content/uploads/2018/07/pediatric-dental-advancements.jpg",
  },
  {
    id: "restorative-dentistry",
    title: "Restorative Dentistry",
    desc: "Restore the function and aesthetics of your smile with crowns, bridges, dental implants, and more. Our restorative dentistry services are tailored to help you regain comfort, confidence, and long-lasting dental health after damage or tooth loss.",
    image: "https://mcdonoughdentalstudio.com/sites/g/files/xejaxa416/files/2021-10/Inlay.jpg",
  },
  {
    id: "preventive-dentistry",
    title: "Preventive Dentistry",
    desc: "Stay ahead of dental problems with proactive care. Our preventive services include comprehensive exams, cleanings, fluoride treatments, and sealants designed to stop decay and gum disease before they start—keeping your teeth strong for life.",
    image: "https://khushidentalclinic.com/wp-content/uploads/2021/11/Preventive-Dentistry.jpg",
  },
  {
    id: "orthodontics",
    title: "Orthodontics",
    desc: "Achieve straighter teeth and a properly aligned bite with our modern orthodontic treatments. From traditional metal braces to clear aligners, we offer personalized solutions to improve your smile’s appearance and long-term dental function.",
    image: "https://healingclinicturkey.com/wp-content/uploads/2021/01/orthodontics-dentistry-e1611427779559-980x580.jpg",
  }
];

const Services = () => {
  const location = useLocation();

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
          {services.map((item, index) => (
            <div
              key={index}
              id={item.id}
              className={`flex flex-col lg:flex-row items-start gap-10 lg:pt-24 pt-16 ${
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
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
