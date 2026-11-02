const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function extractPristineGoldenStreak() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });

  const result = await page.evaluate(async () => {
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

    const imgData = ctx.getImageData(0, 0, c.width, c.height);
    const d = imgData.data;

    // Isolate ONLY the golden streak & glowing particles (golden yellow/orange)
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];

      // Golden streak has high red & green, low blue: (r - b) is large!
      const goldDelta = r - b;
      const warmFactor = (r + g) / 2 - b;

      if (warmFactor < 22 || r < 140) {
        // Not a golden glowing pixel -> make transparent
        d[i + 3] = 0;
      } else {
        // Calculate smooth alpha based on golden glow intensity
        const alpha = Math.min(255, (warmFactor - 22) * 5.5);
        d[i + 3] = Math.round(alpha);
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return c.toDataURL('image/png');
  });

  fs.writeFileSync(
    'public/images/golden-streak-pristine.png',
    result.replace(/^data:image\/png;base64,/, ''),
    'base64'
  );

  console.log('Saved golden-streak-pristine.png!');
  await browser.close();
}
extractPristineGoldenStreak().catch(console.error);

