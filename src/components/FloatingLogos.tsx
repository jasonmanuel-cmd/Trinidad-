"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface FloatLogo {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  opacity: number;
  rotate: number;
}

export default function FloatingLogos() {
  const [logos, setLogos] = useState<FloatLogo[]>([]);

  useEffect(() => {
    const generated: FloatLogo[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 24 + Math.random() * 40,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 5,
      driftX: -30 + Math.random() * 60,
      driftY: -30 + Math.random() * 60,
      opacity: 0.04 + Math.random() * 0.04,
      rotate: Math.random() * 360,
    }));
    setLogos(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {logos.map((logo) => (
        <div
          key={logo.id}
          className="absolute"
          style={{
            left: `${logo.x}%`,
            top: `${logo.y}%`,
            width: `${logo.size}px`,
            height: `${logo.size}px`,
            opacity: logo.opacity,
            animation: `float-${logo.id} ${logo.duration}s ease-in-out ${logo.delay}s infinite alternate`,
          }}
        >
          <div
            className="w-full h-full rounded-full overflow-hidden"
            style={{
              animation: `spin-slow ${logo.duration * 2}s linear infinite`,
              transform: `rotate(${logo.rotate}deg)`,
            }}
          >
            <Image
              src="/trippy'sheadstashlogo.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>
      ))}

      <style jsx>{`
        ${logos.map((logo) => `
          @keyframes float-${logo.id} {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(${logo.driftX * 0.5}px, ${logo.driftY * 0.3}px) scale(1.1);
            }
            66% {
              transform: translate(${logo.driftX * -0.3}px, ${logo.driftY * 0.7}px) scale(0.95);
            }
            100% {
              transform: translate(${logo.driftX}px, ${logo.driftY}px) scale(1.05);
            }
          }
        `).join('\n')}
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
