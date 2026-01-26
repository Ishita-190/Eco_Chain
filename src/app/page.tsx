"use client";

// Cache bust: v2
import React from "react"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { GradientText, Typewriter } from "@/src/components/ui/dynamic-text";
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

// Simple inline components
const Avatar = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full ${className}`}>
    {children}
  </div>
);

const AvatarImage = ({ src, alt }: { src: string; alt?: string }) => (
  <img className="aspect-square h-full w-full" src={src} alt={alt} />
);

const AvatarFallback = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full bg-gray-200 ${className}`}>
    {children}
  </div>
);

const FeatureCard = ({ customIcon, title, description }: { customIcon: string; title: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 text-center h-full flex flex-col justify-between"
  >
    <div>
      <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-6">
        <Image src={customIcon} width={32} height={32} alt={title} className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6">"{description}"</p>
    </div>
    <div className="flex items-center justify-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
      ))}
    </div>
  </motion.div>
);

const CountUp = ({ end, duration }: { end: number; duration: number }) => {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (!mounted) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, mounted]);
  
  if (!mounted) return <span>{end.toLocaleString()}</span>;
  return <span>{count.toLocaleString()}</span>;
};



const ShimmerText = ({ text }: { text: string }) => (
  <span className="animate-shimmer bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-clip-text text-transparent">
    {text}
  </span>
);

const WavyText = ({ text }: { text: string }) => (
  <span className="animate-wave">{text}</span>
);

const WasteCounter = () => {
  const [wasteCount, setWasteCount] = useState(12847);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setWasteCount(prev => prev + Math.floor(Math.random() * 10) + 1);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (!mounted) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '12px 20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', backdropFilter: 'blur(8px)' }}>
        <Recycle style={{ color: '#059669', height: '20px', width: '20px' }} />
        <span style={{ fontWeight: '500', color: '#065f46', fontSize: '16px' }}>
          12,847 kg of waste recycled
        </span>
      </div>
    );
  }
  
  return (
    <motion.div 
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '12px 20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ boxShadow: "0 10px 20px rgba(16, 185, 129, 0.2)" }}
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <Recycle style={{ color: '#059669', height: '20px', width: '20px' }} />
      </motion.div>
      <span style={{ fontWeight: '500', color: '#065f46', fontSize: '16px' }}>
        <CountUp end={wasteCount} duration={1500} /> kg of waste recycled
      </span>
    </motion.div>
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
    transition={{ duration: 0.6, ease: "easeOut" }}
    whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
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
    transition={{ duration: 0.6, ease: "easeOut" }}
    whileHover={{ y: -10, boxShadow: "0 25px 40px -10px rgba(16, 185, 129, 0.15)" }}
    className="eco-card card-hover-effect h-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300"
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
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    whileHover={{ y: -8, boxShadow: "0 25px 40px -10px rgba(16, 185, 129, 0.15)" }}
    className="card-hover-effect bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300"
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
      <Avatar className="h-8 w-8">
        <AvatarImage src={`https://i.pravatar.cc/150?u=${name}`} />
        <AvatarFallback className="bg-primary text-white text-xs">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">
          <GradientText text={name} />
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
    <motion.div 
      style={{ marginBottom: '16px' }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
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
          transition: 'all 0.3s ease'
        }}
        onClick={() => {
          console.log('Clicking FAQ, current:', isOpen);
          setIsOpen(prev => !prev);
        }}
        whileHover={{ 
          boxShadow: '0 10px 25px -3px rgba(16, 185, 129, 0.15)',
          y: -2
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
      </motion.div>
      
      <motion.div 
        style={{
          overflow: 'hidden'
        }}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
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
      </motion.div>
    </motion.div>
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
  <motion.div 
    className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${isCurrentUser ? 'bg-green-50 border border-green-200' : 'bg-white hover:shadow-md'}`}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    whileHover={{ x: 5 }}
  >
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
  </motion.div>
);

export default function EcoChainLanding() {
  const router = useRouter();
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
    <motion.div 
      className="flex flex-col gap-8 pb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Page sections will be organized with consistent spacing */}

      {/* Hero Section */}
      <section className="pt-8 pb-16 eco-section">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-6">

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg border border-green-200 shadow-sm">
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
            <div className="mt-4 mb-2 bg-gradient-to-r from-green-100/80 to-emerald-100/80 backdrop-blur-sm p-3 rounded-lg border border-green-200 shadow-sm">
              <p className="text-sm font-medium text-green-900 flex items-center justify-center">
                <span className="mr-2">🌟</span>
                <span className="animate-wave inline-block">Making a difference, one recycled item at a time</span>
              </p>
            </div>
            <motion.div 
              className="relative bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl border border-green-300 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-2xl"></div>
              <div className="relative z-10">
                <motion.h2 
                  className="text-2xl font-bold text-center mb-8 text-green-900"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >How It Works</motion.h2>
                <motion.div 
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', width: '100%' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, staggerChildren: 0.15, delayChildren: 0.3 }}
                >
                  <motion.button 
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      padding: '32px',
                      borderRadius: '24px',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      width: '300px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      margin: '0 auto'
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{ 
                      scale: 1.08, 
                      boxShadow: "0 20px 50px rgba(16, 185, 129, 0.25)",
                      background: "rgba(255, 255, 255, 0.95)",
                      y: -5
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div style={{ position: 'relative', marginBottom: '16px' }}>
                      <div style={{ background: 'linear-gradient(135deg, #4ade80, #10b981)', padding: '24px', borderRadius: '50%', boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)' }}>
                        <TrendingUp style={{ width: '40px', height: '40px', color: 'white' }} />
                      </div>
                      <div style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#fbbf24', color: '#92400e', fontSize: '12px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '50%' }}>
                        1
                      </div>
                    </div>
                    <h3 style={{ fontWeight: 'bold', color: '#166534', marginBottom: '12px', fontSize: '18px' }}>Upload & Classify</h3>
                    <p style={{ color: '#374151', lineHeight: '1.6', margin: 0 }}>Take a photo of your waste item and let our AI identify the type and recycling method</p>
                  </motion.button>
                  
                  <motion.button 
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      padding: '32px',
                      borderRadius: '24px',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      width: '300px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      margin: '0 auto'
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{ 
                      scale: 1.08, 
                      boxShadow: "0 20px 50px rgba(6, 182, 212, 0.25)",
                      background: "rgba(255, 255, 255, 0.95)",
                      y: -5
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div style={{ position: 'relative', marginBottom: '16px' }}>
                      <div style={{ background: 'linear-gradient(135deg, #60a5fa, #06b6d4)', padding: '24px', borderRadius: '50%', boxShadow: '0 10px 25px rgba(6, 182, 212, 0.3)' }}>
                        <Award style={{ width: '40px', height: '40px', color: 'white' }} />
                      </div>
                      <div style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#fbbf24', color: '#92400e', fontSize: '12px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '50%' }}>
                        2
                      </div>
                    </div>
                    <h3 style={{ fontWeight: 'bold', color: '#1e40af', marginBottom: '12px', fontSize: '18px' }}>Schedule & Track</h3>
                    <p style={{ color: '#374151', lineHeight: '1.6', margin: 0 }}>Book pickup or drop-off and track your collection progress with our visual flowmap</p>
                  </motion.button>
                  
                  <motion.button 
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      padding: '32px',
                      borderRadius: '24px',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      width: '300px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      margin: '0 auto'
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{ 
                      scale: 1.08, 
                      boxShadow: "0 20px 50px rgba(168, 85, 247, 0.25)",
                      background: "rgba(255, 255, 255, 0.95)",
                      y: -5
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div style={{ position: 'relative', marginBottom: '16px' }}>
                      <div style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)', padding: '24px', borderRadius: '50%', boxShadow: '0 10px 25px rgba(168, 85, 247, 0.3)' }}>
                        <Sparkles style={{ width: '40px', height: '40px', color: 'white' }} />
                      </div>
                      <div style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#fbbf24', color: '#92400e', fontSize: '12px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '50%' }}>
                        3
                      </div>
                    </div>
                    <h3 style={{ fontWeight: 'bold', color: '#6b21a8', marginBottom: '12px', fontSize: '18px' }}>Earn & Impact</h3>
                    <p style={{ color: '#374151', lineHeight: '1.6', margin: 0 }}>Receive ECO credits and see your environmental impact in our community dashboard</p>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Eco_Chain Platform Box - moved below How It Works */}
            <motion.div 
              className="relative mt-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="absolute -top-10 -left-10 w-24 h-24 bg-green-300/40 rounded-full opacity-60 blur-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-300/40 rounded-full opacity-60 blur-xl"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-8 rounded-3xl shadow-xl border border-green-200/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-300/40 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                <div className="flex flex-col items-center justify-center h-64 relative z-10">
                  <div className="text-6xl mb-4">🌱</div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">Eco_Chain Platform</h3>
                  <p className="text-green-800">Sustainable rewards for a better tomorrow</p>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-md text-center border border-green-200">
                  <p className="text-sm font-medium text-green-900">Trusted by 50,000+ eco-conscious users</p>
                </div>
              </div>
            </motion.div>
            
            <div className="flex justify-center mb-6 mt-12">
              <div className="w-full flex justify-center">
                <WasteCounter />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2 bg-gradient-to-r from-white/60 to-green-50/60 backdrop-blur-sm p-3 rounded-full border border-green-200">
              <img src="/eco-recycle-icon.svg" alt="Recycling" className="w-10 h-10" />
              <img src="/eco-water-drop.svg" alt="Water Conservation" className="w-10 h-10" />
              <p className="text-sm text-gray-700">Sustainable solutions for a better tomorrow</p>
            </div>
          </div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="absolute -top-10 -left-10 w-24 h-24 bg-green-100 rounded-full opacity-60 blur-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-100 rounded-full opacity-60 blur-xl"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 opacity-20 z-0">
              <img src="/eco-leaf-pattern.svg" alt="" className="w-64 h-64" />
            </div>
            {/* Empty placeholder for layout balance */}
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🌍</div>
                <p className="text-green-700 text-lg font-medium">Join the movement</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
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
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.12 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="eco-card flex flex-col items-center text-center p-8 hover:shadow-lg transition-all duration-300"
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
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="eco-card flex flex-col items-center text-center p-8 hover:shadow-lg transition-all duration-300"
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
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="eco-card flex flex-col items-center text-center p-8 hover:shadow-lg transition-all duration-300"
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
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="eco-card flex flex-col items-center text-center p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Image src="/eco-award-icon.svg" width={32} height={32} alt="CO2 Reduction" className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">89%</h3>
              <p className="text-gray-700">CO2 Reduction</p>
            </motion.div>
          </motion.div>
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
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              How <span className="text-gradient">Eco_Chain</span> Works
            </motion.h2>
            <motion.p 
              className="text-gray-700 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              Simple steps to nurture our planet and grow your rewards
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.15, delayChildren: 0.2 }}
          >
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
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white rounded-xl shadow-sm my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image src="/eco-faq-icon.svg" width={64} height={64} alt="FAQ" className="h-16 w-16" />
            </motion.div>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              What Our Users Say
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
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
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image src="/eco-faq-icon.svg" width={64} height={64} alt="FAQ" className="h-16 w-16" />
            </motion.div>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Frequently Asked <span className="text-gradient">Questions</span>
            </motion.h2>
            <motion.p 
              className="text-gray-700 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              Everything you need to know about joining our eco-conscious community
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.15, delayChildren: 0.2 }}
          >
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
          </motion.div>
        </div>
      </section>

      {/* End of content */}
    </motion.div>
  );
}