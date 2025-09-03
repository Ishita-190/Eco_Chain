"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  delay?: number;
}

const TestimonialCard = ({ name, role, content, rating, delay = 0 }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="bg-white/90 backdrop-blur-sm border-eco-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
        <CardContent className="p-8 h-full flex flex-col">
          <div className="flex items-center justify-center mb-4">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed flex-grow italic text-center">
            "{content}"
          </blockquote>
          <div className="flex items-center justify-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-eco-primary text-white font-semibold">
                {name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-semibold text-eco-dark">{name}</p>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;
