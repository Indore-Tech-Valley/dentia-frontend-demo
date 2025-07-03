import React,{useState,useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaBox,
  FaTachometerAlt,
  FaTags,
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaCog,
  FaSignOutAlt,
  FaQuestionCircle ,

} from 'react-icons/fa';
import { MdFeedback,MdMedicalServices , MdEmojiEvents } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { TbQuotes,TbLayoutDashboardFilled  } from "react-icons/tb";
import { CgWebsite } from "react-icons/cg";
import { FaLandMineOn } from "react-icons/fa6";
import Cookies from 'js-cookie'; // Assuming you are using js-cookie to manage cookies  



// Sidebar Components
const SidebarItem = ({ icon: Icon, label, to, activeRoute, setActiveRoute }) => {
  const navigate = useNavigate();
  
  // Check if current route matches this item
  const isActive = activeRoute === to || location.pathname === to;

  const handleClick = () => {
    navigate(to);
    if (setActiveRoute) {
      setActiveRoute(to);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out group ${
        isActive
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 transform scale-[0.98]'
          : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600 hover:transform hover:scale-[0.98]'
      }`}
    >
      <Icon className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
      {label}
    </button>
  );
};

// AdminSidebar Component
const AdminSidebar = ({ isOpen, activeRoute, setActiveRoute }) => {
  const navigate = useNavigate();
   const [isOnline, setIsOnline] = useState(navigator.onLine);
  //  console.log(isOnline)

     useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  });

  const handleLogout = () => {
     Cookies.remove('authToken'); // Assuming you are using js-cookie to manage cookies
     navigate('/admin');
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white shadow-xl border-r border-gray-200 transition-all duration-300 ease-in-out z-40 ${
        isOpen ? 'w-64' : 'w-16'
      } flex flex-col`}
      style={{ fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center">
          <div className={`w-10 h-10  bg-gradient-to-br from-blue-500 to-purple-600  ${isOpen? `rounded-xl p-0`:`rounded-full p-2 -ml-2`} flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200`}>
            <FaUserMd className="w-5 h-5 text-white" />
          </div>
          {isOpen && (
            <div className="ml-3 opacity-0 animate-fade-in" style={{ animation: 'fadeIn 0.3s ease-in-out forwards' }}>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ClinicAdmin
              </h1>
              <p className="text-xs text-gray-500 font-medium">Management System</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      {isOpen && (
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          <SidebarItem
            icon={TbLayoutDashboardFilled }
            label="Dashboard"
            to="/admin/dashboard"
            activeRoute={activeRoute}
            setActiveRoute={setActiveRoute}
          />

          <SidebarItem
            icon={FaUsers}
            label="Patients"
            to="/admin/patients"
            activeRoute={activeRoute}
            setActiveRoute={setActiveRoute}
          />

          <SidebarItem
            icon={FaUserMd}
            label="Doctors"
            to="/admin/doctors"
            activeRoute={activeRoute}
            setActiveRoute={setActiveRoute}
          />

                    <SidebarItem
            icon={MdMedicalServices }
            label="Services"
            to="/admin/services"
            activeRoute={activeRoute}
            setActiveRoute={setActiveRoute}
          />

                    <SidebarItem
            icon={MdEmojiEvents }
            label="Events"
            to="/admin/events"
            activeRoute={activeRoute}
            setActiveRoute={setActiveRoute}
          />

          <SidebarItem
            icon={FaCalendarCheck}
            label="Appointments"
            to="/admin/appointments"
            activeRoute={activeRoute}
            setActiveRoute={setActiveRoute}
          />

          <SidebarItem
            icon={BiSupport}
            label="ContactUs"
            to="/admin/contact"
            activeRoute={activeRoute}
            setActiveRoute={setActiveRoute}
          />

          <SidebarItem
            icon={MdFeedback}
            label="Feedback"
            to="/admin/feedback"
            activeRoute={activeRoute}
            setActiveRoute={setActiveRoute}
          />

            <SidebarItem
            icon={FaQuestionCircle }
            label="Faqs"
            to="/admin/faqs"
            activeRoute={activeRoute}
            setActiveRoute={setActiveRoute}
          />

            <SidebarItem
            icon={TbQuotes }
            label="Testimonials"
            to="/admin/testimonial"
            activeRoute={activeRoute}
            setActiveRoute={setActiveRoute}
          />

                  <SidebarItem
            icon={CgWebsite }
            label="Website Details"
            to="/admin/website"
            activeRoute={activeRoute}
            setActiveRoute={setActiveRoute}
          />

            <SidebarItem
            icon={FaLandMineOn }
            label="Newsletter"
            to="/admin/newsletter"
            activeRoute={activeRoute}
            setActiveRoute={setActiveRoute}
          />
          <SidebarItem
            icon={FaCog}
            label="Reports"
            to="/admin/reports"
            activeRoute={activeRoute}
            setActiveRoute={setActiveRoute}
          />
        </nav>
      )}

      {/* Collapsed state icons */}
      {!isOpen && (
        <nav className="flex-1 px-2 py-4 space-y-2">
          <div className="flex flex-col items-center space-y-3">
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="p-1 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <FaTachometerAlt className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </button>
            <button 
              onClick={() => navigate('/admin/patients')}
              className="p-1 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <FaUsers className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </button>
            <button 
              onClick={() => navigate('/admin/doctors')}
              className="p-1 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <FaUserMd className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </button>
            <button 
              onClick={() => navigate('/admin/services')}
              className="p-1 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <MdMedicalServices className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </button>
            <button 
              onClick={() => navigate('/admin/events')}
              className="p-1 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <MdEmojiEvents className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </button>
            <button 
              onClick={() => navigate('/admin/appointments')}
              className="p-1 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <FaCalendarCheck className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </button>
            <button 
              onClick={() => navigate('/admin/contact')}
              className="p-1 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <BiSupport className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </button>
            <button 
              onClick={() => navigate('/admin/feedback')}
              className="p-1 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <MdFeedback className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </button>
            <button 
              onClick={() => navigate('/admin/faqs')}
              className="p-1 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <FaQuestionCircle className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </button>
            <button 
              onClick={() => navigate('/admin/testimonial')}
              className="p-1 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <TbQuotes className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </button>
            <button 
              onClick={() => navigate('/admin/website')}
              className="p-1 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <CgWebsite className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </button>
            <button 
              onClick={() => navigate('/admin/newsletter')}
              className="p-1 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <FaLandMineOn className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </button>
            <button 
              onClick={() => navigate('/admin/reports')}
              className="p-1 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <FaCog className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </button>
          </div>
        </nav>
      )}

      {/* Footer with Logout */}
      {isOpen && (
        <div className="px-4 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-all duration-200 ease-in-out group"
          >
            <FaSignOutAlt className="w-4 h-4 mr-3 transition-transform duration-200 group-hover:scale-110" />
            Logout
          </button>
          
    <div className="flex items-center px-4 py-2 text-xs text-gray-700 rounded-lg bg-white/50 backdrop-blur-sm">
      <div className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}>
        <div className={`w-2 h-2 rounded-full animate-ping ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
      </div>
      {isOnline ? 'System Online' : 'System Offline'}
    </div>
        </div>
      )}

      {/* Collapsed logout button */}
      {!isOpen && (
        <div className="px-2 py-  border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="p-1 rounded-lg hover:bg-red-50 hover:shadow-md transition-all duration-200 cursor-pointer group w-full flex justify-center"
          >
            <FaSignOutAlt className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors duration-200" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;