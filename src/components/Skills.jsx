import React, { useState, useEffect, useRef } from "react";

const useIntersectionObserver = (options) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
};

const skillCategories = {
  Frontend: [ "React.js", "JavaScript(ES6+)", "HTML5 & CSS3", "Tailwind CSS", "Bootstrap"],
  Backend: ["Python"],
  Tools: ["Git & GitHub"],
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState("Frontend");
  const [contentKey, setContentKey] = useState(0);
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const tabRefs = useRef([]);
  const [sliderStyle, setSliderStyle] = useState({});

  useEffect(() => {
    const activeTabIndex = Object.keys(skillCategories).findIndex(
      (tab) => tab === activeTab
    );
    const activeTabElement = tabRefs.current[activeTabIndex];
    if (activeTabElement) {
      setSliderStyle({
        left: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth,
      });
    }
  }, [activeTab, isVisible]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setContentKey((prev) => prev + 1);
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`skills-section relative min-h-screen flex items-center py-20 bg-black text-white overflow-hidden transition-all duration-1000 ease-in-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center section-title-white">
          Professional Toolkit
        </h2>

        <div className="relative flex flex-wrap justify-center mb-12 border-b border-gray-700">
          {Object.keys(skillCategories).map((tab, index) => (
            <button
              key={tab}
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => handleTabClick(tab)}
              className={`px-4 sm:px-6 py-3 font-mono text-base sm:text-lg transition-colors duration-300 cursor-pointer ${
                activeTab === tab
                  ? "text-[var(--accent-color)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
          <div
            className="absolute bottom-[-1px] h-0.5 bg-[var(--accent-color)] transition-all duration-300 ease-in-out pointer-events-none"
            style={sliderStyle}
          />
        </div>

        <div
          key={contentKey}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 animate-fade-in"
        >
          {skillCategories[activeTab].map((skill) => (
            <div
              key={skill}
              className="relative overflow-hidden p-4 sm:p-6 text-center bg-gray-900/50 border border-gray-800 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:border-[var(--accent-color)] group"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[var(--accent-color)] rounded-lg blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <p className="font-mono text-base sm:text-lg text-gray-200 relative z-10">
                {skill}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
