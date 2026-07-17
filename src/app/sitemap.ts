import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use a base URL from env if available, otherwise default to localhost (should be changed for prod)
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

  // Find the latest update across projects, experience, education, or settings
  // to set the accurate `lastModified` date for the sitemap.
  
  let lastModified = new Date();
  try {
    const latestProject = await prisma.project.findFirst({ orderBy: { updatedAt: 'desc' } });
    const latestExp = await prisma.experience.findFirst({ orderBy: { updatedAt: 'desc' } });
    
    // Compare and get the most recent date
    const dates = [
      latestProject?.updatedAt,
      latestExp?.updatedAt,
    ].filter(Boolean) as Date[];

    if (dates.length > 0) {
      lastModified = new Date(Math.max(...dates.map(d => d.getTime())));
    }
  } catch (error) {
    // If DB fails, fallback to current date
    console.error("Failed to fetch latest updates for sitemap", error);
  }

  return [
    {
      url: baseUrl,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
