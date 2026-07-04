import type { VisaTrack } from "../types";

/**
 * The Settlement Journey Engine data.
 * The journey now starts BEFORE arrival — from the user's home country
 * (visa eligibility, document prep, applying at the Korean mission) — then
 * continues through arrival and settled life.
 *
 * "{country}" in any text is replaced at render time with the user's chosen
 * origin country name.
 *
 * WelKor provides INFORMATION + CONNECTION only (never the licensed agent) —
 * every actionable step links to the official source and/or an in-platform
 * professional connection.
 */
export const VISA_TRACKS: VisaTrack[] = [
  {
    code: "E-7",
    slug: "e7",
    name: { en: "E-7 Professional", ko: "E-7 특정활동(전문직)" },
    audience: {
      en: "Skilled professionals sponsored by a Korean employer",
      ko: "한국 기업의 후원을 받는 전문 인력",
    },
    summary: {
      en: "From securing a job offer in {country} to settling in Korea, with a focus on housing and year-end tax.",
      ko: "{country}에서 일자리 확보부터 한국 정착까지, 주거와 연말정산을 중심으로 안내합니다.",
    },
    steps: [
      {
        id: "e7-eligibility",
        order: 1,
        category: "prearrival",
        title: { en: "Check eligibility & secure a job offer", ko: "자격 확인 & 일자리(후원) 확보" },
        description: {
          en: "An E-7 requires a Korean employer to sponsor you. Confirm your role is on the eligible occupation list and sign a contract before applying.",
          ko: "E-7은 한국 고용주의 후원이 필요합니다. 직무가 허용 직종에 해당하는지 확인하고 계약을 체결한 뒤 신청하세요.",
        },
        official: { href: "https://www.hikorea.go.kr", label: { en: "HiKorea — visa info", ko: "하이코리아 — 비자 안내" }, external: true },
      },
      {
        id: "e7-apply",
        order: 2,
        category: "prearrival",
        title: { en: "Apply for the E-7 visa in {country}", ko: "{country}에서 E-7 비자 신청" },
        description: {
          en: "Gather your contract, degree and the employer's visa issuance confirmation, then apply at the Korean Embassy or Consulate in {country}.",
          ko: "계약서·학위·고용주의 사증발급인정서를 준비해 {country}의 주한 공관(대사관/영사관)에 신청하세요.",
        },
        official: { href: "https://www.0404.go.kr/dev/main.do", label: { en: "Korean missions abroad", ko: "재외공관 안내" }, external: true },
      },
      {
        id: "e7-arc",
        order: 3,
        category: "visa",
        title: { en: "Arrive & register (ARC) within 90 days", ko: "입국 후 90일 내 외국인등록" },
        description: {
          en: "After arrival, book an immigration appointment and register to receive your Alien Registration Card.",
          ko: "입국 후 출입국 방문을 예약하고 외국인등록을 하여 외국인등록증을 발급받으세요.",
        },
        official: { href: "https://www.hikorea.go.kr", label: { en: "Book at HiKorea", ko: "하이코리아 예약" }, external: true },
      },
      {
        id: "e7-housing",
        order: 4,
        category: "residence",
        title: { en: "Find housing & sign a safe lease", ko: "집 구하기 & 안전한 임대차 계약" },
        description: {
          en: "Understand jeonse vs monthly rent, deposit protection, and move-in registration. Browse foreigner-friendly listings and connect with a licensed agent.",
          ko: "전세·월세 구조, 보증금 보호, 전입신고를 이해하세요. 외국인 친화 매물을 보고 공인중개사와 연결됩니다.",
        },
        connect: { href: "/housing", label: { en: "Browse housing", ko: "부동산 보기" } },
      },
      {
        id: "e7-bank",
        order: 5,
        category: "banking",
        title: { en: "Open a bank account & get a phone", ko: "은행 계좌 개설 & 휴대폰 개통" },
        description: {
          en: "With your ARC you can open a bank account and sign a mobile contract — required for almost everything else.",
          ko: "외국인등록증이 있으면 은행 계좌 개설과 휴대폰 약정이 가능합니다. 이후 거의 모든 절차의 전제입니다.",
        },
      },
      {
        id: "e7-tax",
        order: 6,
        category: "tax",
        title: { en: "Year-end tax settlement & treaty refunds", ko: "연말정산 & 조세조약 환급" },
        description: {
          en: "Foreign professionals may qualify for a flat-rate option and tax-treaty benefits (these vary by country). Learn the rules, then connect with a licensed tax accountant.",
          ko: "외국인 전문직은 단일세율 선택과 조세조약 혜택 대상일 수 있습니다(국가별 상이). 규정을 익히고 세무사와 연결하세요.",
        },
        connect: { href: "/tax", label: { en: "Tax guide & accountants", ko: "세무 가이드·세무사" } },
      },
      {
        id: "e7-life",
        order: 7,
        category: "life",
        title: { en: "Settle into local life", ko: "생활 정착" },
        description: {
          en: "Health insurance, your home-country grocery marts, and the community of people who did this before you.",
          ko: "건강보험, 본국 식료품 마트, 그리고 먼저 정착한 사람들의 커뮤니티를 활용하세요.",
        },
        connect: { href: "/community", label: { en: "Join the community", ko: "커뮤니티 참여" } },
      },
    ],
  },
  {
    code: "E-2",
    slug: "e2",
    name: { en: "E-2 English Teacher", ko: "E-2 회화지도(영어교사)" },
    audience: {
      en: "Language instructors at schools, hagwons and universities",
      ko: "학교·학원·대학의 회화지도 강사",
    },
    summary: {
      en: "Prepare your documents in {country}, get your visa, find housing, and handle teacher-specific tax.",
      ko: "{country}에서 서류 준비, 비자 발급, 집 구하기, 교사 특화 세무까지 안내합니다.",
    },
    steps: [
      {
        id: "e2-qualify",
        order: 1,
        category: "prearrival",
        title: { en: "Qualify & get a school sponsor", ko: "자격 충족 & 학교 후원 확보" },
        description: {
          en: "Confirm the native-language and degree criteria, and have a Korean school issue your visa sponsorship.",
          ko: "원어민·학위 요건을 확인하고, 한국 학교가 비자 후원을 발급하도록 하세요.",
        },
        official: { href: "https://www.hikorea.go.kr", label: { en: "HiKorea — E-2 requirements", ko: "하이코리아 — E-2 요건" }, external: true },
      },
      {
        id: "e2-apostille",
        order: 2,
        category: "prearrival",
        title: { en: "Apostille your documents in {country}", ko: "{country}에서 서류 아포스티유" },
        description: {
          en: "Your degree and a criminal background check usually must be apostilled or consular-legalised in {country} before you apply.",
          ko: "학위와 범죄경력증명은 보통 신청 전 {country}에서 아포스티유 또는 영사확인을 받아야 합니다.",
        },
        official: { href: "https://www.0404.go.kr/dev/main.do", label: { en: "Korean missions abroad", ko: "재외공관 안내" }, external: true },
      },
      {
        id: "e2-apply",
        order: 3,
        category: "prearrival",
        title: { en: "Apply for the E-2 visa in {country}", ko: "{country}에서 E-2 비자 신청" },
        description: {
          en: "Submit your documents to the Korean Embassy or Consulate in {country}.",
          ko: "준비한 서류를 {country}의 주한 공관(대사관/영사관)에 제출하세요.",
        },
        official: { href: "https://www.hikorea.go.kr", label: { en: "HiKorea", ko: "하이코리아" }, external: true },
      },
      {
        id: "e2-arc",
        order: 4,
        category: "visa",
        title: { en: "Arrival, health check & ARC", ko: "입국·건강검진 & 외국인등록" },
        description: {
          en: "Complete the in-country medical check and register for your ARC within 90 days.",
          ko: "입국 후 90일 이내 국내 건강검진을 마치고 외국인등록을 완료하세요.",
        },
        official: { href: "https://www.hikorea.go.kr", label: { en: "Book at HiKorea", ko: "하이코리아 예약" }, external: true },
      },
      {
        id: "e2-housing",
        order: 5,
        category: "residence",
        title: { en: "Housing (often school-provided)", ko: "주거 (학교 제공 여부 확인)" },
        description: {
          en: "Many schools provide or subsidise housing. If you rent yourself, check the deposit and the lease carefully — we explain how.",
          ko: "많은 학교가 주거를 제공·보조합니다. 직접 임차한다면 보증금과 계약을 꼼꼼히 확인하세요 — 방법을 안내합니다.",
        },
        connect: { href: "/housing", label: { en: "Browse housing", ko: "부동산 보기" } },
      },
      {
        id: "e2-tax",
        order: 6,
        category: "tax",
        title: { en: "Teacher tax & pension refund", ko: "교사 세무 & 연금 환급" },
        description: {
          en: "Some nationalities are tax-exempt for the first two years under a treaty, and may claim a pension refund on departure. Check if you qualify, then connect with an accountant.",
          ko: "일부 국적은 조세조약상 최초 2년 면세 대상이며, 출국 시 연금 환급도 가능할 수 있습니다. 해당 여부를 확인하고 세무사와 연결하세요.",
        },
        connect: { href: "/tax", label: { en: "Tax guide & accountants", ko: "세무 가이드·세무사" } },
      },
      {
        id: "e2-life",
        order: 7,
        category: "life",
        title: { en: "Connect with other teachers", ko: "다른 교사들과 연결" },
        description: {
          en: "Lesson resources, contract advice and life tips from the teacher community.",
          ko: "수업 자료, 계약 조언, 생활 팁을 교사 커뮤니티에서 얻으세요.",
        },
        connect: { href: "/community", label: { en: "Join the community", ko: "커뮤니티 참여" } },
      },
    ],
  },
  {
    code: "D-2",
    slug: "d2",
    name: { en: "D-2 / D-4 Student", ko: "D-2 / D-4 유학·어학연수" },
    audience: {
      en: "University students and language-school learners",
      ko: "대학 재학생 및 어학원 연수생",
    },
    summary: {
      en: "From admission and applying in {country} to a room, part-time work and student life.",
      ko: "입학·{country}에서의 비자 신청부터 방 구하기, 시간제 근무, 학생 생활까지.",
    },
    steps: [
      {
        id: "d2-admission",
        order: 1,
        category: "prearrival",
        title: { en: "Get admission to a Korean school", ko: "한국 학교 입학 허가" },
        description: {
          en: "Your school issues a certificate of admission used for the D-2/D-4 visa. Confirm tuition and the required funds.",
          ko: "학교가 표준입학허가서를 발급하며 이는 D-2/D-4 비자에 사용됩니다. 등록금과 재정요건을 확인하세요.",
        },
        official: { href: "https://www.studyinkorea.go.kr", label: { en: "Study in Korea", ko: "스터디 인 코리아" }, external: true },
        connect: { href: "/study", label: { en: "Explore schools & majors", ko: "학교·전공 살펴보기" } },
      },
      {
        id: "d2-apply",
        order: 2,
        category: "prearrival",
        title: { en: "Prepare funds & apply in {country}", ko: "{country}에서 재정증빙 & 비자 신청" },
        description: {
          en: "Prepare financial proof and required documents, then apply for the D-2/D-4 visa at the Korean mission in {country}.",
          ko: "재정증빙과 서류를 준비해 {country}의 주한 공관에서 D-2/D-4 비자를 신청하세요.",
        },
        official: { href: "https://www.0404.go.kr/dev/main.do", label: { en: "Korean missions abroad", ko: "재외공관 안내" }, external: true },
      },
      {
        id: "d2-arc",
        order: 3,
        category: "visa",
        title: { en: "Arrival & Alien Registration", ko: "입국 & 외국인등록" },
        description: {
          en: "Register within 90 days. Your school's international office usually helps with the booking.",
          ko: "입국 후 90일 이내 등록하세요. 보통 학교 국제처가 예약을 도와줍니다.",
        },
        official: { href: "https://www.hikorea.go.kr", label: { en: "Book at HiKorea", ko: "하이코리아 예약" }, external: true },
      },
      {
        id: "d2-housing",
        order: 4,
        category: "residence",
        title: { en: "Dorm or one-room studio", ko: "기숙사 또는 원룸" },
        description: {
          en: "Compare dorms with one-room (wolse) studios near campus. Understand the deposit and the monthly-rent structure.",
          ko: "기숙사와 캠퍼스 인근 원룸(월세)을 비교하세요. 보증금과 월세 구조를 이해하세요.",
        },
        connect: { href: "/housing", label: { en: "Browse housing", ko: "부동산 보기" } },
      },
      {
        id: "d2-work",
        order: 5,
        category: "job",
        title: { en: "Part-time work permit", ko: "시간제 취업 허가" },
        description: {
          en: "Students may work part-time (a weekly-hour cap applies) only after getting permission from immigration. We explain the limits.",
          ko: "학생은 출입국 허가를 받은 후에만 시간제 근무가 가능합니다(주당 시간 상한 적용). 기준을 안내합니다.",
        },
        official: { href: "https://www.hikorea.go.kr", label: { en: "Part-time work rules", ko: "시간제취업 규정" }, external: true },
        connect: { href: "/jobs", label: { en: "Browse job boards", ko: "채용 정보 보기" } },
      },
      {
        id: "d2-tax",
        order: 6,
        category: "tax",
        title: { en: "Part-time income & tax basics", ko: "아르바이트 소득 & 세금 기초" },
        description: {
          en: "If you earn from part-time work, learn the basics of withholding and refunds.",
          ko: "시간제 근무로 소득이 있다면 원천징수와 환급의 기초를 익히세요.",
        },
        connect: { href: "/tax", label: { en: "Tax guide", ko: "세무 가이드" } },
      },
      {
        id: "d2-life",
        order: 7,
        category: "life",
        title: { en: "Student community & life", ko: "학생 커뮤니티 & 생활" },
        description: {
          en: "Find study groups, used furniture, and home-country grocery marts near campus.",
          ko: "스터디 그룹, 중고 가구, 캠퍼스 인근 본국 식료품 마트를 찾으세요.",
        },
        connect: { href: "/community", label: { en: "Join the community", ko: "커뮤니티 참여" } },
      },
    ],
  },
  {
    code: "E-1",
    slug: "e1",
    name: { en: "E-1 Professor", ko: "E-1 교수" },
    audience: {
      en: "Professors and lecturers appointed by a Korean university",
      ko: "한국 대학에 임용된 교수·강사",
    },
    summary: {
      en: "From your university appointment in {country} to teaching life in Korea, with housing and tax.",
      ko: "{country}에서의 임용부터 한국에서의 강의 생활까지, 주거와 세무를 포함해 안내합니다.",
    },
    steps: [
      {
        id: "e1-appoint",
        order: 1,
        category: "prearrival",
        title: { en: "Secure a university appointment", ko: "대학 임용(초빙) 확보" },
        description: {
          en: "A Korean university must appoint you and issue the documents needed to sponsor your E-1 visa.",
          ko: "한국 대학이 임용하고 E-1 비자 후원에 필요한 서류를 발급해야 합니다.",
        },
        official: { href: "https://www.hikorea.go.kr", label: { en: "HiKorea — E-1 info", ko: "하이코리아 — E-1 안내" }, external: true },
      },
      {
        id: "e1-apply",
        order: 2,
        category: "prearrival",
        title: { en: "Apply for the E-1 visa in {country}", ko: "{country}에서 E-1 비자 신청" },
        description: {
          en: "Submit your appointment letter, degree and CV to the Korean Embassy or Consulate in {country}.",
          ko: "임용통지서·학위·이력서를 {country}의 주한 공관(대사관/영사관)에 제출하세요.",
        },
        official: { href: "https://www.0404.go.kr/dev/main.do", label: { en: "Korean missions abroad", ko: "재외공관 안내" }, external: true },
      },
      {
        id: "e1-arc",
        order: 3,
        category: "visa",
        title: { en: "Arrive & register (ARC) within 90 days", ko: "입국 후 90일 내 외국인등록" },
        description: {
          en: "Book an immigration appointment and register to receive your Alien Registration Card.",
          ko: "출입국 방문을 예약하고 외국인등록을 하여 외국인등록증을 발급받으세요.",
        },
        official: { href: "https://www.hikorea.go.kr", label: { en: "Book at HiKorea", ko: "하이코리아 예약" }, external: true },
      },
      {
        id: "e1-housing",
        order: 4,
        category: "residence",
        title: { en: "Find housing (often campus-assisted)", ko: "집 구하기 (학교 지원 여부 확인)" },
        description: {
          en: "Many universities help with housing. If you rent yourself, understand deposits, the lease and move-in registration.",
          ko: "많은 대학이 주거를 지원합니다. 직접 임차한다면 보증금·계약·전입신고를 이해하세요.",
        },
        connect: { href: "/housing", label: { en: "Browse housing", ko: "부동산 보기" } },
      },
      {
        id: "e1-bank",
        order: 5,
        category: "banking",
        title: { en: "Open a bank account & get a phone", ko: "은행 계좌 개설 & 휴대폰 개통" },
        description: {
          en: "With your ARC you can open a bank account and sign a mobile contract.",
          ko: "외국인등록증이 있으면 은행 계좌 개설과 휴대폰 약정이 가능합니다.",
        },
      },
      {
        id: "e1-tax",
        order: 6,
        category: "tax",
        title: { en: "Year-end tax settlement & treaty benefits", ko: "연말정산 & 조세조약 혜택" },
        description: {
          en: "Professors from some countries enjoy tax-treaty benefits (these vary by country). Learn the rules, then connect with a licensed tax accountant.",
          ko: "일부 국가 교수는 조세조약 혜택 대상입니다(국가별 상이). 규정을 익히고 세무사와 연결하세요.",
        },
        connect: { href: "/tax", label: { en: "Tax guide & accountants", ko: "세무 가이드·세무사" } },
      },
      {
        id: "e1-life",
        order: 7,
        category: "life",
        title: { en: "Settle into academic life", ko: "학교 생활 정착" },
        description: {
          en: "Health insurance, the international faculty community, and your home-country essentials.",
          ko: "건강보험, 외국인 교원 커뮤니티, 본국 생활용품을 챙기세요.",
        },
        connect: { href: "/community", label: { en: "Join the community", ko: "커뮤니티 참여" } },
      },
    ],
  },
  {
    code: "E-3",
    slug: "e3",
    name: { en: "E-3 Researcher", ko: "E-3 연구" },
    audience: {
      en: "Researchers invited by an accredited institute or company R&D center",
      ko: "인가 연구기관·기업 부설연구소가 초청한 연구원",
    },
    summary: {
      en: "From your research invitation in {country} to settled life in Korea, with housing and tax.",
      ko: "{country}에서의 연구 초청부터 한국 정착까지, 주거와 세무를 포함해 안내합니다.",
    },
    steps: [
      {
        id: "e3-invite",
        order: 1,
        category: "prearrival",
        title: { en: "Get an invitation from a research institute", ko: "연구기관의 초청 확보" },
        description: {
          en: "An accredited institute or R&D center must invite you and provide the sponsorship documents.",
          ko: "인가된 연구기관 또는 부설연구소가 초청하고 후원 서류를 제공해야 합니다.",
        },
        official: { href: "https://www.hikorea.go.kr", label: { en: "HiKorea — E-3 info", ko: "하이코리아 — E-3 안내" }, external: true },
      },
      {
        id: "e3-apply",
        order: 2,
        category: "prearrival",
        title: { en: "Apply for the E-3 visa in {country}", ko: "{country}에서 E-3 비자 신청" },
        description: {
          en: "Submit your invitation, degree and research-career documents to the Korean mission in {country}.",
          ko: "초청서·학위·연구경력 서류를 {country}의 주한 공관에 제출하세요.",
        },
        official: { href: "https://www.0404.go.kr/dev/main.do", label: { en: "Korean missions abroad", ko: "재외공관 안내" }, external: true },
      },
      {
        id: "e3-arc",
        order: 3,
        category: "visa",
        title: { en: "Arrive & register (ARC) within 90 days", ko: "입국 후 90일 내 외국인등록" },
        description: {
          en: "Book an immigration appointment and register to receive your Alien Registration Card.",
          ko: "출입국 방문을 예약하고 외국인등록을 하여 외국인등록증을 발급받으세요.",
        },
        official: { href: "https://www.hikorea.go.kr", label: { en: "Book at HiKorea", ko: "하이코리아 예약" }, external: true },
      },
      {
        id: "e3-housing",
        order: 4,
        category: "residence",
        title: { en: "Find housing & sign a safe lease", ko: "집 구하기 & 안전한 임대차 계약" },
        description: {
          en: "Understand deposits and the lease, then browse foreigner-friendly listings and connect with a licensed agent.",
          ko: "보증금과 계약을 이해하고, 외국인 친화 매물을 보고 공인중개사와 연결됩니다.",
        },
        connect: { href: "/housing", label: { en: "Browse housing", ko: "부동산 보기" } },
      },
      {
        id: "e3-bank",
        order: 5,
        category: "banking",
        title: { en: "Open a bank account & get a phone", ko: "은행 계좌 개설 & 휴대폰 개통" },
        description: {
          en: "With your ARC you can open a bank account and sign a mobile contract.",
          ko: "외국인등록증이 있으면 은행 계좌 개설과 휴대폰 약정이 가능합니다.",
        },
      },
      {
        id: "e3-tax",
        order: 6,
        category: "tax",
        title: { en: "Tax & treaty benefits for researchers", ko: "연구원 세무 & 조세조약 혜택" },
        description: {
          en: "Some researchers qualify for tax-treaty exemptions (these vary by country). Learn the rules, then connect with a licensed accountant.",
          ko: "일부 연구원은 조세조약 면세 대상입니다(국가별 상이). 규정을 익히고 세무사와 연결하세요.",
        },
        connect: { href: "/tax", label: { en: "Tax guide & accountants", ko: "세무 가이드·세무사" } },
      },
      {
        id: "e3-life",
        order: 7,
        category: "life",
        title: { en: "Settle into life & the research community", ko: "생활·연구 커뮤니티 정착" },
        description: {
          en: "Health insurance, fellow researchers, and your home-country essentials.",
          ko: "건강보험, 동료 연구자, 본국 생활용품을 챙기세요.",
        },
        connect: { href: "/community", label: { en: "Join the community", ko: "커뮤니티 참여" } },
      },
    ],
  },
];

export function getVisaTrack(slug: string): VisaTrack | undefined {
  return VISA_TRACKS.find((v) => v.slug === slug);
}
