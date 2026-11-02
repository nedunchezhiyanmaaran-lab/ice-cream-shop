const puppeteer = require('puppeteer-core');

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1200, height: 800 }
  });
  const page = await browser.newPage();
  await page.setContent(`
    <!DOCTYPE html>
    <body style="margin:0; background:#F5E9D9; display:flex; gap:20px; padding:20px;">
      <div>
        <h3>golden-ring-isolated.png</h3>
        <img src="http://localhost:5173/images/golden-ring-isolated.png" style="width:500px; border:1px solid #ccc; background:#F5E9D9;"/>
      </div>
      <div>
        <h3>golden-streak-pristine.png</h3>
        <img src="http://localhost:5173/images/golden-streak-pristine.png" style="width:500px; border:1px solid #ccc; background:#F5E9D9;"/>
      </div>
    </body>
  `);
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'scripts/inspect-rings.png' });
  await browser.close();
  console.log('Done inspect-rings.png');
}
test();

