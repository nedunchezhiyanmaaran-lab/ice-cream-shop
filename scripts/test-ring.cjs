const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function testRing() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });

  const stats = await page.evaluate(async () => {
    const load = (src) => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

    const img = await load('/images/uploaded-ingredients.jpg');
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Let's sample along horizontal line y=10 from x=0 to 100
    const scanX = [];
    for (let x = 0; x < 60; x += 5) {
      const d = ctx.getImageData(x, 10, 1, 1).data;
      scanX.push({ x, r: d[0], g: d[1], b: d[2] });
    }

    // Check golden ring at y=300, x=150
    // Check strawberry at bottom-left x=200, y=550
    return {
      scanX,
      sampleRing: ctx.getImageData(150, 300, 1, 1).data,
      sampleStrawberry: ctx.getImageData(200, 550, 1, 1).data
    };
  });

  console.log(JSON.stringify(stats, null, 2));
  await browser.close();
}
testRing().catch(console.error);

