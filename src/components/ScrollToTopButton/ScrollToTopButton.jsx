import React, { useState, useEffect } from "react";
import ArrowUp from "../../assets/ArrowUp.png";
import './ScrollToTopButton.css'; // Make sure this import is correct

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top ${isVisible ? "show" : ""}`}
      aria-label="Scroll to top"
    >
      <img src={ArrowUp} alt="Scroll to top" width={22} height={22} />
    </button>
  );
};

export default ScrollToTopButton;