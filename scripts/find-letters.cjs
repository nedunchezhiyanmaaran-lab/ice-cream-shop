const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function findResidualLetters() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // In hero-artisan-gelato-reference.jpg (1024x576):
  // Let's find exactly where the letters "Loved instantly." end:
  const letterBounds = await page.evaluate(async () => {
    const img = new Image();
    img.src = '/images/hero-artisan-gelato-reference.jpg';
    await new Promise(r => { img.onload = r; });

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Let's search x from 350 to 450, y from 180 to 280 (where "instantly." is located)
    // Dark brown text color is around rgb(40-80, 25-50, 20-40)
    const textPixels = [];
    for (let x = 350; x <= 450; x++) {
      for (let y = 180; y <= 280; y++) {
        const d = ctx.getImageData(x, y, 1, 1).data;
        if (d[0] < 120 && d[1] < 90 && d[2] < 70) {
          textPixels.push({ x, y, r: d[0], g: d[1], b: d[2] });
        }
      }
    }

    const maxX = textPixels.length > 0 ? Math.max(...textPixels.map(p => p.x)) : 0;
    return { maxXText: maxX, count: textPixels.length };
  });

  console.log('Text bound:', letterBounds);
  await browser.close();
}
findResidualLetters().catch(console.error);

