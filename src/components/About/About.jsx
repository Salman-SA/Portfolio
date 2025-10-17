import React, { useEffect, useRef } from 'react'
import './about.css'
import profilepic from '../../assets/profilepic.svg'
import aboutme from '../../assets/aboutme.svg'
import LightRays from '../LIghtRays/LightRays'


const About = () => {
    const skillRefs = useRef([]);

    useEffect(() => {
        // Animate progress bars when component mounts
        const timeoutIds = [];

        skillRefs.current.forEach((ref, index) => {
            if (ref) {
                const timeoutId = setTimeout(() => {
                    ref.style.width = ref.getAttribute('data-width');
                }, 100 * index); // Stagger the animations
                timeoutIds.push(timeoutId);
            }
        });

        return () => {
            // Clean up timeouts if component unmounts
            timeoutIds.forEach(id => clearTimeout(id));
        };
    }, []);

    const skills = [
        { name: "HTML & CSS", level: "50%" },
        { name: "SQL", level: "70%" },
        { name: "React.js", level: "60%" },
        { name: "JavaScript", level: "50%" }
    ];

    return (

        <div id='about' className='about' >

           
                
            <div data-aos="fade-up" data-aos-delay="500">
                <div className="about-title">
                    <img src={aboutme} alt='About Me' />

                </div>
            </div>
            <div data-aos="fade-up" data-aos-delay="500">
                <div className="about-sections">
                    <div className="about-left">
                        <img src={profilepic} alt='Profile' />
                    </div>
                    <div className="about-right">
                        <div className="about-para">
                            <p>I'm from Riyadh, Saudi Arabia, and I studied Information Technology at Imam Mohammed bin Saud University. During my studies, I dived deep into web development, databases, and system design, exploring both front-end and back-end technologies.
                                I enjoyed turning complex problems into clean, functional solutions and learning how data flows efficiently through well-structured systems.
                            </p>
                            <p>Since graduating, I've focused on building interactive web applications, managing databases with SQL, and creating projects that combine design, functionality, and performance.
                                Every project I work on is a chance to improve my skills, experiment with new technologies, and bring ideas to life in a way that's both practical and visually engaging.
                            </p>
                        </div>
                        <div className="about-skills">
                            {skills.map((skill, index) => (
                                <div className="about-skill" key={index}>
                                    <p>{skill.name}</p>
                                    <div className="skill-progress-container">
                                        <div
                                            className="skill-progress-bar"
                                            ref={el => skillRefs.current[index] = el}
                                            data-width={skill.level}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div data-aos="fade-right">
            <div className="about-achievements">
                
                    <div className="about-achievement">
                        <p>Actively developing real-world projects in React.js and Web development</p>
                    </div>
                
                
                <hr />
                

                    <div className="about-achievement">
                        <p>Completed multiple projects demonstrating full-stack development skills</p>
                    </div>
                </div>


            </div>

            <div className="about-achievements2">
                <div data-aos="fade-right">
                    <hr />
                    <div className="about-achievement2">
                        <p>Completed 10+ training courses to strengthen technical skills in frontend development and databases</p>
                    </div>
                </div>
            </div>
        </div>




    )
}

export default About