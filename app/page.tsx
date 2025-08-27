import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Leaf,
  Upload,
  Trophy,
  Users,
  Shield,
  Zap,
  ArrowRight,
  Recycle,
} from "lucide-react";

export default function Home() {
  const [waste, setWaste] = useState(126693);

  useEffect(() => {
    let count = waste;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 20) + 10; // faster increment
      setWaste(count);
    }, 200); // updates every 0.2s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-yellow-100 animate-fade-in">
      {/* Hero Section */}
      <section
        className="relative py-28 lg:py-40 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.85) 100%),
            url("/eco-bg.jpg")
          `,
        }}
      >
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 -right-16 w-48 h-48 bg-yellow-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-green-500/15 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-8 px-6 py-2 text-sm font-medium bg-white/90 text-green-700 border-green-400/20 shadow-lg backdrop-blur-sm">
              ♻️ Sustainable Blockchain Rewards
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-green-800 mb-8 leading-tight">
              EcoCommerce{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-yellow-500">
                🌍
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Turn your waste into rewards. Upload, track, and compete while
              helping build a cleaner planet.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-yellow-400 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link to="/upload">
                  Upload Waste <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/80 backdrop-blur-sm border-2 border-green-300 text-green-700 hover:bg-green-50 px-8 py-4 text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link to="/leaderboard">View Leaderboard</Link>
              </Button>
            </div>

            {/* Waste Counter */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-green-800 mb-2">
                Total Waste Recycled
              </h2>
              <p className="text-5xl font-extrabold text-yellow-500 mb-4">
                {waste.toLocaleString()} kg
              </p>
              <p className="text-sm text-gray-600">
                Updated live as our community recycles ♻️
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-white to-yellow-50"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-green-800 mb-6">
              Why Join EcoCommerce?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Earn rewards, compete, and make a global impact with every item
              you recycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Upload />, title: "Upload Waste", desc: "Easily upload and track your recycled items." },
              { icon: <Trophy />, title: "Leaderboard", desc: "Compete with others and climb the ranks." },
              { icon: <Recycle />, title: "Blockchain Rewards", desc: "Earn tokens for every contribution." },
              { icon: <Users />, title: "Community Impact", desc: "See your role in the global recycling effort." },
              { icon: <Shield />, title: "Secure & Transparent", desc: "Blockchain ensures verified tracking." },
              { icon: <Zap />, title: "Fast Updates", desc: "Real-time stats keep you motivated." },
            ].map((f, i) => (
              <Card key={i} className="bg-white/70 backdrop-blur-xl border border-green-200 shadow-xl hover:scale-105 transition-all duration-300">
                <CardHeader className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-yellow-400 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    {f.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-green-800 mb-4">
                    {f.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {f.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Contact Us */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-green-600 to-yellow-500"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 lg:p-16 text-center text-white shadow-2xl border border-white/20 max-w-5xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Have Questions? Get in Touch 🌱
            </h2>
            <p className="text-xl opacity-90 mb-12 max-w-3xl mx-auto">
              Join our community and help us make recycling rewarding for
              everyone.
            </p>
            <form className="flex flex-col gap-4 max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Your Name"
                className="p-3 rounded-lg text-black"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="p-3 rounded-lg text-black"
              />
              <textarea
                placeholder="Your Message"
                className="p-3 rounded-lg text-black"
              ></textarea>
              <Button
                size="lg"
                className="bg-yellow-400 text-black hover:bg-yellow-300 px-6 py-3 rounded-lg font-bold"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
