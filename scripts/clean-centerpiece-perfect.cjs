const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function cleanCenterpiecePerfect() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  const cleanedDataUrl = await page.evaluate(async () => {
    const img = new Image();
    img.src = '/images/hero-artisan-gelato-reference.jpg';
    await new Promise(r => { img.onload = r; });

    // Reference image is 1024 x 576
    // We crop from srcX=360 to srcX=870 (width=510), srcY=35 to srcY=555 (height=520)
    const srcX = 360;
    const srcY = 35;
    const w = 510;
    const h = 520;

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    // 1. Draw source crop
    ctx.drawImage(img, srcX, srcY, w, h, 0, 0, w, h);

    // 2. Clean up text zone:
    // In reference image, text is in x: 0 to 415, y: 0 to 440.
    // In our crop, srcX is 360, so x in crop = x_ref - 360.
    // 418 - 360 = 58px.
    // Strawberry starts at x_ref=450 (which is x=90 in crop).
    // So x: 0 to 75 in our crop (for y: 0 to 430) is the text zone and should be pure cream background!
    
    // Let's sample the clean background color column at x=80 in our crop from y=0 to 440
    // and seamlessly feather it across x: 0 to 75!
    for (let y = 0; y < 440; y++) {
      // Sample clean background pixel at x=82
      const sample = ctx.getImageData(82, y, 1, 1).data;
      for (let x = 0; x <= 75; x++) {
        const d = ctx.getImageData(x, y, 1, 1).data;
        // If it's a text artifact pixel (darker than cream, or different from sample)
        const diff = Math.abs(d[0] - sample[0]) + Math.abs(d[1] - sample[1]) + Math.abs(d[2] - sample[2]);
        if (diff > 12) {
          ctx.fillStyle = `rgb(${sample[0]}, ${sample[1]}, ${sample[2]})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    // Smooth subtle horizontal blur pass across the patch zone (x: 0 to 75, y: 0 to 440)
    // to ensure 100% flawless gradient continuity
    const patchData = ctx.getImageData(0, 0, 80, 440);
    const pd = patchData.data;
    for (let y = 1; y < 439; y++) {
      for (let x = 1; x < 79; x++) {
        const idx = (y * 80 + x) * 4;
        const idxAbove = ((y - 1) * 80 + x) * 4;
        const idxBelow = ((y + 1) * 80 + x) * 4;
        const idxLeft = (y * 80 + (x - 1)) * 4;
        const idxRight = (y * 80 + (x + 1)) * 4;

        pd[idx] = Math.round((pd[idx] * 4 + pd[idxAbove] + pd[idxBelow] + pd[idxLeft] + pd[idxRight]) / 8);
        pd[idx + 1] = Math.round((pd[idx + 1] * 4 + pd[idxAbove + 1] + pd[idxBelow + 1] + pd[idxLeft + 1] + pd[idxRight + 1]) / 8);
        pd[idx + 2] = Math.round((pd[idx + 2] * 4 + pd[idxAbove + 2] + pd[idxBelow + 2] + pd[idxLeft + 2] + pd[idxRight + 2]) / 8);
      }
    }
    ctx.putImageData(patchData, 0, 0);

    // 3. Feather the outer perimeter (24px) so it melts into #F5E9D9 with 0 visible seams
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    const feather = 24;

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

  const base64Data = cleanedDataUrl.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync('public/images/hero-gelato-centerpiece.png', base64Data, 'base64');
  console.log('Saved pristine hero-gelato-centerpiece.png');
  await browser.close();
}
cleanCenterpiecePerfect().catch(console.error);

