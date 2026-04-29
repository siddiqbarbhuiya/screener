import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false, slowMo: 400 });
const page = await browser.newPage();

// Intercept API responses to see what the browser gets
page.on('response', async (response) => {
  if (response.url().includes('/api/company/ITC') && !response.url().includes('chart') && !response.url().includes('financials') && !response.url().includes('shareholding')) {
    try {
      const json = await response.json();
      console.log('[NETWORK] /api/company/ITC response - price:', json.price, 'dividendYield:', json.dividendYield, 'sector:', json.sector);
    } catch {}
  }
});

console.log('Navigating to http://localhost:5173...');
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'screenshot-home.png' });
console.log('Home page loaded');

// Find and click the search bar
const input = page.locator('input[type="text"], input[placeholder*="Search"]').first();
await input.waitFor({ timeout: 10000 });
console.log('Search input found');

await input.click();
await input.type('ITC', { delay: 150 });
console.log('Typed ITC');

// Wait for dropdown
await page.waitForTimeout(800);
await page.screenshot({ path: 'screenshot-search-dropdown.png' });

// Check if dropdown appeared
const dropdown = page.locator('[class*="absolute"]').first();
const dropdownVisible = await dropdown.isVisible().catch(() => false);
console.log('Dropdown visible:', dropdownVisible);

// Get dropdown items text
const items = await page.locator('ul li, [role="option"], [class*="dropdown"] div').allTextContents();
console.log('Dropdown items:', items.slice(0, 5));

// Click first result if available
const firstResult = page.locator('ul li').first();
const firstResultVisible = await firstResult.isVisible().catch(() => false);
if (firstResultVisible) {
  const text = await firstResult.textContent();
  console.log('Clicking first result:', text);
  await firstResult.click();
  // Wait for company data to render (Key Metrics section)
  await page.waitForSelector('text=Key Metrics', { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot-company-page.png' });
  console.log('Current URL:', page.url());

  // Extract key values to verify live data
  const dividendYieldCell = await page.locator('text=Dividend Yield').locator('..').textContent().catch(() => 'N/A');
  const sectorText = await page.locator('text=FMCG, text=Consumer, text=Energy').first().textContent().catch(() => 'N/A');
  console.log('Dividend Yield cell:', dividendYieldCell);
  console.log('Sector:', sectorText);

  // Check for any error state
  const companyNotFound = await page.locator('text=Company not found').count();
  console.log('Company not found shown:', companyNotFound > 0);
}

await browser.close();
console.log('Done. Screenshots saved.');
