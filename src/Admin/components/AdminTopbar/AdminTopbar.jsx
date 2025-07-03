// AdminTopbar.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import {
  FaBell,
  FaEnvelope,
  FaUserCircle,
  FaPlus,
  FaSearch,
  FaGlobe,
  FaBars,
  FaAngleDown,
  FaCog,
  FaMoon,
  FaSignOutAlt,
} from "react-icons/fa";
import { getLoggedIn } from "../../../redux/features/adminSlice/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  markAllSeen,
} from "../../../redux/features/notificationSlice/notificationSlice";
import Cookies from "js-cookie";

const AdminTopbar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.admin);
  const { list: notifications } = useSelector((state) => state.notification);

  // console.log(admin)

  useEffect(() => {
    dispatch(getLoggedIn());
    dispatch(fetchNotifications());
  }, [dispatch]);

    const handleLogout = () => {
       Cookies.remove('authToken'); // Assuming you are using js-cookie to manage cookies
       navigate('/admin');
    };

  const handleNotificationClick = (notif) => {
    const message = notif.message.toLowerCase();

    if (/new appointment from/i.test(message)) {
      navigate("/admin/appointments", {
        state: { highlightId: notif.referenceId },
      });
    } else if (/new query from/i.test(message)) {
      navigate("/admin/contact", { state: { highlightId: notif.referenceId } });
    } else if (/new feedback from/i.test(message)) {
      navigate("/admin/feedback", {
        state: { highlightId: notif.referenceId },
      });
    } else if (/new newsletter subscription from/i.test(message)) {
      navigate("/admin/newsletter", {
        state: { highlightId: notif.referenceId },
      });
    } else {
      navigate("/admin/dashboard");
    }
  };

  // console.log( 'notifications',notifications);

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm transition-all duration-300 flex items-center justify-between px-6 ${
        sidebarOpen ? "left-64" : "left-16"
      }`}
      style={{
        fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Left Section - Search & Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
        >
          <FaBars className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
        </button>

        <div className="relative">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2 w-80 border border-gray-200 focus-within:border-blue-400 focus-within:bg-white transition-all duration-200">
            <FaSearch className="text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search patients, doctors, appointments..."
              className="w-full outline-none border-none bg-transparent text-sm text-gray-700 placeholder-gray-400"
            />
            <div className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded-md">
              ⌘K
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Quick Actions */}
        <button
          onClick={() => navigate("/admin/newAdmin")}
          className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200 group"
        >
          <FaPlus className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group relative"
          >
            <FaBell className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">
                {notifications?.filter((n) => !n.seen)?.length}
              </span>
            </div>
          </button>

          {notificationOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
              <button
                onClick={() => {
                  dispatch(markAllSeen())
                  dispatch(fetchNotifications())
                  setNotificationOpen(!notificationOpen)
                  // setTimeout(()=>{
                  //   window.location.reload()
                  // },1000)
                }}
                className="text-blue-500 hover:underline text-sm float-right mr-4"
              >
                <FaEye size={20} className="inline-block mr-1 mb-2" />
              </button>
              <div className="px-4 py-3  mt-2 border-b border-gray-100">
                {notifications?.filter((n) => !n.seen)?.length === 0 ? (
                  <p className="text-sm text-center text-gray-500 px-4 py-2">
                    No notifications
                  </p>
                ) : (
                  notifications
                    ?.filter((n) => !n.seen)
                    ?.map((notif, index) => (
                      <div
                        key={notif._id || index}
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
                        onClick={() => handleNotificationClick(notif)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-2 h-2 rounded-full mt-2"
                            style={{
                              backgroundColor: notif.seen
                                ? "#d1d5db"
                                : "#3b82f6",
                            }}
                          ></div>
                          <div>
                            <p className="text-sm text-gray-800">
                              {notif?.message}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(notif.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                )}{" "}
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group">
          <FaEnvelope className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300"></div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <FaUserCircle className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">
                {admin?.email}
              </p>
              <p className="text-xs text-gray-500">{admin?.role}</p>
            </div>
            <FaAngleDown
              className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800">{admin?.email}</p>
                <p className="text-xs text-gray-500">{admin?.role}</p>
              </div>
              <div className="py-2">
             
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <FaMoon className="w-4 h-4" />
                  Dark Mode
                </button>
                <div className="border-t border-gray-100 my-2"></div>
                <button 
                onClick={()=>handleLogout()}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">
                  <FaSignOutAlt className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
