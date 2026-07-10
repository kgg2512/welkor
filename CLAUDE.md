# WelKor — 작업 규칙

**언어: 항상 한국어.** 상세 기획은 `docs/FOUNDATION.md`, 회사 헌법은 `Desktop/G2 Company Ltd/CLAUDE.md`.

## 🎭 데모/스토어 이원화 (회장 지시 2026-07-10 — 위반 금지)

| 슬롯 | URL | 갱신 경로 |
|------|-----|----------|
| **데모(작업용 스테이징)** | https://welkor-git-master-kgg2512-9328s-projects.vercel.app | `master` 푸시 시 자동 (프리뷰 배포) |
| **스토어(운영)** | https://welkor.vercel.app | `store` 브랜치 푸시 시만 (프로덕션 브랜치=store) |

**작업 절차 (모든 코드 작업 기본):**
1. 작업은 지금처럼 **master에서 직접** → push → 데모 URL에서 검증 (스토어는 안 움직인다)
2. 검증 PASS 후 승격: `git push origin master:store` → welkor.vercel.app 갱신
3. **store 브랜치 직접 커밋 금지** — 검증된 master 커밋으로만 fast-forward하는 배포 포인터다.
4. 롤백: `git push origin <이전 검증 커밋>:store --force-with-lease` 또는 Vercel 대시보드 이전 배포 promote.

- 빌드 조건: 커밋 author = kgg2512@gmail.com (COMMIT_AUTHOR_REQUIRED)
- 법적 모델 불변: 정보 + 면허 전문가 연결만. 직접 중개/세무대행/E-9 알선 금지.
