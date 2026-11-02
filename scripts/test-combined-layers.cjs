const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function testCombined() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });
  const page = await browser.newPage();

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        margin: 0;
        background-color: #F5E9D9;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }
      .stage {
        width: 700px;
        height: 600px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .streak-layer {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        z-index: 10;
        filter: drop-shadow(0 0 18px rgba(244, 216, 139, 0.65));
      }
      .bowl-layer {
        position: absolute;
        width: 78%;
        height: 78%;
        object-fit: contain;
        z-index: 20;
        filter: drop-shadow(0 20px 32px rgba(80, 53, 47, 0.16));
        bottom: 8%;
      }
    </style>
  </head>
  <body>
    <div class="stage">
      <img src="http://localhost:5173/images/golden-streak-pristine.png" class="streak-layer" />
      <img src="http://localhost:5173/images/dessert-bowl-isolated.png" class="bowl-layer" />
    </div>
  </body>
  </html>`;

  await page.setContent(html);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'test-golden-bowl-combined.png' });
  console.log('Saved test-golden-bowl-combined.png');
  await browser.close();
}
testCombined().catch(console.error);
