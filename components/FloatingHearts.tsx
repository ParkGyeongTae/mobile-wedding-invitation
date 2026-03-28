'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  travelY: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const viewportHeight = window.innerHeight;
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      size: 20 + Math.random() * 20,
      travelY: viewportHeight + 200,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full pointer-events-none overflow-hidden z-0"
      style={{ height: '100lvh', willChange: 'transform', transform: 'translateZ(0)' }}
    >
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0 text-pastel-pink-dark opacity-20"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [-100, -(heart.travelY)],
            opacity: [0, 0.3, 0.3, 0],
            x: [0, Math.sin(heart.id) * 50, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}
