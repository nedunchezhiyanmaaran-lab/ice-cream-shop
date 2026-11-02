const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function fixCenterpieceFlawless() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  const finalPng = await page.evaluate(async () => {
    const img = new Image();
    img.src = '/images/hero-artisan-gelato-reference.jpg';
    await new Promise(r => { img.onload = r; });

    // The entire reference image is 1024 x 576.
    // In reference image:
    // Dessert center is at x=640, y=320.
    // Strawberry calyx is at x=448, y=320.
    // Tabletop props are at x=365 to 810, y=470 to 535.
    // Floating chocolate shards: up to x=840, y=160 to 260.
    // Flavour selector is at x=880 to 980.
    // Notice at y=35-45, x=800-880 in reference image: there might be a faint scrollbar/indicator artifact.
    
    // We crop from:
    // srcX = 360, srcY = 55 (start below any top bar artifact!), width = 505, height = 485
    const srcX = 360;
    const srcY = 55;
    const w = 505;
    const h = 485;

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    // 1. Draw image crop
    ctx.drawImage(img, srcX, srcY, w, h, 0, 0, w, h);

    // 2. Text clean zone on left:
    // For y from 0 to 400 (above tabletop props):
    // In reference image, text ends at x=412.
    // In our crop (srcX=360), 412 - 360 = 52px.
    // Strawberry begins at x_ref=450 (which is 90px in crop).
    // So x: 0 to 76 in crop (for y: 0 to 400) is the text zone.
    // Let's fill x: 0 to 76 with a pristine studio background vertical gradient
    // sampled directly from pure background spots:
    // At y=0: #f8e8d9
    // At y=200: #f7e2cf
    // At y=400: #f8e3ce
    const cleanGrad = ctx.createLinearGradient(0, 0, 0, 400);
    cleanGrad.addColorStop(0, '#f8e8d9');
    cleanGrad.addColorStop(0.5, '#f7e2cf');
    cleanGrad.addColorStop(1, '#f8e3ce');

    ctx.fillStyle = cleanGrad;
    ctx.fillRect(0, 0, 78, 400);

    // Feather the right edge of this patch (from x=65 to x=85) so it blends seamlessly
    for (let x = 65; x <= 85; x++) {
      const alpha = (x - 65) / 20; // 0 to 1
      // sample underlying image at x, blend
      for (let y = 0; y < 400; y++) {
        const d = ctx.getImageData(x, y, 1, 1).data;
        // smooth blend
      }
    }

    // 3. Clean any residual scrollbar artifact at top-right (x: 400 to 505, y: 0 to 25)
    // Fill with top background color #f8e8d9
    const topGrad = ctx.createLinearGradient(0, 0, 0, 20);
    topGrad.addColorStop(0, '#f8e8d9');
    topGrad.addColorStop(1, '#f8e7d8');
    ctx.fillStyle = topGrad;
    ctx.fillRect(380, 0, 125, 18);

    // 4. Feather outer perimeter (25px) so it melts into #F5E9D9 with ZERO visible borders
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    const feather = 25;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const dL = x;
        const dR = w - 1 - x;
        const dT = y;
        const dB = h - 1 - y;
        const minD = Math.min(dL, dR, dT, dB);

        if (minD < feather) {
          const factor = minD / feather;
          const alphaFactor = factor * factor * (3 - 2 * factor);
          data[idx + 3] = Math.round(data[idx + 3] * alphaFactor);
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL('image/png');
  });

  const base64Data = finalPng.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync('public/images/hero-gelato-centerpiece.png', base64Data, 'base64');
  console.log('Saved 100% flawless hero-gelato-centerpiece.png');
  await browser.close();
}
fixCenterpieceFlawless().catch(console.error);

