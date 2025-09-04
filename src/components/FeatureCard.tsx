"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import Image from "next/image";

interface FeatureCardProps {
  icon?: ReactNode;
  customIcon?: string;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({ icon, customIcon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      className="card-glass p-8 hover:bg-card/90 transition-all duration-300 group h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
    >
      <div className="text-center">
        <div className="mb-6 flex justify-center group-hover:animate-float">
          {customIcon ? (
            <Image src={customIcon} width={48} height={48} alt={title} className="h-12 w-12" />
          ) : icon ? (
            icon
          ) : null}
        </div>
        <h3 className="text-2xl font-bold mb-4 text-foreground font-display">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

