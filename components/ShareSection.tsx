'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { weddingInfo } from '@/lib/data';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function ShareSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isKakaoReady, setIsKakaoReady] = useState(false);

  useEffect(() => {
    // Kakao SDK 초기화
    const initKakao = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
        if (kakaoKey) {
          window.Kakao.init(kakaoKey);
          setIsKakaoReady(true);
        }
      } else if (window.Kakao && window.Kakao.isInitialized()) {
        setIsKakaoReady(true);
      }
    };

    // Kakao SDK 로드 확인
    if (window.Kakao) {
      initKakao();
    } else {
      // SDK 로드 대기
      const checkKakao = setInterval(() => {
        if (window.Kakao) {
          initKakao();
          clearInterval(checkKakao);
        }
      }, 100);

      return () => clearInterval(checkKakao);
    }
  }, []);

  const handleCopyLink = async () => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.href;

    try {
      await navigator.clipboard.writeText(siteUrl);
      alert('링크가 클립보드에 복사되었습니다!');
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback: 구형 브라우저 대응
      const textArea = document.createElement('textarea');
      textArea.value = siteUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        alert('링크가 클립보드에 복사되었습니다!');
      } catch (err2) {
        alert('링크 복사에 실패했습니다. 브라우저에서 직접 복사해주세요.');
      }
      document.body.removeChild(textArea);
    }
  };

  const handleKakaoShare = () => {
    if (!window.Kakao || !isKakaoReady) {
      alert('카카오톡 공유 기능을 사용할 수 없습니다.');
      return;
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.href;
    const { groom, bride, date, time, location } = weddingInfo;

    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `${groom.name} ❤️ ${bride.name} 결혼합니다`,
          description: `${date} ${time}\n${location.name}${location.hall ? ` ${location.hall}` : ''}`,
          imageUrl: `${siteUrl}/images/gallery/1.jpg`,
          link: {
            mobileWebUrl: siteUrl,
            webUrl: siteUrl,
          },
        },
        buttons: [
          {
            title: '청첩장 보기',
            link: {
              mobileWebUrl: siteUrl,
              webUrl: siteUrl,
            },
          },
        ],
      });
    } catch (err) {
      console.error('Kakao share error:', err);
      alert('카카오톡 공유에 실패했습니다.');
    }
  };

  return (
    <section ref={ref} className="py-20 px-6 bg-pastel-pink-light">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-3xl font-bold text-pastel-gold-dark text-center mb-4">
            청첩장 공유하기
          </h2>
          <p className="text-center text-gray-600 mb-8">
            소중한 분들께 저희 결혼 소식을 전해주세요
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 링크 복사 버튼 */}
            <motion.button
              onClick={handleCopyLink}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 py-4 px-6 rounded-lg shadow-md transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              <span className="font-medium">링크 복사</span>
            </motion.button>

            {/* 카카오톡 공유 버튼 */}
            <motion.button
              onClick={handleKakaoShare}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!isKakaoReady}
              className="flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#FDD835] text-gray-800 py-4 px-6 rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 3C6.486 3 2 6.262 2 10.293c0 2.462 1.449 4.618 3.684 6.027-.247.915-.878 3.293-.993 3.738-.14.542.198.535.417.388.164-.11 2.667-1.822 3.722-2.54.698.12 1.423.187 2.17.187 5.514 0 10-3.262 10-7.293C22 6.262 17.514 3 12 3z" />
              </svg>
              <span className="font-medium">카카오톡 공유</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
