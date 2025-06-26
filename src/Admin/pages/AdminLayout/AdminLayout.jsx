import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import AdminTopbar from '../../components/AdminTopbar/AdminTopbar';
import { FaChevronRight, FaChevronLeft, FaUsers, FaUserMd, FaCalendarCheck } from 'react-icons/fa';

const AdminLayout = () => { // Remove children prop
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeRoute, setActiveRoute] = useState('/dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        activeRoute={activeRoute}
        setActiveRoute={setActiveRoute}
      />

      {/* Topbar */}
      <AdminTopbar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main 
        className={`transition-all duration-300 pt-16 min-h-screen ${
          sidebarOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        <div className="p-6">
          {/* Replace children with Outlet */}
          <Outlet />
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;