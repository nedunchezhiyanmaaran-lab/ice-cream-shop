const puppeteer = require('puppeteer-core');

async function findStrawberryBound() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  const bound = await page.evaluate(async () => {
    const img = new Image();
    img.src = '/images/hero-artisan-gelato-reference.jpg';
    await new Promise(r => { img.onload = r; });

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Strawberry is reddish (r > 160, g < 100, b < 100)
    const redPixels = [];
    for (let x = 400; x <= 500; x++) {
      for (let y = 250; y <= 350; y++) {
        const d = ctx.getImageData(x, y, 1, 1).data;
        if (d[0] > 160 && d[1] < 110 && d[2] < 110) {
          redPixels.push({ x, y });
        }
      }
    }

    const minX = redPixels.length > 0 ? Math.min(...redPixels.map(p => p.x)) : 0;
    return { minXStrawberry: minX, count: redPixels.length };
  });

  console.log('Floating strawberry left bound:', bound);
  await browser.close();
}
findStrawberryBound().catch(console.error);

