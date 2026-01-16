'use client';

import { motion } from 'framer-motion';
import { weddingInfo } from '@/lib/data';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-b from-pastel-pink-light via-pastel-pink to-pastel-pink-light">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-block p-6 bg-white/50 rounded-full backdrop-blur-sm">
            <svg
              className="w-16 h-16 text-pastel-gold-dark"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-gray-600 mb-4"
        >
          우리 결혼합니다
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-pastel-gold-dark mb-2">
            {weddingInfo.groom.name} & {weddingInfo.bride.name}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="space-y-2"
        >
          <p className="text-gray-700 text-lg">
            {new Date(weddingInfo.date).getFullYear()}년{' '}
            {new Date(weddingInfo.date).getMonth() + 1}월{' '}
            {new Date(weddingInfo.date).getDate()}일{' '}
            {['일', '월', '화', '수', '목', '금', '토'][new Date(weddingInfo.date).getDay()]}요일
          </p>
          <p className="text-gray-600">{weddingInfo.time}</p>
          <p className="text-gray-600">{weddingInfo.location.name}</p>
          {weddingInfo.location.hall && (
            <p className="text-gray-600">{weddingInfo.location.hall}</p>
          )}
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-12"
        >
          <svg
            className="w-6 h-6 text-pastel-gold-dark mx-auto"
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
      </motion.div>
    </section>
  );
}
