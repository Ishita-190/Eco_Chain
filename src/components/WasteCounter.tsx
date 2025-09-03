"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Recycle } from "lucide-react";

const WasteCounter = () => {
  const [waste, setWaste] = useState(126693); // starting value

  useEffect(() => {
    let count = waste;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 5) + 1; // increment randomly
      setWaste(count);
    }, 3000); // every 3s
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="bg-gradient-to-r from-eco-primary to-eco-accent text-white shadow-2xl">
        <CardContent className="p-8 text-center flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Recycle className="h-12 w-12 mx-auto" />
          </motion.div>

          <h3 className="text-2xl font-semibold mb-4 font-display">
            Total Waste Recycled
          </h3>

          <motion.div
            className="text-6xl md:text-7xl font-bold mb-2 flex items-center justify-center"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {waste.toLocaleString()}
            <span className="text-3xl ml-2">kg</span>
          </motion.div>

          <p className="text-sm opacity-90 mt-2 flex items-center justify-center gap-2">
            <motion.span
              className="text-primary"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🌍
            </motion.span>
            Updated live as our community recycles
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WasteCounter;
