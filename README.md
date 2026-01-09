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

## 📑 목차

- [주요 기능](#-주요-기능)
- [기술 스택](#️-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [빠른 시작](#-빠른-시작)
- [커스터마이징](#️-커스터마이징)
- [배포](#-배포)
- [Firebase 설정](#-firebase-설정-방명록-기능)
- [문제 해결](#-문제-해결)
- [기여](#-기여)
- [라이선스](#-라이선스)

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

---

## 📸 스크린샷

<div align="center">

### 메인 화면
![Hero Section](docs/screenshots/hero.png)

### D-Day 카운터 & 갤러리
![Features](docs/screenshots/features.png)

### 지도 & 방명록
![Interactive](docs/screenshots/interactive.png)

> 실제 스크린샷은 `docs/screenshots/` 폴더에 추가하세요.

</div>

---

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

### 전제 조건

- Node.js 18.x 이상
- npm 또는 yarn
- Git

### 1. 저장소 클론 및 설치

```bash
# 저장소 클론
git clone https://github.com/ParkGyeongTae/mobile-wedding-invitation.git
cd mobile-wedding-invitation

# 의존성 설치
npm install
```

### 2. 환경 변수 설정

```bash
# 환경 변수 템플릿 복사
cp .env.local.example .env.local
```

`.env.local` 파일을 열어 아래 필수 정보를 입력하세요:

```env
# 개인정보 (필수)
NEXT_PUBLIC_GROOM_NAME=홍길동
NEXT_PUBLIC_GROOM_FATHER=홍아버지
NEXT_PUBLIC_GROOM_MOTHER=홍어머니
NEXT_PUBLIC_BRIDE_NAME=김영희
NEXT_PUBLIC_BRIDE_FATHER=김아버지
NEXT_PUBLIC_BRIDE_MOTHER=김어머니
NEXT_PUBLIC_WEDDING_DATE=2024-12-25
NEXT_PUBLIC_WEDDING_TIME=14:00
NEXT_PUBLIC_LOCATION_NAME=그랜드 웨딩홀
NEXT_PUBLIC_LOCATION_ADDRESS=서울특별시 강남구 테헤란로 123
NEXT_PUBLIC_LOCATION_LAT=37.5665
NEXT_PUBLIC_LOCATION_LNG=126.9780

# 계좌 정보 (선택사항)
NEXT_PUBLIC_GROOM_ACCOUNT_BANK=국민은행
NEXT_PUBLIC_GROOM_ACCOUNT_NUMBER=123-456-789012
NEXT_PUBLIC_GROOM_ACCOUNT_HOLDER=홍길동

# Firebase (방명록 기능 사용 시)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
# ... (나머지 Firebase 설정은 .env.local.example 참조)
```

> ⚠️ **보안**: `.env.local` 파일은 개인정보가 포함되므로 Git에 커밋하지 마세요.
> ✅ `.gitignore`에 이미 포함되어 있어 자동으로 제외됩니다.

### 3. 개발 서버 실행

```bash
# 개발 서버 시작
npm run dev

# 또는 빌드 후 실행
npm run build
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 4. (선택) Firebase 방명록 설정

방명록 기능을 사용하려면 [Firebase 설정](#-firebase-설정-방명록-기능) 섹션을 참조하세요.

## ⚙️ 커스터마이징

### 📝 결혼식 정보 수정

**로컬 개발 환경**: `.env.local` 파일을 수정하세요:

```env
# 신랑/신부 정보
NEXT_PUBLIC_GROOM_NAME=홍길동
NEXT_PUBLIC_BRIDE_NAME=김영희

# 결혼식 일정
NEXT_PUBLIC_WEDDING_DATE=2024-12-25
NEXT_PUBLIC_WEDDING_TIME=14:00

# 장소 정보
NEXT_PUBLIC_LOCATION_NAME=그랜드 웨딩홀
NEXT_PUBLIC_LOCATION_ADDRESS=서울특별시 강남구 테헤란로 123
NEXT_PUBLIC_LOCATION_LAT=37.5665
NEXT_PUBLIC_LOCATION_LNG=126.9780
```

**GitHub Pages 배포**: GitHub Secrets를 수정하세요 (위 배포 섹션 참조)

> 💡 모든 개인정보는 환경 변수로 관리되므로 `lib/data.ts` 파일을 직접 수정할 필요가 없습니다.

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

#### 1️⃣ GitHub Secrets 설정 (개인정보 보호)

⚠️ **중요**: 개인정보는 GitHub Secrets에 저장하여 보안을 유지합니다.

1. GitHub 저장소의 **Settings** → **Secrets and variables** → **Actions** 메뉴로 이동
2. **New repository secret** 버튼 클릭
3. 아래 환경 변수들을 하나씩 추가:

**필수 환경 변수**:
```
GROOM_NAME=홍길동
GROOM_FATHER=홍아버지
GROOM_MOTHER=홍어머니
BRIDE_NAME=김영희
BRIDE_FATHER=김아버지
BRIDE_MOTHER=김어머니
WEDDING_DATE=2024-12-25
WEDDING_TIME=14:00
LOCATION_NAME=그랜드 웨딩홀
LOCATION_ADDRESS=서울특별시 강남구 테헤란로 123
LOCATION_LAT=37.5665
LOCATION_LNG=126.9780
```

**선택 환경 변수** (필요한 경우만 추가):
```
GROOM_ACCOUNT_BANK=국민은행
GROOM_ACCOUNT_NUMBER=123-456-789012
GROOM_ACCOUNT_HOLDER=홍길동
BRIDE_ACCOUNT_BANK=신한은행
BRIDE_ACCOUNT_NUMBER=987-654-321098
BRIDE_ACCOUNT_HOLDER=김영희
LOCATION_TEL=02-1234-5678
INVITATION_MESSAGE=초대 메시지 내용
GALLERY_COUNT=6
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=your-app-id
```

> 💡 **팁**: Secret 이름은 대문자로 작성하고, `NEXT_PUBLIC_` 접두사는 **제외**합니다.

#### 2️⃣ GitHub Pages 활성화

1. GitHub 저장소의 **Settings** → **Pages** 메뉴로 이동
2. **Source**를 **GitHub Actions**로 선택

#### 3️⃣ 배포

```bash
git add .
git commit -m "Update wedding info"
git push origin main
```

#### 4️⃣ 배포 확인

- **Actions** 탭에서 배포 진행 상황 확인
- 배포 완료 후 `https://[username].github.io/mobile-wedding-invitation/`에서 확인

### Vercel 배포

1. [Vercel](https://vercel.com)에 가입하고 GitHub 저장소를 import
2. **Environment Variables** 설정:
   - `.env.local.example` 파일의 모든 환경 변수를 추가
   - `NEXT_PUBLIC_BASE_PATH`는 제거 (Vercel에서는 불필요)
3. 배포 버튼 클릭
4. 자동으로 도메인 생성

> 💡 Vercel에서는 환경 변수 이름에 `NEXT_PUBLIC_` 접두사를 **포함**합니다.

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

## 🤝 기여

프로젝트에 기여하고 싶으신가요? 환영합니다!

### 기여 방법

1. **이 저장소를 포크하세요**
   ```bash
   # GitHub에서 Fork 버튼 클릭
   ```

2. **새로운 브랜치를 생성하세요**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **변경 사항을 커밋하세요**
   ```bash
   git commit -m "feat: Add amazing feature"
   ```

4. **브랜치에 푸시하세요**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Pull Request를 생성하세요**
   - 변경 사항을 설명해주세요
   - 관련 이슈가 있다면 링크해주세요

### 기여 가이드라인

- 코드 스타일: ESLint 및 Prettier 설정 준수
- 커밋 메시지: [Conventional Commits](https://www.conventionalcommits.org/) 규칙 따르기
- 테스트: 새로운 기능에는 테스트 코드 추가
- 문서: README 및 CLAUDE.md 업데이트

### 버그 리포트 & 기능 제안

[GitHub Issues](https://github.com/ParkGyeongTae/mobile-wedding-invitation/issues)에 등록해주세요:
- 🐛 버그 리포트: 재현 방법, 예상 동작, 실제 동작 포함
- ✨ 기능 제안: 사용 사례, 예상 효과 설명

---

## 📄 라이선스

이 프로젝트는 MIT License로 배포됩니다.
- 상업적/비상업적 용도로 자유롭게 사용 가능
- 수정 및 배포 가능
- 라이선스 및 저작권 표시 필수

자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## 💡 개발 노트

이 프로젝트는 [Claude Code](https://claude.com/claude-code)를 사용하여 **2시간 15분**만에 개발되었습니다.

### 개발 관련 문서
- [CLAUDE.md](./CLAUDE.md) - 상세한 개발 과정 및 기술 의사결정
- 개발 타임라인, 트러블슈팅, Claude Code 활용 팁 포함

### 기술 스택 선택 이유
- **Next.js 15**: App Router, Static Export, 뛰어난 개발자 경험
- **TypeScript**: 타입 안정성으로 런타임 에러 방지
- **Tailwind CSS**: 빠른 프로토타이핑, 일관된 디자인 시스템
- **Framer Motion**: 선언적 애니메이션, 뛰어난 성능
- **Firebase**: 실시간 데이터베이스, 무료 티어, 쉬운 설정

---

## 🌟 Acknowledgments

- [Next.js](https://nextjs.org/) - React 프레임워크
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크
- [Framer Motion](https://www.framer.com/motion/) - 애니메이션 라이브러리
- [Firebase](https://firebase.google.com/) - 백엔드 서비스
- [Claude Code](https://claude.com/claude-code) - AI 개발 도구

---

<div align="center">

Made with 💖 using Next.js & Tailwind CSS

**[⬆ 맨 위로 돌아가기](#-모바일-청첩장-mobile-wedding-invitation)**

</div>
