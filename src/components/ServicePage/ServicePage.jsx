import React from 'react'
import Services from '../Services/Services'
import Header from '../../pages/Header/Header'


const ServicePage = () => {
  return (
    <div>
      <Header title={`Services`} image={`https://kdahweb-static.kokilabenhospital.com/kdah-2019/slider/16672013291400.jpg`}/>
      <Services/>
    </div>
  )
}

export default ServicePage
