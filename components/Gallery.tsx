'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { galleryImages } from '@/lib/data';

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // 핀치 줌 상태
  const [scale, setScale] = useState(1);
  const [initialDistance, setInitialDistance] = useState(0);
  const [initialScale, setInitialScale] = useState(1);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // 두 터치 포인트 사이의 거리 계산
  const getDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // 핀치 줌 시작
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      setInitialDistance(distance);
      setInitialScale(scale);
    }
  };

  // 핀치 줌 중
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialDistance > 0) {
      e.preventDefault();
      const distance = getDistance(e.touches[0], e.touches[1]);
      const newScale = Math.min(Math.max((distance / initialDistance) * initialScale, 1), 4);
      setScale(newScale);
    }
  };

  // 핀치 줌 종료
  const handleTouchEnd = (e: React.TouchEvent) => {
    setInitialDistance(0);
  };

  // 더블 탭으로 줌 인/아웃
  const handleDoubleClick = () => {
    if (scale > 1) {
      setScale(1);
    } else {
      setScale(2);
    }
  };

  // 이미지 변경 시 줌 리셋
  useEffect(() => {
    setScale(1);
  }, [selectedIndex]);

  // 이전 이미지로 이동
  const goToPrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  // 다음 이미지로 이동
  const goToNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % galleryImages.length);
  };

  // 모달 열림 시 배경 스크롤 비활성화
  useEffect(() => {
    if (selectedIndex !== null) {
      // 스크롤 비활성화
      document.body.style.overflow = 'hidden';
    } else {
      // 스크롤 복원
      document.body.style.overflow = '';
    }

    // cleanup: 컴포넌트 언마운트 시 복원
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  // 키보드 이벤트 처리 (좌우 화살표)
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => {
          if (prev === null) return prev;
          return (prev - 1 + galleryImages.length) % galleryImages.length;
        });
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => {
          if (prev === null) return prev;
          return (prev + 1) % galleryImages.length;
        });
      } else if (e.key === 'Escape') {
        setSelectedIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <section ref={ref} className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-3xl font-bold text-pastel-gold-dark text-center mb-12">
            우리의 순간들
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer group"
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {selectedIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
        >
          {/* 닫기 버튼 */}
          <button
            className="absolute top-4 right-4 text-white text-4xl z-20 hover:text-gray-300 transition-colors"
            onClick={() => setSelectedIndex(null)}
          >
            ×
          </button>

          {/* 왼쪽 화살표 버튼 */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white text-5xl hover:text-gray-300 transition-colors bg-black/30 hover:bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            ‹
          </button>

          {/* 오른쪽 화살표 버튼 */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white text-5xl hover:text-gray-300 transition-colors bg-black/30 hover:bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            ›
          </button>

          {/* 이미지 컨테이너 (스와이프 가능) */}
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            drag={scale === 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              // 스와이프 감지 (100px 이상 드래그 시, scale이 1일 때만)
              if (scale === 1) {
                if (info.offset.x > 100) {
                  goToPrevious();
                } else if (info.offset.x < -100) {
                  goToNext();
                }
              }
            }}
            className="absolute inset-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={imageContainerRef}
              className="relative w-full h-full flex items-center justify-center overflow-hidden touch-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onDoubleClick={handleDoubleClick}
            >
              <motion.div
                style={{
                  scale: scale,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="select-none"
              >
                <Image
                  src={galleryImages[selectedIndex].url}
                  alt={galleryImages[selectedIndex].alt}
                  width={1200}
                  height={800}
                  className="object-contain max-h-screen w-auto h-auto select-none pointer-events-none"
                  draggable={false}
                  style={{ maxWidth: '100vw' }}
                />
              </motion.div>
            </div>

            {/* 이미지 카운터 */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full z-30 pointer-events-none">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
