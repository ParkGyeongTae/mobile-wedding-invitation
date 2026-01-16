import type { Metadata } from "next";
import { Noto_Sans_KR, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-kr",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "모바일 청첩장",
  description: "우리의 특별한 날에 초대합니다",
  keywords: ["청첩장", "모바일 청첩장", "웨딩", "결혼"],
  openGraph: {
    title: "모바일 청첩장",
    description: "우리의 특별한 날에 초대합니다",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const naverMapClientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body
        className={`${notoSansKr.variable} ${playfair.variable} font-sans antialiased bg-pastel-pink-light`}
      >
        {/* 카카오 SDK */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* 네이버 지도 API */}
        {naverMapClientId && (
          <Script
            src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapClientId}`}
            strategy="afterInteractive"
          />
        )}
        {children}
      </body>
    </html>
  );
}
