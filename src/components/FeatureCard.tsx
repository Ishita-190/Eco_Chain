
"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="bg-white/80 backdrop-blur-sm border-eco-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
        <CardContent className="p-8 text-center h-full flex flex-col justify-center">
          <motion.div
            className="mb-6 flex justify-center"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
          <h3 className="text-2xl font-bold text-eco-dark mb-4 font-display">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;

