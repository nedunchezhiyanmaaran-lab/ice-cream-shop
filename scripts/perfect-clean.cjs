const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function perfectClean() {
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

    const img = await load('/images/uploaded-ingredients.jpg');
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, c.width, c.height);
    const d = imgData.data;

    for (let y = 0; y < c.height; y++) {
      for (let x = 0; x < c.width; x++) {
        const i = (y * c.width + x) * 4;
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];

        const diffRG = Math.abs(r - g);
        const diffGB = Math.abs(g - b);
        const diffRB = Math.abs(r - b);
        const saturation = Math.max(diffRG, diffGB, diffRB);
        const brightness = (r + g + b) / 3;

        // Golden light streak is strongly amber/gold:
        // High red, medium-high green, distinctly lower blue!
        // r > 160, (r - b) > 50, warmGlow > 45, and b < 170.
        const warmGlow = (r + g) / 2 - b;
        const isGoldenRing = (r > 160 && (r - b) > 42 && warmGlow > 40 && b < 175);

        if (isGoldenRing) {
          // Luminous golden streak with smooth falloff
          const glowAlpha = Math.min(255, Math.max(30, (warmGlow - 25) * 5));
          d[i + 3] = Math.round(glowAlpha);
        } else {
          // Check for actual solid ingredients:
          // Strawberries (bottom-left: x < 430, y > 350)
          const isStrawberryArea = (x < 430 && y > 350 && r > 100 && (r - g) > 22 && (r - b) > 20);
          // Tabletop chocolate (bottom-right: x > 540, y > 380)
          const isTableChocolate = (x > 540 && y > 380 && r > 30 && brightness < 125 && (r - b) > 8);
          // Floating chocolate shards (top-right: x > 600, y < 380)
          const isFloatingChocolate = (x > 600 && y < 380 && brightness < 135 && r > 30 && (r - b) > 8);
          // Floating pistachios (top-left: x < 420, y < 350)
          const isFloatingPistachio = (x < 420 && y < 350 && (
            (g > b + 12 && g > 65) || 
            (r > b + 18 && brightness < 175 && (r - g) < 60)
          ));

          if (isStrawberryArea || isTableChocolate || isFloatingChocolate || isFloatingPistachio) {
            // Keep genuine ingredient pixel
            if (saturation < 14 && brightness > 160) {
              d[i + 3] = 0;
            } else {
              d[i + 3] = 255;
            }
          } else {
            // Any other pixel is the checkerboard background!
            d[i + 3] = 0;
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return c.toDataURL('image/png');
  });

  fs.writeFileSync('public/images/ingredients-pristine.png', resultPng.replace(/^data:image\/png;base64,/, ''), 'base64');
  console.log('Saved public/images/ingredients-pristine.png');

  // Render combined test with ingredients-pristine.png
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
          filter: drop-shadow(0 0 14px rgba(244, 216, 139, 0.45));
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
      <h2 style="text-align:center; color:#50352F;">Pristine Cleaned Composition on #F5E9D9</h2>
      <div class="container">
        <img src="http://localhost:5173/images/ingredients-pristine.png" class="ring-bg" />
        <img src="http://localhost:5173/images/dessert-bowl-isolated.png" class="bowl" />
      </div>
    </body>
    </html>
  `);

  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'scripts/test-pristine-combined.png' });
  console.log('Saved scripts/test-pristine-combined.png');
  await browser.close();
}

perfectClean().catch(console.error);
