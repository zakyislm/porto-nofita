"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  portraitUrl?: string;
  cvUrl?: string;
  availableForWork?: boolean;
}

export default function Hero({
  title = "Nofita",
  subtitle = "Digital creator crafting meaningful experiences.",
  description = "Specializing in public relations, social media strategy, and SEO. Passionate about building highly performant web applications and intuitive interfaces.",
  portraitUrl = "/portrait.png",
  cvUrl,
  availableForWork = true,
}: HeroProps) {
  const isVideo = portraitUrl.match(/\.(mp4|webm|ogg)$/i);
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
      <div className="lg:col-span-7 bg-primary-container border-[4px] border-black p-6 md:p-8 lg:p-10 neobrutal-shadow-lg relative overflow-hidden">
        <div className="space-y-6 relative z-10">
          <span className="inline-block bg-secondary-fixed text-on-secondary-fixed font-mono font-bold px-3 py-1 border-[3px] border-black text-sm capitalize">
            HELLO, I'M {title.toUpperCase()}
          </span>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-[56px] leading-[1.1] tracking-[-0.04em] font-black text-on-primary-container">
            {subtitle}
          </h1>
          <p className="font-body text-base md:text-lg text-on-primary-container max-w-lg opacity-90 leading-relaxed font-medium">
            {description}
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link 
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-secondary text-white border-[3px] border-black px-8 md:px-10 py-4 font-mono font-bold text-lg neobrutal-shadow neobrutal-interactive"
            >
              Get in Touch
              <ArrowUpRight className="w-6 h-6" />
            </Link>
            {cvUrl ? (
              <a 
                href="/api/cv"
                download
                className="inline-flex items-center justify-center gap-2 bg-surface text-on-surface border-[3px] border-black px-8 md:px-10 py-4 font-mono font-bold text-lg neobrutal-shadow neobrutal-interactive"
              >
                Download CV
                <DownloadIcon className="w-6 h-6" />
              </a>
            ) : (
              <button 
                disabled
                className="inline-flex items-center justify-center gap-2 bg-surface text-on-surface/50 border-[3px] border-black/50 px-8 md:px-10 py-4 font-mono font-bold text-lg cursor-not-allowed"
              >
                Download CV
                <DownloadIcon className="w-6 h-6 opacity-50" />
              </button>
            )}
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-12 -right-8 w-32 h-32 rounded-full bg-secondary border-[4px] border-black opacity-40 z-0" />
        <div className="absolute top-1/2 -left-10 w-20 h-20 bg-surface border-[4px] border-black -rotate-12 opacity-30 z-0" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary-fixed-dim border-[4px] border-black rotate-12 opacity-50 z-0" />
      </div>

      <div className="lg:col-span-5 flex justify-center">
        <div className="relative w-full max-w-[280px]">
          <div className="w-full aspect-square border-[4px] border-black neobrutal-shadow-lg bg-surface-container overflow-hidden relative">
            {isVideo ? (
              <video
                src={portraitUrl}
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full"
              />
            ) : (
              <Image
                src={portraitUrl}
                alt={`Portrait of ${title}`}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
          {availableForWork && (
            <div className="absolute -top-4 -right-4 bg-secondary-fixed text-on-secondary-fixed border-[3px] border-black p-2 neobrutal-shadow-sm font-mono text-xs font-bold animate-bounce capitalize">
              AVAILABLE FOR WORK
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
