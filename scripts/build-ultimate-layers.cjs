const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function buildUltimateLayers() {
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

    // 1. DESSERT BOWL ISOLATION (From uploaded-bowl-black.jpg)
    const imgBowl = await load('/images/uploaded-bowl-black.jpg');
    const wB = imgBowl.naturalWidth;
    const hB = imgBowl.naturalHeight;
    const cBowl = document.createElement('canvas');
    cBowl.width = wB;
    cBowl.height = hB;
    const ctxB = cBowl.getContext('2d');
    ctxB.drawImage(imgBowl, 0, 0);

    const bData = ctxB.getImageData(0, 0, wB, hB);
    const bd = bData.data;

    // Pass 1: compute alpha
    const alphaMap = new Float32Array(wB * hB);
    for (let y = 0; y < hB; y++) {
      for (let x = 0; x < wB; x++) {
        // Border padding 3px is always 0
        if (x < 3 || x >= wB - 3 || y < 3 || y >= hB - 3) {
          alphaMap[y * wB + x] = 0;
          continue;
        }

        const idx = (y * wB + x) * 4;
        const r = bd[idx];
        const g = bd[idx + 1];
        const b = bd[idx + 2];
        const maxVal = Math.max(r, g, b);

        if (maxVal <= 24) {
          alphaMap[y * wB + x] = 0;
        } else if (maxVal < 68) {
          // Smooth Hermite smoothstep falloff
          const t = (maxVal - 24) / 44;
          alphaMap[y * wB + x] = t * t * (3 - 2 * t);
        } else {
          alphaMap[y * wB + x] = 1.0;
        }
      }
    }

    // Pass 2: Light-wrap color extension for edge pixels
    const outBowl = new Uint8ClampedArray(wB * hB * 4);
    for (let y = 0; y < hB; y++) {
      for (let x = 0; x < wB; x++) {
        const pos = y * wB + x;
        const a = alphaMap[pos];
        const idx = pos * 4;

        if (a <= 0.001) {
          outBowl[idx] = 0;
          outBowl[idx + 1] = 0;
          outBowl[idx + 2] = 0;
          outBowl[idx + 3] = 0;
        } else if (a >= 0.98) {
          outBowl[idx] = bd[idx];
          outBowl[idx + 1] = bd[idx + 1];
          outBowl[idx + 2] = bd[idx + 2];
          outBowl[idx + 3] = 255;
        } else {
          // Edge pixel: search inward for rich solid gelato color
          let sumR = 0, sumG = 0, sumB = 0, count = 0;
          for (let dy = -3; dy <= 3; dy++) {
            for (let dx = -3; dx <= 3; dx++) {
              const ny = y + dy;
              const nx = x + dx;
              if (ny >= 0 && ny < hB && nx >= 0 && nx < wB) {
                const nPos = ny * wB + nx;
                if (alphaMap[nPos] >= 0.85) {
                  const nIdx = nPos * 4;
                  sumR += bd[nIdx];
                  sumG += bd[nIdx + 1];
                  sumB += bd[nIdx + 2];
                  count++;
                }
              }
            }
          }

          if (count > 0) {
            outBowl[idx] = Math.round(sumR / count);
            outBowl[idx + 1] = Math.round(sumG / count);
            outBowl[idx + 2] = Math.round(sumB / count);
          } else {
            const factor = Math.max(0.35, a);
            outBowl[idx] = Math.min(255, Math.round(bd[idx] / factor));
            outBowl[idx + 1] = Math.min(255, Math.round(bd[idx + 1] / factor));
            outBowl[idx + 2] = Math.min(255, Math.round(bd[idx + 2] / factor));
          }
          outBowl[idx + 3] = Math.round(a * 255);
        }
      }
    }

    ctxB.putImageData(new ImageData(outBowl, wB, hB), 0, 0);
    const bowlPng = cBowl.toDataURL('image/png');

    // 2. SURROUNDING INGREDIENTS & GOLDEN RING (From uploaded-ingredients.jpg)
    const imgRing = await load('/images/uploaded-ingredients.jpg');
    const wR = imgRing.naturalWidth;
    const hR = imgRing.naturalHeight;
    const cRing = document.createElement('canvas');
    cRing.width = wR;
    cRing.height = hR;
    const ctxR = cRing.getContext('2d');
    ctxR.drawImage(imgRing, 0, 0);

    const rData = ctxR.getImageData(0, 0, wR, hR);
    const rd = rData.data;

    for (let y = 0; y < hR; y++) {
      for (let x = 0; x < wR; x++) {
        // Border 3px clean
        if (x < 3 || x >= wR - 3 || y < 3 || y >= hR - 3) {
          const idx = (y * wR + x) * 4;
          rd[idx + 3] = 0;
          continue;
        }

        const idx = (y * wR + x) * 4;
        const r = rd[idx];
        const g = rd[idx + 1];
        const b = rd[idx + 2];

        const diffRG = Math.abs(r - g);
        const diffGB = Math.abs(g - b);
        const diffRB = Math.abs(r - b);
        const saturation = Math.max(diffRG, diffGB, diffRB);
        const brightness = (r + g + b) / 3;

        const warmGlow = (r + g) / 2 - b;
        const isGoldenRing = (r > 160 && (r - b) > 42 && warmGlow > 40 && b < 175);

        if (isGoldenRing) {
          const glowAlpha = Math.min(255, Math.max(30, (warmGlow - 25) * 5));
          rd[idx + 3] = Math.round(glowAlpha);
        } else {
          // Ingredients
          const isStrawberryArea = (x < 430 && y > 350 && r > 100 && (r - g) > 22 && (r - b) > 20);
          const isTableChocolate = (x > 540 && y > 380 && r > 30 && brightness < 125 && (r - b) > 8);
          const isFloatingChocolate = (x > 600 && y < 380 && brightness < 135 && r > 30 && (r - b) > 8);
          const isFloatingPistachio = (x < 420 && y < 350 && (
            (g > b + 12 && g > 65) || 
            (r > b + 18 && brightness < 175 && (r - g) < 60)
          ));

          if (isStrawberryArea || isTableChocolate || isFloatingChocolate || isFloatingPistachio) {
            if (saturation < 14 && brightness > 160) {
              rd[idx + 3] = 0;
            } else {
              rd[idx + 3] = 255;
            }
          } else {
            rd[idx + 3] = 0;
          }
        }
      }
    }

    ctxR.putImageData(rData, 0, 0);
    const ringPng = cRing.toDataURL('image/png');

    return { bowlPng, ringPng };
  });

  fs.writeFileSync('public/images/dessert-bowl-isolated.png', result.bowlPng.replace(/^data:image\/png;base64,/, ''), 'base64');
  fs.writeFileSync('public/images/ingredients-pristine.png', result.ringPng.replace(/^data:image\/png;base64,/, ''), 'base64');
  console.log('Successfully saved ultimate dessert-bowl-isolated.png and ingredients-pristine.png');

  await browser.close();
}

buildUltimateLayers().catch(console.error);

