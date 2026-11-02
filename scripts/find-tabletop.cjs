const puppeteer = require('puppeteer-core');

async function findTabletopProps() {
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

    // Pistachio shell on tabletop: around y=480 to 535
    // It has pistachio green nut or tan shell
    const propPixels = [];
    for (let x = 360; x <= 460; x++) {
      for (let y = 480; y <= 535; y++) {
        const d = ctx.getImageData(x, y, 1, 1).data;
        const diff = Math.abs(d[0] - 247) + Math.abs(d[1] - 227) + Math.abs(d[2] - 208);
        if (diff > 50) {
          propPixels.push({ x, y });
        }
      }
    }

    const minX = propPixels.length > 0 ? Math.min(...propPixels.map(p => p.x)) : 0;
    return { minXTabletop: minX, count: propPixels.length };
  });

  console.log('Tabletop prop bound:', bound);
  await browser.close();
}
findTabletopProps().catch(console.error);

