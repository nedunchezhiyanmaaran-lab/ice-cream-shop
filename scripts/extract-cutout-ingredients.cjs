const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function extractCutoutIngredients() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  const sprites = await page.evaluate(async () => {
    const img = new Image();
    img.src = '/images/hero-supplied-cutout.png';
    await new Promise(r => { img.onload = r; });

    const extract = (x, y, w, h) => {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
      return c.toDataURL('image/png');
    };

    return {
      // Top-left floating pistachio in shell (x: 225, y: 170, w: 75, h: 85)
      pistachioShell: extract(225, 170, 75, 85),
      // Upper top-left floating pistachio nut (x: 305, y: 15, w: 75, h: 110)
      pistachioTop: extract(305, 15, 75, 110),
      // Floating strawberry slice on left (x: 165, y: 405, w: 125, h: 140)
      floatingStrawberry: extract(165, 405, 125, 140),
      // Top-right dark chocolate shard (x: 690, y: 95, w: 105, h: 145)
      chocolateShardLarge: extract(690, 95, 105, 145),
      // Mid-right floating chocolate flake (x: 745, y: 275, w: 55, h: 70)
      chocolateFlake: extract(745, 275, 55, 70),
    };
  });

  fs.writeFileSync('public/images/layer-pistachio-shell.png', sprites.pistachioShell.replace(/^data:image\/png;base64,/, ''), 'base64');
  fs.writeFileSync('public/images/layer-pistachio-top.png', sprites.pistachioTop.replace(/^data:image\/png;base64,/, ''), 'base64');
  fs.writeFileSync('public/images/layer-floating-strawberry.png', sprites.floatingStrawberry.replace(/^data:image\/png;base64,/, ''), 'base64');
  fs.writeFileSync('public/images/layer-chocolate-shard.png', sprites.chocolateShardLarge.replace(/^data:image\/png;base64,/, ''), 'base64');
  fs.writeFileSync('public/images/layer-chocolate-flake.png', sprites.chocolateFlake.replace(/^data:image\/png;base64,/, ''), 'base64');

  console.log('Successfully extracted 5 isolated ingredient layers from supplied image!');
  await browser.close();
}
extractCutoutIngredients().catch(console.error);

