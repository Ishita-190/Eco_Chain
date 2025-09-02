// app/page.tsx

export const dynamic = "force-dynamic"; // 🚀 Force SSR, skip static build

import { motion } from "framer-motion";
import { Leaf, Award, Users, ArrowRight, Recycle, Target, Globe } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import components with no SSR
const AnimatedParticles = dynamic(() => import("@/src/components/AnimatedParticles"), { ssr: false });
const StatCard = dynamic(() => import("@/src/components/StatCard"), { ssr: false });
const FeatureCard = dynamic(() => import("@/src/components/FeatureCard"), { ssr: false });
const TestimonialCard = dynamic(() => import("@/src/components/TestimonialCard"), { ssr: false });
const WasteCounter = dynamic(() => import("@/src/components/WasteCounter"), { ssr: false });

export default function Page() {
  const features = [
    {
      icon: <Leaf className="h-12 w-12 text-primary" />,
      title: "Track Your Impact",
      description: "Monitor your recycling activities and see your environmental contribution in real-time with advanced analytics.",
    },
    {
      icon: <Award className="h-12 w-12 text-accent" />,
      title: "Earn Blockchain Rewards",
      description: "Convert your recycling efforts into blockchain tokens and unlock exclusive eco-friendly rewards.",
    },
    {
      icon: <Users className="h-12 w-12 text-primary-glow" />,
      title: "Global Community",
      description: "Connect with eco-warriors worldwide and participate in sustainability challenges that matter.",
    },
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Environmental Activist",
      content: "EcoCommerce has revolutionized my recycling habits. The rewards system creates genuine motivation for sustainable living.",
      rating: 5,
    },
    {
      name: "Sarah Williams",
      role: "Sustainability Blogger",
      content: "The community features and leaderboards make environmental action engaging and social. It's brilliant!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Tech Entrepreneur",
      content: "Combining blockchain technology with environmental impact is the future. This platform delivers on that promise.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedParticles />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl w-full mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-7xl md:text-8xl font-bold mb-8 font-display"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-gradient">EcoCommerce</span>
              <motion.span
                className="ml-4 text-primary"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                🌱
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform your waste into blockchain rewards. Track your environmental impact,
              compete globally, and help build a sustainable future for our planet.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                className="btn-hero group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => console.log("Upload Waste clicked")}
              >
                <Recycle className="h-6 w-6 mr-2 group-hover:animate-spin" />
                Upload Waste
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                className="btn-secondary group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => console.log("View Leaderboard clicked")}
              >
                <Target className="h-6 w-6 mr-2" />
                View Leaderboard
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Waste Counter */}
          <WasteCounter />
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 font-display text-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Global Impact
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard value="1.2M+" label="Users Worldwide" icon="👥" delay={0} />
            <StatCard value="45K+" label="Tons Recycled" icon="♻️" delay={0.1} />
            <StatCard value="95%" label="Waste Reduction" icon="📉" delay={0.2} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 font-display text-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 font-display text-gradient"
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
      <section className="relative py-20 px-6 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            className="card-glass p-8 md:p-12 glow-effect"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h3
              className="text-3xl md:text-4xl font-bold mb-6 font-display text-gradient"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to Transform the World?
            </motion.h3>
            <motion.p
              className="text-xl text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Join thousands of eco-warriors already making a difference.
              Start your sustainable journey today.
            </motion.p>
            <motion.button
              className="btn-hero group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="h-6 w-6 mr-2 group-hover:animate-spin" />
              Start Recycling Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="mb-6 md:mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-muted-foreground">
                © {new Date().getFullYear()} EcoCommerce. Building a sustainable future.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-wrap gap-6 justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {["Privacy", "Terms", "Contact", "Blog", "About"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {link}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
