---
title: MCP는 AX에서 어떤 의미가 있는가
category: 도구·기법
categoryEn: Craft
stage: 탐색 중
updated: "2026-06-23"
order: 5
lead: MCP는 모델과 도구·데이터를 잇는 표준이다. 매력은 연결을 쉽게 만든다는 데 있는데, 운영에서 진짜 묻게 되는 건 그 연결이 끊겼을 때다.
related:
  - label: 에이전트를 모는 법
    href: "/guide/driving-agents"
  - label: RAG와 Agent Workflow의 차이
    href: "/guide/rag-vs-agent"
  - label: AX란 무엇인가
    href: "/guide/what-is-ax"
slides:
  - kick: AX Field Guide · 도구·기법
    title: MCP는 AX에서 무엇인가
    body: 연결을 표준화한다는 것의 값과 대가
    cover: true
  - kick: 한 줄
    title: 연결의 표준
    body: 모델이 외부 도구·데이터에 닿는 방식을 한 규약으로. 매번 따로 붙이던 걸 표준으로.
  - kick: AX 의미
    title: 워크플로우 연결 비용을 낮춘다
    body: 데이터 접근·도구 연결이 AX 설계의 큰 부분인데, MCP는 그 비용을 줄인다.
  - kick: 운영의 현실
    title: 끊기면 어떻게 되나
    body: 연결이 쉬워질수록 그 연결에 의존하게 된다. 인증이 비고, 서버가 끊기면?
  - kick: 폴백
    title: 끊겨도 굴러가게
    body: 연결이 끊겼을 때 물러설 길(CLI·대안 경로)이 있느냐가 운영을 가른다.
  - kick: 솔직히
    title: 더 써봐야 안다
    body: MCP 자체를 깊게 운영한 경험은 아직 얕다. 지금은 연결의 신뢰성이라는 문제의식까지.
    cover: true
---

이 글은 솔직히 먼저 적어 둔다. 나는 MCP(Model Context Protocol)를 깊게 운영해 본 경험이 아직 얕다. 그래서 "MCP를 이렇게 쓰면 좋다"는 사용기가 아니라, **MCP를 AX 설계에 둘 때 내가 묻게 되는 것**에 대한 글에 가깝다. 결론이 덜 난 채로 남겨 두는 글이다.

<blockquote class="thesis">MCP의 매력은 모델과 도구·데이터의 연결을 표준으로 쉽게 만든다는 데 있다. 그런데 운영에서 진짜 묻게 되는 건, 그 연결이 끊겼을 때 일이 굴러가느냐다.</blockquote>

## 표준이 낮추는 비용

큰 그림은 단순하다. MCP는 모델이 외부 도구와 데이터에 닿는 방식을 표준화하려는 규약이다. 그동안 도구·데이터를 모델에 붙이는 일은 매번 따로 만들어야 했는데, 그걸 공통 규약으로 정리한다는 게 핵심이다.

AX 관점에서 이게 왜 의미 있나. [AX란 무엇인가](/guide/what-is-ax)에서 데이터 접근과 워크플로우 연결을 핵심 계층으로 뒀는데, AX 설계의 상당 부분이 바로 "모델을 실제 업무 데이터와 도구에 연결하는 일"이다. MCP는 그 연결의 비용을 낮춘다는 점에서 [에이전트 워크플로우](/guide/rag-vs-agent)를 짜는 데 직접 영향을 준다.

<figure class="fig">
  <div class="dia">
    <svg viewBox="0 0 480 184" role="img" aria-label="모델이 MCP 규약을 거쳐 여러 도구·데이터에 연결되고, 끊겼을 때 폴백 경로로 우회하는 구조">
      <defs>
        <marker id="ah-mcp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" style="fill:#2563eb"/>
        </marker>
      </defs>
      <rect class="node" x="16" y="66" width="96" height="44" rx="9"/>
      <text class="ntext" x="64" y="92" text-anchor="middle">모델</text>
      <line class="edge" marker-end="url(#ah-mcp)" x1="112" y1="80" x2="158" y2="80"/>
      <line class="edge" marker-end="url(#ah-mcp)" x1="158" y1="96" x2="112" y2="96"/>
      <rect class="node-soft" x="160" y="62" width="104" height="52" rx="9"/>
      <text class="ntext" x="212" y="84" text-anchor="middle">MCP</text>
      <text class="nsub" x="212" y="100" text-anchor="middle">연결 규약</text>
      <line class="edge edge-d" marker-end="url(#ah-mcp)" x1="264" y1="78" x2="352" y2="50"/>
      <line class="edge edge-d" marker-end="url(#ah-mcp)" x1="264" y1="96" x2="352" y2="120"/>
      <rect class="node" x="354" y="32" width="110" height="38" rx="8"/>
      <text class="nsub" x="409" y="55" text-anchor="middle">도구·데이터</text>
      <rect class="node" x="354" y="104" width="110" height="38" rx="8"/>
      <text class="nsub" x="409" y="127" text-anchor="middle">도구·데이터</text>
      <path class="edge" style="stroke:#b45309;stroke-dasharray:2 3" marker-end="url(#ah-mcp)" d="M64 110 Q64 165 240 165 Q409 165 409 144"/>
      <text class="ctr" x="245" y="178" text-anchor="middle" style="fill:#b45309">끊기면 폴백(CLI·대안 경로)으로 우회</text>
    </svg>
  </div>
  <figcaption>그림 1 · 한 규약으로 닿되, 끊기면 폴백으로 — 연결과 그 대안 (구조)</figcaption>
</figure>

## 끊기면 어떻게 되나

연결이 쉬워진다는 건 그 연결에 의존하게 된다는 뜻이기도 하다. 그리고 의존하는 연결은 언젠가 끊긴다. 외부 앱 연동(connector)의 인증이 비어 있어 호출이 실패한 적이 있고, 그때는 같은 일을 CLI로 우회해서 처리했다. 이 가이드 작업 중에도 비슷한 일이 있었다 — 브라우저를 띄워 화면을 확인하는 도구 연결이 중간중간 끊겨서, 결국 빌드 결과와 출력 HTML을 직접 뜯어보는 쪽으로 물러서서 검증을 이어 갔다.

이 경험들이 알려준 건, MCP를 AX 운영에 둘 때 내가 물어야 할 질문이 "얼마나 많은 도구를 연결하나"가 아니라는 점이다. 진짜 질문은 **그 연결이 끊겼을 때 일이 멈추느냐, 아니면 다른 길로 굴러가느냐**다. [Codex 글](/guide/codex-ax)에서 무인 러너에 "못 하면 멈추지 말고 한계를 기록하고 진행하라"를 넣었던 것과 같은 이야기다 — 표준이 연결을 매끄럽게 해 줄수록, 그 매끄러움이 사라졌을 때의 폴백을 미리 정해 둬야 한다.

## 그래서 지금 보는 것

정리하면, MCP의 값은 분명하다 — 연결을 표준화해 AX의 큰 비용 한 덩어리를 줄여 준다. 다만 나는 그 값을 "도구를 많이 붙일 수 있다"로 받기보다, "이 연결에 얼마나 기대도 되나"로 따지는 편이다. 표준은 연결을 쉽게 만들지만 끊기지 않게 만들어 주지는 않으니까.

MCP 자체를 깊게 운영한 글은 더 써본 뒤에 쓴다. 빠르게 바뀌는 규약이라 [사실 확인](/guide/what-is-ax) 없이 단정하지 않으려 하고, 세부는 그때 1차 소스로 다시 확인할 것이다. 지금은 "연결의 신뢰성과 폴백"이라는 문제의식까지를 이 자리에 남겨 둔다.

<section class="log" aria-label="변경 로그">
  <div class="lg-h">변경 로그</div>
  <ul>
    <li><time>2026-06-23</time><span>초안에서 발행. 연결 표준의 값 + 끊김·폴백 문제의식 정리. MCP 심화 사용기는 보류 (성숙도: 탐색 중)</span></li>
    <li><time>예정</time><span>MCP 직접 운영 경험·구체 구성을 1차 소스 확인 후 보강</span></li>
  </ul>
</section>
