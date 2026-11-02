import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function run() {
  console.log('Launching Edge browser...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleLogs = [];
  const pageErrors = [];

  page.on('console', (msg) => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
  });

  page.on('pageerror', (err) => {
    pageErrors.push(err.toString());
  });

  console.log('Navigating to http://localhost:5173 ...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 15000 });

  await new Promise((r) => setTimeout(r, 1200));

  const screenshotDir = path.resolve('public', 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // 1. Hero
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(screenshotDir, '01-hero.png') });
  console.log('Saved 01-hero.png');

  // 2. Flavours section
  await page.evaluate(() => document.querySelector('#flavours')?.scrollIntoView());
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotDir, '02-flavours.png') });
  console.log('Saved 02-flavours.png');

  // Test Quick View Modal by clicking the Explore button of the first card
  const exploreBtn = await page.$('.flavour-card button');
  if (exploreBtn) {
    console.log('Opening flavour modal...');
    await exploreBtn.click();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(screenshotDir, '02b-flavour-modal.png') });
    console.log('Saved 02b-flavour-modal.png');

    const closeBtn = await page.$('button[aria-label="Close modal"]');
    if (closeBtn) {
      await closeBtn.click();
      await new Promise((r) => setTimeout(r, 400));
    }
  }

  // 3. Craft Story section
  await page.evaluate(() => document.querySelector('#craft')?.scrollIntoView());
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotDir, '03-craft.png') });
  console.log('Saved 03-craft.png');

  // 4. Our Story section
  await page.evaluate(() => document.querySelector('#story')?.scrollIntoView());
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotDir, '04-story.png') });
  console.log('Saved 04-story.png');

  // 5. Ingredients section
  await page.evaluate(() => document.querySelector('#ingredients')?.scrollIntoView());
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotDir, '05-ingredients.png') });
  console.log('Saved 05-ingredients.png');

  // 6. Menu & Ordering section
  await page.evaluate(() => document.querySelector('#menu')?.scrollIntoView());
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotDir, '06-menu.png') });
  console.log('Saved 06-menu.png');

  // 7. Visit Atelier section
  await page.evaluate(() => document.querySelector('#visit')?.scrollIntoView());
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotDir, '07-visit.png') });
  console.log('Saved 07-visit.png');

  // 8. Footer & Closing
  await page.evaluate(() => document.querySelector('footer')?.scrollIntoView());
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotDir, '08-footer.png') });
  console.log('Saved 08-footer.png');

  // Test Cart Drawer and Checkout Modal
  console.log('Testing Cart Drawer & Checkout modal...');
  const cartBtn = await page.$('button[aria-label="Open Shopping Bag"]');
  if (cartBtn) {
    await cartBtn.click();
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({ path: path.join(screenshotDir, '09-cart-drawer.png') });
    console.log('Saved 09-cart-drawer.png');

    // Click Proceed to Order
    await page.waitForSelector('#checkout-trigger-btn', { timeout: 3000 });
    await page.click('#checkout-trigger-btn');
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(screenshotDir, '10-checkout-modal.png') });
    console.log('Saved 10-checkout-modal.png');
  }

  // Mobile viewport test
  console.log('Testing Mobile Viewport (iPhone 14)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(screenshotDir, '11-mobile-hero.png') });
  console.log('Saved 11-mobile-hero.png');

  console.log('\n--- Console Logs ---');
  consoleLogs.forEach((l) => console.log(`[${l.type}] ${l.text}`));

  console.log('\n--- Page Errors ---');
  if (pageErrors.length === 0) {
    console.log('0 errors encountered! Clean console.');
  } else {
    pageErrors.forEach((e) => console.error(e));
  }

  await browser.close();
  console.log('Full suite test completed successfully.');
}

run().catch((err) => {
  console.error('Test script failed:', err);
  process.exit(1);
});
