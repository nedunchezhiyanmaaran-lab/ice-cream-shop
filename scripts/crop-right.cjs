const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function cropRightSide() {
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

    const img = await load('/images/hero-artisan-gelato-reference.jpg');
    const c = document.createElement('canvas');
    // The right side has the entire gelato composition:
    // Image is 1024 x 576.
    // The dessert starts around x: 380 to 1024.
    const cropX = 350;
    const cropW = img.naturalWidth - cropX;
    const cropH = img.naturalHeight;

    c.width = cropW;
    c.height = cropH;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, cropX, 0, cropW, cropH, 0, 0, cropW, cropH);

    return c.toDataURL('image/jpeg', 0.96);
  });

  fs.writeFileSync('public/images/hero-grounded-crop.jpg', result.replace(/^data:image\/jpeg;base64,/, ''), 'base64');
  console.log('Saved hero-grounded-crop.jpg');
  await browser.close();
}

cropRightSide().catch(console.error);

