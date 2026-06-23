---
title: MCP는 AX에서 어떤 의미가 있는가
category: 도구·기법
categoryEn: Craft
stage: 초안 — 실사용 채우는 중
updated: "2026-06-23"
order: 6
draft: true
lead: 도구와 데이터를 모델에 연결하는 표준이라는 점이 AX 설계에서 갖는 의미. 강점만큼 운영 부담도 같이 본다.
related:
  - label: 에이전트를 모는 법
    href: "/guide/driving-agents"
  - label: RAG와 Agent Workflow의 차이
    href: "/guide/rag-vs-agent"
slides:
  - kick: AX Field Guide · 도구·기법
    title: MCP는 AX에서 무엇인가
    body: 모델과 도구·데이터를 잇는 표준의 의미
    cover: true
  - kick: 한 줄
    title: 연결의 표준
    body: 모델이 외부 도구·데이터에 닿는 방식을 표준화한다. 매번 따로 붙이던 걸 한 규약으로.
  - kick: AX 의미
    title: 워크플로우 연결이 쉬워진다
    body: 데이터 접근·도구 연결이 AX 설계의 큰 부분인데, 그 연결 비용을 낮춘다.
  - kick: 채우는 중
    title: 운영 부담은 직접
    body: 표준의 값과 운영 비용은 붙여보고 채운다.
---

이 글은 **초안**이다. MCP 개념의 구조는 잡아두되, 빠르게 바뀌는 세부와 실사용 판단은 [1차 소스로 확인](/guide/what-is-ax)하고 직접 붙여본 뒤 채운다. 구체적인 버전·기능 디테일은 단정하지 않는다.

큰 그림만 먼저. MCP(Model Context Protocol)는 모델이 외부 도구와 데이터에 닿는 방식을 표준화하려는 규약이다. 그동안 도구·데이터를 모델에 붙이는 일은 매번 따로 만들어야 했는데, 그걸 공통 규약으로 정리한다는 게 핵심이다.

<figure class="fig">
  <div class="dia">
    <svg viewBox="0 0 480 180" role="img" aria-label="모델이 MCP 규약을 거쳐 여러 도구와 데이터에 연결되는 구조">
      <defs>
        <marker id="ah-mcp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" style="fill:#2563eb"/>
        </marker>
      </defs>
      <rect class="node" x="20" y="68" width="100" height="44" rx="9"/>
      <text class="ntext" x="70" y="94" text-anchor="middle">모델</text>
      <line class="edge" marker-end="url(#ah-mcp)" x1="120" y1="90" x2="168" y2="90"/>
      <line class="edge" marker-end="url(#ah-mcp)" x1="168" y1="90" x2="120" y2="90"/>
      <rect class="node-soft" x="170" y="62" width="110" height="56" rx="9"/>
      <text class="ntext" x="225" y="86" text-anchor="middle">MCP</text>
      <text class="nsub" x="225" y="102" text-anchor="middle">연결 규약</text>
      <line class="edge edge-d" marker-end="url(#ah-mcp)" x1="280" y1="74" x2="360" y2="42"/>
      <line class="edge edge-d" marker-end="url(#ah-mcp)" x1="280" y1="90" x2="360" y2="90"/>
      <line class="edge edge-d" marker-end="url(#ah-mcp)" x1="280" y1="106" x2="360" y2="138"/>
      <rect class="node" x="362" y="24" width="100" height="38" rx="8"/>
      <text class="nsub" x="412" y="47" text-anchor="middle">도구 A</text>
      <rect class="node" x="362" y="72" width="100" height="38" rx="8"/>
      <text class="nsub" x="412" y="95" text-anchor="middle">데이터</text>
      <rect class="node" x="362" y="120" width="100" height="38" rx="8"/>
      <text class="nsub" x="412" y="143" text-anchor="middle">도구 B</text>
    </svg>
  </div>
  <figcaption>그림 1 · 모델이 한 규약으로 여러 도구·데이터에 닿는다 (구조)</figcaption>
</figure>

AX 관점에서 이게 왜 의미 있나. [what-is-ax](/guide/what-is-ax)에서 데이터 접근과 워크플로우 연결을 핵심 계층으로 뒀는데, AX 설계의 상당 부분이 바로 "모델을 실제 업무 데이터와 도구에 연결하는 일"이다. MCP는 그 연결의 비용을 낮춘다는 점에서 [에이전트 워크플로우](/guide/rag-vs-agent)를 짜는 데 직접 영향을 준다.

<blockquote class="draft-note"><b>채울 자리.</b> MCP를 실제로 무엇에 연결해 썼는지, 표준이 준 값과 그 대가로 생긴 운영 부담(인증·권한·안정성·디버깅)이 들어간다. 빠르게 바뀌는 세부는 쓸 때 1차 소스로 다시 확인한다.</blockquote>

## 채울 항목 (자기 메모)

- 무엇을 연결했나 (도구·데이터)
- 직접 붙이는 것 대비 무엇이 쉬워졌나
- 운영 부담 — 인증·권한·안정성·디버깅
- 안 맞았던 경우 / 표준이 과했던 경우

<section class="log" aria-label="변경 로그">
  <div class="lg-h">변경 로그</div>
  <ul>
    <li><time>2026-06-23</time><span>구조·프레임 초안. 실사용·최신 사실 확인 후 채움 (성숙도: 초안)</span></li>
  </ul>
</section>
