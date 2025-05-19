import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Added import for Link
import WhiteLogo from '../Navbar/Logo/logo-white.webp';
import BlackLogo from '../Navbar/Logo/logo-black.webp';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add or remove bg/shadow
      setScrolled(currentScrollY > 50);

      // Hide/show on scroll direction
      if (currentScrollY > lastScrollY) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Set the logo based on the scroll or mobile state
  const logo = scrolled || isMobile ? BlackLogo : WhiteLogo;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        scrolled || isMobile ? 'bg-white shadow-md' : 'bg-transparent'
      } ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-36 h-8 text-white" />
        </Link>

        {/* Desktop Nav */}
        <nav
          className={`${
            scrolled || isMobile ? 'bg-white text-black' : 'text-white bg-transparent'
          } hidden md:flex gap-8 text-md font-medium text-slate-800`}
        >
          <Link to="/" className="relative group">
            <span className="transition-colors duration-300">Home</span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/services" className="relative group">
            <span className="transition-colors duration-300 ">Services</span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/" className="relative group">
            <span className="transition-colors duration-300 ">Dentists</span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/events" className="relative group">
            <span className="transition-colors duration-300 ">Events</span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/about" className="relative group">
            <span className="transition-colors duration-300 ">About Us</span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <Link
            to="/#appointment"
            className="relative group hidden md:inline-block bg-blue-600 hover:bg-[#10244b] text-white px-6 py-3 rounded-lg font-semibold text-md overflow-hidden min-w-[160px] h-[44px] transition-colors duration-300 ease-in-out"
          >
            {/* Default Text */}
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
              Book Appointment
            </span>

            {/* Hover Text */}
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
              Book Appointment
            </span>
          </Link>

          <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pt-4 pb-6 shadow-lg transition-all duration-300">
          <Link to="/" className="block py-2">
            Home
          </Link>
          <Link to="/services" className="block py-2">
            Services
          </Link>
          <Link to="/dentists" className="block py-2">
            Dentists
          </Link>
          <Link to="/events" className="block py-2">
            Events
          </Link>
          <Link to="/about">About Us</Link>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 text-sm">
            Book Appointment
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
