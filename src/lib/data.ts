import { prisma } from "./prisma";

export async function getProjects() {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getEducation() {
  return prisma.education.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getExperience() {
  return prisma.experience.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getWhitelist() {
  return prisma.whitelist.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function isEmailWhitelisted(email: string): Promise<boolean> {
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_EMAIL.toLowerCase() === email.toLowerCase()) {
    return true;
  }
  const entry = await prisma.whitelist.findUnique({ where: { email } });
  return !!entry;
}

export type SettingsMap = {
  hero_title?: string;
  hero_subtitle?: string;
  hero_description?: string;
  about_text?: string;
  skills?: string[];
  contact_email?: string;
  social_links?: string[];
  site_title?: string;
  site_description?: string;
  cvUrl?: string;
  portraitUrl?: string;
  [key: string]: any;
};

export async function getSettings(): Promise<SettingsMap> {
  const settings = await prisma.setting.findMany();
  
  const map: SettingsMap = {};
  
  for (const s of settings) {
    if (s.key === "skills" || s.key === "social_links") {
      try {
        map[s.key] = JSON.parse(s.value);
      } catch (e) {
        map[s.key] = [];
      }
    } else {
      map[s.key] = s.value;
    }
  }
  
  return map;
}
