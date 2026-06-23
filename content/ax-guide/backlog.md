# Backlog — 글 현황과 앞으로

쓸 글과 쓴 글을 같이 둔다. 순서는 고정이 아니라, 실제로 써보고 정리할 거리가 생긴 것부터 쓴다. 각 항목에는 그 글에서 답하려는 질문 한 줄을 같이 적어둔다 — 질문이 분명하지 않으면 아직 쓸 때가 아니다.

상태 표기: `발행됨` 공개 중 · `초안(채우는 중)` 구조·프레임만 있고 실사용 경험 대기(dev 에서만 보임, prod 빌드 제외) · `재료 모으는 중` 경험이 더 필요함 · `초안 준비` 바로 쓸 수 있음.

## 발행된 글 (10)

**개념·관점** — [AX란 무엇인가](/guide/what-is-ax) · [AX를 맡으면 실제로 무엇을 하나](/guide/what-ax-work-looks-like)(5계층 행위 허브) · [어떤 업무 루프를 먼저 고를까](/guide/choosing-loops) · [AI 출력을 어디까지 믿을 것인가](/guide/trusting-output) · [RAG와 Agent Workflow의 차이](/guide/rag-vs-agent)

**도구·기법** — [에이전트를 모는 법](/guide/driving-agents)(context·harness·loop·Ralph 사다리)

**패턴·플레이북** — [AI에 승인 게이트가 필요한 이유](/guide/approval-gates) · [Human-in-the-loop 패턴](/guide/human-in-the-loop) · [AI 자동화의 audit trail 설계](/guide/audit-trail) · [운영 자동화는 언제 폐기하나](/guide/retiring-automation)

## 1. 정의·관점

- **AX Engineer / AX Lead는 무엇을 해야 하는가** — `발행됨(흡수)`
  [AX를 맡으면 실제로 무엇을 하나](/guide/what-ax-work-looks-like)가 다섯 자리 + "안 하는 일"로 이 질문을 이미 다룬다. 역할 경계를 더 깊게 팔 거리가 생기면 별도 글로 분화.
- **어떤 업무 루프를 먼저 AX 대상으로 고를 것인가** — `발행됨` → [choosing-loops](/guide/choosing-loops)
- **AI 출력의 신뢰도를 어떻게 따질 것인가** — `발행됨` → [trusting-output](/guide/trusting-output)

## 2. 도구 필드 리뷰

AX 관점 = 역할·한계·언제 쓰나. 성능 비교가 아니라 어떤 일에 무엇을 붙였더니 어땠는지. **구조·프레임은 잡았고, 실사용 경험을 채우는 중**(직접 써본 뒤에만 발행 — prod 제외 상태).

- **Claude Code를 AX 관점에서 쓰는 법** — `초안(채우는 중)` → [claude-code-ax](/guide/claude-code-ax)
- **Codex를 AX 관점에서 쓰는 법** — `초안(채우는 중)` → [codex-ax](/guide/codex-ax)
- **Claude Code vs Codex** — `초안(채우는 중)` → [cc-vs-codex](/guide/cc-vs-codex). 위 두 글이 채워진 뒤 비교.
- **Cursor / Claude Code / Codex의 역할 분리** — `초안(채우는 중)` → [tool-roles](/guide/tool-roles)
- **MCP는 AX에서 어떤 의미가 있는가** — `초안(채우는 중)` → [mcp-in-ax](/guide/mcp-in-ax). 빠르게 바뀌는 세부는 쓸 때 1차 소스 재확인.

## 3. 패턴·플레이북

- **AI agent에 승인 구조가 필요한 이유** — `발행됨` → [approval-gates](/guide/approval-gates)
- **Human-in-the-loop 패턴** — `발행됨` → [human-in-the-loop](/guide/human-in-the-loop)
- **AI 자동화의 audit trail 설계** — `발행됨` → [audit-trail](/guide/audit-trail)
- **운영 자동화는 언제 폐기해야 하는가** — `발행됨` → [retiring-automation](/guide/retiring-automation) (안티패턴 축의 첫 글)

## 4. 개념 정리

- **RAG와 Agent Workflow의 차이** — `발행됨` → [rag-vs-agent](/guide/rag-vs-agent)
- **Loop Engineering이란 무엇인가** — `발행됨` → [driving-agents](/guide/driving-agents)에 사다리의 한 칸으로. 정의(Addy Osmani, 2026-06)·출처 확인 완료.
- **"랄프 / RALF" 관련 개념** — `발행됨` → [driving-agents](/guide/driving-agents). 정확한 명칭은 **Ralph**(RALF 아님), 출처 Geoffrey Huntley(2025-07).

## 5. 앞으로 — 케이스·안티패턴 (아직 글 없음)

가장 신뢰를 주는 축. 글이 실제로 생기면 새 카테고리로 분리한다.

- **만들었다가 접은 자동화 기록** — 무엇을 보고 껐나, 너무 늦었거나 일렀던 판단. ([retiring-automation](/guide/retiring-automation)의 익명화 사례 보강.)
- **익명화 적용 사례** — 운영 자동화·데이터 신뢰성·승인 게이트를 실제 적용하고 내린 판단. (공개 위험 게이트 통과 전제.)

## 글 고르는 기준 메모

- 결론이 안 났어도 질문이 분명하면 쓴다. 다만 "확인 필요" 항목은 사실 확인 전에 발행하지 않는다.
- 도구 리뷰는 직접 써본 뒤에만 쓴다. 안 써보고 비교하는 글은 이 프로젝트가 피하려는 바로 그 글이다. → 그래서 도구 5편은 구조만 두고 `draft`로 prod 에서 뺐다.
- 한 편이라도 회사 내부가 특정되면 익명화하거나 보류한다. (기준: [strategy/ax-field-guide.md](../../strategy/ax-field-guide.md)의 "공개 위험 기준".)
