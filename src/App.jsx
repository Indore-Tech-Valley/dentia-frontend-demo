import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Index from './Routes/Index';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import BackToTopButton from './components/BackToTopButton/BackToTopButton';


function App() {
  return (
    <BrowserRouter>
     <ScrollToTop />
    <Navbar/>
    <Index />
    <BackToTopButton /> {/* Add here */}
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
