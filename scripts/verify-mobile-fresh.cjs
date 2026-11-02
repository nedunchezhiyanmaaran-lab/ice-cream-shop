const puppeteer = require('puppeteer-core');

async function testMobileFresh() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 390, height: 844, isMobile: true }
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1800));

  await page.screenshot({ path: 'scripts/live-mobile-fresh.png' });
  await browser.close();
  console.log('Saved live-mobile-fresh.png');
}

testMobileFresh().catch(console.error);

