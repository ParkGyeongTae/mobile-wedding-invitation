'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { weddingInfo } from '@/lib/data';
import { formatDate, generateCalendarUrl } from '@/lib/utils';

export default function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const openTmap = () => {
    const { name } = weddingInfo.location;
    window.open(
      `tmap://search?name=${encodeURIComponent(name)}`,
      '_blank'
    );
  };

  const openNaverMap = () => {
    const { lat, lng, name } = weddingInfo.location;
    window.open(
      `https://map.naver.com/v5/search/${encodeURIComponent(name)}`,
      '_blank'
    );
  };

  const openKakaoMap = () => {
    const { lat, lng, name } = weddingInfo.location;
    window.open(
      `https://map.kakao.com/link/search/${encodeURIComponent(name)}`,
      '_blank'
    );
  };

  const openGoogleMaps = () => {
    const { lat, lng } = weddingInfo.location;
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
  };

  const addToCalendar = () => {
    window.open(generateCalendarUrl(weddingInfo), '_blank');
  };

  return (
    <section ref={ref} className="py-20 px-6 bg-gradient-to-b from-pastel-pink-light to-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-3xl font-bold text-pastel-gold-dark text-center mb-12">
            오시는 길
          </h2>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {weddingInfo.location.name}
              </h3>
              <p className="text-gray-600 mb-1">{formatDate(weddingInfo.date)}</p>
              <p className="text-gray-600">{weddingInfo.time}</p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-start mb-4">
                <svg
                  className="w-6 h-6 text-pastel-gold-dark mt-1 mr-3 flex-shrink-0"
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
                <div>
                  <p className="text-gray-700">{weddingInfo.location.address}</p>
                </div>
              </div>

              {weddingInfo.location.tel && (
                <div className="flex items-center mb-4">
                  <svg
                    className="w-6 h-6 text-pastel-gold-dark mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a href={`tel:${weddingInfo.location.tel}`} className="text-gray-700 hover:text-pastel-gold-dark">
                    {weddingInfo.location.tel}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={openTmap}
              className="bg-sky-500 hover:bg-sky-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              티맵
            </button>
            <button
              onClick={openNaverMap}
              className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              네이버 지도
            </button>
            <button
              onClick={openKakaoMap}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              카카오맵
            </button>
            <button
              onClick={openGoogleMaps}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              구글 지도
            </button>
          </div>

          <button
            onClick={addToCalendar}
            className="w-full bg-pastel-gold hover:bg-pastel-gold-dark text-gray-800 py-4 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            캘린더에 일정 추가
          </button>
        </motion.div>
      </div>
    </section>
  );
}
