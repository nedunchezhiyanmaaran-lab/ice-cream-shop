const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function testDefringe() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });

  const resultPng = await page.evaluate(async () => {
    const load = (src) => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });

    const img = await load('/images/uploaded-bowl-black.jpg');
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, c.width, c.height);
    const d = imgData.data;

    for (let i = 0; i < d.length; i += 4) {
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      const maxVal = Math.max(r, g, b);

      // Black background threshold
      if (maxVal <= 14) {
        d[i + 3] = 0;
      } else if (maxVal < 42) {
        // Soft antialiasing with defringing (un-premultiplying black)
        const alpha = (maxVal - 14) / 28; // 0.0 to 1.0
        d[i + 3] = Math.round(alpha * 255);
        
        // Un-premultiply so edge doesn't stay blackened
        const unmult = Math.max(0.3, alpha);
        d[i] = Math.min(255, Math.round(r / unmult));
        d[i + 1] = Math.min(255, Math.round(g / unmult));
        d[i + 2] = Math.min(255, Math.round(b / unmult));
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return c.toDataURL('image/png');
  });

  fs.writeFileSync('public/images/dessert-bowl-isolated.png', resultPng.replace(/^data:image\/png;base64,/, ''), 'base64');
  console.log('Saved defringed dessert-bowl-isolated.png');
  await browser.close();
}

testDefringe().catch(console.error);

