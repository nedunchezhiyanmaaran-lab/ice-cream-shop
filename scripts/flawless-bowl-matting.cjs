const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function flawlessBowlMatting() {
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
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, w, h);
    const d = imgData.data;

    // Pass 1: Compute initial alpha
    const alphaMap = new Float32Array(w * h);

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const r = d[idx];
        const g = d[idx + 1];
        const b = d[idx + 2];
        const maxVal = Math.max(r, g, b);

        if (maxVal <= 24) {
          alphaMap[y * w + x] = 0;
        } else if (maxVal < 65) {
          alphaMap[y * w + x] = (maxVal - 24) / 41;
        } else {
          alphaMap[y * w + x] = 1.0;
        }
      }
    }

    // Pass 2: Color Extension / Light Wrap for edge pixels
    // For semi-transparent edge pixels (0 < alpha < 0.95), sample inward (where alpha == 1.0)
    // to replace the black-contaminated edge color with rich gelato tone!
    const outData = new Uint8ClampedArray(d);

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const pos = y * w + x;
        const a = alphaMap[pos];
        const idx = pos * 4;

        if (a <= 0) {
          outData[idx + 3] = 0;
        } else if (a >= 0.98) {
          outData[idx + 3] = 255;
        } else {
          // Edge pixel: find nearest solid inward color within 2 pixels
          let sumR = 0, sumG = 0, sumB = 0, count = 0;
          for (let dy = -2; dy <= 2; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
              const ny = y + dy;
              const nx = x + dx;
              if (ny >= 0 && ny < h && nx >= 0 && nx < w) {
                const nPos = ny * w + nx;
                if (alphaMap[nPos] >= 0.85) {
                  const nIdx = nPos * 4;
                  sumR += d[nIdx];
                  sumG += d[nIdx + 1];
                  sumB += d[nIdx + 2];
                  count++;
                }
              }
            }
          }

          if (count > 0) {
            // Blend inward rich color
            outData[idx] = Math.round(sumR / count);
            outData[idx + 1] = Math.round(sumG / count);
            outData[idx + 2] = Math.round(sumB / count);
          } else {
            // Fallback un-premultiplication
            const factor = Math.max(0.35, a);
            outData[idx] = Math.min(255, Math.round(d[idx] / factor));
            outData[idx + 1] = Math.min(255, Math.round(d[idx + 1] / factor));
            outData[idx + 2] = Math.min(255, Math.round(d[idx + 2] / factor));
          }

          outData[idx + 3] = Math.round(a * 255);
        }
      }
    }

    const finalImgData = new ImageData(outData, w, h);
    ctx.putImageData(finalImgData, 0, 0);
    return c.toDataURL('image/png');
  });

  fs.writeFileSync('public/images/dessert-bowl-isolated.png', resultPng.replace(/^data:image\/png;base64,/, ''), 'base64');
  console.log('Saved flawless dessert-bowl-isolated.png');
  await browser.close();
}

flawlessBowlMatting().catch(console.error);

