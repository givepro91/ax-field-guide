// 동향 가공 — 수집된 피드를 "풍경"으로 집계한다(LLM 비용 0, 순수 클라이언트 가공).
// 원자료(content/trends/index.json)는 그대로 두고, 보여줄 때만 주제·그룹·릴리스로 묶는다.
import type { TrendItem } from './nav';

// 태그(수집기 어휘) → 사람이 읽는 주제 라벨. 없는 건 원문 그대로.
const TOPIC_LABEL: Record<string, string> = {
  model: '모델', agent: '에이전트', 에이전트: '에이전트', mcp: 'MCP', eval: '평가', 평가: '평가',
  rag: 'RAG', llm: 'LLM', claude: 'Claude', openai: 'OpenAI', gemini: 'Gemini',
  tool: '도구', 도구: '도구', workflow: '워크플로우', prompt: '프롬프트', release: '릴리스', 릴리스: '릴리스', 모델: '모델',
};
// 주제 신호에서 빼는 메타 태그(내용 주제가 아니라 형식) — 릴리스는 따로 접어서 보여준다.
const META_TAGS = new Set(['release', '릴리스']);

export interface TrendTopic { tag: string; label: string; count: number }
export interface TrendGroup { category: string; items: TrendItem[]; releases: TrendItem[]; count: number }
export interface TrendsDigest {
  total: number;
  from: string;
  to: string;
  sourceCount: number;
  topics: TrendTopic[]; // 주제 신호(릴리스 제외), 빈도 내림차순
  maxTopic: number; // 막대 스케일용
  groups: TrendGroup[]; // 카테고리별, 활동 많은 순
  releaseTotal: number;
}

const label = (t: string) => TOPIC_LABEL[t] || TOPIC_LABEL[t.toLowerCase()] || t;

// 버전 태그·초단문 제목 = 저신호 릴리스. 본문 글과 섞이면 풍경이 안 보인다 → 접는다.
export function isRelease(it: TrendItem): boolean {
  const t = (it.title || '').trim();
  if (/^v?\d+[\d.]*$/i.test(t)) return true; // "v0.111.0", "0.110.0"
  if (/\bv?\d+\.\d+(\.\d+)?\b/.test(t) && t.length < 28) return true; // "Foo 1.2.3 released"
  if (t.length < 8) return true;
  return false;
}

const catOf = (it: TrendItem) => it.category || it.sourceCategory || '기타';

export function digestTrends(items: TrendItem[]): TrendsDigest {
  const list = items || [];
  // 주제 집계 — 메타 태그 제외
  const counts = new Map<string, number>();
  for (const it of list) {
    for (const raw of it.tags || []) {
      const t = raw.toLowerCase();
      if (META_TAGS.has(t)) continue;
      counts.set(t, (counts.get(t) || 0) + 1);
    }
  }
  const topics: TrendTopic[] = [...counts.entries()]
    .map(([tag, count]) => ({ tag, label: label(tag), count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, 10);

  // 카테고리 그룹 — 각 그룹 안에서 본문 글 / 릴리스 분리
  const byCat = new Map<string, TrendItem[]>();
  for (const it of list) {
    const c = catOf(it);
    (byCat.get(c) || byCat.set(c, []).get(c)!).push(it);
  }
  let releaseTotal = 0;
  const groups: TrendGroup[] = [...byCat.entries()]
    .map(([category, all]) => {
      const releases = all.filter(isRelease);
      const its = all.filter((x) => !isRelease(x));
      releaseTotal += releases.length;
      return { category, items: its, releases, count: all.length };
    })
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));

  const dates = list.map((i) => i.date).filter(Boolean).sort();
  const sources = new Set(list.map((i) => i.source).filter(Boolean));

  return {
    total: list.length,
    from: dates[0] || '',
    to: dates[dates.length - 1] || '',
    sourceCount: sources.size,
    topics,
    maxTopic: topics[0]?.count || 1,
    groups,
    releaseTotal,
  };
}
