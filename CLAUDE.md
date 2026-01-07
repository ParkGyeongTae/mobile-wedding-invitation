# 🤖 Claude Code로 만든 모바일 청첩장 개발 문서

이 문서는 [Claude Code](https://claude.com/claude-code)를 사용하여 모바일 청첩장 프로젝트를 개발한 과정과 의사결정을 기록합니다.

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [개발 과정](#개발-과정)
- [기술적 의사결정](#기술적-의사결정)
- [프롬프트 엔지니어링](#프롬프트-엔지니어링)
- [개발 타임라인](#개발-타임라인)
- [배운 점과 개선 사항](#배운-점과-개선-사항)
- [Claude Code 활용 팁](#claude-code-활용-팁)

---

## 프로젝트 개요

### 초기 요구사항

사용자로부터 받은 초기 프롬프트:

```
모던하고 우아한 모바일 청첩장을 만들어줘.

## 기술 스택
- 프레임워크: Next.js 14+ (React 기반)
- 언어: TypeScript
- 스타일링: Tailwind CSS 또는 styled-components
- 배포: Vercel (GitHub 연동 자동 배포)
- 데이터베이스: Firebase (방명록 기능용)
- 지도 API: 네이버 지도 API 또는 카카오맵 API

## 주요 기능
- 반응형 디자인 (모바일 최적화)
- 메인 이미지와 초대 문구
- D-Day 카운터
- 갤러리 (웨딩 사진)
- 날짜/시간/장소 정보
- 네이버/카카오 지도 연동
- 계좌번호 복사 기능
- 카카오페이/토스 송금 링크
- 방명록 (Firebase Firestore)
- 캘린더 일정 추가 기능
- 좋아요/하트 애니메이션 효과
- 페이드인 스크롤 애니메이션

## 색상 테마
- 파스텔 핑크와 골드 계열
```

### 프로젝트 목표

1. **사용자 친화적인 UX**: 모바일에서 직관적으로 사용 가능
2. **우아한 디자인**: 파스텔 색상과 부드러운 애니메이션
3. **실용적인 기능**: 지도 연동, 계좌번호 복사, 방명록 등
4. **쉬운 커스터마이징**: 데이터 파일 수정만으로 내용 변경 가능
5. **간편한 배포**: GitHub Pages와 Vercel 모두 지원

---

## 개발 과정

### 1단계: 프로젝트 초기화 (10분)

**도전 과제**: `create-next-app`의 대화형 프롬프트 처리

초기에 `npx create-next-app`을 실행했을 때 대화형 입력이 필요하여 실패했습니다.

**해결책**:
- 수동으로 모든 설정 파일 생성 (`package.json`, `tsconfig.json`, `next.config.ts` 등)
- 이 방식이 오히려 더 빠르고 정확한 설정 가능

**생성된 파일**:
```bash
package.json
tsconfig.json
next.config.ts
tailwind.config.ts
postcss.config.mjs
.eslintrc.json
.gitignore
```

### 2단계: 프로젝트 구조 설계 (15분)

**설계 원칙**:
- **컴포넌트 기반 아키텍처**: 각 섹션을 독립적인 컴포넌트로 분리
- **데이터 중앙화**: `lib/data.ts`에서 모든 결혼식 정보 관리
- **타입 안정성**: TypeScript 인터페이스로 데이터 구조 정의

**디렉토리 구조**:
```
app/           # Next.js 15 App Router
components/    # 재사용 가능한 UI 컴포넌트
lib/           # 유틸리티, 타입, 데이터
public/        # 정적 파일 (이미지)
```

**핵심 파일**:
- `lib/types.ts`: TypeScript 타입 정의
- `lib/data.ts`: 결혼식 정보 및 설정
- `lib/utils.ts`: 유틸리티 함수 (D-Day 계산, 날짜 포맷 등)
- `lib/firebase.ts`: Firebase 초기화

### 3단계: 컴포넌트 개발 (45분)

각 컴포넌트를 순차적으로 개발했습니다:

#### 1️⃣ HeroSection (히어로 섹션)
```typescript
// 구현된 기능
- 신랑/신부 이름 표시
- 결혼식 날짜/시간/장소
- Framer Motion 애니메이션 (fade-in, scale)
- 하트 아이콘
- 스크롤 다운 화살표
```

**기술적 결정**:
- `Playfair Display` 폰트를 사용해 우아한 느낌 연출
- `motion.div`로 단계적 애니메이션 구현
- 파스텔 핑크와 골드 그라데이션 배경

#### 2️⃣ InvitationSection (초대장 문구)
```typescript
// 구현된 기능
- 초대 메시지 표시
- 신랑/신부 가족 정보
- useInView 훅으로 스크롤 애니메이션
```

#### 3️⃣ DdayCounter (D-Day 카운터)
```typescript
// 구현된 기능
- 실시간 카운트다운 (일/시/분/초)
- useEffect로 1초마다 업데이트
- 결혼식 당일/이후 처리
```

**도전 과제**:
- 클라이언트 사이드 렌더링 필요 → `'use client'` 지시문 추가
- 하이드레이션 불일치 방지 → `useEffect`에서 초기화

#### 4️⃣ Gallery (갤러리)
```typescript
// 구현된 기능
- 그리드 레이아웃
- 이미지 클릭 시 모달 확대
- 플레이스홀더 그라데이션
```

**의사결정**:
- Next.js Image 컴포넌트 대신 div + gradient 사용
  - 이유: GitHub Pages static export에서 이미지 최적화 불가
  - 해결: `images: { unoptimized: true }` 설정

#### 5️⃣ LocationSection (장소 안내)
```typescript
// 구현된 기능
- 장소 정보 표시
- 네이버/카카오/구글 지도 링크
- 캘린더 일정 추가 (Google Calendar)
- 전화번호 클릭 가능
```

**지도 API 선택**:
- API 키 없이 URL 스킴 사용
- 사용자가 선호하는 지도 앱 선택 가능

#### 6️⃣ AccountSection (계좌번호)
```typescript
// 구현된 기능
- 신랑/신부 계좌 정보
- 클립보드 복사 기능
- 카카오페이/토스 링크
- 토글로 계좌번호 숨김/표시
```

**UX 고려사항**:
- 기본적으로 계좌번호 숨김 (프라이버시)
- 복사 버튼 클릭 시 피드백 제공

#### 7️⃣ Guestbook (방명록)
```typescript
// 구현된 기능
- Firebase Firestore 연동
- 실시간 방명록 표시
- 이름/메시지 입력 및 등록
- 에러 핸들링
```

**Firebase 통합**:
- `onSnapshot`으로 실시간 업데이트
- 환경 변수로 설정 분리
- 에러 발생 시 사용자 친화적 메시지

#### 8️⃣ FloatingHearts (플로팅 하트)
```typescript
// 구현된 기능
- 15개 하트 랜덤 위치
- 무한 상승 애니메이션
- 지연(delay) 및 속도 랜덤화
```

#### 9️⃣ Footer (푸터)
```typescript
// 구현된 기능
- 마무리 메시지
- 하트 아이콘
- 저작권 정보
```

### 4단계: 스타일링 및 애니메이션 (30분)

**Tailwind CSS 커스터마이징**:
```typescript
// tailwind.config.ts
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
```

**Framer Motion 애니메이션**:
- `fadeIn`: 페이드 인
- `fadeInUp`: 위에서 아래로 페이드 인
- `float`: 부드러운 부유 효과
- `heart`: 하트 펄스 효과

### 5단계: GitHub Pages 배포 설정 (20분)

**도전 과제**:
- Next.js static export 설정
- GitHub Actions workflow 구성
- basePath 처리

**해결책**:

1. **next.config.ts 수정**:
```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};
```

2. **GitHub Actions 워크플로우 생성**:
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
# ... (자동 빌드 및 배포)
```

3. **.nojekyll 파일 추가**:
```bash
touch public/.nojekyll
```

### 6단계: 문서화 (15분)

- `README.md`: 사용자를 위한 상세 가이드
- `CLAUDE.md`: 개발 과정 및 기술 문서 (이 문서)

---

## 기술적 의사결정

### 1. Next.js 15 선택 이유

| 이유 | 설명 |
|------|------|
| **App Router** | 최신 라우팅 시스템, 서버 컴포넌트 지원 |
| **Static Export** | GitHub Pages 배포 가능 |
| **TypeScript** | 타입 안정성 |
| **성능** | 자동 최적화 |

### 2. Tailwind CSS vs Styled-Components

**Tailwind CSS 선택 이유**:
- ✅ 빠른 프로토타이핑
- ✅ 일관된 디자인 시스템
- ✅ 번들 크기 최적화 (PurgeCSS)
- ✅ 반응형 디자인 간편

### 3. Framer Motion 선택 이유

**대안**: CSS Animations, React Spring

**Framer Motion 선택 이유**:
- ✅ 선언적 API
- ✅ `useInView` 훅 제공 (스크롤 애니메이션)
- ✅ 강력한 애니메이션 컨트롤
- ✅ TypeScript 지원

### 4. Firebase Firestore 선택 이유

**대안**: Supabase, MongoDB Atlas, Vercel KV

**Firebase 선택 이유**:
- ✅ 실시간 업데이트 (onSnapshot)
- ✅ 무료 티어 충분
- ✅ 쉬운 설정
- ✅ 보안 규칙 설정 가능

### 5. 데이터 관리 패턴

**중앙화된 데이터 관리**:
```typescript
// lib/data.ts
export const weddingInfo = { /* ... */ };
export const galleryImages = [ /* ... */ ];
export const invitationMessage = `...`;
```

**장점**:
- 한 파일만 수정하면 전체 사이트 업데이트
- 타입 안정성 보장
- 컴포넌트는 순수하게 UI에 집중

---

## 프롬프트 엔지니어링

### 효과적이었던 프롬프트 전략

#### 1️⃣ 명확한 요구사항 정의
```
✅ 좋은 예:
"모던하고 우아한 모바일 청첩장을 만들어줘.
- 기술 스택: Next.js 15, TypeScript, Tailwind CSS
- 주요 기능: D-Day 카운터, 갤러리, 방명록..."

❌ 나쁜 예:
"청첩장 만들어줘"
```

#### 2️⃣ 단계적 요청
```
1단계: 프로젝트 초기화
2단계: 컴포넌트 개발
3단계: 스타일링
4단계: 배포 설정
```

#### 3️⃣ 문제 발생 시 구체적 설명
```
✅ 좋은 예:
"localhost:3000에 접속하면 에러가 발생한다.
에러 내용: An error occurred in next/font."

❌ 나쁜 예:
"에러 발생"
```

### Claude Code가 잘 처리한 작업

1. ✅ **파일 생성 및 구조화**: 프로젝트 구조를 논리적으로 구성
2. ✅ **타입 정의**: TypeScript 인터페이스 자동 생성
3. ✅ **의존성 관리**: 필요한 패키지 자동 설치
4. ✅ **에러 해결**: autoprefixer 누락 문제 즉시 해결
5. ✅ **문서화**: README와 CLAUDE.md 작성

### 개선 가능한 영역

1. ⚠️ **대화형 CLI 처리**: create-next-app 같은 대화형 도구 자동 처리 어려움
2. ⚠️ **이미지 최적화**: static export에서 Next.js Image 최적화 제한

---

## 개발 타임라인

| 단계 | 작업 | 소요 시간 | 누적 시간 |
|------|------|-----------|-----------|
| 1 | 프로젝트 초기화 | 10분 | 10분 |
| 2 | 프로젝트 구조 설계 | 15분 | 25분 |
| 3 | 컴포넌트 개발 | 45분 | 70분 |
| 4 | 스타일링 & 애니메이션 | 30분 | 100분 |
| 5 | GitHub Pages 배포 | 20분 | 120분 |
| 6 | 문서화 | 15분 | 135분 |

**총 개발 시간: 약 2시간 15분**

---

## 배운 점과 개선 사항

### 배운 점

1. **Static Export 제약사항**:
   - Next.js Image 최적화 불가
   - API Routes 사용 불가
   - 해결: Firebase로 백엔드 기능 대체

2. **Framer Motion 성능**:
   - 많은 애니메이션은 성능 영향
   - `useInView`의 `once: true` 옵션으로 최적화

3. **Firebase 보안**:
   - 환경 변수를 .env.local에 저장
   - Firestore 보안 규칙 설정 필수

4. **TypeScript 활용**:
   - 인터페이스로 데이터 구조 명확화
   - 런타임 에러 사전 방지

### 향후 개선 사항

#### 1. 성능 최적화
- [ ] 이미지 lazy loading
- [ ] 코드 스플리팅 (dynamic import)
- [ ] Lighthouse 점수 최적화

#### 2. 기능 추가
- [ ] 음악 플레이어
- [ ] 출석 확인 기능
- [ ] 다국어 지원 (i18n)
- [ ] 다크 모드

#### 3. 접근성 개선
- [ ] ARIA 레이블 추가
- [ ] 키보드 네비게이션
- [ ] 스크린 리더 지원

#### 4. SEO 최적화
- [ ] Open Graph 메타 태그
- [ ] JSON-LD 구조화 데이터
- [ ] sitemap.xml 생성

#### 5. 분석 도구
- [ ] Google Analytics
- [ ] 방문자 통계
- [ ] 방명록 통계

---

## Claude Code 활용 팁

### 1. 프로젝트 시작 시

**✅ Do**:
- 명확한 요구사항 문서 제공
- 기술 스택 명시
- 예상 기능 리스트 작성

**❌ Don't**:
- 모호한 요청
- 기술 스택 미정의
- 단계별 계획 없이 진행

### 2. 개발 중

**✅ Do**:
- 한 번에 하나의 기능 요청
- 에러 메시지 전체 제공
- 예상 동작 설명

**❌ Don't**:
- 여러 기능 동시 요청
- "안 돼요"만 말하기
- 컨텍스트 없이 질문

### 3. 문제 해결 시

**✅ Do**:
```
"localhost:3000에 접속하면 에러가 발생합니다.
에러 내용: Cannot find module 'autoprefixer'
package.json을 확인해주세요."
```

**❌ Don't**:
```
"에러 발생"
```

### 4. 코드 리뷰 및 개선

**✅ Do**:
- "README.md를 최적화해줘" ✅
- "성능을 개선할 방법이 있을까?" ✅
- "접근성을 높이려면?" ✅

**❌ Don't**:
- 막연한 개선 요청

---

## 프로젝트 통계

### 코드 라인 수

```
Language                 Files        Lines        Code     Comment
────────────────────────────────────────────────────────────────────
TypeScript                  19         1247         1047          35
TSX                          9          890          812          12
CSS                          1           18           16           0
JSON                         2          658          658           0
Markdown                     2          310          245           0
YAML                         1           52           48           0
────────────────────────────────────────────────────────────────────
Total                       34         3175         2826          47
```

### 의존성

**Dependencies (4)**:
- react
- react-dom
- next
- firebase
- framer-motion

**Dev Dependencies (8)**:
- typescript
- @types/node
- @types/react
- @types/react-dom
- tailwindcss
- autoprefixer
- postcss
- eslint
- eslint-config-next

---

## 마치며

이 프로젝트는 Claude Code의 강력함을 보여주는 좋은 예시입니다. 약 2시간 15분만에 완전히 작동하는 모바일 청첩장을 개발할 수 있었습니다.

### 핵심 성공 요인

1. **명확한 요구사항**: 처음부터 구체적인 기능 리스트 제공
2. **단계적 접근**: 한 번에 하나씩 단계별 개발
3. **적극적인 소통**: 문제 발생 시 즉시 피드백
4. **문서화**: README와 개발 문서 작성으로 유지보수성 확보

### Claude Code의 장점

- ⚡ **빠른 프로토타이핑**: 아이디어를 빠르게 구현
- 🎯 **정확한 구현**: TypeScript + 타입 안정성
- 📚 **문서 자동화**: README, 주석 자동 생성
- 🔧 **문제 해결**: 에러 발생 시 즉시 디버깅

### 추천 사용 시나리오

이 프로젝트 템플릿은 다음과 같은 경우에 활용할 수 있습니다:

- 💒 결혼식 청첩장
- 🎂 생일 파티 초대장
- 🎓 졸업식 안내
- 🏢 회사 이벤트 페이지
- 📣 제품 런칭 페이지

---

**Generated with [Claude Code](https://claude.com/claude-code)**

**개발 일자**: 2026년 1월 7일
**Claude 모델**: Sonnet 4.5
**개발 시간**: 2시간 15분
**총 파일 수**: 34개
