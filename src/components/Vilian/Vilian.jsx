import React from 'react'
import './vilian.css'
import me from '../../assets/me.png'
import SalmanAlyahya_CV from '../../assets/SalmanAlyahya_CV.pdf'
import pdf from '../../assets/pdf.png'
import TextType from '../TextType/TextType'
const Vilian = () => {
    return (
        <div id='home' className='vilian'>
              <div data-aos="fade-up" data-aos-delay="500">
            <img src={me} alt='none' />
            </div>
            <h1>
  <TextType 
    text={["Hey, I'm <span class='gradient-name'>Salman Alyahya</span>, an IT graduate in Riyadh"]}
    typingSpeed={40}
    pauseDuration={0}
    showCursor={false}
    cursorCharacter="|"
  />
               

</h1>
            <div className='vilian' data-aos="fade-up" data-aos-delay="500">
            <p>passionate about web development and databases. I love building interactive web apps, designing clean UI, and managing data with SQL using DML and DDL.
                Always exploring new tech to level up my skills and turn ideas into functional solutions.</p>
                </div>
            <div className="vilian-action" data-aos="fade-up" data-aos-delay="500">
                <a
                    href={SalmanAlyahya_CV}
                    download="SalmanAlyahya_CV.pdf"
                    className="vilian-resume"
                    onClick={(e) => {
                        const confirmDownload = window.confirm("Are you sure you want to download the resume?");
                        if (!confirmDownload) {
                            e.preventDefault();
                        }
                    }}
                >

                    <img src={pdf} alt='PDF Icon' className="resume-icon" />
                    <span>My Resume</span>
                </a>



            </div>
            

        </div>
    )
}

export default Vilian