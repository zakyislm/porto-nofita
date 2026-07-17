"use client";

import Link from "next/link";
import { ArrowUpRight, Code } from "lucide-react";
import Image from "next/image";

import DecorativeShapes from "./DecorativeShapes";

interface ProjectCardProps {
  title: string;
  description: string;
  thumbnail?: string | null;
  github?: string | null;
  liveDemo?: string | null;
}

export default function ProjectCard({
  title,
  description,
  thumbnail,
  github,
  liveDemo,
}: ProjectCardProps) {
  return (
    <article className="group bg-surface-container-low border-[4px] border-black neobrutal-shadow-lg flex flex-col h-full relative overflow-hidden">
      {/* Decorative background shapes */}
      <DecorativeShapes />

      {/* Thumbnail (Hidden if no image) */}
      {thumbnail && (
        <div className="w-full h-[250px] md:h-[320px] bg-secondary-container border-b-[4px] border-black overflow-hidden shrink-0 relative z-10">
          <Image
            src={thumbnail}
            alt={title}
            width={800}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-1 gap-6 relative z-10">
        <div className="flex-1">
          <h3 className="font-heading text-2xl md:text-[32px] leading-[1.2] font-bold text-on-surface">
            {title}
          </h3>
          <p className="font-body text-base text-on-surface-variant mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 mt-auto">
          {liveDemo && (
            <Link
              href={liveDemo}
              target="_blank"
              className="bg-primary text-on-primary border-[3px] border-black px-6 py-2 font-mono font-bold text-sm neobrutal-shadow-sm neobrutal-interactive flex items-center gap-2"
            >
              Live Demo <ArrowUpRight className="w-5 h-5" />
            </Link>
          )}
          {github && (
            <Link
              href={github}
              target="_blank"
              className="bg-surface border-[3px] border-black px-6 py-2 font-mono font-bold text-sm neobrutal-shadow-sm neobrutal-interactive flex items-center gap-2"
            >
              <Code className="w-5 h-5" /> Source
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
