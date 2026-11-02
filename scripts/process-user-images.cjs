const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function processImages() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });

  const result = await page.evaluate(async () => {
    const load = (src) => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

    // 1. Process Image 2: Dessert Bowl on Black Background (1024 x 935)
    const imgBowl = await load('/images/uploaded-bowl-black.jpg');
    const cBowl = document.createElement('canvas');
    cBowl.width = imgBowl.naturalWidth;
    cBowl.height = imgBowl.naturalHeight;
    const ctxBowl = cBowl.getContext('2d');
    ctxBowl.drawImage(imgBowl, 0, 0);

    const bowlData = ctxBowl.getImageData(0, 0, cBowl.width, cBowl.height);
    const bd = bowlData.data;

    for (let i = 0; i < bd.length; i += 4) {
      const r = bd[i];
      const g = bd[i + 1];
      const b = bd[i + 2];
      // Max RGB brightness
      const maxVal = Math.max(r, g, b);

      if (maxVal <= 6) {
        // Pure black background -> transparent
        bd[i + 3] = 0;
      } else if (maxVal < 28) {
        // Soft antialiased edge falloff
        const factor = (maxVal - 6) / 22;
        bd[i + 3] = Math.round(255 * factor);
      }
    }
    ctxBowl.putImageData(bowlData, 0, 0);
    const bowlPng = cBowl.toDataURL('image/png');

    // 2. Process Image 1: Golden Ring & Ingredients (1024 x 682)
    // In Image 1, the checkerboard background is neutral gray/white: R ≈ G ≈ B
    // Where R > 200 and G > 200 and B > 200 and |R-G| < 6 and |G-B| < 6.
    // The golden ring, pistachios, strawberries, and chocolates have distinct chroma/hue!
    const imgRing = await load('/images/uploaded-ingredients.jpg');
    const cRing = document.createElement('canvas');
    cRing.width = imgRing.naturalWidth;
    cRing.height = imgRing.naturalHeight;
    const ctxRing = cRing.getContext('2d');
    ctxRing.drawImage(imgRing, 0, 0);

    const ringData = ctxRing.getImageData(0, 0, cRing.width, cRing.height);
    const rd = ringData.data;

    for (let i = 0; i < rd.length; i += 4) {
      const r = rd[i];
      const g = rd[i + 1];
      const b = rd[i + 2];

      const diffRG = Math.abs(r - g);
      const diffGB = Math.abs(g - b);
      const diffRB = Math.abs(r - b);
      const saturation = Math.max(diffRG, diffGB, diffRB);
      const brightness = (r + g + b) / 3;

      // Checkerboard detection: high brightness (>195) and very low saturation (< 12)
      if (brightness > 195 && saturation < 12) {
        rd[i + 3] = 0;
      } else if (brightness > 185 && saturation < 20) {
        // Soft feather transition
        const factor = (saturation - 12) / 8;
        rd[i + 3] = Math.round(255 * Math.max(0, Math.min(1, factor)));
      }
    }
    ctxRing.putImageData(ringData, 0, 0);
    const ringPng = cRing.toDataURL('image/png');

    return { bowlPng, ringPng };
  });

  fs.writeFileSync(
    'public/images/dessert-bowl-isolated.png',
    result.bowlPng.replace(/^data:image\/png;base64,/, ''),
    'base64'
  );
  fs.writeFileSync(
    'public/images/golden-ring-isolated.png',
    result.ringPng.replace(/^data:image\/png;base64,/, ''),
    'base64'
  );

  console.log('Saved dessert-bowl-isolated.png and golden-ring-isolated.png!');
  await browser.close();
}
processImages().catch(console.error);

