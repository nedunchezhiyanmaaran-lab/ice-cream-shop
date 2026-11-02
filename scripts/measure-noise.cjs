const puppeteer = require('puppeteer-core');

async function testNoise() {
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
    let maxDiffFound = 0;
    // Check points where brightness is > 190 and r is near g and b
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i+1], b = data[i+2];
      const diffRG = Math.abs(r - g);
      const diffGB = Math.abs(g - b);
      const diffRB = Math.abs(r - b);
      const maxDiff = Math.max(diffRG, diffGB, diffRB);
      const avg = (r + g + b) / 3;
      // If it looks like checkerboard (200-255 with low chroma)
      if (avg >= 200 && maxDiff < 15) {
        if (maxDiff > maxDiffFound) maxDiffFound = maxDiff;
      }
    }
    return maxDiffFound;
  });

  console.log('Max chroma difference on checkerboard:', stats);
  await browser.close();
}

testNoise().catch(console.error);

