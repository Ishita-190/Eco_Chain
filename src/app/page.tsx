"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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
  Trophy
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

const WasteCounter = () => {
  const [wasteCount, setWasteCount] = useState(12847);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWasteCount(prev => prev + Math.floor(Math.random() * 10) + 1);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
      <Recycle className="text-green-600" />
      <span className="font-medium text-green-800">
        {wasteCount.toLocaleString()} kg of waste recycled
      </span>
    </div>
  );
};

const StatCard = ({ 
  icon: Icon, 
  value, 
  label 
}: { 
  icon: React.ElementType; 
  value: string; 
  label: string; 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
  >
    <div className="flex items-center gap-4">
      <div className="bg-green-100 p-3 rounded-full">
        <Icon className="text-green-600 h-6 w-6" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  </motion.div>
);

const FeatureCard = ({ 
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
    className="eco-card relative overflow-hidden group h-full"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-green-100 rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
    <div className="bg-green-100 p-4 rounded-full w-fit mb-5 relative z-10">
      <Icon className="text-primary h-7 w-7" />
    </div>
    <h3 className="text-xl font-semibold mb-3 relative z-10">{title}</h3>
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
    className="eco-card relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-16 h-16 bg-green-100 rounded-full -ml-8 -mt-8 opacity-20"></div>
    <div className="flex gap-1 mb-4 relative z-10">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`h-5 w-5 ${i < rating ? 'text-primary fill-primary' : 'text-gray-300'}`} 
        />
      ))}
    </div>
    <p className="text-gray-700 mb-5 italic relative z-10">"{content}"</p>
    <div className="flex items-center gap-3 relative z-10">
      <div className="bg-green-100 p-1 rounded-full">
        <Avatar>
          <AvatarImage src={`https://i.pravatar.cc/150?u=${name}`} />
          <AvatarFallback className="bg-primary text-white">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <p className="font-semibold">{name}</p>
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
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold text-lg">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight className="h-5 w-5 text-gray-500" />
        </motion.div>
      </button>
      {isOpen && (
        <motion.p 
          className="mt-2 text-gray-600"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {answer}
        </motion.p>
      )}
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
        <Avatar>
          <AvatarImage src={`https://i.pravatar.cc/150?u=${name}`} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
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
            <div className="inline-block bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <WasteCounter />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Nurture <span className="text-gradient">Earth</span>, Harvest <span className="text-gradient">Rewards</span>
            </h1>
            <p className="text-lg text-gray-700">
              Join our eco-conscious community and transform your sustainable actions into meaningful rewards through blockchain technology.
            </p>
            <ul className="space-y-2 eco-leaf-bullet">
              <li>Track your environmental impact in real-time</li>
              <li>Earn tokens for every sustainable action</li>
              <li>Join a global community of eco-warriors</li>
            </ul>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="rounded-full shadow-md transition-all hover:shadow-lg">
                Join the Movement
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-2 hover:bg-white/10">
                Discover More
              </Button>
            </div>
            <div className="flex items-center gap-3 mt-6 bg-white/50 backdrop-blur-sm p-3 rounded-full">
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
              <img 
                src="/eco-app-mockup.svg" 
                alt="Eco_Chain App" 
                className="w-full h-auto rounded-2xl shadow-md relative z-10"
              />
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-4"
            >
              <WasteCounter />
            </motion.div>
            
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
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button size="lg" className="rounded-full shadow-md transition-all hover:shadow-lg px-8 py-6 text-lg">
                Start Your Eco Journey
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-2 hover:bg-white/10 px-8 py-6 text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Join Eco Leaders
              </Button>
            </motion.div>
            
            {/* Leaderboard Preview */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Top Recyclers This Month</h3>
                <Button variant="ghost" size="sm">
                  View Full Leaderboard
                </Button>
              </div>
              
              <div className="space-y-4">
                {leaderboardData.slice(0, 3).map((user, index) => (
                  <LeaderboardItem 
                    key={user.id} 
                    rank={index + 1} 
                    name={user.name} 
                    points={user.points} 
                  />
                ))}
              </div>
            </motion.div>
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

      {/* Leaderboard Section */}
      <section id="leaderboard" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Community Leaderboard
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              See who's making the biggest impact in our community
            </motion.p>
          </div>
          
          <Card className="bg-white shadow-sm border border-gray-100">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Top Recyclers</CardTitle>
                  <CardDescription>Ranked by total points earned</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={activeTab === "monthly" ? "default" : "outline"}
                    onClick={() => setActiveTab("monthly")}
                  >
                    Monthly
                  </Button>
                  <Button 
                    variant={activeTab === "alltime" ? "default" : "outline"}
                    onClick={() => setActiveTab("alltime")}
                  >
                    All Time
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboardData.map((user, index) => (
                  <LeaderboardItem 
                    key={user.id} 
                    rank={index + 1} 
                    name={user.name} 
                    points={user.points} 
                    isCurrentUser={index === 2}
                  />
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button variant="outline">
                  View Full Leaderboard
                </Button>
              </div>
            </CardContent>
          </Card>
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
          
          <div className="eco-card p-6 md:p-8">
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

      {/* CTA Section */}
      <section className="py-20 px-4 my-12">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary to-accent border-0 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
            
            <CardContent className="p-12 text-center text-white relative z-10">
              <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Image src="/eco-community-icon.svg" width={64} height={64} alt="Community" className="h-16 w-16" />
              </motion.div>
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Join Our <span className="text-white">Eco-Conscious</span> Community
              </motion.h2>
              
              <motion.p 
                className="text-lg mb-8 max-w-2xl mx-auto text-green-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Be part of the movement that's creating a sustainable future through everyday actions and community collaboration.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-md mx-auto"
              >
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-grow">
                    <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 bg-white/20 text-white placeholder:text-white/70 rounded-full px-6 border-0"
                    />
                  </div>
                  <Button 
                    type="submit"
                    size="lg" 
                    variant="secondary" 
                    className="bg-white text-primary hover:bg-white/90 rounded-full shadow-md hover:shadow-lg transition-all px-6 h-12"
                  >
                    Join the Movement
                  </Button>
                </form>
                <p className="text-green-100 text-sm mt-3">
                  Join our newsletter for updates and eco-friendly tips
                </p>
              </motion.div>
              
              <motion.div 
                className="mt-8 flex items-center justify-center gap-2 text-white/80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Shield className="h-4 w-4" />
                <p className="text-sm">Your data is secure. We never share your information.</p>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Recycle className="h-8 w-8 text-green-400" />
                <span className="text-2xl font-bold">Eco_Chain</span>
              </div>
              <p className="text-gray-400 mb-4">
                Making recycling rewarding for everyone through blockchain technology.
              </p>
              <div className="flex gap-3">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Solutions</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Demo</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
                <li><a href="#" className="hover:text-white">Partners</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Partners</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2023 Eco_Chain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
