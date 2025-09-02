"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  delay?: number;
}

export default function TestimonialCard({ name, role, content, rating, delay = 0 }: TestimonialProps) {
  return (
    <motion.div
      className="card-glass p-8 hover:bg-card/90 transition-all duration-300 group h-full flex flex-col"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
    >
      <div className="flex items-center justify-center mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating
                ? 'text-accent fill-accent'
                : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
      <blockquote className="text-muted-foreground mb-6 italic text-center flex-grow leading-relaxed">
        "{content}"
      </blockquote>
      <div className="text-center">
        <p className="font-bold text-foreground font-display text-lg">{name}</p>
        <p className="text-sm text-primary mt-1">{role}</p>
      </div>
    </motion.div>
  );
}

