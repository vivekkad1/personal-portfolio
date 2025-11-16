import{ useState, useEffect, useRef } from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { MenuIcon, XIcon } from "../icons/icons";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [sliderStyle, setSliderStyle] = useState({ opacity: 0 });
  const navLinkRefs = useRef([]);
  const navRef = useRef(null);
  const navLinks = ["About", "Skills", "Projects", "Certifications", "Contact"];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      let currentSection = "hero";

      navLinks.forEach((link) => {
        const section = document.getElementById(link.toLowerCase());
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          currentSection = link.toLowerCase();
        }
      });

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50
      ) {
        currentSection = "contact";
      }

      const heroSection = document.getElementById("hero");
      if (
        heroSection &&
        heroSection.getBoundingClientRect().top >= -200 &&
        scrollPosition < heroSection.offsetHeight
      ) {
        currentSection = "hero";
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateSlider = (element) => {
    if (element) {
      setSliderStyle({
        left: element.offsetLeft,
        width: element.offsetWidth,
        opacity: 1,
      });
    } else {
      setSliderStyle({ opacity: 0 });
    }
  };

  useEffect(() => {
    const activeLinkIndex = navLinks.findIndex(
      (link) => link.toLowerCase() === activeSection
    );
    const activeLinkElement = navLinkRefs.current[activeLinkIndex] || null;
    updateSlider(activeLinkElement);
  }, [activeSection]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-4 pointer-events-none">
        <div className="container mx-auto mt-4 flex items-center justify-between bg-black/60 backdrop-blur-md shadow-lg shadow-black/20 rounded-full px-4 sm:px-6 py-3 text-white pointer-events-auto relative">
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "hero")}
            className="text-xl border-2 border-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white transition-colors duration-300 flex-shrink-0 z-20"
          >
            <img src="./src/assets/V.png" alt="logo" />
          </a>

          <nav
            ref={navRef}
            onMouseLeave={() =>
              updateSlider(
                navLinkRefs.current[
                  navLinks.findIndex(
                    (link) => link.toLowerCase() === activeSection
                  )
                ]
              )
            }
            className="hidden md:flex items-center gap-x-2 absolute left-1/2 -translate-x-1/2"
          >
            {navLinks.map((link, index) => (
              <a
                key={link}
                ref={(el) => (navLinkRefs.current[index] = el)}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => handleLinkClick(e, link.toLowerCase())}
                onMouseEnter={() => updateSlider(navLinkRefs.current[index])}
                className="text-white px-3 py-2 relative z-10 font-mono tracking-wider text-sm"
              >
                <span>{link}</span>
              </a>
            ))}
            <span
              className="absolute bottom-0 h-0.5 bg-[var(--accent-color)] rounded-full transition-all duration-300 ease-in-out"
              style={sliderStyle}
            ></span>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="./src/resume/Vivek.pdf"
                download="Vivek.pdf"
                className="font-mono text-sm border border-white/50 px-4 py-2 rounded-md hover:bg-white/90 hover:text-black transition-colors"
              >
                Resume
              </a>
              <a
                href="https://github.com/vivekkad1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <GitHubIcon className="w-10 h-10" />
              </a>
              <a
                href="https://www.linkedin.com/in/vivekkad/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <LinkedInIcon className="w-6 h-6" />
              </a>
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
              >
                {isOpen ? (
                  <XIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-95 backdrop-blur-sm transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={(e) => handleLinkClick(e, link.toLowerCase())}
              className="text-2xl text-white hover:text-[var(--accent-color)] font-mono tracking-widest transition-colors"
            >
              {link}
            </a>
          ))}
          <a
            href="/placeholder-resume.pdf"
            download="JohnDoe-Resume.pdf"
            className="text-2xl text-white hover:text-[var(--accent-color)] font-mono tracking-widest transition-colors"
          >
            Resume
          </a>
          <div className="flex items-center space-x-6 pt-8">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[var(--accent-color)] transition-colors"
            >
              <GitHubIcon className="w-8 h-8" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[var(--accent-color)] transition-colors"
            >
              <LinkedInIcon className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
