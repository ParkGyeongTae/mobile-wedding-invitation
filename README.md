# 💒 모바일 청첩장 (Mobile Wedding Invitation)

<div align="center">

모던하고 우아한 모바일 청첩장 웹 애플리케이션

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

[데모 보기](https://parkgyeongtae.github.io/mobile-wedding-invitation/) | [개발 문서](./CLAUDE.md)

</div>

---

## ✨ 주요 기능

<table>
<tr>
<td width="50%">

### 🎨 디자인
- ✅ 반응형 디자인 (모바일 최적화)
- ✅ 파스텔 핑크/골드 색상 테마
- ✅ Framer Motion 애니메이션
- ✅ 플로팅 하트 효과
- ✅ 페이드인 스크롤 애니메이션

</td>
<td width="50%">

### 🛠️ 기능
- ✅ 실시간 D-Day 카운터
- ✅ 웨딩 사진 갤러리
- ✅ 지도 연동 (네이버/카카오/구글)
- ✅ 계좌번호 복사 & 송금 링크
- ✅ Firebase 방명록
- ✅ 캘린더 일정 추가

</td>
</tr>
</table>

## 🛠️ 기술 스택

| 분류 | 기술 |
|------|------|
| **프레임워크** | Next.js 15 (App Router) |
| **언어** | TypeScript 5.7 |
| **스타일링** | Tailwind CSS 3.4 |
| **애니메이션** | Framer Motion 11 |
| **데이터베이스** | Firebase Firestore |
| **배포** | GitHub Pages / Vercel |

## 📁 프로젝트 구조

```
mobile-wedding-invitation/
├── app/
│   ├── layout.tsx          # 루트 레이아웃 & 폰트 설정
│   ├── page.tsx            # 메인 페이지
│   └── globals.css         # 글로벌 스타일
├── components/
│   ├── HeroSection.tsx     # 히어로 섹션 (메인 화면)
│   ├── InvitationSection.tsx # 초대 문구
│   ├── DdayCounter.tsx     # D-Day 카운터
│   ├── Gallery.tsx         # 갤러리
│   ├── LocationSection.tsx # 장소 정보 & 지도
│   ├── AccountSection.tsx  # 계좌번호 & 송금
│   ├── Guestbook.tsx       # 방명록
│   ├── FloatingHearts.tsx  # 하트 애니메이션
│   └── Footer.tsx          # 푸터
├── lib/
│   ├── types.ts            # TypeScript 타입 정의
│   ├── data.ts             # 결혼식 데이터
│   ├── utils.ts            # 유틸리티 함수
│   └── firebase.ts         # Firebase 설정
├── public/
│   └── images/gallery/     # 갤러리 이미지
└── .github/workflows/
    └── deploy.yml          # GitHub Pages 자동 배포
```

## 🚀 빠른 시작

### 1. 저장소 클론

```bash
git clone https://github.com/ParkGyeongTae/mobile-wedding-invitation.git
cd mobile-wedding-invitation
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정 (선택사항 - 방명록 기능용)

```bash
cp .env.local.example .env.local
```

`.env.local` 파일을 열어 Firebase 설정 정보를 입력하세요:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

> **참고**: 방명록 기능을 사용하지 않으면 환경 변수 설정을 건너뛰어도 됩니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## ⚙️ 커스터마이징

### 📝 결혼식 정보 수정

`lib/data.ts` 파일을 열어 결혼식 정보를 수정하세요:

```typescript
export const weddingInfo: WeddingInfo = {
  groom: {
    name: '신랑 이름',
    father: '신랑 아버지',
    mother: '신랑 어머니',
    account: {
      bank: '은행명',
      number: '1234-5678-9012-3456',
      holder: '신랑 이름',
    },
  },
  bride: {
    name: '신부 이름',
    father: '신부 아버지',
    mother: '신부 어머니',
    account: {
      bank: '은행명',
      number: '1234-5678-9012-3456',
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
```

### 🖼️ 갤러리 이미지 추가

1. `public/images/gallery/` 폴더를 생성하세요
2. 웨딩 사진을 `1.jpg`, `2.jpg`, `3.jpg`, ... 형식으로 저장하세요
3. `lib/data.ts`의 `galleryImages` 배열이 자동으로 참조합니다

### 💬 초대 메시지 수정

`lib/data.ts` 파일의 `invitationMessage`를 원하는 문구로 변경하세요.

### 🎨 색상 테마 변경

`tailwind.config.ts` 파일에서 색상을 변경할 수 있습니다:

```typescript
colors: {
  pastel: {
    pink: '#FFE5EC',        // 메인 핑크
    'pink-dark': '#FFB4C8', // 진한 핑크
    'pink-light': '#FFF0F5', // 연한 핑크
    gold: '#F4D6A5',         // 메인 골드
    'gold-dark': '#E6C189',  // 진한 골드
    'gold-light': '#FFF8E7', // 연한 골드
  },
}
```

## 🌐 배포

### GitHub Pages 배포 (권장)

이 프로젝트는 GitHub Actions를 사용한 자동 배포가 설정되어 있습니다.

1. **GitHub에 푸시**
   ```bash
   git add .
   git commit -m "Update wedding info"
   git push origin main
   ```

2. **GitHub Pages 활성화**
   - GitHub 저장소의 **Settings** → **Pages** 메뉴로 이동
   - **Source**를 **GitHub Actions**로 선택
   - 자동으로 배포가 시작됩니다

3. **배포 확인**
   - **Actions** 탭에서 배포 진행 상황 확인
   - 배포 완료 후 `https://[username].github.io/mobile-wedding-invitation/`에서 확인

### Vercel 배포

1. [Vercel](https://vercel.com)에 가입하고 GitHub 저장소를 import
2. 환경 변수에 Firebase 설정 추가 (방명록 기능 사용 시)
3. 배포 버튼 클릭
4. 자동으로 도메인 생성

## 🔥 Firebase 설정 (방명록 기능)

### 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. 프로젝트 설정에서 웹 앱 추가
3. 설정 정보를 복사하여 `.env.local`에 입력

### 2. Firestore Database 생성

1. **Firestore Database** 메뉴로 이동
2. **데이터베이스 만들기** 클릭
3. **테스트 모드**로 시작 (나중에 보안 규칙 수정 가능)
4. 리전 선택 (asia-northeast3 권장)

### 3. 보안 규칙 설정 (선택사항)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /guestbook/{document} {
      allow read: if true;
      allow create: if request.resource.data.name is string &&
                       request.resource.data.message is string &&
                       request.resource.data.name.size() <= 20 &&
                       request.resource.data.message.size() <= 200;
      allow update, delete: if false;
    }
  }
}
```

### 4. 승인된 도메인 추가

**Authentication** → **Settings** → **Authorized domains**에 배포 도메인을 추가하세요:
- `localhost` (로컬 개발)
- `[username].github.io` (GitHub Pages)
- 커스텀 도메인 (있는 경우)

## 🐛 문제 해결

### Q: 개발 서버에서 "Cannot find module 'autoprefixer'" 오류가 발생합니다

```bash
npm install -D autoprefixer
```

### Q: 갤러리 이미지가 표시되지 않습니다

1. `public/images/gallery/` 폴더가 존재하는지 확인
2. 이미지 파일명이 `1.jpg`, `2.jpg` 형식인지 확인
3. `lib/data.ts`의 `galleryImages` 배열 확인

### Q: Firebase 방명록이 작동하지 않습니다

1. `.env.local` 파일에 Firebase 설정이 올바른지 확인
2. Firebase Console에서 Firestore Database가 생성되었는지 확인
3. 브라우저 콘솔에서 에러 메시지 확인

### Q: GitHub Pages 배포 후 404 오류가 발생합니다

1. GitHub 저장소의 **Settings** → **Pages**에서 Source가 **GitHub Actions**로 설정되어 있는지 확인
2. **Actions** 탭에서 배포가 성공적으로 완료되었는지 확인
3. 배포 완료 후 5-10분 정도 기다려보세요

## 📄 라이선스

MIT License - 자유롭게 사용하고 수정할 수 있습니다.

## 🤝 기여

개선 사항이나 버그 리포트는 이슈로 등록해주세요!

## 💡 개발 노트

이 프로젝트는 [Claude Code](https://claude.com/claude-code)를 사용하여 개발되었습니다.
자세한 개발 과정과 의사결정은 [CLAUDE.md](./CLAUDE.md)에서 확인하실 수 있습니다.

---

<div align="center">

Made with 💖 using Next.js & Tailwind CSS

</div>
