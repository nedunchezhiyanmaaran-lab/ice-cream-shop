const puppeteer = require('puppeteer-core');

async function testAlignment() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1400, height: 1000 }
  });
  const page = await browser.newPage();
  
  // Let's create an interactive test page where we can see:
  // 1. The isolated bowl (black removed)
  // 2. The golden ring & ingredients
  // 3. Both combined on #F5E9D9 background
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          margin: 0;
          background: #F5E9D9;
          font-family: sans-serif;
          padding: 20px;
        }
        .container {
          position: relative;
          width: 900px;
          height: 650px;
          margin: 0 auto;
          background: #F5E9D9;
          border: 1px solid rgba(80,53,47,0.15);
          overflow: hidden;
          border-radius: 20px;
        }
        .ring-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: contain;
          top: 0;
          left: 0;
          z-index: 5;
        }
        .bowl {
          position: absolute;
          width: 72%;
          height: 72%;
          object-fit: contain;
          left: 14%;
          bottom: 7%;
          z-index: 10;
          filter: drop-shadow(0 20px 30px rgba(80,53,47,0.18));
        }
      </style>
    </head>
    <body>
      <h2 style="text-align:center; color:#50352F;">Test Alignment on #F5E9D9</h2>
      <div class="container">
        <img src="http://localhost:5173/images/golden-ring-isolated.png" class="ring-bg" />
        <img src="http://localhost:5173/images/dessert-bowl-isolated.png" class="bowl" />
      </div>
    </body>
    </html>
  `);
  
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'scripts/test-alignment.png' });
  await browser.close();
  console.log('Saved scripts/test-alignment.png');
}

testAlignment().catch(console.error);

