'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
  where,
} from 'firebase/firestore';
import { RsvpEntry } from '@/lib/types';

export default function RsvpSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Form 상태
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'not-attending' | 'undecided'>('attending');
  const [guestCount, setGuestCount] = useState(1);
  const [mealOption, setMealOption] = useState<'regular' | 'vegetarian'>('regular');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 통계 상태
  const [totalAttending, setTotalAttending] = useState(0);
  const [totalGuests, setTotalGuests] = useState(0);

  useEffect(() => {
    if (!isFirebaseConfigured() || !db) {
      setError('참석 여부 확인 기능을 사용하려면 Firebase 설정이 필요합니다.');
      return;
    }

    try {
      // 참석자 통계를 위한 실시간 구독
      const q = query(
        collection(db, 'rsvp'),
        where('attendance', '==', 'attending')
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const attendingCount = snapshot.docs.length;
          const guestCount = snapshot.docs.reduce((sum, doc) => {
            return sum + (doc.data().guestCount || 1);
          }, 0);

          setTotalAttending(attendingCount);
          setTotalGuests(guestCount);
          setError(null);
        },
        (err) => {
          console.error('Error fetching RSVP stats:', err);
          setError('참석 정보를 불러오는 중 오류가 발생했습니다.');
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Firebase initialization error:', err);
      setError('Firebase 연결에 실패했습니다.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      alert('이름과 연락처를 입력해주세요.');
      return;
    }

    if (!isFirebaseConfigured() || !db) {
      alert('참석 여부 확인 기능을 사용하려면 Firebase 설정이 필요합니다.');
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      await addDoc(collection(db, 'rsvp'), {
        name: name.trim(),
        phone: phone.trim(),
        attendance,
        guestCount: attendance === 'attending' ? guestCount : 0,
        mealOption: attendance === 'attending' ? mealOption : null,
        message: message.trim() || null,
        createdAt: Timestamp.now(),
      });

      // 폼 초기화
      setName('');
      setPhone('');
      setAttendance('attending');
      setGuestCount(1);
      setMealOption('regular');
      setMessage('');

      setSubmitSuccess(true);
      alert('참석 여부가 등록되었습니다! 감사합니다.');

      // 3초 후 성공 메시지 숨김
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err: any) {
      console.error('Error adding RSVP entry:', err);

      if (err?.code === 'permission-denied') {
        alert('참석 여부 등록 권한이 없습니다. Firebase 보안 규칙을 확인해주세요.');
      } else if (err?.code === 'unavailable') {
        alert('네트워크 연결을 확인해주세요.');
      } else {
        alert('참석 여부 등록에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-3xl font-bold text-pastel-gold-dark text-center mb-4">
            참석 여부
          </h2>
          <p className="text-center text-gray-600 mb-8">
            참석 여부를 알려주시면 준비에 큰 도움이 됩니다
          </p>

          {/* 참석 통계 */}
          {!error && isFirebaseConfigured() && (
            <div className="bg-pastel-pink-light rounded-lg p-6 mb-8">
              <div className="flex justify-around text-center">
                <div>
                  <p className="text-2xl font-bold text-pastel-gold-dark">{totalAttending}</p>
                  <p className="text-sm text-gray-600">참석 인원</p>
                </div>
                <div className="border-l border-pastel-pink"></div>
                <div>
                  <p className="text-2xl font-bold text-pastel-gold-dark">{totalGuests}</p>
                  <p className="text-sm text-gray-600">총 인원</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6 text-sm">
              {error}
            </div>
          )}

          {submitSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-sm">
              참석 여부가 성공적으로 등록되었습니다!
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
            {/* 이름 */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-gold"
                maxLength={20}
                disabled={isSubmitting}
                required
              />
            </div>

            {/* 연락처 */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="010-1234-5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-gold"
                maxLength={20}
                disabled={isSubmitting}
                required
              />
            </div>

            {/* 참석 여부 */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                참석 여부 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAttendance('attending')}
                  className={`py-3 px-4 rounded-lg font-medium transition-all ${
                    attendance === 'attending'
                      ? 'bg-pastel-gold text-gray-800 shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  disabled={isSubmitting}
                >
                  참석
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance('not-attending')}
                  className={`py-3 px-4 rounded-lg font-medium transition-all ${
                    attendance === 'not-attending'
                      ? 'bg-pastel-gold text-gray-800 shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  disabled={isSubmitting}
                >
                  불참
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance('undecided')}
                  className={`py-3 px-4 rounded-lg font-medium transition-all ${
                    attendance === 'undecided'
                      ? 'bg-pastel-gold text-gray-800 shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  disabled={isSubmitting}
                >
                  미정
                </button>
              </div>
            </div>

            {/* 참석 인원 (참석 시만 표시) */}
            {attendance === 'attending' && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    참석 인원 (본인 포함)
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-gold"
                    disabled={isSubmitting}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num}명
                      </option>
                    ))}
                  </select>
                </div>

                {/* 식사 옵션 */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    식사 옵션
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setMealOption('regular')}
                      className={`py-3 px-4 rounded-lg font-medium transition-all ${
                        mealOption === 'regular'
                          ? 'bg-pastel-gold text-gray-800 shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      disabled={isSubmitting}
                    >
                      일반
                    </button>
                    <button
                      type="button"
                      onClick={() => setMealOption('vegetarian')}
                      className={`py-3 px-4 rounded-lg font-medium transition-all ${
                        mealOption === 'vegetarian'
                          ? 'bg-pastel-gold text-gray-800 shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      disabled={isSubmitting}
                    >
                      채식
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* 메시지 (선택사항) */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                전하실 말씀 (선택사항)
              </label>
              <textarea
                placeholder="축하 메시지나 요청 사항을 남겨주세요"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-gold resize-none"
                maxLength={200}
                disabled={isSubmitting}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {message.length}/200
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-pastel-gold hover:bg-pastel-gold-dark text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '등록 중...' : '참석 여부 등록하기'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            * 개인정보는 결혼식 준비 목적으로만 사용되며, 이후 안전하게 삭제됩니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
