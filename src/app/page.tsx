"use client";
import { motion } from "framer-motion";
import { Leaf, Award, Users, ArrowRight, Recycle, Target, Globe } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import Image from "next/image"; // Add this import
import heroImage from "@/src/assets/eco-hero.jpg";

// Dynamically import components with no SSR
const FeatureCard = dynamic(() => import("@/src/components/FeatureCard"), { ssr: false });
const TestimonialCard = dynamic(() => import("@/src/components/TestimonialCard"), { ssr: false });
const WasteCounter = dynamic(() => import("@/src/components/WasteCounter"), { ssr: false });
// Add this import for Button component
import { Button } from "@/src/components/ui/button";

export default function Page() {
  const features = [
    {
      icon: <Leaf className="h-12 w-12 text-eco-primary" />,
      title: "Track Your Impact",
      description:
        "Monitor your recycling activities and see your environmental contribution in real-time with advanced analytics.",
    },
    {
      icon: <Award className="h-12 w-12 text-eco-accent" />,
      title: "Earn Blockchain Rewards",
      description:
        "Convert your recycling efforts into blockchain tokens and unlock exclusive eco-friendly rewards.",
    },
    {
      icon: <Users className="h-12 w-12 text-eco-primary-light" />,
      title: "Global Community",
      description:
        "Connect with eco-warriors worldwide and participate in sustainability challenges that matter.",
    },
  ];
  
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Environmental Activist",
      content:
        "Eco_Chain has revolutionized my recycling habits. The rewards system creates genuine motivation for sustainable living.",
      rating: 5,
    },
    {
      name: "Sarah Williams",
      role: "Sustainability Blogger",
      content:
        "The community features and leaderboards make environmental action engaging and social. It's brilliant!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Tech Entrepreneur",
      content:
        "Combining blockchain technology with environmental impact is the future. This platform delivers on that promise.",
      rating: 5,
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-6 bg-gradient-to-b from-eco-light to-background w-full flex flex-col items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-eco-primary/5 to-eco-accent/5"></div>
        <div className="max-w-7xl w-full flex flex-col items-center relative z-10">
          <div className="flex flex-col items-center w-full text-center">
            <motion.h1
              className="text-5xl lg:text-7xl xl:text-8xl font-extrabold font-display text-eco-dark leading-tight tracking-tight mb-6 text-center w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-center">
                Eco_Chain
                <motion.span
                  className="ml-4 text-eco-primary inline-block text-6xl lg:text-8xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  🌱
                </motion.span>
              </div>
            </motion.h1>
          </div>
          
          {/* Caption */}
          <div className="flex flex-col items-center w-full max-w-5xl text-center">
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl mb-10 leading-relaxed text-eco-dark/80 font-medium text-center w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform your waste into blockchain rewards. Track your environmental impact,
              compete globally, and help build a sustainable future for our planet.
            </motion.p>
          </div>
          
          {/* Hero Image */}
          <motion.div
            className="mb-12 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Image 
              src={heroImage} 
              alt="Eco-friendly planet with recycling symbols" 
              className="w-full max-w-4xl h-auto object-cover"
              width={1200} // Add width and height for Next.js Image component
              height={600}
              priority // Add priority for hero image
            />
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex justify-center"
            >
              <Link href="/upload" className="w-full sm:w-auto flex justify-center">
                <Button variant="eco-gradient" size="xl" className="w-full sm:w-auto">
                  <Recycle className="h-6 w-6 mr-2" />
                  Upload Waste
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex justify-center"
            >
              <Link href="/leaderboard" className="w-full sm:w-auto flex justify-center">
                <Button variant="eco-outline" size="xl" className="w-full sm:w-auto">
                  <Target className="h-6 w-6 mr-2" />
                  View Leaderboard
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Waste Counter */}
          <div className="w-full flex justify-center items-center text-center">
            <WasteCounter />
          </div>
        </div>
      </section>
      
      {/* Global Impact */}
      <section className="py-24 bg-background w-full flex flex-col items-center">
        <div className="max-w-5xl w-full flex flex-col items-center px-6">
          {/* Heading */}
          <div className="flex flex-col items-center w-full text-center">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-eco-dark mb-16 text-center w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Global Impact 🌍
            </motion.h2>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
            {[
              { emoji: "♻️", value: "1.1M", label: "Plastic Bottles Recycled" },
              { emoji: "👥", value: "45k", label: "Active Users" },
              { emoji: "🌱", value: "95%", label: "Sustainable Practices" }
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-eco-primary/10 w-full"
                >
                  <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-eco-primary mb-4">
                    {stat.emoji} {stat.value}
                  </p>
                  <p className="text-lg md:text-xl text-muted-foreground font-medium">{stat.label}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="relative py-24 px-6 bg-eco-light w-full flex flex-col items-center">
        <div className="max-w-7xl w-full flex flex-col items-center">
          {/* Heading */}
          <div className="flex flex-col items-center w-full text-center">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-eco-dark mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              How It Works ⚡
            </motion.h2>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full">
            {features.map((feature, index) => (
              <div key={index} className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  className="w-full max-w-md"
                >
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="relative py-24 px-6 bg-background w-full flex flex-col items-center">
        <div className="max-w-7xl w-full flex flex-col items-center">
          <div className="flex flex-col items-center w-full text-center">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-16 font-display text-eco-dark"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Community Voices 💬
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  className="w-full max-w-md"
                >
                  <TestimonialCard {...testimonial} delay={index * 0.1} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-28 px-6 bg-gradient-to-b from-eco-primary/10 to-eco-accent/10 w-full flex flex-col items-center">
        <div className="max-w-4xl w-full flex flex-col items-center px-4">
          <div className="flex flex-col items-center w-full text-center">
            <motion.div
              className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 md:p-16 w-full flex flex-col items-center border border-eco-primary/20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Heading */}
              <motion.h3
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-eco-dark"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Ready to Transform the World? 🌍
              </motion.h3>
              
              {/* Subtext */}
              <motion.p
                className="text-xl md:text-2xl text-eco-dark/80 mb-12 leading-relaxed max-w-3xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Join thousands of eco-warriors already making a difference.  
                Start your sustainable journey today.
              </motion.p>
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/upload">
                  <Button variant="eco-gradient" size="xl" className="text-xl px-12 py-6">
                    <Globe className="h-7 w-7 mr-3" />
                    Start Recycling Now
                    <ArrowRight className="h-6 w-6 ml-3" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

