"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePageTransition } from '@/src/hooks/usePageTransition';
import { 
  Recycle, 
  Globe, 
  Users, 
  Award, 
  Star, 
  ArrowRight,
  CheckCircle,
  Leaf,
  TrendingUp,
  Shield,
  Menu,
  X,
  Trophy,
  Sparkles
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import FeatureCard from "@/src/components/FeatureCard";
import { CountUp, GradientText, Typewriter, ShimmerText, WavyText } from "@/src/components/ui/dynamic-text";

const WasteCounter = () => {
  const [wasteCount, setWasteCount] = useState(12847);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWasteCount(prev => prev + Math.floor(Math.random() * 10) + 1);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '12px 20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', backdropFilter: 'blur(8px)' }}>
      <Recycle style={{ color: '#059669', height: '20px', width: '20px' }} />
      <span style={{ fontWeight: '500', color: '#065f46', fontSize: '16px' }}>
        <CountUp end={wasteCount} duration={1500} /> kg of waste recycled
      </span>
    </div>
  );
};

const StatCard = ({ 
  icon: Icon, 
  value, 
  label,
  useShimmer = false
}: { 
  icon: React.ElementType; 
  value: string; 
  label: string;
  useShimmer?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
  >
    <div className="flex items-center gap-4">
      <div className="bg-green-100 p-3 rounded-full">
        <Icon className="text-green-600 h-6 w-6" />
      </div>
      <div>
        {useShimmer ? (
          <p className="text-2xl font-bold text-gray-900">
            <ShimmerText text={value} />
          </p>
        ) : (
          <p className="text-2xl font-bold text-gray-900">
            <GradientText 
              text={value} 
              gradientFrom="from-green-500" 
              gradientTo="to-emerald-600" 
              animate={true} 
            />
          </p>
        )}
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  </motion.div>
);

const LocalFeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -5 }}
    className="eco-card card-hover-effect h-full bg-white p-6 rounded-xl shadow-sm border border-gray-100"
  >
    <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-full w-fit mx-auto mb-5 relative z-10">
      <Icon className="text-primary h-7 w-7" />
    </div>
    <h3 className="text-xl font-semibold mb-3 relative z-10">
      <GradientText text={title} animate={false} />
    </h3>
    <p className="text-gray-700 relative z-10">{description}</p>
  </motion.div>
);

const TestimonialCard = ({ 
  name, 
  role, 
  content, 
  rating 
}: { 
  name: string; 
  role: string; 
  content: string; 
  rating: number; 
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="card-hover-effect bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
  >
    <div className="flex gap-1 mb-4 justify-center">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`h-5 w-5 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
        />
      ))}
    </div>
    <p className="text-gray-700 mb-5 italic relative z-10 bg-green-50/50 p-4 rounded-lg border border-green-100/50">"{content}"</p>
    <div className="flex items-center gap-3 justify-center">
      <div className="bg-gradient-to-r from-green-100 to-teal-100 p-1 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarImage src={`https://i.pravatar.cc/150?u=${name}`} />
          <AvatarFallback className="bg-primary text-white text-xs">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <p className="font-semibold">
          <GradientText text={name} gradientFrom="from-green-600" gradientTo="to-teal-600" />
        </p>
        <p className="text-sm text-gray-700">{role}</p>
      </div>
    </div>
  </motion.div>
);

const FAQItem = ({ 
  question, 
  answer 
}: { 
  question: string; 
  answer: string; 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ marginBottom: '16px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '16px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onClick={() => {
          console.log('Clicking FAQ, current:', isOpen);
          setIsOpen(prev => !prev);
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.15)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
          e.currentTarget.style.transform = 'translateY(0px)';
        }}
      >
        <h3 style={{
          fontWeight: '500',
          fontSize: '16px',
          color: '#111827',
          margin: 0
        }}>
          {question}
        </h3>
        <ArrowRight 
          style={{ 
            height: '16px', 
            width: '16px', 
            color: '#9ca3af',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }} 
        />
      </div>
      
      <div style={{
        maxHeight: isOpen ? '200px' : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease'
      }}>
        <div style={{
          marginTop: '8px',
          padding: '16px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          {answer}
        </div>
      </div>
    </div>
  );
};

const LeaderboardItem = ({ 
  rank, 
  name, 
  points, 
  isCurrentUser = false 
}: { 
  rank: number; 
  name: string; 
  points: number; 
  isCurrentUser?: boolean; 
}) => (
  <div className={`flex items-center justify-between p-4 rounded-lg ${isCurrentUser ? 'bg-green-50 border border-green-200' : 'bg-white'}`}>
    <div className="flex items-center gap-4">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${rank <= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
        {rank}
      </div>
      <div className="flex items-center gap-3">
        <Avatar className="h-6 w-6">
          <AvatarImage src={`https://i.pravatar.cc/150?u=${name}`} />
          <AvatarFallback className="text-xs">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <span className={`font-medium ${isCurrentUser ? 'text-green-700' : 'text-gray-900'}`}>
          {name}
        </span>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <Trophy className="h-5 w-5 text-yellow-500" />
      <span className="font-semibold">{points.toLocaleString()}</span>
    </div>
  </div>
);

export default function EcoChainLanding() {
  const { navigateTo, isTransitioning } = usePageTransition();
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState("monthly");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you! We'll send updates to ${email}`);
    setEmail("");
  };

  // Mock leaderboard data
  const leaderboardData = [
    { id: 1, name: "Green Warriors", points: 12500 },
    { id: 2, name: "Eco Heroes", points: 11200 },
    { id: 3, name: "Planet Protectors", points: 9800 },
    { id: 4, name: "Recycle Rangers", points: 8750 },
    { id: 5, name: "Sustainable Squad", points: 7600 },
  ];

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Page sections will be organized with consistent spacing */}

      {/* Hero Section */}
      <section className="pt-8 pb-16 eco-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">

            <div className="bg-green-50 p-4 rounded-lg border border-green-100 shadow-sm">
              <p style={{ color: '#14532d', fontWeight: 'bold', fontSize: '40px' }}>
                <Typewriter 
                  texts={[
                    "Recycling for a better tomorrow", 
                    "Sustainable living starts with you", 
                    "Small actions, big impact", 
                    "Join our eco-friendly community"
                  ]} 
                  typingSpeed={80} 
                  deletingSpeed={40} 
                  delayBetweenTexts={3000}
                />
              </p>
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', lineHeight: '1.2', color: '#14532d' }}>
              Nurture <span style={{ color: '#14532d' }}>Earth</span>, Harvest <span style={{ color: '#14532d' }}>Rewards</span>
            </h1>
            <p className="text-lg text-gray-700">
              Join our eco-conscious community and transform your sustainable actions into meaningful rewards through blockchain technology.
            </p>
            <div className="mt-4 mb-2 bg-green-50/50 backdrop-blur-sm p-3 rounded-lg border border-green-100 shadow-sm">
              <p className="text-sm font-medium text-green-800 flex items-center justify-center">
                <span className="mr-2">🌟</span>
                <span className="animate-wave inline-block">Making a difference, one recycled item at a time</span>
              </p>
            </div>
            <div className="relative">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-6">
                <div className="flex flex-col items-center text-center relative">
                  <div className="bg-green-100 p-4 rounded-full mb-3 shadow-md">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 max-w-xs">
                    <h3 className="font-semibold text-green-800 mb-2">Step 1</h3>
                    <p className="text-sm text-gray-700">Track your environmental impact in real-time</p>
                  </div>
                </div>
                
                <div className="hidden md:block flex-1 h-0.5 bg-gradient-to-r from-green-300 to-emerald-400 mx-4 relative">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-emerald-400 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                </div>
                
                <div className="flex flex-col items-center text-center relative">
                  <div className="bg-green-100 p-4 rounded-full mb-3 shadow-md">
                    <Award className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 max-w-xs">
                    <h3 className="font-semibold text-green-800 mb-2">Step 2</h3>
                    <p className="text-sm text-gray-700">Earn tokens for every sustainable action</p>
                  </div>
                </div>
                
                <div className="hidden md:block flex-1 h-0.5 bg-gradient-to-r from-green-300 to-emerald-400 mx-4 relative">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-emerald-400 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                </div>
                
                <div className="flex flex-col items-center text-center relative">
                  <div className="bg-green-100 p-4 rounded-full mb-3 shadow-md">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 max-w-xs">
                    <h3 className="font-semibold text-green-800 mb-2">Step 3</h3>
                    <p className="text-sm text-gray-700">Join a global community of eco-warriors</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mb-6">
              <div className="w-full flex justify-center">
                <WasteCounter />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2 bg-white/50 backdrop-blur-sm p-3 rounded-full">
              <img src="/eco-recycle-icon.svg" alt="Recycling" className="w-10 h-10" />
              <img src="/eco-water-drop.svg" alt="Water Conservation" className="w-10 h-10" />
              <p className="text-sm text-gray-700">Sustainable solutions for a better tomorrow</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-green-100 rounded-full opacity-60 blur-xl"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-100 rounded-full opacity-60 blur-xl"></div>
            <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 opacity-20 z-0">
              <img src="/eco-leaf-pattern.svg" alt="" className="w-64 h-64" />
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-3xl shadow-lg border border-green-100/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/30 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              <div className="flex flex-col items-center justify-center h-64 relative z-10">
                <div className="text-6xl mb-4">🌱</div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Eco_Chain Platform</h3>
                <p className="text-green-700">Sustainable rewards for a better tomorrow</p>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm text-center">
                <p className="text-sm font-medium text-green-800">Trusted by 50,000+ eco-conscious users</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 px-4 eco-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">

            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mt-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Cultivate a <span className="text-gradient">Greener</span> Tomorrow
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-700 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our blockchain-powered platform makes sustainable living rewarding, transparent, and accessible for everyone.
            </motion.p>
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '48px', width: '100%' }}>
              <button
                onClick={() => {
                  console.log('Join Eco Leaders clicked, navigating to /leaderboard');
                  navigateTo('/leaderboard');
                }}
                disabled={isTransitioning}
                style={{
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  color: 'white',
                  padding: '20px 40px',
                  borderRadius: '20px',
                  fontSize: '18px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: isTransitioning ? 'not-allowed' : 'pointer',
                  boxShadow: '0 10px 30px rgba(5, 150, 105, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  minWidth: '240px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  opacity: isTransitioning ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isTransitioning) {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(5, 150, 105, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isTransitioning) {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(5, 150, 105, 0.3)';
                  }
                }}
              >
                <Trophy style={{ height: '24px', width: '24px' }} />
                Join Eco Leaders
              </button>
            </div>
            

          </div>
        </div>
      </section>

      {/* Global Impact Section */}
      <section id="impact" className="py-16 eco-section my-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Global <span className="text-gradient">Impact</span>
            </motion.h2>
            <motion.p 
              className="text-gray-700 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Together, we're creating a sustainable future one eco-friendly action at a time
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="eco-card flex flex-col items-center text-center p-8"
            >
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Image src="/eco-globe-icon.svg" width={32} height={32} alt="Countries" className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">127+</h3>
              <p className="text-gray-700">Countries</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="eco-card flex flex-col items-center text-center p-8"
            >
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Image src="/eco-users-icon.svg" width={32} height={32} alt="Active Users" className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">50K+</h3>
              <p className="text-gray-700">Active Users</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="eco-card flex flex-col items-center text-center p-8"
            >
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Image src="/eco-recycle-stat-icon.svg" width={32} height={32} alt="Items Recycled" className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">2.3M+</h3>
              <p className="text-gray-700">Items Recycled</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="eco-card flex flex-col items-center text-center p-8"
            >
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Image src="/eco-award-icon.svg" width={32} height={32} alt="CO2 Reduction" className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">89%</h3>
              <p className="text-gray-700">CO2 Reduction</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 my-12 eco-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              How <span className="text-gradient">Eco_Chain</span> Works
            </motion.h2>
            <motion.p 
              className="text-gray-700 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Simple steps to nurture our planet and grow your rewards
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              customIcon="/eco-leaf-icon.svg"
              title="Scan & Sort"
              description="Use our app to scan items and learn how to properly sort your recyclables."
            />
            <FeatureCard 
              customIcon="/eco-trending-up-icon.svg"
              title="Earn Rewards"
              description="Get tokens for every item you recycle that can be exchanged for discounts and products."
            />
            <FeatureCard 
              customIcon="/eco-shield-icon.svg"
              title="Track Impact"
              description="See the environmental impact of your actions through our transparent blockchain ledger."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white rounded-xl shadow-sm my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              What Our Users Say
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Join thousands of satisfied users making a difference
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Sarah Johnson"
              role="Environmental Activist"
              content="Eco_Chain has completely changed how I think about recycling. I love earning rewards for doing good!"
              rating={5}
            />
            <TestimonialCard 
              name="Michael Chen"
              role="Sustainability Manager"
              content="The transparency of the blockchain tracking gives us confidence that our recycling efforts are making a real impact."
              rating={4}
            />
            <TestimonialCard 
              name="Emma Rodriguez"
              role="Community Leader"
              content="Our neighborhood recycling rate has doubled since we started using Eco_Chain. It's incredibly user-friendly!"
              rating={5}
            />
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 my-12 eco-section">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Image src="/eco-faq-icon.svg" width={64} height={64} alt="FAQ" className="h-16 w-16" />
            </motion.div>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Frequently Asked <span className="text-gradient">Questions</span>
            </motion.h2>
            <motion.p 
              className="text-gray-700 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Everything you need to know about joining our eco-conscious community
            </motion.p>
          </div>
          
          <div>
            <FAQItem 
              question="How do I start using Eco_Chain?" 
              answer="Download our mobile app from the App Store or Google Play, create an account, and follow the setup instructions. You'll receive a starter kit with QR codes for your recycling bins." 
            />
            <FAQItem 
              question="What types of items can I recycle through Eco_Chain?" 
              answer="We support all standard recyclables including plastic bottles, aluminum cans, paper, cardboard, glass, and electronics. Check our app for the complete list of accepted items in your area." 
            />
            <FAQItem 
              question="How are rewards calculated?" 
              answer="Rewards are based on the weight and type of items you recycle. Rarer materials and harder-to-recycle items earn more tokens. You can exchange tokens for discounts, products, or donate to environmental causes." 
            />
            <FAQItem 
              question="Is my data secure?" 
              answer="Yes, we use blockchain technology to ensure complete transparency and security of your recycling data. Your personal information is encrypted and never shared without your consent." 
            />
          </div>
        </div>
      </section>



      {/* End of content */}
    </div>
  );
}
