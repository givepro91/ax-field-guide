// 사이트 네비게이션 단일 출처 — SideNav 와 랜딩이 공유한다.
// count = 실제 발행된 글 수(하드코딩 금지). 빈 카테고리는 firstHref=null → 더미 링크 대신 비활성.

export interface GuideEntry {
  id: string;
  data: { title: string; category: string; order?: number; draft?: boolean };
}

export interface NavGroup {
  cat: string;
  catEn: string;
  articles: { title: string; href: string; draft: boolean }[];
  planned: string[];
  count: number;
  firstHref: string | null;
}

// 카테고리 정의 + 로드맵(예정) 항목. cat 은 frontmatter `category` 와 일치해야 함.
// 슬림 3축 — 글이 적은 단계라 빈 카테고리를 미리 깔지 않는다. 케이스·안티패턴 축은
// 해당 글이 실제로 생기면 그때 추가한다(카테고리는 글에서 자란다).
const GROUPS: { cat: string; catEn: string; planned: string[] }[] = [
  { cat: '개념·관점', catEn: 'Concept', planned: [] },
  { cat: '도구·기법', catEn: 'Craft', planned: [] },
  { cat: '패턴·플레이북', catEn: 'Patterns', planned: ['익명화 케이스·안티패턴 기록'] },
];

export function buildNav(entries: GuideEntry[]): NavGroup[] {
  return GROUPS.map((g) => {
    const articles = entries
      .filter((e) => e.data.category === g.cat)
      .sort((a, b) => (a.data.order ?? 100) - (b.data.order ?? 100))
      .map((e) => ({ title: e.data.title, href: `/guide/${e.id}`, draft: e.data.draft ?? false }));
    return {
      cat: g.cat,
      catEn: g.catEn,
      articles,
      planned: g.planned,
      count: articles.length,
      firstHref: articles[0]?.href ?? null,
    };
  });
}

export interface TrendItem {
  date: string;
  title: string;
  url: string;
  source: string;
  sourceCategory?: string;
  category?: string;
  summary?: string;
  tags?: string[];
  keyPoints?: string[];
  publishedAt?: string;
}
