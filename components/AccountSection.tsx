'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { weddingInfo } from '@/lib/data';
import { copyToClipboard } from '@/lib/utils';

export default function AccountSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showAccounts, setShowAccounts] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = async (text: string, name: string) => {
    try {
      await copyToClipboard(text);
      setCopiedAccount(name);
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch (err) {
      alert('복사에 실패했습니다.');
    }
  };

  const AccountCard = ({ person, title }: { person: typeof weddingInfo.groom; title: string }) => {
    if (!person.account) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-br from-pastel-pink-light to-white rounded-lg p-6 shadow-md"
      >
        <h3 className="font-bold text-lg text-gray-800 mb-4">{title}</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{person.account.bank}</p>
              <p className="text-lg font-medium text-gray-800">{person.account.number}</p>
              <p className="text-sm text-gray-600">{person.account.holder}</p>
            </div>
            <button
              onClick={() => handleCopy(person.account!.number, person.name)}
              className="bg-pastel-gold hover:bg-pastel-gold-dark text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              {copiedAccount === person.name ? '복사됨!' : '복사'}
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                window.open(
                  `https://qr.kakaopay.com/`,
                  '_blank'
                )
              }
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              카카오페이
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://toss.me/`,
                  '_blank'
                )
              }
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              토스
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section ref={ref} className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-3xl font-bold text-pastel-gold-dark text-center mb-8">
            마음 전하실 곳
          </h2>

          <p className="text-center text-gray-600 mb-8">
            참석이 어려우신 분들을 위해
            <br />
            계좌번호를 기재하였습니다
          </p>

          <div className="text-center mb-6">
            <button
              onClick={() => setShowAccounts(!showAccounts)}
              className="bg-pastel-gold hover:bg-pastel-gold-dark text-gray-800 px-8 py-3 rounded-full font-medium transition-all duration-200 shadow-md"
            >
              {showAccounts ? '계좌번호 숨기기' : '계좌번호 확인하기'}
            </button>
          </div>

          {showAccounts && (
            <div className="space-y-4">
              <AccountCard person={weddingInfo.groom} title={`신랑 ${weddingInfo.groom.name}`} />
              <AccountCard person={weddingInfo.bride} title={`신부 ${weddingInfo.bride.name}`} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
