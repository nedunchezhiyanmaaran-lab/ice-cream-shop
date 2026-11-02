const puppeteer = require('puppeteer-core');

async function checkCheckerboardRange() {
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
    // Check top-left corner (0,0 to 100,100) which is 100% checkerboard
    let minGray = 255;
    let maxGray = 0;
    for (let y = 0; y < 100; y++) {
      for (let x = 0; x < 100; x++) {
        const idx = (y * c.width + x) * 4;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        const avg = (r + g + b) / 3;
        if (avg < minGray) minGray = avg;
        if (avg > maxGray) maxGray = avg;
      }
    }
    return { minGray, maxGray };
  });

  console.log('Checkerboard gray range:', stats);
  await browser.close();
}

checkCheckerboardRange().catch(console.error);

