"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export default function AnimatedParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 5 + 2, // smaller and subtle
          delay: Math.random() * -20,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener("resize", generateParticles);
    return () => window.removeEventListener("resize", generateParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/20" // subtle white overlay
          initial={{
            x: particle.x,
            y: particle.y,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [particle.y, particle.y - 200, particle.y - 400],
            x: [
              particle.x,
              particle.x + (Math.random() - 0.5) * 200,
              particle.x + (Math.random() - 0.5) * 400,
            ],
            opacity: [0, 0.3, 0], // keep it light
          }}
          transition={{
            duration: Math.random() * 20 + 15, // slower movement
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
