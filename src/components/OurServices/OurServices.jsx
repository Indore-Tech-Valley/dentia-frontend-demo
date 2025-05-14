import { FaTooth, FaSmile, FaChild,  } from 'react-icons/fa'; // ✅ Only real icons
import { CiCirclePlus } from "react-icons/ci";
import { LiaToothSolid } from "react-icons/lia";
import { CiFaceSmile } from "react-icons/ci";
import { PiPersonArmsSpreadLight } from "react-icons/pi";
import { RiToothLine } from "react-icons/ri";
import { Plus } from 'lucide-react'; // Make sure lucide-react is installed
import { Link } from 'react-router-dom';



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
        <h2 className="text-3xl text-blue-600 font-semibold mb-2 uppercase lg:text-center text-left">Our Services</h2>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 lg:text-center text-left">Complete Care for Every Smile</h3>
        <p className="text-gray-500 max-w-xl mx-auto text-lg lg:text-center text-left">
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
            <p className="text-gray-500 text-base  leading-relaxed">{service.description}</p>
            <Link to="/" className="group relative inline-flex items-center">
  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center transition-all duration-300 group-hover:w-32 group-hover:rounded-lg">
    <span className="text-2xl transition-opacity duration-200 group-hover:opacity-0">+</span>
    <span className="absolute opacity-0 group-hover:opacity-100 text-sm transition-opacity duration-300 ml-14 whitespace-nowrap">
      Read more
    </span>
  </div>
</Link>

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
