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

방명록 기능을 사용하려면 Firebase Console에서 Firestore Database를 생성하고 `.env.local`에 설정을 입력하세요.
