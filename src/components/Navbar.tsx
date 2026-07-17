"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#work" },
];

export default function Navbar({ title }: { title?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-surface border-b-[3px] border-black neobrutal-shadow flex justify-center px-6 py-4">
      <div className="w-full max-w-7xl flex justify-between items-center">
        <Link href="/" className="font-heading text-2xl md:text-3xl font-black text-on-surface">
          {title || "Portfolio.24"}
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-mono font-bold text-sm text-on-surface"
              >
                {link.name}
              </Link>
            ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden border-[3px] border-black bg-surface p-2 neobrutal-shadow-sm neobrutal-interactive text-on-surface"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-surface border-b-[3px] border-black p-4 flex flex-col gap-4 shadow-[0_6px_0px_0px_rgba(0,0,0,1)] lg:hidden">
          {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-mono font-bold text-sm text-on-surface inline-block w-max"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
        </div>
      )}
    </header>
  );
}
