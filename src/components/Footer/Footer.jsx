import { Link } from "react-router-dom";
import {FaFacebookF,FaTwitter,FaWhatsapp,FaInstagram,FaYoutube,FaMapMarkerAlt,FaPhoneAlt,FaEnvelope} from "react-icons/fa";
import logo from '../Navbar/Logo/logo-white.webp';


const Footer = () => {
  return (
    <footer className="bg-[#0c1d36] text-white py-12">
      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-6">
        {/* Logo & Description */}
        <div>
           <div className="flex items-center gap-2">
                    <img src={logo} alt="logo" className="w-36 h-8 text-white mb-5"  />
                  </div>
          <p className="text-gray-300 text-[15px] leading-relaxed ">
            At Dentia, we’re dedicated to providing high-quality, personalized
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

        {/* Company Links */}
        <div>
          <h4 className="text-white font-semibold text-xl mb-4">Company</h4>
          <ul className="space-y-2 text-gray-300 text-[16px]">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white">
                Our Services
              </Link>
            </li>
            <li>
              <Link to="/dentists" className="hover:text-white">
                Dentists
              </Link>
            </li>
             <li>
              <Link to="/events" className="hover:text-white">
                Events
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
           
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold text-xl mb-4">
            Our Services
          </h4>
          <ul className="space-y-2 text-gray-300 text-[16px]">
            <li>General Dentistry</li>
            <li>Cosmetic Dentistry</li>
            <li>Pediatric Dentistry</li>
            <li>Restorative Dentistry</li>
            <li>Preventive Dentistry</li>
            <li>Orthodontics</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-semibold text-xl mb-4">Contact Us</h4>
          <ul className="space-y-4 text-gray-300 text-[16px]">
            <li>
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-blue-400 mt-1" />
                <div>
                  <p className="font-semibold text-white">Clinic Location</p>
                  100 S Main St, New York, NY
                </div>
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
                  contact@dentiacare.com
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t max-w-7xl mx-auto border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between lg:items-center text-[15px] text-gray-400 px-6">
        <p className="text-left md:text-center">Copyright 2025 – Dentia by Designesia</p>
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
