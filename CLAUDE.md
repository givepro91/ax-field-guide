# AX Field Guide

백엔드 출신 프로덕트 리드가 AX(AI Transformation)를 현장에서 배우며 정리하는 **공개형 필드북**. 콘텐츠(글)와 그것을 보여주는 **위키 + 프레젠테이션 웹**으로 구성된다. 최종적으로 Vercel에 정적 배포하며, 지금은 로컬에서 빠르게 개발한다(아래 "개발·배포 워크플로우").

## 무엇이 어디 있나

```
src/                            # Astro 사이트 (pages·layouts·components·styles·content.config.ts)
content/ax-guide/*.md           # 글 콘텐츠 (frontmatter: title·category·stage·updated·lead·slides)
content/ax-guide/README.md      # 홈 문서(소개 산문) · backlog.md = 앞으로 쓸 글 목록 (둘 다 컬렉션 제외)
content/trends/                 # 매일 자동 수집되는 AX 동향 (index.json + YYYY-MM-DD)
scripts/collect-trends.mjs      # 동향 수집기 · .github/workflows/trends.yml = 매일 cron
strategy/ax-field-guide.md      # 프로젝트 기준 문서 (목적·포지셔닝·다룰/안 다룰·공개 위험)
strategy/web-design-notes.md    # 웹 디자인 SoT (Clean Wiki·블루·Pretendard / 위키 + 프레젠테이션)
prototype/                      # 초기 정적 HTML 프로토타입 — Astro 사이트로 대체됨, 레퍼런스로만 보존
```

새 글은 `content/ax-guide/`에 추가하고 `backlog.md`에서 항목을 옮긴다. 방향이 헷갈리면 항상 `strategy/ax-field-guide.md`를 먼저 본다 (= 이 프로젝트의 정본).

## 핵심 정의 (모든 글의 기준선)

> AX는 AI를 도입하는 일이 아니라, 사람이 반복적으로 판단하던 업무 구조를 AI·데이터·자동화·승인 흐름으로 다시 설계하는 일이다.

도구 소개·모델 성능·자동화 자체보다 — 문제 구조화, 워크플로우 연결, 승인/롤백/감사/품질 게이트, 실제로 써보고 남긴 판단 기준을 우선한다.

## 문체 기준 (반드시 지킬 것)

- **한국어.** 코드·경로·식별자·도구명·에러 메시지는 원문 그대로.
- 차분하고 회고적이되 과하게 감성적이지 않게. 실무 기록체.
- AI가 쓴 듯한 과한 구조화 금지. 프로즈로 충분하면 불릿으로 쪼개지 않는다.
- 반복 금지 템플릿 문구: "요즘 느낀 점", "결국 핵심은", "더 중요한 건", "~뿐만 아니라", "결론적으로/요약하자면".
- 기술 나열보다 문제·역할·선택·배운 점 중심.
- 과장된 자기 홍보 금지. 확실한 답보다 판단의 근거를 적는다. 결론이 안 난 글은 그렇게 남겨도 된다.

## 콘텐츠 시각 요소 (모든 콘텐츠에 적용)

글만 늘어놓지 않는다. 모든 문서·동향에 **이해를 돕는 시각 요소를 최소 1개** 포함한다 — 도식(개념·흐름·구조), 비교 표/카드, 계층·스택, 다이어그램, 의사결정 트리 등. 장식이 아니라 내용을 압축·구조화하는 그림이어야 한다(의미 없는 이미지·스크린샷 남발 금지). 프레젠테이션 모드를 고려해, 핵심 그림은 슬라이드로도 떼어 쓸 수 있게 만든다.

## 발표 슬라이드(frontmatter `slides`) 작성 규칙

발표는 `src/components/Deck.astro`의 **레이아웃 시스템**으로 쓴다. 손수 HTML/스타일을 만들지 않는다.

- 레이아웃: `cover`(여는/닫는 면) · `thesis`(핵심 주장 한 줄, `body`에) · `compare`(2단 비교, AX 입장 칼럼에 `accent: true`) · `flow`(번호 단계 `steps`) · `stack`(계층 `layers`). 맨 불릿(`bullets`)은 정 안 맞을 때만.
- 모든 슬라이드는 **본문에 근거한 살아있는 판단 하나**를 담는다. 본문에 없는 제너릭 열거("중요한 N가지" 류) 금지 — 그건 AI가 쓴 듯한 과한 구조화다.
- `step`/`layer`의 `note`와 슬라이드 `note`는 **한 구절**로 짧게(발표자가 말로 채운다). 2~3문장 금지.
- 한국어 줄바꿈은 **전역 CSS가 처리**한다(`word-break:keep-all` + 헤드라인 `text-wrap:balance` + 본문 `pretty`). `<br>`·슬라이드별 너비 하드코딩 금지.
- 발표는 **단일 다크 테마**(전역). 새 글도 자동 적용되니 테마/색을 글마다 손대지 않는다.

## 공개 위험 게이트 (발행 전 필수)

이 프로젝트는 공개될 수 있다. 다음은 어떤 글에도 넣지 않는다: 회사 내부 프로젝트명, 고객·파트너명, 비공개 수치, 내부 인프라 구조, private repo 이름, 재현 가능한 수준의 실제 장애 원인·운영 절차, 회사 내부 Slack/Notion/GitHub 내용.

사례는 모두 익명화·일반화한다 ("운영 자동화 사례", "데이터 신뢰성 사례" 등). **발행 전 점검 질문: 이 문장만 보고 어느 회사·어느 시스템인지 특정할 수 있는가? → 그렇다면 고쳐 쓴다.**

## 사실 확인

CLI 플래그·API·SDK·버전·모델명 등 빠르게 변하는 외부 사실, 그리고 정의가 불분명한 용어(예: backlog의 "랄프/RALF", "Loop Engineering")는 **기억으로 단정하지 말고** 1차 소스로 확인한 뒤 쓴다. 확인 전이면 글에 "용어 확인 필요"로 표시하고 발행하지 않는다.

## 기존 채널과의 경계

LinkedIn(짧은 관찰)·Brunch(서사형 회고)·GitHub Pages(포트폴리오)와 역할이 겹치지 않게 한다. 이 프로젝트는 **판단 기준을 쌓아가는 작업 노트** — 완성된 결과물 정리도, 개인 서사도 아니다.

## 개발·배포 워크플로우

- **개발 = 로컬 Astro.** `npm run dev` (포트 8351 — Astro 기본 4321 은 다른 도구와 충돌 회피). `npm run build` → 정적 `dist/`, `npm run preview` 로 산출물 확인. Claude Artifact 는 반복 개발에 안 씀(느림).
- **배포 = Vercel(정적).** Astro 정적 출력이라 DB 없이 배포된다. Vercel 이 Astro 를 자동 감지. (git init → GitHub → Vercel 연결은 사용자 승인 후.)
- **스케일.** Astro 가 `content/**` 를 읽어 페이지·네비·TOC·슬라이드·동향을 생성한다. 새 글 = `content/ax-guide/` 에 frontmatter 갖춘 `.md` 추가 → 사이트에 자동 반영. 손수 HTML 유지하지 않는다.

## 동향(Trends) — 매일 자동 뉴스

매일 AX 기술 동향을 수집해 `/trends` 피드로 보여준다. 패턴: **소스(RSS/Atom) → 크롤 → URL 중복 제거 → 요약 → `content/trends/{index,YYYY-MM-DD}.json` 저장 → 피드 렌더.** GitHub Action cron 이 매일 1회 실행(`scripts/collect-trends.mjs`) → push → Vercel 재배포. **기본은 무료**: LLM 미사용, 피드 발췌를 요약으로 써서 API 키·비용 불필요. 한국어 LLM 요약은 옵션(`TRENDS_SUMMARIZE=1` + `ANTHROPIC_API_KEY`, 유료·시간민감). **자동 발행이라 외부 공개 기사만**(공개 위험 게이트 — 회사 내부 정보 유입 금지).
