"use client";

import { useEffect, useState } from "react";

const SHAPES = ['circle', 'square'];
const COLORS = ['bg-primary', 'bg-secondary', 'bg-primary-container', 'bg-secondary-fixed'];

interface ShapeData {
  id: number;
  type: string;
  color: string;
  size: number;
  top: number;
  left: number;
  rotate: number;
  hoverRotate: number;
}

export default function DecorativeShapes() {
  const [shapes, setShapes] = useState<ShapeData[]>([]);

  useEffect(() => {
    // Generate 3 to 7 random shapes on mount (client-side only to avoid hydration mismatch)
    const count = Math.floor(Math.random() * 5) + 3;
    
    const generated = Array.from({ length: count }).map((_, i) => {
      const type = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size = Math.floor(Math.random() * 120) + 40; // 40px to 160px
      const top = Math.floor(Math.random() * 120) - 10; // -10% to 110%
      const left = Math.floor(Math.random() * 120) - 10; // -10% to 110%
      const rotate = Math.floor(Math.random() * 360);
      const hoverRotate = rotate + (Math.random() > 0.5 ? 45 : -45); // Rotate randomly on hover
      
      return { id: i, type, color, size, top, left, rotate, hoverRotate };
    });
    
    setShapes(generated);
  }, []);

  if (shapes.length === 0) return null;

  return (
    <>
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`absolute z-0 opacity-[0.15] border-[3px] border-black transition-all duration-700 hover:scale-125 ${
            shape.color
          } ${shape.type === 'circle' ? 'rounded-full' : ''}`}
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            top: `${shape.top}%`,
            left: `${shape.left}%`,
            transform: `rotate(${shape.rotate}deg)`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = `rotate(${shape.hoverRotate}deg) scale(1.25)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = `rotate(${shape.rotate}deg) scale(1)`;
          }}
        />
      ))}
    </>
  );
}
