const puppeteer = require('puppeteer-core');

async function testWebsiteHero() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  
  // Desktop
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'scripts/current-site-desktop.png' });
  
  // Mobile
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'scripts/current-site-mobile.png' });
  
  await browser.close();
  console.log('Saved current-site-desktop.png and current-site-mobile.png');
}

testWebsiteHero().catch(console.error);

