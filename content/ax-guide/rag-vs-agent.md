---
title: RAG와 Agent Workflow의 차이
category: 개념·관점
categoryEn: Concept
stage: 탐색 중
updated: "2026-06-23"
order: 5
lead: 둘 다 모델에 부족한 걸 채워주는 방법이지만 채우는 방식이 다르다. 하나는 맥락을 미리 넣어주고, 하나는 스스로 여러 단계를 밟게 한다.
related:
  - label: 에이전트를 모는 법
    href: "/guide/driving-agents"
  - label: AX란 무엇인가
    href: "/guide/what-is-ax"
slides:
  - kick: AX Field Guide · 개념·관점
    title: RAG와 Agent Workflow
    body: 맥락을 채우는 두 방식, 언제 무엇으로 충분한가
    cover: true
  - kick: 테제
    title: 같은 목적, 다른 모양
    body: 둘 다 모델의 부족을 메운다. RAG는 맥락을 미리 넣고, Agent는 스스로 단계를 밟는다.
  - kick: RAG
    title: 검색해서 넣고, 한 번 답한다
    body: 질문 → 관련 문서 검색 → 맥락 주입 → 1회 생성. 단순하고 예측 가능.
  - kick: Agent
    title: 계획하고, 도구 쓰고, 반복한다
    body: 목표 → 계획 → 도구 호출 → 관찰 → 다시. 강력하지만 비결정적.
  - kick: 선택
    title: 한 번 조회로 되면 RAG
    body: 외부 지식만 채우면 끝나는 일에 Agent를 쓰면 비용·불확실성만 는다.
  - kick: 정리
    title: 대개는 섞는다
    body: Agent의 한 단계가 RAG인 경우가 흔하다. 대립이 아니라 층위가 다르다.
    cover: true
---

AX 설계를 하다 보면 "이건 RAG로 할 일인가 에이전트로 할 일인가"를 정해야 하는 순간이 온다. 둘 다 모델 혼자서는 부족한 걸 메워주는 방법이라 헷갈리기 쉬운데, 메우는 방식이 꽤 다르다. 이 구분을 분명히 해두면 [어떤 루프를 고를지](/guide/choosing-loops) 정한 뒤 그걸 무엇으로 구현할지가 한결 명확해진다.

<blockquote class="thesis">RAG와 Agent Workflow는 대립하는 선택지가 아니다. RAG는 답하기 전에 맥락을 미리 채워 넣는 방식이고, Agent는 스스로 여러 단계를 밟아 가며 풀어가는 방식이다. 층위가 다르다.</blockquote>

## 두 방식의 모양

가장 빠른 이해는 흐름을 나란히 놓고 보는 것이다.

<figure class="fig">
  <div class="dia">
    <svg viewBox="0 0 560 260" role="img" aria-label="RAG는 검색 후 1회 생성하는 직선 흐름, Agent는 계획-도구-관찰을 반복하는 순환 흐름">
      <defs>
        <marker id="ah-rg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" style="fill:#2563eb"/>
        </marker>
      </defs>
      <text class="kick" x="40" y="28" style="font-family:var(--mono);font-size:11px;fill:#2563eb">RAG — 직선</text>
      <rect class="node" x="20" y="40" width="80" height="38" rx="8"/>
      <text class="nsub" x="60" y="63" text-anchor="middle">질문</text>
      <line class="edge" marker-end="url(#ah-rg)" x1="100" y1="59" x2="124" y2="59"/>
      <rect class="node" x="126" y="40" width="80" height="38" rx="8"/>
      <text class="nsub" x="166" y="63" text-anchor="middle">검색</text>
      <line class="edge" marker-end="url(#ah-rg)" x1="206" y1="59" x2="230" y2="59"/>
      <rect class="node" x="232" y="40" width="96" height="38" rx="8"/>
      <text class="nsub" x="280" y="63" text-anchor="middle">맥락 주입</text>
      <line class="edge" marker-end="url(#ah-rg)" x1="328" y1="59" x2="352" y2="59"/>
      <rect class="node-soft" x="354" y="40" width="96" height="38" rx="8"/>
      <text class="nsub" x="402" y="63" text-anchor="middle">1회 생성</text>
      <line class="edge" marker-end="url(#ah-rg)" x1="450" y1="59" x2="474" y2="59"/>
      <rect class="node-soft" x="476" y="40" width="70" height="38" rx="8"/>
      <text class="nsub" x="511" y="63" text-anchor="middle">답</text>
      <text class="kick" x="40" y="138" style="font-family:var(--mono);font-size:11px;fill:#2563eb">Agent — 순환</text>
      <rect class="node" x="40" y="150" width="80" height="38" rx="8"/>
      <text class="nsub" x="80" y="173" text-anchor="middle">계획</text>
      <line class="edge" marker-end="url(#ah-rg)" x1="120" y1="169" x2="170" y2="169"/>
      <rect class="node" x="172" y="150" width="90" height="38" rx="8"/>
      <text class="nsub" x="217" y="173" text-anchor="middle">도구 호출</text>
      <line class="edge" marker-end="url(#ah-rg)" x1="262" y1="169" x2="312" y2="169"/>
      <rect class="node" x="314" y="150" width="80" height="38" rx="8"/>
      <text class="nsub" x="354" y="173" text-anchor="middle">관찰</text>
      <path class="edge edge-d" marker-end="url(#ah-rg)" d="M354 188 Q354 226 217 226 Q80 226 80 190"/>
      <text class="ctr" x="240" y="220" text-anchor="middle">목표 도달까지 반복</text>
      <line class="edge" marker-end="url(#ah-rg)" x1="394" y1="169" x2="430" y2="169"/>
      <rect class="node-soft" x="432" y="150" width="70" height="38" rx="8"/>
      <text class="nsub" x="467" y="173" text-anchor="middle">답</text>
    </svg>
  </div>
  <figcaption>그림 1 · RAG는 직선, Agent는 순환 (흐름 비교)</figcaption>
</figure>

**RAG**(Retrieval-Augmented Generation)는 질문이 들어오면 관련 자료를 검색해 모델의 컨텍스트에 넣어주고, 그 맥락 위에서 한 번 답을 생성한다. 흐름이 직선이라 예측 가능하고, 비용도 대체로 한 번의 검색과 한 번의 생성으로 끝난다. 모델이 모르는 외부 지식·최신 정보를 채우는 데 강하다.

**Agent Workflow**는 목표를 주면 모델이 스스로 계획을 세우고, 도구를 호출하고, 결과를 관찰해 다음 행동을 정하는 과정을 목표에 닿을 때까지 반복한다. [에이전트를 모는 법](/guide/driving-agents)에서 다룬 그 루프다. 여러 단계와 결정이 필요한 일을 해낼 수 있지만, 반복마다 모델이 비결정적으로 움직여서 흐름을 예측하기 어렵고 비용도 단계 수만큼 늘어난다.

## 무엇을 언제 쓰나

선택의 기준은 단순하다. **한 번의 조회로 채울 수 있는 일이면 RAG로 충분하다.** 외부 지식을 끌어와 답하면 끝나는 일에 에이전트를 붙이면, 얻는 것 없이 비용과 불확실성만 늘어난다. 반대로 중간 결과에 따라 다음에 무엇을 할지가 달라지는 일, 여러 도구를 순서대로 써야 하는 일이라면 그건 에이전트의 자리다.

<figure class="fig">
  <div class="compare">
    <div class="cmp-card">
      <div class="cmp-h">RAG가 맞을 때</div>
      <ul><li>외부 지식만 채우면 된다</li><li>한 번 조회로 충분하다</li><li>예측 가능·저비용이 중요하다</li></ul>
    </div>
    <div class="cmp-arrow">vs</div>
    <div class="cmp-card is-ax">
      <div class="cmp-h">Agent가 맞을 때</div>
      <ul><li>단계마다 다음이 달라진다</li><li>여러 도구를 순서대로 쓴다</li><li>일을 끝까지 끌고 가야 한다</li></ul>
    </div>
  </div>
  <figcaption>그림 2 · 한 번 조회로 되면 RAG, 단계가 필요하면 Agent (비교)</figcaption>
</figure>

흔한 실수는 멋져 보인다는 이유로 단순 조회 작업에 에이전트를 얹는 것이다. [무엇을 안 만들지 정하는](/guide/what-ax-work-looks-like) 감각이 여기서도 작동한다 — 더 강력한 도구가 늘 더 맞는 도구는 아니다.

## 대개는 섞인다

마지막으로, 이 둘은 양자택일이 아니다. 실제로는 에이전트가 밟는 한 단계가 RAG인 경우가 흔하다. 에이전트가 "이건 문서를 찾아봐야겠다"고 판단해 검색 도구를 호출하는 그 순간이 RAG다. 그래서 둘을 경쟁 관계로 보기보다, 맥락을 채우는 기본 동작(RAG)과 그걸 포함해 여러 단계를 엮는 구조(Agent)라는 층위 차이로 보는 게 맞다. "RAG냐 Agent냐"가 아니라 "이 일에 단계가 필요한가, 한 번 채우면 되는가"를 먼저 묻는다.

<section class="log" aria-label="변경 로그">
  <div class="lg-h">변경 로그</div>
  <ul>
    <li><time>2026-06-23</time><span>초안 작성. 두 흐름 비교·선택 기준·층위 관계 정리 (성숙도: 탐색 중)</span></li>
    <li><time>예정</time><span>RAG 단계를 포함한 에이전트 구성의 익명화 사례 보강</span></li>
  </ul>
</section>
