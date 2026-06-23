// 로컬 전용 콘텐츠 현황 대시보드 (dev 서버에서만, 읽기 전용).
// Astro integration 의 astro:server:setup 훅에만 붙어 prod 빌드(astro build)와 100% 분리된다.
// 편집·발행·작성은 에이전트가 .md 를 직접 다루므로, admin 은 "전체 글 상태를 한눈에" 보는 용도만.
// write 엔드포인트 없음 → 인증 없는 쓰기 노출 위험도 없다.
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import matter from 'gray-matter';

const EXCLUDE = new Set(['README.md', 'backlog.md']); // 글이 아닌 문서 제외

export default function adminDev() {
  let dir = '';
  let uiPath = '';
  return {
    name: 'ax-admin-dev',
    hooks: {
      'astro:config:setup': ({ config }) => {
        dir = fileURLToPath(new URL('./content/ax-guide/', config.root));
        uiPath = fileURLToPath(new URL('./admin/ui.html', config.root));
      },
      // dev 서버 기동 시에만 호출 → build 엔 영향 없음.
      'astro:server:setup': ({ server, logger }) => {
        server.middlewares.use((req, res, next) => {
          const url = req.url || '';

          if (url === '/admin' || url === '/admin/') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.end(readFileSync(uiPath, 'utf-8'));
          }

          if (url.startsWith('/__admin/list')) {
            const items = readdirSync(dir)
              .filter((f) => f.endsWith('.md') && !EXCLUDE.has(f))
              .map((f) => {
                const { data } = matter(readFileSync(path.join(dir, f), 'utf-8'));
                return {
                  id: f.replace(/\.md$/, ''),
                  title: data.title || f,
                  category: data.category || '',
                  draft: !!data.draft,
                  stage: data.stage || '',
                  updated: data.updated || '',
                  order: data.order ?? 100,
                };
              });
            items.sort((a, b) => a.category.localeCompare(b.category) || a.order - b.order);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            return res.end(JSON.stringify(items));
          }

          return next();
        });
        logger.info('AX admin (dev, read-only) → /admin');
      },
    },
  };
}
