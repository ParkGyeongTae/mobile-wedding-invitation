'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { weddingInfo } from '@/lib/data';
import { AccountInfo } from '@/lib/types';
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

  const AccountCard = ({ account, title }: { account: AccountInfo; title: string }) => (
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
            <p className="text-sm text-gray-600">{account.bank}</p>
            <p className="text-lg font-medium text-gray-800">{account.number}</p>
            <p className="text-sm text-gray-600">{account.holder}</p>
          </div>
          <button
            onClick={() => handleCopy(account.number, title)}
            className="bg-pastel-gold hover:bg-pastel-gold-dark text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            {copiedAccount === title ? '복사됨!' : '복사'}
          </button>
        </div>

      </div>
    </motion.div>
  );

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
              onClick={() => setShowAccounts(!showAccounts)}
              className="bg-pastel-gold hover:bg-pastel-gold-dark text-gray-800 px-8 py-3 rounded-full font-medium transition-all duration-200 shadow-md"
            >
              {showAccounts ? '계좌번호 숨기기' : '계좌번호 확인하기'}
            </button>
          </div>

          {showAccounts && (
            <div className="space-y-4">
              {groomAccounts.map(({ account, title }) => (
                <AccountCard key={title} account={account} title={title} />
              ))}
              {brideAccounts.map(({ account, title }) => (
                <AccountCard key={title} account={account} title={title} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
