import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EducationCard from "@/components/EducationCard";
import ExperienceCard from "@/components/ExperienceCard";
import ProjectCard from "@/components/ProjectCard";
import DecorativeShapes from "@/components/DecorativeShapes";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getProjects, getEducation, getExperience, getSettings } from "@/lib/data";
import SkillBadge from "@/components/SkillBadge";
import AuthErrorToast from "@/components/AuthErrorToast";

export const revalidate = 60; // Cache the page for 60 seconds (ISR)

export default async function Home() {
  const [dbProjects, dbEducation, dbExperience, settings] = await Promise.all([
    getProjects(),
    getEducation(),
    getExperience(),
    getSettings(),
  ]);

  // Fallback to placeholders if database is empty so initial view isn't blank
  const education = dbEducation.length > 0 ? dbEducation : [
    {
      id: "placeholder-edu-1",
      degree: "Bachelor of Computer Science",
      institution: "Tech University",
      duration: "2023 - 2027",
      description: "Focused on Data Structures, Algorithms, Web Development, and UI/UX Design. Maintaining a strong academic record while building side projects."
    }
  ];

  const experience = dbExperience.length > 0 ? dbExperience : [
    {
      id: "placeholder-exp-1",
      position: "Frontend Developer Intern",
      organization: "Tech Startup Inc.",
      duration: "Summer 2024",
      description: "Built responsive UI components using React and Tailwind CSS. Collaborated with designers to translate high-fidelity mocks into performant code."
    }
  ];

  // The user explicitly requested: if projects is empty, do NOT display the section.
  // We will still provide fallback placeholders for initial rendering if DB is completely empty, 
  // but if the user manually deleted them from CMS, dbProjects will be empty.
  // Let's assume if it's entirely fresh we show placeholders, but if we are in production we hide it.
  const projects = dbProjects.length > 0 ? dbProjects : (process.env.NODE_ENV === "development" ? [
    {
      id: "placeholder-proj-1",
      title: "Portfolio CMS",
      description: "A full-stack portfolio built with Next.js, Prisma, and Tailwind CSS.",
      liveDemo: "#",
      github: "#",
      thumbnail: null
    },
    {
      id: "placeholder-proj-2",
      title: "Algorithm Visualizer",
      description: "Interactive web app to visualize sorting and pathfinding algorithms.",
      liveDemo: null,
      github: "#",
      thumbnail: null
    }
  ] : []);

  const showExperience = experience.length > 0;
  const showProjects = projects.length > 0;

  return (
    <main className="min-h-screen">
      <AuthErrorToast />
      <Navbar title={settings.site_title} />
      
      <div className="max-w-7xl mx-auto px-6 pb-16 md:pb-24 space-y-24">
        
        {/* Hero Section */}
        <div className="pt-8 md:pt-10 pb-12 md:pb-16">
          <Hero
            title={settings.hero_title}
            subtitle={settings.hero_subtitle}
            description={settings.hero_description}
            cvUrl={settings.cvUrl}
            portraitUrl={settings.portraitUrl}
            availableForWork={settings.available_for_work !== "false"}
          />
        </div>

        {/* About Me Section */}
        {/* About Me Section */}
        <section id="about" className="bg-surface-container border-[3px] border-black p-8 md:p-12 neobrutal-shadow relative overflow-hidden group">
          {/* Decorative shapes */}
          <DecorativeShapes />
          
          <div className="relative z-10">
            <h2 className="font-heading text-4xl md:text-5xl font-black text-on-surface mb-6">
              About Me
            </h2>
            <p className="font-body text-lg md:text-xl text-on-surface leading-relaxed">
              {settings.about_text || "About text goes here..."}
            </p>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="expertise" className="bg-surface-container-highest border-[3px] border-black p-8 md:p-12 neobrutal-shadow relative overflow-hidden group">
          {/* Decorative shapes */}
          <DecorativeShapes />
          
          <div className="relative z-10">
            <h2 className="font-heading text-4xl md:text-5xl font-black text-on-surface mb-8">
              Skills
            </h2>
            <div className="flex flex-wrap gap-4 mt-2">
              {(settings.skills || []).map((tech: string) => (
                <SkillBadge key={tech} tech={tech} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        {showProjects && (
          <section id="work" className="space-y-12">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-[64px] font-black text-on-surface">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 gap-12">
              {projects.map((proj) => (
                <ProjectCard
                  key={proj.id}
                  title={proj.title}
                  description={proj.description}
                  thumbnail={proj.thumbnail}
                  github={proj.github}
                  liveDemo={proj.liveDemo}
                />
              ))}
            </div>
          </section>
        )}

        {/* Experience & Education Section */}
        <section id="education" className="space-y-12">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-[64px] font-black text-on-surface">
            Experience & Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Experience Column */}
            {showExperience && (
              <div id="experience" className="flex flex-col gap-8">
                {experience.map((exp) => (
                  <ExperienceCard
                    key={exp.id}
                    position={exp.position}
                    organization={exp.organization}
                    duration={exp.duration}
                    description={exp.description}
                  />
                ))}
              </div>
            )}
            
            {/* Education Column */}
            <div className="flex flex-col gap-8">
              {education.map((edu) => (
                <EducationCard
                  key={edu.id}
                  degree={edu.degree}
                  institution={edu.institution}
                  duration={edu.duration}
                  description={edu.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-primary text-on-primary border-[4px] border-black p-12 md:p-24 neobrutal-shadow-lg text-center space-y-12 relative overflow-hidden group">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 2px, transparent 0)", backgroundSize: "24px 24px" }} />
          
          <DecorativeShapes />

          <h2 className="font-heading text-4xl md:text-5xl lg:text-[64px] font-black relative z-10">
            Let's Connect
          </h2>
          <div className="relative z-10">
            <ContactSection email={settings.contact_email} socialLinks={settings.social_links} />
          </div>
        </section>

      </div>
      
      <Footer email={settings.contact_email} socialLinks={settings.social_links} title={settings.site_title} />
    </main>
  );
}
