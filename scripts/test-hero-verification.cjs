const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function verifyHero() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // 1. Wait for GSAP entrance clip-path reveal to complete
  await new Promise(r => setTimeout(r, 2200));

  // Capture Desktop Initial Hero (Pistachio Default, full cutout image visible)
  await page.screenshot({ path: 'hero-cutout-pistachio.png', clip: { x: 0, y: 0, width: 1440, height: 860 } });
  console.log('Saved hero-cutout-pistachio.png');

  // 2. Click Strawberry Flavour button
  const strawberryBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.innerText.includes('Strawberry'));
  });
  if (strawberryBtn) {
    await strawberryBtn.click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'hero-cutout-strawberry.png', clip: { x: 0, y: 0, width: 1440, height: 860 } });
    console.log('Saved hero-cutout-strawberry.png');
  }

  // 3. Click Chocolate Flavour button
  const chocolateBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.innerText.includes('Chocolate'));
  });
  if (chocolateBtn) {
    await chocolateBtn.click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'hero-cutout-chocolate.png', clip: { x: 0, y: 0, width: 1440, height: 860 } });
    console.log('Saved hero-cutout-chocolate.png');
  }

  // 4. Test 360 Spin Button
  const btn360 = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.innerText.includes('360°'));
  });
  if (btn360) {
    await btn360.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: 'hero-cutout-360-spinning.png', clip: { x: 0, y: 0, width: 1440, height: 860 } });
    console.log('Saved hero-cutout-360-spinning.png');
  }

  // 5. Test Mobile Viewport
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'hero-cutout-mobile.png', clip: { x: 0, y: 0, width: 390, height: 844 } });
  console.log('Saved hero-cutout-mobile.png');

  await browser.close();
  console.log('All verification screenshots captured!');
}

verifyHero().catch(console.error);
