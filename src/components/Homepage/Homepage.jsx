import React from 'react'
import Banner1 from '../Banners/Banner1/Banner1'
import Banner2 from '../Banners/Banner2/Banner2'
import Appointment from '../Appointment/Appointment'
import ContactInfo from '../ContactInfo.jsx/ContactInfo'
import OurServices from '../OurServices/OurServices'
import States from '../States/States'
import Faqs from '../Faqs/Faqs'
import Testimonial from '../Testimonial/Testimonial'
import ReadyToBook from '../ReadyTOBook/ReadyToBook'

const Homepage = () => {
  return (
    <div className=''>
    <Banner2/>
    <ContactInfo/>
    <Banner1/>
    <Appointment/>
    <OurServices/>
    <States/>
    <Faqs/>
    <Testimonial/>
    <ReadyToBook/>
    </div>
  )
}

export default Homepage
