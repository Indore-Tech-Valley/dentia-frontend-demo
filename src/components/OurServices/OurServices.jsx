import { FaTooth, FaSmile, FaChild,  } from 'react-icons/fa'; // ✅ Only real icons
import { CiCirclePlus } from "react-icons/ci";
import { LiaToothSolid } from "react-icons/lia";
import { CiFaceSmile } from "react-icons/ci";
import { PiPersonArmsSpreadLight } from "react-icons/pi";
import { RiToothLine } from "react-icons/ri";
import { Plus } from 'lucide-react'; // Make sure lucide-react is installed
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa"; // Optional for + ico




const services = [
  {
    icon: <LiaToothSolid  className="text-blue-500 text-5xl " />,
    title: 'General Dentistry',
    description: 'Complete oral care for every smile with cleanings, exams, and more.',
  },
  {
    icon: <CiFaceSmile className="text-blue-500 text-5xl" />,
    title: 'Cosmetic Dentistry',
    description: 'Enhance your smile’s beauty with whitening, veneers, and more.',
  },
  {
    icon: <PiPersonArmsSpreadLight className="text-blue-500 text-5xl" />,
    title: 'Pediatric Dentistry',
    description: 'Gentle and fun dental care for kids to grow healthy, happy smiles.',
  },
  {
    icon: <RiToothLine className="text-blue-500 text-5xl" />,
    title: 'Restorative Dentistry',
    description: 'Repair and restore your teeth for lasting comfort and function.',
  },
];


export default function OurServices () {
  return (
    <section className="bg-blue-50 lg:py-24 py-12">
      <div className="text-center mb-14 px-6 mx-auto">
        <h2 className=" uppercase lg:text-center text-left   text-blue-600 font-semibold text-sm sm:text-base mb-2">Our Services</h2>
        <h3 className=" mb-4 lg:text-center text-left    text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1d42] leading-tight">Complete Care for Every Smile</h3>
        <p className="text-gray-500 max-w-xl lg:mx-auto text-lg lg:text-center text-left">
          From routine cleanings to advanced restorations, we provide personalized dental solutions for patients of all ages.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6 ">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-8 shadow hover:shadow-lg transition duration-300 flex flex-col  min-h-[360px] "
          >
            {service.icon}
            <h4 className="font-semibold text-xl mt-6 mb-3 ">{service.title}</h4>
            <p className=" leading-relaxed  text-gray-500 text-base sm:text-lg">{service.description}</p>
             <button className="mt-10 group relative flex items-center border border-slate-300 rounded-full bg-white text-blue-900 overflow-hidden transition-all duration-300 pl-4 pr-4 h-12 w-12 hover:w-40">
      <FaPlus className="text-blue-900 z-10" />
      <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-semibold">
        Read more
      </span>
    </button>

          </div>
        ))}
      </div>

      <div className="text-center mt-14">
        <button className="relative group hidden md:inline-block bg-blue-600 hover:bg-[#10244b] text-white px-6 py-3 rounded-lg font-semibold text-md overflow-hidden min-w-[160px] h-[44px] transition-colors duration-300 ease-in-out">
  {/* Default Text */}
  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
    View All Services
  </span>

  {/* Hover Text */}
  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
   View All Services
  </span>
</button>
      </div>
    </section>
  );
}
