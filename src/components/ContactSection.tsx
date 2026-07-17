"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { getSocialPlatform } from "@/lib/socials";

interface ContactSectionProps {
  email?: string;
  socialLinks?: string[];
}

export default function ContactSection({
  email,
  socialLinks = [],
}: ContactSectionProps) {
  return (
    <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6">
      {email && (
        <Link
          href={`mailto:${email}`}
          className="bg-tertiary-fixed text-on-tertiary-fixed border-[3px] border-black px-8 py-4 font-mono font-bold text-lg neobrutal-shadow neobrutal-interactive flex items-center gap-3 min-w-[200px] justify-center capitalize"
        >
          <Mail className="w-6 h-6" />
          Email
        </Link>
      )}

      {socialLinks.map((url, index) => {
        const { name, icon: Icon, bgClass } = getSocialPlatform(url);
        return (
          <Link
            key={index}
            href={url}
            target="_blank"
            className={`${bgClass} border-[3px] border-black px-8 py-4 font-mono font-bold text-lg neobrutal-shadow neobrutal-interactive flex items-center gap-3 min-w-[200px] justify-center capitalize`}
          >
            <Icon className="w-6 h-6" />
            {name}
          </Link>
        );
      })}
    </div>
  );
}
