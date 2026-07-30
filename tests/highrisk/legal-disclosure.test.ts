/**
 * 고위험 경로 — 개인정보 축: 개인정보처리방침의 **국외이전 고지**(PIPA §28-8).
 *
 * 왜 이 파일인가: welkor 는 DB(Supabase, 서울)는 국내지만 호스팅(Vercel, 미국)과
 * AI 어시스턴트(Cloudflare Workers AI, 글로벌 엣지)로 개인정보가 **국외로 나간다.**
 * 이 고지가 조용히 사라지면 그 자체로 법 위반이 된다(F-WEL-04, 2026-07-27 수정).
 * 지금까지 이를 잡는 장치는 0개였다 — 문구 삭제·리팩터링에 무방비였다.
 *
 * 범위: G2 `eval/highrisk_paths.json` 에 동결된 `src/data/legal.ts`. 전면 커버리지 아님.
 */
import { describe, it, expect } from "vitest";
import { PRIVACY, TERMS, LEGAL_CONTACT, LEGAL_ENTITY, LEGAL_UPDATED } from "@/data/legal";

/** 방침 전문을 한 덩어리 문자열로 (en/ko 각각). */
function flatten(locale: "en" | "ko"): string {
  return PRIVACY.map(
    (s) => `${s.heading[locale]}\n${s.body.map((b) => b[locale]).join("\n")}`,
  ).join("\n\n");
}

// 2026-07-31 M5-④: 부분일치(/Cloudflare/)는 `CloudflareX` 같은 훼손을 통과시킨다
// (뮤테이션 실측으로 발견). 단어 경계()로 조여 수령인 이름 훼손도 잡는다.
describe("PRIVACY — 국외이전 고지가 존재한다 (PIPA §28-8)", () => {
  it("두 수령인(Vercel·Cloudflare)이 한국어·영어 모두에 명시된다", () => {
    for (const locale of ["en", "ko"] as const) {
      const text = flatten(locale);
      expect(text, `${locale}: Vercel 국외이전 고지가 사라졌다`).toMatch(/Vercel/i);
      expect(text, `${locale}: Cloudflare 국외이전 고지가 사라졌다`).toMatch(/Cloudflare/i);
    }
  });

  it("이전되는 국가가 명시된다 — '어디로 가는지'가 고지의 핵심", () => {
    expect(flatten("en")).toMatch(/United States|USA|U\.S\./i);
    expect(flatten("ko")).toMatch(/미국/);
  });

  it("거부권과 거부 시 효과가 고지된다 (PIPA §28-8 ④)", () => {
    // 2026-07-27 F-WEL-04 수정으로 추가된 항목. 되돌아가면 즉시 빨간불.
    expect(flatten("ko")).toMatch(/거부/);
    expect(flatten("en")).toMatch(/refuse|object|decline/i);
  });
});

describe("PRIVACY — 민감정보 분리 동의 서술 (PIPA §23)", () => {
  it("국적·비자가 선택 항목이자 별도 동의 대상임이 방침에 남아 있다", () => {
    const ko = flatten("ko");
    expect(ko).toMatch(/국적/);
    expect(ko).toMatch(/비자/);
    // 폼의 분리 동의(connect-form.test.tsx)와 방침 서술이 함께 움직이도록 고정한다.
    expect(ko).toMatch(/선택|별도/);
  });
});

describe("법적 고정값 — 조용히 바뀌면 안 되는 것들", () => {
  it("연락처·주체·갱신일이 비어 있지 않다", () => {
    expect(LEGAL_CONTACT).toMatch(/@/);
    expect(LEGAL_ENTITY.length).toBeGreaterThan(0);
    expect(LEGAL_UPDATED).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("방침·약관 모두 en/ko 번역 누락이 없다 — 한쪽만 갱신되는 표류 방지", () => {
    for (const [label, doc] of [
      ["PRIVACY", PRIVACY],
      ["TERMS", TERMS],
    ] as const) {
      for (const section of doc) {
        expect(section.heading.en?.trim(), `${label}: en heading 누락`).toBeTruthy();
        expect(section.heading.ko?.trim(), `${label}: ko heading 누락`).toBeTruthy();
        for (const line of section.body) {
          expect(line.en?.trim(), `${label}: en body 누락`).toBeTruthy();
          expect(line.ko?.trim(), `${label}: ko body 누락`).toBeTruthy();
        }
      }
    }
  });
});
