import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function run() {
  console.log('Launching Edge for 3D Dessert Bowl Hero Validation...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--window-size=1440,900',
      '--use-gl=angle',
      '--use-angle=swiftshader',
      '--enable-webgl',
    ],
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
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 20000 });

  // Wait 2.2 seconds for the 3D scene and GSAP assembly animation
  await new Promise((r) => setTimeout(r, 2200));

  const screenshotDir = path.resolve('public', 'screenshots-3d-bowl');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // 1. Initial 3D Dessert Bowl Hero (Pistachio, Strawberry, Chocolate + Floating Ingredients)
  await page.screenshot({ path: path.join(screenshotDir, '01-dessert-bowl-hero.png') });
  console.log('Saved 01-dessert-bowl-hero.png');

  // 2. Mouse Interaction: Move pointer over the 3D canvas
  console.log('Testing mouse interaction on 3D dessert bowl...');
  await page.mouse.move(1050, 420);
  await new Promise((r) => setTimeout(r, 400));
  await page.mouse.move(1180, 310);
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(screenshotDir, '02-mouse-tilt.png') });
  console.log('Saved 02-mouse-tilt.png');

  // 3. Flavour Interaction: Click "Strawberry" in vertical selector
  console.log('Testing flavour change to Strawberry...');
  const strawberryBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find((b) => b.textContent?.includes('Strawberry'));
  });

  if (strawberryBtn) {
    await strawberryBtn.click();
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(screenshotDir, '03-select-strawberry.png') });
    console.log('Saved 03-select-strawberry.png');
  }

  // 4. Flavour Interaction: Click "Chocolate" in vertical selector
  console.log('Testing flavour change to Chocolate...');
  const chocolateBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find((b) => b.textContent?.includes('Chocolate'));
  });

  if (chocolateBtn) {
    await chocolateBtn.click();
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(screenshotDir, '04-select-chocolate.png') });
    console.log('Saved 04-select-chocolate.png');
  }

  // 5. Scroll Interaction: Scroll down to check separation & rotation
  console.log('Testing scroll interaction on 3D composition...');
  await page.evaluate(() => window.scrollTo(0, 350));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotDir, '05-scrolled-depth.png') });
  console.log('Saved 05-scrolled-depth.png');

  // 6. Mobile 3D view test
  console.log('Testing mobile 3D hero...');
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 1400));
  await page.screenshot({ path: path.join(screenshotDir, '06-mobile-3d.png') });
  console.log('Saved 06-mobile-3d.png');

  console.log('\n--- Console Logs ---');
  consoleLogs.forEach((l) => console.log(`[${l.type}] ${l.text}`));

  console.log('\n--- Page Errors ---');
  if (pageErrors.length === 0) {
    console.log('0 errors encountered! Clean 3D console.');
  } else {
    pageErrors.forEach((e) => console.error(e));
  }

  await browser.close();
  console.log('3D Dessert Bowl Hero Validation Complete.');
}

run().catch((err) => {
  console.error('3D test failed:', err);
  process.exit(1);
});
