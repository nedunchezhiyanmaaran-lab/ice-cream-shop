const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function testBlackMask() {
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

    const img = await load('/images/uploaded-bowl-black.jpg');
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const corners = [
      ctx.getImageData(5, 5, 1, 1).data,
      ctx.getImageData(img.naturalWidth - 5, 5, 1, 1).data,
      ctx.getImageData(5, img.naturalHeight - 5, 1, 1).data,
      ctx.getImageData(img.naturalWidth - 5, img.naturalHeight - 5, 1, 1).data,
      ctx.getImageData(50, 50, 1, 1).data,
      ctx.getImageData(img.naturalWidth - 50, 50, 1, 1).data
    ];

    // Check center of bowl & scoops
    const centerScoop = ctx.getImageData(512, 500, 1, 1).data;

    return {
      corners: corners.map(d => ({ r: d[0], g: d[1], b: d[2], a: d[3] })),
      centerScoop: { r: centerScoop[0], g: centerScoop[1], b: centerScoop[2], a: centerScoop[3] }
    };
  });

  console.log(JSON.stringify(stats, null, 2));
  await browser.close();
}
testBlackMask().catch(console.error);

