import { useState, useEffect, useRef } from "react";

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
        <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-10 text-center section-title">
          About Me
        </h2>
        <div className="max-w-4xl mx-auto text-center text-base sm:text-lg md:text-xl leading-relaxed space-y-6">
          <p>
            I create modern frontend websites that emphasize clarity, performance, and scalability. I focus on building reusable components and organized layouts to ensure interfaces remain consistent and easy to expand. I pay close attention to responsiveness, interaction details, and smooth user experience so pages feel quick and intuitive on all devices.
          </p>
          <p>
            I enjoy turning design systems into usable interfaces. I keep the architecture clean and work on improving user interactions with content. Beyond visuals, I prioritize maintainability and long-term reliability. I ensure that websites stay easy to update as needs change. I believe in careful implementation, teamwork, and ongoing improvement. My goal is to create simple, well-crafted web experiences that make a real difference.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
