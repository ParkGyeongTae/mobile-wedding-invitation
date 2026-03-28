import type { Metadata } from "next";
import { Noto_Sans_KR, Playfair_Display } from "next/font/google";
import Script from "next/script";
import NaverMapScript from "@/components/NaverMapScript";
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
  title: "박경태 ♡ 최미연",
  description: "우리의 특별한 날에 초대합니다. 7월 12일(일) 12시 50분",
  keywords: ["청첩장", "모바일 청첩장", "웨딩", "결혼"],
  openGraph: {
    title: "박경태 ♡ 최미연",
    description: "우리의 특별한 날에 초대합니다. 7월 12일(일) 12시 50분",
    type: "website",
    images: [
      {
        url: "https://parkgyeongtae.github.io/mobile-wedding-invitation/images/gallery/4.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        {/* 초기 뷰포트 높이를 CSS 변수로 고정 - 툴바 show/hide 시 레이아웃 변동 방지 */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.style.setProperty('--app-height', window.innerHeight + 'px');` }} />
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
        <NaverMapScript />
        {children}
      </body>
    </html>
  );
}
