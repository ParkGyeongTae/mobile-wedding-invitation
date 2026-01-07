'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { weddingInfo, invitationMessage } from '@/lib/data';

export default function InvitationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-playfair text-3xl font-bold text-pastel-gold-dark mb-8">
            초대합니다
          </h2>

          <div className="mb-12 text-gray-700 leading-relaxed whitespace-pre-line">
            {invitationMessage}
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="mb-4">
                <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-2">
                  {weddingInfo.groom.name}
                </h3>
                <p className="text-sm text-gray-600">신랑</p>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  {weddingInfo.groom.father} · {weddingInfo.groom.mother}의 아들
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="mb-4">
                <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-2">
                  {weddingInfo.bride.name}
                </h3>
                <p className="text-sm text-gray-600">신부</p>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  {weddingInfo.bride.father} · {weddingInfo.bride.mother}의 딸
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
