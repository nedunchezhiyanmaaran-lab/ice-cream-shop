const puppeteer = require('puppeteer-core');

async function inspectReference() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });
  const page = await browser.newPage();
  await page.setContent(`
    <!DOCTYPE html>
    <body style="margin:0; background:#000;">
      <img src="http://localhost:5173/images/hero-artisan-gelato-reference.jpg" style="width:100%; height:auto;"/>
    </body>
  `);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'scripts/ref-full.png' });
  await browser.close();
  console.log('Saved ref-full.png');
}

inspectReference().catch(console.error);

