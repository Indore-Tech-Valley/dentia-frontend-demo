import React from 'react'
import ContactUs from '../../components/ContactUs/ContactUs'
import Header from '../../components/Header/Header';

const ContactPage = () => {
  return (
    <div>
      <Header image={`https://helphospitals.com/wp-content/uploads/2022/10/close-up-doctor-front-bright-bac-e1666248833596-2048x686.webp`} title={`Contact Us`}/>
      <ContactUs/>
    </div>
  )
}

export default ContactPage;
