# content/trends — 매일 AX 동향

매일 자동 수집된 AX 기술 동향이 쌓이는 곳. 사이트의 "동향" 피드(`/trends`)가 여기를 읽는다.

## 파일

- `index.json` — 최신 N건 집계(피드가 읽는 파일). collector 가 갱신.
- `YYYY-MM-DD.json` — 그날 수집분 보관.

## 항목 형식

```json
{ "date", "title", "url", "source", "category", "summary", "tags": [], "keyPoints": [], "publishedAt" }
```

## 동작 (소스 → 크롤 → 중복제거 → 요약 → 저장)

- 소스 목록: `scripts/trends-sources.json` (RSS/Atom)
- 수집기: `scripts/collect-trends.mjs` (의존성 0)
- 스케줄: `.github/workflows/trends.yml` (매일 09:00 KST)

**기본은 무료다.** LLM 을 호출하지 않고 **피드 자체 발췌**를 요약으로 쓰며, 카테고리는 소스에서, 태그는 키워드 매칭으로 만든다 → **API 키·비용 불필요**. GitHub Actions 무료 사용량으로 충분(하루 1회).

## 로컬 실행

```bash
node scripts/collect-trends.mjs --dry   # fetch/파싱만 점검(소스 동작 확인)
node scripts/collect-trends.mjs         # 무료 수집·저장
```

## 옵션: LLM 한국어 요약 (유료)

피드 발췌 대신 Claude 가 한국어로 다듬은 요약을 원하면:

```bash
TRENDS_SUMMARIZE=1 ANTHROPIC_API_KEY=sk-ant-... node scripts/collect-trends.mjs
```

비용·모델은 시간민감 — 켤 때 현재 단가/모델 ID 확인(`TRENDS_MODEL` 로 교체). 워크플로에서 켜려면 Secrets 에 `ANTHROPIC_API_KEY` 추가 후 `trends.yml` 의 run 을 `TRENDS_SUMMARIZE=1 …` + env 로 바꾼다.

## 활성화(자동화) 전제

1. 레포를 GitHub 에 push (무료 모드는 secret 불필요)
2. (배포) Vercel 연결 — push 마다 자동 재배포

## 주의

- **자동 발행**이라 외부 공개 기사만 다룬다. 무료 모드는 피드 발췌(영문 등 원문 언어)를 그대로 쓴다. 회사 내부 정보 유입 경로 없음(공개 RSS/Atom 소스만).
- 소스 URL 변동 가능 — 깨지면 `--dry` 로 확인 후 `trends-sources.json` 에서 교체/비활성화.
