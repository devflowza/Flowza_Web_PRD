/**
 * Post-build prerender: snapshots every public route of the SPA into
 * dist/<route>/index.html so crawlers and social scrapers (WhatsApp,
 * LinkedIn — which never execute JS) see real content, per-route meta
 * and canonical tags.
 *
 * Fail-soft by design: if the Playwright browser is unavailable in the
 * build environment, the plain SPA build still ships.
 */
import http from 'node:http';
import { promises as fs } from 'node:fs';
import fsSync from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');

const ROUTES = [
  '/',
  '/get-started',
  '/products/finance',
  '/products/logispro',
  '/products/spamaster',
  '/products/fleetza',
  '/products/qrforge',
  '/products/pos',
  '/products/club',
  '/about',
  '/contact',
  '/locations',
  '/docs',
  '/help',
  '/status',
  '/privacy',
  '/terms',
  '/cookies',
];

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

function serveDist() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let filePath = path.join(DIST, urlPath);
    if (!fsSync.existsSync(filePath) || fsSync.statSync(filePath).isDirectory()) {
      filePath = path.join(DIST, 'index.html');
    }
    res.setHeader('Content-Type', MIME[path.extname(filePath)] ?? 'application/octet-stream');
    fsSync.createReadStream(filePath).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

async function main() {
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    console.warn('[prerender] playwright unavailable — shipping plain SPA build');
    return;
  }

  const server = await serveDist();
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;

  let browser;
  try {
    browser = await chromium.launch(
      process.env.PLAYWRIGHT_CHROMIUM_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } : {}
    );
  } catch (err) {
    console.warn(`[prerender] browser launch failed (${err.message.split('\n')[0]}) — shipping plain SPA build`);
    server.close();
    return;
  }

  // The un-prerendered shell must stay available as the SPA fallback for
  // unknown paths, and hosts commonly use 200.html or index.html for that.
  await fs.copyFile(path.join(DIST, 'index.html'), path.join(DIST, '200.html'));

  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  for (const route of ROUTES) {
    try {
      await page.goto(base + route, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(350);
      const html = '<!doctype html>\n' + (await page.evaluate(() => document.documentElement.outerHTML));
      const outDir = route === '/' ? DIST : path.join(DIST, route);
      await fs.mkdir(outDir, { recursive: true });
      await fs.writeFile(path.join(outDir, 'index.html'), html);
      console.log(`[prerender] ${route} → ${path.relative(DIST, path.join(outDir, 'index.html'))}`);
    } catch (err) {
      console.warn(`[prerender] failed for ${route}: ${err.message.split('\n')[0]}`);
    }
  }

  await browser.close();
  server.close();
  console.log(`[prerender] done — ${ROUTES.length} routes`);
}

main();
