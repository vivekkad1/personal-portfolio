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

function About() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`py-20 bg-gray-100 text-black transition-all duration-1000 ease-in-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center section-title">
          About Me
        </h2>
        <div className="max-w-4xl mx-auto text-center text-base sm:text-lg md:text-xl leading-relaxed space-y-6">
          <p>
            As a recent computer science graduate, I am driven by a passion for
            crafting beautiful, intuitive, and high-performance user interfaces.
            My academic journey and personal projects have provided me with a
            strong foundation in modern web technologies, and I specialize in
            turning complex problems into elegant, user-friendly solutions.
          </p>
          <p>
            I am a quick learner, thrive in collaborative environments, and am
            always eager to adapt to new challenges and expand my skillset. I
            believe that the best applications are built at the intersection of
            thoughtful design and robust engineering.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
