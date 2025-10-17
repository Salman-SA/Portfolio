import React from 'react'
import './Mywork.css'
import mylatestwork from '../../assets/mylatestwork.svg'
import Myworks from '../../assets/Myworks.js'
import arrow_right from '../../assets/arrow_right.svg'

const Mywork = () => {
  return (
    <div id='work' className='mywork'>
      <div data-aos="fade-up" data-aos-delay = "600">

        <div className="mywork-title">
          <img src={mylatestwork} alt='My Latest Work' />
        </div>
        </div>
              <div data-aos="fade-up">

        <div className="mywork-container">
          {Myworks.map((work, index) => {
            return <img key={index} src={work.image} alt={work.name || 'Project'} />
          })}
        </div>
      </div>
      <div className="mywork-showmore">
        <a
          href="https://github.com/Salman-SA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>My GitHub</p>
          <img src={arrow_right} alt='Arrow right' />
        </a>
      </div>
    </div>
  )
}

export default Mywork
