'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

interface Heart {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export default function SplashCover() {
  const { scrollY } = useScroll();
  const [hearts, setHearts] = useState<Heart[]>([]);

  // 0~300px 스크롤 구간에서 fade-out
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const pointerEvents = useTransform(scrollY, (y) =>
    y > 200 ? 'none' : 'auto'
  );
  const imageY = useTransform(scrollY, [0, 300], [0, -40]);

  // 좌우 영역에만 하트 생성 (중앙 이미지 영역 제외)
  useEffect(() => {
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      // 0~30% 또는 70~100% 구간에만 위치
      x: i % 2 === 0 ? Math.random() * 30 : 70 + Math.random() * 30,
      delay: Math.random() * 6,
      duration: 7 + Math.random() * 5,
      size: 16 + Math.random() * 18,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <>
      <motion.div
        style={{ opacity, pointerEvents }}
        className="fixed inset-0 z-50 bg-pastel-pink-light flex items-center justify-center"
      >
        {/* 배경 하트 (좌우 영역) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute bottom-0 text-pastel-pink-dark"
              style={{
                left: `${heart.x}%`,
                fontSize: `${heart.size}px`,
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: [0, -(typeof window !== 'undefined' ? window.innerHeight + 100 : 900)],
                opacity: [0, 0.35, 0.35, 0],
                x: [0, Math.sin(heart.id) * 40, 0],
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

        {/* 중앙 이미지 카드 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-[320px] max-w-[85vw] shadow-2xl rounded-2xl overflow-hidden aspect-[3/4]"
          style={{ y: imageY }}
        >
          <Image
            src={`${basePath}/images/home/home.jpg`}
            alt="웨딩 커버"
            fill
            priority
            className="object-cover object-center"
          />
          {/* 하단 그라디언트 */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>

        {/* 스크롤 유도 */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-xs text-gray-400 tracking-widest">SCROLL</span>
            <svg
              className="w-5 h-5 text-pastel-gold-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* 커버 높이만큼 공간 확보 */}
      <div className="h-screen" aria-hidden="true" />
    </>
  );
}
