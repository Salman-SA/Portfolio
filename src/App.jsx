import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Vilian from './components/Vilian/Vilian.jsx'
import About from './components/About/About.jsx'
import Services from './components/Services/Services.jsx'
import Mywork from './components/MyWork/Mywork.jsx'
import Contact from './components/Contact/Contact.jsx'
import Footer from './components/Footer/Footer.jsx'
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton.jsx'
  console.log("App rendering - ScrollToTopButton should be in DOM"); // ✅ Debug log

import './App.css'


const App = () => {
  return ( 
  <div className='App'>

      

      <Navbar/>
      <ScrollToTopButton/>
      <Vilian/>
      <About/>
      <Services/>
      <Mywork/>
      <Contact/>
      <Footer/>
         


    </div>
  )
}

export default App