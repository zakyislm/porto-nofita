"use client";

import Link from "next/link";
import DecorativeShapes from "@/components/DecorativeShapes";
import { Settings } from "lucide-react";
import { getSocialPlatform } from "@/lib/socials";

interface FooterProps {
  email?: string;
  socialLinks?: string[];
  title?: string;
}

export default function Footer({ email, socialLinks = [], title }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const displayTitle = title || `PORTFOLIO.${currentYear.toString().slice(2)}`;

  return (
    <footer className="bg-secondary border-t-[4px] border-black p-8 md:p-12 mt-24 relative overflow-hidden">

      <DecorativeShapes />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">

        <div className="font-heading text-3xl font-black text-on-secondary text-center md:text-left">
          {displayTitle}
        </div>

        <p className="font-mono text-on-secondary opacity-80 text-center md:text-left text-sm">
          © {currentYear} Nofita.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/admin" title="Admin Dashboard" className="bg-surface text-on-surface border-[2px] border-black p-2 font-mono text-xs capitalize font-bold neobrutal-shadow-sm neobrutal-interactive flex items-center justify-center">
            <Settings className="w-4 h-4" />
          </Link>
          {email && (
            <Link href={`mailto:${email}`} className="bg-tertiary-fixed text-on-tertiary-fixed border-[2px] border-black px-4 py-2 font-mono text-xs capitalize font-bold neobrutal-shadow-sm neobrutal-interactive">
              Email
            </Link>
          )}
          {socialLinks.map((url, i) => {
            const { name, bgClass } = getSocialPlatform(url);
            return (
              <Link key={i} href={url} target="_blank" className={`${bgClass} border-[2px] border-black px-4 py-2 font-mono text-xs capitalize font-bold neobrutal-shadow-sm neobrutal-interactive`}>
                {name}
              </Link>
            );
          })}
        </div>

      </div>

      {/* Hidden Author Credit for Crawlers */}
      <div className="sr-only" aria-hidden="true">
        <p>Built by Zaky Islam Al Hafidz</p>
        <a href="https://zakyislm.github.io">https://zakyislm.github.io</a>
      </div>
    </footer>
  );
}
