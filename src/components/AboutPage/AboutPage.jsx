import React, { useEffect } from 'react'
import AboutUs from '../AboutUs/AboutUs'
import DentalTeam from '../DentalTeam/DentalTeam'
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs'
import Header from '../../pages/Header/Header'
import Testimonial from '../Testimonial/Testimonial'
import { useLocation } from 'react-router-dom'


Testimonial

const AboutPage = () => {
  const location = useLocation();

  useEffect(() => {
  if (location.hash === '#dentists') {
    // Delay scroll to allow layout/rendering to settle
    setTimeout(() => {
      const element = document.getElementById('dentists');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Try adjusting between 100–300ms if needed
  }
}, [location]);


  return (
    <div>
      <Header title={`About Us`} image={`https://kdahweb-static.kokilabenhospital.com/kdah-2019/slider/16672013291400.jpg`}/>
      <AboutUs/>
    
       <div id="dentists">
          <DentalTeam/>
      </div>
         <WhyChooseUs/>
      <Testimonial />
      <h1 className='hidden'>djhsewb</h1>

   
     
    </div>
  )
}

export default AboutPage
