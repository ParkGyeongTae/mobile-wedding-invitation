# 🤖 Claude Code - 프로젝트 가이드

> 이 문서는 Claude Code가 프로젝트를 효율적으로 이해하고 작업하기 위한 실용적 레퍼런스입니다.

---

## 📋 프로젝트 개요

**유형**: 모바일 청첩장 웹 애플리케이션
**목적**: 반응형 모바일 청첩장 (환경 변수 기반 개인정보 관리)
**배포**: GitHub Pages (Static Export)

---

## 🏗️ 아키텍처

### 디렉토리 구조

```
mobile-wedding-invitation/
├── app/                      # Next.js 15 App Router
│   ├── layout.tsx           # 전역 레이아웃 (폰트, 메타데이터)
│   ├── page.tsx             # 메인 페이지 (컴포넌트 조합)
│   └── globals.css          # Tailwind 설정 + 커스텀 CSS
├── components/               # 9개 독립 컴포넌트
│   ├── HeroSection.tsx      # 메인 화면 (신랑/신부, 날짜, 캘린더)
│   ├── InvitationSection.tsx # 초대 문구
│   ├── DdayCounter.tsx      # 실시간 D-Day 카운터
│   ├── Gallery.tsx          # 사진 갤러리 (모달)
│   ├── LocationSection.tsx  # 장소 + 지도 링크 (네이버/카카오/구글/T맵)
│   ├── AccountSection.tsx   # 계좌번호 + 복사/송금 (토스/카카오페이)
│   ├── Guestbook.tsx        # Firebase 방명록
│   ├── FloatingHearts.tsx   # 배경 하트 애니메이션
│   └── Footer.tsx           # 푸터
├── lib/
│   ├── data.ts              # 🔑 데이터 중앙화 (환경 변수 → 상수)
│   ├── types.ts             # TypeScript 인터페이스
│   ├── utils.ts             # 유틸리티 함수
│   └── firebase.ts          # Firebase 설정
├── public/images/gallery/   # 갤러리 이미지 (1.jpg, 2.jpg, ...)
└── .env.local               # 개인정보 (Git 제외)
```

### 핵심 패턴

**1. 데이터 중앙화**
- `lib/data.ts`에서 환경 변수를 읽어 상수로 export
- 모든 컴포넌트는 `lib/data.ts`에서 데이터 import
- 개인정보 수정: `.env.local` 파일만 수정

**2. 컴포넌트 독립성**
- 각 컴포넌트는 독립적으로 작동
- Props 최소화, 전역 상태 없음

**3. 타입 안정성**
- `lib/types.ts`에서 모든 타입 정의
- 환경 변수는 fallback 값 제공

---

## 🛠️ 기술 스택

| 분류 | 기술 | 용도 |
|------|------|------|
| **프레임워크** | Next.js 15 | App Router, Static Export |
| **언어** | TypeScript 5.7 | 타입 안정성 |
| **스타일링** | Tailwind CSS 3.4 | Utility-first CSS |
| **애니메이션** | Framer Motion 11 | 스크롤 애니메이션 (`useInView`) |
| **DB** | Firebase Firestore | 실시간 방명록 |
| **배포** | GitHub Pages | Static HTML 호스팅 |

### 주요 의존성

```json
{
  "dependencies": {
    "next": "^15.1.3",
    "react": "^18.3.1",
    "firebase": "^11.1.0",
    "framer-motion": "^11.15.0"
  }
}
```

---

## 📝 코딩 컨벤션

### 1. 환경 변수

**네이밍**: `NEXT_PUBLIC_` 접두사 (클라이언트 노출)

```typescript
// .env.local
NEXT_PUBLIC_GROOM_NAME=홍길동
NEXT_PUBLIC_WEDDING_DATE=2024-12-25
```

**사용**: `lib/data.ts`에서 중앙 관리

```typescript
// lib/data.ts
export const weddingInfo: WeddingInfo = {
  groom: {
    name: process.env.NEXT_PUBLIC_GROOM_NAME || '신랑 이름',
  },
  // ...
};
```

### 2. 컴포넌트 패턴

**파일 구조**:
```typescript
'use client'; // Client Component (상호작용 있을 때만)

import { /* ... */ } from 'lib/data';
import { motion } from 'framer-motion';

export default function ComponentName() {
  // 로직
  return (
    <motion.section>
      {/* JSX */}
    </motion.section>
  );
}
```

**스타일링**: Tailwind utility 클래스
```typescript
<div className="flex flex-col md:flex-row gap-4 px-4 md:px-8">
```

### 3. 애니메이션 패턴

**스크롤 애니메이션**: `useInView` 훅 사용
```typescript
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: '-100px' });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 50 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.5 }}
/>
```

### 4. Firebase 패턴

**Firestore 실시간 구독**:
```typescript
useEffect(() => {
  const q = query(
    collection(db, 'guestbook'),
    orderBy('createdAt', 'desc'),
    limit(50)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    setEntries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });

  return () => unsubscribe(); // cleanup
}, []);
```

---

## 🎨 디자인 시스템

### 색상

```typescript
// tailwind.config.ts
colors: {
  pastel: {
    pink: '#FFE5EC',        // 메인
    'pink-dark': '#FFB4C8', // 강조
    'pink-light': '#FFF0F5', // 배경
    gold: '#F4D6A5',         // 포인트
    'gold-dark': '#E6C189',
    'gold-light': '#FFF8E7',
  }
}
```

**사용 예**:
```typescript
<div className="bg-pastel-pink-light text-pastel-pink-dark">
```

### 폰트

- **Serif**: `Playfair Display` (제목)
- **Sans**: `Noto Sans KR` (본문)

```typescript
<h1 className="font-serif">제목</h1>
<p className="font-sans">본문</p>
```

### 반응형 브레이크포인트

```typescript
className="
  text-base md:text-lg lg:text-xl   // 폰트 크기
  px-4 md:px-8 lg:px-12             // 패딩
  grid-cols-1 md:grid-cols-2         // 그리드
"
```

---

## 🔄 주요 작업 패턴

### 1. 결혼식 정보 수정

**파일**: `.env.local` (또는 GitHub Secrets)

```bash
# 1. .env.local 수정
NEXT_PUBLIC_GROOM_NAME=새로운이름
NEXT_PUBLIC_WEDDING_DATE=2025-06-15

# 2. 개발 서버 재시작
npm run dev

# 3. 확인 후 배포
git push origin main
```

### 2. 갤러리 이미지 추가

```bash
# 1. 이미지 저장
public/images/gallery/1.jpg
public/images/gallery/2.jpg
# ...

# 2. 개수 설정 (.env.local)
NEXT_PUBLIC_GALLERY_COUNT=10

# 3. 빌드 확인
npm run build
```

### 3. 컴포넌트 수정/추가

**패턴**:
1. `components/` 폴더에 새 컴포넌트 생성
2. `lib/types.ts`에 필요한 타입 정의
3. `lib/data.ts`에 데이터 추가 (환경 변수 활용)
4. `app/page.tsx`에서 컴포넌트 import 및 배치

**예시**: 새로운 섹션 추가
```typescript
// components/NewSection.tsx
'use client';
import { weddingInfo } from '@/lib/data';

export default function NewSection() {
  return (
    <section className="py-12 px-4">
      {/* 내용 */}
    </section>
  );
}

// app/page.tsx
import NewSection from '@/components/NewSection';
// ...
<NewSection />
```

### 4. 스타일 수정

**방법 1**: Tailwind utility 클래스 변경
```typescript
// 기존
<div className="bg-pastel-pink">

// 수정
<div className="bg-pastel-gold">
```

**방법 2**: Tailwind 설정 변경
```typescript
// tailwind.config.ts
colors: {
  pastel: {
    pink: '#NEW_COLOR', // 색상 코드 변경
  }
}
```

### 5. 애니메이션 수정

**속도 조정**:
```typescript
<motion.div
  transition={{ duration: 0.8 }} // 0.5 → 0.8 (느리게)
/>
```

**효과 변경**:
```typescript
initial={{ opacity: 0, y: 50 }}    // 아래에서 위로
initial={{ opacity: 0, scale: 0.8 }} // 작아졌다가 커지기
```

---

## 🚀 배포

### GitHub Pages 배포

**자동 배포**: `main` 브랜치에 push 시 자동 빌드/배포

```bash
git add .
git commit -m "Update wedding info"
git push origin main
```

**환경 변수**: GitHub Secrets 설정
- Settings → Secrets → Actions
- `NEXT_PUBLIC_` 없이 변수명 입력 (예: `GROOM_NAME`)

### Static Export 설정

```typescript
// next.config.ts
export default {
  output: 'export',
  images: { unoptimized: true },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};
```

---

## 🐛 문제 해결

### 빌드 에러

**1. 환경 변수 누락**
```bash
# 에러: NEXT_PUBLIC_GROOM_NAME is undefined
# 해결: .env.local 파일 확인 및 재시작
```

**2. 이미지 404**
```bash
# 에러: Failed to load /images/gallery/1.jpg
# 해결: public/images/gallery/ 폴더 확인
```

### Firebase 에러

**1. Firestore 권한 에러**
```
FirebaseError: Missing or insufficient permissions
```
해결: Firebase Console → Firestore → Rules → 읽기 권한 허용

**2. 환경 변수 누락**
```typescript
// .env.local 확인
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
```

### 개발 서버

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 빌드 테스트
npm run build
npm start
```

---

## 📦 주요 파일 레퍼런스

### `lib/data.ts`
- 모든 결혼식 정보 중앙 관리
- 환경 변수를 읽어 상수로 export
- **수정 시**: 환경 변수만 변경 (코드 수정 불필요)

### `lib/types.ts`
- TypeScript 인터페이스 정의
- `WeddingInfo`, `GalleryImage`, `GuestbookEntry`

### `app/page.tsx`
- 메인 페이지 (컴포넌트 조합)
- 컴포넌트 순서 변경 시 이 파일 수정

### `tailwind.config.ts`
- 색상, 폰트, 애니메이션 설정
- 디자인 시스템 커스터마이징

---

## 🎯 핵심 원칙

1. **데이터 중앙화**: `lib/data.ts`에서 모든 데이터 관리
2. **환경 변수 활용**: 개인정보는 `.env.local`에만 저장
3. **컴포넌트 독립성**: 각 컴포넌트는 독립적으로 작동
4. **타입 안정성**: TypeScript로 런타임 에러 방지
5. **모바일 우선**: 반응형 디자인 (Mobile-first)

---

**개발**: Claude Code (Sonnet 4.5)
**버전**: 1.0.0
**최종 업데이트**: 2026-01-09
