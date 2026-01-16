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
      `https://map.naver.com/p/search/${encodeURIComponent(name)}/place/38716476?c=15.00,0,0,3,dh&placePath=/home?bk_query=${encodeURIComponent(name)}&entry=bmp&from=map&fromPanelNum=2&locale=ko&svcName=map_pcv5&searchText=${encodeURIComponent(name)}`,
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

              {/* 교통편 안내 */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">교통편 안내</h4>

                {/* 지하철 */}
                <div className="mb-5">
                  <div className="flex items-start mb-2">
                    <svg
                      className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">지하철 이용 시</p>
                      <p className="text-gray-600 text-sm mt-1">4호선 평촌역 3번 출구 횡단보도 맞은 편</p>
                    </div>
                  </div>
                </div>

                {/* 버스 */}
                <div className="mb-5">
                  <div className="flex items-start mb-2">
                    <svg
                      className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">버스 이용 시</p>
                      <p className="text-gray-600 text-sm mt-1">평촌역 하차</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-gray-600 text-sm">
                          <span className="font-medium">[일반버스]</span> 1, 6, 22, 52, 52-1, 83
                        </p>
                        <p className="text-gray-600 text-sm">
                          <span className="font-medium">[마을버스]</span> 2-1, 5, 5-1, 5-5, 6, 6-1, 7, 8, 10-1
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 자가용 */}
                <div>
                  <div className="flex items-start mb-2">
                    <svg
                      className="w-5 h-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm mb-2">자가용 이용 시</p>
                      <p className="text-gray-600 text-sm mb-3">네비게이션 검색: 더파티움 안양 또는 시민대로 311 입력</p>

                      <div className="space-y-3">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="font-medium text-gray-800 text-sm mb-1">[제 1주차장]</p>
                          <p className="text-gray-600 text-xs leading-relaxed">
                            더파티움 안양 본건물 지하주차장<br />
                            동안구 시민대로 311 (관양동 1746)
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="font-medium text-gray-800 text-sm mb-1">[제 2주차장]</p>
                          <p className="text-gray-600 text-xs leading-relaxed">
                            지아이에스(구.네온테크) 주차장<br />
                            토, 일 이용 가능 (공휴일 이용불가)<br />
                            동안구 부림로 146 (관양동 1745-3)
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="font-medium text-gray-800 text-sm mb-1">[제 3주차장]</p>
                          <p className="text-gray-600 text-xs leading-relaxed">
                            이마트 평촌점 주차장<br />
                            동안구 시민대로300 (관양동 1608)
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="font-medium text-gray-800 text-sm mb-1">[제 4주차장]</p>
                          <p className="text-gray-600 text-xs leading-relaxed">
                            평촌 칼라힐 주차빌딩 (하이파킹 주차타워)<br />
                            *2층부터 주차 가능<br />
                            동안구 시민대로312 (평촌동 897)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
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
            구글 캘린더에 일정 추가
          </button>
        </motion.div>
      </div>
    </section>
  );
}
