const puppeteer = require('puppeteer-core');

async function verifyLive() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Wait for initial GSAP animations to complete
  await new Promise(r => setTimeout(r, 1800));

  // 1. Capture Default Hero (Signature Coupe)
  await page.screenshot({ path: 'scripts/live-hero-coupe.png' });
  console.log('Saved live-hero-coupe.png');

  // 2. Click "Sicilian Plinth"
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Sicilian Plinth')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'scripts/live-hero-plinth.png' });
  console.log('Saved live-hero-plinth.png');

  // 3. Click "Takeaway Pint"
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Takeaway Pint')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'scripts/live-hero-pint.png' });
  console.log('Saved live-hero-pint.png');

  // 4. Mobile Viewport (iPhone 14)
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scripts/live-hero-mobile.png' });
  console.log('Saved live-hero-mobile.png');

  await browser.close();
}

verifyLive().catch(console.error);

