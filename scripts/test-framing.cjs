const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function testFraming() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });
  const page = await browser.newPage();

  // Test HTML with model-viewer, correct camera-orbit and camera-target
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <script type="module" src="http://localhost:5173/libs/model-viewer.min.js"></script>
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
      model-viewer {
        width: 100%;
        height: 100%;
        background-color: transparent;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <model-viewer
        src="http://localhost:5173/models/gelato-dessert-coupe.glb"
        poster="http://localhost:5173/images/hero-artisan-dessert-transparent.png"
        alt="Artisanal Gelato Coupe"
        camera-controls
        auto-rotate
        camera-orbit="0deg 75deg 4.6m"
        camera-target="0m 1.05m 0m"
        field-of-view="35deg"
        shadow-intensity="1.2"
        shadow-softness="0.75"
        exposure="1.0"
        environment-image="neutral"
        touch-action="pan-y"
      ></model-viewer>
    </div>
  </body>
  </html>`;

  await page.setContent(html);
  // Wait for model-viewer to load
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: 'test-model-viewer-framing.png' });
  console.log('Saved test-model-viewer-framing.png');
  await browser.close();
}
testFraming().catch(console.error);

