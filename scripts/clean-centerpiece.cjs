const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function cleanCenterpiece() {
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

    // The entire reference image is 1024 x 576.
    // In the reference image:
    // Dessert bowl center is at x=640, y=320.
    // Strawberry scoop is at x=540, y=280.
    // Pistachio scoop is at x=640, y=180.
    // Chocolate scoop is at x=720, y=280.
    // Bowl pedestal base is at x=640, y=470.
    // Tabletop props:
    // - Pistachio shell: x=390-440, y=490-530
    // - Cut strawberry: x=460-520, y=460-525
    // - Dark chocolate chunks: x=730-810, y=470-525
    // Floating ingredients:
    // - Floating pistachio (top): x=490-530, y=140-190
    // - Floating strawberry: x=430-490, y=275-340
    // - Floating chocolate shards: x=760-840, y=150-250
    // - Golden halo: x=430-840, y=110-390
    
    // Notice where the text was:
    // Text was in x from 50 to 395!
    // At x=380, the letters "tly." were ending!
    // Between y=100 and y=450, there is NO dessert prop to the left of x=420 EXCEPT the floating strawberry at x=435!
    // So for x < 420 (from y=50 to y=460), it should be pure clean cream background!
    
    // Let's create a clean high-resolution canvas:
    // We will crop from x=370 to x=865 (width = 495), y=40 to y=545 (height = 505)
    // In this crop, x=0 to x=50 (which corresponds to srcX 370 to 420):
    // From y=0 to y=430, we fill with the seamless background gradient!
    
    const srcX = 375;
    const srcY = 40;
    const w = 490;
    const h = 505;

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    // 1. Draw image
    ctx.drawImage(img, srcX, srcY, w, h, 0, 0, w, h);

    // 2. Clean up any residual text artifacts on the left side (x from 0 to 45, y from 0 to 420)
    // The background is a smooth studio gradient:
    // Top-left: rgb(248, 232, 217)
    // Mid-left: rgb(247, 226, 207)
    // Let's paint a smooth gradient over x: 0 to 48, y: 0 to 420, blending seamlessly into x=48
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 420);
    bgGrad.addColorStop(0, 'rgba(248, 233, 218, 1)');
    bgGrad.addColorStop(0.5, 'rgba(247, 227, 208, 1)');
    bgGrad.addColorStop(1, 'rgba(247, 226, 206, 1)');

    // Soft patch on the left edge
    ctx.fillStyle = bgGrad;
    // We feather the patch horizontally: from x=0 (solid) to x=45 (transparent)
    for (let x = 0; x <= 45; x++) {
      const alpha = 1 - (x / 45);
      ctx.fillStyle = `rgba(247, 228, 210, ${alpha})`;
      ctx.fillRect(x, 0, 1, 420);
    }

    // 3. Now feather the outer perimeter (25px) so it melts into #F5E9D9 with 0 seams
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

  const base64Data = cleanedDataUrl.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync('public/images/hero-gelato-centerpiece.png', base64Data, 'base64');
  console.log('Cleaned and saved public/images/hero-gelato-centerpiece.png');
  await browser.close();
}
cleanCenterpiece().catch(console.error);

