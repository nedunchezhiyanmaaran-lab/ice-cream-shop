const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function inspectRealImages() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1400, height: 1000 }
  });
  const page = await browser.newPage();

  const p1 = 'C:/Users/dell/.gemini/antigravity/brain/db85d9da-7aa8-4a89-a7cb-87ec76cdebab/.user_uploaded/media_1793606417930_4bdf1a98.jpg';
  const p2 = 'C:/Users/dell/.gemini/antigravity/brain/db85d9da-7aa8-4a89-a7cb-87ec76cdebab/.user_uploaded/media_1793606482836_69d86082.jpg';
  const p3 = 'C:/Users/dell/.gemini/antigravity/brain/db85d9da-7aa8-4a89-a7cb-87ec76cdebab/.user_uploaded/media_1793606467563_5b6da0eb.jpg';

  const b1 = fs.readFileSync(p1).toString('base64');
  const b2 = fs.readFileSync(p2).toString('base64');
  const b3 = fs.readFileSync(p3).toString('base64');

  await page.setContent(`<!DOCTYPE html>
  <body style="margin:0; background:#F5E9D9; font-family:sans-serif; padding:20px;">
    <h2>High-Res Real Photographs</h2>
    <div style="display:flex; flex-direction:column; gap:20px;">
      <div>
        <h3>1. media_1793606417930_4bdf1a98.jpg (Brand Moodboard / Artisanal Plinth)</h3>
        <img src="data:image/jpeg;base64,${b1}" style="max-width:900px; height:auto; border-radius:12px;"/>
      </div>
      <div>
        <h3>2. media_1793606482836_69d86082.jpg (Real 3-Scoop Antique Coupe on Stone Table)</h3>
        <img src="data:image/jpeg;base64,${b2}" style="max-width:900px; height:auto; border-radius:12px;"/>
      </div>
      <div>
        <h3>3. media_1793606467563_5b6da0eb.jpg (Artisanal Swirled Cup with Pistachios)</h3>
        <img src="data:image/jpeg;base64,${b3}" style="max-width:900px; height:auto; border-radius:12px;"/>
      </div>
    </div>
  </body>`);

  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'scripts/highres-real-photos.png' });
  await browser.close();
  console.log('Saved highres-real-photos.png');
}

inspectRealImages().catch(console.error);

