import { useState, useEffect, useRef } from "react";
import { GithubIcon, LinkedinIcon, MailIcon } from "../icons/icons";

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

function Contact() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`flex items-center py-10 bg-gray-100 text-black transition-all duration-1000 ease-in-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 section-title">
          Let's Connect
        </h2>
        <div className="max-w-md mx-auto bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
          <p className="font-mono text-left text-gray-400">
            <span className="text-[var(--accent-color)] mr-2">&gt;</span>{" "}
            contact --email
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&to=your-vivekkad2002@gmail.com" target="_blank"
            className="mt-2 inline-block text-base sm:text-lg md:text-xl font-mono text-white hover:text-gray-300 transition-colors break-all"
          >
            vivekkad2002@gmail.com
            <span className="inline-block w-2 h-5 bg-white ml-2 animate-ping"></span>
          </a>
        </div>
        <div className="flex justify-center space-x-6 mt-10">
          <a
            href="https://github.com/vivekkad1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[var(--accent-color)] transition-colors"
          >
            <GithubIcon className="w-8 h-8" />
          </a>
          <a
            href="https://www.linkedin.com/in/vivekkad/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[var(--accent-color)] transition-colors"
          >
            <LinkedinIcon className="w-8 h-8" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
