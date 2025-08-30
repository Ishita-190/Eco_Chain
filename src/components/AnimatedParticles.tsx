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
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 8 + 2,
          delay: Math.random() * -20,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener('resize', generateParticles);
    return () => window.removeEventListener('resize', generateParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/20 backdrop-blur-sm"
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
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
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
