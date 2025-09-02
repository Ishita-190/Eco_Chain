"use client";
import { motion } from "framer-motion";
import { Leaf, Award, Users, ArrowRight, Recycle, Target, Globe } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import components with no SSR
const FeatureCard = dynamic(() => import("@/src/components/FeatureCard"), { ssr: false });
const TestimonialCard = dynamic(() => import("@/src/components/TestimonialCard"), { ssr: false });
const WasteCounter = dynamic(() => import("@/src/components/WasteCounter"), { ssr: false });

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
    <div className="relative overflow-hidden bg-gradient-to-br from-green-100 to-green-300 text-gray-900 w-full text-center">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-start px-6 py-12 bg-gradient-to-b from-green-200 to-green-100 rounded-b-3xl shadow-lg">
        {/* Main Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-4 font-display text-green-900 w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Eco_Chain
          <motion.span
            className="ml-2 text-green-700 w-full text-center"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            🌱
          </motion.span>
        </motion.h1>
        
        {/* Caption */}
        <motion.p
          className="text-2xl md:text-3xl max-w-4xl mx-auto mb-10 leading-relaxed text-green-800 font-medium text-center"
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
              className="flex items-center justify-center px-6 py-3 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors duration-300"
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
              className="flex items-center justify-center px-6 py-3 bg-green-100 text-green-800 font-medium rounded-lg hover:bg-green-200 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Target className="h-6 w-6 mr-2" />
              View Leaderboard
            </motion.button>
          </Link>
        </motion.div>
        
        {/* Waste Counter */}
        <div className="w-full text-center mt-12">
          <WasteCounter />
        </div>
      </section>
      
      {/* Global Impact */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto text-center px-6">
          {/* Heading */}
          <motion.h2
            className="text-5xl md:text-6xl font-extrabold text-green-800 mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Global Impact 🌍
          </motion.h2>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-5xl md:text-6xl font-bold text-green-700 mb-2 text-center">
                ♻️ 1.1M
              </p>
              <p className="text-lg text-gray-600 text-center">Plastic Bottles Recycled</p>
            </motion.div>
            
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-5xl md:text-6xl font-bold text-green-700 mb-2 text-center">
                👥 45k
              </p>
              <p className="text-lg text-gray-600 text-center">Active Users</p>
            </motion.div>
            
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-5xl md:text-6xl font-bold text-green-700 mb-2 text-center">
                🌱 95%
              </p>
              <p className="text-lg text-gray-600 text-center">Sustainable Practices</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="relative py-24 px-6 bg-green-50">
        <div className="max-w-7xl mx-auto text-center">
          {/* Heading */}
          <motion.h2
            className="text-5xl md:text-6xl font-extrabold text-green-800 mb-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            How It Works ⚡
          </motion.h2>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
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
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 font-display text-green-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Community Voices
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center">
                <TestimonialCard {...testimonial} delay={index * 0.1} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-28 px-6 bg-gradient-to-b from-green-200 to-green-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            className="bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-xl p-10 md:p-16 shadow-lg shadow-green-200/50 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Heading */}
            <motion.h3
              className="text-5xl md:text-6xl font-extrabold mb-10 text-green-800 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Ready to Transform the World? 🌍
            </motion.h3>
            
            {/* Subtext */}
            <motion.p
              className="text-2xl text-green-900 mb-12 leading-relaxed text-center"
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
                  className="flex items-center justify-center px-8 py-4 bg-green-700 text-white text-xl font-semibold rounded-2xl shadow-lg hover:bg-green-800 transition-colors duration-300"
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
