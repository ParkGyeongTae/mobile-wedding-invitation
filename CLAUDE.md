# 🤖 Claude Code 개발 문서

이 프로젝트는 [Claude Code](https://claude.com/claude-code)를 사용하여 **2시간 15분**만에 개발되었습니다.

## 📋 프로젝트 개요

**초기 요구사항**: 모던하고 우아한 모바일 청첩장
- Next.js 15 + TypeScript + Tailwind CSS
- Firebase 방명록, 지도 연동, D-Day 카운터
- 파스텔 핑크/골드 색상 테마
- 반응형 디자인 + Framer Motion 애니메이션

---

## ⏱️ 개발 타임라인

| 단계 | 작업 | 소요 시간 |
|------|------|-----------|
| 1 | 프로젝트 초기화 & 구조 설계 | 25분 |
| 2 | 9개 컴포넌트 개발 | 45분 |
| 3 | 스타일링 & 애니메이션 | 30분 |
| 4 | GitHub Pages 배포 설정 | 20분 |
| 5 | 문서화 | 15분 |
| **합계** | | **135분 (2시간 15분)** |

---

## 🏗️ 아키텍처 설계

### 프로젝트 구조
```
app/           → Next.js 15 App Router
components/    → 9개 독립 컴포넌트
lib/           → 데이터 중앙화 (types, data, utils, firebase)
public/        → 정적 파일
```

### 핵심 설계 원칙
1. **데이터 중앙화**: `lib/data.ts`에서 모든 정보 관리 → 파일 하나만 수정
2. **컴포넌트 독립성**: 각 섹션을 재사용 가능한 컴포넌트로 분리
3. **타입 안정성**: TypeScript 인터페이스로 런타임 에러 방지

---

## 🎯 주요 기술 결정

| 선택 | 이유 |
|------|------|
| **Next.js 15** | App Router, Static Export, GitHub Pages 배포 가능 |
| **Tailwind CSS** | 빠른 프로토타이핑, 일관된 디자인 시스템 |
| **Framer Motion** | 선언적 애니메이션, `useInView` 훅 제공 |
| **Firebase** | 실시간 방명록, 무료 티어, 쉬운 설정 |

---

## 💡 핵심 구현 포인트

### 1. Static Export 설정 (GitHub Pages 배포)
```typescript
// next.config.ts
output: 'export',
images: { unoptimized: true },
basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
```

### 2. 데이터 중앙화 패턴
```typescript
// lib/data.ts - 한 곳에서 모든 데이터 관리
export const weddingInfo = { /* 결혼식 정보 */ };
export const galleryImages = [ /* 갤러리 */ ];
export const invitationMessage = `/* 초대 메시지 */`;
```

### 3. 스크롤 애니메이션
```typescript
// Framer Motion useInView 활용
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: '-100px' });
```

### 4. Firebase 실시간 방명록
```typescript
// onSnapshot으로 실시간 업데이트
onSnapshot(query(collection(db, 'guestbook')), (snapshot) => {
  setEntries(snapshot.docs.map(doc => doc.data()));
});
```

---

## 🐛 주요 문제 해결

### 문제 1: autoprefixer 모듈 누락
```bash
# 해결: package.json에 추가 후 설치
npm install -D autoprefixer
```

### 문제 2: create-next-app 대화형 프롬프트
**해결**: 수동으로 설정 파일 생성 (더 빠르고 정확함)

### 문제 3: GitHub Pages 404 에러
**해결**: `.nojekyll` 파일 추가 + GitHub Actions workflow 구성

---

## 🎓 Claude Code 활용 팁

### ✅ 효과적인 프롬프트

**좋은 예**:
```
"localhost:3000에 접속하면 에러가 발생합니다.
에러 내용: Cannot find module 'autoprefixer'"
```

**나쁜 예**:
```
"에러 발생"
```

### 📌 개발 전략

1. **명확한 요구사항**: 기술 스택, 기능 리스트 사전 정의
2. **단계적 접근**: 한 번에 하나씩 기능 개발
3. **즉시 피드백**: 문제 발생 시 에러 메시지 전체 공유

### 🚀 Claude Code 장점

- ⚡ 빠른 프로토타이핑 (2시간 15분에 완성)
- 🎯 타입 안정성 (TypeScript 자동 생성)
- 📚 자동 문서화 (README, 주석)
- 🔧 즉시 디버깅 (에러 분석 및 해결)

---

## 🔮 향후 개선 사항

**성능 최적화**
- [ ] 이미지 lazy loading
- [ ] 코드 스플리팅

**기능 추가**
- [ ] 음악 플레이어
- [ ] 출석 확인
- [ ] 다국어 지원

**접근성 & SEO**
- [ ] ARIA 레이블
- [ ] Open Graph 메타 태그
- [ ] sitemap.xml

---

## 📊 프로젝트 통계

- **총 파일**: 34개
- **코드 라인**: ~2,800줄
- **컴포넌트**: 9개
- **의존성**: 12개 (dependencies 5 + devDependencies 7)
- **개발 시간**: 2시간 15분

---

## 🎯 핵심 성공 요인

1. **명확한 요구사항** → 처음부터 구체적인 기능 리스트
2. **단계적 개발** → 프로젝트 초기화 → 컴포넌트 → 배포
3. **데이터 중앙화** → 유지보수 용이성
4. **문서화** → README + CLAUDE.md

---

**Generated with [Claude Code](https://claude.com/claude-code)**
**개발 일자**: 2026년 1월
**Claude 모델**: Sonnet 4.5
**총 개발 시간**: 2시간 15분
