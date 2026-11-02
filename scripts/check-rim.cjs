const puppeteer = require('puppeteer-core');

async function checkRim() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });

  const stats = await page.evaluate(async () => {
    const load = (src) => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });

    const img = await load('/images/uploaded-bowl-black.jpg');
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const data = ctx.getImageData(0, 0, c.width, c.height).data;
    // Pistachio scoop top apex is around x: 550, y: 30 to 120
    const edgePixels = [];
    for (let y = 10; y < 70; y += 4) {
      for (let x = 520; x < 570; x += 4) {
        const idx = (y * c.width + x) * 4;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        if (Math.max(r,g,b) > 5 && Math.max(r,g,b) < 100) {
          edgePixels.push({ x, y, r, g, b, max: Math.max(r,g,b) });
        }
      }
    }
    return edgePixels;
  });

  console.log('Rim edge pixels:', stats.slice(0, 15));
  await browser.close();
}

checkRim().catch(console.error);

