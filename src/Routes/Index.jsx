import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/Homepage/Homepage'
import AboutPage from '../pages/AboutPage/AboutPage';
import Events from '..//pages/Events/Events';
import TermsConditions from '../pages/TermsConditions/TermsConditions';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import ServicePage from '../pages/ServicePage/ServicePage';
import ContactPage from '../pages/ContactPage/ContactUsPage';


const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/events" element={<Events />} />
      <Route path="/termsConditions" element={<TermsConditions />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/services" element={<ServicePage/>} />
      <Route path="/contact" element={<ContactPage/>} />
    </Routes>
  );
};

export default Index;
