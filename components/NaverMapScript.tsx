'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function NaverMapScript() {
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    // 클라이언트 사이드에서 환경 변수 읽기
    const naverMapClientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
    console.log('Naver Map Client ID:', naverMapClientId ? 'exists' : 'not found');

    if (naverMapClientId) {
      setClientId(naverMapClientId);
    } else {
      console.warn('NEXT_PUBLIC_NAVER_MAP_CLIENT_ID is not set');
    }
  }, []);

  if (!clientId) {
    return null;
  }

  return (
    <Script
      src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`}
      strategy="lazyOnload"
      onLoad={() => {
        console.log('Naver Maps script loaded successfully');
      }}
      onError={(e) => {
        console.error('Failed to load Naver Maps script:', e);
      }}
    />
  );
}
