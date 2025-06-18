import { useEffect, useState } from 'react';
import {
  MdKeyboardArrowUp,
  MdWhatsapp,
  MdPhone,
  MdMenu,
  MdClose,
} from 'react-icons/md';
import { FaRobot } from 'react-icons/fa';

const FloatingActionButtons = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative flex flex-col items-end">
        {/* Slide-Out Buttons */}
        <div
          className={`flex flex-col right-1  gap-3 absolute bottom-full mb-4 right-0 transition-all duration-500 ease-in-out ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-green-500 text-white shadow-md hover:bg-green-600 transition"
            aria-label="Chat on WhatsApp"
          >
            <MdWhatsapp size={24} />
          </a>

          <a
            href="tel:+919999999999"
            className="p-3 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition"
            aria-label="Call us"
          >
            <MdPhone size={24} />
          </a>

          <button
            onClick={() => alert('Chatbot clicked')}
            className="p-3 rounded-full bg-indigo-500 text-white shadow-md hover:bg-indigo-600 transition"
            aria-label="Chatbot"
          >
            <FaRobot size={22} />
          </button>

          {isVisible && (
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-gray-800 text-white shadow-md hover:bg-black transition"
              aria-label="Scroll to top"
            >
              <MdKeyboardArrowUp size={24} />
            </button>
          )}
        </div>

        {/* Main FAB Toggle */}
        <button
          onClick={toggleMenu}
          className="p-4 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-800 transition-all duration-300"
          aria-label="Toggle action menu"
        >
          {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>
    </div>
  );
};

export default FloatingActionButtons;
