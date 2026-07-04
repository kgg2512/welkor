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
    replies: 12,
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
    replies: 8,
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
    replies: 21,
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
    replies: 5,
  },
];
