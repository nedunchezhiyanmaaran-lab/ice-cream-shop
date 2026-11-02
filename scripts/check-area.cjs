const puppeteer = require('puppeteer-core');

async function checkArea() {
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
    // Samples around (10, 10)
    const samples = [];
    for (let y = 0; y < 30; y += 5) {
      for (let x = 0; x < 30; x += 5) {
        const idx = (y * c.width + x) * 4;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        samples.push({ x, y, r, g, b });
      }
    }
    return samples;
  });

  console.log('Very top-left corner (0-30px):', stats.slice(0, 10));
  await browser.close();
}

checkArea().catch(console.error);

