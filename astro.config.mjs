import { defineConfig } from 'astro/config';

// 정적 출력(기본). Vercel 이 Astro 를 자동 감지해 dist/ 를 배포한다.
export default defineConfig({
  server: { port: 8351 }, // dev 포트 (Astro 기본 4321 은 다른 도구와 충돌 회피)
  // site: 'https://your-domain', // 배포 도메인 정해지면 설정
});
