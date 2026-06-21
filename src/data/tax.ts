import type { TaxGuide } from "./types";

/**
 * Tax GUIDES only — general information, not tax representation.
 * Filing/year-end settlement is performed by licensed tax accountants (세무사)
 * connected through the marketplace. (CLO: 세무사법 boundary.)
 */
export const TAX_GUIDES: TaxGuide[] = [
  {
    id: "t1",
    title: { en: "What is year-end tax settlement (연말정산)?", ko: "연말정산이란?" },
    body: {
      en: "Employees in Korea reconcile their income tax once a year. Employers collect documents in January–February for the previous year. Foreign employees are included.",
      ko: "한국의 근로자는 연 1회 소득세를 정산합니다. 고용주가 1~2월에 전년도 자료를 모읍니다. 외국인 근로자도 대상입니다.",
    },
    appliesTo: ["e7", "e2"],
  },
  {
    id: "t2",
    title: { en: "Flat tax rate option for foreign workers", ko: "외국인 근로자 단일세율 특례" },
    body: {
      en: "Qualifying foreign employees can elect a single flat rate instead of the progressive rate. Whether it benefits you depends on your income — compare both.",
      ko: "요건을 갖춘 외국인 근로자는 누진세율 대신 단일세율을 선택할 수 있습니다. 유리한지는 소득에 따라 다르므로 비교가 필요합니다.",
    },
    appliesTo: ["e7", "e2"],
  },
  {
    id: "t3",
    title: { en: "Tax treaties & teacher exemptions", ko: "조세조약 & 교사 면세" },
    body: {
      en: "Korea has tax treaties with many countries. Some teachers are exempt for up to two years. Eligibility depends on nationality and contract — verify before filing.",
      ko: "한국은 다수 국가와 조세조약을 맺고 있습니다. 일부 교사는 최대 2년 면세 대상입니다. 국적·계약에 따라 다르므로 신고 전 확인하세요.",
    },
    appliesTo: ["e2"],
  },
  {
    id: "t4",
    title: { en: "Part-time income for students", ko: "유학생 아르바이트 소득" },
    body: {
      en: "Part-time wages are usually subject to withholding. You may be able to claim a refund. Keep your payslips and work-permit records.",
      ko: "아르바이트 임금은 보통 원천징수 대상입니다. 환급을 받을 수 있는 경우가 있습니다. 급여명세서와 취업허가 기록을 보관하세요.",
    },
    appliesTo: ["d2"],
  },
];
