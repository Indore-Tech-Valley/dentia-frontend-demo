import React from 'react';
import { BrowserRouter,useLocation } from 'react-router-dom';
import './App.css';
import Index from './Routes/Index';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import FloatingActionButtons from './components/FloatingActionButtons/FloatingActionButtons';
import AdminRoutes from './Routes/AdminRoutes';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      
      {isAdminRoute ? (
        <AdminRoutes />
      ) : (
        <>
          <Navbar />
          <Index />
          <FloatingActionButtons />
          <Footer />
        </>
      )}
    </>
  );
}

function App() {

    
  return (
    <BrowserRouter basename='/dentia-frontend-demo'>
      <ScrollToTop />
    <AppContent />
    </BrowserRouter>
  );
}

export default App;
