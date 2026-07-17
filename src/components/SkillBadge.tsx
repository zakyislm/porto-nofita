"use client";

import { Sparkles } from "lucide-react";

export default function SkillBadge({ tech }: { tech: string }) {
  return (
    <span className="bg-secondary-fixed text-on-secondary-fixed border-[3px] border-black px-6 py-3 font-mono font-bold text-lg neobrutal-shadow-sm hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-3">
      <Sparkles className="w-5 h-5" />
      {tech}
    </span>
  );
}
