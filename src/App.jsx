import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Index from './Routes/Index';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import FloatingActionButtons from './components/FloatingActionButtons/FloatingActionButtons';

function App() {
  return (
    <BrowserRouter basename='/dentia-frontend-demo'>
     <ScrollToTop />
    <Navbar/>
    <Index />
    <FloatingActionButtons /> {/* Add here */}
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
