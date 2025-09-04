"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full"
  >
    <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
      <Icon className="text-green-600 h-6 w-6" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
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
    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
  >
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
        />
      ))}
    </div>
    <p className="text-gray-700 mb-4 italic">"{content}"</p>
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={`https://i.pravatar.cc/150?u=${name}`} />
        <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-600">{role}</p>
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
      <section className="pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <WasteCounter />
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Turn Your <span className="text-primary">Waste</span> Into <span className="text-primary">Rewards</span>
            </h1>
            <p className="text-lg text-gray-600">
              Join our blockchain-powered recycling platform and earn tokens for your sustainable actions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-green-100 to-blue-50 p-8 rounded-2xl shadow-lg">
              <img 
                src="/placeholder.svg" 
                alt="Eco_Chain App" 
                className="w-full h-auto rounded-xl shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WasteCounter />
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mt-6 mb-6 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Transform Waste into <span className="text-green-600">Value</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join the global movement to make recycling rewarding and transparent through blockchain technology.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
                Start Recycling
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                View Leaderboard
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
      <section id="impact" className="py-16 bg-white rounded-xl shadow-sm my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Global Impact
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Making a difference one recycled item at a time
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={Globe} value="127+" label="Countries" />
            <StatCard icon={Users} value="50K+" label="Active Users" />
            <StatCard icon={Recycle} value="2.3M+" label="Items Recycled" />
            <StatCard icon={Award} value="89%" label="CO2 Reduction" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              How Eco_Chain Works
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Simple steps to make a big impact on our planet
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Leaf}
              title="Scan & Sort"
              description="Use our app to scan items and learn how to properly sort your recyclables."
            />
            <FeatureCard 
              icon={TrendingUp}
              title="Earn Rewards"
              description="Get tokens for every item you recycle that can be exchanged for discounts and products."
            />
            <FeatureCard 
              icon={Shield}
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
      <section id="faq" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Everything you need to know about Eco_Chain
            </motion.p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
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
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 border-0">
            <CardContent className="p-12 text-center text-white">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Ready to Make a Difference?
              </motion.h2>
              
              <motion.p 
                className="text-lg mb-8 max-w-2xl mx-auto text-green-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Join thousands of users who are already turning waste into rewards and making our planet cleaner.
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
                      className="h-12 bg-white/90 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <Button 
                    type="submit"
                    size="lg" 
                    variant="secondary" 
                    className="bg-white text-green-600 hover:bg-gray-100 px-6 h-12"
                  >
                    Get Started
                  </Button>
                </form>
                <p className="text-green-100 text-sm mt-3">
                  Join our newsletter for updates and tips
                </p>
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
