import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../components/Homepage/Homepage';
import AboutUs from '../components/AboutUs/AboutUs';
import AboutPage from '../components/AboutPage/AboutPage';
import Events from '../components/Events/Events';

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/events" element={<Events />} />
    </Routes>
  );
};

export default Index;
