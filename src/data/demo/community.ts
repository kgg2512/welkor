import type { CommunityPost } from "../types";

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "c1",
    author: "Marco",
    flag: "🇮🇹",
    category: { en: "Housing", ko: "주거" },
    title: { en: "Is a 1000/75 wolse fair near Gangnam?", ko: "강남 근처 1000/75 월세 적정한가요?" },
    excerpt: {
      en: "Just arrived on an E-7. Agent quoted 10M deposit, 750k/month. Is that normal?",
      ko: "E-7으로 막 왔어요. 보증금 1000, 월 75 제안받았는데 보통인가요?",
    },
    body: {
      en: "I just arrived on an E-7 visa and I'm looking at a one-room near Gangnam. The agent quoted a 10,000,000 won deposit and 750,000 won/month (people write this as '1000/75'). I have no reference point — is that a fair price for the area, and is there anything I should double-check before signing? I've heard about 전입신고 and 확정일자 but don't fully understand them yet.",
      ko: "E-7 비자로 막 도착해서 강남 근처 원룸을 알아보고 있어요. 중개사가 보증금 1,000만원에 월 75만원(‘1000/75’)을 제안했는데, 기준이 없어서 이 지역 시세로 적정한지, 계약 전에 확인할 게 있는지 궁금해요. 전입신고랑 확정일자 얘기를 들었는데 아직 잘 모르겠어요.",
    },
    replies: 12,
    answers: [
      {
        author: "Jisoo",
        flag: "🇰🇷",
        body: {
          en: "1000/75 near Gangnam is on the normal-to-slightly-high side for a one-room, but it depends on the building age and exact station. Always do 전입신고 (move-in report) + 확정일자 (fixed date) right after moving in — that's what protects your deposit.",
          ko: "강남 근처 원룸이면 1000/75는 보통~약간 높은 편이에요. 건물 연식과 역세권 여부에 따라 달라요. 이사 직후 전입신고 + 확정일자 꼭 받으세요 — 그게 보증금을 지켜줍니다.",
        },
      },
      {
        author: "David",
        flag: "🇺🇸",
        body: {
          en: "Check the 등기부등본 (property register) for the owner's name and any loans on the property before paying anything. WelKor's Housing page has a 'Before you sign' checklist.",
          ko: "돈 내기 전에 등기부등본으로 소유자 이름과 근저당(대출)을 꼭 확인하세요. WelKor 주거 페이지에 ‘계약 전 확인’ 체크리스트가 있어요.",
        },
      },
    ],
  },
  {
    id: "c2",
    author: "Sarah",
    flag: "🇿🇦",
    category: { en: "Tax", ko: "세무" },
    title: { en: "Teacher 2-year tax exemption — who qualifies?", ko: "교사 2년 면세, 누가 해당되나요?" },
    excerpt: {
      en: "Heard E-2 teachers from some countries are exempt. How do I check mine?",
      ko: "일부 국가 E-2 교사는 면세라던데, 제 경우는 어떻게 확인하죠?",
    },
    body: {
      en: "I'm an E-2 English teacher and a colleague told me some nationalities get a 2-year income-tax exemption because of a tax treaty between their country and Korea. How do I find out whether my country has such a treaty, and what documents does the school or tax office need? I don't want to claim something I'm not entitled to.",
      ko: "저는 E-2 영어 교사인데, 동료가 일부 국적은 본국과 한국 간 조세조약 때문에 2년간 소득세 면제를 받는다고 하더라고요. 제 나라가 그런 조약이 있는지 어떻게 확인하고, 학교나 세무서에 어떤 서류가 필요한지 궁금해요. 자격이 안 되는 걸 신청하고 싶진 않아요.",
    },
    replies: 8,
    answers: [
      {
        author: "Minjun",
        flag: "🇰🇷",
        body: {
          en: "Whether the exemption applies depends on the specific tax treaty between your country and Korea, and the exact conditions differ per treaty. This is exactly the kind of thing to confirm with a licensed 세무사 rather than guessing — an error can mean back-taxes later.",
          ko: "면제 적용 여부는 본국과 한국 간 개별 조세조약에 따라 다르고 조건도 제각각이에요. 추측하지 말고 면허 세무사에게 확인하는 게 정확합니다 — 잘못하면 나중에 세금을 추징당할 수 있어요.",
        },
      },
    ],
  },
  {
    id: "c3",
    author: "Linh",
    flag: "🇻🇳",
    category: { en: "Life", ko: "생활" },
    title: { en: "Where to buy Southeast-Asian groceries in Seoul?", ko: "서울에서 동남아 식료품 어디서 사나요?" },
    excerpt: {
      en: "Looking for fish sauce, rice paper, fresh herbs. Any marts near Ansan?",
      ko: "피쉬소스, 라이스페이퍼, 허브 찾아요. 안산 근처 마트 있을까요?",
    },
    body: {
      en: "I've been craving home cooking and can't find good fish sauce, rice paper, or fresh herbs like Thai basil at regular Korean supermarkets. I live near Ansan — are there dedicated Southeast-Asian or international marts nearby, or online shops that deliver? Recommendations very welcome!",
      ko: "집밥이 그리운데 일반 한국 마트에서는 좋은 피쉬소스, 라이스페이퍼, 타이바질 같은 허브를 못 찾겠어요. 안산 근처에 사는데, 동남아·외국 식료품 전문 마트가 있거나 배송되는 온라인몰이 있을까요? 추천 부탁드려요!",
    },
    replies: 21,
    answers: [
      {
        author: "Aran",
        flag: "🇹🇭",
        body: {
          en: "Ansan's 다문화거리 (Multicultural Street) near Ansan Station is full of Southeast-Asian and Central-Asian grocery shops — you'll find everything there. Bring cash for the smaller stores.",
          ko: "안산역 근처 다문화거리에 동남아·중앙아 식료품점이 정말 많아요 — 거의 다 구할 수 있어요. 작은 가게는 현금을 챙겨 가세요.",
        },
      },
    ],
  },
  {
    id: "c4",
    author: "Daniel",
    flag: "🇺🇸",
    category: { en: "Visa", ko: "비자" },
    title: { en: "ARC appointment wait times right now?", ko: "요즘 외국인등록 예약 대기 얼마나?" },
    excerpt: {
      en: "Booked for 3 weeks out in Seoul. Is it faster in other districts?",
      ko: "서울은 3주 뒤로 잡혔어요. 다른 구는 더 빠른가요?",
    },
    body: {
      en: "I need to register for my Alien Registration Card (ARC) and the earliest immigration appointment I can find in Seoul is about 3 weeks out. My 90-day window is ticking. Is it usually faster to book at an immigration office in a different district or a satellite office? And does booking early online help?",
      ko: "외국인등록증(ARC)을 신청해야 하는데 서울에서 잡을 수 있는 가장 빠른 출입국 예약이 3주 뒤예요. 90일 기한이 다가오고 있어요. 다른 구나 출장소 출입국사무소로 예약하면 보통 더 빠른가요? 온라인으로 미리 예약하면 도움이 되나요?",
    },
    replies: 5,
    answers: [
      {
        author: "Priya",
        flag: "🇮🇳",
        body: {
          en: "Appointments are booked on HiKorea online, and wait times really do vary by office — satellite offices are sometimes weeks faster than the main Seoul one. Book as early as you can within your 90 days.",
          ko: "예약은 하이코리아 온라인에서 하고, 대기 시간은 사무소마다 정말 달라요 — 출장소가 서울 본청보다 몇 주 빠를 때도 있어요. 90일 안에서 최대한 일찍 예약하세요.",
        },
      },
    ],
  },
];

export function getCommunityPost(id: string): CommunityPost | undefined {
  return COMMUNITY_POSTS.find((p) => p.id === id);
}
