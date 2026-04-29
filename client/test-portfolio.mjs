import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false, slowMo: 400 });
const page = await browser.newPage();

// Capture API calls
page.on('response', async (response) => {
  if (response.url().includes('/api/portfolio/analyze')) {
    const status = response.status();
    try {
      const json = await response.json();
      console.log(`[NETWORK] /api/portfolio/analyze → ${status}`);
      console.log('  aiAvailable:', json.aiAvailable);
      console.log('  totalAmount:', json.totalAmount);
      console.log('  sectors:', json.sectorAllocation?.map(s => `${s.sector} ${s.percentage}%`).join(', '));
    } catch {
      console.log(`[NETWORK] /api/portfolio/analyze → ${status} (non-JSON)`);
    }
  }
});

console.log('Navigating to Portfolio page...');
await page.goto('http://localhost:5173/portfolio', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'screenshot-portfolio-empty.png' });
console.log('Portfolio page loaded');

// Fill first row: TCS / 100000
const symbolInputs = page.locator('input[placeholder*="Symbol"]');
const amountInputs = page.locator('input[placeholder*="Amount"]');

await symbolInputs.nth(0).fill('TCS');
await amountInputs.nth(0).fill('100000');
console.log('Filled row 1: TCS 100000');

// Fill second row: BSE / 30000
await symbolInputs.nth(1).fill('BSE');
await amountInputs.nth(1).fill('30000');
console.log('Filled row 2: BSE 30000');

await page.screenshot({ path: 'screenshot-portfolio-filled.png' });

// Click Analyze Portfolio
const analyzeBtn = page.locator('button', { hasText: 'Analyze Portfolio' });
await analyzeBtn.click();
console.log('Clicked Analyze Portfolio');

// Wait for button to return to "Analyze Portfolio" (loading done)
await page.waitForSelector('button:has-text("Analyze Portfolio")', { timeout: 20000 })
  .then(() => console.log('Loading complete — button reset'))
  .catch(() => console.log('WARNING: button never reset within 20s'));

// Scroll to bottom so results are visible, then screenshot full page
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(400);
await page.screenshot({ path: 'screenshot-portfolio-result.png', fullPage: true });

// Verify results rendered
const totalText = await page.locator('text=Total:').textContent().catch(() => 'N/A');
console.log('Total amount:', totalText);

const sectorCells = await page.locator('[class*="space-y-1"] span').allTextContents();
console.log('Sector bars rendered:', sectorCells.filter(t => t.trim()).slice(0, 6));

const holdingsTable = await page.locator('table tbody tr').count();
console.log('Holdings table rows:', holdingsTable);

const itText = await page.locator('text=IT').first().textContent().catch(() => 'not found');
console.log('IT text:', itText);

console.log('Done. Screenshots: screenshot-portfolio-empty.png, screenshot-portfolio-filled.png, screenshot-portfolio-result.png');
await browser.close();
