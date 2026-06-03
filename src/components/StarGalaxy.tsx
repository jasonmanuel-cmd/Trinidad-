"use client";

import { useEffect, useRef } from "react";

export default function StarGalaxy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Star properties
    interface Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      vx: number;
      vy: number;
      twinklSpeed: number;
      color: string;
    }

    const stars: Star[] = [];
    const starCount = 150;

    // Tie-dye colors
    const tieDyeColors = [
      "rgba(232, 62, 107, 0.6)",   // Pink
      "rgba(6, 214, 160, 0.6)",    // Teal
      "rgba(139, 92, 246, 0.6)",   // Purple
      "rgba(255, 107, 53, 0.6)",   // Orange
      "rgba(212, 175, 55, 0.4)",   // Gold
    ];

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5,
        opacity: Math.random() * 0.7 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        twinklSpeed: Math.random() * 0.02 + 0.01,
        color: tieDyeColors[Math.floor(Math.random() * tieDyeColors.length)],
      });
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with semi-transparent black for trail effect
      ctx.fillStyle = "rgba(8, 8, 10, 0.02)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach((star) => {
        // Update position
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Twinkle effect
        star.opacity += star.twinklSpeed;
        if (star.opacity > 0.9 || star.opacity < 0.1) {
          star.twinklSpeed *= -1;
        }

        // Draw star as small glow
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.globalAlpha = star.opacity * 0.8;
        ctx.fillRect(star.x - star.size * 3, star.y - star.size * 3, star.size * 6, star.size * 6);

        // Draw core
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity;
        ctx.fillRect(star.x - star.size / 2, star.y - star.size / 2, star.size, star.size);
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-50 pointer-events-none"
      style={{ background: "linear-gradient(135deg, rgba(8,8,10,0.95) 0%, rgba(15,10,30,0.95) 100%)" }}
    />
  );
}
