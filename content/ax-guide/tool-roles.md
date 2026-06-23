---
title: Cursor · Claude Code · Codex의 역할 분리
category: 도구·기법
categoryEn: Craft
stage: 초안 — 실사용 채우는 중
updated: "2026-06-23"
order: 5
draft: true
lead: 하나로 다 하려 하지 않기. IDE 보조, 터미널 에이전트, 작업 위임은 결이 다른 일이고, 섞으면 어느 것도 제값을 못 한다.
related:
  - label: Claude Code vs Codex
    href: "/guide/cc-vs-codex"
  - label: 에이전트를 모는 법
    href: "/guide/driving-agents"
slides:
  - kick: AX Field Guide · 도구·기법
    title: 역할 분리
    body: 하나로 다 하려 하지 않기
    cover: true
  - kick: 세 자리
    title: IDE 보조 · 터미널 · 위임
    bullets:
      - 곁에서 거드는 IDE 보조
      - 터미널에서 모는 에이전트
      - 통째로 넘기는 작업 위임
  - kick: 채우는 중
    title: 경계는 직접
    body: 무엇을 어디에 맡길지는 써보며 정한다.
---

이 글은 **초안**이다. 세 도구의 역할 경계를 구조로 잡아두고, 실제로 어떻게 나눠 썼는지는 채워 넣는다.

핵심 주장은 단순하다. 하나의 도구로 모든 걸 하려 하면 어느 것도 제값을 못 한다. 곁에서 코드를 거드는 IDE 보조, 터미널에서 여러 단계를 모는 에이전트, 작업을 통째로 넘기는 위임 — 이 셋은 [에이전트를 모는 법](/guide/driving-agents)에서 본 추상도가 다른 일이고, 도구마다 잘 맞는 자리가 다르다.

<figure class="fig">
  <div class="dia">
    <svg viewBox="0 0 520 170" role="img" aria-label="IDE 보조, 터미널 에이전트, 작업 위임 세 영역을 가로로 배치한 역할 분리도">
      <rect class="node-soft" x="14" y="50" width="150" height="70" rx="10"/>
      <text class="ntext" x="89" y="80" text-anchor="middle">IDE 보조</text>
      <text class="nsub" x="89" y="98" text-anchor="middle">곁에서 거든다</text>
      <rect class="node-soft" x="184" y="50" width="150" height="70" rx="10"/>
      <text class="ntext" x="259" y="80" text-anchor="middle">터미널 에이전트</text>
      <text class="nsub" x="259" y="98" text-anchor="middle">곁에서 모은다</text>
      <rect class="node" x="354" y="50" width="150" height="70" rx="10"/>
      <text class="ntext" x="429" y="80" text-anchor="middle">작업 위임</text>
      <text class="nsub" x="429" y="98" text-anchor="middle">통째로 넘긴다</text>
      <text class="ctr" x="260" y="28" text-anchor="middle">← 사람 주도 · · · · · · · · 자동 주도 →</text>
      <text class="ctr" x="260" y="145" text-anchor="middle">어느 도구가 어느 자리에 — 채우는 중</text>
    </svg>
  </div>
  <figcaption>그림 1 · 사람 주도에서 자동 주도까지, 세 자리 (역할 분리)</figcaption>
</figure>

<blockquote class="draft-note"><b>채울 자리.</b> Cursor·Claude Code·Codex를 각각 어느 자리에 뒀는지, 왜 그렇게 나눴는지, 섞었다가 실패한 경험이 들어간다. 한 도구가 여러 자리를 겸할 수 있는 부분도 함께.</blockquote>

<section class="log" aria-label="변경 로그">
  <div class="lg-h">변경 로그</div>
  <ul>
    <li><time>2026-06-23</time><span>구조·프레임 초안. 실사용 분담 경험 대기 (성숙도: 초안)</span></li>
  </ul>
</section>
