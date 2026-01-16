'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { weddingInfo } from '@/lib/data';
import { formatDate, generateCalendarUrl } from '@/lib/utils';

declare global {
  interface Window {
    naver: any;
  }
}

export default function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const hasNaverMapClientId = !!process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

  useEffect(() => {
    // Client ID가 없으면 지도를 로드하지 않음
    if (!hasNaverMapClientId) {
      setMapError(true);
      return;
    }

    // 이미 지도가 초기화되었으면 다시 초기화하지 않음
    if (mapInstanceRef.current) {
      return;
    }

    // 네이버 지도 API 로드 및 초기화
    const initMap = () => {
      if (!window.naver || !mapRef.current) {
        console.warn('Naver maps API or map container not available');
        return;
      }

      // 이미 지도가 초기화되었으면 중복 초기화 방지
      if (mapInstanceRef.current) {
        console.log('Map already initialized');
        return;
      }

      try {
        const { lat, lng, name, hall, address, tel } = weddingInfo.location;
        const position = new window.naver.maps.LatLng(lat, lng);

        console.log('Initializing Naver Map at', { lat, lng });

        const map = new window.naver.maps.Map(mapRef.current, {
          center: position,
          zoom: 17,
          zoomControl: true,
          zoomControlOptions: {
            position: window.naver.maps.Position.TOP_RIGHT,
          },
        });

        // 마커 추가
        const marker = new window.naver.maps.Marker({
          position: position,
          map: map,
          title: name,
          animation: window.naver.maps.Animation.BOUNCE,
        });

        // 애니메이션 1초 후 중지
        setTimeout(() => {
          marker.setAnimation(null);
        }, 1000);

        // 상세한 정보창 생성
        const infoWindowContent = `
          <div style="
            min-width: 280px;
            padding: 20px;
            font-family: 'Noto Sans KR', sans-serif;
            line-height: 1.6;
          ">
            <div style="
              font-size: 18px;
              font-weight: bold;
              color: #333;
              margin-bottom: 8px;
              border-bottom: 2px solid #E6C189;
              padding-bottom: 8px;
            ">
              📍 ${name}
            </div>

            ${hall ? `
              <div style="
                font-size: 14px;
                color: #666;
                margin-bottom: 12px;
                padding-left: 4px;
              ">
                ${hall}
              </div>
            ` : ''}

            <div style="margin: 12px 0;">
              <div style="
                font-size: 13px;
                color: #555;
                margin-bottom: 6px;
                display: flex;
                align-items: start;
              ">
                <span style="margin-right: 6px;">📍</span>
                <span>${address}</span>
              </div>

              ${tel ? `
                <div style="
                  font-size: 13px;
                  color: #555;
                  margin-bottom: 6px;
                  display: flex;
                  align-items: center;
                ">
                  <span style="margin-right: 6px;">📞</span>
                  <a href="tel:${tel}"
                     style="
                       color: #0066cc;
                       text-decoration: none;
                       font-weight: 500;
                     "
                     onmouseover="this.style.textDecoration='underline'"
                     onmouseout="this.style.textDecoration='none'"
                  >
                    ${tel}
                  </a>
                </div>
              ` : ''}

              <div style="
                font-size: 13px;
                color: #555;
                display: flex;
                align-items: center;
              ">
                <span style="margin-right: 6px;">🕐</span>
                <span>${formatDate(weddingInfo.date)} ${weddingInfo.time}</span>
              </div>
            </div>

            <div style="
              margin-top: 16px;
              padding-top: 16px;
              border-top: 1px solid #eee;
            ">
              <div style="
                font-size: 12px;
                color: #888;
                margin-bottom: 10px;
                font-weight: 500;
              ">
                🚗 길찾기
              </div>

              <div style="
                display: flex;
                gap: 6px;
                flex-wrap: wrap;
              ">
                <a href="nmap://route/public?dlat=${lat}&dlng=${lng}&dname=${encodeURIComponent(name)}&appname=com.wedding.invitation"
                   target="_blank"
                   style="
                     flex: 1;
                     min-width: 80px;
                     background: #03C75A;
                     color: white;
                     text-decoration: none;
                     padding: 8px 12px;
                     border-radius: 6px;
                     font-size: 12px;
                     font-weight: 500;
                     text-align: center;
                     display: inline-block;
                     transition: background 0.2s;
                   "
                   onmouseover="this.style.background='#02b350'"
                   onmouseout="this.style.background='#03C75A'"
                >
                  네이버
                </a>

                <a href="kakaomap://route?ep=${lat},${lng}&by=CAR"
                   target="_blank"
                   style="
                     flex: 1;
                     min-width: 80px;
                     background: #FEE500;
                     color: #3C1E1E;
                     text-decoration: none;
                     padding: 8px 12px;
                     border-radius: 6px;
                     font-size: 12px;
                     font-weight: 500;
                     text-align: center;
                     display: inline-block;
                     transition: background 0.2s;
                   "
                   onmouseover="this.style.background='#fdd835'"
                   onmouseout="this.style.background='#FEE500'"
                >
                  카카오
                </a>

                <a href="tmap://route?goalx=${lng}&goaly=${lat}&goalname=${encodeURIComponent(name)}"
                   target="_blank"
                   style="
                     flex: 1;
                     min-width: 80px;
                     background: #1E88E5;
                     color: white;
                     text-decoration: none;
                     padding: 8px 12px;
                     border-radius: 6px;
                     font-size: 12px;
                     font-weight: 500;
                     text-align: center;
                     display: inline-block;
                     transition: background 0.2s;
                   "
                   onmouseover="this.style.background='#1565c0'"
                   onmouseout="this.style.background='#1E88E5'"
                >
                  티맵
                </a>
              </div>
            </div>

            <div style="
              margin-top: 12px;
              font-size: 11px;
              color: #999;
              text-align: center;
            ">
              마커를 다시 클릭하면 닫힙니다
            </div>
          </div>
        `;

        const infoWindow = new window.naver.maps.InfoWindow({
          content: infoWindowContent,
          borderWidth: 0,
          backgroundColor: 'white',
          borderColor: '#E6C189',
          anchorSize: new window.naver.maps.Size(20, 20),
          anchorSkew: true,
          anchorColor: 'white',
          pixelOffset: new window.naver.maps.Point(0, -10),
        });

        // 마커 클릭 이벤트
        window.naver.maps.Event.addListener(marker, 'click', function() {
          if (infoWindow.getMap()) {
            infoWindow.close();
          } else {
            infoWindow.open(map, marker);
          }
        });

        // 1초 후 자동으로 정보창 열기
        setTimeout(() => {
          infoWindow.open(map, marker);
        }, 1000);

        // 지도 인스턴스 저장
        mapInstanceRef.current = map;

        setIsMapLoaded(true);
        setMapError(false);
        console.log('Naver Map initialized successfully');
      } catch (err: any) {
        console.error('Failed to initialize Naver Map:', err);
        console.error('Error details:', {
          message: err?.message,
          code: err?.code,
          name: err?.name,
        });
        setMapError(true);
      }
    };

    // 네이버 지도 API 로드 확인
    if (window.naver && window.naver.maps) {
      console.log('Naver Maps API already loaded');
      initMap();
    } else {
      console.log('Waiting for Naver Maps API to load...');
      let attempts = 0;
      const maxAttempts = 50; // 5초 대기

      const checkNaverMaps = setInterval(() => {
        attempts++;
        if (window.naver && window.naver.maps) {
          console.log('Naver Maps API loaded after', attempts, 'attempts');
          initMap();
          clearInterval(checkNaverMaps);
        } else if (attempts >= maxAttempts) {
          console.error('Naver Maps API loading timeout after', maxAttempts, 'attempts');
          setMapError(true);
          clearInterval(checkNaverMaps);
        }
      }, 100);

      return () => {
        console.log('Cleaning up interval');
        clearInterval(checkNaverMaps);
      };
    }
  }, [hasNaverMapClientId]);

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
              {weddingInfo.location.hall && (
                <p className="text-lg text-gray-700 mb-2">{weddingInfo.location.hall}</p>
              )}
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

              {/* 네이버 지도 */}
              <div className="border-t border-gray-200 pt-6 mt-6 mb-6">
                {mapError ? (
                  /* 지도 API가 없을 때 대체 UI */
                  <div className="w-full rounded-lg overflow-hidden bg-gradient-to-br from-pastel-pink-light to-pastel-gold-light p-8 text-center">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-pastel-gold-dark"
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
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      {weddingInfo.location.name}
                    </h4>
                    <p className="text-gray-600 mb-4">{weddingInfo.location.address}</p>
                    <p className="text-sm text-gray-500 mb-6">
                      아래 버튼을 눌러 지도 앱에서 위치를 확인하세요
                    </p>
                  </div>
                ) : (
                  /* 네이버 지도 표시 */
                  <div
                    ref={mapRef}
                    className="w-full h-64 md:h-80 rounded-lg overflow-hidden bg-gray-100"
                    style={{ minHeight: '256px' }}
                  >
                    {!isMapLoaded && (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <div className="text-center">
                          <svg
                            className="animate-spin h-8 w-8 mx-auto mb-2 text-pastel-gold-dark"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <p>지도를 불러오는 중...</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 교통편 안내 */}
              <div className="pt-6">
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
