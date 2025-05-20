import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';  // Feather up arrow icon
import { IoIosArrowDropup } from "react-icons/io";
import { MdKeyboardArrowUp } from "react-icons/md";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-9 md:bottom-6 right-6 z-50 p-2 rounded-full bg-blue-600 text-white shadow-lg transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } hover:bg-blue-800`}
      aria-label="Scroll to top"
    >
      <MdKeyboardArrowUp size={24} />
    </button>
  );
};

export default BackToTopButton;
