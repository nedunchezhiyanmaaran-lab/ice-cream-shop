const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function testRender() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
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
      .container {
        width: 600px;
        height: 550px;
        position: relative;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img src="http://localhost:5173/images/hero-gelato-centerpiece.png" />
    </div>
  </body>
  </html>`;

  await page.setContent(html);
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'test-centerpiece-seamless.png' });
  console.log('Saved test-centerpiece-seamless.png');
  await browser.close();
}
testRender().catch(console.error);

