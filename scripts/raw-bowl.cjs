const puppeteer = require('puppeteer-core');

async function testCrop() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.setContent(`
    <!DOCTYPE html>
    <body style="margin:0; background:#fff;">
      <img src="http://localhost:5173/images/uploaded-bowl-black.jpg" style="width:1024px;"/>
    </body>
  `);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'scripts/raw-bowl.png', clip: { x: 300, y: 0, width: 450, height: 450 } });
  await browser.close();
  console.log('Saved raw-bowl.png');
}
testCrop().catch(console.error);

