import { Link, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { LiaToothSolid } from "react-icons/lia";
import { CiFaceSmile } from "react-icons/ci";
import { PiPersonArmsSpreadLight } from "react-icons/pi";
import { RiToothLine } from "react-icons/ri";
import { MdOutlineShield } from "react-icons/md";
import { LiaTeethSolid } from "react-icons/lia";
import logo from '../Navbar/Logo/WhiteLogo.png';


const services = [
  {
    id: "general-dentistry",
    title: "General Dentistry",
    description: "Our general dentistry services include routine exams, cleanings, and fillings, ensuring optimal oral health for every patient .",
    icon: <LiaToothSolid className="text-blue-500 text-5xl" />,
  },
  {
    id: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    description: "Cosmetic dentistry enhances your smile’s appearance with state-of-the-art treatments like veneers, professional whitening, and bonding.",
    icon: <CiFaceSmile className="text-blue-500 text-5xl" />,
  },
  {
    id: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    description: "We provide specialized dental care for children in a warm and friendly environment with fluoride treatments and sealants.",
    icon: <PiPersonArmsSpreadLight className="text-blue-500 text-5xl" />,
  },
  {
    id: "restorative-dentistry",
    title: "Restorative Dentistry",
    description: "Restore the function and aesthetics of your smile with crowns, bridges, dental implants, and more.",
    icon: <RiToothLine className="text-blue-500 text-5xl" />,
  },
  {
    id: "preventive-dentistry",
    title: "Preventive Dentistry",
    description: "Proactive care including cleanings, fluoride, and sealants to stop decay and gum disease before they start.",
    icon: <MdOutlineShield className="text-blue-500 text-5xl" />,
  },
  {
    id: "orthodontics",
    title: "Orthodontics",
    description: "Straighten your teeth and bite with modern braces or clear aligners tailored to your dental goals.",
    icon: <LiaTeethSolid className="text-blue-500 text-5xl" />,
  },
  
];

const Footer = () => {
  const navigate = useNavigate();

  // Handle smooth scroll navigation
  const handleLinkClick = (id) => {
    navigate("/services#"+id); // Navigate to the section in the services page
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-[#0c1d36] text-white py-12">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-36 h-9 text-white mb-5" />
          </div>
          <p className="text-gray-300 text-[15px] leading-relaxed ">
            At TrustDental, we’re dedicated to providing high-quality, personalized
            dental care for patients of all ages. Our skilled team uses the
            latest technology to ensure comfortable, efficient treatments and
            beautiful, healthy smiles for life.
          </p>
          <div className="flex items-center gap-4 mt-6 text-xl text-gray-400">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaWhatsapp className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaYoutube className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Company and Services in single row */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-row flex-wrap gap-10">
            {/* Company Links */}
            <div className="min-w-[150px]">
              <h4 className="text-white font-semibold text-xl mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300 text-[16px]">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/services" className="hover:text-white">Our Services</Link></li>
                <li><Link to="about#dentists" className="hover:text-white">Dentists</Link></li>
                <li><Link to="/events" className="hover:text-white">Events</Link></li>
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>

            {/* Our Services */}
            <div className="min-w-[150px]">
              <h4 className="text-white font-semibold text-xl mb-4">Our Services</h4>
              <ul className="space-y-2 text-gray-300 text-[16px]">
              {services.map((e)=>(
                 <li key={e.id}>
                  <button
                    onClick={() => handleLinkClick(e.id)}
                    className="hover:text-white"
                  >
                    {e.title}
                  </button>
                </li>
              ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-semibold text-xl mb-4">Contact Us</h4>
          <ul className="space-y-4 text-gray-300 text-[16px]">
            <li>
              <div className="flex items-start gap-2">
                <a
                  href="https://maps.app.goo.gl/qmG1HRLptUZtWfeC8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 hover:text-blue-300 transition-colors duration-200"
                >
                  <FaMapMarkerAlt className="text-blue-400 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Clinic Location</p>
                    100 S Main St, New York, NY
                  </div>
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-start gap-2">
                <FaPhoneAlt className="text-blue-400 mt-1" />
                <div>
                  <p className="font-semibold text-white">Call Us</p>
                  +1 123 456 789
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-start gap-2">
                <FaEnvelope className="text-blue-400 mt-1" />
                <div>
                  <p className="font-semibold text-white">Send a Message</p>
                  @trustdentalclinic
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t max-w-7xl mx-auto border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between lg:items-center text-[15px] text-gray-400 px-6">
        <p className="text-left md:text-center">
          Copyright 2025 – TrushDental by Indore Tech Valley 
        </p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link to="/termsConditions" className="hover:text-white">
            Terms & Conditions
          </Link>
          <Link to="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
