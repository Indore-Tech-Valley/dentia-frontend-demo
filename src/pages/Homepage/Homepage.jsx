import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Banner1 from '../../components/Banners/Banner1/Banner1'
import Banner2 from '../../components/Banners/Banner2/Banner2'
import ContactInfo from '../../components/ContactInfo/ContactInfo'
import OurServices from '../../components/OurServices/OurServices'
import OurProcess from '../../components/OurProcess/OurProcess'
import Appointment from '../../components/Appointment/Appointment'
import States from '../../components/States/States'
import Faqs from '../../components/Faqs/Faqs'
import ReadyToBook from '../../components/ReadyTOBook/ReadyToBook'
import Feedback from '../../components/Feedback/Feedback'

const Homepage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#appointment') {
      const element = document.getElementById('appointment');
      if (element) {
        // Smooth scroll to Appointment section
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
     <div className=''>
      <Banner2 />
       {/* <Banner1 /> */}
      <ContactInfo />
     
      <OurServices />
      <OurProcess/>
      
      {/* Appointment with id */}
      <div id="appointment">
        <Appointment />
      </div>

      <States />
      <Faqs />
      {/* <Testimonial /> */}
      <ReadyToBook />
       <Feedback/>
    </div>
  )
}

export default Homepage;
