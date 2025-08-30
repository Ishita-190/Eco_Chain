import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function WasteCounter() {
  const [waste, setWaste] = useState(126693);

  useEffect(() => {
    let count = waste;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 5) + 1;
      setWaste(count);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="card-glass p-8 w-full max-w-md mx-auto glow-effect"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-foreground font-display text-center">
        Total Waste Recycled
      </h2>
      <div className="text-center">
        <motion.div
          className="text-6xl md:text-7xl font-bold text-gradient mb-2 font-display"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {waste.toLocaleString()}
          <span className="text-3xl ml-2">kg</span>
        </motion.div>
        <p className="text-muted-foreground flex items-center justify-center gap-2 mt-4">
          <motion.span 
            className="text-primary"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🌍
          </motion.span>
          Updated live as our community recycles
        </p>
      </div>
    </motion.div>
  );
}
