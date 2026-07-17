"use client";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto mb-16">
      {subtitle && (
        <span className="text-secondary font-bold tracking-widest capitalize text-sm mb-3">
          {subtitle}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-text">
        {title}
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mt-6 rounded-full" />
    </div>
  );
}
