const puppeteer = require('puppeteer-core');

async function testColor() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });

  const colorData = await page.evaluate(async () => {
    const load = (src) => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });

    const img = await load('/images/hero-artisan-gelato-reference.jpg');
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Let's sample colors at various points:
    // Top-right corner (around 1200, 100 in natural image coords)
    // Left edge (around 700, 300)
    // Bottom edge (around 900, 800)
    const samples = [];
    const points = [
      { x: 50, y: 50 },
      { x: 500, y: 50 },
      { x: 1000, y: 50 },
      { x: 1400, y: 100 },
      { x: 1400, y: 500 },
      { x: 1400, y: 800 },
      { x: 700, y: 700 },
      { x: 900, y: 850 }
    ];

    for (const p of points) {
      if (p.x < c.width && p.y < c.height) {
        const d = ctx.getImageData(p.x, p.y, 1, 1).data;
        samples.push({ x: p.x, y: p.y, r: d[0], g: d[1], b: d[2], hex: '#' + [d[0], d[1], d[2]].map(x => x.toString(16).padStart(2, '0')).join('') });
      }
    }
    return { width: c.width, height: c.height, samples };
  });

  console.log(colorData);
  await browser.close();
}

testColor().catch(console.error);

