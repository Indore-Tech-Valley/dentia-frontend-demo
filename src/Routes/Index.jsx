import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../components/Homepage/Homepage';
import AboutUs from '../components/AboutUs/AboutUs';
import AboutPage from '../components/AboutPage/AboutPage';
import Events from '../components/Events/Events';
import TermsConditions from '../components/TermsConditions/TermsConditions';
import PrivacyPolicy from '../components/PrivacyPolicy/PrivacyPolicy';
import ServicePage from '../components/ServicePage/ServicePage';

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/events" element={<Events />} />
      <Route path="/termsConditions" element={<TermsConditions />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/services" element={<ServicePage/>} />
    </Routes>
  );
};

export default Index;
