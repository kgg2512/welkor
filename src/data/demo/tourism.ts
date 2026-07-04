import type { LocalizedText } from "../types";

/**
 * Tourism content for visitors (5-1).
 *
 * WelKor = information + connection only. We list REAL places with the official
 * Korea Tourism Organization (VisitKorea) as the verify source, and link out to
 * established booking platforms (Trip.com / Airbnb / Klook) — we never sell
 * travel products ourselves. No fabricated landmark imagery (accuracy first).
 *
 * The "creator picks" angle reuses WelKor's YouTube-monitoring pattern: each
 * region links to a live creator search so the content stays fresh without us
 * faking crawled data.
 */

export const VISIT_KOREA = "https://english.visitkorea.or.kr/";
export const K_ETA = "https://www.k-eta.go.kr/";

export interface BookingChannel {
  id: string;
  name: string;
  kind: "stay" | "activity" | "official";
  url: string;
  blurb: LocalizedText;
}

export type SpotCategory = "landmark" | "nature" | "culture" | "food" | "shopping";

export interface TouristSpot {
  id: string;
  name: LocalizedText;
  category: SpotCategory;
  blurb: LocalizedText;
}

export interface TravelRegion {
  id: string;
  emoji: string;
  name: LocalizedText;
  tagline: LocalizedText;
  /** Live YouTube creator search — keeps "creator picks" fresh, no fake data. */
  creatorQuery: string;
  spots: TouristSpot[];
}

export const BOOKING_CHANNELS: BookingChannel[] = [
  {
    id: "tripcom",
    name: "Trip.com",
    kind: "stay",
    url: "https://www.trip.com/hotels/korea-hotels/",
    blurb: { en: "Hotels & flights, strong in Asia.", ko: "호텔·항공, 아시아 강점." },
  },
  {
    id: "airbnb",
    name: "Airbnb",
    kind: "stay",
    url: "https://www.airbnb.com/s/South-Korea/homes",
    blurb: { en: "Homes, hanok stays, longer trips.", ko: "주택·한옥스테이·장기 체류." },
  },
  {
    id: "agoda",
    name: "Agoda",
    kind: "stay",
    url: "https://www.agoda.com/country/south-korea.html",
    blurb: { en: "Budget to premium hotels.", ko: "가성비~프리미엄 호텔." },
  },
  {
    id: "klook",
    name: "Klook",
    kind: "activity",
    url: "https://www.klook.com/en-US/city/19-seoul-things-to-do/",
    blurb: { en: "Tours, passes, transit cards.", ko: "투어·패스·교통카드." },
  },
  {
    id: "visitkorea",
    name: "VisitKorea",
    kind: "official",
    url: VISIT_KOREA,
    blurb: { en: "Official Korea Tourism Organization.", ko: "한국관광공사 공식." },
  },
];

export const TRAVEL_REGIONS: TravelRegion[] = [
  {
    id: "seoul",
    emoji: "🏙️",
    name: { en: "Seoul", ko: "서울" },
    tagline: { en: "Palaces, neon nights and street food.", ko: "고궁·야경·길거리 음식의 수도." },
    creatorQuery: "Seoul Korea travel guide must visit",
    spots: [
      { id: "seoul-gyeongbok", category: "landmark", name: { en: "Gyeongbokgung Palace", ko: "경복궁" }, blurb: { en: "The grand Joseon-era palace; catch the changing-of-the-guard.", ko: "조선의 정궁. 수문장 교대식이 볼거리." } },
      { id: "seoul-bukchon", category: "culture", name: { en: "Bukchon Hanok Village", ko: "북촌한옥마을" }, blurb: { en: "Lanes of traditional hanok houses between two palaces.", ko: "두 고궁 사이 전통 한옥 골목." } },
      { id: "seoul-myeongdong", category: "shopping", name: { en: "Myeongdong", ko: "명동" }, blurb: { en: "Cosmetics, fashion and a famous street-food alley.", ko: "화장품·패션·길거리 음식 거리." } },
      { id: "seoul-namsan", category: "landmark", name: { en: "N Seoul Tower (Namsan)", ko: "N서울타워(남산)" }, blurb: { en: "City-wide night views from Namsan mountain.", ko: "남산에서 보는 서울 전경·야경." } },
      { id: "seoul-hongdae", category: "culture", name: { en: "Hongdae", ko: "홍대" }, blurb: { en: "Indie music, street performance and youth nightlife.", ko: "인디 음악·버스킹·젊음의 거리." } },
    ],
  },
  {
    id: "busan",
    emoji: "🌊",
    name: { en: "Busan", ko: "부산" },
    tagline: { en: "Beaches, seafood and hillside art villages.", ko: "해변·해산물·산복도로 예술마을." },
    creatorQuery: "Busan Korea travel guide things to do",
    spots: [
      { id: "busan-haeundae", category: "nature", name: { en: "Haeundae Beach", ko: "해운대 해수욕장" }, blurb: { en: "Korea's most famous city beach.", ko: "한국 대표 도심 해변." } },
      { id: "busan-gamcheon", category: "culture", name: { en: "Gamcheon Culture Village", ko: "감천문화마을" }, blurb: { en: "Pastel hillside houses, murals and cafés.", ko: "파스텔 산동네·벽화·카페." } },
      { id: "busan-jagalchi", category: "food", name: { en: "Jagalchi Fish Market", ko: "자갈치시장" }, blurb: { en: "Korea's largest seafood market.", ko: "한국 최대 수산시장." } },
    ],
  },
  {
    id: "jeju",
    emoji: "🍊",
    name: { en: "Jeju Island", ko: "제주도" },
    tagline: { en: "Volcanic peaks, coastlines and tangerines.", ko: "화산·해안·감귤의 섬." },
    creatorQuery: "Jeju Island Korea travel guide",
    spots: [
      { id: "jeju-seongsan", category: "nature", name: { en: "Seongsan Ilchulbong", ko: "성산일출봉" }, blurb: { en: "A UNESCO sunrise crater peak.", ko: "유네스코 등재 일출봉." } },
      { id: "jeju-hallasan", category: "nature", name: { en: "Hallasan National Park", ko: "한라산 국립공원" }, blurb: { en: "Korea's highest mountain, day-hike trails.", ko: "한국 최고봉·당일 등산로." } },
      { id: "jeju-hyeopjae", category: "nature", name: { en: "Hyeopjae Beach", ko: "협재해변" }, blurb: { en: "Turquoise water with an island view.", ko: "에메랄드빛 바다·섬 전망." } },
    ],
  },
  {
    id: "gyeongju",
    emoji: "🛕",
    name: { en: "Gyeongju", ko: "경주" },
    tagline: { en: "The open-air museum of the Silla kingdom.", ko: "신라 천년의 야외 박물관." },
    creatorQuery: "Gyeongju Korea travel guide history",
    spots: [
      { id: "gyeongju-bulguksa", category: "landmark", name: { en: "Bulguksa Temple", ko: "불국사" }, blurb: { en: "UNESCO Buddhist temple masterpiece.", ko: "유네스코 등재 불교 사찰." } },
      { id: "gyeongju-daereungwon", category: "culture", name: { en: "Daereungwon Tombs", ko: "대릉원" }, blurb: { en: "Grassy royal burial mounds in the city.", ko: "도심 속 신라 왕릉 고분군." } },
    ],
  },
  {
    id: "gangwon",
    emoji: "⛰️",
    name: { en: "Gangwon (Seoraksan · Gangneung)", ko: "강원 (설악산·강릉)" },
    tagline: { en: "Mountains, the east-sea coast and coffee.", ko: "산·동해 바다·커피." },
    creatorQuery: "Gangwon Korea Seoraksan Gangneung travel",
    spots: [
      { id: "gangwon-seoraksan", category: "nature", name: { en: "Seoraksan National Park", ko: "설악산 국립공원" }, blurb: { en: "Dramatic peaks, best in autumn.", ko: "기암 절경, 가을 단풍 명소." } },
      { id: "gangwon-gangneung", category: "food", name: { en: "Gangneung coast & cafés", ko: "강릉 해변·카페거리" }, blurb: { en: "East-sea beaches and Korea's coffee town.", ko: "동해 해변과 커피의 도시." } },
    ],
  },
  {
    id: "jeonju",
    emoji: "🍲",
    name: { en: "Jeonju", ko: "전주" },
    tagline: { en: "The home of bibimbap and hanok streets.", ko: "비빔밥과 한옥의 고장." },
    creatorQuery: "Jeonju Korea hanok village food travel",
    spots: [
      { id: "jeonju-hanok", category: "culture", name: { en: "Jeonju Hanok Village", ko: "전주한옥마을" }, blurb: { en: "800+ hanok houses, food and crafts.", ko: "800채 한옥·먹거리·공예." } },
      { id: "jeonju-food", category: "food", name: { en: "Bibimbap & street food", ko: "비빔밥·길거리 음식" }, blurb: { en: "A UNESCO City of Gastronomy.", ko: "유네스코 음식창의도시." } },
    ],
  },
];
