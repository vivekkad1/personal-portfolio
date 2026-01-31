import { useState, useEffect, useRef } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  GithubIcon,
} from "../icons/icons";
import { projects } from "../data/projects";

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

const Projects = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [current, setCurrent] = useState(0);

  const nextProject = () =>
    setCurrent(current === projects.length - 1 ? 0 : current + 1);
  const prevProject = () =>
    setCurrent(current === 0 ? projects.length - 1 : current - 1);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`min-h-screen flex items-center py-20 bg-gray-100 text-black transition-all duration-1000 ease-in-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-10 text-center section-title">
          Featured Work
        </h2>

        <div className="relative max-w-3xl mx-auto">
          <div className="relative" style={{ perspective: "1000px" }}>
            <div className="overflow-hidden relative rounded-lg shadow-2xl">
              <div
                className="flex transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {projects.map((project, index) => (
                  <div key={index} className="project-card min-w-full">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full aspect-video object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevProject}
              className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 text-black shadow-md transition z-10"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={nextProject}
              className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 text-black shadow-md transition z-10"
            >
              <ArrowRightIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center items-center mt-4 space-x-2">
            {projects.map((_, i) => (
              <button
                key={`project-dot-${i}`}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === i
                    ? "w-6 bg-[var(--accent-color)]"
                    : "w-2 bg-gray-400"
                }`}
              ></button>
            ))}
          </div>

          <div className="mt-4 text-center bg-white p-6 rounded-lg border border-gray-200 shadow-md">
            <h3 className="text-xl sm:text-2xl font-bold font-mono mb-2 text-gray-800">
              {projects[current].title}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-sm sm:text-base">
              {projects[current].description}
            </p>
            <div className="flex flex-wrap justify-center gap-2 font-mono mb-6">
              {projects[current].tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs sm:text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <a
                href={projects[current].liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-sm font-mono text-white bg-gray-800 px-4 py-2 rounded-md hover:bg-black transition-colors"
              >
                Live Demo <ArrowUpRightIcon className="ml-1.5 w-4 h-4" />
              </a>
              <a
                href={projects[current].githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-sm font-mono text-gray-700 border border-gray-400 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                GitHub <GithubIcon className="ml-1.5 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
