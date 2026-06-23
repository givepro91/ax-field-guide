---
title: Claude Code를 AX 관점에서 쓰는 법
category: 도구·기법
categoryEn: Craft
stage: 초안 — 실사용 채우는 중
updated: "2026-06-23"
order: 2
draft: true
lead: 코딩 도구로 보면 작아진다. AX 관점에서는 "반복 작업을 어디까지 위임하고, 승인·검증을 어디 둘 것인가"의 도구로 본다.
related:
  - label: 에이전트를 모는 법
    href: "/guide/driving-agents"
  - label: AI에 승인 게이트가 필요한 이유
    href: "/guide/approval-gates"
slides:
  - kick: AX Field Guide · 도구·기법
    title: Claude Code · AX 관점
    body: 코딩 보조가 아니라 위임의 도구로 본다면
    cover: true
  - kick: 프레임
    title: 역할 · 한계 · 언제 쓰나
    bullets:
      - 무엇을 맡길 수 있나
      - 어디서 못 미치나
      - 어떤 작업에 맞나
  - kick: 채우는 중
    title: 실사용 판단은 직접
    body: 어디에 붙였고 무엇이 됐는지는 써보고 채운다.
---

이 글은 아직 **초안**이다. [도구 리뷰는 직접 써본 뒤에만 쓴다](/guide/what-is-ax)는 이 프로젝트의 원칙대로, 프레임과 구조만 먼저 잡아두고 실제 사용 경험은 채워 넣는 중이다.

AX 관점에서 도구를 본다는 건 성능표를 만드는 게 아니라 [에이전트를 모는 법](/guide/driving-agents)에서 세운 틀 — 역할·한계·언제 쓰나 — 로 보는 것이다. Claude Code를 코딩 자동완성으로만 보면 핵심을 놓친다. AX의 질문은 "코드를 얼마나 잘 짜나"가 아니라 **"사람이 반복하던 작업을 어디까지 위임할 수 있고, 그 위임에 승인과 검증을 어디에 둘 것인가"**다.

<figure class="fig">
  <div class="compare">
    <div class="cmp-card">
      <div class="cmp-h">역할</div>
      <ul><li>반복 작업 위임</li><li>여러 단계 자동 수행</li><li>(채우는 중)</li></ul>
    </div>
    <div class="cmp-card">
      <div class="cmp-h">한계</div>
      <ul><li>비결정적 출력</li><li>맥락 밖은 못 본다</li><li>(채우는 중)</li></ul>
    </div>
    <div class="cmp-card is-ax">
      <div class="cmp-h">언제 쓰나</div>
      <ul><li>경계 분명한 반복</li><li>검증 가능한 작업</li><li>(채우는 중)</li></ul>
    </div>
  </div>
  <figcaption>그림 1 · AX 관점 3틀 — 실사용으로 채울 구조 (프레임)</figcaption>
</figure>

<blockquote class="draft-note"><b>채울 자리.</b> Claude Code를 실제로 어떤 반복 작업에 붙였는지, 무엇이 잘 됐고 어디서 막혔는지, 승인 게이트와 검증을 어디에 뒀는지가 여기 들어간다. [승인 게이트](/guide/approval-gates)·[신뢰도 판단](/guide/trusting-output)의 패턴이 이 도구에서 어떻게 적용됐는지 익명화해 적는다.</blockquote>

## 채울 항목 (자기 메모)

- 어떤 작업을 위임했고 어떤 작업은 직접 했나 — 그 경계의 기준
- 승인을 어디에 뒀나 (자동 적용 vs 제안-후-승인)
- 검증을 어떻게 했나 (빌드·테스트·사람 확인)
- 안 맞았던 작업 — 위임했다가 거둬들인 것

<section class="log" aria-label="변경 로그">
  <div class="lg-h">변경 로그</div>
  <ul>
    <li><time>2026-06-23</time><span>구조·프레임 초안. 실사용 경험 대기 (성숙도: 초안)</span></li>
  </ul>
</section>
