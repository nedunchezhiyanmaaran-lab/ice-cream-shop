const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function cropPistachioPlinth() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1200, height: 900 }
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });

  const result = await page.evaluate(async () => {
    const load = (src) => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });

    const img = await load('/images/brand-moodboard.jpg');
    const c = document.createElement('canvas');
    // Crop the top-left photo:
    // Natural dimensions:
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    // In brand-moodboard.jpg:
    // The top-left image occupies about 55% of width and 60% of height!
    const cropW = Math.round(w * 0.555);
    const cropH = Math.round(h * 0.585);

    c.width = cropW;
    c.height = cropH;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, cropW, cropH, 0, 0, cropW, cropH);

    return c.toDataURL('image/jpeg', 0.98);
  });

  fs.writeFileSync('public/images/real-pistachio-plinth.jpg', result.replace(/^data:image\/jpeg;base64,/, ''), 'base64');
  console.log('Saved real-pistachio-plinth.jpg');
  await browser.close();
}

cropPistachioPlinth().catch(console.error);

