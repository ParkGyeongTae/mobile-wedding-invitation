'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { weddingInfo } from '@/lib/data';
import { AccountInfo } from '@/lib/types';
import { copyToClipboard } from '@/lib/utils';

export default function AccountSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showAccounts, setShowAccounts] = useState(false);
  const [expandedAccounts, setExpandedAccounts] = useState<Set<string>>(new Set());
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

  const toggleExpand = (title: string) => {
    setExpandedAccounts(prev => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  const AccountRow = ({ account, title }: { account: AccountInfo; title: string }) => {
    const isExpanded = expandedAccounts.has(title);
    return (
      <div className="rounded-lg overflow-hidden shadow-sm border border-pastel-pink">
        <button
          onClick={() => toggleExpand(title)}
          className="w-full flex items-center justify-between px-3 py-3 bg-gradient-to-r from-pastel-pink-light to-white text-left"
        >
          <span className="font-medium text-gray-800 text-sm leading-tight">{title}</span>
          <span className="text-gray-400 text-sm ml-1">{isExpanded ? '▲' : '▼'}</span>
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2 px-3 py-3 bg-white border-t border-pastel-pink">
                <div>
                  <p className="text-xs text-gray-500">{account.bank}</p>
                  <p className="text-sm font-medium text-gray-800 break-all">{account.number}</p>
                  <p className="text-xs text-gray-500">{account.holder}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleCopy(account.number, title); }}
                  className="w-full bg-pastel-gold hover:bg-pastel-gold-dark text-gray-800 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200"
                >
                  {copiedAccount === title ? '복사됨!' : '복사'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const groomAccounts = [
    weddingInfo.groom.account && { account: weddingInfo.groom.account, title: `신랑 ${weddingInfo.groom.name}` },
    weddingInfo.groom.fatherAccount && { account: weddingInfo.groom.fatherAccount, title: `신랑 아버지 ${weddingInfo.groom.father}` },
    weddingInfo.groom.motherAccount && { account: weddingInfo.groom.motherAccount, title: `신랑 어머니 ${weddingInfo.groom.mother}` },
  ].filter(Boolean) as { account: AccountInfo; title: string }[];

  const brideAccounts = [
    weddingInfo.bride.account && { account: weddingInfo.bride.account, title: `신부 ${weddingInfo.bride.name}` },
    weddingInfo.bride.fatherAccount && { account: weddingInfo.bride.fatherAccount, title: `신부 아버지 ${weddingInfo.bride.father}` },
    weddingInfo.bride.motherAccount && { account: weddingInfo.bride.motherAccount, title: `신부 어머니 ${weddingInfo.bride.mother}` },
  ].filter(Boolean) as { account: AccountInfo; title: string }[];

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
              onClick={() => { setShowAccounts(!showAccounts); setExpandedAccounts(new Set()); }}
              className="bg-pastel-gold hover:bg-pastel-gold-dark text-gray-800 px-8 py-3 rounded-full font-medium transition-all duration-200 shadow-md"
            >
              {showAccounts ? '계좌번호 숨기기' : '계좌번호 확인하기'}
            </button>
          </div>

          <AnimatePresence>
            {showAccounts && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 gap-3"
              >
                <div className="space-y-3">
                  <p className="text-center text-sm font-medium text-gray-500">신랑측</p>
                  {groomAccounts.map(({ account, title }) => (
                    <AccountRow key={title} account={account} title={title} />
                  ))}
                </div>
                <div className="space-y-3">
                  <p className="text-center text-sm font-medium text-gray-500">신부측</p>
                  {brideAccounts.map(({ account, title }) => (
                    <AccountRow key={title} account={account} title={title} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
