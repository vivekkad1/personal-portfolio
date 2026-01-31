import { skillicons } from "../data/skillicons.jsx";

const Skills = () => {
  return (
    <section
      id="skills"
      className={`skills-section relative flex items-center py-20 bg-black text-white overflow-hidden transition-all duration-1000 ease-in-out transform`}
    >
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mt-4 md:mb-10 mb-4 text-center section-title-white">
          Professional Toolkit
        </h2>

        <div className="flex flex-wrap justify-center">
          {skillicons.map((skill, index) => (
            <div
              key={index}
              className="md:w-15 w-7.5 md:m-10 m-7.5 flex flex-col items-center"
            >
              {skill.icon}
              <p className="mt-4">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
