const puppeteer = require('puppeteer-core');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/dell/.gemini/antigravity/brain/db85d9da-7aa8-4a89-a7cb-87ec76cdebab';

async function verifyChangeover() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Let entrance animation complete
  await new Promise(r => setTimeout(r, 2200));

  // 1. Desktop Default View
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'hero-changeover-desktop-pistachio.png') });
  console.log('Saved hero-changeover-desktop-pistachio.png');

  // 2. Click Strawberry Chip
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Wild Strawberry')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'hero-changeover-desktop-strawberry.png') });
  console.log('Saved hero-changeover-desktop-strawberry.png');

  // 3. Click Dark Chocolate Chip
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Dark Chocolate')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'hero-changeover-desktop-chocolate.png') });
  console.log('Saved hero-changeover-desktop-chocolate.png');

  // 4. Mobile Viewport (390 x 844)
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true });
  await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2200));
  await mobilePage.screenshot({ path: path.join(ARTIFACT_DIR, 'hero-changeover-mobile.png') });
  console.log('Saved hero-changeover-mobile.png');

  await browser.close();
  console.log('All editorial changeover screenshots captured successfully!');
}

verifyChangeover().catch(console.error);

