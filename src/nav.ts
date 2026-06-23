// 사이트 네비게이션 단일 출처 — SideNav 와 랜딩이 공유한다.
// count = 실제 발행된 글 수(하드코딩 금지). 빈 카테고리는 firstHref=null → 더미 링크 대신 비활성.

export interface GuideEntry {
  id: string;
  data: { title: string; category: string; order?: number };
}

export interface NavGroup {
  cat: string;
  catEn: string;
  articles: { title: string; href: string }[];
  planned: string[];
  count: number;
  firstHref: string | null;
}

// 카테고리 정의 + 로드맵(예정) 항목. cat 은 frontmatter `category` 와 일치해야 함.
const GROUPS: { cat: string; catEn: string; planned: string[] }[] = [
  { cat: '개념', catEn: 'Concept', planned: ['어떤 루프를 먼저 고를까'] },
  { cat: 'Playbook', catEn: 'How-to', planned: ['승인 게이트가 필요한 이유', 'Human-in-the-loop 패턴'] },
  { cat: 'Tools', catEn: 'Reference', planned: ['Claude Code · AX 관점', 'Claude Code vs Codex'] },
  { cat: 'Experiments', catEn: '', planned: [] },
];

export function buildNav(entries: GuideEntry[]): NavGroup[] {
  return GROUPS.map((g) => {
    const articles = entries
      .filter((e) => e.data.category === g.cat)
      .sort((a, b) => (a.data.order ?? 100) - (b.data.order ?? 100))
      .map((e) => ({ title: e.data.title, href: `/guide/${e.id}` }));
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
