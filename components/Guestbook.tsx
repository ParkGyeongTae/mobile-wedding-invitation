'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { GuestbookEntry } from '@/lib/types';

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function Guestbook() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 삭제 관련 상태
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured() || !db) {
      setError('방명록 기능을 사용하려면 Firebase 설정이 필요합니다.');
      return;
    }

    try {
      const q = query(
        collection(db, 'guestbook'),
        orderBy('createdAt', 'desc'),
        limit(50)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const entries: GuestbookEntry[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            passwordHash: doc.data().passwordHash,
          }));
          setEntries(entries);
          setError(null);
        },
        (err) => {
          console.error('Error fetching guestbook:', err);
          setError('방명록을 불러오는 중 오류가 발생했습니다. Firebase 보안 규칙을 확인해주세요.');
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

    if (!name.trim() || !message.trim()) {
      alert('이름과 메시지를 입력해주세요.');
      return;
    }

    if (!password.trim()) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    if (!isFirebaseConfigured() || !db) {
      alert('방명록 기능을 사용하려면 Firebase 설정이 필요합니다.');
      return;
    }

    setIsSubmitting(true);

    try {
      const passwordHash = await hashPassword(password.trim());

      await addDoc(collection(db, 'guestbook'), {
        name: name.trim(),
        message: message.trim(),
        passwordHash,
        createdAt: Timestamp.now(),
      });

      setName('');
      setPassword('');
      setMessage('');
      alert('방명록이 등록되었습니다!');
    } catch (err: any) {
      console.error('Error adding guestbook entry:', err);

      if (err?.code === 'permission-denied') {
        alert('방명록 등록 권한이 없습니다. Firebase 보안 규칙을 확인해주세요.');
      } else if (err?.code === 'unavailable') {
        alert('네트워크 연결을 확인해주세요.');
      } else {
        alert('방명록 등록에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async (entry: GuestbookEntry) => {
    if (!deletePassword.trim()) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    if (!isFirebaseConfigured() || !db) {
      alert('Firebase 설정이 필요합니다.');
      return;
    }

    setIsDeleting(true);

    try {
      const inputHash = await hashPassword(deletePassword.trim());

      if (inputHash !== entry.passwordHash) {
        alert('비밀번호가 일치하지 않습니다.');
        setIsDeleting(false);
        return;
      }

      await deleteDoc(doc(db, 'guestbook', entry.id));
      setDeletingId(null);
      setDeletePassword('');
    } catch (err: any) {
      console.error('Error deleting guestbook entry:', err);

      if (err?.code === 'permission-denied') {
        alert('삭제 권한이 없습니다. Firebase 보안 규칙을 확인해주세요.');
      } else {
        alert('삭제에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;

    return date.toLocaleDateString('ko-KR');
  };

  return (
    <section ref={ref} className="py-20 px-6 bg-gradient-to-b from-white to-pastel-pink-light">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-3xl font-bold text-pastel-gold-dark text-center mb-8">
            축하 메시지
          </h2>

          {error && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full sm:flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-gold"
                maxLength={20}
                disabled={isSubmitting}
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full sm:w-44 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-gold"
                maxLength={20}
                disabled={isSubmitting}
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="축하 메시지를 남겨주세요"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-gold resize-none"
                maxLength={200}
                disabled={isSubmitting}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {message.length}/200
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              * 비밀번호는 나중에 메시지를 삭제할 때 사용됩니다.
            </p>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || !password.trim() || !message.trim()}
              className="w-full bg-pastel-gold hover:bg-pastel-gold-dark text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '등록 중...' : '메시지 남기기'}
            </button>
          </form>

          <div className="space-y-4">
            {entries.length === 0 && !error && (
              <p className="text-center text-gray-500 py-8">
                첫 번째 축하 메시지를 남겨주세요!
              </p>
            )}

            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">{entry.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {formatDate(entry.createdAt)}
                    </span>
                    {entry.passwordHash && (
                      <button
                        onClick={() => {
                          if (deletingId === entry.id) {
                            setDeletingId(null);
                            setDeletePassword('');
                          } else {
                            setDeletingId(entry.id);
                            setDeletePassword('');
                          }
                        }}
                        className="text-xs text-gray-400 hover:text-red-400 transition-colors"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{entry.message}</p>

                {deletingId === entry.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">비밀번호를 입력하면 메시지가 삭제됩니다.</p>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        placeholder="비밀번호"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleDeleteConfirm(entry);
                        }}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                        disabled={isDeleting}
                        autoFocus
                      />
                      <button
                        onClick={() => handleDeleteConfirm(entry)}
                        disabled={isDeleting}
                        className="px-4 py-2 text-sm bg-red-400 hover:bg-red-500 text-white rounded-lg transition-colors disabled:opacity-50"
                      >
                        {isDeleting ? '...' : '확인'}
                      </button>
                      <button
                        onClick={() => {
                          setDeletingId(null);
                          setDeletePassword('');
                        }}
                        className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
