/* Drives the landing page in headless Chromium: captures console/page errors
 * and screenshots key states at desktop + mobile viewports. */
import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:5173/';
const OUT = '/tmp/shots';
fs.mkdirSync(OUT, { recursive: true });

const errors = [];

async function capture(page, name) {
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log('shot:', name);
}

async function run(label, viewport, opts = {}) {
  const browser = await chromium.launch();
  // the sandbox MITM proxy breaks TLS for fonts.googleapis.com; accept it here
  const ctx = await browser.newContext({ viewport, ignoreHTTPSErrors: true, ...opts });
  const page = await ctx.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[${label}] console.error: ${msg.text()}`);
  });
  page.on('pageerror', (err) => errors.push(`[${label}] pageerror: ${err.message}`));
  page.on('requestfailed', (req) => {
    if (!req.url().includes('favicon')) errors.push(`[${label}] requestfailed: ${req.url()} (${req.failure()?.errorText})`);
  });

  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await capture(page, `${label}-0-preloader`);

  // let preloader finish + hero entrance play
  await page.waitForTimeout(4500);
  await capture(page, `${label}-1-hero`);

  // scroll through the page, capturing the pinned rail mid-way
  const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const steps = [0.18, 0.32, 0.46, 0.62, 0.78, 0.9, 1];
  for (let i = 0; i < steps.length; i++) {
    await page.mouse.wheel(0, total * (steps[i] - (steps[i - 1] ?? 0)));
    await page.waitForTimeout(1800);
    await capture(page, `${label}-${2 + i}-scroll${Math.round(steps[i] * 100)}`);
  }

  if (label === 'mobile') {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(800);
    await page.click('button[aria-label="Open menu"]');
    await page.waitForTimeout(900);
    await capture(page, `${label}-9-menu`);
  }

  await browser.close();
}

await run('desktop', { width: 1440, height: 900 });
await run('mobile', { width: 390, height: 844 }, { isMobile: true, hasTouch: true, deviceScaleFactor: 2 });

// reduced-motion smoke test: every section's content must be visible without animations
{
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, ignoreHTTPSErrors: true, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  page.on('pageerror', (err) => errors.push(`[reduced] pageerror: ${err.message}`));
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await capture(page, 'reduced-0-hero');
  const hidden = await page.evaluate(() =>
    ['h1', '[data-hero-sub]', '[data-hero-cta]'].filter((sel) => {
      const el = document.querySelector(sel);
      return !el || getComputedStyle(el).opacity === '0';
    })
  );
  if (hidden.length) errors.push(`[reduced] still hidden: ${hidden.join(', ')}`);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.5));
  await page.waitForTimeout(900);
  await capture(page, 'reduced-1-mid');
  await browser.close();
}

if (errors.length) {
  console.log('\n--- ERRORS ---');
  errors.forEach((e) => console.log(e));
  process.exitCode = 1;
} else {
  console.log('\nNo console/page errors.');
}
