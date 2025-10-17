import React, { useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.svg'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import linkedin from '../../assets/linkedin.png'
import hamburger from '../../assets/hamburger.png'
import close from '../../assets/close.png'
import Darkveil from '../../components/Darkveil/Darkveil'

const Navbar = () => {

  const menuref = useRef();

  const openMenu = () => {
    menuref.current.style.right = "0";
  }
  const closeMenu = () => {
    menuref.current.style.right = "-100%";
  }

  return (
    // This outer div now has the class 'site-header-area' for CSS styling.
    // Its height will be controlled by CSS.
    <div className='site-header-area'> 
      
      {/* Darkveil component wrapped in its background container */}
      <div className='darkveil-background-wrapper'>
        <Darkveil 
          // You can pass props here to customize the Darkveil effect
          // e.g., hueShift={10}, noiseIntensity={0.03}, speed={0.6}
        />
      </div>

      {/* Your existing Navbar content */}
      <div className='navbar'>
        <img src={logo} alt="" className="logo" />
        <img src={hamburger} onClick={openMenu} alt='none' className='nav-mob-open' />

        <ul ref={menuref} className="nav-menu">
          <img src={close} onClick={closeMenu} alt='none' className='nav-mob-close' />
          <li><AnchorLink className='anchor-link' href='#home'><p>Home</p></AnchorLink></li>
          <li><AnchorLink className='anchor-link' offset={50} href='#about'><p>About me</p></AnchorLink></li>
          <li><AnchorLink className='anchor-link' offset={50} href='#services'><p>Services</p></AnchorLink></li>
          <li><AnchorLink className='anchor-link' offset={50} href='#work'><p>Projects</p></AnchorLink></li>
          <li><AnchorLink className='anchor-link' offset={50} href='#contact'><p>Contact</p></AnchorLink></li>
          
           <div className="connect-mobile">
          <a target="_blank" rel="noopener noreferrer"
            className='anchor-link' offset={50} href='https://www.linkedin.com/in/salmanalyahya/'>
            <img src={linkedin} alt='linkedin' />Connect
          </a>
        </div>
        </ul>
        <div className="nav-connect">
          <a target="_blank" rel="noopener noreferrer"
            className='anchor-link' offset={50} href='https://www.linkedin.com/in/salmanalyahya/'>
            <img src={linkedin} alt='linkedin' />Connect With Me
          </a>
        </div>

        
      </div>
    </div>
  )
}

export default Navbar;