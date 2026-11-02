const puppeteer = require('puppeteer-core');

async function testCheckerboard() {
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

    const img = await load('/images/uploaded-ingredients.jpg');
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const data = ctx.getImageData(0, 0, c.width, c.height).data;
    // Samples in the empty middle region where checkerboard is: e.g. x: 500, y: 300
    const samples = [];
    for (let y = 200; y < 400; y += 20) {
      for (let x = 400; x < 600; x += 20) {
        const idx = (y * c.width + x) * 4;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        const diffRG = Math.abs(r - g);
        const diffGB = Math.abs(g - b);
        const diffRB = Math.abs(r - b);
        const maxDiff = Math.max(diffRG, diffGB, diffRB);
        const brightness = (r + g + b) / 3;
        samples.push({ x, y, r, g, b, brightness, maxDiff });
      }
    }
    return samples;
  });

  console.log('Sample checkerboard values:');
  console.log(stats.slice(0, 15));
  await browser.close();
}

testCheckerboard().catch(console.error);

