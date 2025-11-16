import { useState, useEffect} from "react";
import ParticleBackground from "./ParticleBackground";

function Hero() {
  const originalText =
    "A frontend developer specialized in building fast, scalable and engaging applications with modern technologies like React.";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingInterval = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (i < originalText.length) {
          setTypedText((prev) => prev + originalText.charAt(i));
          i++;
        } else {
          clearInterval(intervalId);
        }
      }, 50);
      return () => clearInterval(intervalId);
    }, 1000);

    return () => clearTimeout(typingInterval);
  }, [originalText]);

  const handleViewWorkClick = (e) => {
    e.preventDefault();
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-black text-white relative isolate overflow-hidden"
    >
      <div className="absolute inset-0 bg-hero-aurora opacity-20 -z-10"></div>
      <ParticleBackground />
      <div className="container mx-auto px-6 text-center z-10">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light mb-4 font-mono">
          Hi, I'm{" "}
          <span className="font-bold text-[var(--accent-color)]">Vivek</span>
          .
        </h1>
        <p className="text-base sm:text-lg md:text-2xl max-w-3xl mx-auto font-mono mb-8">
          {typedText}
          <span className="inline-block w-0.5 h-6 sm:h-8 bg-white ml-1 animate-ping"></span>
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="#projects"
            onClick={handleViewWorkClick}
            className="inline-block bg-[var(--accent-color)] text-black font-mono font-bold py-3 px-6 sm:px-8 rounded-md hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            View My Work
          </a>
          <a
            href="./src/resume/Vivek.pdf"
            download="Vivek.pdf"
            className="inline-block border border-[var(--accent-color)] text-[var(--accent-color)] font-mono font-bold py-3 px-6 sm:px-8 rounded-md hover:bg-[var(--accent-color)] hover:text-black transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
