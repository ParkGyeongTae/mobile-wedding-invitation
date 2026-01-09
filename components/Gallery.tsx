'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { galleryImages } from '@/lib/data';

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

          {/* 이전 버튼 */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl z-20 hover:text-gray-300 transition-colors bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            ‹
          </button>

          {/* 이미지 컨테이너 (스와이프 가능) */}
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              // 스와이프 감지 (100px 이상 드래그 시)
              if (info.offset.x > 100) {
                goToPrevious();
              } else if (info.offset.x < -100) {
                goToNext();
              }
            }}
            className="relative max-w-4xl max-h-[90vh] w-full px-16 cursor-grab active:cursor-grabbing"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[90vh] flex items-center justify-center">
              <Image
                src={galleryImages[selectedIndex].url}
                alt={galleryImages[selectedIndex].alt}
                width={1200}
                height={800}
                className="object-contain rounded-lg max-h-full w-auto h-auto select-none"
                draggable={false}
              />
            </div>

            {/* 이미지 카운터 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>

          {/* 다음 버튼 */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl z-20 hover:text-gray-300 transition-colors bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            ›
          </button>
        </motion.div>
      )}
    </section>
  );
}
