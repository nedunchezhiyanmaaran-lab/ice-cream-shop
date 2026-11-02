const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function perfectPlinthCrop() {
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

    const img = await load('/images/brand-moodboard.jpg');
    const c = document.createElement('canvas');
    // In brand-moodboard.jpg:
    // Natural dimensions:
    // Skip 35px from left, 10px from top
    const startX = 40;
    const startY = 15;
    const cropW = Math.round(img.naturalWidth * 0.525);
    const cropH = Math.round(img.naturalHeight * 0.565);

    c.width = cropW;
    c.height = cropH;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, startX, startY, cropW, cropH, 0, 0, cropW, cropH);

    return c.toDataURL('image/jpeg', 0.98);
  });

  fs.writeFileSync('public/images/real-pistachio-plinth.jpg', result.replace(/^data:image\/jpeg;base64,/, ''), 'base64');
  console.log('Saved perfect real-pistachio-plinth.jpg');
  await browser.close();
}

perfectPlinthCrop().catch(console.error);

