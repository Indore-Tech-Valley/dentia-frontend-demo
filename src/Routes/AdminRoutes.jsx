import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../Admin/pages/Dashboard/Dashboard';
import AdminLayout from '../Admin/pages/AdminLayout/AdminLayout';
import Auth from '../Admin/pages/Auth/Auth';
import { useSelector } from 'react-redux';
import Doctors from '../Admin/pages/Doctors/Doctors';
import Patients from '../Admin/pages/Patients/Patients';
import Appointments from '../Admin/pages/Appointments/Appointments';
import ContactUs from '../Admin/pages/ContactUs/ContactUs';
import Feedback from '../Admin/pages/Feedback/Feedback';
import Faqs from '../Admin/pages/Faqs/Faqs';
import Newsletter from '../Admin/pages/Newsletter/Newsletter';
import WebsiteDetails from '../Admin/pages/WebsiteDetails/WebsiteDetails';
import Testimonials from '../Admin/pages/Testimonials/Testimonials';
import Services from '../Admin/pages/Services/Services';
import Events from '../Admin/pages/Events/Events';
import Admins from '../Admin/pages/AdminManagement/AdminManagement';
import NotificationListener from '../Admin/components/NotificationListener/NotificationListener';
import Reports from '../Admin/pages/Reports/Reports';
import Cookies from 'js-cookie'; // Assuming you're using js-cookie for cookie management
// Create placeholder components for missing routes


const AdminRoutes = () => {
  const isAdminLoggedIn = Cookies.get("authToken"); // example

  return (
    <>
    <Routes>
      {/* Public Auth Route */}
      <Route path="/admin" element={<Auth />} />
      
      {/* Protected Admin Layout Routes */}
      {isAdminLoggedIn ? (
        <Route path="/" element={<AdminLayout />}>
          {/* Default redirect to dashboard */}
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          
          {/* Main Menu Routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/newAdmin" element={<Admins />} />
          <Route path="/admin/patients" element={<Patients />} />
          <Route path="/admin/doctors" element={<Doctors />} />
          <Route path="/admin/services" element={<Services />} />
          <Route path="/admin/events" element={<Events />} />
          <Route path="/admin/appointments" element={<Appointments />} />
          <Route path="/admin/contact" element={<ContactUs />} />
          <Route path="/admin/feedback" element={<Feedback />} />
          <Route path="/admin/faqs" element={<Faqs />} />
          <Route path="/admin/testimonial" element={<Testimonials />} />
          <Route path="/admin/newsletter" element={<Newsletter />} />
          <Route path="/admin/website" element={<WebsiteDetails />} />
          <Route path="/admin/reports" element={<Reports />} />
          {/* Catch all - redirect to dashboard */}
          <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/admin" replace />} />
      )}

    </Routes>
    <NotificationListener/>
    </>
  );
};

export default AdminRoutes;