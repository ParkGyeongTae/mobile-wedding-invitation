# 모바일 청첩장 (Mobile Wedding Invitation)

모던하고 우아한 모바일 청첩장 웹 애플리케이션입니다.

## 기술 스택

- **프레임워크**: Next.js 15+ (React 18)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **애니메이션**: Framer Motion
- **데이터베이스**: Firebase Firestore (방명록 기능)
- **배포**: Vercel

## 주요 기능

- ✨ 반응형 디자인 (모바일 최적화)
- 💕 메인 이미지와 초대 문구
- ⏰ 실시간 D-Day 카운터
- 🖼️ 웨딩 사진 갤러리
- 📍 날짜/시간/장소 정보
- 🗺️ 네이버/카카오/구글 지도 연동
- 💰 계좌번호 복사 기능
- 💳 카카오페이/토스 송금 링크
- 📝 방명록 (Firebase Firestore)
- 📅 캘린더 일정 추가 기능
- 🎨 페이드인 스크롤 애니메이션
- 💖 하트 플로팅 애니메이션

## 설치 및 실행

### 1. 의존성 설치

\`\`\`bash
npm install
\`\`\`

### 2. Firebase 설정

1. [Firebase Console](https://console.firebase.google.com/)에서 프로젝트 생성
2. Firestore Database 생성 (테스트 모드로 시작)
3. 프로젝트 설정에서 웹 앱 추가
4. Firebase 설정 정보를 복사하여 환경 변수 설정

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

\`.env.local\` 파일을 열어 Firebase 설정 정보를 입력하세요:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
\`\`\`

### 3. 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 4. 프로덕션 빌드

\`\`\`bash
npm run build
npm run start
\`\`\`

## 커스터마이징

### 결혼식 정보 수정

\`lib/data.ts\` 파일을 수정하여 결혼식 정보를 입력하세요:

\`\`\`typescript
export const weddingInfo: WeddingInfo = {
  groom: {
    name: '신랑 이름',
    father: '신랑 아버지',
    mother: '신랑 어머니',
    account: {
      bank: '은행명',
      number: '계좌번호',
      holder: '신랑 이름',
    },
  },
  bride: {
    name: '신부 이름',
    father: '신부 아버지',
    mother: '신부 어머니',
    account: {
      bank: '은행명',
      number: '계좌번호',
      holder: '신부 이름',
    },
  },
  date: '2024-12-25',
  time: '14:00',
  location: {
    name: '웨딩홀 이름',
    address: '서울특별시 강남구 테헤란로 123',
    tel: '02-1234-5678',
    lat: 37.5665,
    lng: 126.9780,
  },
};
\`\`\`

### 갤러리 이미지 추가

1. \`public/images/gallery/\` 폴더를 생성하세요
2. 웨딩 사진을 \`1.jpg\`, \`2.jpg\`, ... 형식으로 저장하세요
3. \`lib/data.ts\`의 \`galleryImages\` 배열에서 이미지 경로를 확인하세요

### 초대 메시지 수정

\`lib/data.ts\` 파일의 \`invitationMessage\`를 수정하세요.

### 색상 테마 변경

\`tailwind.config.ts\` 파일에서 파스텔 색상을 원하는 색상으로 변경할 수 있습니다:

\`\`\`typescript
colors: {
  pastel: {
    pink: '#FFE5EC',
    'pink-dark': '#FFB4C8',
    'pink-light': '#FFF0F5',
    gold: '#F4D6A5',
    'gold-dark': '#E6C189',
    'gold-light': '#FFF8E7',
  },
}
\`\`\`

## Vercel 배포

1. GitHub에 코드를 푸시하세요
2. [Vercel](https://vercel.com)에 가입하고 프로젝트를 import하세요
3. 환경 변수에 Firebase 설정을 추가하세요
4. 배포를 진행하세요

배포 후 자동으로 도메인이 생성되며, 커스텀 도메인도 연결할 수 있습니다.

## 라이선스

MIT License

## 개발자

Made with ♥ using Next.js & Tailwind CSS
