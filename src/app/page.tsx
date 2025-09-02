"use client";
import { motion } from "framer-motion";
import { Leaf, Award, Users, ArrowRight, Recycle, Target, Globe } from "lucide-react";
import nextDynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import components with no SSR
const AnimatedParticles = nextDynamic(() => import("@/src/components/AnimatedParticles"), { ssr: false });
const StatCard = nextDynamic(() => import("@/src/components/StatCard"), { ssr: false });
const FeatureCard = nextDynamic(() => import("@/src/components/FeatureCard"), { ssr: false });
const TestimonialCard = nextDynamic(() => import("@/src/components/TestimonialCard"), { ssr: false });
const WasteCounter = nextDynamic(() => import("@/src/components/WasteCounter"), { ssr: false });

export default function Page() {
  const features = [
    {
      icon: <Leaf className="h-12 w-12 text-green-700" />,
      title: "Track Your Impact",
      description:
        "Monitor your recycling activities and see your environmental contribution in real-time with advanced analytics.",
    },
    {
      icon: <Award className="h-12 w-12 text-green-600" />,
      title: "Earn Blockchain Rewards",
      description:
        "Convert your recycling efforts into blockchain tokens and unlock exclusive eco-friendly rewards.",
    },
    {
      icon: <Users className="h-12 w-12 text-green-800" />,
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-100 to-green-300 text-gray-900">
      <AnimatedParticles />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-10 bg-gradient-to-b from-green-200 to-green-100 rounded-b-3xl shadow-lg">
        <div className="max-w-6xl w-full mx-auto text-center">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Heading */}
            <motion.h1
              className="text-7xl md:text-8xl font-extrabold mb-6 font-display text-green-900"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Eco_Chain
              <motion.span
                className="ml-4 text-green-700"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                🌱
              </motion.span>
            </motion.h1>
            
            {/* Caption */}
            <motion.p
              className="text-2xl md:text-3xl max-w-4xl mx-auto mb-10 leading-relaxed text-green-800 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform your waste into blockchain rewards. Track your environmental impact,
              compete globally, and help build a sustainable future for our planet.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/upload">
                <motion.button
                  className="btn-hero group bg-green-700 text-white hover:bg-green-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Recycle className="h-6 w-6 mr-2 group-hover:animate-spin" />
                  Upload Waste
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/leaderboard">
                <motion.button
                  className="btn-secondary group bg-green-100 text-green-800 hover:bg-green-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Target className="h-6 w-6 mr-2" />
                  View Leaderboard
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Waste Counter */}
          <WasteCounter />
        </div>
      </section>
      
      {/* Global Impact */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto text-center px-6">
          {/* Heading */}
          <motion.h2
            className="text-5xl md:text-6xl font-extrabold text-green-800 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Global Impact 🌍
          </motion.h2>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-5xl md:text-6xl font-bold text-green-700 mb-2">
                ♻️ 1.1M
              </p>
              <p className="text-lg text-gray-600">Plastic Bottles Recycled</p>
            </motion.div>
            
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-5xl md:text-6xl font-bold text-green-700 mb-2">
                👥 45k
              </p>
              <p className="text-lg text-gray-600">Active Users</p>
            </motion.div>
            
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-5xl md:text-6xl font-bold text-green-700 mb-2">
                🌱 95%
              </p>
              <p className="text-lg text-gray-600">Sustainable Practices</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="relative py-24 px-6 bg-green-50">
        <div className="max-w-7xl mx-auto text-center">
          {/* Heading */}
          <motion.h2
            className="text-5xl md:text-6xl font-extrabold text-green-800 mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            How It Works ⚡
          </motion.h2>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="flex flex-col items-center"
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="relative py-20 px-6 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 font-display text-green-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Community Voices
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-28 px-6 bg-gradient-to-b from-green-200 to-green-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            className="card-glass p-10 md:p-16 glow-effect"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Heading */}
            <motion.h3
              className="text-5xl md:text-6xl font-extrabold mb-10 text-green-800"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Ready to Transform the World? 🌍
            </motion.h3>
            
            {/* Subtext */}
            <motion.p
              className="text-2xl text-green-900 mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Join thousands of eco-warriors already making a difference.  
              Start your sustainable journey today.
            </motion.p>
            
            {/* CTA Button (navigates to /upload) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/upload">
                <motion.button
                  className="btn-hero group bg-green-700 text-white hover:bg-green-800 px-8 py-4 text-xl font-semibold rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Globe className="h-7 w-7 mr-2 group-hover:animate-spin" />
                  Start Recycling Now
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
