const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function extractSprites() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  const sprites = await page.evaluate(async () => {
    const img = new Image();
    img.src = '/images/hero-artisan-gelato-reference.jpg';
    await new Promise(r => { img.onload = r; });

    // 1. Floating pistachio top-left: around x=480-530, y=135-185 (w=50, h=50)
    // 2. Floating strawberry left: around x=430-490, y=280-345 (w=60, h=65)
    // 3. Floating chocolate shard right: around x=780-830, y=155-215 (w=50, h=60)
    const extract = (x, y, w, h) => {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, x, y, w, h, 0, 0, w, h);

      // Feather edge 8px
      const imgData = ctx.getImageData(0, 0, w, h);
      const d = imgData.data;
      for (let py = 0; py < h; py++) {
        for (let px = 0; px < w; px++) {
          const idx = (py * w + px) * 4;
          const minD = Math.min(px, w - 1 - px, py, h - 1 - py);
          if (minD < 8) {
            d[idx + 3] = Math.round(d[idx + 3] * (minD / 8));
          }
        }
      }
      ctx.putImageData(imgData, 0, 0);
      return c.toDataURL('image/png');
    };

    return {
      pistachio: extract(485, 135, 55, 55),
      strawberry: extract(430, 280, 65, 70),
      chocolate: extract(780, 155, 55, 60)
    };
  });

  fs.writeFileSync('public/images/sprite-pistachio.png', sprites.pistachio.replace(/^data:image\/png;base64,/, ''), 'base64');
  fs.writeFileSync('public/images/sprite-strawberry.png', sprites.strawberry.replace(/^data:image\/png;base64,/, ''), 'base64');
  fs.writeFileSync('public/images/sprite-chocolate.png', sprites.chocolate.replace(/^data:image\/png;base64,/, ''), 'base64');

  console.log('Successfully saved 3 floating ingredient sprites!');
  await browser.close();
}
extractSprites().catch(console.error);

