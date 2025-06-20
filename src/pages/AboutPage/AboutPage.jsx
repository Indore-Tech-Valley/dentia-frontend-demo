import React, { useEffect } from 'react'
import AboutUs from '../../components/AboutUs/AboutUs'
import DentalTeam from '../../components/DentalTeam/DentalTeam'
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs'
import Header from '../../components/Header/Header'
import Testimonial from '../../components/Testimonial/Testimonial'
import { useLocation } from 'react-router-dom'

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
