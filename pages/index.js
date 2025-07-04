import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsArrowRight, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";
import NavigationBar from "../components/NavigationBar";
import ProjectCard from "../components/ProjectCard";
import allProjects from "../lib/projects";
import abouts from "../lib/abouts";
import AboutCard from "../components/AboutCard";
import SkillCard from "../components/SkillCard";
import {
  db,
  frameworks,
  iot,
  langs,
  otherTools,
  platforms,
  Models,
} from "../lib/skills";
import Hero from "../components/Hero";
import EducationCard from "../components/EducationCard";

export default function Home() {
  const homeRef = useRef(null);
  const knowMeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const projectsToggleButtonRef = useRef(null);

  const [showAllProjects, setShowAllProjects] = useState(false);
  const projects = showAllProjects ? allProjects : allProjects.slice(0, 4);

  // useEffect(() => {
  //   !showAllProjects &&
  //     projectsToggleButtonRef.current.scrollIntoView({
  //       behaviour: "smooth",
  //       block: "center",
  //     });
  // }, [showAllProjects]);

  return (
    <div id="home-root" className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-sans">
      <Head>
        <title>{"Muhsin Bin Irshad"}</title>
      </Head>
      <NavigationBar
        locations={[
          { label: "Home", ref: homeRef },
          { label: "Projects", ref: projectsRef },
          { label: "Know Me", ref: knowMeRef },
          { label: "About", ref: aboutRef },
        ]}
      />
      {/* Home */}
      <div ref={homeRef}>
        <Hero
          onProjectsClick={() =>
                  projectsRef.current.scrollIntoView({
                    behaviour: "smooth",
                    block: "start",
                  })
                }
          onKnowMeClick={() =>
                  knowMeRef.current.scrollIntoView({
                    behaviour: "smooth",
                    block: "start",
                  })
                }
        />
        </div>

      {/* Projects */}
      <section ref={projectsRef} className="bg-black py-24 px-8">
        <div className="container mx-auto max-w-screen-xl">
          <h2 className="inline-block w-auto text-gray-100 lg:mb-3">
            <small className="text-primary tracking-widest flex items-center text-base font-bold uppercase after:bg-brand mb-3 ml-1">
              Highlight
            </small>
            Projects
          </h2>
          <ProjectCard highlight={true} project={projects[0]} />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-16 my-12">
            {projects.slice(1).map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
          {allProjects.length > 4 && (
            <div ref={projectsToggleButtonRef} className="flex justify-center">
              <SecondaryButton
                Icon={showAllProjects ? BsChevronUp : BsChevronDown}
                bounceIconOnHover={true}
                onClick={() => setShowAllProjects(!showAllProjects)}
              >
                {showAllProjects
                  ? "SHOW LESS"
                  : `VIEW ALL ${allProjects.length} PROJECTS`}
              </SecondaryButton>
            </div>
          )}
        </div>
      </section>
      {/* Skills */}
      <section
        ref={knowMeRef}
        className="bg-black py-24 px-8"
      >
        <div className="container mx-auto max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 gap-y-16">
          <h2 className="text-gray-900 dark:text-gray-100 w-full lg:w-1/2">
            <small className="text-primary tracking-widest flex items-center text-base font-bold uppercase mb-3 ml-1">
              Things I got my
            </small>
            hands on
          </h2>
          <div className="lg:pt-5">
            <SkillCard category="Frameworks" skills={frameworks} />
          </div>
          <SkillCard category="IoT" skills={iot} />
          <SkillCard category="Languages" skills={langs} />
          <SkillCard category="Platforms" skills={platforms} />
          <SkillCard category="Databases" skills={db} />
          <SkillCard category="Other Tools" skills={otherTools} />
          <SkillCard category="ML Models" skills={Models} />
        </div>
      </section>
      {/* About */}
      <section
        ref={aboutRef}
        className="bg-black py-24 px-8"
      >
        <div className="container mx-auto max-w-screen-xl flex flex-col lg:flex-row">
          <h2 className="text-white w-full lg:w-1/2">
            <small className="text-primary tracking-widest flex items-center text-base font-bold uppercase mb-3 ml-1">
              About
            </small>
            Myself
          </h2>
          <div className="w-full mt-6 lg:mt-0 lg:w-1/2 mb-10 lg:text-lg py-4">
            <ul className="flex flex-col gap-12 lg:gap-8">
              {abouts.map((about, index) => (
                <AboutCard
                  key={index}
                  about={about}
                  isFirst={index === 0}
                  isLast={index === abouts.length - 1}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* Education Section */}
      <section className="bg-black py-24 px-8">
        <div className="container mx-auto max-w-screen-xl flex flex-col lg:flex-row">
          <h2 className="text-white w-full lg:w-1/2">
            <small className="text-primary tracking-widest flex items-center text-base font-bold uppercase mb-3 ml-1">
              Education
            </small>
            My Education
          </h2>
        </div>
        <div className="flex justify-center mt-12 animate-fade-in">
          <div className="p-2 sm:p-4 md:p-6 lg:p-8">
            <EducationCard />
          </div>
        </div>
      </section>
    </div>
  );
}
