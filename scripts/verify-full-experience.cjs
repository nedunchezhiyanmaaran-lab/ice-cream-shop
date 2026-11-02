const puppeteer = require('puppeteer-core');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/dell/.gemini/antigravity/brain/db85d9da-7aa8-4a89-a7cb-87ec76cdebab';

async function verifyExperience() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Wait for entrance animations to settle
  await new Promise(r => setTimeout(r, 2000));

  // 1. Desktop Default (Pistachio)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'hero-desktop-pistachio-final.png') });
  console.log('Saved hero-desktop-pistachio-final.png');

  // 2. Select Strawberry
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Strawberry')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'hero-desktop-strawberry-final.png') });
  console.log('Saved hero-desktop-strawberry-final.png');

  // 3. Select Chocolate
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Chocolate')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'hero-desktop-chocolate-final.png') });
  console.log('Saved hero-desktop-chocolate-final.png');

  // 4. Mobile Viewport (390 x 844)
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true });
  await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  await mobilePage.screenshot({ path: path.join(ARTIFACT_DIR, 'hero-mobile-final.png') });
  console.log('Saved hero-mobile-final.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

verifyExperience().catch(console.error);

