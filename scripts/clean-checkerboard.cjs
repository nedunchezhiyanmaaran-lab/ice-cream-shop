const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function testCleanCheckerboard() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1400, height: 1000 }
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });

  const resultPng = await page.evaluate(async () => {
    const load = (src) => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });

    const img = await load('/images/uploaded-ingredients.jpg');
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

      const diffRG = Math.abs(r - g);
      const diffGB = Math.abs(g - b);
      const diffRB = Math.abs(r - b);
      const saturation = Math.max(diffRG, diffGB, diffRB);
      const brightness = (r + g + b) / 3;

      // Golden streak detection: warm glowing light
      const isGoldStreak = (r > 160 && (r + g) / 2 - b > 25);

      // Real ingredient colors have chroma or are dark chocolate
      // Checkerboard is achromatic: saturation is low, brightness is medium to high
      if (!isGoldStreak) {
        if (saturation < 14 && brightness > 120) {
          // Definitely checkerboard square (white or light/medium gray)
          d[i + 3] = 0;
        } else if (saturation < 22 && brightness > 150) {
          // Soft transition edge on checkerboard
          const alphaFactor = (saturation - 14) / 8;
          d[i + 3] = Math.round(255 * Math.max(0, Math.min(1, alphaFactor)));
        } else if (saturation < 10 && brightness > 90) {
          // Darker gray checkerboard in shadow
          d[i + 3] = 0;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return c.toDataURL('image/png');
  });

  fs.writeFileSync('public/images/ingredients-clean.png', resultPng.replace(/^data:image\/png;base64,/, ''), 'base64');
  console.log('Saved public/images/ingredients-clean.png');

  // Now render combined test on #F5E9D9
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          margin: 0;
          background: #F5E9D9;
          font-family: sans-serif;
          padding: 20px;
        }
        .container {
          position: relative;
          width: 900px;
          height: 650px;
          margin: 0 auto;
          background: #F5E9D9;
          border: 1px solid rgba(80,53,47,0.15);
          overflow: hidden;
          border-radius: 20px;
        }
        .ring-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: contain;
          top: 0;
          left: 0;
          z-index: 5;
        }
        .bowl {
          position: absolute;
          width: 72%;
          height: 72%;
          object-fit: contain;
          left: 14%;
          bottom: 7%;
          z-index: 10;
          filter: drop-shadow(0 20px 30px rgba(80,53,47,0.18));
        }
      </style>
    </head>
    <body>
      <h2 style="text-align:center; color:#50352F;">Ingredients Cleaned + Bowl on #F5E9D9</h2>
      <div class="container">
        <img src="http://localhost:5173/images/ingredients-clean.png" class="ring-bg" />
        <img src="http://localhost:5173/images/dessert-bowl-isolated.png" class="bowl" />
      </div>
    </body>
    </html>
  `);

  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'scripts/test-cleaned-combined.png' });
  console.log('Saved scripts/test-cleaned-combined.png');
  await browser.close();
}

testCleanCheckerboard().catch(console.error);

