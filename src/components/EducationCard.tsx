"use client";

import DecorativeShapes from "./DecorativeShapes";

interface EducationCardProps {
  degree: string;
  institution: string;
  duration: string;
  description?: string | null;
}

const formatDuration = (duration: string) => {
  const parts = duration.split('-').map(s => s.trim());
  if (parts.length < 2) return duration;
  
  const start = parts[0];
  const end = parts[1];
  
  if (!end || end.toLowerCase() === 'present' || end.toLowerCase() === 'now') {
    return `${start} - Now`;
  }
  
  const endYear = parseInt(end, 10);
  const currentYear = new Date().getFullYear();
  
  if (!isNaN(endYear) && endYear > currentYear) {
    return `${start} - Now`;
  }
  
  return `${start} - ${end}`;
};

export default function EducationCard({
  degree,
  institution,
  duration,
  description,
}: EducationCardProps) {
  return (
    <div className="bg-surface-container border-[3px] border-black p-6 md:p-8 neobrutal-shadow flex flex-col justify-between relative overflow-hidden group">
      {/* Decorative background shapes */}
      <DecorativeShapes />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-4">
          <h3 className="font-heading text-2xl font-bold text-on-surface">
            {degree}
          </h3>
          <span className="bg-secondary-fixed text-on-secondary-fixed border-[2px] border-black px-3 py-1 font-mono text-sm font-bold capitalize whitespace-nowrap self-start">
            {formatDuration(duration)}
          </span>
        </div>
        <p className="font-mono font-bold text-primary mt-2">
          {institution}
        </p>
        {description && (
          <p className="font-body text-base text-on-surface-variant mt-4 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
