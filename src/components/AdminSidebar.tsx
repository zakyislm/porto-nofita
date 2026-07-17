"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";

const sections = [
  { name: "Settings", href: "/admin/settings" },
  { name: "Hero", href: "/admin/hero" },
  { name: "About", href: "/admin/about" },
  { name: "Education", href: "/admin/education" },
  { name: "Experience", href: "/admin/experience" },
  { name: "Projects", href: "/admin/projects" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="w-full md:w-64 lg:w-72 border-b-[4px] md:border-b-0 md:border-r-[4px] border-black bg-surface-container-highest md:min-h-screen shrink-0 flex flex-col z-20">
      {/* Header & Mobile Toggle */}
      <div className="p-6 flex justify-between items-center md:block md:mb-8 md:pb-0">
        <div>
          <h1 className="text-3xl font-heading font-black text-on-surface capitalize leading-none">
            Dashboard
          </h1>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 border-[3px] border-black bg-surface text-on-surface neobrutal-shadow-sm active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Nav Content */}
      <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col flex-1 p-6 pt-0 md:pt-0`}>
        <nav className="flex-1 flex flex-col gap-3">
          {sections.map((section) => {
            const isActive = pathname?.startsWith(section.href);
            return (
              <Link
                key={section.name}
                href={section.href}
                onClick={() => setIsOpen(false)}
                className={`block border-[3px] border-black px-4 py-3 font-mono font-bold text-on-surface neobrutal-interactive ${
                  isActive ? "bg-primary-container text-on-primary-container neobrutal-shadow" : "bg-surface"
                }`}
              >
                {section.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-8 md:mt-12">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="block w-full text-center border-[3px] border-black bg-primary text-on-primary px-4 py-3 font-mono font-bold neobrutal-interactive capitalize"
          >
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
