import React, { useState, useEffect, useRef } from "react";
import { CertificateIcon } from "../icons/icons";
import { certifications as certificationsData } from "../data/certifications";

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

const Certifications = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className={`min-h-screen flex items-center py-20 bg-black text-white transition-all duration-1000 ease-in-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center section-title-white">
          Learning & Certifications
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certificationsData.map((cert, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 flex flex-col transition-all duration-300 transform hover:-translate-y-2 hover:border-[var(--accent-color)]"
            >
              <div className="flex items-start gap-4">
                <CertificateIcon className="w-8 h-8 text-[var(--accent-color)] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-mono text-white">
                    {cert.degree}
                  </h3>
                  <p className="text-[var(--accent-color)] font-semibold mb-1">
                    {cert.institution}
                  </p>
                  <p className="text-sm text-gray-400 mb-4">{cert.period}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm flex-grow">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
