const puppeteer = require('puppeteer-core');

async function testFinalRender() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1400, height: 1000 }
  });
  const page = await browser.newPage();
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          margin: 0;
          background: #F5E9D9;
          font-family: sans-serif;
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .stage {
          position: relative;
          width: 820px;
          height: 620px;
          background: #F5E9D9;
        }
        .ring-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          z-index: 5;
          filter: drop-shadow(0 0 16px rgba(244, 216, 139, 0.5));
        }
        .bowl-layer {
          position: absolute;
          width: 72%;
          height: 72%;
          object-fit: contain;
          left: 14%;
          bottom: 7%;
          z-index: 10;
          filter: drop-shadow(0 20px 32px rgba(80, 53, 47, 0.18));
        }
      </style>
    </head>
    <body>
      <h2 style="color:#50352F; font-family:serif; margin-bottom:20px;">CREAMÉ Photorealistic Gelato Hero Centerpiece</h2>
      <div class="stage">
        <img src="http://localhost:5173/images/ingredients-pristine.png" class="ring-layer" />
        <img src="http://localhost:5173/images/dessert-bowl-isolated.png" class="bowl-layer" />
      </div>
    </body>
    </html>
  `);

  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'scripts/final-isolated-verification.png' });
  console.log('Saved scripts/final-isolated-verification.png');
  await browser.close();
}

testFinalRender().catch(console.error);

