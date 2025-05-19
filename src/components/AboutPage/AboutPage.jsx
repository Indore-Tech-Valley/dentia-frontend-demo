import React from 'react'
import AboutUs from '../AboutUs/AboutUs'
import DentalTeam from '../DentalTeam/DentalTeam'
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs'
import Header from '../../pages/Header/Header'
import Testimonial from '../Testimonial/Testimonial'
Testimonial

const AboutPage = () => {
  return (
    <div>
      <Header title={`About Us`} image={`https://kdahweb-static.kokilabenhospital.com/kdah-2019/slider/16672013291400.jpg`}/>
      <AboutUs/>
      <DentalTeam/>
      <Testimonial />

      <WhyChooseUs/>
     
    </div>
  )
}

export default AboutPage
