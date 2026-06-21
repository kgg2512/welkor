# 작업지시서 — 웰코 비전 확장 (배포 전 모듈 보강)

> 작성: Alpha (2026-06-21) · 공유 상태 파일 (실행자·QA·리뷰어 공통) · 골모드

## 회장 요청 (원문 요지)

배포(Vercel) 전 웰코 전반 점검 → 9파트 비전 대조. 현재 1~4(국가→목적→비자 자동연결)·8(세무)·9(커뮤니티)는 구현, 5-1(관광)·5-2(유학심화)·5-3(구직)·6(주거 지도)·7(금융) 미흡/미구현. **순위대로 순차 진행, 세션 길어지면 끊고 다음 세션 권고.** 디자인은 ui-ux-pro-max·21st.dev·Stitch·higgsfield·Figma 적극 활용.

## 레인 / 라우팅 판단

- **Alpha 직접** (Single-Agent First). 근거: 기존 패턴(visas.ts/listings.ts, page.tsx, next-intl) 명확 + Alpha가 전체 컨텍스트 보유 + 신규 페이지 간 **디자인 일관성**이 핵심 → 위임 시 스타일 드리프트·콜드스타트 손실. 검증은 독립(code-review/격리).
- **주입 도메인 (§1.5 매트릭스):** 신규 화면/UI → CDO(디자인·접근성). 모든 코딩 → CTO+CSO. 외부 데이터 표시(관광·금융·매물) → CLO(정보 제공자 한정, 중개/대행/알선 금지, 출처 명시). 금융/세무 표시 → 금융자문 아님 면책.

## 법적 가드레일 (불변 — FOUNDATION §1·§4)

웰코 = **정보 제공자 + 연결자.** 직접 중개/세무대행/비자대행/E-9 알선 **금지.** 모든 외부 서비스는 **공식 출처 링크 + 면책**으로만 노출.

## 우선순위 & 완료 기준 (테스트 가능 체크리스트)

### 0. 브랜드 통일 + 정합
- [ ] UI 전역 "WelKor" → 정식 "Welco / 웰코" (messages en/ko, purposes.ts)
- [ ] 타입체크 통과

### 1. 관광 (5-1)
- [ ] `src/data/tourism.ts` — 지역/대표 관광지(실제, 한국관광공사 출처) + 외부 예약 채널
- [ ] `/[locale]/explore` 페이지 — 무비자(K-ETA) 안내 + 지역별 머스트비짓 + 예약 링크(Trip.com·Airbnb·Klook) + VisitKorea 공식
- [ ] 퍼널 연결: purposes.ts 관광 상황 → 내부 /explore 연결
- [ ] nav + i18n(en/ko) 추가
- [ ] **정확성:** 가짜 AI 랜드마크 이미지 금지. 실제 장소명 + 공식 출처

### 2. 주거 (6)
- [ ] 외부 포털 링크(다방·직방·네이버부동산) 매물 시각 노출 (중개 아님)
- [ ] 지역별 시세 참고표 (보증금/월세 범위)
- [ ] 지도 기반 탐색(지역 선택 → 포털 지도검색 딥링크; 라이브 지도 API는 회장 키)
- [ ] 관광객용 단기숙박(Trip.com·Airbnb·Booking) 분기
- [ ] 면책 유지(중개·보수 수취 안 함)

### 3. 금융 (7)
- [ ] `src/data/finance.ts` — 외국인 가능 계좌/체크·신용카드/대출/송금, 주체별 정리 + 공식 출처
- [ ] `/[locale]/finance` 페이지 + nav + i18n
- [ ] 면책(정보 제공, 금융자문/모집 아님)

### 4. 유학 심화 (5-2) — 세션 여유 시
- [ ] 학교/전공 선택 + 입학처(영문) 직링크 + 비자 서류 체크리스트
- [ ] 없으면 다음 세션 권고

### 5. 구직 (5-3) — **다음 세션 권고 (법적 신중)**
- [ ] 무료 정보형 공고 보드 only. 매칭·수수료·E-9 금지. "취업 보장 아님" 보드 하단 명시.

## 검증 게이트 (완료 정의)
- [ ] `npm run build` 또는 타입체크 EXIT 0 (실제 출력 첨부)
- [ ] 신규 페이지 스크린샷 (console 0)
- [ ] 독립 리뷰 (/code-review 또는 격리 서브에이전트, git diff + 완료기준 대조)
- [ ] master 커밋·푸시 (배포는 회장 액션)

## 변경내역 (Alpha 직접 구현 — 2026-06-21)
- **브랜드 통일**: WelKor→Welco (messages en/ko 9곳, purposes.ts, layout.tsx title, package.json name/desc)
- **관광(5-1)**: `src/data/tourism.ts`(6지역·실관광지·VisitKorea/K-ETA·예약채널) + `app/[locale]/explore/page.tsx` + 퍼널 연결(purposes.ts `guide` 필드 + journey 렌더 분기) + nav + i18n(explore 13키)
- **주거(6)**: `src/data/housing.ts`(포털 4·지역시세 5·단기숙박 3) + housing 페이지 재작성(시세표+포털지도+샘플+단기숙박) + i18n(housing 25키). 죽은 mock "중개사 연결" 버튼 제거
- **금융(7)**: `src/data/finance.ts`(계좌·카드·대출·송금 4카테고리) + `app/[locale]/finance/page.tsx` + nav + i18n(finance 6키)

## 검증 증빙
- `npm run build` → EXIT 0, **195 정적 페이지** 생성(/explore·/finance 양 로케일 포함), 타입·메시지키 오류 0
- 런타임 스모크(prod :3100): /en /en/explore /ko/explore /en/housing /en/finance /en/journey/us 전부 **HTTP 200** + 핵심 콘텐츠 렌더 확인(경복궁·Trip.com·Wise·Naver·Explore Korea CTA)
- 크롬 시각 확인용 오픈(회장)

## QA 결과 (독립 리뷰 — Dev Code Reviewer, 신선 컨텍스트, `tsc --noEmit` EXIT 0)
- **🔴블로커 0건. 6개 완료기준 전부 PASS. 배포 가능 판정.**
  1. 법적 모델 준수 ✅ (3페이지 면책+부인, 외부=링크/출처only, E-9 알선 미생성)
  2. i18n 완전성 ✅ (호출 키 전부 en/ko 양쪽 존재, 누락 0)
  3. 퍼널 연결 ✅ (관광→/explore, visaSlug>guide>official 분기 정확)
  4. 링크 위생 ✅ (외부 a 전부 target=_blank rel=noopener, 실존 도메인)
  5. 접근성/UX ✅ (hover+transition, aria-hidden, 대비 양호) — 🟡비차단: explore "Open" 라벨 hover-only(앱 공통 패턴, 차후 폴리시)
  6. 정확성 ✅ (실관광지·가짜 랜드마크 0, 금융 자격 비단정 서술)

## 미완 / 다음 세션 (회장 지시 = 우선순위 끊기)
- **5-2 유학 심화**: 학교/전공 + 입학처 영문링크 + 비자 서류 체크리스트
- **5-3 구직**: 무료 정보형 공고 보드 only(매칭·수수료·E-9 금지, "취업 보장 아님" 면책) — 법적 신중 필요
- 라이브 지도(Naver/Kakao Maps API 키 = 회장), 실데이터 Supabase 연동, 전문가 입점

---

# 세션 2 (2026-06-21 이어서) — 5-2 유학 심화 + 5-3 구직

## 회장 요청 (원문)
> "웰코 저번 세션에서 끝냈던 내용들인데 다음 우선순위들도 마저 시작해라. 당연히 opus 써서 가장 고퀄리티 결과물을 뽑아내라"

## 레인 / 라우팅 판단
- **Alpha 직접** (Single-Agent First). **T4(대형=신규 화면/코드 다량)는 ON임을 명시 인정**(13파일·744줄·신규 4페이지). 그럼에도 직접을 택한 근거: 세션1과 동일 — 기존 패턴(explore/finance/visas/purposes·next-intl) 완전 명확 + 신규 페이지가 기존 디자인 시스템과 100% 일관 필수(위임 시 Stitch/외부 생성기 = 스타일 드리프트). **T4의 위험은 위임이 아니라 §3 독립검증 게이트(Dev Code Reviewer)로 상쇄** — 검증 면제 아님. 디자인 = ui-ux-pro-max 원칙을 **기존 컴포넌트 어휘** 내에서 인라인 적용. (CAE 권고1 반영)
- **주입 도메인 (§1.5):** 신규 UI → CDO(접근성). 모든 코딩 → CTO+CSO. 외부 데이터 표시 → CLO. **5-3 구직 = 🔒 법적 민감(직업안정법·E-9 알선 형사처벌) → 독립 리뷰 강제(자가검증 종료 불가).**

## 법적 가드레일 (FOUNDATION §4 — 불변)
- 유학(5-2): 비자 정보·셀프가이드 ✅ 합법. 정보+공식출처 링크만, 대행 금지.
- 구직(5-3): **무료 정보형 게시판 ✅ 합법**(유료화 전 직업소개사업 신고). **E-9 알선 ❌ 치명 불법** → /jobs에서 명시 제외, EPS는 "정부 전용·알선 아님" 정보링크만. **매칭·수수료·지원서 수집·취업보장 전부 금지.** "취업 보장 아님" 면책 명시.

## 완료 기준 (테스트 가능 체크리스트)
### 5-2 유학 심화
- [ ] `src/data/study.ts` — 대학(실존·영문사이트)·전공분야·D-2/D-4 서류 체크리스트 + 공식출처(Study in Korea·GKS·TOPIK·HiKorea)
- [ ] `/[locale]/study` 페이지 — 공식 시작 배너 + 전공분야 + 대학 카드(영문site+입학검색) + 장학금(GKS) + 비자서류 체크리스트 + 면책
- [ ] nav + i18n(en/ko) 추가
- [ ] 퍼널: d2-admission 단계 → /study connect
- [ ] 정확성: 가짜 대학/URL 금지. 실존 + 공식 search 폴백

### 5-3 구직
- [ ] `src/data/jobs.ts` — 공식 포털(Work24·Contact Korea·EPIK)·일반 보드(JobKorea·Saramin·Wanted·LinkedIn)·영어교사·학생알바, 카테고리별 + 법적 플래그
- [ ] `/[locale]/jobs` 페이지 — ⚠️ 비모집자 배너 + 카테고리 링크 + E-9/EPS 정보전용 카브아웃 + 비자-근로 일치 경고 + 무보장 면책
- [ ] nav + i18n(en/ko)
- [ ] 퍼널: purposes D-10 구직자 → /jobs (guideLabel), d2-work 단계 → /jobs connect

## 검증 게이트
- [ ] `npm run build` EXIT 0 (실제 출력)
- [ ] 런타임 스모크 (신규 경로 양 로케일 HTTP 200 + 콘텐츠 grep)
- [ ] 독립 리뷰 (CLO 법적 가드 집중) — 🔴블로커=구현 복귀
- [ ] master 커밋·푸시

## 변경내역 (Alpha 직접 구현 — 2026-06-21 세션2)
- **유학(5-2)**: `src/data/study.ts`(전공6분야·실존대학8·D-2/D-4 서류7·Study in Korea/GKS/TOPIK/HiKorea) + `app/[locale]/study/page.tsx`(공식배너+전공+대학카드[영문site+입학 라이브검색]+장학금+서류 체크리스트+면책) + i18n(study 21키)
- **구직(5-3)**: `src/data/jobs.ts`(공식포털·일반보드·영어교사·학생알바 4카테고리 + official 플래그 + EPS/HiKorea 카브아웃) + `app/[locale]/jobs/page.tsx`(⚠️비모집자 배너+카테고리 링크+E-9/EPS 정보전용 카브아웃+비자-근로 경고+무보장 면책) + i18n(jobs 13키)
- **퍼널/통합**: nav에 study·jobs 추가(+flex-wrap 오버플로 방지) / purposes.ts D-10 구직자 `official:HiKorea`→`guide:/jobs`+guideLabel / journey 렌더 guideLabel 반영 / visas.ts d2-admission→/study connect, d2-work→/jobs connect / nav i18n(study·jobs) en·ko

## 검증 증빙 (완료형)
- `npm run build` → **EXIT 0, 199 정적 페이지**(195→+4: /en·/ko study·jobs). 타입체크·메시지키 누락 0
- 런타임 스모크(신규 prod 서버 :3131 — 주의: :3100은 세션1 구버전 점유): /en·/ko study·jobs **4경로 전부 HTTP 200**
- 콘텐츠 실증(grep): study=서울대학교/Global Korea Scholarship/표준입학허가서/Find admissions/"not an education or visa agency"/유학원 OK. jobs=Work24/Contact Korea/"not a recruiter"/Employment Permit System/"guarantee any job"/고용허가제/취업 보장/알선 OK
- 퍼널 실증(grep): /journey/us 구직카드→/jobs("See job boards"/"채용 정보 보기") OK · /journey/us/d2 →/study("Explore schools")+/jobs("Browse job boards") OK · nav에 study·jobs 링크 OK
- 크롬 시각 확인용 오픈(회장): :3131 study·jobs 양 로케일

## QA 결과 (독립 리뷰 — Dev Code Reviewer, 신선 컨텍스트, opus)
- **🔴 블로커 0건. 6개 완료기준 전부 PASS. 배포 가능 판정.**
  1. 법적 모델 준수 ✅ (jobs=매칭/수수료/지원수집/취업보장 코드·카피 부재, EPS는 클릭보드 아닌 carve-out 정보링크, "취업 보장 아님" 영/한 명시 / study=유학원·비자대행 아님 명시)
  2. i18n 완전성 ✅ (study 19키·jobs 12키·nav 2키 en/ko 양쪽 완전, 누락 0)
  3. 정확성 ✅ (대학 8곳 실존·공식 영문도메인, admissions 라이브검색 폴백, jobs 채널 전부 실존)
  4. 링크 위생 ✅ (외부 a 전부 target=_blank rel=noopener noreferrer, 내부=Link)
  5. 퍼널 정합 ✅ (D-10→guide:/jobs+guideLabel 렌더 반영, d2 connect StepLink 타입정합, guideLabel 옵셔널 선언)
  6. 일관성/접근성 ✅ (기존 어휘 일치, aria-hidden, 시맨틱 계층)
- 🟡 비차단(차후 일괄): ①장식용 `↗` 스크린리더 라벨(앱 전역 공통 패턴=이번 PR 회귀 아님) ②HIKOREA 상수 trailing slash 비일관(기능영향 0)

## CAE 감사 (g2-auditor · 회장 수동 발동 · 읽기전용)
- **종합: 합격(조건 없음). 🔴 규칙 위반 0건 / 🟡 권고 3건.** 보고 수치 vs 1차자료(코드·git·로그) 완전 일치(라인수·파일수·junk삭제·푸시 실측).
- A 라우팅 정직성 🟡주의(T4 ON이나 검증게이트 통과로 정당화·위반 아님) → **권고1 반영(위 라우팅 판단)**
- B 매트릭스 룩업 PASS(산출물 실재) · C 독립검증 PASS(실질) · D 로그·증빙 정직 PASS(완료형·git일치) · F 기타 PASS(무키워드·정직·git푸시)
- E CAE 발동 타이밍 🟡주의(구직은 §1.5 명시 🔒행 아님 → 수동발동 정상. 단 Alpha가 자체 🔒규정했다면 일관성 위해 자동발동했어야)
- **권고2(회장 결정):** §1.5 매트릭스에 "직업안정법·노동 알선"행 부재 → 추가 건의(헌법 수정 = 회장 승인사항)
- **권고3(기술부채 2세션 이월):** 접근성 `↗` aria 라벨 + HIKOREA trailing slash → 다음 세션 완료기준 포함 권고

## 세션2 미완 / 다음
- 5-3 구직은 **무료 정보형까지만** 합법 — 유료화·매칭·연결 시 직업소개사업 신고 + 법무법인 자문 필수(후행)
- 라이브 지도 API 키, 실데이터 Supabase, 전문가 입점, a11y `↗` 일괄 폴리시
- 배포(Vercel)는 회장 액션 — 최종 빌드본 대기


