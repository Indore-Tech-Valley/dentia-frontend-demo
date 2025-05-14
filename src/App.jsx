import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Index from './Routes/Index';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Index />
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
