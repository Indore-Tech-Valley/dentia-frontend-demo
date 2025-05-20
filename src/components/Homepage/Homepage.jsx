import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Banner1 from '../Banners/Banner1/Banner1'
import Banner2 from '../Banners/Banner2/Banner2'
import Appointment from '../Appointment/Appointment'
import ContactInfo from '../ContactInfo.jsx/ContactInfo'
import OurServices from '../OurServices/OurServices'
import States from '../States/States'
import Faqs from '../Faqs/Faqs'
import Testimonial from '../Testimonial/Testimonial'
import ReadyToBook from '../ReadyTOBook/ReadyToBook'
import Feedback from '../Feedback.jsx/Feedback'
import OurProcess from '../OurProcess/OurProcess'


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
       <Banner1 />
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
