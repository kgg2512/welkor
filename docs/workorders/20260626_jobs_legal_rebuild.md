# 작업지시서 — WelKor jobs 전면 재구축 + 전 섹션 법률 재검토

**작성:** Alpha | **날짜:** 2026-06-26 | **레인:** 🔒 구직·채용·노동(직업안정법) + 법무 + 신규기능

## 회장 요청 원문
> 일단은 A(맞춤 정보 큐레이션)부터 구현을 하자.
> 근데 B는 왜 불법이야? 나는 그 부분이 이해가 안 되는데 — 자소설닷컴, 링크드인, 원티드 등 각종 채용사이트들이 각 기업의 채용정보를 소개해주고, 이를 채용시장의 공급자(노동시장 공급자들)에게 정보를 제공하잖아. 이게 왜 불법이지? 이 부분에 대해 **CLO가 제대로 법률 검토**를 해봐라.
> 그리고 CLO는 **JOBS를 전면 재구축**하고, **주택/세금/회계 등 다른 부분들도 전면 재검토**해라.

## 배경 / Alpha 자인
- 현 jobs = 출신국·비자·직무 무관하게 동일한 정적 외부 링크 12개(= 북마크, 가치 0). Contact Korea 링크는 죽음(KOTRA가 GTC로 통합, contactkorea.go.kr 폐지). 정부사이트(work24/epik)는 외국인 브라우저 UX 부실.
- Alpha가 앞서 "원티드식 정보제공"까지 싸잡아 불법처럼 단순화한 것은 부정확. 정확한 경계는 CLO가 조문 근거로 판정.

## 완료 기준 (테스트 가능)
### Phase 1 — CLO 법률 검토 (이 작업지시서의 핵심·선행)
**[CLO-A / jobs·직업안정법]**
1. **회장 B질문 정면 답변**: 원티드·잡코리아·링크드인·자소설닷컴이 합법인 정확한 법적 근거(직업안정법 조문 번호 인용). "직업정보제공사업(신고제)" vs "직업소개사업(등록/허가제)" vs "근로자공급/파견"의 경계를 행위 기준으로 정의.
2. **웰코 합법 스펙트럼**: ①현행 단순 외부링크 → ②직업정보제공사업(신고 시 공고 직접 게재·검색·맞춤추천 어디까지?) → ③직업소개(등록 요건·자본·책임) → ④E-9 등 알선 금지선. 각 단계별 요건(신고/등록/자본금/겸업·외국인 특칙/벌칙).
3. **jobs v2 권고 모델**: 위 스펙트럼 중 웰코가 지금 합법적으로 도달할 최대치 + 권고. 필수 UI 고지문구(한/영)와 금지표현 목록.
4. **근거 정확성**: 추측 금지. 한국 직업안정법·시행령 최신 조문을 firecrawl/검색으로 확인 후 인용(개정 가능성 주의).
- 산출물: `welkor/docs/legal/JOBS_LEGAL_REVIEW.md` 작성 + 핵심 요약 반환.

**[CLO-B / 타섹션 법률 스캔]**
대상 섹션별 법적 리스크 + 합법 모델 + 필수 고지문구:
- **housing(부동산)**: 공인중개사법 — 중개행위 vs 정보제공/광고 경계, 무자격 중개 리스크.
- **tax(세무)**: 세무사법 — 세무대리·세무상담 vs 일반정보 제공 경계.
- **finance(금융)**: 유사수신·투자자문·외국환거래법 — 송금/환전/계좌 안내의 한계.
- **study(유학)**: 유학원(유학수속대행) 등록 여부, 수수료 알선 리스크.
- (explore/community 등 부수: 저작권·약관·개인정보 짧게)
- 산출물: `welkor/docs/legal/SECTIONS_LEGAL_REVIEW.md` 작성 + 핵심 요약 반환.

### Phase 2 — 구현 (Phase 1 결과 받아 Alpha가 라우팅)
- jobs v2: 출신국 × 비자 × 희망직무 → ①비자 합법 가능직종 ②필터된 딥링크(외국인 친화 우선) ③출신국 특화. CLO 고지문구 적용. 죽은 링크 일괄 교체.
- 타섹션: CLO 권고대로 문구·구조 수정.

## 대상 파일 (이미 확인됨 — 재탐색 불요)
- jobs: `welkor/src/data/jobs.ts`, `welkor/src/app/[locale]/jobs/page.tsx`
- 데이터: `welkor/src/data/{housing,tax,finance,study,visas,countries,purposes,community,listings,tourism,types}.ts`
- 법적모델 원천: `welkor/docs/FOUNDATION.md` (§4 법적 모델)
- 문구: `welkor/messages/{ko,en}.json`

## 제약
- 법적모델 협상불가 고정: 정보제공 + 면허전문가 연결만, 직접 중개/세무대행/E-9 알선 금지. CLO가 이 고정선이 과한지(원티드식 정보제공은 허용되는지) 재검토하여 경계를 정밀화.
- 한국법 기준(외국인 사용자 대상이나 사업 주체·서버는 한국 전제).

## 진행 로그 (각 단계 append)
- 2026-06-26 [CLO-A 완료] 직업안정법 정밀검토 → `welkor/docs/legal/JOBS_LEGAL_REVIEW.md` 작성. 근거: 직업안정법 제2조의2/18/19/22/23/25/26/33/46/47/48/50조(yeslaw 전문) + 현행 벌칙 제47조 5년/5천만원(law.go.kr, 2014.5.20.개정) + 시행령 제28조 준수사항 6호(LBOX, 현행 시행 2026.3.23. 대통령령 제36220호) + 유료직업소개 등록요건(강남구청 2026-03-12) + E-9 고용허가제(외국인고용법 제8·9조). 판정: 원티드式 정보제공=합법(직업정보제공사업, 제23조 신고제), 알선과는 행위로 구분. 웰코 권고=②직업정보제공형(맞춤추천 합법), 알선 트리거 6개 회피, E-9 EPS 링크로만 분리. FOUNDATION §4 "유료화 전 직업소개사업 신고" 표현 정정 권고(직업소개≠직업정보제공). 미확인: 제48조 정확액·(b)큐레이션 회색지대 유권해석. 변호사 검토는 사업화(유료/직접게재) 시점 권고.
- 2026-06-26 [CLO-B 완료] 타섹션 법률 재검토(housing/tax/finance/study/community/explore/listings) → `welkor/docs/legal/SECTIONS_LEGAL_REVIEW.md` 작성. 근거: 공인중개사법 제2조1호·제9조·제48조(2026.2.15. law.go.kr 직접 확인), 세무사법 제2조·제22조(삼쩜삼 분쟁 참고), 자본시장법 제17조, 관광진흥법 제4조, 표시광고법 제3조, 개인정보보호법 제24조의2. 판정: housing=중간-높음(알선 경계 실매물 전환 시), tax=높음(세무상담 경계 단 현 구현 합법 수준), finance=중간(현 구조 합법), study=중간(등록 의무 없으나 허위정보 주의), community/explore=낮음. 즉시 조치 4건·법무법인 자문 대상 4건 도출. 미확인: 세무사법 시행 개정 현황(2011년 버전 확인, 최근 개정 내용 유권해석 필요).

### Phase 2 — 구현 (CTO)

### Phase 3 — 독립 QA (g2-qa-tester)

- 2026-06-26 [QA 진행중 — g2-qa-tester] 구현자 증빙 재사용 없이 독립 재실행. 결과 하단 참조.

---

- 2026-06-26 [Phase2 jobs v2 구현 완료 — CTO] 직업정보제공형으로 jobs 전면 재구축. **변경 파일:**
  - `welkor/src/data/jobs.ts` — 전면 재작성. 신규 모델 3종: `WORK_ELIGIBILITY`(15개 비자 코드: E-7/E-1/E-2/E-3/E-5/D-8/D-2/D-4/D-10/H-2/F-2/F-5/F-6/E-9 — permission·allowed·conditions·employerSponsor·officialUrl·relevantFields), `JOB_FIELDS`(9개 직무), `JOB_CHANNELS`(10개 채널 + `buildUrl(field, locale)` 필터 검색 딥링크 빌더 + `rankChannels()` 비자/직무별 재정렬). 죽은 contactkorea.go.kr 제거 → `KOTRA_GTC = kotra.or.kr/gtc_kor`. E-9는 permission:"none" carve-out(클릭 보드 0개).
  - `welkor/src/app/[locale]/jobs/JobsExplorer.tsx` — 신규 `"use client"` 인터랙티브 필터(비자 select + 직무 select/chips → 결과 3블록 실시간 변경).
  - `welkor/src/app/[locale]/jobs/page.tsx` — 서버 컴포넌트(setRequestLocale/getTranslations 유지) → 라벨 수집 후 JobsExplorer 주입 + CLO 필수 고지(noticeBody/E-9 carve-out/disclaimer) 상시 노출.
  - `welkor/messages/{ko,en}.json` jobs 섹션 — 신규 34키(필터 라벨·블록 제목·고지문구), 양 로케일 키 일치(mismatch 0).
  - `welkor/docs/FOUNDATION.md` §4 정정 — "직업소개사업 신고"→"직업정보제공사업 신고(제23조, 직업소개 아님)" + P2 로드맵 동일 정정.
  - **검증 증빙:** ① `npm run build` EXIT=0(jobs 라우트 6.8kB 인터랙티브 빌드). ② 비자×직무 동작(Playwright evaluate): A=D-2+IT→Block①"Part-time only"·1순위 Albamon·Wanted딥링크 `software developer` / B=F-6+Education→Block①"Work freely"·1순위 EPIK·Wanted `teacher` / C=E-9→Block①"Government-only"·채널 0개 carve-out → **선택 따라 3블록 실제 변경 확인.** KO: E-2+교육→Saramin딥링크 `강사 외국어가능`(KO키워드 로케일인지). ③ 외부링크 HTTP 200 전수(curl): kotra gtc_kor·work24·kowork·jobkorea·saramin·wanted·albamon/jobs/part·eps·hikorea·epik·eslcafe·teachaway·linkedin검색·jobkoreaglobal 모두 200(죽은 contactkorea 교체완료). ④ 금지표현 grep: 긍정형 위반 0(검출된 매치는 전부 "~하지 않습니다" 부정문=CLO 필수 고지 + 금지목록 주석). ⑤ 콘솔 에러: 기능 코드 유발 0(favicon·vercel insights 404는 로컬 환경/사이트 전역, jobs 무관). ⑥ before/after 스크린샷 `welkor/welkor-jobs-after-ko.png`. **비자 취업범위·시간제 한도는 firecrawl로 HiKorea/법무부 비자내비게이터 확인(D-2 학부 학기중≈25h·주말방학 무제한, D-4≈20h, D-10 인턴만, F-2/5/6 자유) — 정밀 직종표는 HiKorea 링크 위임, 범위는 "약/confirm at HiKorea" 표기.** 미해결: 사업화(공고 직접게재/유료) 시 제23조 신고 + 변호사 검토 필요(CLO 권고대로 코드 주석 명시).

---

### QA 독립 검증 결과 (g2-qa-tester — 2026-06-26)

**검증 환경:** `npm run dev` (localhost:3001), Playwright 직접 실행, 구현자 증빙 불재사용.

| # | 항목 | 판정 | 독립 실행 증빙 |
|---|------|------|--------------|
| 1 | 빌드 | PASS | `npm run build` EXIT=0. 출력: "✓ Generating static pages (201/201)", jobs 라우트 6.8kB. |
| 2 | 금지표현 긍정형 0 | PASS | grep 4개 파일: jobs.ts 라인 4·18-20·290 모두 부정문 또는 금지목록 주석. JobsExplorer.tsx·page.tsx·ko.json·en.json 매치 0. |
| 3 | 필수 고지문구 노출 | PASS | Playwright snapshot 직접 확인: EN 고지 "WelKor provides job information only. We do not place, broker, or represent candidates" 실 렌더. E-9 carve-out 별도 박스(border-rose-200) 상시 노출. KO "WelKor는 채용 정보를 안내하는 정보 제공 서비스입니다. 직업소개·알선..." 실 렌더 확인. |
| 4 | 맞춤 동작(핵심) | PASS | 3조합 직접 검증: ①D-2+IT→"Part-time only" 배지, Albamon 1순위, LinkedIn `keywords=개발자` 딥링크. ②F-6+교육→"Work freely" 배지, EPIK/TeachAway/ESLCafe 상단, Albamon 최하단. ③E-9→채널 0개(clickableBoardCount=0), EPS 안내 텍스트만. 조합별 결과 상이 = 정적 아님 확인. |
| 5 | 외부 링크 생존 | PASS | 14개 URL 전수 HTTP 확인(GET). 모두 200. contactkorea.go.kr 제거됨, kotra.or.kr/gtc_kor 200 확인. |
| 6 | i18n 무결성 | PASS | ko.json jobs 34키, en.json jobs 34키. ko에만/en에만 있는 키 = 없음. 하드코딩 텍스트 없음(모든 문자열 t() 경유). |
| 7 | 법적 가드레일 종합 | PASS | 공고 DB 직접 보유 없음(딥링크만). 모든 href 외부 URL만(내부 /api/apply 없음). 플랫폼 연락 창구 없음. 수수료 코드 없음. E-9 채널 0개 분리. 알선 트리거 6개(특정매칭·지원대행·취업추천·합격관여·수수료·연락창구) 모두 회피 확인. |

**파괴 시도:**
- 비자 미선택 + 직무 미선택: Block 1 "Choose your visa above..." 빈 상태 표시, 오류 없음.
- 모바일 375px: 가로 overflow 없음(scrollWidth=clientWidth), 고지 배너/E-9 배너 모두 표시.
- 콘솔 에러: favicon.ico 404 1건(전역·jobs 무관), 기능 코드 유발 에러 0.

**전체 판정: PASS**
블로커(🔴) 없음. 경미 사항(🟡): favicon.ico 누락(전역 이슈, jobs 레인 밖). 미해결(미검증): 실 배포 URL(welkor.vercel.app) 라이브 확인은 본 세션 로컬 검증 범위 밖 — 배포 후 별도 smoke test 권고.

스크린샷: `c:\Users\kgg25\Desktop\G2 Company Ltd\.playwright-mcp\qa_e9_carveout.png`, `qa_mobile_375.png`
