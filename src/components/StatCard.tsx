"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatCardProps {
  value: string;
  label: string;
  icon: ReactNode;
  delay?: number;
}

export default function StatCard({ value, label, icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      className="card-glass p-8 hover:bg-card/90 transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="text-center">
        <div className="text-5xl mb-4 group-hover:animate-float">{icon}</div>
        <div className="text-4xl font-bold text-gradient mb-2 font-display">
          {value}
        </div>
        <div className="text-muted-foreground font-medium">{label}</div>
      </div>
    </motion.div>
  );
}

