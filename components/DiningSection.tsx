'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { diningInfo } from '@/lib/data';

export default function DiningSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-3xl font-bold text-pastel-gold-dark text-center mb-12">
            식사 안내
          </h2>

          <div className="bg-gradient-to-br from-pastel-pink-light to-pastel-gold-light rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-pastel-gold-dark"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                식사는 {diningInfo.description} <span className="font-bold text-pastel-gold-dark">{diningInfo.floor}</span> {diningInfo.type}를 이용하시면 됩니다
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="space-y-5">
                {/* 시간 정보 */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-pastel-gold-light rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-pastel-gold-dark"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg mb-2">이용 시간</h3>
                    <p className="text-gray-700 text-base leading-relaxed">
                      <span className="font-semibold text-pastel-gold-dark">{diningInfo.startTime}</span> ~ <span className="font-semibold text-pastel-gold-dark">{diningInfo.endTime}</span>
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      예식 30분 전인 <span className="font-medium">{diningInfo.startTime}</span>부터 이용 가능합니다
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                {/* 장소 정보 */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-pastel-pink-light rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-pastel-pink-dark"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg mb-2">위치</h3>
                    <p className="text-gray-700 text-base leading-relaxed">
                      {diningInfo.floor} <span className="font-medium">{diningInfo.type}</span>
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      {diningInfo.description}입니다
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm leading-relaxed">
                귀한 걸음 하시는 분들께<br />
                정성을 다한 식사를 준비했습니다
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
