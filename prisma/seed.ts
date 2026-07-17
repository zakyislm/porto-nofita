const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Seed Settings (if empty)
  const settingsCount = await prisma.setting.count();
  if (settingsCount === 0) {
    const defaultSettings = [
      { key: "hero_title", value: "Nofita" },
      { key: "hero_subtitle", value: "Digital creator crafting meaningful experiences." },
      { key: "hero_description", value: "Specializing in public relations and social media strategy." },
      { key: "about_text", value: "I am a passionate PR specialist and content creator dedicated to helping brands find their voice in the digital noise. With a keen eye for aesthetics and a strategic approach to communication, I bridge the gap between creative vision and audience engagement." },
      { key: "skills", value: '["Public Relations", "Social Media Management", "Content Strategy", "Copywriting", "Brand Identity", "Event Coordination"]' },
      { key: "contact_email", value: "hello@nofita.com" },
      { key: "social_links", value: "[]" }, // Start with empty array, as requested (only email by default)
      { key: "site_title", value: "Porto | Nofita" },
      { key: "site_description", value: "Digital creator specializing in public relations and social media strategy." },
    ];

    for (const setting of defaultSettings) {
      await prisma.setting.upsert({
        where: { key: setting.key },
        update: {},
        create: setting,
      });
    }
    console.log("✅ Settings seeded.");
  }

  // 2. Seed Experience (if empty)
  const experienceCount = await prisma.experience.count();
  if (experienceCount === 0) {
    await prisma.experience.createMany({
      data: [
        {
          position: "Social Media Strategist",
          organization: "Creative Agency X",
          duration: "2023 - Present",
          description: "Spearheaded digital campaigns resulting in a 40% increase in brand engagement across Instagram and TikTok.",
        },
        {
          position: "PR Coordinator",
          organization: "Tech Startup Y",
          duration: "2021 - 2023",
          description: "Managed media relations and press releases, successfully securing coverage in major tech publications.",
        },
      ],
    });
    console.log("✅ Experience seeded.");
  }

  // 3. Seed Education (if empty)
  const educationCount = await prisma.education.count();
  if (educationCount === 0) {
    await prisma.education.createMany({
      data: [
        {
          degree: "Bachelor of Communications",
          institution: "State University",
          duration: "2017 - 2021",
          description: "Major in Public Relations. Graduated with Honors.",
        },
      ],
    });
    console.log("✅ Education seeded.");
  }

  // 4. Seed Projects (if empty)
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: "Brand Revamp Campaign",
          description: "A comprehensive social media overhaul for a lifestyle brand, including visual identity and content pillars.",
          thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop",
          github: "",
          liveDemo: "https://example.com/campaign",
        },
        {
          title: "Product Launch Event",
          description: "Orchestrated a virtual launch event with 5,000+ attendees and managed all pre-event promotional materials.",
          thumbnail: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop",
          github: "",
          liveDemo: "",
        },
      ],
    });
    console.log("✅ Projects seeded.");
  }

  console.log("🎉 Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
