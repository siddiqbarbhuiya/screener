import { chromium } from 'playwright';

const BASE = 'http://localhost:5173';
const PAGES = [
  { path: '/',                  name: 'Home' },
  { path: '/company/ITC',       name: 'Company Dashboard' },
  { path: '/screens',           name: 'Screener' },
  { path: '/portfolio',         name: 'Portfolio' },
  { path: '/document-analyzer', name: 'Document Analyzer' },
];

async function checkDarkMode(page, path, name) {
  await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 15000 });

  // Check html element has 'dark' class
  const htmlClass = await page.evaluate(() => document.documentElement.className);
  const hasDark = htmlClass.includes('dark');

  // Check body background is not white (pure white = rgb(255,255,255))
  const bodyBg = await page.evaluate(() => {
    return window.getComputedStyle(document.body).backgroundColor;
  });

  // Check localStorage theme is 'dark'
  const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));

  const pass = hasDark && storedTheme === 'dark' && bodyBg !== 'rgb(255, 255, 255)';
  const status = pass ? '✓' : '✗';
  console.log(`${status} [${name}] dark class: ${hasDark}, theme in localStorage: ${storedTheme}, body bg: ${bodyBg}`);
  return pass;
}

async function checkLightMode(page, path, name) {
  await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 15000 });

  const htmlClass = await page.evaluate(() => document.documentElement.className);
  const hasDark = htmlClass.includes('dark');
  const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));

  const pass = !hasDark && storedTheme === 'light';
  const status = pass ? '✓' : '✗';
  console.log(`${status} [${name}] no dark class: ${!hasDark}, theme: ${storedTheme}`);
  return pass;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  let passes = 0;
  let fails = 0;

  // --- Dark mode test ---
  console.log('\n=== DARK MODE ===');
  // Navigate to home and toggle dark mode
  await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 15000 });
  const currentTheme = await page.evaluate(() => localStorage.getItem('theme'));
  if (currentTheme !== 'dark') {
    // Click the dark mode toggle button
    await page.click('button[aria-label="Switch to dark mode"], button[aria-label="Toggle dark mode"]');
    await page.waitForTimeout(300);
  }

  for (const { path, name } of PAGES) {
    const ok = await checkDarkMode(page, path, name);
    ok ? passes++ : fails++;
  }

  // --- Light mode test ---
  console.log('\n=== LIGHT MODE ===');
  // Toggle back to light mode
  await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 15000 });
  const nowTheme = await page.evaluate(() => localStorage.getItem('theme'));
  if (nowTheme === 'dark') {
    await page.click('button[aria-label="Switch to light mode"], button[aria-label="Toggle dark mode"]');
    await page.waitForTimeout(300);
  }

  for (const { path, name } of PAGES) {
    const ok = await checkLightMode(page, path, name);
    ok ? passes++ : fails++;
  }

  // --- Screenshot dark mode ---
  console.log('\n=== SCREENSHOTS ===');
  await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.click('button[aria-label="Switch to dark mode"], button[aria-label="Toggle dark mode"]');
  await page.waitForTimeout(400);

  for (const { path, name } of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(800);
    const file = `test-screenshot-dark-${name.replace(/\s/g, '-').toLowerCase()}.png`;
    await page.screenshot({ path: file, fullPage: false });
    console.log(`  Saved ${file}`);
  }

  await browser.close();
  console.log(`\nResult: ${passes} passed, ${fails} failed`);
  process.exit(fails > 0 ? 1 : 0);
})();
