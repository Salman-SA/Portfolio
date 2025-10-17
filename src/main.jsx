import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'aos/dist/aos.css' // Import AOS styles


import AOS from 'aos'
AOS.init({
  duration: 1000, // Animation duration
  once: true, // Only animate once per element
  offset: 100, // Start animation 100px before element
  easing: 'ease-in-out', // Smooth easing
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
