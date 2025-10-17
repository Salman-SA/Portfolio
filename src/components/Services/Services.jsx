import React from 'react'
import './Services.css'
import MyServices from '../../assets/MyServices.svg'
import services_data from '../../assets/Services_data.js'
import arrow_right from '../../assets/arrow_right.svg'

const Services = () => {
  return (
    
    <div id='services' className='services'>
      
      <div data-aos="fade-up">

        <div className="services-title">
          <img src={MyServices} alt='none' />
        </div>
      </div>
                      <div data-aos="fade-up" data-aos-delay= "400">


      <div className="services-container">
        {services_data.map((service, index) => {
          return <div key={index} className="services-format">
            <h3>{service.id}</h3>
            <h2>{service.title}</h2>
            <p>{service.description}</p>


          </div>

        })}
      </div>
      </div>
    </div>
  )
}

export default Services