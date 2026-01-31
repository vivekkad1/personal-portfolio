import React, { useState, useEffect } from "react";
import { ChevronUpIcon } from "../icons/icons";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-3 right-5 bg-gray-900 text-[var(--accent-color)] border border-[var(--accent-color)] rounded-full p-3 shadow-lg hover:bg-[var(--accent-color)] hover:text-black focus:outline-none transition-all duration-300 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
      }`}
    >
      <ChevronUpIcon className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTopButton;

